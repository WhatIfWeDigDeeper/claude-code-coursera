# Module 7 Multimodal Prompting & Process

[Home](README.md) | [← Previous: Module 6](module-6.md)

- [Exercise: From Coffee-Stained Napkin to Production Code with Multimodal Prompting](#exercise-from-coffee-stained-napkin-to-production-code-with-multimodal-prompting)
- [Start By Fixing the Process \& Context, Not the Code](#start-by-fixing-the-process--context-not-the-code)
  - [Programming the AI labor](#programming-the-ai-labor)

---

## Exercise: From Coffee-Stained Napkin to Production Code with Multimodal Prompting

Can give it an image and a prompt like

```md
I sketched an expense insights dashboard on a napkin at a coffee shop.
Please implement this as a React component called MonthlyInsights.

Looking at this sketch: /imgs/napkin-insights-mockup.png

Implement a new screen in the application that mirrors what you see in the mockup.
```

"A picture is worth a thousand tokens." -- gm

[See this page for multiple use cases where images and diagrams are more efficient than text](https://www.coursera.org/learn/claude-code/supplement/tt9Ic/exercise-from-coffee-stained-napkin-to-production-code-with-multimodal-prompting)


## Start By Fixing the Process & Context, Not the Code

### Programming the AI labor

Updating Claude md files (specs) rather than manually fixing lines of code, or prompting Claude to fix them. That way you are programming the AI labor and the process to scale.

> much more valuable... as a programmer now... you are programming that [AI] labor. Your goal is to program the process, to program the context, to build a process and a context to where that AI labor gets it right like 100% of the time. You don't want to go and hand edit a bunch of stuff because you're limiting the scalability.

Editing CLAUDE.md and commands rather than fixing the code will lead to

- repeatable process
- higher quality code
- scalability

Like adding linting rules rather than a human catching them in a PR review. You now rarely write code directly, except maybe as examples. You now write programs by writing and updating the AI spec, context, and process.

gm - You've become a markdown engineer.


---

[Home](README.md) | [← Previous: Module 6](module-6.md)
