'use client';

import { useState, useEffect } from 'react';
import { Expense } from '@/types';
import { saveExpenses, loadExpenses } from '@/lib/storage';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import Dashboard from '@/components/Dashboard';
import SpendingChart from '@/components/SpendingChart';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'expenses' | 'analytics'>('overview');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load expenses from localStorage on mount
  useEffect(() => {
    const loaded = loadExpenses();
    setExpenses(loaded);
    setIsLoaded(true);
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveExpenses(expenses);
    }
  }, [expenses, isLoaded]);

  const handleAddExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
    // Scroll to top to show success
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses(expenses.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp)));
    setEditingExpense(null);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setActiveTab('overview');
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Expense Tracker</h1>
            <p className="text-gray-600 dark:text-gray-300">Track and manage your personal finances with ease</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'expenses'
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Expenses
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <ExpenseForm
              onAddExpense={handleAddExpense}
              editingExpense={editingExpense}
              onUpdateExpense={handleUpdateExpense}
              onCancelEdit={handleCancelEdit}
            />
            <Dashboard expenses={expenses} />
          </div>
        )}

        {activeTab === 'expenses' && (
          <ExpenseList
            expenses={expenses}
            onDeleteExpense={handleDeleteExpense}
            onEditExpense={handleEditExpense}
          />
        )}

        {activeTab === 'analytics' && <SpendingChart expenses={expenses} />}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Expense Tracker © 2024 - Built with Next.js, TypeScript & Tailwind CSS</p>
        </footer>
      </div>
    </main>
  );
}
