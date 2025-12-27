import { Expense, Category } from '@/types';

const STORAGE_KEY = 'expense_tracker_data';
const CATEGORIES_STORAGE_KEY = 'expense_tracker_categories';

// Default categories that will be available initially
export const DEFAULT_CATEGORIES: Category[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

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

export const saveCategories = (categories: Category[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  }
};

export const loadCategories = (): Category[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error('Error parsing categories from localStorage:', error);
        return DEFAULT_CATEGORIES;
      }
    }
  }
  return DEFAULT_CATEGORIES;
};
