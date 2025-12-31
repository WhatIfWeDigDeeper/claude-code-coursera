# Writing Effective Prompts for Claude Code

When working with Claude Code, well-structured prompts lead to better results in fewer iterations. This guide provides practical strategies for crafting effective prompts.

## The Single Composite Prompt Pattern

**DO**: Combine related tasks into a single prompt when they naturally belong together.

**Example - Creating a Command with Documentation**:
```markdown
Create `/command-name` command and documentation:

Files to create/update:
1. .claude/commands/command-name.md - full command implementation
2. .claude/commands/README.md - add entry following existing format

Requirements:
[Detailed specifications here]

Output both files in one response.
```

**Why This Works**:
- ✅ Completes related work in one conversation turn
- ✅ Ensures consistency between implementation and documentation
- ✅ Reduces context switching and back-and-forth
- ✅ Faster overall completion time

## Essential Prompt Components

Every effective prompt should include:

### 1. Clear Deliverables
State exactly what files/outputs you expect:
```markdown
## Deliverables
1. Command file: `.claude/commands/security-audit.md`
2. Documentation: Update `.claude/commands/README.md`
3. Output both files in a single response
```

### 2. Structured Requirements
Organize requirements into logical sections:
```markdown
## Command Requirements

### Core Workflow
1. Step one
2. Step two
3. Step three

### Input Handling
- Pattern 1: example
- Pattern 2: example

### Error Handling
- Error type → recommendation
```

### 3. Concrete Examples
Show what good output looks like:
```markdown
### Example Usage
/command arg1 arg2       # Description of what this does

### Output Example
```
Expected output format here
```
```

### 4. Success Criteria
Define how we know the task is complete:
```markdown
### Success Criteria
- ✅ All files created/updated
- ✅ Follows existing patterns
- ✅ Handles edge cases
- ✅ Includes error handling
```

### 5. Format References
Point to existing patterns to follow:
```markdown
Follow the format in .claude/commands/README.md for documentation entries.
```

## Advanced Patterns

### The Cascade Pattern
For tasks with dependencies, explicitly state the order:
```markdown
Deliverables (in order):
1. Create .claude/commands/npm-latest.md with full implementation
2. AFTER creating the command, update .claude/commands/README.md:
   - Read the existing README format
   - Add npm-latest entry following the same structure
   - Place it in alphabetical order
```

### The Template Pattern
Provide exact structure for outputs:
```markdown
## Report Format

**File**: `docs/dev/[feature-name]-security-audit.md`

**Required Sections**:
```markdown
# [Feature Name] Security Audit

## Executive Summary
[Content here]

## Vulnerabilities
[Content here]
```
```

## Prompt Design Principles

### ✅ DO:
- **State all deliverables upfront** - List every file/output needed
- **Reference existing patterns** - "Follow the format in X file"
- **Include success criteria** - Define what "complete" means
- **Provide concrete examples** - Show, don't just describe
- **End with explicit action** - "Create both files now" or "Output in one response"
- **Structure with headers** - Use markdown sections for clarity
- **Specify file paths** - Use exact paths, not relative references
- **Define edge cases** - List scenarios to handle

### ❌ DON'T:
- Assume Claude will infer related tasks (like documentation)
- Split naturally related tasks across multiple prompts
- Leave format/structure ambiguous
- Forget to specify file paths
- Use vague requirements like "make it good"
- Skip providing examples
- Omit error handling requirements

## Effective Prompt Template

Use this structure for complex tasks:

```markdown
# Task: [Clear, concise task name]

## Deliverables
1. [File/output 1 with exact path]
2. [File/output 2 with exact path]
3. [Explicit instruction: "Output all in one response"]

## Requirements

### [Requirement Category 1]
- Specific requirement
- Specific requirement

### [Requirement Category 2]
- Specific requirement
- Specific requirement

## Format/Structure
[Exact template or reference to existing pattern]

## Examples
```
[Concrete example of input/output]
```

## Success Criteria
- ✅ [Measurable criterion]
- ✅ [Measurable criterion]

## Edge Cases
1. [Scenario] → [Expected behavior]
2. [Scenario] → [Expected behavior]

[Explicit final instruction: "Please create all deliverables now"]
```

## Real-World Example

**Less Effective**:
```
Create a command to update npm packages.
```

**More Effective**:
```markdown
Create `/npm-latest` command and documentation:

Files to create/update:
1. .claude/commands/npm-latest.md - full implementation
2. .claude/commands/README.md - add entry following existing format

Requirements:
- Create git worktree for isolation
- Support specific packages, all packages (.), or globs (*)
- Prefer LTS versions when available
- Run npm audit
- Validate with build, lint, test
- Provide error recovery recommendations

Example Usage:
/npm-latest jest @types/jest          # specific packages
/npm-latest .                         # all packages
/npm-latest @testing-library/* jest*  # glob patterns

Success Criteria:
✅ Isolated testing in worktree
✅ Full validation suite runs
✅ Clear error categorization
✅ Documentation follows existing README format

Output both files in one response.
```

## Common Improvements

| Weak Prompt | Strong Prompt |
|-------------|---------------|
| "Document this feature" | "Create documentation at docs/dev/[feature]-implementation.md following the format in docs/dev/dark-mode-implementation.md" |
| "Fix security issues" | "Run security audit, generate report at docs/dev/security-audit.md with sections: Vulnerabilities, Severity, Recommendations, CLAUDE.md Updates" |
| "Update packages" | "Update [package list] to latest LTS versions, create worktree, run full test suite, report any breaking changes" |
| "Make it better" | "Improve error handling by: 1) Adding input validation, 2) Providing specific error messages, 3) Offering recovery options" |

## Measuring Prompt Effectiveness

A good prompt should:
- ✅ Get complete results in 1-2 turns (not 5-6)
- ✅ Require minimal clarification questions
- ✅ Produce outputs that need few revisions
- ✅ Result in consistent formatting/structure
- ✅ Handle edge cases without follow-up prompts

## Iterative Refinement

If you find yourself making multiple follow-up requests:
1. **Stop and analyze**: What was missing from the original prompt?
2. **Document the pattern**: Add to this guide for future reference
3. **Refine the template**: Update your prompt structure

## Project-Specific Prompt Guidelines

For this repository (Coursera Claude Code course):

**When creating commands** (`.claude/commands/*.md`):
- Always update `.claude/commands/README.md` in the same prompt
- Reference the TARGETED framework from Module 4
- Include example usage and output format
- Specify worktree usage for isolation

**When adding features**:
- Specify which files to modify (see File Locations Reference in CLAUDE.md)
- Include test requirements
- Reference existing patterns (dark mode, export, etc.)
- State build/lint/test validation requirements

**When updating documentation**:
- Specify exact file paths in `expense-tracker-ai/docs/`
- Follow existing format (reference a similar doc file)
- Include cross-references to related docs
- Update CLAUDE.md if adding new patterns

## Related Resources

- [CLAUDE.md](CLAUDE.md) - Project-specific instructions for Claude Code
- [Module 4 Notes](module-4.md) - Context about commands and CLAUDE.md
- [.claude/commands/](/.claude/commands/) - Example command implementations
