import { Expense } from '@/types';

const STORAGE_KEY = 'expense_tracker_data';

export const saveExpenses = (expenses: Expense[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }
};

export const loadExpenses = (): Expense[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        // Convert date strings back to Date objects
        return parsed.map((expense: any) => ({
          ...expense,
          date: new Date(expense.date),
        }));
      } catch (error) {
        console.error('Error parsing expenses from localStorage:', error);
        return [];
      }
    }
  }
  return [];
};

export const clearExpenses = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
};
