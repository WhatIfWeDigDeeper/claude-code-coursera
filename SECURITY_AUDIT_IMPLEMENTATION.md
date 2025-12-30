# Security Audit Command Implementation

## Overview

This document describes the implementation of the `/security-audit` command, a comprehensive security vulnerability scanner for Claude Code.

## Files Created

### 1. Command Definition
**Location**: [.claude/commands/security-audit.md](.claude/commands/security-audit.md)

Defines the command structure and instructions for Claude Code. This file contains:
- Detailed step-by-step workflow for security audits
- Code patterns to detect (XSS, SQL injection, etc.)
- Report generation template
- Integration with git worktrees for safe analysis

### 2. Skill Definition
**Location**: [.claude/skills/security-audit.md](.claude/skills/security-audit.md)

Makes the command executable as `/security-audit <feature-name>`. This is the user-facing interface.

### 3. Usage Guide
**Location**: [expense-tracker-ai/docs/dev/SECURITY_AUDIT_GUIDE.md](expense-tracker-ai/docs/dev/SECURITY_AUDIT_GUIDE.md)

Comprehensive documentation for developers including:
- How to use the command
- Understanding scan results
- Severity level explanations
- Integration with development workflow
- Troubleshooting guide
- Example audit sessions

## Features Implemented

### 1. Isolated Worktree Analysis
Creates a separate git worktree to perform analysis without affecting the current working directory:
```bash
git worktree add ../security-audit-{feature-name}
```

### 2. Dependency Vulnerability Scanning
- Runs `npm audit` to detect known CVEs
- Checks for outdated packages with security patches
- Provides severity ratings (Critical, High, Medium, Low)

### 3. Code Pattern Analysis

Scans for OWASP Top 10 vulnerabilities:

#### Input Validation
- Missing validation on user inputs
- Type coercion vulnerabilities
- Unsafe parsing operations

#### Cross-Site Scripting (XSS)
- `dangerouslySetInnerHTML` usage
- Direct `innerHTML` manipulation
- Unescaped user content

#### Authentication & Authorization
- Unprotected routes
- Insecure token storage
- Client-side only authentication

#### Sensitive Data Exposure
- Hardcoded secrets (API keys, passwords)
- Sensitive data in console logs
- Unencrypted data in localStorage

#### SQL Injection
- String concatenation in queries
- Unparameterized queries

#### CSRF Protection
- Missing CSRF tokens
- Insecure cookie attributes

#### Security Configuration
- Missing Content Security Policy
- Insecure CORS settings
- Missing security headers

### 4. Comprehensive Reporting

Generates markdown reports with:
- Executive summary
- Dependency vulnerabilities by severity
- Code-level vulnerabilities with:
  - File location and line numbers
  - Issue description and risk explanation
  - Current vulnerable code
  - Recommended secure code
  - CLAUDE.md update recommendations
- Security best practices
- Summary statistics
- Prioritized next steps

### 5. Auto-Fix Capability

Offers to automatically fix vulnerabilities:
- Update dependencies to secure versions
- Implement secure code patterns
- Update CLAUDE.md with security guidelines
- Run tests to verify fixes
- Commit changes with descriptive messages

### 6. CLAUDE.md Integration

Recommends security guidelines to add to [CLAUDE.md](CLAUDE.md):
- Input validation requirements
- XSS prevention rules
- Sensitive data handling
- Feature-specific security patterns

## Usage

### Basic Usage
```bash
/security-audit export-modal
```

### Full Application Scan
```bash
/security-audit full-app
```

### Example Workflow

1. **Develop Feature**
   ```bash
   git checkout -b feature-new-auth
   # ... implement authentication ...
   ```

2. **Run Security Audit**
   ```bash
   /security-audit new-auth
   ```

3. **Review Report**
   ```bash
   cat expense-tracker-ai/docs/dev/new-auth-security-audit.md
   ```

4. **Accept Auto-Fix**
   ```
   Would you like me to fix the identified vulnerabilities? (y/n)
   y
   ```

5. **Verify Fixes**
   ```bash
   npm test
   git diff
   ```

6. **Commit and Deploy**
   ```bash
   git commit
   git push
   ```

## Report Locations

Reports are saved to:
```
expense-tracker-ai/docs/dev/{feature-name}-security-audit.md
```

Examples:
- `expense-tracker-ai/docs/dev/export-modal-security-audit.md`
- `expense-tracker-ai/docs/dev/password-reset-security-audit.md`
- `expense-tracker-ai/docs/dev/full-app-security-audit.md`

## Technical Architecture

### Worktree Isolation
The command uses git worktrees to perform analysis in isolation:
```bash
WORKTREE_PATH="../security-audit-${feature-name}"
git worktree add "$WORKTREE_PATH"
cd "$WORKTREE_PATH"
npm install
# ... perform analysis ...
cd ..
git worktree remove "$WORKTREE_PATH" --force
```

This ensures:
- No interference with current work
- Clean analysis environment
- Safe dependency installation
- Easy cleanup

### Feature Detection
Identifies relevant files by:
1. Grepping for feature name in code
2. Checking common file locations:
   - `components/{FeatureName}.tsx`
   - `app/{feature-name}/`
   - `lib/{feature-name}.ts`
3. For "full-app", scans all application files

### Vulnerability Detection

#### Dependency Scanning
```bash
npm audit --json > npm-audit-results.json
npm outdated --json > npm-outdated.json
```

#### Code Pattern Scanning
Uses grep and file analysis to find:
- Regex patterns for common vulnerabilities
- Unsafe function usage
- Missing security controls
- Configuration issues

### Report Generation

Template-based markdown generation with:
- Structured sections
- Code snippets with syntax highlighting
- Severity-based organization
- Actionable recommendations
- Cross-references to documentation

## Security Considerations

### Scope of Scanning

**Scans:**
- Dependency vulnerabilities (npm audit)
- Common code patterns (OWASP Top 10)
- Configuration issues
- localStorage security

**Does NOT Scan:**
- Runtime behavior
- Complex logic vulnerabilities
- Business logic flaws
- Performance issues

### Limitations

1. **Static Analysis Only**: Cannot detect runtime-specific issues
2. **Pattern Matching**: May have false positives/negatives
3. **Context Required**: Some findings need manual review
4. **No Penetration Testing**: Not a substitute for security testing

### Best Practices

1. **Run Regularly**: Schedule periodic scans
2. **Pre-Deployment**: Always scan before production
3. **Feature Development**: Scan new features
4. **After Updates**: Scan after dependency updates
5. **Manual Review**: Always review findings

## Integration Points

### Git Workflow
- Creates feature branches for fixes
- Commits with descriptive messages
- Preserves audit history in git

### Development Workflow
- Integrates with npm/Next.js tooling
- Respects existing test suite
- Updates documentation automatically

### Documentation
- Generates detailed reports
- Updates CLAUDE.md
- Maintains audit history

## Future Enhancements

Potential additions:
1. **Additional Scanners**:
   - Snyk integration
   - OWASP Dependency-Check
   - ESLint security plugins

2. **Enhanced Detection**:
   - AI-powered vulnerability detection
   - Custom rule definitions
   - Project-specific patterns

3. **Reporting**:
   - HTML report generation
   - Dashboard integration
   - Trend analysis over time

4. **Automation**:
   - CI/CD integration
   - Automated PR comments
   - Scheduled scans

5. **Remediation**:
   - Interactive fix wizard
   - Bulk fix operations
   - Rollback capabilities

## Testing the Command

To verify the command works:

```bash
# Test with a known feature
/security-audit export-modal

# Test with full app
/security-audit full-app

# Verify report generation
ls expense-tracker-ai/docs/dev/*security-audit.md

# Check report content
cat expense-tracker-ai/docs/dev/export-modal-security-audit.md
```

## Maintenance

### Updating the Command

To modify the command:
1. Edit [.claude/commands/security-audit.md](.claude/commands/security-audit.md)
2. Update detection patterns as needed
3. Enhance report template
4. Update [SECURITY_AUDIT_GUIDE.md](expense-tracker-ai/docs/dev/SECURITY_AUDIT_GUIDE.md)
5. Test with sample features

### Adding New Vulnerability Checks

1. Add detection pattern to Step 4 in command file
2. Update report template with new category
3. Add example to usage guide
4. Update CLAUDE.md recommendations

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [npm audit docs](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [React Security](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)

## Commits

This implementation consists of:

1. **491721d**: Add comprehensive security audit command
   - Created `.claude/commands/security-audit.md`
   - Created `.claude/skills/security-audit.md`

2. **5dca730**: Add comprehensive security audit usage guide
   - Created `expense-tracker-ai/docs/dev/SECURITY_AUDIT_GUIDE.md`

## Summary

The security audit command provides:
- ✅ Automated vulnerability scanning
- ✅ Dependency and code-level analysis
- ✅ Comprehensive reporting
- ✅ Auto-fix capabilities
- ✅ Integration with development workflow
- ✅ Documentation and guidance
- ✅ OWASP Top 10 coverage
- ✅ Git worktree isolation
- ✅ Test integration
- ✅ CLAUDE.md updates

This tool helps maintain security throughout the development lifecycle with minimal manual effort.
