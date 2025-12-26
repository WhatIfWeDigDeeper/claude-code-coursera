import React, { useState } from 'react';
import { CloudIntegration } from '@/types/cloud-export';

interface CloudIntegrationsProps {
  integrations: CloudIntegration[];
  onConnect: (provider: string) => void;
  onDisconnect: (provider: string) => void;
  onExportTo: (provider: string) => void;
}

export default function CloudIntegrations({
  integrations,
  onConnect,
  onDisconnect,
  onExportTo
}: CloudIntegrationsProps) {
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Cloud Integrations</h3>
        <p className="text-sm text-gray-600 mt-1">Connect your favorite apps and services</p>
      </div>

      <div className="divide-y divide-gray-100">
        {integrations.map((integration) => (
          <div key={integration.provider} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="text-4xl">{integration.icon}</div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-semibold text-gray-900">{integration.name}</h4>
                    {integration.connected && (
                      <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                        Connected
                      </span>
                    )}
                  </div>

                  {integration.connected && integration.accountEmail && (
                    <div className="text-xs text-gray-600 mb-1">
                      {integration.accountEmail}
                    </div>
                  )}

                  {integration.connected && integration.lastSync && (
                    <div className="text-xs text-gray-500">
                      Last synced: {new Date(integration.lastSync).toLocaleString()}
                    </div>
                  )}

                  {!integration.connected && (
                    <div className="text-xs text-gray-500">
                      Not connected - Click to authorize
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {integration.connected ? (
                  <>
                    <button
                      onClick={() => onExportTo(integration.provider)}
                      className={`px-4 py-2 bg-gradient-to-r ${integration.color} text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all`}
                    >
                      Export Now
                    </button>
                    <button
                      onClick={() => setExpandedProvider(
                        expandedProvider === integration.provider ? null : integration.provider
                      )}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Settings"
                    >
                      ⚙️
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => onConnect(integration.provider)}
                    className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>

            {expandedProvider === integration.provider && integration.connected && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 animate-fade-in">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Auto-sync</div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                      <span className="text-sm text-gray-900">Enable automatic sync</span>
                    </label>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 mb-1">Notifications</div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="text-sm text-gray-900">Notify on export</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View Integration Settings
                  </button>
                  <button
                    onClick={() => onDisconnect(integration.provider)}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <button className="w-full py-3 bg-white border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
          + Browse More Integrations
        </button>
      </div>
    </div>
  );
}
