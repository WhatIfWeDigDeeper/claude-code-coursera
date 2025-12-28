# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# IMPORTANT

Before you make any change, create and check out a feature branch named "feature-some-short-name". Make and then commit your changes in this branch.

## Repository Overview

This is a Coursera course repository for "Claude Code: Software Engineering with Generative AI Agents". It contains:

1. **Root level**: Course notes and documentation in [README.md](README.md)
2. **expense-tracker-ai/**: A complete Next.js expense tracking application used for demonstrations

## Essential Commands

### Development
```bash
# Navigate to the app directory first
cd expense-tracker-ai

# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Git Workflow
The repository follows a "Best of N" pattern for exploring different implementations:
- `main` branch: Primary development
- `feature-*` branches: Alternative implementations of the same feature
- Use branches to compare different architectural approaches

## Code Architecture

### Application Type
Next.js 14 App Router application with TypeScript, client-side rendering, and localStorage persistence.

### Core Architecture Pattern
**Client-Side State Management with localStorage Persistence**

```
User Interaction
    ↓
React Components (client-side)
    ↓
State Management (useState hooks)
    ↓
localStorage (via lib/storage.ts)
```

### Key Architectural Decisions

1. **Client-Side Only**: All components use `'use client'` directive
   - No server components used
   - All state lives in browser
   - Data persists via localStorage

2. **Centralized State**: Main state lives in [app/page.tsx](expense-tracker-ai/app/page.tsx)
   - Single source of truth for expenses array
   - Props drilling for data distribution
   - No state management library (Redux/Zustand)

3. **Data Flow**:
   ```
   app/page.tsx (state owner)
   ├── ExpenseForm (adds/updates expenses)
   ├── ExpenseList (displays & filters expenses)
   ├── Dashboard (summary statistics)
   └── SpendingChart (visualizations)
   ```

### Type System ([types/index.ts](expense-tracker-ai/types/index.ts))

**Core Types**:
- `Category`: Union type of 6 expense categories
- `Expense`: Main data model with id, date, amount, category, description
- `ExpenseFormData`: Form-specific shape (strings for controlled inputs)
- `FilterOptions`: Controls for filtering expense list
- `SummaryStats`: Computed statistics for dashboard

**Important**: Dates are stored as `Date` objects in state but serialized as strings in localStorage. The [storage.ts](expense-tracker-ai/lib/storage.ts) module handles conversion.

### Storage Layer ([lib/storage.ts](expense-tracker-ai/lib/storage.ts))

**Critical Pattern**: All localStorage operations check `typeof window !== 'undefined'` for Next.js SSR compatibility.

Functions:
- `saveExpenses()`: Serializes expense array to localStorage
- `loadExpenses()`: Deserializes from localStorage, converts date strings to Date objects
- `clearExpenses()`: Removes all data

**Error Handling**: Try-catch on parse with fallback to empty array.

### Component Organization

**Container**: [app/page.tsx](expense-tracker-ai/app/page.tsx)
- Owns all state
- Handles data operations (add, update, delete)
- Manages localStorage sync via useEffect
- Controls tab navigation

**Presentation Components**: [components/](expense-tracker-ai/components/)
- Receive data via props
- Call parent callbacks for actions
- No direct state mutations
- Isolated, testable

### Export System Architecture

Two implementations exist (see [code-analysis.md](code-analysis.md) for detailed comparison):

**V1 (Simple)**:
- Single function in [lib/utils.ts](expense-tracker-ai/lib/utils.ts)
- CSV-only export
- ~25 lines of code

**V2 (Advanced)**:
- Modal-based UI in [components/ExportModal.tsx](expense-tracker-ai/components/ExportModal.tsx)
- Multiple formats (CSV, JSON, PDF)
- Filtering and preview
- Uses jsPDF library
- 850+ lines of code

## Development Patterns

### When Adding Features

1. **State Management**: Add state to `app/page.tsx`, pass as props
2. **New Components**: Create in `components/`, export as default
3. **Utilities**: Add to `lib/utils.ts` or create new file in `lib/`
4. **Types**: Define in `types/index.ts` or create new file in `types/`

### Styling Conventions

- Tailwind CSS utility classes
- Dark mode support via ThemeContext
- Responsive design: mobile-first with `sm:`, `md:`, `lg:` breakpoints
- Gradient backgrounds: `from-{color} to-{color}` pattern
- Hover effects: `hover:` variants for interactive elements

### Data Validation

- **Form Level**: HTML5 input validation (required, min, type)
- **Component Level**: Basic checks before state updates
- **Type Safety**: TypeScript ensures type correctness

### Common Gotchas

1. **Date Handling**: Always parse dates from localStorage
   ```typescript
   date: new Date(expense.date) // Convert string to Date
   ```

2. **localStorage Timing**: Wait for `isLoaded` flag before saving
   ```typescript
   useEffect(() => {
     if (isLoaded) { // Prevent initial save of empty array
       saveExpenses(expenses);
     }
   }, [expenses, isLoaded]);
   ```

3. **Client-Side Only**: All components need `'use client'` directive

## Testing Different Implementations

This repository demonstrates the "Best of N" pattern from Module 2:

1. Create feature branch: `git checkout -b feature-name-v2`
2. Implement alternative approach
3. Document in `code-analysis.md`
4. Compare branches to choose best solution

**Example**: Three export system implementations exist on different branches (see [code-analysis.md](code-analysis.md) for detailed comparison).

## Course Context

This codebase demonstrates concepts from the Coursera course:

- **Module 1**: Big prompts for complete application generation
- **Module 2**: "Best of N" pattern - multiple implementations of export feature
- **Module 3**: Code quality evaluation across implementations
- **Module 4**: This CLAUDE.md file for persistent context

## File Locations Reference

When working with specific features:

- **Expense CRUD**: [app/page.tsx](expense-tracker-ai/app/page.tsx) (state + handlers)
- **Add/Edit Form**: [components/ExpenseForm.tsx](expense-tracker-ai/components/ExpenseForm.tsx)
- **List/Filter**: [components/ExpenseList.tsx](expense-tracker-ai/components/ExpenseList.tsx)
- **Analytics**: [components/Dashboard.tsx](expense-tracker-ai/components/Dashboard.tsx), [components/SpendingChart.tsx](expense-tracker-ai/components/SpendingChart.tsx)
- **Export**: [components/ExportModal.tsx](expense-tracker-ai/components/ExportModal.tsx), [lib/exportUtils.ts](expense-tracker-ai/lib/exportUtils.ts)
- **Dark Mode**: [contexts/ThemeContext.tsx](expense-tracker-ai/contexts/ThemeContext.tsx), [components/ThemeToggle.tsx](expense-tracker-ai/components/ThemeToggle.tsx)

## Dependencies

**Core**:
- next@^14.2.35
- react@^18.3.1
- typescript@^5.6.3

**UI/Styling**:
- tailwindcss@^3.4.17

**Data/Charts**:
- date-fns@^3.0.0 (date formatting)
- recharts@^2.10.0 (charts)

**Export (V2)**:
- jspdf@^3.0.4
- jspdf-autotable@^5.0.2

## Quick Reference

**Add new expense category**:
1. Update `Category` type in [types/index.ts](expense-tracker-ai/types/index.ts)
2. Add to `CATEGORIES` constant in components that use it
3. Update category breakdown logic in [components/Dashboard.tsx](expense-tracker-ai/components/Dashboard.tsx)

**Add new export format**:
1. Add export function to [lib/exportUtils.ts](expense-tracker-ai/lib/exportUtils.ts)
2. Add format option to [components/ExportModal.tsx](expense-tracker-ai/components/ExportModal.tsx)
3. Update `ExportFormat` type

**Modify analytics**:
1. Update `SummaryStats` calculation in [components/Dashboard.tsx](expense-tracker-ai/components/Dashboard.tsx)
2. Add new chart to [components/SpendingChart.tsx](expense-tracker-ai/components/SpendingChart.tsx)
