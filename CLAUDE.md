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

### Monthly Insights Component ([components/MonthlyInsights.tsx](expense-tracker-ai/components/MonthlyInsights.tsx))

**Purpose**: Provides monthly spending insights with visual analytics.

**Features**:
- Donut chart visualization using Recharts PieChart
- Top 3 spending categories for current month
- Budget streak tracker (days since last expense)
- Category emoji mapping for visual appeal
- Receipt-style UI design with decorative elements
- Full dark mode support

**Test Coverage**: Comprehensive test suite in [components/MonthlyInsights.test.tsx](expense-tracker-ai/components/MonthlyInsights.test.tsx)

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
- ~420 lines of code (with exportUtils.ts: ~600 lines total)

## Development Patterns

### When Adding Features

1. **State Management**: Add state to `app/page.tsx`, pass as props
2. **New Components**: Create in `components/`, export as default
3. **Utilities**: Add to `lib/utils.ts` or create new file in `lib/`
4. **Types**: Define in `types/index.ts` or create new file in `types/`
5. **Utilities Functions**: Use helper functions from `lib/utils.ts`:
   - `getCategoryColor(category, index)`: Hash-based consistent color assignment for categories

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

4. **Category Colors**: Use `getCategoryColor()` from `lib/utils.ts` to ensure consistent color assignment across components
   ```typescript
   const color = getCategoryColor(category, index); // Hash-based, same category = same color
   ```

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

**Testing (devDependencies)**:
- jest@^30.2.0
- @testing-library/react@^16.3.1
- @testing-library/jest-dom@^6.9.1
- @testing-library/user-event@^14.6.1
- jest-environment-jsdom@^30.2.0
- @types/jest@^30.0.0

## Testing Infrastructure

The application uses Jest with React Testing Library for component testing.

**Test Stack**:
- jest@^30.2.0
- @testing-library/react@^16.3.1
- @testing-library/jest-dom@^6.9.1
- @testing-library/user-event@^14.6.1
- jest-environment-jsdom@^30.2.0

**Configuration**:
- [jest.config.js](expense-tracker-ai/jest.config.js): Next.js integration, path alias support (@/ mapping)
- [jest.setup.js](expense-tracker-ai/jest.setup.js): Testing library setup, ResizeObserver mock for Recharts

**Running Tests**:
```bash
npm test           # Run all tests once
npm run test:watch # Run tests in watch mode
```

**Test Coverage**:
- Coverage collected from: `components/`, `lib/`, `app/`
- Example: [MonthlyInsights.test.tsx](expense-tracker-ai/components/MonthlyInsights.test.tsx) demonstrates component testing patterns

**Important**: ResizeObserver is mocked globally in jest.setup.js to support Recharts components in tests.

## Security Guidelines

The application follows security best practices appropriate for a client-side expense tracking application. All developers must adhere to these guidelines when modifying or extending the codebase.

### Input Validation

All user inputs MUST be validated before processing. The application implements comprehensive validation in [components/ExpenseForm.tsx](expense-tracker-ai/components/ExpenseForm.tsx):

**Required Validations**:
- **Date**: Required field, HTML5 date input type
- **Amount**: Must be > 0, numeric type enforcement with step="0.01"
- **Description**: Required, trimmed before storage
- **Category**: Controlled select input, validated against known categories

**Example Validation Pattern**:
```typescript
const validateForm = (): boolean => {
  const newErrors: Partial<ExpenseFormData> = {};

  if (!formData.date) {
    newErrors.date = 'Date is required';
  }

  if (!formData.amount || parseFloat(formData.amount) <= 0) {
    newErrors.amount = 'Amount must be greater than 0';
  }

  if (!formData.description.trim()) {
    newErrors.description = 'Description is required';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

### XSS Prevention

**DO**:
- ✅ Use React's standard JSX rendering (auto-escapes all values)
- ✅ Validate and sanitize all user inputs before processing
- ✅ Use TypeScript for type safety
- ✅ Leverage React's built-in XSS protection

**DON'T**:
- ❌ NEVER use `dangerouslySetInnerHTML` without proper sanitization
- ❌ NEVER use direct `innerHTML` manipulation
- ❌ NEVER render user input as raw HTML
- ❌ NEVER trust user input without validation

**Safe Rendering Example**:
```typescript
// GOOD: React auto-escapes
<div>{userInput}</div>
<p className="text-gray-600">{expense.description}</p>

// BAD: Dangerous HTML injection
<div dangerouslySetInnerHTML={{__html: userInput}} />
```

### Data Storage Security

**localStorage Security Considerations**:

The application uses localStorage for client-side data persistence. Developers must understand that localStorage is NOT secure storage:

- ⚠️ Data is stored as **plain text**
- ⚠️ Accessible by **any script** on the same origin
- ⚠️ Persists **across sessions** (until manually cleared)
- ⚠️ Vulnerable to **XSS attacks** (if XSS vulnerabilities exist)

**NEVER store in localStorage**:
- ❌ Passwords or password hashes
- ❌ API tokens or session tokens
- ❌ API keys or secrets
- ❌ Personally Identifiable Information (PII)
- ❌ Payment card data
- ❌ Authentication credentials

**Current Safe Usage**:
The application currently stores only non-sensitive expense data:
- ✅ Expense amounts and dates
- ✅ Category names
- ✅ Expense descriptions
- ✅ User preferences (categories)

All localStorage functions in [lib/storage.ts](expense-tracker-ai/lib/storage.ts) include JSDoc security warnings. Review these warnings before modifying storage logic.

**Example**:
```typescript
// GOOD: Non-sensitive data
localStorage.setItem('expenses', JSON.stringify(expenses));

// BAD: Sensitive data - NEVER DO THIS
localStorage.setItem('authToken', token);
localStorage.setItem('password', password);
localStorage.setItem('creditCard', cardNumber);
```

### CSV Export Security

When exporting data to CSV format, always escape double quotes to prevent CSV injection attacks (formula injection):

**Implemented Protection** in [lib/exportUtils.ts](expense-tracker-ai/lib/exportUtils.ts):
```typescript
// Proper CSV escaping (doubles quotes inside quoted fields)
`"${expense.description.replace(/"/g, '""')}"`,
```

This prevents malicious formulas like `=cmd|'/c calc'!A1` from executing in Excel/Sheets.

### Security Headers

The application implements HTTP security headers in [next.config.mjs](expense-tracker-ai/next.config.mjs):

**Configured Headers**:
- `X-Frame-Options: DENY` - Prevents clickjacking attacks
- `X-Content-Type-Options: nosniff` - Prevents MIME-type sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information
- `Permissions-Policy` - Restricts camera, microphone, geolocation access
- `Content-Security-Policy` - Restricts resource loading (with Next.js compatibility)

**Note**: The CSP includes `'unsafe-inline'` and `'unsafe-eval'` for compatibility with Next.js and React. For stricter production CSP, consider implementing nonces.

### Dependency Security

**Regular Security Audits**:
1. Run `npm audit` monthly to check for vulnerabilities
2. Review `npm outdated` for available security updates
3. Prioritize fixing High and Critical severity issues
4. Test thoroughly after any dependency updates

**Safe Update Process**:
```bash
# 1. Create feature branch
git checkout -b dependency-updates

# 2. Check for vulnerabilities
npm audit

# 3. Check for outdated packages
npm outdated

# 4. Update specific package (safer than audit fix --force)
npm install package@latest

# 5. Run full test suite
npm test

# 6. Verify build
npm run build

# 7. Verify linting
npm run lint

# 8. Commit if all tests pass
git add package.json package-lock.json
git commit -m "security: update package to resolve vulnerability"
```

**IMPORTANT**:
- ❌ NEVER use `npm audit fix --force` without review (can cause breaking changes)
- ✅ Always test after dependency updates
- ✅ Review changelog for breaking changes
- ✅ Update dependencies incrementally, not all at once

### Production Hardening Checklist

Before deploying to production, verify:

- [ ] Run `npm audit` and resolve all High/Critical vulnerabilities
- [ ] Security headers configured in [next.config.mjs](expense-tracker-ai/next.config.mjs)
- [ ] No `console.log` statements with sensitive data
- [ ] All user inputs validated
- [ ] Full test suite passes (`npm test`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Linting passes with no errors (`npm run lint`)
- [ ] No hardcoded secrets or API keys in code
- [ ] localStorage only contains non-sensitive data
- [ ] Error messages don't expose internal implementation details

### Security Audit Reports

Security audit reports are maintained in [expense-tracker-ai/docs/dev/](expense-tracker-ai/docs/dev/):
- Review audit reports before making security-related changes
- Run security audits after major feature additions
- Document security considerations in pull requests

Latest audit: [full-app-security-audit.md](expense-tracker-ai/docs/dev/full-app-security-audit.md)

### Reporting Security Issues

If you discover a security vulnerability:
1. Do NOT commit code with the vulnerability
2. Document the issue in a security audit report
3. Create a feature branch to fix the issue
4. Test the fix thoroughly
5. Update relevant documentation

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
