import { Lesson, Quiz } from '@/types/lesson';

// JavaScript Curriculum for Beginners (Ages 12-18)
// 8 foundational lessons covering JavaScript fundamentals

export const javascriptCurriculumLessons: Lesson[] = [
  // Lesson 1: Console.log()
  {
    id: 'js-console-log',
    title: 'Console.log()',
    description: 'Learn how to print output to the console',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 15,
    activities: ['docs', 'code', 'quiz'],
    content: {
      theory: `# Lesson 1 - Console.log()

## Documentation

Think of **\`console.log()\`** as the "Swiss Army Knife" of programming. It's the go-to tool developers use to see exactly what's happening inside their code while it's running. In JavaScript, the \`console.log()\` function acts like a direct messenger, printing text, numbers, or variables to a window called the **console**.

\`console\` is a keyword that refers to an object. In JavaScript (like most programming languages), keywords are built-in commands that have predetermined values or functionality. The \`log()\` method is built into the \`console\` object, so combining them allows us to print to the **console**.

For example, to print out **'Hello World!'** to the terminal, you would write **\`console.log('Hello World!')\`** 

### Key Insights

- \`console.log()\` is used to print statements directly to the console
- \`log()\` is a built-in method of the \`console\` object`,
      instructions: `## Coding Lesson

In the editor, use \`console.log()\` to log the year you were born. Run your code to see your output.

Next, create a new line and use the \`console.log()\` method to log your favorite number.

Use console.log() to print the year you were born and your favorite number.`,
      starterCode: `// Use console.log() to print the year you were born


// Use console.log() to print your favorite number
`,
      solution: `console.log(2005)
console.log(7)`,
      testCases: []
    },
    quiz: {
      id: 'js-console-log-quiz',
      title: 'Console.log() Knowledge Check',
      timePerQuestion: 15,
      passingScore: 66,
      questions: [
        {
          id: 'q1',
          question: 'In the statement console.log(), what does the console part actually refer to?',
          options: ['A string of text', 'A physical piece of hardware', 'An object', 'A variable you created'],
          correctAnswer: 2,
          explanation: 'console is an object that provides methods for interacting with the browser console.',
          emoji: '📦'
        },
        {
          id: 'q2',
          question: 'Which part of console.log() is considered a "method" (a built-in function belonging to an object)?',
          options: ['console', '. (the dot)', 'log()', '() (the parentheses)'],
          correctAnswer: 2,
          explanation: 'log() is the method that belongs to the console object.',
          emoji: '🔧'
        },
        {
          id: 'q3',
          question: 'Which of the following is the correct way to log the number 100 to the console?',
          options: ['print(100);', 'log.console(100);', 'console.log(100);', 'console.log = 100;'],
          correctAnswer: 2,
          explanation: 'console.log(100); is the correct syntax to print 100 to the console.',
          emoji: '✅'
        }
      ]
    }
  },

  // Lesson 2: Variables
  {
    id: 'js-variables',
    title: 'Variables',
    description: 'Learn how to store and use data with variables',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 20,
    activities: ['docs', 'code', 'quiz'],
    content: {
      theory: `# Lesson 2 - Variables

## Documentation

Think of **variables** as labeled jars on a shelf. Each jar has a name written on it and can hold one thing at a time — a number, a word, or something more complex. In JavaScript, we create these "jars" using the keywords \`let\` and \`const\`, followed by a name we choose, and then assign a value using the \`=\` sign.

\`let\` creates a variable whose contents can be swapped out later. \`const\` creates a variable that is locked in — once you put something inside, it stays. Choosing between the two comes down to one question: will this value ever need to change?

\`\`\`js
let score = 0;
const playerName = "Alex";
\`\`\`

You might also encounter \`var\`, an older way to declare variables. It still works, but \`let\` and \`const\` are the modern standard because they behave more predictably. For now, stick with \`let\` and \`const\`.

### Key Insights

- \`let\` declares a variable that can be reassigned later
- \`const\` declares a variable that cannot be reassigned after its initial value
- Variable names are case-sensitive (\`score\` and \`Score\` are two different variables)
- Use \`=\` (the assignment operator) to give a variable its value`,
      instructions: `## Coding Lesson

In the editor, use \`const\` to create a variable called \`myName\` and assign it your first name as a **string** (text wrapped in quotes). Log it to the console.

Next, use \`let\` to create a variable called \`myAge\` and assign it your current age as a **number**. Log it to the console.

Remember, strings need to be wrapped in quotation marks (\`"..."\`) — numbers do not.

Create a const variable for your name and a let variable for your age. Log both to the console.`,
      starterCode: `// Create a const variable called myName with your name


// Log myName to the console


// Create a let variable called myAge with your age


// Log myAge to the console
`,
      solution: `const myName = "Alex";
console.log(myName);
let myAge = 16;
console.log(myAge);`,
      testCases: []
    },
    quiz: {
      id: 'js-variables-quiz',
      title: 'Variables Knowledge Check',
      timePerQuestion: 15,
      passingScore: 66,
      questions: [
        {
          id: 'q1',
          question: 'Which keyword creates a variable that cannot be reassigned?',
          options: ['var', 'let', 'const', 'new'],
          correctAnswer: 2,
          explanation: 'const creates a variable that cannot be reassigned after its initial value.',
          emoji: '🔒'
        },
        {
          id: 'q2',
          question: 'What will happen if you try to reassign a const variable?',
          options: ['It will update silently', 'It will prompt you to confirm the change', 'It will throw an error', 'It will convert itself to a let'],
          correctAnswer: 2,
          explanation: 'Attempting to reassign a const variable will throw an error.',
          emoji: '⚠️'
        },
        {
          id: 'q3',
          question: 'Which of the following is a valid variable declaration?',
          options: ['let 2fast = "car";', 'const my name = "Alex";', 'let highScore = 100;', 'const = "hello";'],
          correctAnswer: 2,
          explanation: 'let highScore = 100; is valid. Variable names cannot start with numbers or contain spaces.',
          emoji: '✅'
        }
      ]
    }
  },

  // Lesson 3: Data Types
  {
    id: 'js-data-types',
    title: 'Data Types',
    description: 'Understand strings, numbers, and booleans',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 20,
    activities: ['docs', 'code', 'quiz'],
    content: {
      theory: `# Lesson 3 - Data Types

## Documentation

Think of **data types** as different kinds of content you can store inside your variables. Just like a filing cabinet might hold documents, photos, or sticky notes, variables in JavaScript can hold different _types_ of data — and each type behaves differently.

The three foundational types you need to know right now are **strings**, **numbers**, and **booleans**.

A **string** is any text wrapped in quotes. It could be a single letter, a full sentence, or even digits treated as text — as long as it's in quotes, JavaScript reads it as a string.

\`\`\`js
let greeting = "Hello, world!";
\`\`\`

A **number** is exactly what it sounds like — any numeric value, whether whole or decimal. Numbers are _not_ wrapped in quotes.

\`\`\`js
let temperature = 72.5;
\`\`\`

A **boolean** is the simplest type of all. It can only be one of two values: \`true\` or \`false\`. Think of it like a light switch — it's either on or off. Booleans are critical for decision-making in code.

\`\`\`js
let isLoggedIn = true;
\`\`\`

You can check a value's type at any time using the \`typeof\` operator, which returns a string describing the type.

\`\`\`js
typeof "hello"; // "string"
typeof 42;       // "number"
typeof true;     // "boolean"
\`\`\`

### Key Insights

- **Strings** represent text and must be wrapped in quotes (\`"..."\` or \`'...'\`)
- **Numbers** represent numeric values and are written without quotes
- **Booleans** represent \`true\` or \`false\` — nothing else
- \`typeof\` returns the data type of any value as a string`,
      instructions: `## Coding Lesson

Create three variables using \`let\`:

1. A variable called \`movie\` that stores your favorite movie as a string
2. A variable called \`rating\` that stores a number between 1 and 10
3. A variable called \`wouldRecommend\` that stores a boolean

Use \`console.log(typeof variableName)\` to log the **type** of each variable — not the value, but the type.

\`typeof\` goes _before_ the variable name, not after. And you can place a \`typeof\` expression directly inside \`console.log()\`.

Create three variables of different types and use typeof to check their types.`,
      starterCode: `// Create a variable called movie with your favorite movie (string)


// Create a variable called rating with a number from 1-10


// Create a variable called wouldRecommend with true or false


// Log the TYPE of each variable using typeof
`,
      solution: `let movie = "Inception";
let rating = 9;
let wouldRecommend = true;
console.log(typeof movie);
console.log(typeof rating);
console.log(typeof wouldRecommend);`,
      testCases: []
    },
    quiz: {
      id: 'js-data-types-quiz',
      title: 'Data Types Knowledge Check',
      timePerQuestion: 15,
      passingScore: 66,
      questions: [
        {
          id: 'q1',
          question: 'What will typeof "99" return?',
          options: ['"number"', '"integer"', '"string"', '"boolean"'],
          correctAnswer: 2,
          explanation: '"99" is wrapped in quotes, making it a string, not a number.',
          emoji: '🔤'
        },
        {
          id: 'q2',
          question: 'Which of the following is a boolean value?',
          options: ['"true"', '0', 'false', '"off"'],
          correctAnswer: 2,
          explanation: 'false is a boolean value. "true" and "off" are strings, 0 is a number.',
          emoji: '✅'
        },
        {
          id: 'q3',
          question: 'What is the result of typeof 3.14?',
          options: ['"float"', '"decimal"', '"number"', '"string"'],
          correctAnswer: 2,
          explanation: 'JavaScript uses "number" for all numeric types, including decimals.',
          emoji: '🔢'
        }
      ]
    }
  },

  // Lesson 4: Arithmetic Operators
  {
    id: 'js-arithmetic',
    title: 'Arithmetic Operators',
    description: 'Learn basic math operations in JavaScript',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 20,
    activities: ['docs', 'code', 'quiz'],
    content: {
      theory: `# Lesson 4 - Arithmetic Operators

## Documentation

Think of **arithmetic operators** as the basic math toolkit built right into JavaScript. Just like a calculator, JavaScript can add, subtract, multiply, and divide — but it can also do a few things your calculator might not advertise upfront.

The core operators are:

- \`+\` addition
- \`-\` subtraction
- \`*\` multiplication
- \`/\` division
- \`%\` modulus (remainder)

Most of these are self-explanatory, but \`%\` (modulus) is the odd one out. It doesn't give you the result of division — it gives you the **remainder**. For example, \`10 % 3\` equals \`1\`, because 10 divided by 3 is 3 with a remainder of 1.

\`\`\`js
let total = 50 + 25;    // 75
let half = total / 2;   // 37.5
let leftover = 10 % 3;  // 1
\`\`\`

Operators work with variables too, not just raw numbers. You can combine variables and numbers freely in expressions.

\`\`\`js
let price = 20;
let tax = price * 0.08;
let finalPrice = price + tax;
\`\`\`

### Key Insights

- \`+\`, \`-\`, \`*\`, \`/\` perform basic arithmetic just like a calculator
- \`%\` (modulus) returns the **remainder** after division
- Operators work on raw numbers, variables, or any combination of both
- Expressions are evaluated and the result can be stored in a variable`,
      instructions: `## Coding Lesson

Create a variable called \`a\` and assign it the value \`12\`. Create another variable called \`b\` and assign it the value \`5\`.

Log the result of \`a + b\` to the console. On a new line, log the result of \`a % b\` to the console.

You can place an entire math expression inside the parentheses of \`console.log()\` — you don't need to store it in a new variable first (though you can if you want to).

Create two variables and perform addition and modulus operations on them.`,
      starterCode: `// Create variable a with value 12


// Create variable b with value 5


// Log a + b to the console


// Log a % b to the console
`,
      solution: `let a = 12;
let b = 5;
console.log(a + b);
console.log(a % b);`,
      testCases: []
    },
    quiz: {
      id: 'js-arithmetic-quiz',
      title: 'Arithmetic Operators Knowledge Check',
      timePerQuestion: 15,
      passingScore: 66,
      questions: [
        {
          id: 'q1',
          question: 'What does the % (modulus) operator return?',
          options: ['The quotient of two numbers', 'The percentage of a number', 'The remainder after division', 'The average of two numbers'],
          correctAnswer: 2,
          explanation: 'The modulus operator returns the remainder after division.',
          emoji: '➗'
        },
        {
          id: 'q2',
          question: 'What is the result of 15 % 4?',
          options: ['3', '4', '3.75', '1'],
          correctAnswer: 0,
          explanation: '15 divided by 4 is 3 with a remainder of 3.',
          emoji: '🔢'
        },
        {
          id: 'q3',
          question: 'What will console.log(10 + 5 * 2) output?',
          options: ['30', '20', '25', '10'],
          correctAnswer: 1,
          explanation: 'Multiplication happens before addition, so 5 * 2 = 10, then 10 + 10 = 20.',
          emoji: '🧮'
        }
      ]
    }
  },

  // Lesson 5: Conditionals
  {
    id: 'js-conditionals',
    title: 'Conditionals',
    description: 'Make decisions in your code with if statements',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 25,
    activities: ['docs', 'code', 'quiz'],
    content: {
      theory: `# Lesson 5 - Conditionals

## Documentation

Think of **conditionals** as the decision-making engine of your code. Every day, you make choices based on conditions: _if_ it's raining, you grab an umbrella — _else_, you don't. JavaScript works the same way using \`if\`, \`else if\`, and \`else\` statements.

An \`if\` statement checks whether a condition inside its parentheses evaluates to \`true\`. If it does, the code inside the curly braces \`{}\` runs. If it doesn't, JavaScript skips it entirely.

\`\`\`js
let temperature = 95;

if (temperature > 90) {
  console.log("It's scorching out there!");
}
\`\`\`

You can chain decisions using \`else if\` to check additional conditions, and finish with \`else\` as a catch-all when nothing above matched.

\`\`\`js
let score = 74;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("F");
}
\`\`\`

Conditions rely on **comparison operators** to produce \`true\` or \`false\`:

- \`===\` strictly equal
- \`!==\` strictly not equal
- \`>\` greater than
- \`<\` less than
- \`>=\` greater than or equal to
- \`<=\` less than or equal to

Notice the triple equals (\`===\`). In JavaScript, \`==\` exists but behaves loosely — it tries to convert types before comparing. Using \`===\` is the safer, more predictable choice.

### Key Insights

- \`if\` runs a block of code only when its condition is \`true\`
- \`else if\` adds additional conditions to check in sequence
- \`else\` acts as the fallback — it runs when none of the conditions above are met
- Use \`===\` for strict comparison (preferred over \`==\`)`,
      instructions: `## Coding Lesson

Create a variable called \`age\` and assign it any number. Write an \`if / else if / else\` statement that logs:

- \`"child"\` if \`age\` is less than 13
- \`"teenager"\` if \`age\` is less than 18
- \`"adult"\` if neither condition is met

The order of your conditions matters. JavaScript evaluates them top to bottom and runs only the **first** block that matches. Think about what range each branch actually catches.

Create a variable for age and use if/else if/else to categorize it.`,
      starterCode: `// Create a variable called age


// Write an if statement for age < 13


// Write an else if for age < 18


// Write an else for all other cases
`,
      solution: `let age = 15;

if (age < 13) {
  console.log("child");
} else if (age < 18) {
  console.log("teenager");
} else {
  console.log("adult");
}`,
      testCases: []
    },
    quiz: {
      id: 'js-conditionals-quiz',
      title: 'Conditionals Knowledge Check',
      timePerQuestion: 15,
      passingScore: 66,
      questions: [
        {
          id: 'q1',
          question: 'What happens if an if condition evaluates to false and there is no else?',
          options: ['The program crashes', 'JavaScript runs the code block anyway', 'JavaScript skips the block and moves on', 'It throws an error'],
          correctAnswer: 2,
          explanation: 'JavaScript simply skips the if block and continues with the rest of the code.',
          emoji: '⏭️'
        },
        {
          id: 'q2',
          question: 'Which comparison operator checks for strict equality (same value and same type)?',
          options: ['=', '==', '===', '!='],
          correctAnswer: 2,
          explanation: '=== checks both value and type, making it the safest choice.',
          emoji: '🔍'
        },
        {
          id: 'q3',
          question: 'Given let x = 10; what will the following log?\n\nif (x > 20) {\n  console.log("A");\n} else if (x > 5) {\n  console.log("B");\n} else {\n  console.log("C");\n}',
          options: ['"A"', '"B"', '"C"', '"A" and "B"'],
          correctAnswer: 1,
          explanation: 'x is 10, which is not > 20, but is > 5, so "B" is logged.',
          emoji: '🎯'
        }
      ]
    }
  },

  // Lesson 6: Functions
  {
    id: 'js-functions',
    title: 'Functions',
    description: 'Create reusable blocks of code',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 25,
    activities: ['docs', 'code', 'quiz'],
    content: {
      theory: `# Lesson 6 - Functions

## Documentation

Think of **functions** as reusable recipes. Instead of writing the same set of instructions over and over, you write them once, give that recipe a name, and "call" it whenever you need it. Functions are one of the most important building blocks in all of programming.

A function is created (or "declared") using the \`function\` keyword, followed by a name, a set of parentheses \`()\`, and a block of code inside curly braces \`{}\`.

\`\`\`js
function greet() {
  console.log("Hello there!");
}
\`\`\`

Declaring a function doesn't run it — it just defines the recipe. To actually execute the code inside, you **call** the function by writing its name followed by parentheses.

\`\`\`js
greet(); // "Hello there!"
\`\`\`

Functions become truly powerful when you give them **parameters** — placeholders for data that gets passed in when the function is called. The actual values you pass in are called **arguments**.

\`\`\`js
function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("Sam");  // "Hello, Sam!"
greet("Jordan"); // "Hello, Jordan!"
\`\`\`

Functions can also send data back using the \`return\` keyword. Once a function returns, it produces a value that can be stored in a variable or used in an expression.

\`\`\`js
function add(x, y) {
  return x + y;
}

let result = add(3, 7); // result is 10
\`\`\`

### Key Insights

- Functions let you write reusable blocks of code
- A function must be **called** to run — declaring it alone does nothing
- **Parameters** are the placeholders in a function definition; **arguments** are the real values you pass in
- \`return\` sends a value back from the function to wherever it was called`,
      instructions: `## Coding Lesson

Declare a function called \`double\` that takes one parameter called \`num\` and **returns** that number multiplied by 2.

Then, log the result of calling \`double()\` with the argument \`8\` to the console.

You can place a function call directly inside \`console.log()\`. The function call runs first, produces its return value, and _that_ value is what gets logged.

Create a function that doubles a number and returns the result.`,
      starterCode: `// Declare a function called double with parameter num


// Call the function with 8 and log the result
`,
      solution: `function double(num) {
  return num * 2;
}

console.log(double(8));`,
      testCases: []
    },
    quiz: {
      id: 'js-functions-quiz',
      title: 'Functions Knowledge Check',
      timePerQuestion: 15,
      passingScore: 66,
      questions: [
        {
          id: 'q1',
          question: 'What is the difference between a parameter and an argument?',
          options: ['They mean the same thing', 'A parameter is the placeholder in the definition; an argument is the value passed when calling', 'An argument is defined in the function; a parameter is passed when calling', 'Parameters are for strings only; arguments are for numbers only'],
          correctAnswer: 1,
          explanation: 'Parameters are placeholders in the function definition, arguments are actual values passed in.',
          emoji: '📝'
        },
        {
          id: 'q2',
          question: 'What does the return keyword do?',
          options: ['It logs a value to the console', 'It stops the function and sends a value back to the caller', 'It repeats the function', 'It declares a new variable'],
          correctAnswer: 1,
          explanation: 'return stops function execution and sends a value back to where it was called.',
          emoji: '↩️'
        },
        {
          id: 'q3',
          question: 'What will console.log(double(5)) output?\n\nfunction double(num) {\n  return num * 2;\n}',
          options: ['5', '"double"', '10', 'undefined'],
          correctAnswer: 2,
          explanation: 'double(5) returns 5 * 2 which is 10.',
          emoji: '✅'
        }
      ]
    }
  },

  // Lesson 7: Arrays
  {
    id: 'js-arrays',
    title: 'Arrays',
    description: 'Store and work with lists of data',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 25,
    activities: ['docs', 'code', 'quiz'],
    content: {
      theory: `# Lesson 7 - Arrays

## Documentation

Think of an **array** as a numbered list. While a variable is a single jar holding one thing, an array is a whole shelf of jars lined up in order, each with a position number starting at **0**. Arrays let you store multiple values in a single variable.

An array is created using square brackets \`[]\`, with values separated by commas.

\`\`\`js
let colors = ["red", "green", "blue"];
\`\`\`

Each item in the array has an **index** — its position number. Critically, arrays are **zero-indexed**, meaning the first item sits at position \`0\`, not \`1\`.

\`\`\`js
console.log(colors[0]); // "red"
console.log(colors[2]); // "blue"
\`\`\`

You can find out how many items are in an array using the \`.length\` property.

\`\`\`js
console.log(colors.length); // 3
\`\`\`

Arrays also come with built-in methods to add and remove items. \`.push()\` adds an item to the **end** of the array, and \`.pop()\` removes the **last** item.

\`\`\`js
colors.push("yellow"); // ["red", "green", "blue", "yellow"]
colors.pop();          // ["red", "green", "blue"]
\`\`\`

Arrays can hold any data type — strings, numbers, booleans, even other arrays.

### Key Insights

- Arrays store multiple values in a single variable, wrapped in \`[]\`
- Arrays are **zero-indexed** — the first element is at index \`0\`
- \`.length\` tells you how many items the array contains
- \`.push()\` adds to the end; \`.pop()\` removes from the end`,
      instructions: `## Coding Lesson

Create an array called \`fruits\` that contains three strings: any three fruits you like.

Log the **second** item in the array to the console. Then, use \`.push()\` to add a fourth fruit. Finally, log the array's \`.length\` to the console.

If the first item is at index \`0\`, what index is the _second_ item at?

Create an array of fruits and practice accessing items and using array methods.`,
      starterCode: `// Create an array called fruits with 3 fruit strings


// Log the SECOND item (remember: arrays start at 0)


// Use .push() to add a fourth fruit


// Log the length of the array
`,
      solution: `let fruits = ["apple", "banana", "orange"];
console.log(fruits[1]);
fruits.push("mango");
console.log(fruits.length);`,
      testCases: []
    },
    quiz: {
      id: 'js-arrays-quiz',
      title: 'Arrays Knowledge Check',
      timePerQuestion: 15,
      passingScore: 66,
      questions: [
        {
          id: 'q1',
          question: 'What index does the first element of an array sit at?',
          options: ['1', '0', '-1', 'It depends on the array'],
          correctAnswer: 1,
          explanation: 'Arrays are zero-indexed, so the first element is always at index 0.',
          emoji: '0️⃣'
        },
        {
          id: 'q2',
          question: 'What does .push("mango") do to an array?',
          options: ['Replaces the first item with "mango"', 'Adds "mango" to the beginning', 'Adds "mango" to the end', 'Removes "mango" from the array'],
          correctAnswer: 2,
          explanation: '.push() adds an item to the end of an array.',
          emoji: '➕'
        },
        {
          id: 'q3',
          question: 'Given let items = ["a", "b", "c"]; what does items.length return?',
          options: ['2', '3', '4', '"c"'],
          correctAnswer: 1,
          explanation: 'The array has 3 items, so .length returns 3.',
          emoji: '📏'
        }
      ]
    }
  },

  // Lesson 8: Loops
  {
    id: 'js-loops',
    title: 'Loops',
    description: 'Automate repetitive tasks with for loops',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 30,
    activities: ['docs', 'code', 'quiz'],
    content: {
      theory: `# Lesson 8 - Loops

## Documentation

Think of **loops** as putting a task on repeat. Instead of writing the same line of code ten times, you tell JavaScript: "keep doing this until I say stop." Loops are how you automate repetition.

The most common loop is the **\`for\` loop**. It has three parts packed into its parentheses, separated by semicolons:

1. **Initialization** — a starting point (usually a counter variable)
2. **Condition** — the loop keeps running as long as this is \`true\`
3. **Update** — what happens to the counter after each pass

\`\`\`js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// Outputs: 0, 1, 2, 3, 4
\`\`\`

Breaking that down: \`let i = 0\` starts the counter at zero. \`i < 5\` means "keep going while \`i\` is less than 5." \`i++\` increases \`i\` by 1 after each loop. The moment \`i\` hits 5, the condition becomes \`false\` and the loop stops.

Loops pair naturally with arrays. By using the array's \`.length\` as the condition, you can step through every item without knowing how many there are ahead of time.

\`\`\`js
let fruits = ["apple", "banana", "cherry"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
// Outputs: "apple", "banana", "cherry"
\`\`\`

\`i++\` is shorthand for \`i = i + 1\`. You'll see this pattern everywhere in JavaScript.

### Key Insights

- A \`for\` loop repeats a block of code a controlled number of times
- The three parts are: initialization, condition, and update — separated by \`;\`
- The loop runs as long as the condition evaluates to \`true\`
- \`i++\` is shorthand for incrementing the counter by 1`,
      instructions: `## Coding Lesson

Create an array called \`numbers\` with the values \`[10, 20, 30, 40, 50]\`.

Write a \`for\` loop that goes through the entire array and logs each number to the console.

Your loop counter should start at \`0\` (the first index) and keep running while it's less than the array's \`.length\`. Inside the loop, use the counter as the index: \`numbers[i]\`.

Create an array of numbers and use a for loop to log each one.`,
      starterCode: `// Create an array called numbers with [10, 20, 30, 40, 50]


// Write a for loop that logs each number
`,
      solution: `let numbers = [10, 20, 30, 40, 50];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}`,
      testCases: []
    },
    quiz: {
      id: 'js-loops-quiz',
      title: 'Loops Knowledge Check',
      timePerQuestion: 15,
      passingScore: 66,
      questions: [
        {
          id: 'q1',
          question: 'In the loop for (let i = 0; i < 3; i++), how many times will the loop run?',
          options: ['2', '3', '4', '0'],
          correctAnswer: 1,
          explanation: 'The loop runs while i < 3, so it runs for i = 0, 1, and 2 (3 times total).',
          emoji: '🔄'
        },
        {
          id: 'q2',
          question: 'What does i++ do?',
          options: ['Sets i to 0', 'Doubles the value of i', 'Increases i by 1', 'Decreases i by 1'],
          correctAnswer: 2,
          explanation: 'i++ is shorthand for i = i + 1, incrementing i by 1.',
          emoji: '➕'
        },
        {
          id: 'q3',
          question: 'What will the following code output?\n\nfor (let i = 1; i <= 3; i++) {\n  console.log(i * 10);\n}',
          options: ['1, 2, 3', '10, 20, 30', '0, 10, 20', '10, 20, 30, 40'],
          correctAnswer: 1,
          explanation: 'The loop runs for i = 1, 2, 3, outputting 10, 20, 30.',
          emoji: '🧮'
        }
      ]
    }
  }
];
