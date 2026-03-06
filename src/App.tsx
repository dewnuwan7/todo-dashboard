/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Stats } from './components/Stats';
import { TodoList } from './components/TodoList';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  created_at: string;
}

interface StatsData {
  total: number;
  completed: number;
  pending: number;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [stats, setStats] = useState<StatsData>({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [todosRes, statsRes] = await Promise.all([
        fetch('/api/todos'),
        fetch('/api/stats')
      ]);
      
      const todosData = await todosRes.json();
      const statsData = await statsRes.json();
      
      setTodos(todosData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTodo = async (text: string) => {
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar />
      
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        
        <main className="flex-1 mt-16 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-slate-500">Welcome back, here's what needs to be done.</p>
            </div>

            <Stats stats={stats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <TodoList 
                  todos={todos}
                  onAdd={handleAddTodo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full py-2 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-sm font-medium transition-colors text-left">
                      Export Data
                    </button>
                    <button className="w-full py-2 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-sm font-medium transition-colors text-left">
                      Generate Report
                    </button>
                    <button className="w-full py-2 px-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-sm font-medium transition-colors text-left">
                      Team Settings
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-lg text-white">
                  <h3 className="font-bold text-lg mb-2">Pro Plan</h3>
                  <p className="text-emerald-100 text-sm mb-4">Get access to advanced analytics and unlimited projects.</p>
                  <button className="w-full py-2 bg-white text-emerald-600 rounded-lg font-medium text-sm hover:bg-emerald-50 transition-colors">
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
