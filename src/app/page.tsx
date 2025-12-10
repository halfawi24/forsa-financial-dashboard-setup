'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards';
import { MetricsGrid } from '@/components/charts/metrics-grid';
import { PortfolioLineChart } from '@/components/charts/portfolio-line-chart';
import { AllocationChart } from '@/components/charts/allocation-chart';
import { PerformanceBarChart } from '@/components/charts/performance-bar-chart';
import { HeatmapChart } from '@/components/charts/heatmap-chart';
import { Navigation } from '@/components/navigation';
import { Bell, Settings } from 'lucide-react';

const generateChartData = () => {
  const data = [];
  for (let i = 30; i >= 0; i--) {
    data.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }),
      value: 245000 + Math.random() * 20000
    });
  }
  return data;
};

const allocationData = [
  { name: 'Equities', value: 45 },
  { name: 'Fixed Income', value: 30 },
  { name: 'Real Estate', value: 15 },
  { name: 'Alternatives', value: 10 }
];

const performanceData = [
  { name: 'Q1', value: 8.5, benchmark: 6.2 },
  { name: 'Q2', value: 12.3, benchmark: 9.1 },
  { name: 'Q3', value: 10.7, benchmark: 8.4 },
  { name: 'Q4', value: 15.2, benchmark: 11.8 }
];

const heatmapData = Array.from({ length: 28 }, (_, i) => ({
  day: `Day ${i + 1}`,
  value: Math.floor(Math.random() * 100),
  percentage: Math.random() * 100
}));

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    setChartData(generateChartData());
    
    setMetrics([
      {
        label: 'Portfolio Value',
        value: '$2,549,750',
        change: 12.5,
        unit: 'AUM'
      },
      {
        label: 'Year-to-Date Return',
        value: '18.2%',
        change: 4.3,
        unit: 'vs 13.9% benchmark'
      },
      {
        label: 'Allocation Risk',
        value: '6.8',
        change: -2.1,
        unit: 'Volatility %'
      },
      {
        label: 'Projected 1-Year IRR',
        value: '22.5%',
        change: 8.7,
        unit: 'NPV: $450K'
      }
    ]);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
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
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold text-foreground">
                Portfolio Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Real-time analysis with enterprise-grade reasoning and audit trails
              </p>
            </div>
            <div className="flex gap-3">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </motion.section>

        {/* KPI Metrics */}
        <motion.section variants={itemVariants}>
          <MetricsGrid metrics={metrics} />
        </motion.section>

        {/* Main Charts Grid */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Performance */}
          <div className="lg:col-span-2">
            <Card variant="premium" className="h-full">
              <CardContent className="pt-6">
                <PortfolioLineChart
                  data={chartData}
                  title="Portfolio Performance"
                  metric="30-Day Trend"
                  showArea={true}
                />
              </CardContent>
            </Card>
          </div>

          {/* Allocation Pie Chart */}
          <div>
            <Card variant="premium" className="h-full">
              <CardContent className="pt-6">
                <AllocationChart data={allocationData} title="Asset Allocation" />
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Performance vs Benchmark */}
        <motion.section variants={itemVariants}>
          <Card variant="premium">
            <CardContent className="pt-6">
              <PerformanceBarChart
                data={performanceData}
                title="Quarterly Performance vs Benchmark"
              />
            </CardContent>
          </Card>
        </motion.section>

        {/* Activity Heatmap */}
        <motion.section variants={itemVariants}>
          <Card variant="premium">
            <CardContent className="pt-6">
              <HeatmapChart data={heatmapData} title="Trading Activity Heatmap" />
            </CardContent>
          </Card>
        </motion.section>

        {/* Analysis Grid */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Holdings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Technology Growth Fund', value: '$425,000', pct: '16.7%' },
                { name: 'Real Estate Portfolio', value: '$385,000', pct: '15.1%' },
                { name: 'Fixed Income', value: '$380,000', pct: '14.9%' },
                { name: 'International Equities', value: '$325,000', pct: '12.7%' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between pb-3 border-b border-border last:border-0"
                >
                  <span className="text-sm text-foreground">{item.name}</span>
                  <div className="text-right">
                    <p className="text-sm font-medium">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.pct}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Sharpe Ratio', value: '1.82', status: 'Excellent' },
                { label: 'Maximum Drawdown', value: '-8.5%', status: 'Moderate' },
                { label: 'Beta', value: '0.92', status: 'Low' },
                { label: 'Value at Risk (95%)', value: '-$12,450', status: 'Monitored' }
              ].map((item, idx) => (
                <div key={idx} className="pb-3 border-b border-border last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.section>
      </motion.main>
    </div>
  );
}
