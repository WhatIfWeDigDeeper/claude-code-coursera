import { Expense, Category, SummaryStats, FilterOptions } from '@/types';
import { startOfMonth, endOfMonth, isWithinInterval, format } from 'date-fns';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const calculateSummaryStats = (expenses: Expense[], categories: Category[]): SummaryStats => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const monthlyExpenses = expenses.filter((expense) =>
    isWithinInterval(expense.date, { start: monthStart, end: monthEnd })
  );

  const monthlySpending = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Initialize category breakdown with all available categories
  const categoryBreakdown: Record<Category, number> = {};
  categories.forEach((category) => {
    categoryBreakdown[category] = 0;
  });

  // Add any categories from expenses that might not be in the list
  expenses.forEach((expense) => {
    if (!(expense.category in categoryBreakdown)) {
      categoryBreakdown[expense.category] = 0;
    }
    categoryBreakdown[expense.category] += expense.amount;
  });

  let topCategory: { category: Category; amount: number } | null = null;
  let maxAmount = 0;

  (Object.entries(categoryBreakdown) as [Category, number][]).forEach(([category, amount]) => {
    if (amount > maxAmount) {
      maxAmount = amount;
      topCategory = { category, amount };
    }
  });

  return {
    totalSpending,
    monthlySpending,
    categoryBreakdown,
    topCategory,
  };
};

export const filterExpenses = (expenses: Expense[], filters: FilterOptions): Expense[] => {
  return expenses.filter((expense) => {
    // Date range filter
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      if (expense.date < startDate) return false;
    }
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      if (expense.date > endDate) return false;
    }

    // Category filter
    if (filters.category !== 'All' && expense.category !== filters.category) {
      return false;
    }

    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      return (
        expense.description.toLowerCase().includes(searchLower) ||
        expense.category.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });
};

export const exportToCSV = (expenses: Expense[]): void => {
  const headers = ['Date', 'Category', 'Amount', 'Description'];
  const rows = expenses.map((expense) => [
    format(expense.date, 'yyyy-MM-dd'),
    expense.category,
    expense.amount.toString(),
    `"${expense.description.replace(/"/g, '""')}"`,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `expenses-${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Default color palette for categories
const DEFAULT_COLORS = [
  '#ef4444', // red
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#3b82f6', // blue
  '#6b7280', // gray
  '#10b981', // green
  '#f97316', // orange
  '#06b6d4', // cyan
  '#8b5cf6', // purple
  '#14b8a6', // teal
  '#f43f5e', // rose
];

export const getCategoryColor = (category: Category, index: number): string => {
  // Use a hash function to consistently assign colors to categories
  const hash = category.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  const colorIndex = Math.abs(hash) % DEFAULT_COLORS.length;
  return DEFAULT_COLORS[colorIndex];
};
