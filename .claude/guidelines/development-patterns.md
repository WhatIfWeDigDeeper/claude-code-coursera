# Development Patterns

> **Note to Claude**: Only read this file when implementing new features or needing guidance on code organization and styling conventions

## When Adding Features

1. **State Management**: Add state to `app/page.tsx`, pass as props
2. **New Components**: Create in `components/`, export as default
3. **Utilities**: Add to `lib/utils.ts` or create new file in `lib/`
4. **Types**: Define in `types/index.ts` or create new file in `types/`
5. **Utilities Functions**: Use helper functions from `lib/utils.ts`:
   - `getCategoryColor(category, index)`: Hash-based consistent color assignment for categories

## Styling Conventions

- Tailwind CSS utility classes
- Dark mode support via ThemeContext
- Responsive design: mobile-first with `sm:`, `md:`, `lg:` breakpoints
- Gradient backgrounds: `from-{color} to-{color}` pattern
- Hover effects: `hover:` variants for interactive elements

## Data Validation

- **Form Level**: HTML5 input validation (required, min, type)
- **Component Level**: Basic checks before state updates
- **Type Safety**: TypeScript ensures type correctness

## Common Gotchas

### 1. Date Handling
Always parse dates from localStorage:
```typescript
date: new Date(expense.date) // Convert string to Date
```

### 2. localStorage Timing
Wait for `isLoaded` flag before saving:
```typescript
useEffect(() => {
  if (isLoaded) { // Prevent initial save of empty array
    saveExpenses(expenses);
  }
}, [expenses, isLoaded]);
```

### 3. Client-Side Only
All components need `'use client'` directive

### 4. Category Colors
Use `getCategoryColor()` from `lib/utils.ts` to ensure consistent color assignment across components:
```typescript
const color = getCategoryColor(category, index); // Hash-based, same category = same color
```

## Component Organization

### Container Pattern
**[app/page.tsx](../../expense-tracker-ai/app/page.tsx)** - Main container:
- Owns all state
- Handles data operations (add, update, delete)
- Manages localStorage sync via useEffect
- Controls tab navigation

### Presentation Components
**[components/](../../expense-tracker-ai/components/)** - UI components:
- Receive data via props
- Call parent callbacks for actions
- No direct state mutations
- Isolated, testable

## Component Details

### Monthly Insights Component
**[components/MonthlyInsights.tsx](../../expense-tracker-ai/components/MonthlyInsights.tsx)**

**Purpose**: Provides monthly spending insights with visual analytics.

**Features**:
- Donut chart visualization using Recharts PieChart
- Top 3 spending categories for current month
- Budget streak tracker (days since last expense)
- Category emoji mapping for visual appeal
- Receipt-style UI design with decorative elements
- Full dark mode support

**Test Coverage**: Comprehensive test suite in [components/MonthlyInsights.test.tsx](../../expense-tracker-ai/components/MonthlyInsights.test.tsx)

### Export System Architecture

Two implementations exist (see [code-analysis.md](../../code-analysis.md) for detailed comparison):

**V1 (Simple)**:
- Single function in [lib/utils.ts](../../expense-tracker-ai/lib/utils.ts)
- CSV-only export
- ~25 lines of code

**V2 (Advanced)**:
- Modal-based UI in [components/ExportModal.tsx](../../expense-tracker-ai/components/ExportModal.tsx)
- Multiple formats (CSV, JSON, PDF)
- Filtering and preview
- Uses jsPDF library
- ~420 lines of code (with exportUtils.ts: ~600 lines total)

## Dependencies

### Core Stack
- next@^14.2.35
- react@^18.3.1
- typescript@^5.6.3

### UI/Styling
- tailwindcss@^3.4.17

### Data/Charts
- date-fns@^3.0.0 (date formatting)
- recharts@^2.10.0 (charts)

### Export (V2)
- jspdf@^3.0.4
- jspdf-autotable@^5.0.2

### Testing (devDependencies)
- jest@^30.2.0
- @testing-library/react@^16.3.1
- @testing-library/jest-dom@^6.9.1
- @testing-library/user-event@^14.6.1
- jest-environment-jsdom@^30.2.0
- @types/jest@^30.0.0
- @playwright/test@^1.57.0
