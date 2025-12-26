'use client';

import { Expense, Category } from '@/types';
import { CATEGORY_COLORS } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SpendingChartProps {
  expenses: Expense[];
}

export default function SpendingChart({ expenses }: SpendingChartProps) {
  // Prepare data for category spending
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.category === expense.category);
    if (existing) {
      existing.amount += expense.amount;
    } else {
      acc.push({ category: expense.category, amount: expense.amount });
    }
    return acc;
  }, [] as { category: Category; amount: number }[]);

  const sortedCategoryData = categoryData.sort((a, b) => b.amount - a.amount);

  // Prepare data for monthly spending trend
  const monthlyData = expenses.reduce((acc, expense) => {
    const monthYear = expense.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const existing = acc.find((item) => item.month === monthYear);
    if (existing) {
      existing.amount += expense.amount;
    } else {
      acc.push({ month: monthYear, amount: expense.amount });
    }
    return acc;
  }, [] as { month: string; amount: number }[]);

  if (expenses.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Spending Visualization</h2>
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          Add expenses to see visualizations
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Pie Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Spending by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sortedCategoryData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(entry) => `${entry.category}: $${entry.amount.toFixed(2)}`}
            >
              {sortedCategoryData.map((entry) => (
                <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Bar Chart */}
      {monthlyData.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Monthly Spending Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="amount" fill="#0284c7" name="Spending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
