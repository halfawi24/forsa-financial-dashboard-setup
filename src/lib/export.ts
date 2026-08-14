/**
 * Export utilities for generating reports in multiple formats
 */

export interface ExportData {
  title: string;
  date: string;
  metrics: Record<string, any>;
  charts: Array<{
    name: string;
    data: any[];
  }>;
  summary: string;
}

function escapeHtml(value: unknown): string {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/**
 * Generate CSV export
 */
export function generateCSV(data: ExportData): string {
  let csv = `Report: ${data.title}\n`;
  csv += `Generated: ${data.date}\n\n`;

  csv += 'METRICS\n';
  csv += 'Metric,Value\n';
  Object.entries(data.metrics).forEach(([key, value]) => {
    csv += `"${key}","${value}"\n`;
  });

  csv += '\n\nCHART DATA\n';
  data.charts.forEach(chart => {
    csv += `\n${chart.name}\n`;
    if (chart.data.length > 0) {
      const headers = Object.keys(chart.data[0]);
      csv += headers.join(',') + '\n';
      chart.data.forEach(row => {
        csv += Object.values(row).join(',') + '\n';
      });
    }
  });

  return csv;
}

/**
 * Download file helper
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate JSON export
 */
export function generateJSON(data: ExportData): string {
  return JSON.stringify({
    ...data,
    exportedAt: new Date().toISOString()
  }, null, 2);
}

/**
 * Generate PDF content (as HTML that can be printed)
 */
export function generatePDFHTML(data: ExportData): string {
  const metricsHTML = Object.entries(data.metrics)
    .map(([key, value]) => `<tr><td>${escapeHtml(key)}</td><td>${escapeHtml(value)}</td></tr>`)
    .join('');

  const chartsHTML = data.charts
    .map(chart => `
      <h3>${escapeHtml(chart.name)}</h3>
      <table border="1" cellpadding="8">
        <thead>
          ${Object.keys(chart.data[0] || {})
            .map(k => `<th>${escapeHtml(k)}</th>`)
            .join('')}
        </thead>
        <tbody>
          ${chart.data.map(row => `
            <tr>
              ${Object.values(row).map(v => `<td>${escapeHtml(v)}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `)
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(data.title)}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #2c3e50; border-bottom: 3px solid #6b7a6e; padding-bottom: 10px; }
    h2 { color: #34495e; margin-top: 20px; }
    h3 { color: #7f8c8d; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    table th { background-color: #6b7a6e; color: white; padding: 10px; text-align: left; }
    table td { padding: 8px; border-bottom: 1px solid #bdc3c7; }
    .summary { background-color: #ecf0f1; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .generated { color: #7f8c8d; font-size: 12px; margin-top: 30px; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <h1>${escapeHtml(data.title)}</h1>
  <p class="generated">Generated: ${escapeHtml(data.date)}</p>
  
  <div class="summary">
    <h2>Summary</h2>
    <p>${escapeHtml(data.summary)}</p>
  </div>

  <h2>Key Metrics</h2>
  <table border="1">
    <thead>
      <tr><th>Metric</th><th>Value</th></tr>
    </thead>
    <tbody>
      ${metricsHTML}
    </tbody>
  </table>

  <h2>Detailed Analysis</h2>
  ${chartsHTML}

  <p class="generated">© 2024 FORSA Capital. All rights reserved.</p>
</body>
</html>
  `;
}
