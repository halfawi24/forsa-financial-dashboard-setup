'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-5 h-5" />;
    case 'error':
      return <AlertCircle className="w-5 h-5" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5" />;
    case 'info':
      return <Info className="w-5 h-5" />;
  }
};

const getStyles = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
    case 'error':
      return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
    case 'warning':
      return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200';
    case 'info':
      return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
  }
};

export function NotificationSystem({ notifications, onRemove }: NotificationSystemProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20, x: 20 },
    visible: { opacity: 1, y: 0, x: 0 },
    exit: { opacity: 0, y: -20, x: 20 }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-20 right-4 z-50 max-w-md space-y-2"
      >
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            variants={itemVariants}
            className={cn(
              'border rounded-lg p-4 flex items-start gap-3 shadow-lg',
              getStyles(notification.type)
            )}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm">{notification.title}</h3>
              <p className="text-sm opacity-90 mt-1">{notification.message}</p>
            </div>
            <button
              onClick={() => onRemove(notification.id)}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
