# Security Guidelines

> **Note to Claude**: Only read this file when working with security-related features or code

The application follows security best practices appropriate for a client-side expense tracking application. All developers must adhere to these guidelines when modifying or extending the codebase.

## Input Validation

All user inputs MUST be validated before processing. The application implements comprehensive validation in [components/ExpenseForm.tsx](../../expense-tracker-ai/components/ExpenseForm.tsx):

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

## XSS Prevention

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

## Data Storage Security

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

All localStorage functions in [lib/storage.ts](../../expense-tracker-ai/lib/storage.ts) include JSDoc security warnings. Review these warnings before modifying storage logic.

**Example**:
```typescript
// GOOD: Non-sensitive data
localStorage.setItem('expenses', JSON.stringify(expenses));

// BAD: Sensitive data - NEVER DO THIS
localStorage.setItem('authToken', token);
localStorage.setItem('password', password);
localStorage.setItem('creditCard', cardNumber);
```

## CSV Export Security

When exporting data to CSV format, always escape double quotes to prevent CSV injection attacks (formula injection):

**Implemented Protection** in [lib/exportUtils.ts](../../expense-tracker-ai/lib/exportUtils.ts):
```typescript
// Proper CSV escaping (doubles quotes inside quoted fields)
`"${expense.description.replace(/"/g, '""')}"`,
```

This prevents malicious formulas like `=cmd|'/c calc'!A1` from executing in Excel/Sheets.

## Security Headers

The application implements HTTP security headers in [next.config.mjs](../../expense-tracker-ai/next.config.mjs):

**Configured Headers**:
- `X-Frame-Options: DENY` - Prevents clickjacking attacks
- `X-Content-Type-Options: nosniff` - Prevents MIME-type sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information
- `Permissions-Policy` - Restricts camera, microphone, geolocation access
- `Content-Security-Policy` - Restricts resource loading (with Next.js compatibility)

**Note**: The CSP includes `'unsafe-inline'` and `'unsafe-eval'` for compatibility with Next.js and React. For stricter production CSP, consider implementing nonces.

## Dependency Security

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

## Production Hardening Checklist

Before deploying to production, verify:

- [ ] Run `npm audit` and resolve all High/Critical vulnerabilities
- [ ] Security headers configured in [next.config.mjs](../../expense-tracker-ai/next.config.mjs)
- [ ] No `console.log` statements with sensitive data
- [ ] All user inputs validated
- [ ] Full test suite passes (`npm test`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Linting passes with no errors (`npm run lint`)
- [ ] No hardcoded secrets or API keys in code
- [ ] localStorage only contains non-sensitive data
- [ ] Error messages don't expose internal implementation details

## Security Audit Reports

Security audit reports are maintained in [expense-tracker-ai/docs/dev/](../../expense-tracker-ai/docs/dev/):
- Review audit reports before making security-related changes
- Run security audits after major feature additions
- Document security considerations in pull requests

Latest audit: [full-app-security-audit.md](../../expense-tracker-ai/docs/dev/full-app-security-audit.md)

## Reporting Security Issues

If you discover a security vulnerability:
1. Do NOT commit code with the vulnerability
2. Document the issue in a security audit report
3. Create a feature branch to fix the issue
4. Test the fix thoroughly
5. Update relevant documentation
