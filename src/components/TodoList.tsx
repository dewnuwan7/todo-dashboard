import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Check, Circle } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  created_at: string;
}

interface TodoListProps {
  todos: Todo[];
  onAdd: (text: string) => void;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todos, onAdd, onToggle, onDelete }: TodoListProps) {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAdd(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Recent Tasks</h2>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new task..."
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm w-64"
          />
          <button 
            type="submit"
            className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus size={20} />
          </button>
        </form>
      </div>

      <div className="divide-y divide-slate-100">
        <AnimatePresence initial={false}>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onToggle(todo.id, !todo.completed)}
                  className={`p-1 rounded-full transition-colors ${
                    todo.completed ? 'text-emerald-500 bg-emerald-50' : 'text-slate-300 hover:text-slate-400'
                  }`}
                >
                  {todo.completed ? <Check size={20} /> : <Circle size={20} />}
                </button>
                <span className={`text-sm font-medium ${
                  todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'
                }`}>
                  {todo.text}
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400 font-mono">
                  {new Date(todo.created_at).toLocaleDateString()}
                </span>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
          {todos.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No tasks yet. Add one above!
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
