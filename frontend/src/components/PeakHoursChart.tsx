import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartCard } from './ChartCard';
import { type ChartData } from '../types';

interface PeakHoursChartProps {
  data: ChartData[];
}

export const PeakHoursChart: React.FC<PeakHoursChartProps> = ({ data }) => {
  return (
    <ChartCard title="Peak Call Hours">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis dataKey="hour" stroke="#34d399" />
          <YAxis stroke="#34d399" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e1b4b',
              border: '1px solid #10b981',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#34d399' }}
          />
          <Bar dataKey="calls" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
