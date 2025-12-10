'use client';

import { useState } from 'react';
import { Download, FileJson, FileText, File } from 'lucide-react';
import { useNotifications } from '@/app/providers/notification-provider';
import { generateCSV, generateJSON, generatePDFHTML, downloadFile } from '@/lib/export';
import { motion } from 'framer-motion';

interface ExportButtonProps {
  data?: {
    title: string;
    metrics: Record<string, any>;
    summary: string;
  };
}

export function ExportButton({ data }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { addNotification } = useNotifications();

  const defaultData = {
    title: 'Financial Analysis Report',
    metrics: {
      'Portfolio Value': '$2,549,750',
      'YTD Return': '18.2%',
      'IRR': '22.5%',
      'Risk Level': 'Moderate'
    },
    summary: 'Comprehensive portfolio analysis showing strong performance with calculated IRR of 22.5% and year-to-date returns of 18.2%. All calculations backed by enterprise-grade reasoning and audit trails.'
  };

  const exportData = data || defaultData;

  const handleExport = (format: 'csv' | 'json' | 'pdf') => {
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      
      let content = '';
      let filename = '';
      let mimeType = 'text/plain';

      if (format === 'csv') {
        content = generateCSV({
          ...exportData,
          date: new Date().toISOString(),
          charts: []
        });
        filename = `financial-report-${timestamp}.csv`;
        mimeType = 'text/csv';
      } else if (format === 'json') {
        content = generateJSON({
          ...exportData,
          date: new Date().toISOString(),
          charts: []
        });
        filename = `financial-report-${timestamp}.json`;
        mimeType = 'application/json';
      } else if (format === 'pdf') {
        content = generatePDFHTML({
          ...exportData,
          date: new Date().toISOString(),
          charts: []
        });
        filename = `financial-report-${timestamp}.html`;
        mimeType = 'text/html';
      }

      downloadFile(content, filename, mimeType);
      
      addNotification({
        type: 'success',
        title: 'Export Successful',
        message: `Report exported as ${format.toUpperCase()}`
      });
      
      setIsOpen(false);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Export Failed',
        message: 'Failed to generate export file'
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-medium"
      >
        <Download className="w-4 h-4" />
        Export
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50"
        >
          <div className="p-2 space-y-1">
            <button
              onClick={() => handleExport('csv')}
              className="w-full text-left px-3 py-2 hover:bg-muted rounded flex items-center gap-2 text-foreground text-sm"
            >
              <File className="w-4 h-4" />
              Export as CSV
            </button>
            <button
              onClick={() => handleExport('json')}
              className="w-full text-left px-3 py-2 hover:bg-muted rounded flex items-center gap-2 text-foreground text-sm"
            >
              <FileJson className="w-4 h-4" />
              Export as JSON
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="w-full text-left px-3 py-2 hover:bg-muted rounded flex items-center gap-2 text-foreground text-sm"
            >
              <FileText className="w-4 h-4" />
              Export as PDF
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
