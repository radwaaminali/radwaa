import React from 'react';
import { StatItem } from '../types';
import { motion } from 'framer-motion';

interface StatCardProps {
  stat: StatItem;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{stat.title}</p>
          <h3 className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</h3>
        </div>
        <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
          <stat.icon size={24} className={stat.color.replace('bg-', 'text-')} />
        </div>
      </div>
      {stat.change && (
        <div className="mt-4 flex items-center text-sm">
          <span className={stat.isPositive ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
            {stat.change}
          </span>
          <span className="ml-2 text-gray-400">vs last month</span>
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
