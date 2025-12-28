# Module 6 Improving Claude Code Scalability & Reasoning

[Home](README.md) | [← Previous: Module 5](module-5.md) | [Next: Module 7 →](module-7.md)

---

## Being Claude Code's Hands, Eyes, and Ears

> I think of software engineering as a search process...I'm trying to change my code to improve some outcome...One of the key things I have to do is I have to get feedback on what happened.

Because it may not do this, you have to tell Claude Code to

* compile the code
* run the tests

You want to limit the amount of work that you have to do to decide if what it did was good or not.

Somethings that we can't automate or specify, like user interfaces, we want to be Claude Code's hands, eyes, and ears. Give it feedback on what went wrong or what changes you want to make, such as screenshots, console error messages with context of when error showed up.

![Claude's UI feedback](imgs/ui-feedback-2.jpg)

We want to limit the amount of this interaction as it's a bottleneck to scalability.

![Claude's hands, eyes, and ears](imgs/ui-feedback.jpg)



---

[Home](README.md) | [← Previous: Module 5](module-5.md) | [Next: Module 7 →](module-7.md)
