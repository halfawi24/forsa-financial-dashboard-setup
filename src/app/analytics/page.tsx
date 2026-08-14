'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards';
import { PortfolioLineChart } from '@/components/charts/portfolio-line-chart';
import { MetricsGrid } from '@/components/charts/metrics-grid';
import { Navigation } from '@/components/navigation';
import { PieChart as PieChartIcon, TrendingUp } from 'lucide-react';

const generateAnalyticsData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }),
    value: 200000 + Math.random() * 50000,
    gain: (Math.random() - 0.3) * 20
  }));
};

const attributionData = [
  { category: 'Equity Selection', return: 5.2, contribution: '45%' },
  { category: 'Asset Allocation', return: 3.1, contribution: '27%' },
  { category: 'Fixed Income', return: 2.8, contribution: '24%' },
  { category: 'Market Timing', return: 1.1, contribution: '10%' },
  { category: 'Costs & Fees', return: -0.8, contribution: '-7%' }
];

const sectorData = [
  { name: 'Technology', return: 28.5, weight: 25 },
  { name: 'Healthcare', return: 18.2, weight: 20 },
  { name: 'Financials', return: 15.4, weight: 18 },
  { name: 'Energy', return: 12.1, weight: 15 },
  { name: 'Industrials', return: 9.8, weight: 12 },
  { name: 'Consumer', return: 8.3, weight: 10 }
];

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    setAnalyticsData(generateAnalyticsData());
    setMetrics([
      {
        label: 'Total Return',
        value: '+18.2%',
        change: 4.3,
        unit: 'Year-to-Date'
      },
      {
        label: 'Alpha Generated',
        value: '+4.3%',
        change: 2.1,
        unit: 'vs Benchmark'
      },
      {
        label: 'Downside Capture',
        value: '72.5%',
        change: -5.2,
        unit: 'Risk Management'
      },
      {
        label: 'Information Ratio',
        value: '1.45',
        change: 1.8,
        unit: 'Risk-Adjusted'
      }
    ]);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 py-8 space-y-8"
      >
        {/* Header */}
        <motion.section variants={itemVariants} className="space-y-2">
          <h1 className="font-display text-4xl font-bold text-foreground">
            Detailed Analytics
          </h1>
          <p className="text-muted-foreground">
            Performance attribution, sector analysis, and risk decomposition
          </p>
        </motion.section>

        {/* Key Metrics */}
        <motion.section variants={itemVariants}>
          <MetricsGrid metrics={metrics} />
        </motion.section>

        {/* Performance Chart */}
        <motion.section variants={itemVariants}>
          <Card variant="premium">
            <CardContent className="pt-6">
              <PortfolioLineChart
                data={analyticsData}
                title="Performance Analysis"
                metric="30-Day Detailed View"
                showArea={true}
              />
            </CardContent>
          </Card>
        </motion.section>

        {/* Attribution & Sector Analysis */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Attribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Performance Attribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {attributionData.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{item.category}</span>
                    <span className={`text-sm font-semibold ${
                      item.return > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {item.return > 0 ? '+' : ''}{item.return.toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      style={{
                        width: `${Math.abs(parseFloat(item.contribution))}%`,
                        opacity: item.return > 0 ? 0.8 : 0.5
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{item.contribution} of total return</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sector Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-accent" />
                Sector Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sectorData.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                    <span className="text-sm font-semibold text-primary">{item.return.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-chart-1 to-chart-2"
                        style={{ width: `${item.weight}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-10 text-right">{item.weight}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.section>

        {/* Detailed Metrics Grid */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Cumulative Return', value: '+$245,750', metric: 'Since Inception' },
            { label: 'Best Day', value: '+4.2%', metric: 'Nov 15, 2024' },
            { label: 'Worst Day', value: '-2.8%', metric: 'Oct 3, 2024' },
            { label: 'Consistent Months', value: '9/12', metric: 'Positive Returns' },
            { label: 'Win Rate', value: '78.5%', metric: 'Trading Success' },
            { label: 'Risk-Adjusted Return', value: '2.35x', metric: 'Sharpe Ratio' }
          ].map((item, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-2">{item.label}</p>
                <p className="font-display text-2xl font-semibold text-foreground mb-1">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.metric}</p>
              </CardContent>
            </Card>
          ))}
        </motion.section>
      </motion.main>
    </div>
  );
}
