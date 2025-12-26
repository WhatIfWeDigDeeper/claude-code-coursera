import React from 'react';
import { ExportTemplate } from '@/types/cloud-export';

interface ExportTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
}

const templates: ExportTemplate[] = [
  {
    id: 'tax-report',
    name: 'Tax Report',
    description: 'IRS-ready expense report with categorized deductions and totals',
    icon: '🧾',
    fields: ['date', 'description', 'category', 'amount', 'payment_method', 'tax_deductible'],
    format: 'pdf',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'monthly-summary',
    name: 'Monthly Summary',
    description: 'Beautiful monthly overview with charts and insights',
    icon: '📊',
    fields: ['month', 'total_expenses', 'category_breakdown', 'trends'],
    format: 'pdf',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'category-analysis',
    name: 'Category Analysis',
    description: 'Deep dive into spending patterns by category',
    icon: '📈',
    fields: ['category', 'total', 'count', 'average', 'percentage'],
    format: 'xlsx',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'budget-overview',
    name: 'Budget Overview',
    description: 'Compare actual spending against your budget goals',
    icon: '🎯',
    fields: ['category', 'budget', 'actual', 'difference', 'percentage'],
    format: 'xlsx',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'custom',
    name: 'Custom Export',
    description: 'Build your own export with custom fields and formatting',
    icon: '⚙️',
    fields: [],
    format: 'csv',
    color: 'from-gray-500 to-gray-600'
  }
];

export default function ExportTemplates({ onSelectTemplate }: ExportTemplatesProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Export Templates</h3>
        <p className="text-sm text-gray-600 mt-1">Pre-configured exports for different purposes</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className="group cursor-pointer bg-white rounded-lg border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all duration-200 overflow-hidden"
          >
            <div className={`bg-gradient-to-r ${template.color} px-4 py-3`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{template.icon}</span>
                  <div>
                    <h4 className="font-semibold text-white">{template.name}</h4>
                    <span className="text-xs text-white/80 uppercase tracking-wide">
                      {template.format}
                    </span>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium rounded-lg transition-colors backdrop-blur-sm">
                  Use Template
                </button>
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>

              {template.fields.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Included Fields:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {template.fields.slice(0, 4).map((field) => (
                      <span
                        key={field}
                        className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                      >
                        {field.replace('_', ' ')}
                      </span>
                    ))}
                    {template.fields.length > 4 && (
                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        +{template.fields.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {template.id === 'custom' && (
                <div className="mt-3 text-xs text-gray-500 italic">
                  Configure custom fields and filters after selection
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{templates.length}</span> templates available
          </div>
          <button className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors">
            Browse Template Library →
          </button>
        </div>
      </div>
    </div>
  );
}
