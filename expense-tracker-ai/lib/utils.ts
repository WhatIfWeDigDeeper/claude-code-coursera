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

export const calculateSummaryStats = (expenses: Expense[]): SummaryStats => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const monthlyExpenses = expenses.filter((expense) =>
    isWithinInterval(expense.date, { start: monthStart, end: monthEnd })
  );

  const monthlySpending = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryBreakdown: Record<Category, number> = {
    Food: 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  };

  expenses.forEach((expense) => {
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

export const CATEGORIES: Category[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: '#ef4444',
  Transportation: '#f59e0b',
  Entertainment: '#8b5cf6',
  Shopping: '#ec4899',
  Bills: '#3b82f6',
  Other: '#6b7280',
};
