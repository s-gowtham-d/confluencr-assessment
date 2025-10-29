import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartCard } from './ChartCard';
import { type OutcomeData } from '../types';

interface OutcomeChartProps {
  data: OutcomeData[];
}

export const OutcomeChart: React.FC<OutcomeChartProps> = ({ data }) => {
  return (
    <ChartCard title="Call Outcomes">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
            // @ts-ignore
          <Pie
            // @ts-ignore
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            // @ts-ignore
            label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e1b4b',
              border: '1px solid #7c3aed',
              borderRadius: '8px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
