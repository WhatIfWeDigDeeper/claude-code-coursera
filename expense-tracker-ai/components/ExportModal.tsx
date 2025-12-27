'use client';

import { useState, useMemo, useEffect } from 'react';
import { Expense, Category } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import { format } from 'date-fns';

interface ExportModalProps {
  expenses: Expense[];
  isOpen: boolean;
  onClose: () => void;
  categories?: Category[];
}

type ExportFormat = 'csv' | 'json' | 'pdf';

export default function ExportModal({ expenses, isOpen, onClose, categories = [] }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('csv');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(new Set(categories));

  // Update selected categories when categories prop changes
  useEffect(() => {
    setSelectedCategories(new Set(categories));
  }, [categories]);
  const [customFilename, setCustomFilename] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Filter expenses based on selected criteria
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      // Date range filter
      if (startDate) {
        const start = new Date(startDate);
        if (expense.date < start) return false;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (expense.date > end) return false;
      }

      // Category filter
      if (!selectedCategories.has(expense.category)) {
        return false;
      }

      return true;
    });
  }, [expenses, startDate, endDate, selectedCategories]);

  // Calculate total amount for preview
  const totalAmount = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredExpenses]);

  const handleCategoryToggle = (category: Category) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
  };

  const handleSelectAllCategories = () => {
    setSelectedCategories(new Set(categories));
  };

  const handleDeselectAllCategories = () => {
    setSelectedCategories(new Set());
  };

  const handleExport = async () => {
    if (filteredExpenses.length === 0) {
      alert('No expenses to export with current filters');
      return;
    }

    setIsExporting(true);

    // Simulate async export for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const filename = customFilename.trim() || `expenses-${format(new Date(), 'yyyy-MM-dd')}`;

    try {
      switch (selectedFormat) {
        case 'csv':
          exportToCSV(filteredExpenses, filename);
          break;
        case 'json':
          exportToJSON(filteredExpenses, filename);
          break;
        case 'pdf':
          exportToPDF(filteredExpenses, filename);
          break;
      }

      // Close modal after successful export
      setTimeout(() => {
        setIsExporting(false);
        onClose();
        // Reset state
        setStartDate('');
        setEndDate('');
        setSelectedCategories(new Set(categories));
        setCustomFilename('');
        setShowPreview(false);
      }, 500);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
      setIsExporting(false);
    }
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setSelectedCategories(new Set(categories));
    setCustomFilename('');
    setShowPreview(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 rounded-t-xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Export Expenses</h2>
            <p className="text-sm opacity-90 mt-1">Configure your export settings</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            disabled={isExporting}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Format Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['csv', 'json', 'pdf'] as ExportFormat[]).map((format) => (
                <button
                  key={format}
                  onClick={() => setSelectedFormat(format)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedFormat === format
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                  }`}
                >
                  <div className="text-2xl mb-2">
                    {format === 'csv' && '📊'}
                    {format === 'json' && '📄'}
                    {format === 'pdf' && '📑'}
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white uppercase">{format}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {format === 'csv' && 'Spreadsheet format'}
                    {format === 'json' && 'Data interchange'}
                    {format === 'pdf' && 'Print-ready report'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range Filters */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Date Range (Optional)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Categories
              </label>
              <div className="space-x-2">
                <button
                  onClick={handleSelectAllCategories}
                  className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                >
                  Select All
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={handleDeselectAllCategories}
                  className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                >
                  Deselect All
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedCategories.has(category)
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.has(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Custom Filename */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Custom Filename (Optional)
            </label>
            <div className="relative">
              <input
                type="text"
                value={customFilename}
                onChange={(e) => setCustomFilename(e.target.value)}
                placeholder={`expenses-${format(new Date(), 'yyyy-MM-dd')}`}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white pr-20"
              />
              <span className="absolute right-3 top-2.5 text-sm text-gray-500 dark:text-gray-400">
                .{selectedFormat}
              </span>
            </div>
          </div>

          {/* Export Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-lg p-4 border border-blue-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Export Summary</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {filteredExpenses.length} record{filteredExpenses.length !== 1 ? 's' : ''} will be exported
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {formatCurrency(totalAmount)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Total Amount</div>
              </div>
            </div>
          </div>

          {/* Preview Toggle */}
          <div>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                {showPreview ? 'Hide' : 'Show'} Data Preview
              </span>
              <svg
                className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform ${
                  showPreview ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Preview Table */}
            {showPreview && (
              <div className="mt-3 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Date</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Category</th>
                        <th className="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-200">Amount</th>
                        <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {filteredExpenses.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                            No expenses match your filters
                          </td>
                        </tr>
                      ) : (
                        filteredExpenses.slice(0, 10).map((expense) => (
                          <tr key={expense.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                              {format(expense.date, 'MMM dd, yyyy')}
                            </td>
                            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{expense.category}</td>
                            <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-100">
                              {formatCurrency(expense.amount)}
                            </td>
                            <td className="px-4 py-2 text-gray-600 dark:text-gray-300 truncate max-w-xs">
                              {expense.description}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  {filteredExpenses.length > 10 && (
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 text-xs text-gray-600 dark:text-gray-400 text-center">
                      Showing 10 of {filteredExpenses.length} records
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-700 px-6 py-4 rounded-b-xl flex items-center justify-between border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors font-medium"
            disabled={isExporting}
          >
            Reset Filters
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors font-medium"
              disabled={isExporting}
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || filteredExpenses.length === 0}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[140px] justify-center"
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Exporting...
                </>
              ) : (
                <>
                  <span>📥</span>
                  Export {selectedFormat.toUpperCase()}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
