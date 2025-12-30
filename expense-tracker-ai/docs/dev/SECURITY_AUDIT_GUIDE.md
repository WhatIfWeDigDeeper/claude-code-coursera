# Security Audit Command Guide

This guide explains how to use the `/security-audit` command to scan your code for security vulnerabilities.

## Quick Start

```bash
/security-audit <feature-name>
```

**Examples:**
```bash
/security-audit password-reset
/security-audit export-modal
/security-audit .
```

## What Gets Scanned

### 1. Dependency Vulnerabilities
- Runs `npm audit` to check for known CVEs in dependencies
- Identifies outdated packages with security patches
- Reports severity levels (Critical, High, Medium, Low)

### 2. Code-Level Security Issues

The command scans for common OWASP Top 10 vulnerabilities:

#### Input Validation
- Missing validation on user inputs
- Type coercion vulnerabilities
- Unsafe parsing operations

#### Cross-Site Scripting (XSS)
- Use of `dangerouslySetInnerHTML` without sanitization
- Direct `innerHTML` manipulation
- Unescaped user content in templates

#### Authentication & Authorization
- Unprotected routes
- Client-side only authentication
- Insecure token storage
- Missing session validation

#### Sensitive Data Exposure
- Hardcoded secrets, API keys, passwords
- Sensitive data in console logs
- Unencrypted sensitive data in localStorage
- Error messages exposing internal details

#### SQL Injection (if applicable)
- String concatenation in queries
- Unparameterized queries
- Dynamic query building without sanitization

#### CSRF Protection
- State-changing operations without CSRF tokens
- Missing SameSite cookie attributes

#### Security Configuration
- Missing Content Security Policy
- Insecure CORS configuration
- Missing security headers

## Report Structure

Generated reports are saved to:
```
expense-tracker-ai/docs/dev/{feature-name}-security-audit.md
```

### Report Contents

1. **Executive Summary**: Overview of findings by severity
2. **Dependency Vulnerabilities**: npm audit results
3. **Code-Level Vulnerabilities**: Detailed findings with:
   - File location and line numbers
   - Description of the issue
   - Risk explanation
   - Current vulnerable code
   - Recommended secure code
   - CLAUDE.md updates needed
4. **Security Best Practices**: Feature-specific recommendations
5. **Recommended CLAUDE.md Updates**: Security guidelines to add
6. **Summary Statistics**: Counts by severity level
7. **Next Steps**: Prioritized action plan

## Using the Results

### 1. Review Findings
Start with Critical and High severity issues:
```bash
grep -A 5 "### Critical" {feature-name}-security-audit.md
```

### 2. Accept Auto-Fix Offer
When prompted, allow Claude to:
- Update dependencies to secure versions
- Implement secure code patterns
- Update CLAUDE.md with security guidelines
- Run tests to verify fixes

### 3. Manual Review
Some fixes may require manual decisions:
- Architecture changes
- Breaking changes in dependencies
- Trade-offs between security and functionality

## Best Practices

### When to Run Security Audits

Run audits:
- Before merging feature branches
- After adding authentication/authorization
- When handling user input
- Before production deployments
- Periodically (monthly recommended)

### Integration with Workflow

1. **Feature Development**:
   ```bash
   git checkout -b feature-new-auth
   # ... implement feature ...
   /security-audit new-auth
   # ... review and fix issues ...
   git commit
   ```

2. **Pre-Deployment**:
   ```bash
   /security-audit .
   # ... address critical/high issues ...
   ```

3. **Regular Maintenance**:
   ```bash
   /security-audit .
   # ... update dependencies ...
   # ... update CLAUDE.md ...
   ```

## Understanding Severity Levels

### Critical
- Immediate action required
- Active exploits known
- Remote code execution possible
- Data breach likely

### High
- Fix before deployment
- Authentication bypass possible
- Sensitive data exposure
- Known vulnerabilities with patches

### Medium
- Plan to fix soon
- Limited exploitability
- Requires specific conditions
- Defense-in-depth improvements

### Low
- Fix when convenient
- Informational
- Best practice improvements
- Hardening recommendations

## Common Vulnerabilities in This Codebase

### localStorage Security
This app uses localStorage for persistence. Watch for:
- Storing passwords or auth tokens unencrypted
- Sensitive PII in plain text
- API keys or secrets

**Safe Pattern**:
```typescript
// OK: Non-sensitive application data
localStorage.setItem('expenses', JSON.stringify(expenses));

// NOT OK: Sensitive data
// localStorage.setItem('password', userPassword);
```

### XSS in React
React auto-escapes content, but watch for:
```typescript
// Safe
<div>{userInput}</div>

// Dangerous - requires sanitization
<div dangerouslySetInnerHTML={{__html: userInput}} />
```

### Client-Side Validation
Always validate on server-side too:
```typescript
// Client validation is good UX
if (!email.includes('@')) return;

// But server must also validate
// (If this app adds API routes later)
```

## Updating CLAUDE.md

After running audits, update [CLAUDE.md](../../CLAUDE.md) with security guidelines:

```markdown
## Security Guidelines

### Input Validation
All user inputs must be validated before processing:
```typescript
// Validate all user input
const sanitized = validateAndSanitize(userInput);
```

### XSS Prevention
- Never use `dangerouslySetInnerHTML` without DOMPurify
- Prefer React's auto-escaping
- Sanitize all user-generated content

### Sensitive Data
- Never store passwords in localStorage
- Use environment variables for API keys
- Encrypt sensitive data before storage
```

## Troubleshooting

### "npm audit found vulnerabilities"
1. Check if patches are available: `npm audit fix --dry-run`
2. Test updates in isolated branch
3. Review breaking changes
4. Update gradually, test between changes

### "No files found for feature"
- Check feature name spelling
- Try related terms: `export` vs `export-modal`
- Use `.` for comprehensive full application scan

### "Worktree creation failed"
- Remove existing worktree: `git worktree remove ../security-audit-{feature}`
- Check disk space
- Ensure no uncommitted changes

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [npm audit documentation](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [React Security Guide](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)

## Example Audit Session

```bash
$ /security-audit export-modal

Creating worktree for security audit...
Running npm audit...
Scanning code for vulnerabilities...

Found 3 issues:
- 1 High: Unvalidated user input in export filename
- 1 Medium: Missing CSRF protection
- 1 Low: Outdated dependency with patch available

Report generated: expense-tracker-ai/docs/dev/export-modal-security-audit.md

Would you like me to fix these vulnerabilities? (y/n)

$ y

Fixing High severity issue in components/ExportModal.tsx...
Updating dependencies...
Updating CLAUDE.md with security guidelines...
Running tests...

All tests passed ✓
All fixes committed to feature-security-audit-command branch ✓

Next steps:
1. Review changes in git diff
2. Test export functionality manually
3. Create pull request
```

## Maintaining Audit History

Keep all audit reports for compliance and tracking:

```bash
expense-tracker-ai/docs/dev/
├── export-modal-security-audit.md       (2024-01-15)
├── export-modal-security-audit-v2.md    (2024-02-20)
├── full-app-security-audit.md           (2024-01-01)
└── password-reset-security-audit.md     (2024-01-10)
```

Version reports with dates to track improvements over time.
