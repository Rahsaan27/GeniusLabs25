import { Lesson, Quiz } from '@/types/lesson';

// Simple Step-by-Step JavaScript Curriculum
export const simpleJavascriptLessons: Lesson[] = [
  {
    id: 'js-hello-world',
    title: 'Your First JavaScript Code',
    description: 'Learn to make the computer say "Hello World" step by step',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 10,
    content: {
      theory: `
# Step 1: Your First JavaScript Code

## What we're doing today:
Making the computer say "Hello World!"

## The Magic Command:
\`\`\`javascript
console.log("Hello World!");
\`\`\`

## Let's break it down:
- \`console.log()\` = tells the computer to display something
- \`"Hello World!"\` = the message (must be in quotes)
- \`;\` = ends the command (like a period)

## Step-by-step:
1. Type: \`console.log(\`
2. Add quotes: \`console.log(""\`
3. Write your message: \`console.log("Hello World!"\`
4. Close it: \`console.log("Hello World!");\`

That's it! You're now a programmer! 🎉
      `,
      instructions: `
Follow these steps:
1. Type console.log("Hello World!");
2. Click "Run Code" to see it work
3. Try changing the message to your name
      `,
      starterCode: `// Step 1: Type the hello world command here


`,
      solution: `// Step 1: Type the hello world command here
console.log("Hello World!");`,
      testCases: []
    },
    quiz: {
      id: 'js-hello-quiz',
      title: 'Hello World Quiz',
      timePerQuestion: 30,
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What command makes the computer display text?',
          options: [
            'print()',
            'console.log()',
            'display()',
            'show()'
          ],
          correctAnswer: 1,
          explanation: 'console.log() is JavaScript\'s way to display text!',
          emoji: '💻'
        },
        {
          id: 'q2',
          question: 'How do you write text in JavaScript?',
          options: [
            'Hello World',
            '"Hello World"',
            '(Hello World)',
            '[Hello World]'
          ],
          correctAnswer: 1,
          explanation: 'Text must be wrapped in quotes!',
          emoji: '📝'
        }
      ]
    }
  },
  {
    id: 'js-variables-simple',
    title: 'Storing Information (Variables)',
    description: 'Learn to store and use information in your code',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 15,
    content: {
      theory: `
# Step 2: Storing Information

## What is a variable?
A variable is like a box with a label that stores information.

## How to make a variable:
\`\`\`javascript
let name = "Alex";
\`\`\`

## Step-by-step:
1. Type \`let\` (this creates a new box)
2. Give it a name: \`let name\`
3. Add \`=\` (this means "put inside")
4. Add your information: \`let name = "Alex"\`
5. End with \`;\`: \`let name = "Alex";\`

## Using your variable:
\`\`\`javascript
let name = "Alex";
console.log(name);
\`\`\`

This will display: Alex

## Try different types:
- Text: \`let name = "Alex";\`
- Numbers: \`let age = 15;\`
- True/False: \`let isStudent = true;\`
      `,
      instructions: `
Follow these steps:
1. Create a variable with your name
2. Create a variable with your age  
3. Use console.log() to display both
      `,
      starterCode: `// Step 1: Create a variable with your name
let name = "";

// Step 2: Create a variable with your age
let age = 0;

// Step 3: Display them


`,
      solution: `// Step 1: Create a variable with your name
let name = "Alex";

// Step 2: Create a variable with your age
let age = 15;

// Step 3: Display them
console.log(name);
console.log(age);`,
      testCases: []
    },
    quiz: {
      id: 'js-variables-simple-quiz',
      title: 'Variables Quiz',
      timePerQuestion: 30,
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'How do you create a variable?',
          options: [
            'make name = "Alex"',
            'let name = "Alex"',
            'variable name = "Alex"',
            'create name = "Alex"'
          ],
          correctAnswer: 1,
          explanation: 'Use "let" to create variables in JavaScript!',
          emoji: '📦'
        },
        {
          id: 'q2',
          question: 'How do you store text?',
          options: [
            'let name = Alex',
            'let name = "Alex"',
            'let name = (Alex)',
            'let name = [Alex]'
          ],
          correctAnswer: 1,
          explanation: 'Text must be in quotes!',
          emoji: '📝'
        }
      ]
    }
  }
];

// Simple Step-by-Step Python Curriculum
export const simplePythonLessons: Lesson[] = [
  {
    id: 'python-hello-world',
    title: 'Your First Python Code',
    description: 'Learn to make Python say "Hello World" step by step',
    difficulty: 'beginner',
    language: 'python',
    estimatedTime: 10,
    content: {
      theory: `
# Step 1: Your First Python Code

## What we're doing today:
Making Python say "Hello World!"

## The Magic Command:
\`\`\`python
print("Hello World!")
\`\`\`

## Let's break it down:
- \`print()\` = tells Python to display something
- \`"Hello World!"\` = the message (must be in quotes)
- No semicolon needed! (Python is simple)

## Step-by-step:
1. Type: \`print(\`
2. Add quotes: \`print(""\`
3. Write your message: \`print("Hello World!"\`
4. Close it: \`print("Hello World!")\`

That's it! You're now a Python programmer! 🐍
      `,
      instructions: `
Follow these steps:
1. Type print("Hello World!")
2. Click "Run Code" to see it work
3. Try changing the message to your name
      `,
      starterCode: `# Step 1: Type the hello world command here


`,
      solution: `# Step 1: Type the hello world command here
print("Hello World!")`,
      testCases: []
    },
    quiz: {
      id: 'python-hello-quiz',
      title: 'Hello World Quiz',
      timePerQuestion: 30,
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What command makes Python display text?',
          options: [
            'console.log()',
            'print()',
            'display()',
            'show()'
          ],
          correctAnswer: 1,
          explanation: 'print() is Python\'s way to display text!',
          emoji: '🐍'
        },
        {
          id: 'q2',
          question: 'How do you write text in Python?',
          options: [
            'Hello World',
            '"Hello World"',
            '(Hello World)',
            '[Hello World]'
          ],
          correctAnswer: 1,
          explanation: 'Text must be wrapped in quotes!',
          emoji: '📝'
        }
      ]
    }
  },
  {
    id: 'python-variables-simple',
    title: 'Storing Information (Variables)',
    description: 'Learn to store and use information in Python',
    difficulty: 'beginner',
    language: 'python',
    estimatedTime: 15,
    content: {
      theory: `
# Step 2: Storing Information

## What is a variable?
A variable is like a box with a label that stores information.

## How to make a variable:
\`\`\`python
name = "Alex"
\`\`\`

## Step-by-step:
1. Choose a name: \`name\`
2. Add \`=\` (this means "store")
3. Add your information: \`name = "Alex"\`
4. That's it! (No semicolon needed)

## Using your variable:
\`\`\`python
name = "Alex"
print(name)
\`\`\`

This will display: Alex

## Try different types:
- Text: \`name = "Alex"\`
- Numbers: \`age = 15\`
- True/False: \`is_student = True\`
      `,
      instructions: `
Follow these steps:
1. Create a variable with your name
2. Create a variable with your age  
3. Use print() to display both
      `,
      starterCode: `# Step 1: Create a variable with your name
name = ""

# Step 2: Create a variable with your age
age = 0

# Step 3: Display them


`,
      solution: `# Step 1: Create a variable with your name
name = "Alex"

# Step 2: Create a variable with your age
age = 15

# Step 3: Display them
print(name)
print(age)`,
      testCases: []
    },
    quiz: {
      id: 'python-variables-simple-quiz',
      title: 'Variables Quiz',
      timePerQuestion: 30,
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'How do you create a variable in Python?',
          options: [
            'let name = "Alex"',
            'name = "Alex"',
            'var name = "Alex"',
            'create name = "Alex"'
          ],
          correctAnswer: 1,
          explanation: 'Python makes it simple - just name = value!',
          emoji: '📦'
        },
        {
          id: 'q2',
          question: 'How do you store text in Python?',
          options: [
            'name = Alex',
            'name = "Alex"',
            'name = (Alex)',
            'name = [Alex]'
          ],
          correctAnswer: 1,
          explanation: 'Text must be in quotes!',
          emoji: '📝'
        }
      ]
    }
  }
];