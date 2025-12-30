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

/**
 * Saves expenses to localStorage.
 *
 * SECURITY WARNING: localStorage is NOT secure storage.
 * - Data is stored as plain text
 * - Accessible by any script on the same origin
 * - Persists across sessions
 * - Never store: passwords, tokens, API keys, session tokens, or PII
 *
 * Current usage is safe as expense data is non-sensitive.
 *
 * @param expenses - Array of expense objects to save
 */
export const saveExpenses = (expenses: Expense[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }
};

/**
 * Loads expenses from localStorage.
 *
 * @returns Array of expense objects with dates converted from strings to Date objects
 */
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

/**
 * Clears all expenses from localStorage.
 */
export const clearExpenses = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
};

/**
 * Saves custom categories to localStorage.
 *
 * SECURITY WARNING: Same localStorage security considerations apply.
 * See saveExpenses() documentation.
 *
 * @param categories - Array of category names to save
 */
export const saveCategories = (categories: Category[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  }
};

/**
 * Loads categories from localStorage.
 *
 * @returns Array of category names, or DEFAULT_CATEGORIES if none saved
 */
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
