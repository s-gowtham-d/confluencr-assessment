import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconColor: string;
  bgColor: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  label,
  value,
  iconColor,
  bgColor,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
      <div className="flex items-center gap-4">
        <div className={`p-3 ${bgColor} rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
          <div className={`${iconColor} text-sm`}>{label}</div>
          <div className="text-3xl font-bold text-white">{value}</div>
        </div>
      </div>
    </div>
  );
};
