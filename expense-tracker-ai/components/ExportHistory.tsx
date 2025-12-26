import React from 'react';
import { ExportHistoryItem } from '@/types/cloud-export';

interface ExportHistoryProps {
  history: ExportHistoryItem[];
  onRetry: (id: string) => void;
  onShare: (id: string) => void;
  onDownload: (id: string) => void;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return '✓';
    case 'processing': return '⟳';
    case 'failed': return '✕';
    case 'scheduled': return '⏱';
    default: return '○';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-green-600';
    case 'processing': return 'text-blue-600 animate-spin';
    case 'failed': return 'text-red-600';
    case 'scheduled': return 'text-yellow-600';
    default: return 'text-gray-600';
  }
};

const getDestinationIcon = (destination: string) => {
  const icons: Record<string, string> = {
    'google-sheets': '📊',
    'dropbox': '📦',
    'onedrive': '☁️',
    'notion': '📝',
    'airtable': '📋',
    'email': '📧',
    'local': '💾'
  };
  return icons[destination] || '📄';
};

const formatFileSize = (bytes?: number) => {
  if (!bytes) return 'N/A';
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

export default function ExportHistory({ history, onRetry, onShare, onDownload }: ExportHistoryProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Export History</h3>
        <p className="text-sm text-gray-600 mt-1">Track all your data exports and sharing activities</p>
      </div>

      <div className="divide-y divide-gray-100">
        {history.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No exports yet</h4>
            <p className="text-gray-600">Your export history will appear here once you start exporting data</p>
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="text-3xl">{getDestinationIcon(item.destination)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">{item.fileName}</h4>
                      <span className={`text-lg ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-gray-600 mb-2">
                      <span className="flex items-center">
                        <span className="mr-1">📅</span>
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">📊</span>
                        {item.template}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">💾</span>
                        {formatFileSize(item.fileSize)}
                      </span>
                    </div>

                    {item.recipient && (
                      <div className="text-xs text-gray-500 mb-2">
                        Sent to: {item.recipient}
                      </div>
                    )}

                    {item.shareLink && (
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-green-600 flex items-center">
                          <span className="mr-1">🔗</span>
                          Shareable link active
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {item.status === 'completed' && (
                    <>
                      <button
                        onClick={() => onDownload(item.id)}
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        ⬇️ Download
                      </button>
                      <button
                        onClick={() => onShare(item.id)}
                        className="px-3 py-1.5 text-xs font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Share"
                      >
                        🔗 Share
                      </button>
                    </>
                  )}
                  {item.status === 'failed' && (
                    <button
                      onClick={() => onRetry(item.id)}
                      className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Retry"
                    >
                      🔄 Retry
                    </button>
                  )}
                  {item.status === 'processing' && (
                    <span className="px-3 py-1.5 text-xs font-medium text-blue-600">
                      Processing...
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {history.length > 0 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-center">
          <button className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
            View All History →
          </button>
        </div>
      )}
    </div>
  );
}
