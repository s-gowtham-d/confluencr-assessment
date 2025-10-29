import React from 'react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children, actions }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {actions}
      </div>
      {children}
    </div>
  );
};