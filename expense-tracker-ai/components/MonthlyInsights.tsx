'use client';

import { Expense, Category } from '@/types';
import { formatCurrency, getCategoryColor } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { startOfMonth, endOfMonth, isWithinInterval, differenceInDays } from 'date-fns';

interface MonthlyInsightsProps {
  expenses: Expense[];
  categories: Category[];
}

// Category emoji mapping
const CATEGORY_EMOJIS: Record<string, string> = {
  'Food': '🍔',
  'Transport': '🚗',
  'Entertainment': '🎬',
  'Shopping': '🛍️',
  'Health': '🏥',
  'Utilities': '💡',
  'Other': '📦',
};

// Get emoji for category or return default
const getCategoryEmoji = (category: string): string => {
  return CATEGORY_EMOJIS[category] || '📦';
};

export default function MonthlyInsights({ expenses, categories }: MonthlyInsightsProps) {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  // Filter expenses for current month
  const monthlyExpenses = expenses.filter((expense) =>
    isWithinInterval(expense.date, { start: monthStart, end: monthEnd })
  );

  // Calculate category breakdown for current month
  const categoryData = monthlyExpenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.category === expense.category);
    if (existing) {
      existing.amount += expense.amount;
    } else {
      acc.push({ category: expense.category, amount: expense.amount });
    }
    return acc;
  }, [] as { category: Category; amount: number }[]);

  // Sort by amount and get top 3
  const top3Categories = categoryData
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  // Calculate budget streak (days without spending)
  // For demo purposes, we'll calculate consecutive days without expenses
  const calculateBudgetStreak = (): number => {
    if (expenses.length === 0) return differenceInDays(now, monthStart);

    // Sort expenses by date (most recent first)
    const sortedExpenses = [...expenses].sort((a, b) => b.date.getTime() - a.date.getTime());

    // Find the most recent expense
    const lastExpenseDate = sortedExpenses[0].date;

    // Calculate days since last expense
    const daysSinceLastExpense = differenceInDays(now, lastExpenseDate);

    return Math.max(0, daysSinceLastExpense);
  };

  const budgetStreak = calculateBudgetStreak();

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-dashed border-gray-300 dark:border-gray-600">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Monthly Insights</h2>
      </div>

      {/* Donut Chart */}
      <div className="mb-6 relative">
        {monthlyExpenses.length > 0 ? (
          <div className="relative">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={entry.category} fill={getCategoryColor(entry.category, index)} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
                <p className="text-sm text-gray-600 dark:text-gray-400">Spending</p>
              </div>
            </div>
            <div className="absolute top-2 right-8 transform rotate-12">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-handwriting">donut chart!</p>
            </div>
          </div>
        ) : (
          <div className="h-[250px] flex items-center justify-center text-gray-400 dark:text-gray-500">
            <p>No expenses this month</p>
          </div>
        )}
      </div>

      {/* Top 3 Categories */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center mb-2">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-3 text-xs text-gray-500 dark:text-gray-400">Top 3</span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        {top3Categories.length > 0 ? (
          top3Categories.map((item, index) => (
            <div
              key={item.category}
              className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 border-l-4"
              style={{ borderLeftColor: getCategoryColor(item.category, index) }}
            >
              <span className="text-2xl">{getCategoryEmoji(item.category)}</span>
              <span className="font-medium text-gray-700 dark:text-gray-200 flex-1">
                {item.category}:
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                {formatCurrency(item.amount)}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-400 dark:text-gray-500">
            <p>Add expenses to see top categories</p>
          </div>
        )}
        {top3Categories.length > 0 && (
          <div className="flex justify-end">
            <span className="text-lg">↓</span>
          </div>
        )}
      </div>

      {/* Budget Streak */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Budget Streak</h3>
        <div className="flex items-center justify-center gap-4">
          <div>
            <p className="text-5xl font-bold text-green-600 dark:text-green-400">{budgetStreak}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">days!</p>
          </div>
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg transform rotate-6 opacity-50"></div>
            <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
