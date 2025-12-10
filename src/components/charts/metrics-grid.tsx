'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricData {
  label: string;
  value: string | number;
  change?: number;
  unit?: string;
  icon?: React.ReactNode;
}

interface MetricsGridProps {
  metrics: MetricData[];
  className?: string;
}

export function MetricsGrid({ metrics, className }: MetricsGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4', className)}
    >
      {metrics.map((metric, idx) => (
        <motion.div key={idx} variants={itemVariants}>
          <div className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-semibold text-foreground">
                    {metric.value}
                  </span>
                  {metric.unit && (
                    <span className="text-sm text-muted-foreground">{metric.unit}</span>
                  )}
                </div>
              </div>
              {metric.icon ? (
                <div className="text-primary/60 ml-4">{metric.icon}</div>
              ) : metric.change !== undefined ? (
                <div
                  className={cn(
                    'ml-4 p-2 rounded-lg',
                    metric.change > 0
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : metric.change < 0
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {metric.change > 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : metric.change < 0 ? (
                    <TrendingDown className="w-4 h-4" />
                  ) : (
                    <Minus className="w-4 h-4" />
                  )}
                </div>
              ) : null}
            </div>
            {metric.change !== undefined && (
              <p className="text-xs text-muted-foreground mt-3">
                {metric.change > 0 ? '+' : ''}{metric.change.toFixed(2)}% vs last period
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
