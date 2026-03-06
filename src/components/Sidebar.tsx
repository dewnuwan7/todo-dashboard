import { LayoutDashboard, CheckSquare, Settings, LogOut } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <CheckSquare className="text-emerald-500" />
          TaskMaster
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-slate-800 text-emerald-400 rounded-xl transition-colors">
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </a>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white w-full transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
