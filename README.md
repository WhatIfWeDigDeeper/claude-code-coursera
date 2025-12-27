# claude-code-coursera

[Notes for Coursera course "Claude Code: Software Engineering with Generative AI Agents"](https://www.coursera.org/learn/claude-code/home/welcome)

- [Module 1 Scaling Up Software Engineering with Claude Code \& Generative AI](#module-1-scaling-up-software-engineering-with-claude-code--generative-ai)
  - [1000X Improvement in Software Engineering Productivity with Big Prompts](#1000x-improvement-in-software-engineering-productivity-with-big-prompts)
  - [Exercise: Getting Started with Claude Code \& Building Your First Application](#exercise-getting-started-with-claude-code--building-your-first-application)
- [Module 2 Leveraging the Software Engineering Advantages of Claude Code](#module-2-leveraging-the-software-engineering-advantages-of-claude-code)
  - [AI Labor: Claude Code is an AI Development Team](#ai-labor-claude-code-is-an-ai-development-team)
  - [The Best of N Pattern: Leverage AI Labor Cost Advantages](#the-best-of-n-pattern-leverage-ai-labor-cost-advantages)
    - [Sample alternative implementation](#sample-alternative-implementation)
- [Module 3 Generation AI, Claude Code, \& Code Quality](#module-3-generation-ai-claude-code--code-quality)
  - [Can AI Judge Code Quality?](#can-ai-judge-code-quality)
  - [Why Code Evaluation Matters for AI Development](#why-code-evaluation-matters-for-ai-development)
    - [Sample Prompt for evaluating three different implementations](#sample-prompt-for-evaluating-three-different-implementations)
  - [Does AI Labor Understand Design Principles?](#does-ai-labor-understand-design-principles)
  - [Chat, Craft, Scale: Spend More Time Designing \& Innovating](#chat-craft-scale-spend-more-time-designing--innovating)
    - [Chat - thinking about the requirements](#chat---thinking-about-the-requirements)
  - [Craft: Constraints \& Prompts for Claude Code](#craft-constraints--prompts-for-claude-code)
- [Module 4 Building Process \& Context in Claude Code](#module-4-building-process--context-in-claude-code)
  - [Global Persistent Context: `CLAUDE.md`](#global-persistent-context-claudemd)
  - [Writing CLAUDE.md Files](#writing-claudemd-files)
  - [Reusable Targeted Context \& Process: Claude Code Commands](#reusable-targeted-context--process-claude-code-commands)
  - [Creating Claude Commands](#creating-claude-commands)


## Module 1 Scaling Up Software Engineering with Claude Code & Generative AI

Like having a team of 100 or 1,000 developers

> Write a complete Nextjs + NextUI web application for tracking expenses. When you are done, start it for me to test.

### 1000X Improvement in Software Engineering Productivity with Big Prompts

Stop micromanaging AI by using it to write functions and individual files. By taking the human out of the detailed loop, AI is able to scale up. Give instructions like given to a CPU.

Imagine your manager sitting down and telling you I want you to create a `component/expense_list.tsx`.

> Act like the typical user of this application, then create different ways of sorting, filtering, and displaying the expenses.

Doing the equivalent of zooming out. Human doing higher order critical thinking.

With the model of giving individual tasks like create a function in this file, then "you are the bottleneck. You limit the scalability."

> This will require 100s or more iterations and inputs from you to build an application.

![Create Application](imgs/create-application.jpg)

### Exercise: Getting Started with Claude Code & Building Your First Application

```text
I want you to create a modern, professional NextJS expense tracking application.
Here's my vision:

APPLICATION OVERVIEW:
Build a complete expense tracking web app that helps users manage their personal finances.
The app should feel modern, intuitive, and professional.

CORE FEATURES:
- Add expenses with date, amount, category, and description
- View expenses in a clean, organized list
- Filter expenses by date range and category
- Dashboard with spending summaries and basic analytics
- Categories: Food, Transportation, Entertainment, Shopping, Bills, Other
- Data persistence using localStorage for this demo

TECHNICAL REQUIREMENTS:
- NextJS 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling with a modern, clean design
- Responsive design that works on desktop and mobile
- Use React hooks for state management
- Form validation for expense inputs
- Date picker for expense dates
- Currency formatting for amounts

DESIGN REQUIREMENTS:
- Clean, modern interface with a professional color scheme
- Intuitive navigation and user experience
- Visual feedback for user actions
- Loading states and error handling
- Mobile-responsive design

SPECIFIC FUNCTIONALITY:
- Expense form with validation
- Expense list with search and filter capabilities
- Summary cards showing total spending, monthly spending, top categories
- Basic charts or visual representations of spending patterns
- Export functionality (at least CSV)
- Delete and edit existing expenses

Please create this as a complete, production-ready application.
Set up the project structure, implement all features,
and make sure everything works together seamlessly.
Focus on creating something that looks professional
and that I could actually use to track my expenses.

When you're done, provide instructions on
how to run the application and test all features.
```

"AI as labor, Not Just a Tool"

## Module 2 Leveraging the Software Engineering Advantages of Claude Code

"AI is (Software Engineering) Labor"

large Prompts allow AI to scale

### AI Labor: Claude Code is an AI Development Team

AI leader writes prompts like this

```text
Look at this list of expenses.
How could we make it incredibly bold, beautiful, and modern?
Blow my mind with the elegance, simplicity,
and beauty of your user interface design changes.
```

"You challenge the AI. You give it big tasks."

```text
The user interface isn't consistent.
Could you make everything match the style of the list of expenses?
```

Tell it to figure it out. Give it bold challenges.

"Create something amazing to solve that problem for me."

### The Best of N Pattern: Leverage AI Labor Cost Advantages

A human is still important part of the architecture and design.

"Software is so labor intensive" that it limits how many options and designs to explore because it's so expensive to do just a single one.

"We want to use the scalability, speed, and ego-less nature of AI Labor to do more than before at a higher level of quality"

```text
that was awesome.
Can you go back to the prior branch and repeat this process,
but solve the underlying problem in a different and wildly valuable way?
Surprise me with your creativity.
```

- Explore different solutions. "Implement 10 versions of that application or 10 versions of that feature". It's not biased by what it did before.Can cherry pick from different branch or add a feature it thought of.
- **AI Labor is cheap** and it doesn't get upset
- Explore and think more about how to create amazing software products.
- Best of 3, 5, 10...N

"Don't have it solve the problem once." A human evaluates all of them and decides what they like best or combine features from some of them. Or provide a rubric

> Or tell it, here's my rubric that I want you to go ahead and pre-evaluate all of them with, and then show that to me so that I can then narrow my focus down to the top three or four that I want to go and spend my time evaluating

AI labor teams as search parties to discover different solutions.

> What is Best-of-N?
The Best-of-N pattern leverages a unique advantage of AI labor: it's fast, cheap, and egoless. Unlike human developers, Claude doesn't get frustrated when you ask it to throw away work and try again.

Traditional Development:

- Implement one solution
- Stick with it (too expensive to rewrite)
- Hope it's the best approach

AI Labor Development:

- Implement 3-5 different solutions
- Compare and evaluate all of them
- Choose the best or combine elements
- Total time: Still faster than one traditional implementation

Why This Works

- AI is fast: What takes days for humans takes minutes for AI
- AI is cheap: Even premium AI usage costs less than developer time
- AI is creative: Each attempt can explore radically different approaches
- AI is egoless: No hurt feelings when you discard its work

#### Sample alternative implementation

```text
I want you implement the existing ("Export CSV" button)
data export feature in a completely different way.

VERSION CONTROL:
- Create a new branch called "feature-data-export-v2"
- Make all your changes in this branch
- Commit your changes when complete

VERSION 2 REQUIREMENTS:
Implement an ADVANCED export system with these features:
- Export modal/dialog with multiple options
- Multiple export formats: CSV, JSON, and PDF
- Date range filtering for exports (start date, end date)
- Category filtering for exports (select specific categories)
- Preview of data before export (show table of what will be exported)
- Custom filename input field
- Export summary showing how many records will be exported
- Loading states during export process

IMPLEMENTATION APPROACH:
This version should feel like a professional business application export feature.
Think about what a power user would want - lots of control and options.
Use a modal or drawer interface, not just a simple button.

Make this implementation completely different from Version 1:
- Different UI components and patterns
- Different user experience flow
- More sophisticated code architecture
- Professional polish and attention to detail

PROCESS:
1. Switch back to original branch
2. Create and checkout: git checkout -b feature-data-export-v2
3. Implement the advanced export system
4. Test all the functionality thoroughly
5. Commit your changes

Show me what's possible with a more sophisticated approach. Be creative!
```

## Module 3 Generation AI, Claude Code, & Code Quality

### Can AI Judge Code Quality?

```text
Write a 20-line Python function that can store data it receives as JSON.
Create a table to score the coding solutions across a number of important dimensions.
```

"Context is everything"

Need contextual information.

```text
By the way, this is for a system that does historical logging
and we need to make sure that we capture everything.

Project best practices:
1. Always throw exceptions
2. timing is critical
```

We can ask it to self-evaluate and improve its code. Build up context so it can build code that is relevant for your project.

Specify rubric and set standards that LLMs aren't always consistent with so it can introspect its own code and refactor it to meet expectations and quality standards.

### Why Code Evaluation Matters for AI Development

Traditional vs. AI Development Evaluation

Traditional Development:

- Evaluate one solution against theoretical alternatives
- Make decisions based on experience and intuition
- Limited ability to test different approaches
- High cost to change direction

AI Development:

- Evaluate multiple working implementations
- Compare real code, not theoretical approaches
- Test actual user experiences side-by-side
- Make data-driven decisions about architecture

#### Sample Prompt for evaluating three different implementations

```text
I have three different implementations of data export functionality
across three git branches in my expense tracker application.
I want to create a systematic evaluation framework to compare them thoroughly.

BACKGROUND:
- feature-data-export-v1: Simple CSV export (one-button approach)
- feature-data-export-v2: Advanced export with multiple formats and filtering options
- feature-data-export-v3: Cloud integration with sharing and collaboration features

Now I want you to systematically analyze each of three features implementations
by switching between branches and examining
the code, architecture, and implementation details.

ANALYSIS PROCESS:
For each branch (v1, v2, v3), please:

1. Switch to the branch
2. Examine all the files that were created or modified
3. Analyze the code architecture and patterns used
4. Look at component structure and organization
5. Review the user interface implementation
6. Check for error handling and edge cases
7. Assess the technical approach and libraries used

DOCUMENTATION:
Create a file called "code-analysis.md" with detailed findings for each version:

**For Each Version, Document:**
- Files created/modified (list them)
- Code architecture overview (how is it organized?)
- Key components and their responsibilities
- Libraries and dependencies used
- Implementation patterns and approaches
- Code complexity assessment
- Error handling approach
- Security considerations
- Performance implications
- Extensibility and maintainability factors

**Technical Deep Dive:**
- How does the export functionality work technically?
- What file generation approach is used?
- How is user interaction handled?
- What state management patterns are used?
- How are edge cases handled?

Be thorough and technical -
this analysis will inform our decision about which approach to adopt
or how to combine them.
```

### Does AI Labor Understand Design Principles?

SOLID design principles - do not need to specify them in detail
as it would have been in training data so highly token efficient
to just say follow SOLID principles.

It can write quality code if we give it sufficient context,
how we judge quality, what we are looking for,
and the design principles we want it to follow.

### Chat, Craft, Scale: Spend More Time Designing & Innovating

Pay attention to architecture, not specific lines of code.

#### Chat - thinking about the requirements

Thinking through all the design dimensions.
Really important to send Claude agents off
with the right design in mind.

```text
Let's design the requirements for x with this goal.
COME UP WITH AN INITIAL SET OF REQUIREMENTS
```

Thought through the requirements before going to next level.

```text
Let's design the feature A. Propose three designs based on ...
```

Follow up as a part of a gap analysis

```text
With this design, what use cases would be hard to support?
What friction might it cause.
Poke some holes in it.

samples...
```

Often find what's missing when using something, like a new API. We can use the persona pattern.

```text
Act as a first API.
I will type in pseudo-http requests and you will respond
with an http response like the server would.
Show me some sample HTTP requests I can send you.
```

Haven't built any code, no mocking. LLM is taking on the persona and it simulates the API. Persona pattern is the Super Mock

Rapid proof of concept, battle testing them, and maybe throwing them away and trying a new approach.

Take the time and really explore the design before sending Agents to create a bunch of code and use up tokens without having thoroughly thought through the design.

### Craft: Constraints & Prompts for Claude Code

Stucture folders, configure, deploy. What the ergonomics of what I would like to use.

```text
Design three different fluent clients in JavaScript
for interacting with the API.
Only show me the interface usage through examples.
```

Have Claude create the prompt after you've chosen a design.

```text
I like version 1 of all the design aspects.

Now, write a complete prompt that I can cut/paste into Claude Code
to get it to implement this.
```

This generates a huge prompt, but often get better results by segmenting it into a series of iterative prompts.

```text
this is a lot to do all at once.
Let's break this plan up into a series of incremental steps.
We want each step to end in a testable state and a commit.
You choose how many increments.
```

Can have a hybrid where you store the big prompt as a design document and then have a series of smaller prompts that reference the design document.

More details

```text
Let's think of library options for this step.
Let's also think of detailed implementation details,
coding conventions, package structure,
other that we need to decide now.

What are the key decisions?
```

Can modify the results.

```text
Propose three different configurations and discuss the pros/cons.
Would any of these details influence our architecture choices?
```

Crafting the constraints, the style, the architecture, the design patterns, the libraries, the testing approach, etc,
gives it guidelines so that at the end I end up with what I want.

## Module 4 Building Process & Context in Claude Code

### Global Persistent Context: `CLAUDE.md`

Like a new team member, you have to onboard Claude to be able to read documents, code, style guides, to be able to write code following the conventions of the organization. It needs a huge amount of context.

"Context is what we use to give specificity to our instructions." A more specific target to hit.

Compare

Less context

```text
Write an app for tracking expenses.
```

More Context

```text
Write a NextJs Web app that uses NextUI
for tracking expenses.
```

We don't want to micromanage, but we have to balance how much context we give it to get what we want.

`/init` initialize CLAUDE.md file, but you'll want to add context to the file. Such as SOLID principles or functional programming.

![CLAUDE.md](imgs/CLAUDEmd.jpg)

Steer it in the right direction. Like if you want it to use SOLID principles, you can add something like this to the file.

```md
Whenever you write object-oriented code, it MUST follow the SOLID design principles. Never write OO code that violates these principles. If you do, you will be asked to refactor it.
```

We don't want thousands of lines in the `CLAUDE.md` file. Should only be essential information. Institutional memory for every single prompt. Not the right place for all context.

### [Writing CLAUDE.md Files](https://www.coursera.org/learn/claude-code/supplement/vxmYz/writing-claude-md-files)

> The CONTEXT Framework for Claude.md Design
Use this acronym to remember the key principles:

* **C**lear and Concise Instructions
* **O**perational Processes
* **N**aming and Standards
* **T**esting and Quality Gates
* **E**xamples and References
* **X**pectations and Boundaries
* **T**ools and Dependencies

<details>
<summary>Example 1: Web Application Development Team</summary>

```md
# Project: TaskFlow Web Application

## Core Principles
**IMPORTANT**: Whenever you write code, it MUST follow SOLID design principles. Never write code that violates these principles. If you do, you will be asked to refactor it.

## Development Workflow
1. Before making any changes, create and checkout a feature branch named `feature-[brief-description]`
2. Write comprehensive tests for all new functionality
3. Compile code and run all tests before committing
4. Write detailed commit messages explaining the changes and rationale
5. Commit all changes to the feature branch

## Architecture Overview
- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **State Management**: Zustand for client state, React Query for server state
- **Backend**: Node.js with Express and Prisma ORM
- **Database**: PostgreSQL
- **Testing**: Jest for unit tests, Playwright for E2E

## Code Standards
- Use TypeScript for all new code with strict type checking
- Follow the existing component structure in `/src/components`
- API routes follow RESTful conventions in `/src/pages/api`
- Use Prisma schema definitions for all database operations
- CSS classes should use Tailwind utilities; custom CSS only when necessary

## Quality Gates
- All code must compile without warnings
- Test coverage must remain above 80%
- All tests must pass before committing
- ESLint and Prettier must pass without errors

## File Organization
- Components: `/src/components/[feature]/[ComponentName].tsx`
- Pages: `/src/pages/[route].tsx`
- Utilities: `/src/lib/[category]/[utility].ts`
- Types: `/src/types/[domain].ts`
```

</details>



<details>
<summary>Example 2: Python Data Science Project</summary>

```md
# Project: Customer Analytics Pipeline

## Development Standards
- **Language**: Python 3.11+
- **Code Style**: Follow PEP 8 strictly, use Black for formatting
- **Type Hints**: Required for all function signatures and class definitions
- **Documentation**: Docstrings required for all public functions and classes

## Workflow Requirements
1. Create feature branch: `analysis-[description]` or `model-[description]`
2. Write unit tests for all data processing functions
3. Run `pytest` and ensure all tests pass
4. Run `black .` and `flake8` before committing
5. Update relevant documentation in `/docs` if adding new features

## Project Structure
- `/src/data`: Data ingestion and preprocessing modules
- `/src/models`: ML model definitions and training scripts
- `/src/analysis`: Exploratory analysis notebooks and scripts
- `/src/utils`: Shared utility functions
- `/tests`: Comprehensive test suite
- `/configs`: Configuration files for different environments

## Data Handling Standards
- Use Pandas for data manipulation, prefer vectorized operations
- All data files must be documented in `/data/README.md`
- Use Pydantic models for data validation and serialization
- Never commit raw data files to version control
- Use environment variables for database connections and API keys

## ML/Analysis Guidelines
- Use scikit-learn for standard ML algorithms
- Notebook naming: `YYYY-MM-DD-[initials]-[description].ipynb`
- Save all trained models with versioning in `/models/trained`
- Use MLflow for experiment tracking
- Include model performance metrics in commit messages

## Dependencies
- Core: pandas, numpy, scikit-learn, matplotlib, seaborn
- ML: xgboost, lightgbm, optuna
- Data: sqlalchemy, pydantic, requests
- Testing: pytest, pytest-cov
```

</details>


<details>
<summary>Example 5: DevOps Infrastructure Project</summary>

```md
# Project: Multi-Cloud Infrastructure Platform

## Infrastructure as Code Standards
- **Primary Tool**: Terraform with HCL
- **Cloud Providers**: AWS, Azure, GCP
- **Configuration Management**: Ansible playbooks
- **Container Orchestration**: Kubernetes with Helm charts
- **Monitoring**: Prometheus, Grafana, ELK stack

## Workflow Requirements
1. Create infrastructure branch: `infra-[environment]-[component]`
2. Run `terraform plan` and review changes carefully
3. Test in development environment first
4. Update documentation in `/docs/runbooks`
5. Peer review required for production changes
6. Use conventional commits with clear impact description

## Directory Structure
- `/terraform/[provider]/[environment]/`: Environment-specific configurations
- `/ansible/playbooks/`: Configuration management scripts
- `/k8s/[namespace]/`: Kubernetes manifests and Helm charts
- `/scripts/`: Automation and deployment scripts
- `/docs/`: Architecture decisions and runbooks

## Security and Compliance
- All secrets must use external secret management (AWS Secrets Manager, etc.)
- Enable encryption at rest and in transit for all data stores
- Implement least-privilege access policies
- Use service accounts, never personal credentials in automation
- Maintain audit logs for all infrastructure changes

## Deployment Principles
- Use blue-green deployments for zero-downtime updates
- Implement automatic rollback on health check failures
- Tag all resources with environment, owner, and cost-center
- Use infrastructure modules for reusability across environments
- Implement proper backup and disaster recovery procedures

## Monitoring and Alerting
- Set up alerts for resource utilization > 80%
- Monitor certificate expiration dates
- Track deployment success/failure rates
- Implement SLA monitoring for critical services
- Use runbooks for common incident response procedures

## Cost Optimization
- Implement auto-scaling policies for dynamic workloads
- Use spot instances where appropriate for non-critical workloads
- Regular cost reviews with resource rightsizing
- Implement resource lifecycle policies for cleanup
```

</details>


<details>
<summary>Example 6: Open Source Library Development</summary>

```md
# Project: DataValidator - Python Data Validation Library

## Library Design Principles
- **API Design**: Simple, intuitive, and Pythonic
- **Dependencies**: Minimal external dependencies
- **Compatibility**: Python 3.8+ support
- **Performance**: Optimize for speed and memory efficiency
- **Documentation**: Comprehensive with examples

## Development Workflow
1. Create feature branch: `feature-[functionality]` or `fix-[issue-number]`
2. Write tests first (TDD approach)
3. Ensure 100% test coverage for new code
4. Update documentation and examples
5. Run full test suite across Python versions: `tox`
6. Update CHANGELOG.md with clear user-facing description

## Code Quality Standards
- Follow PEP 8 with line length limit of 88 characters
- Use type hints for all public APIs
- Docstrings required for all public functions/classes (Google style)
- Use dataclasses or Pydantic for structured data
- Implement proper error handling with custom exceptions

## Project Structure
- `/src/datavalidator/`: Main library code
- `/tests/`: Comprehensive test suite
- `/docs/`: Sphinx documentation
- `/examples/`: Usage examples and tutorials
- `/benchmarks/`: Performance testing scripts

## Testing Requirements
- Unit tests with pytest for all functionality
- Property-based testing with Hypothesis for edge cases
- Performance benchmarks for critical paths
- Integration tests with popular data libraries (pandas, numpy)
- Test matrix: Python 3.8, 3.9, 3.10, 3.11, 3.12

## Documentation Standards
- README with quick start guide and installation
- API documentation generated from docstrings
- Tutorial notebooks for common use cases
- Performance guidelines and best practices
- Migration guides for major version changes

## Release Process
- Semantic versioning (MAJOR.MINOR.PATCH)
- Automated testing on multiple Python versions
- Code coverage reports and quality metrics
- Security scanning for vulnerabilities
- Automated PyPI releases via GitHub Actions

## Community Guidelines
- Welcome contributions with clear CONTRIBUTING.md
- Issue templates for bugs and feature requests
- Code of conduct for inclusive community
- Regular maintenance and dependency updates
- Responsive to community feedback and issues
```
</details>

> The goal is to scale your AI development labor by providing the right context at the right level - enough specificity to get what you want, but not so much constraint that it can't innovate within your boundaries.

### Reusable Targeted Context & Process: Claude Code Commands

Repeat something over and over in the same way with important context. Can add command.md files.

`.claude/commands/code_review.md`

Can use `$ARGUMENTS` and templates, like `<file_name>.review.md`.

Reusable prompts with targeted context piped in and targeted process.

Ask Claude to look at project and generate useful commands.

### [Creating Claude Commands](https://www.coursera.org/learn/claude-code/supplement/xLRqn/creating-claude-commands)

> Commands transform Claude Code from a general assistant into a specialized team member with deep knowledge of your specific workflows. They ensure consistent, high-quality execution of repetitive tasks while providing the targeted context needed for complex operations.

> The TARGETED Framework for Command Design
Use this acronym to create effective commands:

* Task-Specific Instructions
* Arguments and Placeholders
* Reusable Process Steps
* Guided Examples and References
* Explicit Output Requirements
* Template-Based Naming
* Error Handling and Edge Cases
* Documentation and Context

<details>
<summary>Example 2: API Test</summary>

File: `.claude/commands/api-test`

```md
# API Testing Command

Create comprehensive API tests for: $ARGUMENTS

## Testing Strategy
Test the following API endpoints and scenarios based on $ARGUMENTS:

1. **Happy Path Testing**:
   - Valid request formats
   - Expected response structures
   - Proper HTTP status codes

2. **Error Handling Testing**:
   - Invalid request payloads
   - Authentication failures
   - Authorization edge cases
   - Rate limiting scenarios

3. **Edge Cases**:
   - Boundary value testing
   - Large payload handling
   - Concurrent request handling
   - Network timeout scenarios

## Test Structure Template
Create tests in `/tests/api/{endpoint-name}.test.ts`:

```typescript
describe('{Endpoint Name} API', () => {
  describe('POST /{endpoint}', () => {
    it('should create {resource} with valid data', async () => {
      // Test implementation
    });

    it('should return 400 for invalid data', async () => {
      // Test implementation
    });

    it('should require authentication', async () => {
      // Test implementation
    });
  });

  describe('GET /{endpoint}', () => {
    // Additional test cases
  });
});
```

</details>
