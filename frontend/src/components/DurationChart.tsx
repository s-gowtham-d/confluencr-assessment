import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartCard } from './ChartCard';
import { type ChartData } from '../types';

interface DurationChartProps {
  data: ChartData[];
}

export const DurationChart: React.FC<DurationChartProps> = ({ data }) => {
  return (
    <ChartCard title="Average Call Duration (min)">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis dataKey="name" stroke="#60a5fa" />
          <YAxis stroke="#60a5fa" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e1b4b',
              border: '1px solid #3b82f6',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#60a5fa' }}
          />
          <Line
            type="monotone"
            dataKey="duration"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};