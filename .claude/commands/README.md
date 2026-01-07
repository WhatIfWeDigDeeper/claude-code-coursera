# Claude Code Commands

This directory contains reusable commands for common development tasks in this project.

## Table of Contents

- [Available Commands](#available-commands)
  - [/parallel-work](#parallel-work-feature-1-feature-2-feature-3-)
  - [/integrate-parallel-work](#integrate-parallel-work-feature-1-feature-2-feature-3-)
  - [/npm-latest](#npm-latest-packages)
  - [/e2e-test](#e2e-test-featurepatternall)
  - [/document-feature](#document-feature-feature-name)
- [How to Use Commands](#how-to-use-commands)
- [Command Structure](#command-structure)
- [Adding New Commands](#adding-new-commands)
- [Tips for Effective Commands](#tips-for-effective-commands)
- [Related Documentation](#related-documentation)

## Available Commands

### `/parallel-work [feature-1] [feature-2] [feature-3] ...`

Sets up parallel development environments using Git worktrees to work on multiple features simultaneously without conflicts.

**What it does**:
1. Creates a separate worktree for each feature at `../expense-tracker-[feature-name]`
2. Creates a feature branch `feature/[feature-name]` in each worktree
3. Sets up the development environment in each worktree
4. Lists all worktrees to confirm creation
5. Explains isolation and how to work with each worktree

**Example Usage**:
```
/parallel-work budget-tracking notifications user-settings
/parallel-work dark-mode export-feature
/parallel-work authentication api-integration
```

**Output**:
- Creates worktrees at `../expense-tracker-budget-tracking`, `../expense-tracker-notifications`, etc.
- Each worktree has its own feature branch
- Isolated development environments for concurrent work

**Benefits**:
- Work on multiple features simultaneously without branch switching
- Each worktree has its own working directory and staging area
- Run separate dev servers for different features
- Test features in isolation before integration

---

### `/integrate-parallel-work [feature-1] [feature-2] [feature-3] ...`

Safely integrates features developed in parallel worktrees into a single branch before merging to main.

**What it does**:
1. Creates a new integration branch called `integration/parallel-features`
2. Merges each `feature/[feature-name]` branch into the integration branch
3. Resolves any merge conflicts that arise
4. Tests that all features work together
5. Runs all tests to ensure nothing is broken
6. Merges to main and cleans up branches once integration is successful

**Example Usage**:
```
/integrate-parallel-work budget-tracking notifications user-settings
/integrate-parallel-work dark-mode export-feature
/integrate-parallel-work authentication api-integration
```

**Process**:
- Creates `integration/parallel-features` branch
- Merges all specified features sequentially
- Handles conflicts with guidance
- Validates integration through testing
- Prepares for production merge

**Best Practices**:
- Test each feature individually before integration
- Review merge conflicts carefully
- Run full test suite after integration
- Keep integration branch separate from main until validated

---

### `/npm-latest <packages>`

Automatically updates npm packages to their latest versions with comprehensive testing and validation in an isolated git worktree.

**What it does**:
1. Creates an isolated git worktree for safe testing
2. Updates specified packages to latest versions (preferring LTS where applicable)
3. Updates any peer dependencies that need updating
4. Runs npm audit and attempts automated security fixes
5. Validates with build, lint, and test commands
6. Provides detailed error analysis and recommendations if issues occur

**Example Usage**:
```
# Update specific packages
/npm-latest jest @types/jest

# Update all packages
/npm-latest .

# Update packages matching glob patterns
/npm-latest @testing-library/* jest*
```

**Package Selection**:
- **Specific packages**: List package names separated by spaces
- **All packages**: Use `.` to update everything in package.json
- **Glob patterns**: Use `*` wildcards (e.g., `@testing-library/*` matches `@testing-library/react`, `@testing-library/jest-dom`, etc.)

**LTS Handling**:
- Automatically detects and prefers LTS versions for stability
- Checks for `lts` dist-tags before defaulting to `latest`
- Documents version selection reasoning

**Validation Process**:
1. ✅ npm install
2. ✅ npm run build
3. ✅ npm run lint
4. ✅ npm test

**Error Handling**:
- Categorizes failures (build errors, lint errors, test failures, security issues)
- Provides specific recommendations for each failure type
- Offers multiple recovery options (revert specific updates, update individually, manual fixes)
- Safe cleanup if updates cannot be completed

**Output Example**:
```
🔄 Updating npm packages...

📦 Packages to update:
  - jest: 29.0.0 → 30.2.0
  - @types/jest: 29.0.0 → 30.0.0

🌿 Created worktree: npm-update-20231215-143022

⬆️  Updating packages...
✓ Updated jest to 30.2.0
✓ Updated @types/jest to 30.0.0

🔒 Running npm audit...
✓ No vulnerabilities found

✅ Validation:
✓ Build: passed
✓ Lint: passed
✓ Tests: passed
```

**Benefits**:
- Isolated testing environment prevents breaking your main workspace
- Comprehensive validation catches issues before merging
- Automated security audits ensure dependencies are safe
- Clear error diagnostics help resolve issues quickly
- LTS preference provides production stability

---

### `/e2e-test <feature|pattern|all>`

Creates comprehensive Playwright end-to-end tests in an isolated git worktree environment with full validation.

**What it does**:
1. Creates an isolated git worktree at `../e2e-test-worktree-[timestamp]`
2. Installs and configures Playwright (if not present)
3. Adds npm test scripts for e2e testing
4. Creates test structure (`tests/e2e/` directory)
5. Generates comprehensive test files with proper coverage
6. Runs tests and fixes application code issues (not test workarounds)
7. Validates with full suite: build → lint → unit tests → e2e tests
8. Updates documentation (testing guide, getting started, CLAUDE.md)
9. Prompts user to merge changes back to main

**Example Usage**:
```
# Test specific feature
/e2e-test expense-form

# Test features matching pattern
/e2e-test expense-*

# Test all features
/e2e-test all
/e2e-test .
```

**Test Coverage**:
- ✅ Happy path scenarios
- ✅ Edge cases and boundary conditions
- ✅ Error states and validation
- ✅ Accessibility checks
- ✅ Uses data-testid for stable selectors
- ✅ Follows Page Object Model pattern

**Validation Process**:
1. ✅ `npm run build` - Verify no build errors
2. ✅ `npm run lint` - Verify no lint errors
3. ✅ `npm test` - Verify unit tests still pass
4. ✅ `npm run test:e2e` - Verify e2e tests pass

**Error Handling**:
- Categorizes failures (build, lint, test, security)
- Provides specific recommendations for each failure type
- Links to debugging tools (`--ui`, `--debug`, `--headed` modes)
- Safe cleanup on failure with user confirmation

**Benefits**:
- Isolated testing environment (worktree prevents breaking main workspace)
- Comprehensive test coverage with best practices
- Application code fixes (not brittle test workarounds)
- Full validation ensures production readiness
- Parallel execution for multiple features (>3 uses subagents)
- Clear documentation of patterns and gotchas

**Output Example**:
```
✅ E2E Testing Complete

📊 Summary:
- Tests created: 1 file (12 tests)
- Application code changes: 2

📝 Tests Created:
- tests/e2e/expense-form.spec.ts (12 tests)

🔧 Application Changes:
- Added data-testid to submit button (components/ExpenseForm.tsx:45)
- Fixed validation for negative amounts (components/ExpenseForm.tsx:78)

✅ Validation: build ✓ lint ✓ unit tests ✓ e2e tests (12/12) ✓

Merge changes back to main branch? (yes/no)
```

---

### `/document-feature [feature-name]`

Automatically generates comprehensive documentation for a feature in both technical (developer) and user-friendly formats.

> **📘 Detailed Demo**: See [COMMAND_DEMO.md](../../COMMAND_DEMO.md) for a comprehensive demonstration including examples, time savings analysis, and real-world testing results.

**What it does**:
1. Analyzes the codebase to identify all files related to the feature
2. Detects whether it's a frontend, backend, or full-stack feature
3. Generates technical documentation for developers at `docs/dev/[feature-name]-implementation.md`
4. Generates user-friendly guide at `docs/user/how-to-[feature-name].md`
5. Creates a list of required screenshots at `docs/screenshots/[feature-name]-screenshots-needed.txt`
6. Adds appropriate cross-references between documentation

**Example Usage**:
```
/document-feature dark-mode
/document-feature expense-export
/document-feature category-breakdown
```

**Output**:
- `expense-tracker-ai/docs/dev/dark-mode-implementation.md` - Technical documentation
- `expense-tracker-ai/docs/user/how-to-dark-mode.md` - User guide
- `expense-tracker-ai/docs/screenshots/dark-mode-screenshots-needed.txt` - Screenshot list

**Features**:
- Detects feature type (frontend/backend/full-stack) and adapts documentation
- Includes code examples with file paths and line numbers
- Generates screenshot placeholders for user docs
- Follows consistent naming conventions
- Cross-references related documentation
- Includes troubleshooting and FAQ sections

## How to Use Commands

1. **From Claude Code CLI**: Simply type the command with the feature name
   ```
   /document-feature my-feature
   ```

2. **From Chat**: Reference the command in your prompt
   ```
   Please use the document-feature command to create documentation for the expense export feature
   ```

## Command Structure

Commands are markdown files that provide:
- **Task-specific instructions**: What to do
- **Arguments**: Using `$ARGUMENTS` placeholder
- **Reusable process steps**: How to do it consistently
- **Examples and templates**: What good output looks like
- **Quality standards**: How to ensure quality

## Adding New Commands

To create a new command:

1. Create a new `.md` file in this directory
2. Use the TARGETED framework:
   - **T**ask-Specific Instructions
   - **A**rguments and Placeholders
   - **R**eusable Process Steps
   - **G**uided Examples and References
   - **E**xplicit Output Requirements
   - **T**emplate-Based Naming
   - **E**rror Handling and Edge Cases
   - **D**ocumentation and Context

3. Test the command with realistic examples
4. Update this README with usage instructions

## Tips for Effective Commands

- **Be specific**: Clearly define what the command does
- **Use templates**: Provide exact structure for outputs
- **Include examples**: Show what good results look like
- **Handle edge cases**: Account for different scenarios
- **Document thoroughly**: Explain why, not just what

## Related Documentation

- [Module 4 Notes](../../module-4.md) - Context about commands and CLAUDE.md
- [CLAUDE.md](../../CLAUDE.md) - Project-specific guidance for Claude
- [Existing Documentation Examples](../../expense-tracker-ai/DARK_MODE_GUIDE.md)
