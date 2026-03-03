import { Lesson, Quiz } from '@/types/lesson';

// Modern, Short-Form JavaScript Curriculum
// NOTE: Main JavaScript curriculum is now in javascriptCurriculum.ts
export const modernJavascriptLessons: Lesson[] = [
  // Removed - all beginner JavaScript lessons are now in javascriptCurriculum.ts
  /*{
    id: 'js-lesson-1-console-and-strings',
    title: 'Lesson 1: Hello, JavaScript!',
    description: 'Learn to display your name using console.log() - your first step into programming',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 15,
    activities: ['docs', 'code', 'quiz'],
    content: {
      theory: `
# Lesson 1: Your First JavaScript Program

## What is Programming?

Programming is the art of giving instructions to a computer. Just like you follow a recipe to bake a cake or directions to get to a friend's house, computers need step-by-step instructions to perform tasks. These instructions are written in **programming languages** like JavaScript.

JavaScript is one of the most popular programming languages in the world. It powers almost every website you visit - from social media to online games. When you click a button, fill out a form, or see an animation, that's JavaScript at work!

---

## What is console.log()?

\`console.log()\` is a **function** that displays messages in the browser's console. Think of it as JavaScript's way of talking to you.

### Why is console.log() Important?

- **See what your code does**: Check if your program is working correctly
- **Find mistakes**: When something goes wrong, console.log() helps you figure out what happened
- **Learn step-by-step**: As a beginner, you can see exactly how your code executes

The console is a special window in your web browser where programmers can see messages, errors, and output from their code.

---

## How to Use console.log()

The basic syntax looks like this:

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

Let's break down what each part means:

- **console** - This is an object that represents the browser's console
- **.log** - This is a method (a type of function) that prints messages
- **( )** - Parentheses hold the information you want to display
- **"Hello, World!"** - The text you want to print (called a "string")
- **;** - Semicolon marks the end of the instruction

### Important Rules:

1. **Text must be in quotes** - Use either double quotes " or single quotes '
2. **Parentheses are required** - The message goes inside ( )
3. **End with a semicolon** - This tells JavaScript the command is complete
4. **Spelling matters** - Must be lowercase: console.log not Console.Log

---

## What are Strings?

A **string** is any text wrapped in quotes. Strings are one of the fundamental data types in programming.

### Examples of Strings:

\`\`\`javascript
"Hello"
"My name is Sarah"
"12345"
"JavaScript is fun!"
\`\`\`

### String Rules:

- Always wrapped in quotes (either " or ')
- Can contain letters, numbers, spaces, and symbols
- The quotes are NOT part of the text - they just tell JavaScript "this is text"

### What happens if you forget the quotes?

\`\`\`javascript
console.log(Hello);  // ❌ ERROR! JavaScript thinks "Hello" is a variable
console.log("Hello"); // ✅ Correct! This is a string
\`\`\`

---

## What are Variables?

Variables are like labeled boxes that store information. Instead of typing the same thing over and over, you can store it in a variable and use it whenever you need it.

### Creating a Variable:

\`\`\`javascript
let name = "Alex";
\`\`\`

**Breaking it down:**

- **let** - A keyword that tells JavaScript "I'm creating a new variable"
- **name** - The name of your variable (you choose this!)
- **=** - The assignment operator (it means "store this value")
- **"Alex"** - The value being stored (in this case, a string)
- **;** - Semicolon to end the statement

### Using Variables:

Once you create a variable, you can use it in console.log():

\`\`\`javascript
let name = "Alex";
console.log(name);  // This will print: Alex
\`\`\`

Notice: When using a variable, you do **NOT** put quotes around it! The quotes are only for creating strings.

---

## Putting It All Together

Here's a complete example:

\`\`\`javascript
// Create a variable to store a name
let myName = "Sarah";

// Display the name in the console
console.log(myName);

// This will print: Sarah
\`\`\`

### Comments

Did you notice the lines starting with //? Those are **comments**. Comments are notes for humans - JavaScript ignores them completely. They help explain what your code does.

---

## Common Mistakes to Avoid

### 1. Forgetting Quotes Around Text

\`\`\`javascript
console.log(Hello);  // ❌ Error!
console.log("Hello"); // ✅ Correct!
\`\`\`

### 2. Misspelling console.log

\`\`\`javascript
Console.log("Hi");  // ❌ Wrong (capital C)
console.log("Hi");  // ✅ Correct!
\`\`\`

### 3. Forgetting Parentheses

\`\`\`javascript
console.log "Hello";  // ❌ Missing parentheses
console.log("Hello"); // ✅ Correct!
\`\`\`

### 4. Mixing Quote Types

\`\`\`javascript
console.log("Hello');  // ❌ Started with " but ended with '
console.log("Hello");  // ✅ Correct!
console.log('Hello');  // ✅ Also correct!
\`\`\`

---

## Key Takeaways

✅ **console.log()** displays messages in the browser console
✅ **Strings** are text wrapped in quotes
✅ **Variables** store information using the let keyword
✅ Text in console.log() must have quotes, but variable names do NOT
✅ Semicolons mark the end of each statement
✅ JavaScript is case-sensitive - spelling and capitalization matter!

---

## What's Next?

In this coding challenge, you'll write your very first JavaScript program. You'll use console.log() to display your name in the console. This might seem simple, but every programmer starts here - even the ones who built Google, Facebook, and YouTube!

Let's code! 🚀
      `,
      instructions: `
# Coding Challenge: Display Your Name

## Your Mission

Write a JavaScript program that displays your name in the console using console.log().

## Instructions

1. Use console.log() to display your name
2. Make sure your name is wrapped in quotes (it's a string!)
3. Run your code and see your name appear in the console

## Example

If your name is "Jordan", your code should look like this:

console.log("Jordan");

When you run this code, you'll see Jordan appear in the console.

## Tips

💡 Remember to put your name in quotes!
💡 Make sure to spell console.log in lowercase
💡 Don't forget the semicolon at the end
💡 Click "Run Code" to see the output

## Challenge Yourself (Optional)

Once you get your name working, try these extras:
- Add a second console.log() with a greeting like "Hello!"
- Display your age or favorite hobby
- Add multiple lines with different messages

**Ready? Start coding!** 🎯
      `,
      starterCode: `// Write your code below to display your name
// Example: console.log("Your Name");


`,
      solution: `// Write your code below to display your name
console.log("Alex");

// Bonus: You can add more lines!
console.log("I am learning JavaScript!");`,
      testCases: []
    },
    quiz: {
      id: 'js-lesson-1-quiz',
      title: 'Lesson 1 Quiz: console.log Basics',
      timePerQuestion: 30,
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What is the correct way to display "Hello" in the console?',
          options: [
            'print("Hello");',
            'console.log("Hello");',
            'log("Hello");',
            'display("Hello");'
          ],
          correctAnswer: 1,
          explanation: 'console.log() is the function JavaScript uses to display messages in the console.',
          emoji: '💬'
        },
        {
          id: 'q2',
          question: 'What must surround text when using console.log()?',
          options: [
            'Parentheses ( )',
            'Quotes " " or \' \'',
            'Brackets [ ]',
            'Curly braces { }'
          ],
          correctAnswer: 1,
          explanation: 'Text (strings) must be wrapped in quotes - either double quotes " " or single quotes \' \'.',
          emoji: '📝'
        },
        {
          id: 'q3',
          question: 'What will this code display?\n\nconsole.log("JavaScript");',
          options: [
            'console.log("JavaScript")',
            'JavaScript',
            '"JavaScript"',
            'Nothing - it has an error'
          ],
          correctAnswer: 1,
          explanation: 'The code will display: JavaScript (without the quotes). The quotes are just to tell JavaScript it\'s text.',
          emoji: '🖥️'
        },
        {
          id: 'q4',
          question: 'Which of these is a string?',
          options: [
            'console',
            '"Hello World"',
            'log',
            'All of the above'
          ],
          correctAnswer: 1,
          explanation: 'A string is text wrapped in quotes. "Hello World" is a string because it has quotes around it.',
          emoji: '📜'
        },
        {
          id: 'q5',
          question: 'What symbol ends most JavaScript statements?',
          options: [
            'Period (.)',
            'Comma (,)',
            'Semicolon (;)',
            'Exclamation mark (!)'
          ],
          correctAnswer: 2,
          explanation: 'JavaScript statements end with a semicolon (;) - like a period at the end of a sentence.',
          emoji: '⏹️'
        },
        {
          id: 'q6',
          question: 'What keyword is used to create a new variable?',
          options: [
            'var',
            'let',
            'const',
            'All of the above'
          ],
          correctAnswer: 3,
          explanation: 'JavaScript has three keywords for creating variables: var (old way), let (can change), and const (cannot change). We focus on "let" for now.',
          emoji: '📦'
        },
        {
          id: 'q7',
          question: 'What is wrong with this code?\n\nConsole.Log("Hi");',
          options: [
            'Should be lowercase: console.log',
            'Missing semicolon',
            'Should use single quotes',
            'Nothing is wrong'
          ],
          correctAnswer: 0,
          explanation: 'JavaScript is case-sensitive! It must be console.log (all lowercase), not Console.Log.',
          emoji: '⚠️'
        }
      ]
    }
  }*/
];

// Modern, Short-Form Python Curriculum
export const modernPythonLessons: Lesson[] = [];
