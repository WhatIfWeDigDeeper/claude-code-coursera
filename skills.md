# Claude Skills Guide

A comprehensive guide to creating custom Claude skills for enhanced workflow automation.

---

## Table of Contents

- [Introduction to Claude Skills](#introduction-to-claude-skills)
- [Skill File Format](#skill-file-format)
- [Creating Your First Skill](#creating-your-first-skill)
- [Skill Metadata Fields](#skill-metadata-fields)
- [Writing Effective Skill Instructions](#writing-effective-skill-instructions)
- [Argument Handling Patterns](#argument-handling-patterns)
- [Example Skills Walkthrough](#example-skills-walkthrough)
- [Skills vs Commands in This Repository](#skills-vs-commands-in-this-repository)
- [Best Practices](#best-practices)
- [Advanced Patterns](#advanced-patterns)
- [Troubleshooting](#troubleshooting)

---

## Introduction to Claude Skills

Claude skills are reusable, structured workflows that automate complex development tasks. They provide a way to codify best practices, processes, and patterns into repeatable commands that Claude Code can execute consistently.

### What Are Claude Skills?

Skills are markdown files with YAML front matter that define:
- **What** the skill does (description)
- **How** to invoke it (skill name)
- **Where** it applies (location: project or managed)
- **Process steps** to execute the task

When you invoke a skill, Claude Code reads the file, substitutes any arguments, and follows the documented process steps to complete the task.

### Skills vs Commands

This repository contains both **commands** and **skills** - two approaches to the same goal:

| Feature | Commands | Skills |
|---------|----------|--------|
| **Format** | Markdown with process steps | YAML front matter + markdown |
| **Location** | `.claude/commands/` | `.claude/skills/` |
| **Metadata** | Informal (in content) | Structured (YAML front matter) |
| **Invocation** | Reference in prompts | Structured skill system |
| **Discovery** | Manual reference | Better tooling support |
| **Status** | Existing approach | Newer approach |

**Both are valid!** Commands are the established pattern in this repository (7 commands exist), while skills represent a newer, more structured approach. This guide focuses on skills, but you can reference existing commands for process patterns.

### When to Use Skills

Create a skill when you have:
- **Repetitive tasks** that follow the same process each time
- **Complex workflows** with multiple steps and validations
- **Best practices** you want to enforce consistently
- **Multi-step operations** that benefit from documentation
- **Safety-critical tasks** requiring isolation and validation

Examples:
- Adding tests to components
- Creating new features with full validation
- Running security audits
- Updating dependencies safely
- Generating documentation

### Benefits of Skills

1. **Consistency**: Same process every time, reducing errors
2. **Documentation**: Process steps are self-documenting
3. **Safety**: Built-in isolation and validation patterns
4. **Scalability**: Can handle single items or bulk operations
5. **Discoverability**: Structured metadata makes skills easier to find
6. **Reusability**: Write once, use many times across projects

---

## Skill File Format

Skills use a specific file format with YAML front matter followed by markdown content.

### Basic Structure

```markdown
---
skill: skill-name
description: Brief description of what this skill does: $ARGUMENTS
location: project
---

# Skill Title: $ARGUMENTS

Brief introduction explaining what this skill will do.

## Process Steps

### 1. First Step

Description and commands for the first step.

### 2. Second Step

Description and commands for the second step.

...
```

### YAML Front Matter

The front matter appears at the top of the file between `---` markers:

```yaml
---
skill: skill-name
description: Brief description: $ARGUMENTS
location: project
---
```

**Required fields:**
- `skill`: The identifier used to invoke this skill (kebab-case)
- `description`: What the skill does, including `$ARGUMENTS` placeholder
- `location`: Where the skill applies (`project` or `managed`)

### Variable Substitution

Use `$ARGUMENTS` as a placeholder for dynamic input:

```yaml
description: Add unit tests for component: $ARGUMENTS
```

When invoked with arguments, `$ARGUMENTS` gets replaced:
- Input: `add-test ExpenseForm`
- Substituted: `Add unit tests for component: ExpenseForm`

### Content Organization

After the front matter, organize content with:
- **Clear heading** restating the task
- **Introduction** explaining what will happen
- **Numbered process steps** with detailed instructions
- **Code examples** showing exact commands and templates
- **Error handling** for common issues
- **Output examples** showing expected results

---

## Creating Your First Skill

Let's create a simple skill step by step.

### Step 1: Choose a Skill Name

Pick a descriptive name in kebab-case that clearly describes what the skill does:

**Good names:**
- `add-test` - Adds tests to a component
- `fix-lint` - Fixes linting errors
- `update-deps` - Updates dependencies

**Avoid:**
- `do-stuff` - Too vague
- `AddTest` - Wrong case (use kebab-case)
- `add_test` - Wrong separator (use hyphens)

### Step 2: Create the File

Create a new file in `.claude/skills/` with your skill name:

```bash
touch .claude/skills/your-skill-name.md
```

For example:
```bash
touch .claude/skills/add-test.md
```

### Step 3: Write the YAML Front Matter

Start your file with the front matter:

```yaml
---
skill: add-test
description: Add unit tests for component or function: $ARGUMENTS
location: project
---
```

**Field explanations:**
- `skill: add-test` - The command name (matches filename)
- `description: ...` - What it does, with `$ARGUMENTS` placeholder
- `location: project` - This skill is specific to this project

### Step 4: Write the Main Content

Add a clear introduction and process steps:

```markdown
# Add Unit Tests: $ARGUMENTS

I'll create comprehensive unit tests for **$ARGUMENTS**.

## Process Steps

### 1. Identify the File to Test

First, I'll locate the source file for $ARGUMENTS.

### 2. Create Test File

I'll create a matching test file following the project's naming convention.

### 3. Generate Test Template

I'll generate test cases covering:
- Happy path scenarios
- Edge cases
- Error handling

### 4. Run Tests

Finally, I'll run the tests to verify they pass.
```

### Step 5: Add Detailed Instructions

Expand each step with specific commands and examples:

```markdown
### 1. Identify the File to Test

**For components:**
```bash
# Check if file exists in components directory
ls components/$ARGUMENTS.tsx
```

**For utility functions:**
```bash
# Check if file exists in lib directory
ls lib/$ARGUMENTS.ts
```

### 2. Create Test File

Create the test file adjacent to the source:

```bash
# For components
touch components/$ARGUMENTS.test.tsx

# For utilities
touch lib/$ARGUMENTS.test.ts
```

### Step 6: Test Your Skill

Save the file and test it by invoking the skill with Claude Code. Verify:
- YAML front matter is valid (no syntax errors)
- `$ARGUMENTS` gets substituted correctly
- Process steps are clear and executable
- All commands work as expected

---

## Skill Metadata Fields

Understanding the YAML front matter fields in detail.

### `skill` Field

The unique identifier for your skill.

**Format:** kebab-case (lowercase with hyphens)

**Examples:**
```yaml
skill: add-test
skill: security-audit
skill: update-dependencies
```

**Usage:** This is the name you'll use to invoke the skill.

### `description` Field

A brief description of what the skill does, including the `$ARGUMENTS` placeholder.

**Format:** One sentence ending with `: $ARGUMENTS`

**Examples:**
```yaml
description: Add unit tests for component or function: $ARGUMENTS
description: Perform security audit: $ARGUMENTS (feature name)
description: Update npm dependencies safely: $ARGUMENTS (package names or '.')
```

**Best practices:**
- Keep it concise (one sentence)
- Include `$ARGUMENTS` to show where input goes
- Optionally add hints about argument format in parentheses
- Focus on what, not how

### `location` Field

Where the skill applies.

**Options:**
- `project` - Skill is specific to this project/repository
- `managed` - Skill is globally available across all projects

**When to use `project`:**
- Skill uses project-specific patterns (e.g., React components)
- Skill references project-specific files or structure
- Skill is tailored to this codebase

**When to use `managed`:**
- Skill is generic and works across any project
- Skill doesn't depend on specific file structure
- Skill provides universal functionality

**Example:**
```yaml
# Project-specific skill for this expense tracker app
location: project

# Generic skill that works anywhere
location: managed
```

---

## Writing Effective Skill Instructions

Guidelines for writing clear, executable process steps.

### Start with a Clear Task Statement

Begin your content with a heading that restates the task using the `$ARGUMENTS` variable:

```markdown
# Add Unit Tests: $ARGUMENTS

I'll create comprehensive unit tests for **$ARGUMENTS** following the project's testing patterns.
```

This confirms to the user what will happen and shows the argument substitution.

### Use Numbered Process Steps

Break the workflow into clear, numbered steps:

```markdown
## Process Steps

### 1. Identify Target File
### 2. Create Test File
### 3. Generate Test Cases
### 4. Run Tests
### 5. Report Results
```

**Why numbering helps:**
- Shows clear progression
- Makes it easy to reference specific steps
- Helps users track progress
- Provides structure for debugging

### Include Executable Commands

Provide exact bash commands that can be copy-pasted:

```markdown
### 1. Check for Existing Tests

```bash
# List all test files in components directory
ls -1 components/*.test.tsx

# Check if specific test exists
test -f components/ExpenseForm.test.tsx && echo "Test exists" || echo "No test found"
```

**Command best practices:**
- Use comments to explain what each command does
- Show both the command and expected output when helpful
- Group related commands together
- Use `&&` and `||` for conditional execution

### Provide Code Templates

Include complete code templates that can be adapted:

```markdown
### 2. Generate Test Template

Create the following test structure:

```typescript
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  test('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByTestId('component-name')).toBeInTheDocument();
  });

  test('should handle user interaction', () => {
    // Test implementation
  });
});
```

### Add Error Handling and Edge Cases

Document what to do when things go wrong:

```markdown
### 5. Handle Errors

**If tests fail:**

```bash
# Run in watch mode for debugging
npm run test:watch -- ComponentName.test.tsx

# Run with verbose output
npm test -- --verbose ComponentName.test.tsx
```

**Common issues:**

1. **Import errors**: Verify the import path matches the file structure
2. **Type errors**: Check that all props have correct TypeScript types
3. **Mock errors**: Ensure mocks are properly defined in test setup
```

### Specify Output Requirements

Tell Claude what to report when done:

```markdown
### 6. Report Results

Generate a summary report:

```
✅ Tests Created Successfully

📊 Summary:
- Test file: components/ExpenseForm.test.tsx
- Test cases: 8
- All tests passing: ✓

📝 Test Coverage:
- Happy path scenarios (3 tests)
- Edge cases (3 tests)
- Error handling (2 tests)
```

### Reference Existing Patterns

Point to existing code or documentation when applicable:

```markdown
### 3. Follow Existing Patterns

Review existing tests for patterns:

```bash
# See example test structure
cat components/MonthlyInsights.test.tsx
```

**Key patterns to follow:**
- Use `@testing-library/react` for component tests
- Use `data-testid` attributes for selectors
- Mock `localStorage` in `beforeEach` blocks
- Test both success and error states
```

---

## Argument Handling Patterns

Skills can accept different types of arguments for flexibility.

### Single Argument

Most common pattern - one specific item:

```yaml
description: Add unit tests for component: $ARGUMENTS
```

**Usage examples:**
- `add-test ExpenseForm`
- `add-test Dashboard`
- `add-test getCategoryColor`

**In your skill:**
```markdown
### 1. Identify File

Looking for: $ARGUMENTS
```

### Multiple Arguments (Space-Separated)

Accept several items:

```yaml
description: Add tests for components: $ARGUMENTS (space-separated)
```

**Usage examples:**
- `add-tests ExpenseForm Dashboard`
- `add-tests ExpenseForm ExpenseList MonthlyInsights`

**In your skill:**
```markdown
### 1. Process Each Component

For each component in $ARGUMENTS, I'll:
1. Create test file
2. Generate test cases
3. Run tests
```

### Glob Patterns

Accept wildcard patterns:

```yaml
description: Add tests for components matching pattern: $ARGUMENTS
```

**Usage examples:**
- `add-tests expense-*` (all files starting with "expense-")
- `add-tests *Form` (all Form components)
- `add-tests **/*.tsx` (all TypeScript components)

**In your skill:**
```bash
# Find files matching pattern
MATCHES=$(find components -name "$ARGUMENTS")

# Process each match
for file in $MATCHES; do
  # Create test for $file
done
```

### All/Everything Pattern

Use `.` or `all` for comprehensive operations:

```yaml
description: Add tests for all components: $ARGUMENTS (use '.' or 'all')
```

**Usage examples:**
- `add-tests .`
- `add-tests all`

**In your skill:**
```bash
if [ "$ARGUMENTS" = "." ] || [ "$ARGUMENTS" = "all" ]; then
  # Process all components
  COMPONENTS=$(ls -1 components/*.tsx | sed 's/.*\///' | sed 's/\.tsx$//')
fi
```

### Conditional Logic Based on Argument Count

Scale behavior based on how many items:

```markdown
### 1. Determine Execution Strategy

**For 1-3 components:** Process sequentially
**For 4+ components:** Use parallel agents for efficiency

```bash
# Count components
COMPONENT_COUNT=$(echo "$ARGUMENTS" | wc -w)

if [ $COMPONENT_COUNT -gt 3 ]; then
  echo "Using parallel execution for $COMPONENT_COUNT components"
  # Use Task tool with subagents
else
  echo "Processing $COMPONENT_COUNT components sequentially"
  # Process one by one
fi
```

### Argument Validation

Check arguments before processing:

```markdown
### 1. Validate Arguments

```bash
# Check if argument is provided
if [ -z "$ARGUMENTS" ]; then
  echo "❌ Error: No component name provided"
  echo "Usage: add-test <ComponentName>"
  exit 1
fi

# Check if file exists
if [ ! -f "components/$ARGUMENTS.tsx" ]; then
  echo "❌ Error: Component not found: $ARGUMENTS"
  echo "Available components:"
  ls -1 components/*.tsx
  exit 1
fi

echo "✅ Found component: $ARGUMENTS"
```

---

## Example Skills Walkthrough

This repository includes three example skills demonstrating different complexity levels.

### Example 1: `add-test.md` (Simple Skill)

**Location:** [.claude/skills/add-test.md](.claude/skills/add-test.md)

**Purpose:** Add unit tests to a component or function

**Complexity:** Simple
- Single file operation
- Straightforward process
- Minimal validation
- ~100 lines

**Key Features:**
```yaml
---
skill: add-test
description: Add unit tests for component or function: $ARGUMENTS
location: project
---
```

**Process Overview:**
1. Identify the file to test (component or lib function)
2. Create matching test file (`.test.tsx` or `.test.ts`)
3. Generate test template with Jest/Testing Library
4. Run tests to verify they pass
5. Report results

**What You'll Learn:**
- Basic skill structure with YAML front matter
- Single argument handling
- File creation patterns
- Testing conventions for this project

**When to Use This Pattern:**
- Simple, single-file operations
- Straightforward linear process
- Minimal error handling needed
- Quick tasks that don't require isolation

---

### Example 2: `add-feature.md` (Multi-Step Skill)

**Location:** [.claude/skills/add-feature.md](.claude/skills/add-feature.md)

**Purpose:** Add a new feature with worktree isolation and full validation

**Complexity:** Medium
- Multi-step workflow
- Worktree isolation
- Full validation chain
- ~300 lines

**Key Features:**
```yaml
---
skill: add-feature
description: Add new feature with full validation: $ARGUMENTS (feature name)
location: project
---
```

**Process Overview:**
1. Create isolated git worktree
2. Generate feature files (component, types, tests)
3. Integrate feature into main app
4. Run validation suite (build → lint → test → e2e)
5. Categorize any errors
6. Report results and prompt for merge

**What You'll Learn:**
- Worktree isolation pattern
- Validation chain implementation
- Error categorization
- User decision prompts
- Safe merge strategies

**Patterns Demonstrated:**

**Worktree Isolation:**
```bash
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
WORKTREE_PATH="../add-feature-worktree-$TIMESTAMP"
git worktree add "$WORKTREE_PATH" -b "feature-$ARGUMENTS-$TIMESTAMP"
cd "$WORKTREE_PATH"
```

**Validation Chain:**
```bash
echo "Running full validation suite..."

npm run build || { echo "❌ Build failed"; exit 1; }
npm run lint || { echo "❌ Lint failed"; exit 1; }
npm test || { echo "❌ Tests failed"; exit 1; }
npm run test:e2e || { echo "❌ E2E tests failed"; exit 1; }

echo "✅ All validations passed"
```

**User Prompting:**
```markdown
✅ Feature implementation complete. All validations passed.

Merge changes back to main branch? (yes/no)
- yes: Will merge worktree → main, then remove worktree
- no: Worktree preserved for review at ../add-feature-worktree-[timestamp]
```

**When to Use This Pattern:**
- Features requiring isolation from main branch
- Tasks needing comprehensive validation
- Operations where you want user confirmation before merging
- Multi-file modifications

---

### Example 3: `audit-and-fix.md` (Complex Skill)

**Location:** [.claude/skills/audit-and-fix.md](.claude/skills/audit-and-fix.md)

**Purpose:** Run security audit and fix vulnerabilities with parallel execution

**Complexity:** Advanced
- Complex conditional logic
- Parallel agent execution
- Comprehensive error reporting
- ~400 lines

**Key Features:**
```yaml
---
skill: audit-and-fix
description: Security audit with automatic fixes: $ARGUMENTS (package names or '.')
location: project
---
```

**Process Overview:**
1. Create isolated worktree
2. Run `npm audit` to identify vulnerabilities
3. Categorize by severity (critical, high, moderate, low)
4. If >3 packages: use parallel agents to update
5. For each update: validate build, lint, tests
6. Generate comprehensive security report
7. Prompt for merge if all validations pass

**What You'll Learn:**
- Parallel execution with Task tool and subagents
- Complex conditional logic
- Severity-based categorization
- Comprehensive reporting
- Batch operation handling

**Patterns Demonstrated:**

**Parallel Execution:**
```markdown
### 4. Determine Execution Strategy

```bash
PACKAGE_COUNT=$(echo "$VULNERABLE_PACKAGES" | wc -l)

if [ $PACKAGE_COUNT -gt 3 ]; then
  echo "📊 Found $PACKAGE_COUNT vulnerable packages"
  echo "🚀 Using parallel agents for efficient updates"

  # Split into groups of 2 packages per agent
  # Launch Task tool with subagents
else
  echo "📊 Found $PACKAGE_COUNT vulnerable packages"
  echo "Processing sequentially"
fi
```

**Severity Categorization:**
```markdown
### 3. Categorize Vulnerabilities

```bash
npm audit --json > audit-report.json

CRITICAL=$(jq '.metadata.vulnerabilities.critical' audit-report.json)
HIGH=$(jq '.metadata.vulnerabilities.high' audit-report.json)
MODERATE=$(jq '.metadata.vulnerabilities.moderate' audit-report.json)
LOW=$(jq '.metadata.vulnerabilities.low' audit-report.json)

echo "🔴 Critical: $CRITICAL"
echo "🟠 High: $HIGH"
echo "🟡 Moderate: $MODERATE"
echo "🟢 Low: $LOW"
```

**Comprehensive Reporting:**
```markdown
### 7. Generate Security Report

```
✅ Security Audit Complete

📊 Vulnerability Summary:
- Critical: 0 (fixed: 2)
- High: 0 (fixed: 3)
- Moderate: 1 (no fix available)
- Low: 0 (fixed: 1)

📦 Packages Updated:
- webpack: 5.88.0 → 5.89.0 (fixed CVE-2023-XXXX)
- react-dom: 18.2.0 → 18.3.1 (fixed CVE-2023-YYYY)
- express: 4.18.0 → 4.19.2 (fixed CVE-2024-ZZZZ)

✅ Validation Results:
- Build: ✓ Passed
- Lint: ✓ Passed
- Tests: ✓ Passed (24/24)
- E2E: ✓ Passed (12/12)

📁 Worktree: ../audit-fix-worktree-20250106-143022
```

**When to Use This Pattern:**
- Operations processing multiple items
- Tasks requiring parallel execution for efficiency
- Complex workflows with multiple decision points
- Operations needing detailed reporting

---

### Example 4: `validate-markdown.md` (Utility Skill)

**Location:** [.claude/skills/validate-markdown.md](.claude/skills/validate-markdown.md)

**Purpose:** Validate markdown files for formatting issues with auto-fix capability

**Complexity:** Medium-Advanced
- Multi-scope processing (file, directory, or all)
- Multiple validation checks
- Auto-fix with user confirmation
- Integration options
- ~400 lines

**Key Features:**
```yaml
---
skill: validate-markdown
description: Validate and fix markdown formatting issues: $ARGUMENTS (file path or '.' for all)
location: project
---
```

**Process Overview:**
1. Determine scope (single file, directory, or all files)
2. Check for duplicate code block markers
3. Detect unclosed code blocks
4. Identify common issues (tabs, long lines, trailing spaces)
5. Generate comprehensive validation report
6. Offer automatic fixes with user confirmation
7. Apply fixes or provide remediation guidance

**What You'll Learn:**
- Flexible argument handling (file, directory, or all)
- Multiple validation check patterns
- Auto-fix with confirmation workflow
- Integration with development workflow (pre-commit hooks, CI/CD)
- Comprehensive reporting and guidance

**Patterns Demonstrated:**

**Scope Determination:**
```bash
if [ "$ARGUMENTS" = "." ] || [ "$ARGUMENTS" = "all" ]; then
  # Validate all markdown files in repository
  FILES=$(find . -name "*.md" -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/plans/*")
  echo "📊 Validating all markdown files in repository"
elif [ -f "$ARGUMENTS" ]; then
  # Validate specific file
  FILES="$ARGUMENTS"
  echo "📝 Validating: $ARGUMENTS"
elif [ -d "$ARGUMENTS" ]; then
  # Validate all markdown in directory
  FILES=$(find "$ARGUMENTS" -name "*.md")
  echo "📁 Validating markdown files in: $ARGUMENTS"
fi
```

**Duplicate Detection Pattern:**
```bash
# Find consecutive ``` markers
DUPLICATES=$(awk '/^```$/{if(prev=="```")print NR-1 "-" NR; prev="```"; next} {prev=$0}' "$file")

if [ ! -z "$DUPLICATES" ]; then
  echo "❌ $file"
  echo "$DUPLICATES" | while read line; do
    echo "   Lines: $line"
  done
fi
```

**Auto-Fix with Confirmation:**
```markdown
### 6. Offer to Fix Issues

if [ $TOTAL_ISSUES -gt 0 ]; then
  echo "Would you like to automatically fix these issues? (yes/no)"
  echo ""
  echo "What will be fixed:"
  echo "  ✓ Remove duplicate code block markers"
  echo "  ✓ Remove trailing whitespace"
  echo "  ⚠️  Unclosed blocks require manual review"
fi
```

**Comprehensive Reporting:**
```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 VALIDATION SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files checked: 15

Issues found:
  🔴 Duplicate code blocks: 1 files
  🔴 Unclosed code blocks: 0 files
  🟡 Other issues: 2 files

Total files with issues: 3
```

**When to Use This Pattern:**
- Utility skills that support development workflow
- Tasks with flexible scope (single file vs. all files)
- Operations offering auto-fix vs. manual guidance
- Skills that integrate with other tools (pre-commit, CI/CD)
- Documentation maintenance tasks

---

## Skills vs Commands in This Repository

Understanding both approaches and when to use each.

### Current State

This repository contains:
- **7 Commands** in [.claude/commands/](.claude/commands/)
- **5 Skills** in [.claude/skills/](.claude/skills/)

### Commands in This Repository

Located in `.claude/commands/`:

1. **parallel-work.md** - Set up parallel development with Git worktrees
2. **integrate-parallel-work.md** - Merge parallel-developed features
3. **parallel-agents.md** - Run parallel agents with Git worktrees
4. **npm-latest.md** - Update packages with validation
5. **e2e-test.md** - Create Playwright e2e tests
6. **document-feature.md** - Generate feature documentation
7. **security-audit.md** - Perform security vulnerability scans

See [.claude/commands/README.md](.claude/commands/README.md) for detailed documentation.

### Skills in This Repository

Located in `.claude/skills/`:

1. **security-audit.md** - Comprehensive security vulnerability scanning (original skill)
2. **add-test.md** - Add unit tests to components or functions (simple example)
3. **add-feature.md** - Add new feature with full validation (medium complexity example)
4. **audit-and-fix.md** - Security audit with automatic fixes (complex example with parallel execution)
5. **validate-markdown.md** - Validate and fix markdown formatting issues (utility skill example)

See [.claude/skills/README.md](.claude/skills/README.md) for detailed usage documentation and examples.

### Command Format Example

From `/e2e-test` command:

```markdown
# /e2e-test Command

Creates comprehensive Playwright end-to-end tests in an isolated git worktree environment.

## Task

Create and execute end-to-end tests for specified features using Playwright...

## Arguments

**$ARGUMENTS**: Feature specification (required)
- **Specific feature**: Single feature name (e.g., `expense-form`)
- **Glob pattern**: Pattern matching (e.g., `expense-*`)
- **All features**: Use `.` or `all`

## Process Steps

### 1. Create Isolated Git Worktree

```bash
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
...
```

### Skill Format Example

From `security-audit.md` skill:

```markdown
---
skill: security-audit
description: Perform comprehensive security vulnerability scan: $ARGUMENTS (feature name)
location: project
---

# Security Audit: $ARGUMENTS

I'll perform a comprehensive security audit for: **$ARGUMENTS**

This will include:
1. Creating an isolated git worktree
2. Running dependency vulnerability scans (npm audit)
...
```

### Key Differences

| Aspect | Commands | Skills |
|--------|----------|--------|
| **Invocation** | Mentioned in prompts | Formal skill system |
| **Metadata** | Embedded in markdown | YAML front matter |
| **Structure** | Flexible format | Standardized format |
| **Discovery** | Manual search | Metadata-driven |
| **Compatibility** | Works everywhere | Newer feature |

### When to Use Each

**Use Commands when:**
- You prefer the established pattern
- You want maximum flexibility in format
- You're working within existing command infrastructure

**Use Skills when:**
- You want structured metadata
- You need better tooling support
- You prefer the newer, standardized approach

**Both are perfectly valid!** This guide focuses on skills, but you can reference any of the 7 existing commands for excellent process patterns.

### The TARGETED Framework

Both commands and skills in this repository follow the **TARGETED** framework from [module-4.md](module-4.md):

1. **T**ask-Specific Instructions - Clear goal statement
2. **A**rguments & Placeholders - `$ARGUMENTS` variable substitution
3. **R**eusable Process Steps - Detailed, numbered workflow
4. **G**uided Examples & References - Concrete examples
5. **E**xplicit Output Requirements - Expected deliverables
6. **T**emplate-Based Naming - Consistent conventions
7. **E**rror Handling & Edge Cases - Failure scenarios
8. **D**ocumentation & Context - Links and context

This framework applies to both formats and is a useful pattern to follow.

---

## Best Practices

Guidelines for creating effective, safe, and maintainable skills.

### 1. Use Worktree Isolation for Safety

Always work in an isolated git worktree for tasks that modify code:

```bash
# Generate unique timestamp for isolation
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
WORKTREE_PATH="../skill-name-worktree-$TIMESTAMP"

# Create worktree with new branch
git worktree add "$WORKTREE_PATH" -b "skill-branch-$TIMESTAMP"

# Work in the worktree
cd "$WORKTREE_PATH"
```

**Why this matters:**
- Keeps main workspace untouched
- Allows safe experimentation
- Easy to discard if something goes wrong
- User can review before merging
- Prevents disrupting ongoing work

**When to use worktrees:**
- Any code modifications
- Dependency updates
- Refactoring operations
- Feature additions
- Security fixes

**When NOT needed:**
- Read-only operations (searching, analyzing)
- Generating reports
- Documentation viewing

### 2. Implement Validation Chains

Run comprehensive validation before considering work complete:

```bash
# Validation chain - stop on first failure
echo "Running validation suite..."

echo "1/4 Building..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

echo "2/4 Linting..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Lint failed"
  exit 1
fi

echo "3/4 Unit tests..."
npm test
if [ $? -ne 0 ]; then
  echo "❌ Unit tests failed"
  exit 1
fi

echo "4/4 E2E tests..."
npm run test:e2e
if [ $? -ne 0 ]; then
  echo "❌ E2E tests failed"
  exit 1
fi

echo "✅ All validations passed"
```

**Standard validation order:**
1. **Build** - Catches syntax and type errors
2. **Lint** - Catches style and quality issues
3. **Unit tests** - Catches logic errors
4. **E2E tests** - Catches integration issues

**Benefits:**
- Fail fast (stop at first error)
- Clear feedback on what's broken
- Prevents merging broken code
- Maintains code quality

### 3. Categorize Errors by Type

When errors occur, group them by category for better diagnosis:

```markdown
### Error Categorization

**Build Errors (2):**
```
Error: Type 'string' is not assignable to type 'number'
  → components/ExpenseForm.tsx:42
Error: Cannot find module 'react-dom'
  → app/page.tsx:1
```

**Recommendations:**
1. Fix type errors in ExpenseForm.tsx
2. Run `npm install` to restore dependencies

---

**Lint Warnings (5):**
```
Warning: Unexpected any type
  → components/ExpenseForm.tsx:15
  → components/ExpenseForm.tsx:23
  → lib/storage.ts:8
```

**Recommendations:**
1. Run `npm run lint -- --fix` for auto-fixes
2. Manually replace `any` types with proper types

---

**Test Failures (1):**
```
FAILED components/ExpenseForm.test.tsx
  ✗ should validate amount field
    Expected: "Amount must be greater than 0"
    Received: undefined
```

**Recommendations:**
1. Run `npm run test:watch` for interactive debugging
2. Check validation logic in ExpenseForm component
```

**Error categories:**
- 🔴 Build errors (blocking)
- 🟠 Lint warnings (should fix)
- 🔴 Test failures (blocking)
- 🟡 Security warnings (evaluate)
- 🔵 Performance issues (optimize)

### 4. Provide Clear User Prompts

Always give users clear decision points:

```markdown
✅ All validations passed successfully.

Would you like to merge these changes back to main? (yes/no)

Options:
- **yes**: Merge worktree → main, then clean up worktree
- **no**: Keep worktree for manual review at ../worktree-[timestamp]

What would you like to do?
```

**Prompt best practices:**
- Present options clearly
- Explain what each choice does
- Provide paths for both success and failure
- Show worktree location for manual review
- Offer debugging commands when failures occur

**Example failure prompt:**
```markdown
❌ Validation failed. 3 test failures detected.

What would you like to do?

1. **debug**: Open interactive test debugger
   ```bash
   cd ../worktree-[timestamp]
   npm run test:watch
   ```

2. **keep**: Preserve worktree for manual fixes
   Location: ../worktree-[timestamp]

3. **cleanup**: Discard changes and remove worktree
   ```bash
   git worktree remove --force ../worktree-[timestamp]
   ```

Choose an option (1-3):
```

### 5. Use Parallel Execution for Scale

When processing >3 items, use parallel agents:

```markdown
### Determine Execution Strategy

```bash
ITEM_COUNT=$(echo "$ITEMS" | wc -w)

if [ $ITEM_COUNT -gt 3 ]; then
  echo "🚀 Processing $ITEM_COUNT items with parallel agents"

  # Split items into groups of 2 per agent
  # Example: 8 items → 4 agents with 2 items each

  # Launch Task tool with subagents
  # Each agent processes its subset independently
  # Collect results when all complete
else
  echo "📝 Processing $ITEM_COUNT items sequentially"

  # Process items one by one
  for item in $ITEMS; do
    # Process $item
  done
fi
```

**When to use parallel execution:**
- >3 components to test
- >3 packages to update
- >3 files to refactor
- >3 features to document

**Benefits:**
- Faster completion time
- Better resource utilization
- Scales to large operations

**Considerations:**
- Adds complexity
- Harder to debug
- May hit rate limits

### 6. Document Expected Outputs

Always specify what the skill should produce:

```markdown
### Final Report

Generate a comprehensive summary:

```
✅ Feature Addition Complete

📊 Summary:
- Component created: components/NewFeature.tsx
- Tests created: components/NewFeature.test.tsx
- Types added: types/index.ts (3 new types)
- Integration: app/page.tsx (component imported)

📝 Files Modified:
- components/NewFeature.tsx (120 lines)
- components/NewFeature.test.tsx (45 lines)
- types/index.ts (+15 lines)
- app/page.tsx (+8 lines)

✅ Validation Results:
- Build: ✓ Passed
- Lint: ✓ Passed
- Unit tests: ✓ Passed (8/8)
- E2E tests: ✓ Passed (3/3)

📁 Worktree: ../add-feature-worktree-20250106-143022

Ready to merge to main branch.
```

### 7. Include Cleanup Options

Always provide ways to clean up:

```markdown
### Cleanup Options

**If merged successfully:**

```bash
# Navigate back to original repo
cd /path/to/original/repo

# Remove worktree
git worktree remove ../skill-worktree-[timestamp]

# Delete branch
git branch -d skill-branch-[timestamp]

echo "✅ Cleanup complete"
```

**If keeping for review:**

```bash
# Worktree remains at: ../skill-worktree-[timestamp]

# To merge later:
cd /path/to/original/repo
git merge skill-branch-[timestamp]
git push origin main

# Then cleanup:
git worktree remove ../skill-worktree-[timestamp]
git branch -d skill-branch-[timestamp]
```

**If discarding changes:**

```bash
cd /path/to/original/repo

# Force remove worktree (discards all changes)
git worktree remove --force ../skill-worktree-[timestamp]

# Delete branch
git branch -D skill-branch-[timestamp]

echo "✅ Changes discarded, worktree removed"
```

---

## Advanced Patterns

Sophisticated techniques for complex skills.

### Parallel Agent Execution

Use the Task tool with subagents for large-scale operations:

```markdown
### 5. Execute Parallel Updates

When processing >3 packages, split work across multiple agents:

```typescript
// Conceptual approach (Claude will handle actual Task tool usage)

const packages = ['webpack', 'react-dom', 'express', 'typescript', 'jest'];
// 5 packages → 3 agents (2, 2, 1 packages each)

const groups = [
  ['webpack', 'react-dom'],
  ['express', 'typescript'],
  ['jest']
];

// Launch agents in parallel
for (const group of groups) {
  // Task tool creates agent for this group
  // Agent updates packages and validates
  // Reports results back
}

// Wait for all agents to complete
// Collect and merge results
```

**Real implementation:**

```bash
# Identify vulnerable packages
PACKAGES=$(npm audit --json | jq -r '.vulnerabilities | keys[]')
PACKAGE_COUNT=$(echo "$PACKAGES" | wc -l)

if [ $PACKAGE_COUNT -gt 3 ]; then
  echo "Using parallel agents for $PACKAGE_COUNT packages"

  # Claude will use Task tool with general-purpose subagents
  # Each agent handles a subset of packages
  # Parallel execution significantly faster than sequential
fi
```

**Benefits:**
- 3-5x faster for large operations
- Better resource utilization
- Scales to dozens of items

**Complexity:**
- More coordination needed
- Harder to debug failures
- Results need merging

### Multi-File Modifications with Validation

Coordinate changes across multiple files safely:

```markdown
### 3. Coordinate Multi-File Changes

When a feature requires changes across multiple files:

**Step 1: Plan Changes**

```bash
echo "Planning changes for feature: $ARGUMENTS"
echo ""
echo "Files to modify:"
echo "  1. components/$ARGUMENTS.tsx (new component)"
echo "  2. components/$ARGUMENTS.test.tsx (tests)"
echo "  3. types/index.ts (add types)"
echo "  4. app/page.tsx (integrate component)"
echo ""
```

**Step 2: Make Changes in Order**

```bash
# 1. Create types first (dependencies)
echo "Adding types..."
# Add types to types/index.ts

# 2. Create component (uses types)
echo "Creating component..."
# Create components/$ARGUMENTS.tsx

# 3. Create tests (tests component)
echo "Creating tests..."
# Create components/$ARGUMENTS.test.tsx

# 4. Integrate (uses component)
echo "Integrating into app..."
# Update app/page.tsx
```

**Step 3: Validate After Each Major Change**

```bash
# After types
npm run build || { echo "Type errors"; exit 1; }

# After component
npm run lint || { echo "Lint errors"; exit 1; }

# After tests
npm test || { echo "Test errors"; exit 1; }

# After integration
npm run test:e2e || { echo "E2E errors"; exit 1; }
```

**Key principles:**
1. Plan all changes upfront
2. Make changes in dependency order
3. Validate incrementally
4. Roll back on failure

### Integration with Existing Commands

Skills can reference or build upon existing commands:

```markdown
### 4. Leverage Existing Commands

This skill builds upon the existing `/e2e-test` command pattern.

**If e2e tests don't exist yet:**

```bash
# Use the existing command to create them
# Reference: .claude/commands/e2e-test.md

echo "Creating e2e tests first..."
# Follow e2e-test command process
# Then continue with feature implementation
```

**If e2e tests already exist:**

```bash
# Run existing tests
npm run test:e2e

# Add new tests for this feature
# Follow established patterns from existing tests
```

**Benefits:**
- Reuse proven patterns
- Maintain consistency
- Avoid duplication
- Build on existing infrastructure

### User Decision Prompts Throughout

For long-running skills, prompt at key decision points:

```markdown
### 6. Incremental User Decisions

**After Analysis Phase:**

```
📊 Analysis Complete

Found 12 vulnerable packages:
- 3 critical
- 5 high
- 4 moderate

Estimated time: 15-20 minutes
Estimated changes: ~30 package updates

Proceed with updates? (yes/no)
```

**After Update Phase:**

```
✅ All packages updated successfully

Running validation suite (build, lint, test, e2e)...
This may take 5-10 minutes.

Continue with validation? (yes/no/skip)
```

**After Validation:**

```
✅ All validations passed

Changes ready to merge:
- 30 packages updated
- 0 breaking changes
- All tests passing

Merge to main branch? (yes/no/review)
```

**When to prompt:**
- Before long-running operations
- After each major phase
- When user input affects next steps
- Before irreversible actions (merge, delete)

### Comprehensive Error Reporting

Provide detailed, actionable error reports:

```markdown
### 7. Generate Detailed Error Report

**Report Structure:**

```
❌ Security Audit Failed

📊 Summary:
- Packages scanned: 487
- Vulnerabilities found: 12
- Packages updated: 8
- Updates failed: 4

🔴 Failed Updates:

1. webpack@5.88.0 → 5.89.0
   Error: ERESOLVE dependency conflict
   Conflict: react@18.3.0 requires webpack@^5.90.0

   Resolution:
   - Update react first: npm install react@latest
   - Then retry webpack update

2. typescript@5.1.0 → 5.3.0
   Error: Breaking changes detected

   Test failures:
   - Type errors in 5 files
   - Changed signature for React.FC

   Resolution:
   - Review breaking changes: https://devblogs.microsoft.com/typescript/announcing-typescript-5-3/
   - Update component types manually
   - Run `npm test` to identify all type errors

3. jest@29.5.0 → 30.0.0
   Error: Major version change

   Breaking changes:
   - Default test environment changed
   - Timer mock API updated

   Resolution:
   - Review migration guide: https://jestjs.io/docs/upgrading-to-jest30
   - Update jest.config.js
   - Update test setup files

4. react-dom@18.2.0 → 18.3.1
   Error: Build failed after update

   Build error:
   - Module not found: '@types/react-dom'

   Resolution:
   - Install: npm install --save-dev @types/react-dom@latest
   - Retry build

📁 Worktree: ../audit-fix-worktree-20250106-143022

🛠️ Next Steps:

Option 1: Fix issues manually
  cd ../audit-fix-worktree-20250106-143022
  # Apply resolutions above
  npm run build && npm test

Option 2: Review and merge partial fixes
  # 8 packages were successfully updated
  # Merge those, address 4 failures separately

Option 3: Discard and retry
  git worktree remove --force ../audit-fix-worktree-20250106-143022
  # Start fresh with different approach

Choose an option:
```

**Report components:**
1. **Summary statistics** - Quick overview
2. **Detailed failures** - Each error with context
3. **Resolution steps** - How to fix each issue
4. **Links to docs** - External resources
5. **Next steps** - Clear action items
6. **Options** - Multiple paths forward

---

## Troubleshooting

Common issues and solutions when creating and using skills.

### Skill Not Recognized

**Symptom:** Claude Code doesn't recognize your skill when invoked.

**Possible causes:**

1. **Wrong file location**
   ```bash
   # ❌ Wrong
   skills/my-skill.md

   # ✅ Correct
   .claude/skills/my-skill.md
   ```

2. **Incorrect file name**
   ```bash
   # File name must match skill name in YAML

   # In my-skill.md:
   ---
   skill: my-skill  # Must match filename
   ---
   ```

3. **YAML syntax error**
   ```yaml
   # ❌ Wrong (missing closing ---)
   ---
   skill: my-skill
   description: Does something

   # ✅ Correct
   ---
   skill: my-skill
   description: Does something
   ---
   ```

**Solution:**
```bash
# Check file location
ls -la .claude/skills/my-skill.md

# Validate YAML syntax
head -n 5 .claude/skills/my-skill.md
# Should show front matter between --- markers

# Check for syntax errors
# YAML is whitespace-sensitive, use spaces not tabs
```

### Arguments Not Substituting

**Symptom:** `$ARGUMENTS` appears literally instead of being replaced.

**Possible causes:**

1. **Missing from description**
   ```yaml
   # ❌ Wrong (no $ARGUMENTS)
   description: Add unit tests for component

   # ✅ Correct
   description: Add unit tests for component: $ARGUMENTS
   ```

2. **Wrong variable name**
   ```yaml
   # ❌ Wrong
   description: Add tests: $ARGS

   # ✅ Correct
   description: Add tests: $ARGUMENTS
   ```

3. **Quoting issues**
   ```bash
   # In bash commands, quote properly

   # ❌ May not expand
   echo $ARGUMENTS

   # ✅ Properly quoted
   echo "$ARGUMENTS"
   ```

**Solution:**
```yaml
# Always include $ARGUMENTS in description
---
skill: my-skill
description: Brief description: $ARGUMENTS
---

# Use $ARGUMENTS in content
# Add tests for: $ARGUMENTS
```

### Permission Errors

**Symptom:** Skill execution fails with permission denied errors.

**Possible causes:**

1. **Tool not allowed in settings**

   Check `.claude/settings.json`:
   ```json
   {
     "allowedTools": [
       "Read",
       "Write",
       "Edit",
       "Glob",
       "Grep",
       "Bash",
       "Task"
     ]
   }
   ```

2. **Denied paths**

   Check denied patterns:
   ```json
   {
     "deniedPaths": [
       "**/.env",
       "**/*.key",
       "**/secrets/**"
     ]
   }
   ```

3. **Bash command restrictions**

   Some destructive commands may be blocked:
   ```json
   {
     "deniedBashCommands": [
       "rm -rf",
       "sudo",
       "chmod 777"
     ]
   }
   ```

**Solution:**

Review and update `.claude/settings.json`:

```json
{
  "allowedTools": [
    "Read",
    "Write",
    "Edit",
    "Glob",
    "Grep",
    "Bash",
    "Task",
    "TodoWrite"
  ],
  "deniedPaths": [
    "**/.env",
    "**/node_modules/**"
  ]
}
```

### YAML Formatting Issues

**Symptom:** Skill fails to parse or behaves unexpectedly.

**Common YAML mistakes:**

1. **Tabs instead of spaces**
   ```yaml
   # ❌ Wrong (uses tabs)
   ---
   skill:→my-skill
   description:→Does something
   ---

   # ✅ Correct (uses spaces)
   ---
   skill: my-skill
   description: Does something
   ---
   ```

2. **Missing spaces after colons**
   ```yaml
   # ❌ Wrong
   skill:my-skill

   # ✅ Correct
   skill: my-skill
   ```

3. **Incorrect quotes**
   ```yaml
   # ❌ Wrong (smart quotes)
   description: "Add tests: $ARGUMENTS"

   # ✅ Correct (straight quotes)
   description: "Add tests: $ARGUMENTS"
   ```

4. **Missing front matter delimiters**
   ```yaml
   # ❌ Wrong (missing closing ---)
   ---
   skill: my-skill
   description: Does something

   # Rest of file

   # ✅ Correct
   ---
   skill: my-skill
   description: Does something
   ---

   # Rest of file
   ```

**Solution:**

Use a YAML validator:
```bash
# Install yamllint
npm install -g yaml-lint

# Validate your skill file
yamllint .claude/skills/my-skill.md
```

Or check online: [YAML Lint](http://www.yamllint.com/)

### Skill Works But Produces Wrong Results

**Symptom:** Skill executes but doesn't do what you expected.

**Debugging steps:**

1. **Add echo statements**
   ```bash
   echo "DEBUG: ARGUMENTS = $ARGUMENTS"
   echo "DEBUG: Processing component: $COMPONENT_NAME"
   echo "DEBUG: Test file path: $TEST_FILE_PATH"
   ```

2. **Test commands manually**
   ```bash
   # Extract commands from skill
   # Run them step by step in terminal
   # Verify each step works as expected
   ```

3. **Check file paths**
   ```bash
   # Print working directory
   pwd

   # List expected files
   ls -la components/

   # Verify files exist before operating on them
   test -f "components/$ARGUMENTS.tsx" && echo "Found" || echo "Not found"
   ```

4. **Validate assumptions**
   ```bash
   # Check if npm scripts exist
   npm run --list

   # Verify dependencies installed
   npm list @testing-library/react
   ```

**Solution:**
- Add comprehensive error checking
- Validate inputs before processing
- Print debug information
- Test each step independently

### Worktree Errors

**Symptom:** Git worktree commands fail.

**Common issues:**

1. **Worktree already exists**
   ```bash
   # Error: worktree path already exists

   # Solution: Use unique timestamp
   TIMESTAMP=$(date +%Y%m%d-%H%M%S)
   WORKTREE_PATH="../skill-worktree-$TIMESTAMP"
   ```

2. **Branch already exists**
   ```bash
   # Error: branch already exists

   # Solution: Include timestamp in branch name
   BRANCH_NAME="skill-branch-$TIMESTAMP"
   git worktree add "$WORKTREE_PATH" -b "$BRANCH_NAME"
   ```

3. **Parent directory doesn't exist**
   ```bash
   # Error: cannot create worktree

   # Solution: Ensure parent directory exists
   mkdir -p "$(dirname "$WORKTREE_PATH")"
   git worktree add "$WORKTREE_PATH" -b "$BRANCH_NAME"
   ```

4. **Cannot remove worktree**
   ```bash
   # Error: worktree contains modified files

   # Solution: Use --force to remove anyway
   git worktree remove --force "$WORKTREE_PATH"
   ```

**Prevention:**
```bash
# Robust worktree creation
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
WORKTREE_PATH="../skill-name-worktree-$TIMESTAMP"
BRANCH_NAME="skill-name-$TIMESTAMP"

# Ensure unique names
while [ -d "$WORKTREE_PATH" ]; do
  sleep 1
  TIMESTAMP=$(date +%Y%m%d-%H%M%S)
  WORKTREE_PATH="../skill-name-worktree-$TIMESTAMP"
done

# Create worktree
git worktree add "$WORKTREE_PATH" -b "$BRANCH_NAME"
```

---

## Additional Resources

- **Claude Code Commands:** [.claude/commands/README.md](.claude/commands/README.md) - 7 existing commands demonstrating proven patterns
- **TARGETED Framework:** [module-4.md](module-4.md) - Framework for writing effective skills and commands
- **Project Documentation:** [CLAUDE.md](CLAUDE.md) - Project-specific context and patterns
- **Expense Tracker App:** [expense-tracker-ai/](expense-tracker-ai/) - The application used in all examples

---

## Summary

You now have a comprehensive understanding of Claude skills:

1. **What they are** - Structured, reusable workflows with YAML metadata
2. **How to create them** - File format, front matter, process steps
3. **When to use them** - Repetitive tasks, complex workflows, safety-critical operations
4. **Best practices** - Worktree isolation, validation chains, error categorization
5. **Advanced patterns** - Parallel execution, multi-file operations, comprehensive reporting

Start with the simple `add-test.md` example, progress to `add-feature.md`, and eventually tackle complex skills like `audit-and-fix.md`.

Skills make your development workflow more consistent, safe, and efficient. Happy automating!
