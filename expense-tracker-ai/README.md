# Expense Tracker

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- **Add Expenses**: Create new expenses with date, amount, category, and description
- **Edit Expenses**: Update existing expense details
- **Delete Expenses**: Remove expenses with confirmation
- **Data Persistence**: All data is stored in localStorage for demo purposes
- **Form Validation**: Comprehensive validation for all expense inputs

### Dashboard & Analytics
- **Summary Cards**: View total spending, monthly spending, and top category at a glance
- **Category Breakdown**: Visual representation of spending by category with percentages
- **Spending Charts**:
  - Pie chart showing category distribution
  - Bar chart displaying monthly spending trends
- **Smart Filtering**: Filter expenses by date range, category, and search term
- **Export Functionality**: Export all expenses to CSV format

### Design Features
- **Modern UI**: Clean, professional interface with gradient cards and smooth transitions
- **Dark Mode**: Full dark mode support with one-click toggle and theme persistence
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile
- **Visual Feedback**: Loading states, hover effects, and smooth animations
- **Color-Coded Categories**: Each category has a distinct color for easy identification
- **Intuitive Navigation**: Tab-based interface for Overview, Expenses, and Analytics

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for modern, responsive design
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns for date manipulation
- **State Management**: React hooks (useState, useEffect)

## Getting Started

### Prerequisites
- Node.js 18+ installed on your system
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd expense-tracker-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Building for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## Usage Guide

### Adding an Expense

1. Go to the **Overview** tab
2. Fill out the expense form:
   - **Date**: Select the date of the expense
   - **Amount**: Enter the amount (must be greater than 0)
   - **Category**: Choose from Food, Transportation, Entertainment, Shopping, Bills, or Other
   - **Description**: Add a description of the expense
3. Click **Add Expense**

### Viewing Expenses

1. Navigate to the **Expenses** tab
2. View all your expenses sorted by date (newest first)
3. Use filters to find specific expenses:
   - **Date Range**: Filter by start and end date
   - **Category**: Filter by specific category or view all
   - **Search**: Search by description or category name
4. Click **Clear Filters** to reset all filters

### Editing an Expense

1. In the **Expenses** tab, click the **Edit** button on any expense
2. The form will populate with the expense details
3. Make your changes and click **Update Expense**
4. Click **Cancel** to discard changes

### Deleting an Expense

1. In the **Expenses** tab, click the **Delete** button on any expense
2. Confirm the deletion in the dialog
3. The expense will be permanently removed

### Viewing Analytics

1. Navigate to the **Analytics** tab
2. View:
   - **Pie Chart**: Shows spending distribution by category
   - **Bar Chart**: Displays monthly spending trends

### Exporting Data

1. Go to the **Overview** tab
2. Scroll to the "Spending by Category" section
3. Click **Export CSV**
4. A CSV file will be downloaded with all your expenses

## Project Structure

```
expense-tracker-ai/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page component
├── components/
│   ├── Dashboard.tsx        # Dashboard with summary cards
│   ├── ExpenseForm.tsx      # Form for adding/editing expenses
│   ├── ExpenseList.tsx      # List view with filters
│   └── SpendingChart.tsx    # Charts for analytics
├── lib/
│   ├── storage.ts           # localStorage utilities
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript type definitions
├── public/                  # Static assets
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind config
└── next.config.mjs          # Next.js config
```

## Categories

The app supports the following expense categories:
- **Food**: Groceries, restaurants, takeout
- **Transportation**: Gas, public transit, parking
- **Entertainment**: Movies, concerts, hobbies
- **Shopping**: Clothing, electronics, household items
- **Bills**: Utilities, rent, subscriptions
- **Other**: Miscellaneous expenses

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Data Storage

This application uses browser localStorage to persist data. This means:
- Data is stored locally on your device
- Data persists across browser sessions
- Data is not synced across devices
- Clearing browser data will delete all expenses

## Future Enhancements

Potential features for future versions:
- User authentication and cloud storage
- Budget setting and tracking
- Recurring expenses
- Multiple currency support
- Advanced reporting and insights
- Mobile app versions
- Data import functionality
- Custom categories
- Receipt photo uploads

## License

This project is open source and available for personal and educational use.

## Support

For issues or questions, please refer to the project documentation or create an issue in the repository.
