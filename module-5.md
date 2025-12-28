# Module 5 Version Control and Parallel Development with Claude Code

[Home](README.md) | [← Previous: Module 4](module-4.md) | [Next: Module 6 →](module-6.md)

---

## AI Makes Mistakes: Git Branches

Use `ai` to distinguish between AI and human created branches?
`feature-`


```md
## IMPORTANT

Before you make any change, create and check out a feature branch named "feature-some-short-name". Make and then commit your changes in this branch.
```

## Allowing Claude Code to Work in Parallel with Git Worktrees

[git worktree documentation](https://git-scm.com/docs/git-worktree)

> Think of it this way:
> * Traditional workflow: One working directory, switch between branches
> * Worktree workflow: Multiple working directories, each with its own branch

Wrapped this common way of working into two commands [parallel-work](.claude/commands/parallel-work.md) and [integrate-parallel-work](.claude/commands/integrate-parallel-work.md). See [.claude/commands/README.md](.claude/commands/README.md#available-commands) for usage.

## Claude Subagents & Tasks

Subagents allow parallel work with their own context window where different subagents can be given specific domains or tasks to focus on. Divide and Conquer and Scale.

Sample prompt

```md
Can you run two subagents?

One of them should analyze improvements
to the back-end that could be made.

One of them should analyze improvements
that could be made to the front end.

Please run them in parallel.
```

You can also specify the number of agents to run, such as for large codebases

```md
Explore the codebase using 4 tasks in parallel.
Each agent should explore different directories.
```



---

[Home](README.md) | [← Previous: Module 4](module-4.md) | [Next: Module 6 →](module-6.md)
