import React, { useState } from 'react';

interface ShareExportProps {
  exportId: string;
  fileName: string;
  onClose: () => void;
  onGenerateLink: (settings: ShareSettings) => void;
  onSendEmail: (emails: string[], message: string) => void;
}

interface ShareSettings {
  expiryDays: number;
  requirePassword: boolean;
  password?: string;
  allowDownload: boolean;
}

export default function ShareExport({ exportId, fileName, onClose, onGenerateLink, onSendEmail }: ShareExportProps) {
  const [activeTab, setActiveTab] = useState<'link' | 'email' | 'qr'>('link');
  const [shareLink, setShareLink] = useState('');
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
  const [emails, setEmails] = useState('');
  const [message, setMessage] = useState('');
  const [settings, setSettings] = useState<ShareSettings>({
    expiryDays: 7,
    requirePassword: false,
    allowDownload: true
  });

  const handleGenerateLink = () => {
    const mockLink = `https://share.expensetracker.io/${exportId.substring(0, 8)}`;
    setShareLink(mockLink);
    onGenerateLink(settings);
  };

  const handleGenerateQR = () => {
    setQrCodeGenerated(true);
    if (!shareLink) {
      handleGenerateLink();
    }
  };

  const handleSendEmail = () => {
    const emailList = emails.split(',').map(e => e.trim()).filter(e => e);
    onSendEmail(emailList, message);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Share Export</h2>
              <p className="text-purple-100 text-sm mt-1">{fileName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab('link')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'link'
                ? 'bg-white text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🔗 Shareable Link
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'email'
                ? 'bg-white text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📧 Email
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'qr'
                ? 'bg-white text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📱 QR Code
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {/* Link Tab */}
          {activeTab === 'link' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Link Settings</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link expires in
                    </label>
                    <select
                      value={settings.expiryDays}
                      onChange={(e) => setSettings({ ...settings, expiryDays: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value={1}>1 day</option>
                      <option value={7}>7 days</option>
                      <option value={30}>30 days</option>
                      <option value={90}>90 days</option>
                      <option value={365}>1 year</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="require-password"
                      checked={settings.requirePassword}
                      onChange={(e) => setSettings({ ...settings, requirePassword: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="require-password" className="text-sm text-gray-700">
                      Require password to access
                    </label>
                  </div>

                  {settings.requirePassword && (
                    <input
                      type="text"
                      placeholder="Enter password"
                      value={settings.password || ''}
                      onChange={(e) => setSettings({ ...settings, password: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  )}

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="allow-download"
                      checked={settings.allowDownload}
                      onChange={(e) => setSettings({ ...settings, allowDownload: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="allow-download" className="text-sm text-gray-700">
                      Allow downloads
                    </label>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerateLink}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Generate Shareable Link
              </button>

              {shareLink && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-green-900 mb-2">Link generated successfully!</div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={shareLink}
                      readOnly
                      className="flex-1 px-3 py-2 bg-white border border-green-300 rounded text-sm"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(shareLink)}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-green-700">
                    Expires: {new Date(Date.now() + settings.expiryDays * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Email Tab */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Send via Email</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipients (comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="email@example.com, another@example.com"
                      value={emails}
                      onChange={(e) => setEmails(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message (optional)
                    </label>
                    <textarea
                      placeholder="Add a personal message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-sm text-blue-900">
                      <strong>Preview:</strong> Recipients will receive the file as an attachment with a download link.
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSendEmail}
                disabled={!emails.trim()}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Email
              </button>
            </div>
          )}

          {/* QR Code Tab */}
          {activeTab === 'qr' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code Sharing</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Generate a QR code for easy mobile access
                </p>

                {!qrCodeGenerated ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">📱</div>
                    <button
                      onClick={handleGenerateQR}
                      className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                      Generate QR Code
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Mock QR Code */}
                    <div className="bg-white border-4 border-gray-200 rounded-lg p-8 flex items-center justify-center">
                      <div className="w-64 h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-2">⬛⬜⬛</div>
                          <div className="text-4xl mb-2">⬜⬛⬜</div>
                          <div className="text-6xl">⬛⬜⬛</div>
                          <div className="text-xs text-gray-500 mt-4">QR Code Preview</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                        Download PNG
                      </button>
                      <button className="flex-1 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                        Download SVG
                      </button>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm text-purple-900">
                      <strong>Tip:</strong> Share this QR code in presentations, documents, or print materials for easy access!
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <div className="text-xs text-gray-500">
            🔒 All shares are encrypted and secure
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
