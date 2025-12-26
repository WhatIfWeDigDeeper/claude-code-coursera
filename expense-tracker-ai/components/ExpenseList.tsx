'use client';

import { useState } from 'react';
import { Expense, Category, FilterOptions } from '@/types';
import { formatCurrency, CATEGORIES, filterExpenses } from '@/lib/utils';
import { format } from 'date-fns';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
  onEditExpense: (expense: Expense) => void;
}

export default function ExpenseList({ expenses, onDeleteExpense, onEditExpense }: ExpenseListProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    startDate: '',
    endDate: '',
    category: 'All',
    searchTerm: '',
  });

  const filteredExpenses = filterExpenses(expenses, filters);
  const sortedExpenses = [...filteredExpenses].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Expense History</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              id="categoryFilter"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value as Category | 'All' })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
              placeholder="Search expenses..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        </div>

        {(filters.startDate || filters.endDate || filters.category !== 'All' || filters.searchTerm) && (
          <button
            onClick={() => setFilters({ startDate: '', endDate: '', category: 'All', searchTerm: '' })}
            className="mt-3 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Expense List */}
      {sortedExpenses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-5xl mb-4">💰</div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {expenses.length === 0 ? 'No expenses yet. Add your first expense above!' : 'No expenses match your filters.'}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            Showing {sortedExpenses.length} of {expenses.length} expenses
          </div>
          <div className="space-y-3">
            {sortedExpenses.map((expense) => (
              <div
                key={expense.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-700"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white text-lg">{expense.description}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {format(expense.date, 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="text-right md:hidden">
                        <p className="text-xl font-bold text-gray-800 dark:text-white">{formatCurrency(expense.amount)}</p>
                      </div>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                      {expense.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="hidden md:block text-right">
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">{formatCurrency(expense.amount)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEditExpense(expense)}
                        className="px-4 py-2 text-sm bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors font-medium border border-transparent dark:border-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this expense?')) {
                            onDeleteExpense(expense.id);
                          }
                        }}
                        className="px-4 py-2 text-sm bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors font-medium border border-transparent dark:border-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
