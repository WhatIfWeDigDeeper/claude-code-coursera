'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ExportHistory from '@/components/ExportHistory';
import ExportTemplates from '@/components/ExportTemplates';
import CloudIntegrations from '@/components/CloudIntegrations';
import ShareExport from '@/components/ShareExport';
import AutoBackupScheduler from '@/components/AutoBackupScheduler';
import { ExportHistoryItem, CloudIntegration, ScheduledExport } from '@/types/cloud-export';

export default function ExportPage() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedExport, setSelectedExport] = useState<{ id: string; fileName: string } | null>(null);

  // Mock data - in a real app, this would come from a backend
  const [exportHistory, setExportHistory] = useState<ExportHistoryItem[]>([
    {
      id: 'exp-001',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      template: 'monthly-summary',
      format: 'pdf',
      status: 'completed',
      destination: 'google-sheets',
      fileName: 'November 2024 Summary.pdf',
      fileSize: 245000,
      shareLink: 'https://share.expensetracker.io/abc123'
    },
    {
      id: 'exp-002',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      template: 'tax-report',
      format: 'pdf',
      status: 'completed',
      destination: 'email',
      fileName: 'Q4 2024 Tax Report.pdf',
      fileSize: 512000,
      recipient: 'accountant@example.com'
    },
    {
      id: 'exp-003',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      template: 'category-analysis',
      format: 'xlsx',
      status: 'processing',
      destination: 'dropbox',
      fileName: 'Category Analysis.xlsx'
    }
  ]);

  const [integrations, setIntegrations] = useState<CloudIntegration[]>([
    {
      provider: 'google-sheets',
      name: 'Google Sheets',
      icon: '📊',
      connected: true,
      lastSync: new Date(Date.now() - 1000 * 60 * 60 * 2),
      accountEmail: 'user@gmail.com',
      color: 'from-green-500 to-green-600'
    },
    {
      provider: 'dropbox',
      name: 'Dropbox',
      icon: '📦',
      connected: true,
      lastSync: new Date(Date.now() - 1000 * 60 * 60 * 5),
      accountEmail: 'user@dropbox.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      provider: 'onedrive',
      name: 'OneDrive',
      icon: '☁️',
      connected: false,
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      provider: 'notion',
      name: 'Notion',
      icon: '📝',
      connected: false,
      color: 'from-gray-700 to-gray-800'
    },
    {
      provider: 'airtable',
      name: 'Airtable',
      icon: '📋',
      connected: false,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      provider: 'email',
      name: 'Email Export',
      icon: '📧',
      connected: true,
      color: 'from-purple-500 to-purple-600'
    }
  ]);

  const [schedules, setSchedules] = useState<ScheduledExport[]>([
    {
      id: 'sch-001',
      template: 'monthly-summary',
      frequency: 'monthly',
      destination: 'google-sheets',
      nextRun: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      enabled: true,
      recipients: ['user@example.com']
    },
    {
      id: 'sch-002',
      template: 'tax-report',
      frequency: 'quarterly',
      destination: 'email',
      nextRun: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      enabled: true,
      recipients: ['accountant@example.com']
    }
  ]);

  const handleSelectTemplate = (templateId: string) => {
    alert(`Selected template: ${templateId}\n\nIn a real app, this would open an export configuration dialog.`);
  };

  const handleConnectIntegration = (provider: string) => {
    alert(`Connecting to ${provider}...\n\nIn a real app, this would open OAuth flow.`);
    setIntegrations(integrations.map(int =>
      int.provider === provider
        ? { ...int, connected: true, accountEmail: 'user@example.com', lastSync: new Date() }
        : int
    ));
  };

  const handleDisconnectIntegration = (provider: string) => {
    if (confirm(`Disconnect from ${provider}?`)) {
      setIntegrations(integrations.map(int =>
        int.provider === provider
          ? { ...int, connected: false, accountEmail: undefined, lastSync: undefined }
          : int
      ));
    }
  };

  const handleExportTo = (provider: string) => {
    alert(`Exporting to ${provider}...\n\nIn a real app, this would trigger the export process.`);

    const newExport: ExportHistoryItem = {
      id: `exp-${Date.now()}`,
      timestamp: new Date(),
      template: 'custom',
      format: 'csv',
      status: 'processing',
      destination: provider as any,
      fileName: `Export to ${provider}.csv`
    };

    setExportHistory([newExport, ...exportHistory]);

    setTimeout(() => {
      setExportHistory(prev => prev.map(exp =>
        exp.id === newExport.id
          ? { ...exp, status: 'completed' as any, fileSize: 128000 }
          : exp
      ));
    }, 3000);
  };

  const handleRetry = (id: string) => {
    setExportHistory(exportHistory.map(exp =>
      exp.id === id ? { ...exp, status: 'processing' as any } : exp
    ));
  };

  const handleShare = (id: string) => {
    const exportItem = exportHistory.find(exp => exp.id === id);
    if (exportItem) {
      setSelectedExport({ id: exportItem.id, fileName: exportItem.fileName });
      setShowShareModal(true);
    }
  };

  const handleDownload = (id: string) => {
    alert(`Downloading export ${id}...\n\nIn a real app, this would download the file.`);
  };

  const handleGenerateLink = (settings: any) => {
    alert(`Link generated with settings:\n${JSON.stringify(settings, null, 2)}`);
  };

  const handleSendEmail = (emails: string[], message: string) => {
    alert(`Email sent to: ${emails.join(', ')}\nMessage: ${message || '(none)'}`);
    setShowShareModal(false);
  };

  const handleCreateSchedule = (schedule: any) => {
    const newSchedule: ScheduledExport = {
      id: `sch-${Date.now()}`,
      ...schedule,
      nextRun: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      enabled: true
    };
    setSchedules([...schedules, newSchedule]);
  };

  const handleToggleSchedule = (id: string, enabled: boolean) => {
    setSchedules(schedules.map(sch =>
      sch.id === id ? { ...sch, enabled } : sch
    ));
  };

  const handleDeleteSchedule = (id: string) => {
    if (confirm('Delete this schedule?')) {
      setSchedules(schedules.filter(sch => sch.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ExpenseTracker
              </Link>
              <span className="text-gray-400">→</span>
              <h1 className="text-xl font-semibold text-gray-900">Cloud Export & Sync</h1>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              ← Back to Expenses
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Export & Share Your Data</h2>
              <p className="text-blue-100 text-lg">
                Connect, automate, and collaborate with powerful cloud integrations
              </p>
            </div>
            <div className="flex items-center space-x-6 text-center">
              <div>
                <div className="text-4xl font-bold">{integrations.filter(i => i.connected).length}</div>
                <div className="text-blue-200 text-sm">Connected Apps</div>
              </div>
              <div>
                <div className="text-4xl font-bold">{exportHistory.length}</div>
                <div className="text-blue-200 text-sm">Total Exports</div>
              </div>
              <div>
                <div className="text-4xl font-bold">{schedules.filter(s => s.enabled).length}</div>
                <div className="text-blue-200 text-sm">Active Schedules</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Export Templates */}
          <ExportTemplates onSelectTemplate={handleSelectTemplate} />

          {/* Cloud Integrations */}
          <CloudIntegrations
            integrations={integrations}
            onConnect={handleConnectIntegration}
            onDisconnect={handleDisconnectIntegration}
            onExportTo={handleExportTo}
          />

          {/* Automatic Backups */}
          <AutoBackupScheduler
            schedules={schedules}
            onCreateSchedule={handleCreateSchedule}
            onToggleSchedule={handleToggleSchedule}
            onDeleteSchedule={handleDeleteSchedule}
          />

          {/* Export History */}
          <ExportHistory
            history={exportHistory}
            onRetry={handleRetry}
            onShare={handleShare}
            onDownload={handleDownload}
          />
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && selectedExport && (
        <ShareExport
          exportId={selectedExport.id}
          fileName={selectedExport.fileName}
          onClose={() => setShowShareModal(false)}
          onGenerateLink={handleGenerateLink}
          onSendEmail={handleSendEmail}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              🔒 All data transfers are encrypted end-to-end
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900">API Documentation</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Security & Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
