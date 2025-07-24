import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Alert className="border-destructive/50 text-destructive bg-destructive/5 mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>{message}</span>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-auto p-1">
            <X className="h-4 w-4" />
          </Button>
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};