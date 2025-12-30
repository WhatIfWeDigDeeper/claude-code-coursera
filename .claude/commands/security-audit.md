# Security Audit Command

Performs a comprehensive security vulnerability scan for a specific feature or the entire codebase.

## Usage

```
/security-audit <feature-name>
```

**Examples:**
- `/security-audit password-reset`
- `/security-audit export-modal`
- `/security-audit .` (for complete application scan)

## What This Command Does

1. **Creates Isolated Worktree**: Sets up a new git worktree for safe analysis without affecting your current work
2. **Dependency Vulnerability Scan**: Runs `npm audit` to check for known vulnerabilities in dependencies
3. **Code Pattern Analysis**: Scans code for common security issues:
   - Missing input validation
   - SQL injection vulnerabilities
   - Cross-Site Scripting (XSS) risks
   - Authentication/authorization flaws
   - Insecure data storage
   - Hardcoded secrets/credentials
   - Insecure direct object references
   - Security misconfiguration
4. **Generates Report**: Creates a detailed markdown report at `expense-tracker-ai/docs/dev/{feature-name}-security-audit.md`
5. **Offers Remediation**: Provides fix recommendations and offers to implement them

## Instructions for Claude

When this command is executed with a feature name as `$ARGUMENTS`:

### Step 1: Setup Worktree
```bash
cd expense-tracker-ai
WORKTREE_PATH="../security-audit-${ARGUMENTS}"
git worktree add "$WORKTREE_PATH"
cd "$WORKTREE_PATH"
npm install
```

### Step 2: Run Dependency Scans

Run multiple security scanning tools:

```bash
# NPM Audit - check for known vulnerabilities
npm audit --json > npm-audit-results.json

# Check for outdated packages with known security issues
npm outdated --json > npm-outdated.json 2>/dev/null || echo "{}" > npm-outdated.json
```

### Step 3: Identify Feature Files

Based on the feature name provided in `$ARGUMENTS`:

1. Use grep to find files related to the feature:
   ```bash
   grep -r -i "$ARGUMENTS" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" .
   ```

2. If feature name matches common patterns, check these locations:
   - `components/{FeatureName}.tsx`
   - `components/{feature-name}.tsx`
   - `app/{feature-name}/`
   - `lib/{feature-name}.ts`

3. For "." (full app) scan, analyze all application code files

### Step 4: Code-Level Security Analysis

Analyze identified files for these security patterns:

#### A. Input Validation Issues
Search for:
- Forms without validation
- User input directly used in operations
- Missing sanitization before rendering
- Type coercion vulnerabilities

**Patterns to detect:**
```typescript
// Missing validation
const value = req.body.someField; // No validation

// Unsafe innerHTML usage
element.innerHTML = userInput; // XSS risk

// Missing type checking
if (userInput) { /* no type validation */ }
```

#### B. XSS Vulnerabilities
Search for:
- `innerHTML` usage
- `dangerouslySetInnerHTML` in React
- Unescaped user content in templates
- Direct DOM manipulation with user data

**Safe patterns:**
```typescript
// Good: React auto-escapes
<div>{userInput}</div>

// Risky: Needs sanitization
<div dangerouslySetInnerHTML={{__html: userInput}} />
```

#### C. Authentication & Authorization
Search for:
- Unprotected routes/components
- Client-side only authentication
- Missing session validation
- Insecure token storage

**Check localStorage usage:**
```typescript
// Current app stores data in localStorage
// Verify no sensitive data (passwords, tokens) stored unencrypted
```

#### D. SQL Injection (if database queries exist)
Search for:
- String concatenation in queries
- Unparameterized queries
- Dynamic query building without sanitization

#### E. Sensitive Data Exposure
Search for:
- Hardcoded API keys, passwords, tokens
- Console.log with sensitive data
- Error messages exposing internal details
- Unencrypted sensitive data storage

**Patterns to detect:**
```typescript
// Hardcoded secrets
const API_KEY = "sk-1234567890abcdef";
const password = "admin123";

// Sensitive data in logs
console.log("User password:", password);
```

#### F. Insecure Dependencies
From npm audit results:
- Critical/High severity vulnerabilities
- Known exploits in dependencies
- Outdated packages with security patches

#### G. CSRF Protection
Search for:
- State-changing operations without CSRF tokens
- Missing SameSite cookie attributes
- Unprotected API endpoints

#### H. Security Headers & Configuration
Check for:
- Missing Content Security Policy
- Insecure CORS configuration
- Missing security headers in Next.js config

### Step 5: Generate Security Report

Create file at `expense-tracker-ai/docs/dev/${ARGUMENTS}-security-audit.md` with this structure:

```markdown
# Security Audit Report: {Feature Name}

**Date**: {Current Date}
**Scope**: {Feature description or "Full Application" if "."}
**Auditor**: Claude Code Security Audit

## Executive Summary

{Brief overview of findings - number of issues by severity}

## Dependency Vulnerabilities

### Critical Issues
{List critical severity npm audit findings}

### High Severity Issues
{List high severity findings}

### Moderate/Low Severity Issues
{List moderate/low findings}

### Recommendations
- Upgrade affected packages to secure versions
- Review and test upgrades in isolated environment
- Do NOT use `npm audit fix --force`
- Consider alternative packages if patches unavailable

## Code-Level Vulnerabilities

### {Category} - {Severity}

**Location**: `{file}:{line}`

**Issue**: {Description of vulnerability}

**Risk**: {Explanation of potential exploit/impact}

**Current Code**:
```typescript
{Vulnerable code snippet}
```

**Recommended Fix**:
```typescript
{Secure code example}
```

**CLAUDE.md Update Needed**: {Yes/No - if yes, specify section}

---

{Repeat for each vulnerability found}

## Security Best Practices for This Feature

{Feature-specific security recommendations}

## Recommended CLAUDE.md Updates

Add the following sections to CLAUDE.md:

### Security Guidelines

{Specific guidelines based on vulnerabilities found, e.g.:

1. **Input Validation**: All user inputs must be validated before processing
   ```typescript
   // Always validate and sanitize user input
   const sanitized = validateAndSanitize(userInput);
   ```

2. **XSS Prevention**: Never use dangerouslySetInnerHTML without sanitization

3. **Sensitive Data**: Never store passwords or tokens in localStorage
}

## Summary Statistics

- **Total Issues Found**: {count}
- **Critical**: {count}
- **High**: {count}
- **Medium**: {count}
- **Low**: {count}

## Next Steps

1. Review all Critical and High severity issues immediately
2. Plan remediation for Medium severity issues
3. Update CLAUDE.md with security guidelines
4. Implement recommended code fixes
5. Re-run security audit after fixes

---

**Auto-fix Available**: {Yes/No}
```

### Step 6: Cleanup Worktree

```bash
cd ..
git worktree remove "$WORKTREE_PATH" --force
```

### Step 7: Present Findings

1. Display summary of findings to user
2. Show path to generated report
3. Ask: "Would you like me to fix the identified vulnerabilities?"

If user agrees to fixes:
- Start with Critical/High severity issues
- Update dependencies with safe version upgrades
- Modify code to implement secure patterns
- Update CLAUDE.md with new security guidelines
- Run tests to ensure fixes don't break functionality
- Update relevant documentation in `expense-tracker-ai/docs/dev/`

## Additional Security Tools to Consider

If available in the project, also run:
- `npm run lint` (may catch security patterns)
- ESLint security plugins
- Snyk CLI (if installed): `npx snyk test`
- OWASP Dependency-Check

## Notes

- This audit focuses on common web application vulnerabilities (OWASP Top 10)
- For Next.js apps, pay special attention to client/server boundary security
- localStorage persistence pattern requires careful handling of sensitive data
- Always test security fixes thoroughly before deploying
- Keep audit reports in `expense-tracker-ai/docs/dev/` for historical tracking

## Example Report Location

For feature "password-reset":
```
expense-tracker-ai/docs/dev/password-reset-security-audit.md
```

For full app audit:
```
expense-tracker-ai/docs/dev/full-app-security-audit.md
```

**Note**: Use `.` as the feature name for full application scans, which creates a more intuitive CLI experience.
