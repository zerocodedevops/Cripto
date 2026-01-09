import { DashboardData } from '../types';

export const exportToCSV = (data: DashboardData) => {
  const csvRows: string[] = [
    'Metric,Value,Change,Trend',
    ...Object.entries(data.kpi).map(([, kpi]) => 
      `${kpi.title},${kpi.value},${kpi.change}%,${kpi.trend}`
    ),
    '',
    'Date,Sales,Revenue',
    ...data.salesTrend.map((item) => 
      `${item.date},${item.sales},${item.revenue}`
    ),
    '',
    'Device,Percentage',
    ...data.revenueByDevice.map((item) => 
      `${item.device},${item.value}%`
    ),
    '',
    'Step,Count,Drop-off',
    ...data.conversionFunnel.map((item) => 
      `${item.name},${item.count},${item.dropOff || 0}%`
    ),
  ];
  
  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `analytics-dashboard-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const exportToPDF = (data: DashboardData) => {
  // Simple PDF export using window.print() for now
  // For production, you'd use jsPDF or similar library
  
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Analytics Dashboard Report</title>
      <style>
        body {
          font-family: 'Courier New', monospace;
          padding: 20px;
          background: #0a0e1a;
          color: #00ffff;
        }
        h1 {
          color: #00d4ff;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          border: 1px solid #1e3a5f;
          padding: 8px;
          text-align: left;
        }
        th {
          background: #1a1f35;
          color: #00d4ff;
        }
        .section {
          margin: 30px 0;
        }
        @media print {
          body { background: white; color: black; }
          h1 { color: #0066cc; }
          th { background: #f0f0f0; color: #333; }
        }
      </style>
    </head>
    <body>
      <h1>Analytics Dashboard Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      
      <div class="section">
        <h2>Key Performance Indicators</h2>
        <table>
          <tr>
            <th>Metric</th>
            <th>Value</th>
            <th>Change</th>
            <th>Trend</th>
          </tr>
          ${Object.entries(data.kpi).map(([, kpi]) => `
            <tr>
              <td>${kpi.title}</td>
              <td>${kpi.value}</td>
              <td>${kpi.change}%</td>
              <td>${kpi.trend}</td>
            </tr>
          `).join('')}
        </table>
      </div>
      
      <div class="section">
        <h2>Sales Trend</h2>
        <table>
          <tr>
            <th>Date</th>
            <th>Sales</th>
            <th>Revenue</th>
          </tr>
          ${data.salesTrend.map((item) => `
            <tr>
              <td>${item.date}</td>
              <td>$${item.sales}</td>
              <td>$${item.revenue}</td>
            </tr>
          `).join('')}
        </table>
      </div>
      
      <div class="section">
        <h2>Revenue by Device</h2>
        <table>
          <tr>
            <th>Device</th>
            <th>Percentage</th>
          </tr>
          ${data.revenueByDevice.map((item) => `
            <tr>
              <td>${item.device}</td>
              <td>${item.value}%</td>
            </tr>
          `).join('')}
        </table>
      </div>
      
      <div class="section">
        <h2>Conversion Funnel</h2>
        <table>
          <tr>
            <th>Step</th>
            <th>Count</th>
            <th>Drop-off</th>
          </tr>
          ${data.conversionFunnel.map((item) => `
            <tr>
              <td>${item.name}</td>
              <td>${item.count.toLocaleString()}</td>
              <td>${item.dropOff || 0}%</td>
            </tr>
          `).join('')}
        </table>
      </div>
    </body>
    </html>
  `;
  
  // Use innerHTML instead of deprecated write()
  printWindow.document.open();
  printWindow.document.body.innerHTML = html;
  printWindow.document.close();
  
  // Wait a bit for content to load, then print
  setTimeout(() => {
    printWindow.print();
  }, 250);
};
