# npm-latest Command

Updates npm packages to their latest versions with automated testing and validation.

## Usage

```
/npm-latest <packages>
```

### Examples

**Update specific packages:**
```
/npm-latest jest @types/jest
```

**Update all packages:**
```
/npm-latest .
```

**Update packages with glob patterns:**
```
/npm-latest @testing-library/* jest*
```

## What This Command Does

1. **Creates a git worktree** for isolated testing
2. **Updates specified packages** to latest versions (LTS where applicable)
3. **Updates dependencies** that also need updating
4. **Runs npm audit** and attempts fixes for vulnerabilities
5. **Validates** with compile, test, and lint commands
6. **Reports results** with recommendations if errors occur

## Instructions for Claude

When the user runs `/npm-latest <packages>`, follow these steps:

### Step 1: Parse Package Arguments

Parse the `$ARGUMENTS` to determine which packages to update:

- **"." or empty**: Update all packages in package.json
- **Glob patterns** (e.g., `@testing-library/*`, `jest*`): Expand to matching packages
- **Specific packages**: Update only the listed packages

### Step 2: Determine Project Directory

1. Check if we're in the root directory (check for `package.json`)
2. If not, check for `expense-tracker-ai/package.json`
3. Set the working directory to the project with package.json

### Step 3: Create Git Worktree

Create a new git worktree for isolated testing:

```bash
# Generate unique worktree name
WORKTREE_NAME="npm-update-$(date +%Y%m%d-%H%M%S)"
WORKTREE_PATH="../$WORKTREE_NAME"

# Create worktree from current branch
git worktree add "$WORKTREE_PATH" -b "$WORKTREE_NAME"
```

**Important**: All subsequent commands should run in the worktree directory.

### Step 4: Identify Packages to Update

**For specific packages or globs:**
1. Read `package.json` dependencies and devDependencies
2. Match package names against the pattern:
   - `@testing-library/*` matches `@testing-library/react`, `@testing-library/jest-dom`, etc.
   - `jest*` matches `jest`, `jest-environment-jsdom`, etc.
3. Create a list of matched packages

**For "." (all packages):**
1. Extract all packages from dependencies and devDependencies

### Step 5: Check Latest Versions

For each package to update:

```bash
# Get latest version
npm view <package> version

# For packages with LTS releases (like Node.js ecosystem packages):
# Check for LTS tags: npm view <package> dist-tags
# Prefer 'lts' tag if available, otherwise use 'latest'
```

**LTS Detection Logic:**
- If package has an `lts` dist-tag, use that version
- If package name suggests LTS versioning (e.g., even major versions for Node.js), prefer LTS
- Otherwise, use `latest` tag

### Step 6: Update Packages

Update packages incrementally to identify which updates cause issues:

```bash
# Update specific packages
npm install <package1>@latest <package2>@latest

# Or update all
npm update
```

**Important**:
- Use `@lts` tag when applicable
- Log which versions are being installed
- If peer dependency warnings appear, note them for Step 7

### Step 7: Handle Dependency Updates

If peer dependency warnings or compatibility issues arise:

```bash
# Install missing peer dependencies
npm install <peer-dep>@latest

# Or use legacy peer deps if needed
npm install --legacy-peer-deps
```

Document any peer dependency issues encountered.

### Step 8: Run npm audit

```bash
# Check for vulnerabilities
npm audit

# If vulnerabilities found, attempt automated fix
npm audit fix

# For breaking changes, try:
npm audit fix --force
```

**Important**:
- Log audit results
- Note if `--force` is required (indicates breaking changes)
- Document any vulnerabilities that cannot be auto-fixed

### Step 9: Validate the Updates

Run validation commands in this order:

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Build/compile
npm run build

# 3. Lint
npm run lint

# 4. Test
npm test
```

**For each command:**
- Capture exit code and output
- If command fails, log the error
- Continue to next validation step to collect all errors

### Step 10: Analyze Results

**If all validations pass:**
1. Create a summary of updated packages with version changes
2. Show audit results
3. Ask user if they want to:
   - Merge the worktree changes back to main branch
   - Create a commit in the worktree
   - Review changes before proceeding

**If validations fail:**
1. Categorize failures:
   - **Build errors**: TypeScript errors, missing dependencies
   - **Lint errors**: Code style issues
   - **Test failures**: Breaking changes in package behavior
   - **Audit issues**: Unresolved vulnerabilities

2. Provide recommendations:
   - **For build errors**:
     - Check if type definitions need updating (`@types/*` packages)
     - Review breaking changes in package changelogs
     - Suggest pinning to previous working version

   - **For lint errors**:
     - Show specific lint failures
     - Suggest fixes or rule updates

   - **For test failures**:
     - Identify which tests fail
     - Link to package migration guides
     - Suggest updating test code to match new API

   - **For audit issues**:
     - List vulnerabilities that couldn't be fixed
     - Check if updates are available
     - Suggest manual remediation steps

3. Offer options:
   - Try updating packages individually to isolate the problem
   - Revert specific problematic updates
   - Create an issue/task list for manual fixes
   - Abandon the updates and clean up worktree

### Step 11: Cleanup or Integration

**On success:**
```bash
# Option 1: Create a commit in worktree
cd "$WORKTREE_PATH"
git add package.json package-lock.json
git commit -m "chore: update npm packages to latest versions"

# Option 2: User can then merge or create PR
# Guide user through next steps
```

**On failure or user request:**
```bash
# Return to original directory
cd <original-directory>

# Remove worktree
git worktree remove "$WORKTREE_PATH"

# Delete branch if created
git branch -D "$WORKTREE_NAME"
```

## Edge Cases to Handle

1. **No package.json found**: Error with clear message
2. **Not a git repository**: Error - worktree requires git
3. **Uncommitted changes**: Warn user, but worktree isolates changes
4. **Package not in dependencies**: Error with suggestion to check package name
5. **Network failures**: Retry logic or clear error message
6. **Glob matches nothing**: Warn user no packages matched pattern
7. **npm registry issues**: Provide clear error and retry suggestions

## Output Format

Provide clear, structured output:

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

📊 Summary:
Successfully updated 2 packages. All validation checks passed.

Next steps:
1. Review changes: cd ../npm-update-20231215-143022
2. Merge to main: git merge npm-update-20231215-143022
3. Clean up: git worktree remove ../npm-update-20231215-143022
```

## Important Notes

- **Always work in the worktree** to avoid disrupting the main working directory
- **Run full validation suite** even if early steps fail to provide complete picture
- **Document breaking changes** found in package changelogs
- **Prefer LTS versions** for production stability
- **Keep detailed logs** of all operations for troubleshooting
- **Clean up worktrees** after completion or failure

## Security Considerations

- Run `npm audit` before and after updates
- Review audit output for new vulnerabilities
- Check package changelogs for security-related changes
- Never use `--force` or `--legacy-peer-deps` without understanding implications
- Validate all packages compile and test successfully before merging
