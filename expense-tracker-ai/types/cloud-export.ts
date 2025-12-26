export type CloudProvider = 'google-sheets' | 'dropbox' | 'onedrive' | 'notion' | 'airtable' | 'email';

export type ExportTemplate = 'tax-report' | 'monthly-summary' | 'category-analysis' | 'budget-overview' | 'custom';

export type ExportFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'never';

export type ExportStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'scheduled';

export interface ExportHistoryItem {
  id: string;
  timestamp: Date;
  template: ExportTemplate;
  format: string;
  status: ExportStatus;
  destination: CloudProvider | 'local';
  fileName: string;
  fileSize?: number;
  shareLink?: string;
  recipient?: string;
}

export interface ExportTemplate {
  id: ExportTemplate;
  name: string;
  description: string;
  icon: string;
  fields: string[];
  format: 'csv' | 'pdf' | 'xlsx' | 'json';
  color: string;
}

export interface CloudIntegration {
  provider: CloudProvider;
  name: string;
  icon: string;
  connected: boolean;
  lastSync?: Date;
  accountEmail?: string;
  color: string;
}

export interface ScheduledExport {
  id: string;
  template: ExportTemplate;
  frequency: ExportFrequency;
  destination: CloudProvider;
  nextRun: Date;
  enabled: boolean;
  recipients?: string[];
}

export interface ShareableLink {
  url: string;
  expiresAt: Date;
  accessCount: number;
  password?: boolean;
}
