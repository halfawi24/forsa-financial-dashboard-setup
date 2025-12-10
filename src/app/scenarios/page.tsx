'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards';
import { Navigation } from '@/components/navigation';
import { Zap, Play, RotateCcw } from 'lucide-react';

interface Scenario {
  name: string;
  equityReturn: number;
  fixedIncomeReturn: number;
  realEstateReturn: number;
  confidence: number;
  projectedValue: number;
  irr: number;
}

const defaultScenario: Scenario = {
  name: 'Base Case',
  equityReturn: 10,
  fixedIncomeReturn: 4,
  realEstateReturn: 7,
  confidence: 100,
  projectedValue: 3050000,
  irr: 12.5
};

export default function Scenarios() {
  const [scenarios, setScenarios] = useState<Scenario[]>([defaultScenario]);
  const [activeScenario, setActiveScenario] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  const current = scenarios[activeScenario];

  const handleScenarioChange = (key: keyof Omit<Scenario, 'name' | 'confidence' | 'projectedValue' | 'irr'>, value: number) => {
    const newScenarios = [...scenarios];
    newScenarios[activeScenario] = { ...current, [key]: value };

    // Recalculate projected values
    const totalReturn = (newScenarios[activeScenario].equityReturn * 0.45 +
                        newScenarios[activeScenario].fixedIncomeReturn * 0.30 +
                        newScenarios[activeScenario].realEstateReturn * 0.25) / 100;

    newScenarios[activeScenario].projectedValue = Math.round(2549750 * (1 + totalReturn));
    newScenarios[activeScenario].irr = parseFloat(((totalReturn * 25) + 2.5).toFixed(2)); // Simplified IRR calc
    newScenarios[activeScenario].confidence = Math.max(50, Math.min(100, 100 - Math.abs(
      (newScenarios[activeScenario].equityReturn - 10) +
      (newScenarios[activeScenario].fixedIncomeReturn - 4) +
      (newScenarios[activeScenario].realEstateReturn - 7)
    ) * 2));

    setScenarios(newScenarios);
  };

  const addScenario = () => {
    const newScenario = { ...current, name: `Scenario ${scenarios.length}` };
    setScenarios([...scenarios, newScenario]);
    setActiveScenario(scenarios.length);
  };

  const removeScenario = (idx: number) => {
    if (scenarios.length > 1) {
      setScenarios(scenarios.filter((_, i) => i !== idx));
      if (activeScenario === idx) setActiveScenario(0);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
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
          <h1 className="font-display text-4xl font-bold text-foreground flex items-center gap-3">
            <Zap className="w-8 h-8 text-primary" />
            Scenario Analysis
          </h1>
          <p className="text-muted-foreground">
            Interactive what-if analysis with real-time impact modeling
          </p>
        </motion.section>

        {/* Main Content */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scenario Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Scenarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {scenarios.map((scenario, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveScenario(idx)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeScenario === idx
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {scenario.name}
                    </button>
                  ))}
                  <button
                    onClick={addScenario}
                    className="px-3 py-2 rounded-lg text-sm font-medium bg-accent/10 text-accent hover:bg-accent/20 transition-all"
                  >
                    + Add
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Scenario Controls */}
            <Card variant="premium">
              <CardHeader>
                <CardTitle>Assumptions: {current.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: 'Equity Return', key: 'equityReturn', min: -20, max: 40 },
                  { label: 'Fixed Income Return', key: 'fixedIncomeReturn', min: -5, max: 15 },
                  { label: 'Real Estate Return', key: 'realEstateReturn', min: 0, max: 20 }
                ].map((item) => (
                  <div key={item.key}>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-foreground">{item.label}</label>
                      <span className="text-lg font-semibold text-primary">
                        {(current as any)[item.key as keyof Scenario]}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={item.min}
                      max={item.max}
                      value={(current as any)[item.key as keyof Scenario]}
                      onChange={(e) =>
                        handleScenarioChange(item.key as any, parseFloat(e.target.value))
                      }
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>{item.min}%</span>
                      <span>{item.max}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Sensitivity Table */}
            <Card>
              <CardHeader>
                <CardTitle>Sensitivity Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-2 font-semibold text-foreground">Equity</th>
                        <th className="text-left py-2 px-2 font-semibold text-foreground">5% Return</th>
                        <th className="text-left py-2 px-2 font-semibold text-foreground">10% Return</th>
                        <th className="text-left py-2 px-2 font-semibold text-foreground">15% Return</th>
                      </tr>
                    </thead>
                    <tbody>
                      {['Fixed Income', 'Real Estate', 'Alternatives'].map((row, idx) => (
                        <tr key={idx} className="border-b border-border hover:bg-muted/50">
                          <td className="py-2 px-2 text-foreground">{row}</td>
                          {[5, 10, 15].map((col) => (
                            <td key={col} className="py-2 px-2 text-muted-foreground">
                              ${Math.round(2549750 * (1 + (10 + col + idx * 2) / 100) / 1000000).toFixed(2)}M
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="space-y-4">
            {/* Key Outputs */}
            <Card variant="premium" className="border-accent/50">
              <CardHeader>
                <CardTitle className="text-lg">Projected Outcomes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">1-Year Value</p>
                  <p className="font-display text-3xl font-bold text-foreground">
                    ${(current.projectedValue / 1000000).toFixed(2)}M
                  </p>
                  <p className="text-xs text-primary">
                    +${((current.projectedValue - 2549750) / 1000).toFixed(0)}K gain
                  </p>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Projected IRR</p>
                  <p className="font-display text-3xl font-bold text-accent">
                    {current.irr.toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    vs 12.5% historical
                  </p>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Confidence Level</p>
                  <div className="flex items-end gap-2">
                    <p className="font-display text-2xl font-bold text-foreground">
                      {Math.round(current.confidence)}%
                    </p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-primary"
                      style={{ width: `${current.confidence}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 font-medium">
                <Play className="w-4 h-4" />
                Analyze
              </button>
              <button
                onClick={() => {
                  setScenarios([{ ...defaultScenario }]);
                  setActiveScenario(0);
                }}
                className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-all flex items-center justify-center gap-2 font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            {/* Scenario Comparison Toggle */}
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="w-full px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-all font-medium text-sm"
            >
              {showComparison ? 'Hide Comparison' : 'Show Comparison'}
            </button>

            {/* Comparison View */}
            {showComparison && (
              <Card>
                <CardHeader>
                  <CardTitle>Scenario Comparison</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {scenarios.map((scenario, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border transition-all ${
                        activeScenario === idx
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-accent'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{scenario.name}</span>
                        {scenarios.length > 1 && activeScenario !== idx && (
                          <button
                            onClick={() => removeScenario(idx)}
                            className="text-xs text-destructive hover:opacity-70"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Value: ${(scenario.projectedValue / 1000000).toFixed(2)}M | IRR: {scenario.irr.toFixed(1)}%
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}
