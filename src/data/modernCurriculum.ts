import { Lesson, Quiz } from '@/types/lesson';

// Modern, Short-Form JavaScript Curriculum
export const modernJavascriptLessons: Lesson[] = [
  {
    id: 'js-intro-syntax-modern',
    title: 'Your First JavaScript Code! 🚀',
    description: 'Write your very first line of code and see the magic happen',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 15,
    content: {
      theory: `
# Let's Write Some Code! 🎉

## Ready to talk to a computer? Let's do this! 💪

JavaScript is like texting with your computer. You type a message, and it responds!

## Your Mission: Make the Computer Say "Hello!"

Here's the magic spell:

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

### What just happened? 🤔
- \`console.log()\` = Computer's voice box 📢
- The text in quotes = What you want it to say 💬
- The semicolon = Period at the end of a sentence ⏹️

## Try it yourself! 👇

Change "Hello, World!" to anything you want. Make it say:
- Your name
- Your favorite food
- Something funny!

## 🔥 Pro Tip: Use quotes!
- \`"Hello"\` ✅ Works!
- \`Hello\` ❌ Computer gets confused!

Ready to become a code wizard? Let's go! ✨
      `,
      instructions: `
🎯 Your Challenge:
1. Make the console say "Hello!" with your name
2. Add a second line that says your favorite color
3. Try making it say something funny!

💡 Remember: Put your text in quotes!
      `,
      starterCode: `// Type your code here! 
// Make the computer say hello to you 👋

`,
      solution: `// Type your code here! 
// Make the computer say hello to you 👋
console.log("Hello! My name is Alex");
console.log("My favorite color is blue");
console.log("JavaScript is awesome!");`,
      testCases: []
    },
    quiz: {
      id: 'js-intro-quiz-modern',
      title: 'Quick Check! 🧠',
      timePerQuestion: 25,
      passingScore: 75,
      questions: [
        {
          id: 'q1',
          question: 'What makes the computer "talk" to us? 🗣️',
          options: [
            'console.log()',
            'computer.talk()',
            'speak()',
            'say()'
          ],
          correctAnswer: 0,
          explanation: 'console.log() is how we make the computer display messages!',
          emoji: '📢'
        },
        {
          id: 'q2',
          question: 'Which one will work? 💪',
          options: [
            'console.log(Hello)',
            'console.log("Hello")',
            'Console.Log("Hello")',
            'print("Hello")'
          ],
          correctAnswer: 1,
          explanation: 'Text must be in quotes, and JavaScript is case-sensitive!',
          emoji: '✅'
        },
        {
          id: 'q3',
          question: 'What goes at the end of most JavaScript lines? 📝',
          options: [
            'Period (.)',
            'Semicolon (;)',
            'Comma (,)',
            'Nothing!'
          ],
          correctAnswer: 1,
          explanation: 'Semicolons end JavaScript statements - like periods in sentences!',
          emoji: '⏹️'
        }
      ]
    }
  },
  {
    id: 'js-variables-modern',
    title: 'Memory Boxes (Variables) 📦',
    description: 'Learn to store information like a pro programmer',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 20,
    content: {
      theory: `
# Variables = Your Code's Memory! 🧠

## Think of variables like labeled boxes 📦

Imagine you have magic boxes that can store anything:
- A box labeled "name" holds your name
- A box labeled "age" holds your age  
- A box labeled "score" holds your game score

## Creating Your First Variable! ✨

\`\`\`javascript
let playerName = "Alex";
\`\`\`

### Breaking it down:
- \`let\` = "Hey computer, make me a new box!"
- \`playerName\` = The label on the box
- \`=\` = "Put this inside"
- \`"Alex"\` = What goes in the box

## 🔥 Variable Superpowers!

Once you make a variable, you can use it anywhere:

\`\`\`javascript
let name = "Maya";
console.log("Hello " + name + "!");
console.log(name + " is learning JavaScript!");
\`\`\`

## ⚡ Quick Check: What type of data?

- Text (words): \`"Hello"\` ← Use quotes!
- Numbers: \`42\` ← No quotes needed!
- True/False: \`true\` or \`false\` ← Special words!

## 💪 Variables can change!

\`\`\`javascript
let score = 0;
score = 10;    // Changed it!
score = 25;    // Changed again!
\`\`\`

Ready to build your own variables? Let's go! 🚀
      `,
      instructions: `
🎯 Your Mission:
1. Create a variable with your name
2. Create a variable with your favorite number
3. Use console.log() to display both
4. Try changing one of them!

⚡ Bonus: Make the computer say a complete sentence using your variables!
      `,
      starterCode: `// Create your variables here! 🎯
// Example: let myName = "Your Name";



// Display them with console.log()


// Try changing a variable and display it again!

`,
      solution: `// Create your variables here! 🎯
let myName = "Alex";
let favoriteNumber = 7;
let isAwesome = true;

// Display them with console.log()
console.log("My name is " + myName);
console.log("My favorite number is " + favoriteNumber);
console.log("Am I awesome? " + isAwesome);

// Try changing a variable and display it again!
favoriteNumber = 10;
console.log("Actually, my new favorite number is " + favoriteNumber);`,
      testCases: []
    },
    quiz: {
      id: 'js-variables-quiz-modern',
      title: 'Variable Master Quiz! 🏆',
      timePerQuestion: 25,
      passingScore: 75,
      questions: [
        {
          id: 'q1',
          question: 'How do you create a new variable? 📦',
          options: [
            'make myVariable = 5',
            'let myVariable = 5',
            'create myVariable = 5',
            'new myVariable = 5'
          ],
          correctAnswer: 1,
          explanation: '"let" is the magic word to create new variables!',
          emoji: '✨'
        },
        {
          id: 'q2',
          question: 'Which stores text correctly? 📝',
          options: [
            'let name = Alex',
            'let name = "Alex"',
            'let name = (Alex)',
            'let "name" = Alex'
          ],
          correctAnswer: 1,
          explanation: 'Text must be wrapped in quotes!',
          emoji: '💬'
        },
        {
          id: 'q3',
          question: 'Can variables change their value? 🔄',
          options: [
            'No, never!',
            'Only once',
            'Yes, anytime!',
            'Only on Tuesdays'
          ],
          correctAnswer: 2,
          explanation: 'Variables can change as many times as you want - that\'s their superpower!',
          emoji: '💪'
        },
        {
          id: 'q4',
          question: 'Which variable name is best? 🎯',
          options: [
            'x',
            'thing1',
            'playerScore',
            'a'
          ],
          correctAnswer: 2,
          explanation: 'Good variable names tell you exactly what they store!',
          emoji: '🏷️'
        }
      ]
    }
  }
];

// Modern, Short-Form Python Curriculum
export const modernPythonLessons: Lesson[] = [
  {
    id: 'python-intro-syntax-modern',
    title: 'Python Power! 🐍⚡',
    description: 'Your first Python spell - make the computer obey!',
    difficulty: 'beginner',
    language: 'python',
    estimatedTime: 15,
    content: {
      theory: `
# Welcome to Python Magic! ✨🐍

## Python = The easiest programming language ever! 

Python is so friendly, it almost reads like English!

## Your First Python Spell 🪄

\`\`\`python
print("Hello, World!")
\`\`\`

### What's happening here? 🤔
- \`print()\` = Python's way of talking to you 🗣️
- The text in quotes = Your message 💌
- No semicolon needed! = Python keeps it simple ✨

## 🔥 Python is CLEAN!

Compare this to other languages:
- Other languages: \`printf("Hello");\` 😵
- Python: \`print("Hello")\` 😎

Much better, right?

## 💡 Python Fun Facts:
- Named after Monty Python (the comedy group!) 🎭
- Used by Instagram, YouTube, Netflix 📱
- Super beginner-friendly 🤗

## Try Different Messages! 🎨

\`\`\`python
print("I'm learning Python!")
print("This is awesome!")
print("🐍 Python rocks! 🐍")
\`\`\`

Ready to become a Python wizard? Let's code! 🚀
      `,
      instructions: `
🎯 Your First Python Challenge:
1. Make Python say your name
2. Make it say your grade
3. Make it say something cool about Python!

🌟 Pro tip: Use quotes for text, just like texting!
      `,
      starterCode: `# Your Python adventure starts here! 🐍
# Use print() to make Python talk

`,
      solution: `# Your Python adventure starts here! 🐍
# Use print() to make Python talk
print("My name is Alex")
print("I'm in 8th grade")
print("Python is the coolest programming language!")
print("🐍 I'm becoming a Python master! 🐍")`,
      testCases: []
    },
    quiz: {
      id: 'python-intro-quiz-modern',
      title: 'Python Basics Check! 🧠',
      timePerQuestion: 25,
      passingScore: 75,
      questions: [
        {
          id: 'q1',
          question: 'How does Python display messages? 🐍',
          options: [
            'console.log()',
            'print()',
            'display()',
            'show()'
          ],
          correctAnswer: 1,
          explanation: 'print() is Python\'s way of showing text on screen!',
          emoji: '🖨️'
        },
        {
          id: 'q2',
          question: 'Which will work in Python? ✅',
          options: [
            'Print("Hello")',
            'print("Hello")',
            'PRINT("Hello")',
            'print("Hello");'
          ],
          correctAnswer: 1,
          explanation: 'Python is case-sensitive and doesn\'t need semicolons!',
          emoji: '🎯'
        },
        {
          id: 'q3',
          question: 'Python is named after... 🎭',
          options: [
            'A snake',
            'A programmer',
            'Monty Python comedy',
            'A company'
          ],
          correctAnswer: 2,
          explanation: 'Python is named after Monty Python\'s Flying Circus - that\'s why it\'s fun!',
          emoji: '🎪'
        }
      ]
    }
  },
  {
    id: 'python-variables-modern',
    title: 'Python Memory Magic! 🧙‍♂️📦',
    description: 'Store data like a wizard with Python variables',
    difficulty: 'beginner',
    language: 'python',
    estimatedTime: 20,
    content: {
      theory: `
# Variables = Your Data Superpowers! 🦸‍♂️

## Think of variables as magic containers! ✨

Each container has:
- A name (the label) 🏷️
- Contents (your data) 📦
- The ability to change! 🔄

## Creating Python Variables (Super Easy!) 

\`\`\`python
name = "Maya"
age = 14
is_student = True
\`\`\`

### No special words needed! 
- Just: \`name = value\`
- Python figures out the rest! 🧠

## 🔥 Python Variable Superpowers!

### Store Different Types:
- **Text**: \`favorite_food = "pizza"\`
- **Numbers**: \`score = 100\`
- **True/False**: \`loves_coding = True\`

### Use Them Anywhere:
\`\`\`python
player = "Alex"
print("Hello " + player + "!")
print(player + " is learning Python!")
\`\`\`

## 💪 Variables Change Like Magic!

\`\`\`python
score = 0
print("Starting score:", score)

score = 50
print("New score:", score)

score = score + 25  # Add to itself!
print("Final score:", score)
\`\`\`

## 🎮 Interactive Input!

Make your programs talk back:

\`\`\`python
name = input("What's your name? ")
print("Nice to meet you, " + name + "!")
\`\`\`

Ready to master Python variables? Let's go! 🚀
      `,
      instructions: `
🎯 Python Variable Challenge:
1. Create variables for your name, age, and favorite hobby
2. Display them with print()
3. Ask the user a question with input()
4. Try some math with numbers!

⚡ Bonus: Make Python have a conversation with you!
      `,
      starterCode: `# Python Variable Adventure! 🐍✨
# Create your variables here



# Display them nicely


# Try asking the user something
favorite_color = input("What's your favorite color? ")

# Do some math magic!
number1 = 10
number2 = 5
# Calculate and display the sum

`,
      solution: `# Python Variable Adventure! 🐍✨
# Create your variables here
my_name = "Alex"
my_age = 14
hobby = "gaming"

# Display them nicely
print("Hi! My name is " + my_name)
print("I am " + str(my_age) + " years old")
print("I love " + hobby + "!")

# Try asking the user something
favorite_color = input("What's your favorite color? ")
print("Wow! " + favorite_color + " is an amazing color!")

# Do some math magic!
number1 = 10
number2 = 5
sum_result = number1 + number2
print("Math magic:", number1, "+", number2, "=", sum_result)`,
      testCases: []
    },
    quiz: {
      id: 'python-variables-quiz-modern',
      title: 'Python Variable Master! 🏆',
      timePerQuestion: 25,
      passingScore: 75,
      questions: [
        {
          id: 'q1',
          question: 'How do you create a Python variable? 📦',
          options: [
            'let name = "Alex"',
            'var name = "Alex"',
            'name = "Alex"',
            'create name = "Alex"'
          ],
          correctAnswer: 2,
          explanation: 'Python keeps it simple - just name = value!',
          emoji: '✨'
        },
        {
          id: 'q2',
          question: 'What does input() always give you? 📝',
          options: [
            'A number',
            'Text (string)',
            'True or False',
            'It depends'
          ],
          correctAnswer: 1,
          explanation: 'input() always returns text, even if someone types numbers!',
          emoji: '💬'
        },
        {
          id: 'q3',
          question: 'Which variable name is most Pythonic? 🐍',
          options: [
            'firstName',
            'first_name',
            'FirstName',
            'first-name'
          ],
          correctAnswer: 1,
          explanation: 'Python loves snake_case - words separated by underscores!',
          emoji: '🐍'
        },
        {
          id: 'q4',
          question: 'Can you change a variable after creating it? 🔄',
          options: [
            'Never!',
            'Only once',
            'Yes, anytime!',
            'Only numbers'
          ],
          correctAnswer: 2,
          explanation: 'Variables are flexible - change them whenever you want!',
          emoji: '💪'
        }
      ]
    }
  }
];