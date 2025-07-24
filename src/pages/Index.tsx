import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, BarChart, Shield } from 'lucide-react';
import { UploadForm } from '@/components/UploadForm';
import { RiskCard, RiskLevel } from '@/components/RiskCard';
import { ChartSection } from '@/components/ChartSection';
import { ErrorAlert } from '@/components/ErrorAlert';
import { ApiService, AnalysisResult } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await ApiService.analyzeStock(file);
      setAnalysisResult(result);
      toast({
        title: "Analysis Complete",
        description: `Risk level: ${result.risk_level.toUpperCase()}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze stock data';
      setError(errorMessage);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);
  const resetAnalysis = () => {
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden pt-20 pb-16"
      >
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full gradient-primary">
                  <TrendingUp className="h-8 w-8 text-primary-foreground" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                  Fin<span className="text-primary">Sight</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                Professional Stock Risk Analysis
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload stock data to reveal its risk potential using advanced machine learning algorithms
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span>Technical Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>ML-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Real-time Insights</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence>
            {error && (
              <ErrorAlert message={error} onClose={clearError} />
            )}
          </AnimatePresence>

          <div className="max-w-4xl mx-auto">
            {!analysisResult ? (
              <UploadForm onFileUpload={handleFileUpload} isLoading={isLoading} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Analysis Results
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetAnalysis}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Analyze New File
                  </motion.button>
                </div>

                <RiskCard 
                  riskLevel={analysisResult.risk_level}
                  featuresUsed={analysisResult.features_used}
                />

                <ChartSection />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="py-8 border-t border-border"
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 FinSight. Professional stock risk analysis powered by machine learning.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
