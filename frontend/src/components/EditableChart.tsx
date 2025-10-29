import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Edit2, Save, X } from 'lucide-react';
import { ChartCard } from './ChartCard';
import { type ChartData } from '../types';

interface EditableChartProps {
  data: ChartData[];
  onSave: (newData: ChartData[]) => void;
  onEdit: () => void;
  isEmailSubmitted: boolean;
}

export const EditableChart: React.FC<EditableChartProps> = ({
  data,
  onSave,
  onEdit,
  isEmailSubmitted,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState<ChartData[]>([]);

  const startEditing = () => {
    if (!isEmailSubmitted) {
      onEdit();
      return;
    }
    setTempData([...data]);
    setIsEditing(true);
  };

  const updateValue = (index: number, value: string) => {
    const newData = [...tempData];
    newData[index] = { ...newData[index], calls: parseFloat(value) || 0 };
    setTempData(newData);
  };

  const handleSave = () => {
    onSave(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData([]);
  };

  const actions = !isEditing ? (
    <button
      onClick={startEditing}
      className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-colors"
    >
      <Edit2 className="w-4 h-4" />
      Edit
    </button>
  ) : (
    <div className="flex gap-2">
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition-colors"
      >
        <Save className="w-4 h-4" />
        Save
      </button>
      <button
        onClick={handleCancel}
        className="flex items-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
        Cancel
      </button>
    </div>
  );

  return (
    <ChartCard title="Weekly Call Volume" actions={actions}>
      {isEditing ? (
        <div className="space-y-3">
          {tempData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-4">
              <span className="text-purple-300 w-12">{item.name}</span>
              <input
                type="number"
                value={item.calls}
                onChange={(e) => updateValue(index, e.target.value)}
                className="flex-1 px-3 py-2 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          ))}
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="name" stroke="#a78bfa" />
            <YAxis stroke="#a78bfa" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e1b4b',
                border: '1px solid #7c3aed',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#a78bfa' }}
            />
            <Bar dataKey="calls" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};