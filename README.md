# claude-code-coursera
[Notes for Coursera course "Claude Code: Software Engineering with Generative AI Agents"](https://www.coursera.org/learn/claude-code/home/welcome)

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
I want you to create a modern, professional NextJS expense tracking application. Here's my vision:

APPLICATION OVERVIEW:
Build a complete expense tracking web app that helps users manage their personal finances. The app should feel modern, intuitive, and professional.

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

Please create this as a complete, production-ready application. Set up the project structure, implement all features, and make sure everything works together seamlessly. Focus on creating something that looks professional and that I could actually use to track my expenses.

When you're done, provide instructions on how to run the application and test all features.
```

"AI as labor, Not Just a Tool"

## Module 2 Leveraging the Software Engineering Advantages of Claude Code

"AI is (Software Engineering) Labor"

large Prompts allow AI to scale

### AI Labor: Claude Code is an AI Development Team

AI leader writes prompts like this

```text
Look at this list of expenses. How could we make it incredibly bold, beautiful, and modern? Blow my mind with the elegance, simplicity, and beauty of your user interface design changes.
```

"You challenge the AI. You give it big tasks."

```text
The user interface isn't consistent. Could you make everything match the style of the list of expenses?
```

Tell it to figure it out. Give it bold challenges.

"Create something amazing to solve that problem for me."

### The Best of N Pattern: Leverage AI Labor Cost Advantages

A human is still important part of the architecture and design.

"Software is so labor intensive" that it limits how many options and designs to explore because it's so expensive to do just a single one.

"We want to use the scalability, speed, and ego-less nature of AI Labor to do more than before at a higher level of quality"

```text
that was awesome. Can you go back to the prior branch and repeat this process, but solve the underlying problem in a different and wildly valuable way? Surprise me with your creativity.
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
