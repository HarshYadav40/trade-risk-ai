import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const ChartSection: React.FC = () => {
  // Dummy data for feature importance visualization
  const dummyFeatures = [
    { name: 'Volatility', importance: 85 },
    { name: 'RSI', importance: 72 },
    { name: 'MACD', importance: 68 },
    { name: 'Moving Avg', importance: 55 },
    { name: 'Volume', importance: 42 },
    { name: 'Bollinger Bands', importance: 38 },
  ];

  const dummyPriceData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    price: 100 + Math.sin(i * 0.3) * 15 + Math.random() * 10,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Feature Importance Chart */}
      <Card className="p-6 gradient-card shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Feature Importance</h3>
            <p className="text-sm text-muted-foreground">Model decision factors</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {dummyFeatures.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm font-medium text-foreground w-20 text-right">
                {feature.name}
              </span>
              <div className="flex-1 bg-secondary rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${feature.importance}%` }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                  className="h-full gradient-primary rounded-full"
                />
              </div>
              <span className="text-sm text-muted-foreground w-10">
                {feature.importance}%
              </span>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Price Trend Visualization */}
      <Card className="p-6 gradient-card shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20">
            <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Price Trend</h3>
            <p className="text-sm text-muted-foreground">30-day overview</p>
          </div>
        </div>
        
        <div className="relative h-48 flex items-end gap-1">
          {dummyPriceData.map((point, index) => (
            <motion.div
              key={point.day}
              initial={{ height: 0 }}
              animate={{ height: `${(point.price / 130) * 100}%` }}
              transition={{ delay: 0.8 + index * 0.02, duration: 0.3 }}
              className="flex-1 bg-gradient-to-t from-primary/60 to-primary rounded-t-sm min-h-[4px]"
              title={`Day ${point.day}: $${point.price.toFixed(2)}`}
            />
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground mt-3">
          <span>Day 1</span>
          <span>Day 15</span>
          <span>Day 30</span>
        </div>
      </Card>

      {/* Volatility Indicator */}
      <Card className="p-6 gradient-card shadow-card lg:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
            <Activity className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Volatility Analysis</h3>
            <p className="text-sm text-muted-foreground">Rolling standard deviation of returns</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-background rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-foreground mb-1">2.3%</div>
            <div className="text-sm text-muted-foreground">Daily Volatility</div>
          </div>
          <div className="text-center p-4 bg-background rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-foreground mb-1">16.2%</div>
            <div className="text-sm text-muted-foreground">Annual Volatility</div>
          </div>
          <div className="text-center p-4 bg-background rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-foreground mb-1">0.85</div>
            <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};