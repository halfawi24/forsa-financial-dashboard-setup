'use client';

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AllocationData {
  name: string;
  value: number;
  color?: string;
}

interface AllocationChartProps {
  data: AllocationData[];
  title: string;
  className?: string;
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))'
];

export function AllocationChart({ data, title, className }: AllocationChartProps) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  const dataWithColors = data.map((item, idx) => ({
    ...item,
    color: item.color || COLORS[idx % COLORS.length]
  }));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('w-full', className)}
    >
      <div className="space-y-4">
        <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
        
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={dataWithColors}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {dataWithColors.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
              formatter={(value: any) => `${parseFloat(value).toFixed(1)}%`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 gap-2">
          {dataWithColors.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-medium ml-auto">{parseFloat(item.value as any).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
