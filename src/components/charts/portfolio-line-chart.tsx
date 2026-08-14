'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChartData {
  date: string;
  value: number;
  gain?: number;
}

interface PortfolioLineChartProps {
  data: ChartData[];
  title: string;
  metric?: string;
  showArea?: boolean;
  color?: string;
  className?: string;
}

export function PortfolioLineChart({
  data,
  title,
  metric = 'Portfolio Value',
  showArea = true,
  color = 'hsl(var(--primary))',
  className
}: PortfolioLineChartProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const Chart = showArea ? AreaChart : LineChart;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('w-full h-full', className)}
    >
      <div className="space-y-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{metric}</p>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <Chart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.6} />
                <stop offset="50%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            {showArea ? (
              <>
                <Area type="monotone" dataKey="value" stroke={color} fill="url(#colorGradient)" />
              </>
            ) : (
              <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
            )}
          </Chart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
