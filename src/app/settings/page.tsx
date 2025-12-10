'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards';
import { Navigation } from '@/components/navigation';
import { useTheme } from 'next-themes';
import { Settings, Moon, Sun, Bell, Download, Lock } from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [preferences, setPreferences] = useState({
    notifications: true,
    emailAlerts: true,
    riskAlerts: true,
    portfolio: true,
    darkMode: true,
    autoExport: false
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 py-8 space-y-8"
      >
        {/* Header */}
        <motion.section variants={itemVariants} className="space-y-2">
          <h1 className="font-display text-4xl font-bold text-foreground flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            Settings & Preferences
          </h1>
          <p className="text-muted-foreground">
            Customize your dashboard experience and configure notifications
          </p>
        </motion.section>

        {/* Display Settings */}
        <motion.section variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-primary" />
                Display Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Theme Preference
                </label>
                {mounted && (
                  <div className="flex gap-3">
                    {['light', 'dark', 'system'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          theme === t
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-6">
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Chart Density
                </label>
                <select className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Compact</option>
                  <option selected>Standard</option>
                  <option>Spacious</option>
                </select>
              </div>

              <div className="border-t border-border pt-6">
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Default View
                </label>
                <select className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Dashboard</option>
                  <option>Analytics</option>
                  <option selected>Scenarios</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Notifications */}
        <motion.section variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-accent" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: 'notifications',
                  label: 'Desktop Notifications',
                  description: 'Receive desktop alerts for portfolio updates'
                },
                {
                  key: 'emailAlerts',
                  label: 'Email Alerts',
                  description: 'Get daily summary emails of portfolio activity'
                },
                {
                  key: 'riskAlerts',
                  label: 'Risk Threshold Alerts',
                  description: 'Alert when portfolio risk exceeds thresholds'
                },
                {
                  key: 'portfolio',
                  label: 'Portfolio Updates',
                  description: 'Notify on significant portfolio changes'
                }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between pb-4 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <button
                    onClick={() => togglePreference(item.key as keyof typeof preferences)}
                    className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                      preferences[item.key as keyof typeof preferences]
                        ? 'bg-primary'
                        : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        preferences[item.key as keyof typeof preferences] ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.section>

        {/* Data & Export */}
        <motion.section variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-chart-1" />
                Data & Export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <button className="w-full px-4 py-3 border border-border rounded-lg hover:bg-muted transition-all text-foreground font-medium flex items-center justify-between group">
                <span>Export Portfolio Data (CSV)</span>
                <Download className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>

              <button className="w-full px-4 py-3 border border-border rounded-lg hover:bg-muted transition-all text-foreground font-medium flex items-center justify-between group">
                <span>Generate Annual Report (PDF)</span>
                <Download className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>

              <button className="w-full px-4 py-3 border border-border rounded-lg hover:bg-muted transition-all text-foreground font-medium flex items-center justify-between group">
                <span>Download Analysis Data (JSON)</span>
                <Download className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>

              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    id="autoExport"
                    checked={preferences.autoExport}
                    onChange={() => togglePreference('autoExport')}
                    className="rounded"
                  />
                  <label htmlFor="autoExport" className="text-sm font-medium text-foreground">
                    Enable Auto-Export
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically export reports weekly to your configured storage
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Security */}
        <motion.section variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-destructive" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <button className="w-full px-4 py-3 border border-border rounded-lg hover:bg-muted transition-all text-foreground font-medium">
                Change Password
              </button>

              <button className="w-full px-4 py-3 border border-border rounded-lg hover:bg-muted transition-all text-foreground font-medium">
                Enable Two-Factor Authentication
              </button>

              <button className="w-full px-4 py-3 border border-border rounded-lg hover:bg-muted transition-all text-foreground font-medium">
                View Activity Log
              </button>

              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-2">API Key Management</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Generate and manage API keys for programmatic access
                </p>
                <button className="text-sm text-primary hover:underline font-medium">
                  Manage API Keys →
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* About */}
        <motion.section variants={itemVariants}>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">FinDash Pro</p>
                <p className="text-xs text-muted-foreground">Version 1.0.0</p>
                <p className="text-xs text-muted-foreground mt-4">
                  Enterprise Financial Dashboard with Advanced Analytics
                </p>
                <div className="flex justify-center gap-4 mt-4 text-xs">
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>
                  <a href="#" className="text-primary hover:underline">Documentation</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </motion.main>
    </div>
  );
}
