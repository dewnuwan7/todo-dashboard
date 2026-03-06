import { motion } from 'motion/react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface StatsProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-500 font-medium">Total Tasks</h3>
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Circle size={20} />
          </div>
        </div>
        <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-500 font-medium">Completed</h3>
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <CheckCircle2 size={20} />
          </div>
        </div>
        <p className="text-3xl font-bold text-slate-900">{stats.completed}</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-500 font-medium">Pending</h3>
          <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
            <Clock size={20} />
          </div>
        </div>
        <p className="text-3xl font-bold text-slate-900">{stats.pending}</p>
      </motion.div>
    </div>
  );
}
