import React, { useState } from 'react';
import { ExportFrequency, ScheduledExport } from '@/types/cloud-export';

interface AutoBackupSchedulerProps {
  schedules: ScheduledExport[];
  onCreateSchedule: (schedule: Omit<ScheduledExport, 'id' | 'nextRun'>) => void;
  onToggleSchedule: (id: string, enabled: boolean) => void;
  onDeleteSchedule: (id: string) => void;
}

export default function AutoBackupScheduler({
  schedules,
  onCreateSchedule,
  onToggleSchedule,
  onDeleteSchedule
}: AutoBackupSchedulerProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    template: 'monthly-summary' as any,
    frequency: 'weekly' as ExportFrequency,
    destination: 'google-sheets' as any,
    recipients: [] as string[]
  });

  const handleCreateSchedule = () => {
    onCreateSchedule(newSchedule);
    setShowCreateForm(false);
    setNewSchedule({
      template: 'monthly-summary',
      frequency: 'weekly',
      destination: 'google-sheets',
      recipients: []
    });
  };

  const getFrequencyIcon = (frequency: ExportFrequency) => {
    const icons = {
      daily: '📅',
      weekly: '🗓️',
      monthly: '📆',
      quarterly: '🗂️',
      never: '⏸️'
    };
    return icons[frequency];
  };

  const getDestinationName = (destination: string) => {
    const names: Record<string, string> = {
      'google-sheets': 'Google Sheets',
      'dropbox': 'Dropbox',
      'onedrive': 'OneDrive',
      'notion': 'Notion',
      'airtable': 'Airtable',
      'email': 'Email'
    };
    return names[destination] || destination;
  };

  const calculateNextRun = (frequency: ExportFrequency): string => {
    const now = new Date();
    const next = new Date(now);

    switch (frequency) {
      case 'daily':
        next.setDate(next.getDate() + 1);
        break;
      case 'weekly':
        next.setDate(next.getDate() + 7);
        break;
      case 'monthly':
        next.setMonth(next.getMonth() + 1);
        break;
      case 'quarterly':
        next.setMonth(next.getMonth() + 3);
        break;
      default:
        return 'Not scheduled';
    }

    return next.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Automatic Backups</h3>
            <p className="text-sm text-gray-600 mt-1">Schedule recurring exports and never lose data</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            + New Schedule
          </button>
        </div>
      </div>

      {showCreateForm && (
        <div className="px-6 py-6 bg-gradient-to-r from-green-50/50 to-emerald-50/50 border-b border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Create Automatic Backup</h4>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Template</label>
              <select
                value={newSchedule.template}
                onChange={(e) => setNewSchedule({ ...newSchedule, template: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="tax-report">Tax Report</option>
                <option value="monthly-summary">Monthly Summary</option>
                <option value="category-analysis">Category Analysis</option>
                <option value="budget-overview">Budget Overview</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Frequency</label>
              <select
                value={newSchedule.frequency}
                onChange={(e) => setNewSchedule({ ...newSchedule, frequency: e.target.value as ExportFrequency })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Destination</label>
              <select
                value={newSchedule.destination}
                onChange={(e) => setNewSchedule({ ...newSchedule, destination: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="google-sheets">Google Sheets</option>
                <option value="dropbox">Dropbox</option>
                <option value="onedrive">OneDrive</option>
                <option value="email">Email</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Email Recipients (optional)</label>
              <input
                type="text"
                placeholder="email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateSchedule}
              className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Create Schedule
            </button>
          </div>
        </div>
      )}

      <div className="divide-y divide-gray-100">
        {schedules.length === 0 && !showCreateForm ? (
          <div className="px-6 py-12 text-center">
            <div className="text-6xl mb-4">⏰</div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No automatic backups yet</h4>
            <p className="text-gray-600 mb-4">Set up recurring exports to keep your data safe</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Create First Schedule
            </button>
          </div>
        ) : (
          schedules.map((schedule) => (
            <div key={schedule.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="text-3xl">{getFrequencyIcon(schedule.frequency)}</div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {schedule.template.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h4>
                      {schedule.enabled ? (
                        <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          Paused
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <span className="flex items-center">
                        <span className="mr-1">{getFrequencyIcon(schedule.frequency)}</span>
                        {schedule.frequency.charAt(0).toUpperCase() + schedule.frequency.slice(1)}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">→</span>
                        {getDestinationName(schedule.destination)}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">⏰</span>
                        Next: {new Date(schedule.nextRun).toLocaleDateString()}
                      </span>
                    </div>

                    {schedule.recipients && schedule.recipients.length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        Recipients: {schedule.recipients.join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={schedule.enabled}
                      onChange={(e) => onToggleSchedule(schedule.id, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>

                  <button
                    onClick={() => onDeleteSchedule(schedule.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                    title="Delete schedule"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {schedules.length > 0 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              <strong>{schedules.filter(s => s.enabled).length}</strong> of <strong>{schedules.length}</strong> schedules active
            </span>
            <button className="text-green-600 hover:text-green-700 font-medium transition-colors">
              Manage All Schedules →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
