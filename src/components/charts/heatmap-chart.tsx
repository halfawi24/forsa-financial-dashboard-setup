'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeatmapData {
  day: string;
  value: number;
  percentage: number;
}

interface HeatmapChartProps {
  data: HeatmapData[];
  title: string;
  className?: string;
}

const getIntensity = (percentage: number) => {
  if (percentage >= 80) return 'bg-chart-1/100 dark:bg-chart-1/80';
  if (percentage >= 60) return 'bg-chart-1/70 dark:bg-chart-1/60';
  if (percentage >= 40) return 'bg-chart-1/50 dark:bg-chart-1/40';
  if (percentage >= 20) return 'bg-chart-1/30 dark:bg-chart-1/25';
  return 'bg-muted';
};

export function HeatmapChart({ data, title, className }: HeatmapChartProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const weeks = Array.from({ length: Math.ceil(data.length / 7) });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('w-full', className)}
    >
      <div className="space-y-4">
        <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
        
        <div className="overflow-x-auto">
          <div className="space-y-2">
            {weeks.map((_, weekIdx) => (
              <div key={weekIdx} className="flex gap-1">
                {Array.from({ length: 7 }).map((_, dayIdx) => {
                  const dataIdx = weekIdx * 7 + dayIdx;
                  const item = data[dataIdx];
                  
                  if (!item) return null;
                  
                  return (
                    <div
                      key={`${weekIdx}-${dayIdx}`}
                      className={cn(
                        'w-8 h-8 rounded border border-border transition-all hover:border-accent cursor-pointer group',
                        getIntensity(item.percentage)
                      )}
                      title={`${item.day}: ${item.value} (${item.percentage}%)`}
                    >
                      <div className="absolute hidden group-hover:block bg-card border border-border rounded px-2 py-1 text-xs text-foreground whitespace-nowrap z-10 mt-8 ml-0">
                        {item.day}: {item.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-muted" />
              <span>Low</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-chart-1/50" />
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-chart-1" />
              <span>High</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
