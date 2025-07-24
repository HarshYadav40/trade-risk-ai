import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export type RiskLevel = 'low' | 'medium' | 'high';

interface RiskCardProps {
  riskLevel: RiskLevel;
  featuresUsed?: string[];
}

export const RiskCard: React.FC<RiskCardProps> = ({ riskLevel, featuresUsed = [] }) => {
  const getRiskConfig = (level: RiskLevel) => {
    switch (level) {
      case 'high':
        return {
          icon: TrendingDown,
          color: 'risk-badge-high',
          bgColor: 'bg-red-50 dark:bg-red-950/10',
          borderColor: 'border-red-200 dark:border-red-800',
          title: 'HIGH RISK',
          description: 'This stock shows high volatility patterns',
          emoji: '🔴',
        };
      case 'medium':
        return {
          icon: Minus,
          color: 'risk-badge-medium',
          bgColor: 'bg-yellow-50 dark:bg-yellow-950/10',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          title: 'MEDIUM RISK',
          description: 'This stock shows moderate volatility patterns',
          emoji: '🟡',
        };
      case 'low':
        return {
          icon: TrendingUp,
          color: 'risk-badge-low',
          bgColor: 'bg-green-50 dark:bg-green-950/10',
          borderColor: 'border-green-200 dark:border-green-800',
          title: 'LOW RISK',
          description: 'This stock shows stable volatility patterns',
          emoji: '🟢',
        };
    }
  };

  const config = getRiskConfig(riskLevel);
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className={`p-8 ${config.bgColor} ${config.borderColor} border-2 shadow-elegant`}>
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background shadow-card mb-4"
          >
            <Icon className="h-10 w-10 text-foreground" />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Badge className={`${config.color} text-lg font-bold px-4 py-2 mb-3`}>
              {config.emoji} {config.title}
            </Badge>
            <p className="text-lg text-foreground font-medium">
              {config.description}
            </p>
          </motion.div>
        </div>

        {featuresUsed.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="border-t border-border pt-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Analysis Features
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {featuresUsed.slice(0, 6).map((feature, index) => (
                <motion.span
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="px-2 py-1 bg-background rounded-md text-xs font-medium text-muted-foreground shadow-sm"
                >
                  {feature.replace(/_/g, ' ')}
                </motion.span>
              ))}
              {featuresUsed.length > 6 && (
                <span className="px-2 py-1 bg-background rounded-md text-xs font-medium text-muted-foreground shadow-sm">
                  +{featuresUsed.length - 6} more
                </span>
              )}
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};