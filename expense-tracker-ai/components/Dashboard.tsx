'use client';

import { Expense } from '@/types';
import { calculateSummaryStats, formatCurrency, exportToCSV } from '@/lib/utils';

interface DashboardProps {
  expenses: Expense[];
}

export default function Dashboard({ expenses }: DashboardProps) {
  const stats = calculateSummaryStats(expenses);

  const handleExport = () => {
    if (expenses.length === 0) {
      alert('No expenses to export');
      return;
    }
    exportToCSV(expenses);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Total Spending</h3>
            <div className="text-3xl">💰</div>
          </div>
          <p className="text-3xl font-bold">{formatCurrency(stats.totalSpending)}</p>
          <p className="text-sm opacity-80 mt-1">All time</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">This Month</h3>
            <div className="text-3xl">📅</div>
          </div>
          <p className="text-3xl font-bold">{formatCurrency(stats.monthlySpending)}</p>
          <p className="text-sm opacity-80 mt-1">Current month</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Top Category</h3>
            <div className="text-3xl">🏆</div>
          </div>
          {stats.topCategory ? (
            <>
              <p className="text-2xl font-bold">{stats.topCategory.category}</p>
              <p className="text-sm opacity-80 mt-1">{formatCurrency(stats.topCategory.amount)}</p>
            </>
          ) : (
            <p className="text-lg opacity-80">No expenses yet</p>
          )}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Spending by Category</h2>
          <button
            onClick={handleExport}
            disabled={expenses.length === 0}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span>📥</span>
            Export CSV
          </button>
        </div>

        {expenses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Add expenses to see category breakdown</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(stats.categoryBreakdown)
              .sort(([, a], [, b]) => b - a)
              .map(([category, amount]) => {
                const percentage = stats.totalSpending > 0
                  ? (amount / stats.totalSpending) * 100
                  : 0;

                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{category}</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {formatCurrency(amount)} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-primary-600 dark:bg-primary-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
