# Claude Code Commands

This directory contains reusable commands for common development tasks in this project.

## Available Commands

### `/document-feature [feature-name]`

Automatically generates comprehensive documentation for a feature in both technical (developer) and user-friendly formats.

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
