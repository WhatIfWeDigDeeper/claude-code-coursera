# Module 2 Leveraging the Software Engineering Advantages of Claude Code

[Home](README.md) | [← Previous: Module 1](module-1.md) | [Next: Module 3 →](module-3.md)

---

- [AI Labor: Claude Code is an AI Development Team](#ai-labor-claude-code-is-an-ai-development-team)
- [The Best of N Pattern: Leverage AI Labor Cost Advantages](#the-best-of-n-pattern-leverage-ai-labor-cost-advantages)
  - [Sample alternative implementation](#sample-alternative-implementation)

---

"AI is (Software Engineering) Labor"

large Prompts allow AI to scale

## AI Labor: Claude Code is an AI Development Team

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

## The Best of N Pattern: Leverage AI Labor Cost Advantages

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

### Sample alternative implementation

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

---

[Home](README.md) | [← Previous: Module 1](module-1.md) | [Next: Module 3 →](module-3.md)
