# Markdown Documentation Guidelines

> **Note to Claude**: Only read this file when working with .md files

When creating or editing markdown documentation files (*.md), follow these formatting rules to ensure proper rendering:

## Code Block Formatting

**CRITICAL**: Never place consecutive code block markers (` ``` `) on adjacent lines without content between them.

**Wrong:**
```markdown
echo "Example"
```
```

Some text here
```

**Correct:**
```markdown
echo "Example"
```

Some text here
```

## Nested Code Blocks

When showing code block examples within markdown, use different delimiters or proper escaping:

**Option 1 - Use 4 backticks for outer block:**
````markdown
Here's how to create a bash code block:

```bash
echo "Hello World"
```
````

**Option 2 - Use indentation for inner blocks:**
```markdown
Example code block:

    ```bash
    echo "Hello World"
    ```
```

**Option 3 - Show the pattern without actual nesting:**
```markdown
Create a code block like this:

[triple-backtick]bash
echo "Hello World"
[triple-backtick]
```

## Documentation Validation

Before committing markdown files:

1. **Check for duplicate code blocks:**
   ```bash
   awk '/^```$/{if(prev=="```")print NR-1 "-" NR; prev="```"; next} {prev=$0}' file.md
   ```

2. **Preview the markdown:**
   - Use VSCode preview (Cmd+Shift+V)
   - Use a markdown linter
   - Check rendering on GitHub

3. **Common issues to avoid:**
   - ❌ Consecutive ` ``` ` markers
   - ❌ Unclosed code blocks
   - ❌ Mismatched language identifiers
   - ❌ Triple backticks inside code examples without escaping

## Example: Documenting Skills/Commands

When documenting skills or commands that contain code examples:

**Template:**
```markdown
## Skill Name

Description of the skill.

### Process Steps

#### 1. First Step

Explanation of the step.

[Use 4 backticks here if showing code block examples]
````markdown
### Example Output

```bash
echo "Actual bash code here"
```
````

**Key points:**
- One blank line between code block and following text
- Never stack closing ` ``` ` markers
- Use proper nesting with 4 backticks when needed
```

## Automated Validation

**Recommended: Use the validate-markdown skill**

```bash
# Validate all markdown files in repository
/validate-markdown .

# Validate specific file
/validate-markdown skills.md

# Validate directory
/validate-markdown .claude/skills/
```

The skill provides:
- ✅ Duplicate code block detection
- ✅ Unclosed code block detection
- ✅ Common issues check (tabs, long lines, trailing spaces)
- ✅ Auto-fix capability with user confirmation
- ✅ Comprehensive validation reports

See [.claude/skills/validate-markdown.md](../.claude/skills/validate-markdown.md) for full documentation.

**Alternative: Standalone script**

```bash
# Run validation script directly
bash .claude/scripts/validate-markdown.sh
```

**Integrate with pre-commit:** See validate-markdown skill documentation for pre-commit hook and GitHub Actions examples.
