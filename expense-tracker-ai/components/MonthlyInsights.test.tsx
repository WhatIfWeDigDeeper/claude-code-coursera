import { render, screen } from '@testing-library/react';
import MonthlyInsights from './MonthlyInsights';
import { Expense } from '@/types';

describe('MonthlyInsights', () => {
  const mockCategories = ['Food', 'Transport', 'Entertainment'];

  it('renders the component with title', () => {
    render(<MonthlyInsights expenses={[]} categories={mockCategories} />);
    expect(screen.getByText('Monthly Insights')).toBeInTheDocument();
  });

  it('displays empty state when no expenses', () => {
    render(<MonthlyInsights expenses={[]} categories={mockCategories} />);
    expect(screen.getByText('No expenses this month')).toBeInTheDocument();
    expect(screen.getByText('Add expenses to see top categories')).toBeInTheDocument();
  });

  it('displays budget streak when no expenses', () => {
    render(<MonthlyInsights expenses={[]} categories={mockCategories} />);
    expect(screen.getByText('Budget Streak')).toBeInTheDocument();
    expect(screen.getByText('days!')).toBeInTheDocument();
  });

  it('displays top 3 categories with current month expenses', () => {
    const now = new Date();
    const mockExpenses: Expense[] = [
      {
        id: '1',
        date: now,
        amount: 420,
        category: 'Food',
        description: 'Groceries',
      },
      {
        id: '2',
        date: now,
        amount: 180,
        category: 'Transport',
        description: 'Gas',
      },
      {
        id: '3',
        date: now,
        amount: 95,
        category: 'Entertainment',
        description: 'Movies',
      },
      {
        id: '4',
        date: now,
        amount: 50,
        category: 'Food',
        description: 'Restaurant',
      },
    ];

    render(<MonthlyInsights expenses={mockExpenses} categories={mockCategories} />);

    // Check for top categories
    expect(screen.getByText(/Food:/)).toBeInTheDocument();
    expect(screen.getByText(/\$470\.00/)).toBeInTheDocument(); // 420 + 50
    expect(screen.getByText(/Transport:/)).toBeInTheDocument();
    expect(screen.getByText(/\$180\.00/)).toBeInTheDocument();
    expect(screen.getByText(/Entertainment:/)).toBeInTheDocument();
    expect(screen.getByText(/\$95\.00/)).toBeInTheDocument();
  });

  it('only shows expenses from current month', () => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 15);

    const mockExpenses: Expense[] = [
      {
        id: '1',
        date: now,
        amount: 100,
        category: 'Food',
        description: 'Current month',
      },
      {
        id: '2',
        date: lastMonth,
        amount: 500,
        category: 'Transport',
        description: 'Last month',
      },
    ];

    render(<MonthlyInsights expenses={mockExpenses} categories={mockCategories} />);

    // Only current month expense should appear
    expect(screen.getByText(/Food:/)).toBeInTheDocument();
    expect(screen.getByText(/\$100\.00/)).toBeInTheDocument();

    // Last month expense should not be in top 3
    expect(screen.queryByText(/Transport:/)).not.toBeInTheDocument();
  });

  it('limits display to top 3 categories even with more expenses', () => {
    const now = new Date();
    const mockExpenses: Expense[] = [
      { id: '1', date: now, amount: 100, category: 'Food', description: 'Test' },
      { id: '2', date: now, amount: 90, category: 'Transport', description: 'Test' },
      { id: '3', date: now, amount: 80, category: 'Entertainment', description: 'Test' },
      { id: '4', date: now, amount: 70, category: 'Shopping', description: 'Test' },
      { id: '5', date: now, amount: 60, category: 'Health', description: 'Test' },
    ];

    render(<MonthlyInsights expenses={mockExpenses} categories={[...mockCategories, 'Shopping', 'Health']} />);

    // Should only show top 3
    expect(screen.getByText(/Food:/)).toBeInTheDocument();
    expect(screen.getByText(/Transport:/)).toBeInTheDocument();
    expect(screen.getByText(/Entertainment:/)).toBeInTheDocument();
    expect(screen.queryByText(/Shopping:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Health:/)).not.toBeInTheDocument();
  });

  it('calculates budget streak correctly (days since last expense)', () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const mockExpenses: Expense[] = [
      {
        id: '1',
        date: twoDaysAgo,
        amount: 100,
        category: 'Food',
        description: 'Test',
      },
    ];

    render(<MonthlyInsights expenses={mockExpenses} categories={mockCategories} />);

    // Should show 2 days since last expense
    const budgetStreakElement = screen.getByText('2');
    expect(budgetStreakElement).toBeInTheDocument();
  });

  it('shows category emojis for known categories', () => {
    const now = new Date();
    const mockExpenses: Expense[] = [
      { id: '1', date: now, amount: 100, category: 'Food', description: 'Test' },
    ];

    const { container } = render(<MonthlyInsights expenses={mockExpenses} categories={mockCategories} />);

    // Check that an emoji is rendered (Food emoji is 🍔)
    expect(container.textContent).toContain('🍔');
  });
});
