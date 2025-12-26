export type Category = 'Food' | 'Transportation' | 'Entertainment' | 'Shopping' | 'Bills' | 'Other';

export interface Expense {
  id: string;
  date: Date;
  amount: number;
  category: Category;
  description: string;
}

export interface ExpenseFormData {
  date: string;
  amount: string;
  category: Category;
  description: string;
}

export interface FilterOptions {
  startDate: string;
  endDate: string;
  category: Category | 'All';
  searchTerm: string;
}

export interface SummaryStats {
  totalSpending: number;
  monthlySpending: number;
  categoryBreakdown: Record<Category, number>;
  topCategory: { category: Category; amount: number } | null;
}
