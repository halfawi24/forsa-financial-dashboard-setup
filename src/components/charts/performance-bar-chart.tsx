'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PerformanceData {
  name: string;
  value: number;
  benchmark?: number;
}

interface PerformanceBarChartProps {
  data: PerformanceData[];
  title: string;
  className?: string;
}

export function PerformanceBarChart({ data, title, className }: PerformanceBarChartProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('w-full', className)}
    >
      <div className="space-y-4">
        <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Legend />
            <Bar dataKey="value" fill="hsl(var(--chart-1))" name="Portfolio" />
            {data[0]?.benchmark !== undefined && (
              <Bar dataKey="benchmark" fill="hsl(var(--chart-2))" name="Benchmark" />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
