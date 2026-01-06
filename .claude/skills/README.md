# Claude Code Skills

This directory contains reusable skills for common development tasks in this project.

## Table of Contents

- [Available Skills](#available-skills)
  - [security-audit](#security-audit-packages)
  - [add-test](#add-test-component-name)
  - [add-feature](#add-feature-feature-name)
  - [audit-and-fix](#audit-and-fix-packages)
  - [validate-markdown](#validate-markdown-file-path)
- [How to Use Skills](#how-to-use-skills)
- [Skills vs Commands](#skills-vs-commands)
- [Skill Structure](#skill-structure)
- [Creating New Skills](#creating-new-skills)
- [Related Documentation](#related-documentation)

## Available Skills

### `security-audit <packages>`

Performs comprehensive security vulnerability scanning with npm audit and provides detailed categorization of issues.

**What it does**:
1. Creates an isolated git worktree for safe testing
2. Runs npm audit to identify all vulnerabilities
3. Categorizes vulnerabilities by severity (critical, high, moderate, low)
4. Provides detailed information about each vulnerability
5. Recommends specific fixes for each issue type
6. Optionally applies automated fixes with validation

**Example Usage**:
```bash
# Audit all packages
security-audit .

# Audit specific packages
security-audit express mongoose

# Audit packages matching pattern
security-audit @testing-library/*
```

**Output Example**:
```
🔒 Security Audit Report

📊 Vulnerability Summary:
🔴 Critical: 2
🟠 High: 5
🟡 Moderate: 8
🟢 Low: 3

📦 Affected Packages:
- express: 4.17.1 → 4.18.2 (fixes 2 critical, 1 high)
- mongoose: 6.0.0 → 7.0.0 (fixes 3 high, 2 moderate)

✅ Recommended Actions:
1. Update express to 4.18.2 (critical security fix)
2. Update mongoose to 7.0.0 (breaking changes - review changelog)
```

**Benefits**:
- Isolated worktree prevents disrupting main workspace
- Severity categorization helps prioritize fixes
- Detailed recommendations for each vulnerability
- Safe rollback if updates cause issues

---

### `add-test <component-name>`

Adds comprehensive unit tests for a React component or utility function using Jest and React Testing Library.

**What it does**:
1. Identifies whether the file is a component (`.tsx`) or utility (`.ts`)
2. Creates matching test file with proper naming convention
3. Generates test template with:
   - Component render tests
   - User interaction tests
   - Edge case coverage
   - Accessibility checks
4. Runs tests to verify they pass
5. Reports test results and coverage

**Example Usage**:
```bash
# Add tests for a component
add-test ExpenseForm

# Add tests for a utility function
add-test formatCurrency
```

**Test Template Includes**:
- ✅ Rendering tests (component appears correctly)
- ✅ User interaction tests (clicks, inputs, form submissions)
- ✅ Edge cases (empty states, invalid inputs)
- ✅ Accessibility checks (ARIA labels, keyboard navigation)

**Output Example**:
```
✅ Test File Created

📄 File: components/ExpenseForm.test.tsx
📊 Tests: 8 total
  - Rendering: 2 tests
  - User interactions: 3 tests
  - Edge cases: 2 tests
  - Accessibility: 1 test

✅ All tests passing
```

**Benefits**:
- Follows project testing patterns (Jest + React Testing Library)
- Comprehensive coverage from the start
- Uses data-testid for stable selectors
- Adheres to testing best practices

---

### `add-feature <feature-name>`

Adds a new feature with full validation in an isolated git worktree environment. Comprehensive workflow from feature creation to merge.

**What it does**:
1. Creates isolated git worktree at `../add-feature-[name]-worktree-[timestamp]`
2. Creates feature branch `feature-[name]-[timestamp]`
3. Generates feature files:
   - Component file with TypeScript types
   - Test file with comprehensive coverage
   - Integration into main app
4. Runs full validation suite:
   - Build (`npm run build`)
   - Lint (`npm run lint`)
   - Unit tests (`npm test`)
   - E2E tests (`npm run test:e2e`)
5. Categorizes any errors by type
6. Provides detailed report
7. Prompts user to merge to main branch

**Example Usage**:
```bash
# Add a simple feature
add-feature budget-tracker

# Add a complex feature
add-feature user-authentication
```

**Validation Chain**:
1. ✅ `npm run build` - No TypeScript errors
2. ✅ `npm run lint` - No ESLint warnings
3. ✅ `npm test` - All unit tests pass
4. ✅ `npm run test:e2e` - All e2e tests pass

**Error Categorization**:
```
🔴 Build Errors (2)
  - Type error in BudgetTracker.tsx:45
  - Missing import in types/index.ts:12

🟡 Lint Warnings (3)
  - Unused variable in BudgetTracker.tsx:78
  - Missing dependency in useEffect

✅ Tests: All passing (24/24)
```

**Output Example**:
```
✅ Feature Implementation Complete

📦 Feature: budget-tracker
📁 Worktree: ../add-feature-budget-tracker-worktree-20250106-143022

📝 Files Created:
- components/BudgetTracker.tsx (85 lines)
- components/BudgetTracker.test.tsx (120 lines)
- types/budget.ts (24 lines)

✅ Validation Results:
- Build: ✓ Passed
- Lint: ✓ Passed
- Unit tests: ✓ Passed (8/8)
- E2E tests: ✓ Passed (3/3)

📁 Worktree: ../add-feature-budget-tracker-worktree-20250106-143022

Ready to merge to main branch.

Merge changes? (yes/no/review)
```

**Benefits**:
- Isolated worktree prevents breaking main workspace
- Full validation ensures production readiness
- Comprehensive error reporting helps debug issues
- Clear merge path with user control
- Follows project architecture patterns

---

### `audit-and-fix <packages>`

Comprehensive security audit with automatic vulnerability fixes, parallel execution for multiple packages, and full validation.

**What it does**:
1. Creates isolated git worktree for safe testing
2. Runs npm audit to identify all vulnerabilities
3. Categorizes by severity (critical, high, moderate, low)
4. **Parallel execution**: If >3 packages affected, uses Task tool with subagents
5. Applies automated fixes with `npm audit fix`
6. Updates specific packages as needed
7. Validates each fix with full test suite
8. Generates comprehensive security report
9. Prompts user to merge if all validations pass

**Example Usage**:
```bash
# Audit and fix all packages
audit-and-fix .

# Audit and fix specific packages
audit-and-fix express mongoose next

# Audit and fix packages matching pattern
audit-and-fix @testing-library/*
```

**Parallel Execution**:
```bash
# If 4+ packages need updates, uses parallel agents
📊 Found 6 vulnerable packages
🚀 Using parallel execution for efficiency
  - Agent 1: express, mongoose
  - Agent 2: next, react
  - Agent 3: jest, @types/jest

# Sequential processing for ≤3 packages
📊 Found 2 vulnerable packages
📝 Processing sequentially
```

**Validation Per Package**:
1. ✅ Update package
2. ✅ Run `npm run build`
3. ✅ Run `npm run lint`
4. ✅ Run `npm test`
5. ✅ Run `npm run test:e2e`

**Output Example**:
```
✅ Security Audit Complete

📊 Vulnerability Summary:
🔴 Critical: 2 → 0 (fixed)
🟠 High: 5 → 1 (4 fixed, 1 requires manual review)
🟡 Moderate: 8 → 2 (6 fixed, 2 non-breaking)
🟢 Low: 3 → 3 (low priority)

📦 Packages Updated:
✓ express: 4.17.1 → 4.18.2
✓ mongoose: 6.0.0 → 6.8.0
✓ next: 14.0.0 → 14.2.35
⚠ react: 18.2.0 (breaking changes in 19.0.0 - requires manual review)

✅ Validation Results:
- Build: ✓ Passed
- Lint: ✓ Passed
- Tests: ✓ Passed (24/24)
- E2E: ✓ Passed (12/12)

📁 Worktree: ../audit-fix-worktree-20250106-143022

Ready to merge to main branch.

Merge changes? (yes/no/review)
```

**Benefits**:
- Parallel execution 3-5x faster for large updates
- Comprehensive validation prevents breaking changes
- Detailed categorization helps prioritize fixes
- Safe rollback on any validation failure
- Clear reporting of what was fixed and what needs manual review

---

### `validate-markdown <file-path>`

Validates markdown files for common formatting issues with optional auto-fix capability. Supports single files, directories, or entire repository.

**What it does**:
1. Determines scope (single file, directory, or all files)
2. Checks for duplicate code block markers (consecutive ` ``` `)
3. Detects unclosed code blocks (odd number of ` ``` ` markers)
4. Identifies common issues:
   - Tabs in YAML front matter
   - Very long lines (>500 chars)
   - Trailing whitespace
5. Generates comprehensive validation report
6. Offers automatic fixes with user confirmation
7. Provides remediation guidance for manual fixes

**Example Usage**:
```bash
# Validate all markdown files
validate-markdown .

# Validate specific file
validate-markdown skills.md

# Validate directory
validate-markdown .claude/skills/
```

**Validation Checks**:
- ✅ Duplicate code block markers
- ✅ Unclosed code blocks
- ✅ Tabs in YAML front matter
- ✅ Very long lines
- ✅ Trailing whitespace

**Auto-fix Capabilities**:
- ✅ Remove duplicate code block markers
- ✅ Remove trailing whitespace
- ⚠️ Unclosed blocks require manual review

**Output Example**:
```
📊 Validating all markdown files in repository
Found 15 file(s) to validate

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 Checking for duplicate code blocks...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ skills.md
   Lines: 258-259
   Lines: 387-388

⚠️  Found duplicates in 1 file(s)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 VALIDATION SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files checked: 15
Issues found:
  🔴 Duplicate code blocks: 1 files
  🔴 Unclosed code blocks: 0 files
  🟡 Other issues: 0 files

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 FIX OPTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Would you like to automatically fix these issues? (yes/no)

What will be fixed:
  ✓ Remove duplicate code block markers
  ✓ Remove trailing whitespace
  ⚠️  Unclosed blocks require manual review
```

**Integration Options**:
- Pre-commit hook (auto-validate before commits)
- GitHub Actions (validate in CI/CD pipeline)
- Standalone script (`.claude/scripts/validate-markdown.sh`)

**Benefits**:
- Prevents markdown rendering issues
- Auto-fix saves manual editing time
- Comprehensive validation across entire repository
- Integration options for automated checking
- Clear remediation guidance

---

## How to Use Skills

Skills are invoked using the skill name followed by arguments:

```bash
# Basic syntax
<skill-name> <arguments>

# Examples
security-audit .
add-test ExpenseForm
add-feature dark-mode
audit-and-fix express mongoose
validate-markdown skills.md
```

**From Claude Code CLI**: Type the skill name with arguments
**From Chat**: Reference the skill in your prompt
```
Please use the add-test skill to create tests for the ExpenseForm component
```

## Skills vs Commands

This repository contains both **skills** (in `.claude/skills/`) and **commands** (in `.claude/commands/`). Here's the difference:

### Skills
- **Format**: YAML front matter + markdown content
- **Invocation**: Direct by skill name (e.g., `security-audit .`)
- **Metadata**: Structured (skill, description, location)
- **Discoverability**: Better (metadata makes them easier to find)
- **When to use**: Newer, preferred for new development

### Commands
- **Format**: Markdown only
- **Invocation**: Slash prefix (e.g., `/e2e-test all`)
- **Metadata**: Inline documentation
- **Discoverability**: Requires README or documentation
- **When to use**: Legacy, still fully supported

**Both are valid approaches**. Skills are the newer format with better metadata support, but commands remain fully functional. See [.claude/commands/README.md](../commands/README.md) for command documentation.

## Skill Structure

Skills use YAML front matter for metadata:

```yaml
---
skill: skill-name
description: Brief description: $ARGUMENTS
location: project
---

# Skill Title

Main content with process steps, examples, and templates.
```

**Key Elements**:
- `skill`: Unique identifier (kebab-case)
- `description`: What the skill does, includes `$ARGUMENTS` placeholder
- `location`: `project` (local) or `managed` (global)
- **Main content**: Markdown with process steps, bash commands, code templates

## Creating New Skills

Want to create your own skills? See the comprehensive guide:

**[Claude Skills Guide](../../skills.md)** - Complete tutorial on creating skills

The guide covers:
- Skill file format and structure
- YAML front matter syntax
- Argument handling patterns
- Writing effective instructions
- Best practices and advanced patterns
- Troubleshooting common issues

**Quick Start**:
1. Create file: `.claude/skills/[skill-name].md`
2. Add YAML front matter with skill metadata
3. Write process steps in markdown
4. Test with Claude Code
5. Update this README with usage documentation

## Related Documentation

- [Skills Guide](../../skills.md) - Complete guide to creating Claude skills
- [Commands README](../commands/README.md) - Documentation for Claude commands
- [Module 4 Notes](../../module-4.md) - Context about commands and CLAUDE.md
- [CLAUDE.md](../../CLAUDE.md) - Project-specific guidance for Claude
