# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# IMPORTANT

1. Before you make any change, create and check out a feature branch named "feature-some-short-name". Make and then commit your changes in this branch.

2. You must write automated tests for all code.

3. You must compile the code and pass ALL tests and linting before committing.

## Repository Overview

This is a Coursera course repository for "Claude Code: Software Engineering with Generative AI Agents". It contains:

1. **Root level**: Course notes and documentation in [README.md](README.md)
2. **expense-tracker-ai/**: A complete Next.js expense tracking application used for demonstrations

**Additional Documentation** (in expense-tracker-ai/):
- [DARK_MODE_GUIDE.md](expense-tracker-ai/DARK_MODE_GUIDE.md): Dark mode implementation details
- [GETTING_STARTED.md](expense-tracker-ai/GETTING_STARTED.md): Developer onboarding guide
- [PROJECT_SUMMARY.md](expense-tracker-ai/PROJECT_SUMMARY.md): Technical architecture overview
- [QUICKSTART.md](expense-tracker-ai/QUICKSTART.md): Quick setup instructions
- [START_HERE.md](expense-tracker-ai/START_HERE.md): New developer introduction
- [docs/](expense-tracker-ai/docs/): Additional documentation (dev/, screenshots/, user/)

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

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
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
   ├── expenses (Expense[] state)
   ├── categories (Category[] state) - dynamic, user-customizable
   ├── editingExpense (state)
   ├── activeTab (state) - 'overview' | 'expenses' | 'analytics' | 'insights'
   └── isLoaded (state)
       │
       ├── Overview Tab
       │   ├── ExpenseForm (props: categories, onAddCategory)
       │   └── Dashboard
       │
       ├── Expenses Tab
       │   └── ExpenseList (props: categories)
       │
       ├── Analytics Tab
       │   └── SpendingChart (props: categories)
       │
       └── Insights Tab
           └── MonthlyInsights (props: categories)
   ```

### Type System ([types/index.ts](expense-tracker-ai/types/index.ts))

**Core Types**:
- `Category`: Dynamic string type supporting custom user-defined categories (not a fixed union)
- `Expense`: Main data model with id, date, amount, category, description
- `ExpenseFormData`: Form-specific shape (strings for controlled inputs)
- `FilterOptions`: Controls for filtering expense list
- `SummaryStats`: Computed statistics for dashboard
- `DEFAULT_CATEGORIES`: ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other']

**Important**: Dates are stored as `Date` objects in state but serialized as strings in localStorage. The [storage.ts](expense-tracker-ai/lib/storage.ts) module handles conversion.

### Storage Layer ([lib/storage.ts](expense-tracker-ai/lib/storage.ts))

**Critical Pattern**: All localStorage operations check `typeof window !== 'undefined'` for Next.js SSR compatibility.

Functions:
- `saveExpenses()`: Serializes expense array to localStorage
- `loadExpenses()`: Deserializes from localStorage, converts date strings to Date objects
- `clearExpenses()`: Removes all data
- `saveCategories()`: Persists custom categories to localStorage
- `loadCategories()`: Loads categories from localStorage, falls back to DEFAULT_CATEGORIES

**Error Handling**: Try-catch on parse with fallback to empty array.

### Component Organization

**Container Pattern:** [app/page.tsx](expense-tracker-ai/app/page.tsx) owns all state, [components/](expense-tracker-ai/components/) are presentation-only.

For detailed component architecture and specifications, see [.claude/guidelines/development-patterns.md](.claude/guidelines/development-patterns.md)

## Development Patterns

For comprehensive development patterns, styling conventions, and common gotchas, see [.claude/guidelines/development-patterns.md](.claude/guidelines/development-patterns.md)

**When to read the development patterns:**
- Adding new features or components
- Need styling conventions or code organization guidance
- Debugging common issues

**Quick Reference:**
- **State**: Add to `app/page.tsx`, pass as props
- **Components**: Create in `components/`, export as default
- **Styling**: Tailwind CSS with mobile-first responsive design
- **Common Gotcha**: Parse dates from localStorage: `new Date(expense.date)`
- **Helper**: Use `getCategoryColor(category, index)` for consistent colors

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
- **Monthly Insights**: [components/MonthlyInsights.tsx](expense-tracker-ai/components/MonthlyInsights.tsx)
- **Export**: [components/ExportModal.tsx](expense-tracker-ai/components/ExportModal.tsx), [lib/exportUtils.ts](expense-tracker-ai/lib/exportUtils.ts)
- **Dark Mode**: [contexts/ThemeContext.tsx](expense-tracker-ai/contexts/ThemeContext.tsx), [components/ThemeToggle.tsx](expense-tracker-ai/components/ThemeToggle.tsx)

## Dependencies

For complete dependency list, see [.claude/guidelines/development-patterns.md](.claude/guidelines/development-patterns.md)

**Key Stack:** Next.js 14, React 18, TypeScript 5, Tailwind CSS, Recharts, Jest, Playwright

## Testing

For comprehensive testing guidelines, see [.claude/guidelines/testing-guidelines.md](.claude/guidelines/testing-guidelines.md)

**When to read the testing guidelines:**
- Writing new tests (unit or e2e)
- Debugging test failures
- Setting up test infrastructure
- Understanding test patterns and best practices

**Quick Reference:**

**Unit Tests (Jest + React Testing Library):**
```bash
npm test           # Run all unit tests
npm run test:watch # Watch mode
```

**E2E Tests (Playwright):**
```bash
npm run test:e2e        # Run all e2e tests
npm run test:e2e:ui     # Interactive UI mode
npm run test:e2e:debug  # Debug mode
```

**Key Patterns:**
- Use `data-testid` for selectors (not CSS classes)
- Clear localStorage in `beforeEach` to prevent test pollution
- Wait for visibility with `toBeVisible()` (not arbitrary timeouts)
- Test happy paths, edge cases, and error states

**Common Gotchas:**
- ResizeObserver is mocked globally for Recharts
- Always clear localStorage between tests
- Use general fixes, not test-specific hardcoded values

## Security Guidelines

For comprehensive security guidelines, see [.claude/guidelines/security-guidelines.md](.claude/guidelines/security-guidelines.md)

**When to read the security guidelines:**
- Working with user input validation
- Implementing data storage or export features
- Adding dependencies or updating packages
- Making security-related code changes
- Preparing for production deployment

**Quick Reference:**
- All user inputs MUST be validated
- NEVER use `dangerouslySetInnerHTML` without sanitization
- NEVER store sensitive data in localStorage
- Always escape CSV exports to prevent injection attacks
- Run `npm audit` monthly and after major changes

## Quick Reference

**Add new expense category**:
Categories are dynamic and user-customizable at runtime:
1. Users can add categories directly through the ExpenseForm UI ("Add New Category" button)
2. Categories are persisted to localStorage via `saveCategories()` in [lib/storage.ts](expense-tracker-ai/lib/storage.ts)
3. To add default categories programmatically: Update `DEFAULT_CATEGORIES` in [lib/storage.ts](expense-tracker-ai/lib/storage.ts)

**Note**: The Category type is a `string` to support unlimited custom categories.

**Add new export format**:
1. Add export function to [lib/exportUtils.ts](expense-tracker-ai/lib/exportUtils.ts)
2. Add format option to [components/ExportModal.tsx](expense-tracker-ai/components/ExportModal.tsx)
3. Update `ExportFormat` type

**Modify analytics**:
1. Update `SummaryStats` calculation in [components/Dashboard.tsx](expense-tracker-ai/components/Dashboard.tsx)
2. Add new chart to [components/SpendingChart.tsx](expense-tracker-ai/components/SpendingChart.tsx)

---

## Markdown Documentation Guidelines

For comprehensive markdown formatting guidelines, see [.claude/guidelines/markdown-guidelines.md](.claude/guidelines/markdown-guidelines.md)

**When to read the markdown guidelines:**
- Creating or editing .md files
- Documenting skills or commands
- Writing technical documentation
- Debugging markdown rendering issues

**Quick Reference:**
- NEVER place consecutive ` ``` ` markers on adjacent lines
- Use 4 backticks for nested code blocks
- Run `/validate-markdown` before committing
- Preview markdown with Cmd+Shift+V in VSCode
