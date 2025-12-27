# Module 3 Generation AI, Claude Code, & Code Quality

[Home](README.md) | [← Previous: Module 2](module-2.md) | [Next: Module 4 →](module-4.md)

---

- [Can AI Judge Code Quality?](#can-ai-judge-code-quality)
- [Why Code Evaluation Matters for AI Development](#why-code-evaluation-matters-for-ai-development)
  - [Sample Prompt for evaluating three different implementations](#sample-prompt-for-evaluating-three-different-implementations)
- [Does AI Labor Understand Design Principles?](#does-ai-labor-understand-design-principles)
- [Chat, Craft, Scale: Spend More Time Designing \& Innovating](#chat-craft-scale-spend-more-time-designing--innovating)
  - [Chat - thinking about the requirements](#chat---thinking-about-the-requirements)
- [Craft: Constraints \& Prompts for Claude Code](#craft-constraints--prompts-for-claude-code)

---

## Can AI Judge Code Quality?

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

## Why Code Evaluation Matters for AI Development

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

### Sample Prompt for evaluating three different implementations

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

## Does AI Labor Understand Design Principles?

SOLID design principles - do not need to specify them in detail
as it would have been in training data so highly token efficient
to just say follow SOLID principles.

It can write quality code if we give it sufficient context,
how we judge quality, what we are looking for,
and the design principles we want it to follow.

## Chat, Craft, Scale: Spend More Time Designing & Innovating

Pay attention to architecture, not specific lines of code.

### Chat - thinking about the requirements

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

## Craft: Constraints & Prompts for Claude Code

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

---

[Home](README.md) | [← Previous: Module 2](module-2.md) | [Next: Module 4 →](module-4.md)
