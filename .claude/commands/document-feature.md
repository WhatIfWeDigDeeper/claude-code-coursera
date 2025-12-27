# Document Feature Command

Generate comprehensive documentation for a new feature in both developer and user-friendly formats.

**Feature Name**: $ARGUMENTS

## Documentation Generation Process

### Phase 1: Feature Analysis

1. **Identify Feature Type**
   - Analyze the codebase to determine if the feature is:
     - Frontend only (components, UI)
     - Backend only (API, services, data processing)
     - Full-stack (both frontend and backend)
   - Search for related files in:
     - `/components/` - React components
     - `/app/` - Next.js pages and API routes
     - `/lib/` - Utility functions and business logic
     - `/types/` - TypeScript type definitions
     - `/contexts/` - React context providers

2. **Gather Technical Context**
   - Find all files related to the feature
   - Identify:
     - Main component/function names
     - Type definitions used
     - Dependencies and imports
     - API endpoints (if applicable)
     - State management approach
     - Data flow and architecture

3. **Analyze User Interaction Flow**
   - Map out how users interact with the feature
   - Identify UI elements and their locations
   - Determine the step-by-step user journey
   - Note any prerequisites or setup required

### Phase 2: Developer Documentation

Create a technical documentation file at:
**`expense-tracker-ai/docs/dev/$ARGUMENTS-implementation.md`**

The developer documentation should include:

#### 1. Overview Section
```markdown
# [Feature Name] Implementation

## Overview
Brief technical summary of the feature, its purpose, and how it fits into the application architecture.

## Quick Reference
- **Feature Type**: [Frontend/Backend/Full-stack]
- **Main Files**: List of primary files
- **Dependencies**: External libraries used
- **Related Features**: Links to related documentation
```

#### 2. Architecture Section
```markdown
## Architecture

### Component Structure
[For frontend features]
- Describe the component hierarchy
- Show parent-child relationships
- Explain prop flow and state management

### Data Flow
[Diagram or description of how data flows through the feature]
\`\`\`
User Action
    ↓
Component/Handler
    ↓
State Management
    ↓
Storage/API
\`\`\`

### Type System
- List all TypeScript types/interfaces
- Explain their purpose and relationships
- Show type definitions with comments
```

#### 3. Implementation Details
```markdown
## Implementation Details

### Core Functionality
[File path and line references]
- Explain the main logic
- Highlight important algorithms or patterns
- Note any performance considerations

### State Management
- How state is stored and updated
- Which components own which state
- Side effects and lifecycle hooks

### Event Handling
- User interactions and their handlers
- Event flow and propagation
- Validation and error handling
```

#### 4. Code Examples
```markdown
## Code Examples

### Basic Usage
\`\`\`typescript
// Show how to use the feature programmatically
\`\`\`

### Advanced Patterns
\`\`\`typescript
// Show complex scenarios or customization
\`\`\`

### Common Gotchas
- List potential issues developers might encounter
- Provide solutions or workarounds
```

#### 5. Testing and Quality
```markdown
## Testing

### Test Coverage
- Unit tests location and coverage
- Integration test scenarios
- E2E test flows

### Manual Testing Checklist
- [ ] Test case 1
- [ ] Test case 2
- [ ] Edge case testing

## Performance Considerations
- Optimization strategies used
- Potential bottlenecks
- Benchmarking results (if applicable)
```

#### 6. Integration Guide
```markdown
## Integration Guide

### Adding to Existing Code
\`\`\`typescript
// Example of integrating the feature
\`\`\`

### Configuration Options
- Available settings and props
- Default values
- Customization examples

### Dependencies
- Required packages and versions
- Peer dependencies
- Optional dependencies for enhanced features
```

#### 7. API Documentation (if applicable)
```markdown
## API Reference

### Endpoints
\`\`\`
POST /api/[endpoint]
GET /api/[endpoint]
\`\`\`

### Request/Response Format
\`\`\`json
{
  "example": "request"
}
\`\`\`

### Error Handling
- Error codes and messages
- Validation requirements
```

#### 8. Maintenance and Future Work
```markdown
## Maintenance

### Known Issues
- List any known limitations or bugs
- Planned fixes or improvements

### Future Enhancements
- [ ] Potential improvement 1
- [ ] Potential improvement 2

### Migration Notes
- Breaking changes (if any)
- Upgrade path from previous versions
```

### Phase 3: User Documentation

Create a user-friendly guide at:
**`expense-tracker-ai/docs/user/how-to-$ARGUMENTS.md`**

The user documentation should include:

#### 1. User-Friendly Overview
```markdown
# How to [Use Feature Name]

## What is [Feature Name]?
Simple, jargon-free explanation of what the feature does and why it's useful.

## Key Benefits
- ✅ Benefit 1
- ✅ Benefit 2
- ✅ Benefit 3
```

#### 2. Getting Started
```markdown
## Getting Started

### Prerequisites
What users need before they can use this feature:
- Required setup steps
- Permissions needed
- Browser/device requirements

### Accessing the Feature
1. Step-by-step instructions to find the feature
2. Include navigation path
3. Mention visual landmarks

[SCREENSHOT PLACEHOLDER: Main feature location]
![Feature Location](../screenshots/[feature-name]-location.png)
*Screenshot showing where to find the [feature name] in the app*
```

#### 3. Step-by-Step Instructions
```markdown
## How to Use [Feature Name]

### Basic Usage

#### Step 1: [Action Name]
Detailed explanation of the first step

[SCREENSHOT PLACEHOLDER: Step 1]
![Step 1](../screenshots/[feature-name]-step-1.png)
*Screenshot showing [specific action]*

**What to do:**
1. Click/tap on [element]
2. Enter [information]
3. Select [option]

**Tips:**
- Helpful tip related to this step
- Common mistake to avoid

#### Step 2: [Action Name]
Continue with clear, numbered steps...

[SCREENSHOT PLACEHOLDER: Step 2]
![Step 2](../screenshots/[feature-name]-step-2.png)

### Advanced Features

[If applicable, show power-user features with the same step-by-step format]
```

#### 4. Common Scenarios
```markdown
## Common Use Cases

### Scenario 1: [Common Task]
Walking through a real-world example

**Goal**: What the user wants to accomplish

**Steps**:
1. Do this
2. Then this
3. Finally this

**Result**: What they should see

[SCREENSHOT PLACEHOLDER: Result]
![Result](../screenshots/[feature-name]-result.png)

### Scenario 2: [Another Common Task]
[Repeat format]
```

#### 5. Tips and Best Practices
```markdown
## Tips and Best Practices

### Do's ✅
- Recommended approach 1
- Recommended approach 2
- Best practice 3

### Don'ts ❌
- Common mistake 1
- What to avoid 2
- Anti-pattern 3

### Pro Tips 💡
- Expert tip 1
- Time-saving shortcut 2
- Hidden feature 3
```

#### 6. Troubleshooting
```markdown
## Troubleshooting

### Problem: [Common Issue]
**Symptoms**: What the user sees

**Solution**:
1. Try this first
2. If that doesn't work, try this
3. Last resort option

**Why it happens**: Simple explanation

---

### Problem: [Another Issue]
[Repeat format for 3-5 common problems]
```

#### 7. FAQ
```markdown
## Frequently Asked Questions

### Can I [common question]?
Answer in simple terms

### How do I [another question]?
Step-by-step answer

### What happens if [edge case]?
Clear explanation

### Is it possible to [feature request]?
Honest answer about capabilities or future plans
```

#### 8. Related Features
```markdown
## Related Features

You might also be interested in:
- [Related Feature 1](./how-to-[related-feature-1].md) - Brief description
- [Related Feature 2](./how-to-[related-feature-2].md) - Brief description

## Need More Help?

- [Developer Documentation]($ARGUMENTS-implementation.md) - Technical details
- [Main User Guide](./getting-started.md) - General app usage
- Report issues on GitHub
```

### Phase 4: Screenshot Placeholders

Generate a list of required screenshots for the user documentation:

Create file: **`expense-tracker-ai/docs/screenshots/$ARGUMENTS-screenshots-needed.txt`**

```
Screenshots needed for [Feature Name] user documentation:

1. [feature-name]-location.png
   - Show: Where to find the feature in the main app interface
   - Highlight: Navigation path or button to access feature

2. [feature-name]-step-1.png
   - Show: Initial state or first action
   - Highlight: Specific UI element for step 1

3. [feature-name]-step-2.png
   - Show: Second step in the process
   - Highlight: What changed and next action

4. [feature-name]-result.png
   - Show: Final result after completing the feature
   - Highlight: Success indicators or new state

5. [feature-name]-settings.png (if applicable)
   - Show: Configuration or customization options
   - Highlight: Important settings

Add additional screenshots as needed for:
- Error states
- Different modes (dark/light theme)
- Mobile vs desktop views
- Advanced features
```

### Phase 5: Cross-References

1. **Update Main Documentation Index**
   - Add links to both new documentation files
   - Categorize appropriately (Frontend/Backend/Full-stack)

2. **Link Related Docs**
   - Add cross-references to related feature documentation
   - Update CLAUDE.md if the feature introduces new patterns or conventions

3. **Add to README Navigation** (if applicable)
   - Include in table of contents
   - Add to quick reference sections

## Output Checklist

After generating documentation, verify:

- [ ] Developer documentation created at correct path
- [ ] User documentation created at correct path
- [ ] Screenshot placeholder list generated
- [ ] Both docs follow consistent formatting
- [ ] Code examples are syntactically correct
- [ ] All file paths and links are accurate
- [ ] Feature type (frontend/backend/full-stack) clearly identified
- [ ] Cross-references added to related documentation
- [ ] Technical accuracy verified against actual code
- [ ] User instructions are clear and jargon-free
- [ ] Troubleshooting covers common issues
- [ ] Both docs reference each other appropriately

## Template Naming Conventions

**Developer Docs**: `[feature-name]-implementation.md`
- Use kebab-case
- End with `-implementation`
- Examples: `dark-mode-implementation.md`, `export-modal-implementation.md`

**User Docs**: `how-to-[feature-name].md`
- Start with `how-to-`
- Use kebab-case
- Examples: `how-to-dark-mode.md`, `how-to-export-data.md`

**Screenshots**: `[feature-name]-[context].png`
- Use kebab-case
- Descriptive context
- Examples: `dark-mode-toggle.png`, `export-modal-settings.png`

## Special Considerations

### For Frontend Features
- Emphasize component hierarchy and props
- Include UI/UX considerations
- Show responsive behavior
- Document accessibility features
- Include dark mode variants in screenshots

### For Backend Features
- Focus on API contracts and data models
- Document error handling thoroughly
- Include performance metrics
- Show authentication/authorization flow
- Provide curl or API client examples

### For Full-Stack Features
- Clearly separate frontend and backend sections
- Show end-to-end data flow
- Document both client and server validation
- Include integration testing scenarios
- Explain state synchronization

## Quality Standards

**Developer Documentation Should**:
- Be technically accurate and detailed
- Include actual code references with file paths and line numbers
- Use proper terminology and conventions
- Provide enough context for a new developer to understand and modify the code
- Include diagrams or flow charts for complex logic

**User Documentation Should**:
- Be written for non-technical users
- Use simple language without jargon
- Include visual aids (screenshots/diagrams)
- Provide clear, actionable steps
- Anticipate and address common questions
- Be scannable with clear headings and formatting

## Examples to Follow

Study these existing documentation files for style and structure:
- [DARK_MODE_GUIDE.md](../expense-tracker-ai/DARK_MODE_GUIDE.md) - Good example of combined user/dev docs
- [CLAUDE.md](../CLAUDE.md) - Example of technical reference documentation
- [code-analysis.md](../code-analysis.md) - Example of comparative analysis

## Execution Instructions

When this command is run with a feature name:

1. **Analyze** the codebase to find all relevant files
2. **Create** the `docs/dev/` and `docs/user/` directories if they don't exist
3. **Generate** both documentation files following the templates above
4. **Create** the screenshot placeholder list
5. **Provide** a summary showing:
   - Files created
   - Feature type identified
   - Key files analyzed
   - Number of screenshots needed
   - Next steps for the user

Remember: Documentation should tell both the "what" and the "why" - what the code does and why it was built this way.
