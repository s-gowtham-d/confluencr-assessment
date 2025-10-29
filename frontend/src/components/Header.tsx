import React from 'react';
import { Activity } from 'lucide-react';

interface HeaderProps {
  email?: string;
  isEmailSubmitted: boolean;
}

export const Header: React.FC<HeaderProps> = ({ email, isEmailSubmitted }) => {
  return (
    <div className="border-b border-purple-500/20 bg-black/20 backdrop-blur-sm fixed top-0 w-full z-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">Voice Agent Analytics</h1>
          </div>
          {isEmailSubmitted && (
            <div className="text-sm text-purple-300">{email}</div>
          )}
        </div>
      </div>
    </div>
  );
};
