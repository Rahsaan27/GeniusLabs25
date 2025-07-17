import { Lesson, Quiz } from '@/types/lesson';

// JavaScript Curriculum
export const javascriptLessons: Lesson[] = [
  {
    id: 'js-intro-syntax',
    title: 'Getting Started with JavaScript',
    description: 'Learn what JavaScript is and how to write your first code',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 25,
    content: {
      theory: `
# Welcome to JavaScript! 🚀

JavaScript is like learning a new language that computers understand! Just like you learned English to communicate with people, you'll learn JavaScript to communicate with computers.

## What is JavaScript?
JavaScript is a programming language that makes websites interactive and fun. It's what makes:
- Buttons clickable 🖱️
- Games playable 🎮
- Videos watchable 📺
- Forms work when you type in them ✍️

## The JavaScript Console
Think of the console as your practice playground! It's where you can:
- Try out code immediately
- See results right away
- Make mistakes safely (everyone does!)
- Learn by experimenting

## How to Open the Console
1. **In Chrome/Edge**: Press F12 or right-click → "Inspect" → "Console"
2. **In Firefox**: Press F12 → "Console" tab
3. **In Safari**: Press Cmd+Option+C (Mac)

## Your First JavaScript Code
Let's start with something simple - making the computer say "Hello"!

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

This tells the computer to display "Hello, World!" in the console. Think of \`console.log()\` as the computer's way of talking to you!

## JavaScript Syntax Rules (The Grammar)
Just like English has grammar rules, JavaScript has syntax rules:

1. **Statements end with semicolons** (like periods in sentences)
   \`\`\`javascript
   console.log("Hi there!");
   \`\`\`

2. **Text goes in quotes** (single or double quotes work)
   \`\`\`javascript
   console.log('This works!');
   console.log("This also works!");
   \`\`\`

3. **Parentheses group things together**
   \`\`\`javascript
   console.log("The parentheses hold what we want to display");
   \`\`\`

4. **JavaScript is case-sensitive** (Capital letters matter!)
   \`\`\`javascript
   console.log("This works");
   Console.log("This won't work - wrong capital C!");
   \`\`\`

## Comments - Notes to Yourself
You can write notes in your code that the computer ignores:

\`\`\`javascript
// This is a comment - the computer skips this line
console.log("But the computer reads this line!");

/* This is a 
   multi-line comment
   for longer notes */
\`\`\`

Comments help you remember what your code does!
      `,
      instructions: `
Let's practice the basics! Try these in order:

1. Use console.log() to display your name
2. Write a comment explaining what your code does
3. Display your favorite color using console.log()
4. Try using both single and double quotes
      `,
      starterCode: `// Write your name here


// Write your favorite color here


// Try experimenting with different messages!
`,
      solution: `// Write your name here
console.log("My name is Alex");

// Write your favorite color here
console.log('My favorite color is blue');

// Try experimenting with different messages!
console.log("I'm learning JavaScript!");
console.log("This is awesome!");`,
      testCases: []
    },
    quiz: {
      id: 'js-intro-quiz',
      title: 'JavaScript Basics Quiz',
      timePerQuestion: 30,
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What does console.log() do? 🤔',
          options: [
            'Makes the computer sleep',
            'Displays messages in the console',
            'Deletes files',
            'Plays music'
          ],
          correctAnswer: 1,
          explanation: 'console.log() displays messages in the console - it\'s how the computer "talks" to us!',
          emoji: '💬'
        },
        {
          id: 'q2',
          question: 'Which of these will work in JavaScript? 📝',
          options: [
            'console.log("Hello");',
            'Console.log("Hello");',
            'CONSOLE.LOG("Hello");',
            'console.Log("Hello");'
          ],
          correctAnswer: 0,
          explanation: 'JavaScript is case-sensitive! Only "console.log" with lowercase letters works.',
          emoji: '🔤'
        },
        {
          id: 'q3',
          question: 'What do we use to write notes in our code? ✍️',
          options: [
            'console.log()',
            'Comments with //',
            'Parentheses ()',
            'Semicolons ;'
          ],
          correctAnswer: 1,
          explanation: 'Comments with // let us write notes that the computer ignores but help us remember what our code does!',
          emoji: '📝'
        },
        {
          id: 'q4',
          question: 'How should we end most JavaScript statements? 🎯',
          options: [
            'With a period .',
            'With an exclamation mark !',
            'With a semicolon ;',
            'With a question mark ?'
          ],
          correctAnswer: 2,
          explanation: 'Semicolons (;) end JavaScript statements, just like periods end sentences!',
          emoji: '🎯'
        }
      ]
    }
  },
  {
    id: 'js-variables',
    title: 'JavaScript Variables - Storing Information',
    description: 'Learn how to store and use information in your programs',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 30,
    content: {
      theory: `
# Variables - Your Code's Memory! 🧠

## What is a Variable?
Think of a variable like a labeled box where you can store things. Just like you might have:
- A box labeled "School Supplies" with pencils and erasers
- A box labeled "Toys" with your games
- A box labeled "Snacks" with your favorite treats

In JavaScript, variables are labeled containers that store information!

## Why Do We Need Variables?
Imagine if you had to remember your friend's phone number every time you wanted to call them, instead of just looking up their name in your contacts. Variables work like contacts in your phone - they give names to information so you can easily find and use it later!

## Creating Variables with \`let\`
The word \`let\` tells JavaScript "Hey, I want to create a new variable!"

\`\`\`javascript
let playerName = "Alex";
let playerScore = 100;
let isGameRunning = true;
\`\`\`

Think of \`let\` as saying "Let me create a variable called..."

## Variable Names - The Labels on Your Boxes
Good variable names are like good labels - they tell you exactly what's inside!

**Good Examples:**
\`\`\`javascript
let studentAge = 14;
let favoriteColor = "purple";
let numberOfPets = 2;
\`\`\`

**Not So Good Examples:**
\`\`\`javascript
let x = 14;        // What is x? We don't know!
let stuff = "purple";  // What kind of stuff?
let thing = 2;     // What thing?
\`\`\`

## Variable Naming Rules
JavaScript has some rules for naming variables (like how your name can't have spaces):

1. **Start with a letter** (not a number)
   \`\`\`javascript
   let age = 15;        // ✅ Good
   let 3cats = "Fluffy"; // ❌ Can't start with number
   \`\`\`

2. **No spaces allowed** (use camelCase instead)
   \`\`\`javascript
   let firstName = "Sam";     // ✅ Good (camelCase)
   let first name = "Sam";    // ❌ No spaces
   \`\`\`

3. **Case sensitive** (capital letters matter)
   \`\`\`javascript
   let name = "Alex";
   let Name = "Sam";    // This is a different variable!
   \`\`\`

## Types of Information Variables Can Store

### Text (Strings)
Text goes in quotes:
\`\`\`javascript
let greeting = "Hello there!";
let favoriteSong = 'Happy Birthday';
\`\`\`

### Numbers
Numbers don't need quotes:
\`\`\`javascript
let age = 13;
let temperature = 72.5;
let score = -10;
\`\`\`

### True/False (Booleans)
For yes/no questions:
\`\`\`javascript
let isStudent = true;
let hasHomework = false;
let likesIceCream = true;
\`\`\`

## Using Variables
Once you create a variable, you can use it anywhere!

\`\`\`javascript
let studentName = "Maya";
console.log("Hello, " + studentName);
console.log(studentName + " is learning JavaScript!");
\`\`\`

## Changing Variable Values
Variables can change (that's why they're called "variable"!):

\`\`\`javascript
let score = 0;
console.log("Starting score: " + score);

score = 10;  // Changed the value!
console.log("New score: " + score);

score = score + 5;  // Add 5 to current score
console.log("Final score: " + score);
\`\`\`

## Constants with \`const\`
Sometimes you have information that should never change (like your birthday). Use \`const\`:

\`\`\`javascript
const myBirthday = "January 15";
const schoolName = "Roosevelt Middle School";
\`\`\`

Think of \`const\` variables as written in permanent marker!
      `,
      instructions: `
Let's practice working with variables! Try these exercises:

1. Create a variable with your name
2. Create a variable with your age
3. Create a variable for your favorite subject
4. Use console.log() to display all three variables
5. Try changing one of the variables and display it again
      `,
      starterCode: `// Create a variable with your name
let myName = "";

// Create a variable with your age  
let myAge = 0;

// Create a variable for your favorite subject
let favoriteSubject = "";

// Display your information using console.log()


// Try changing one variable and display it again

`,
      solution: `// Create a variable with your name
let myName = "Alex";

// Create a variable with your age  
let myAge = 14;

// Create a variable for your favorite subject
let favoriteSubject = "Science";

// Display your information using console.log()
console.log("My name is " + myName);
console.log("I am " + myAge + " years old");
console.log("My favorite subject is " + favoriteSubject);

// Try changing one variable and display it again
myAge = 15;  // Had a birthday!
console.log("Now I am " + myAge + " years old");`,
      testCases: []
    },
    quiz: {
      id: 'js-variables-quiz',
      title: 'Variables Quiz',
      timePerQuestion: 30,
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What keyword do we use to create a new variable? 📦',
          options: [
            'make',
            'let',
            'create',
            'variable'
          ],
          correctAnswer: 1,
          explanation: 'We use "let" to create new variables in JavaScript!',
          emoji: '📦'
        },
        {
          id: 'q2',
          question: 'Which variable name follows JavaScript rules? ✅',
          options: [
            '2cool',
            'my age',
            'studentName',
            'class-room'
          ],
          correctAnswer: 2,
          explanation: 'studentName follows camelCase and starts with a letter - perfect!',
          emoji: '✅'
        },
        {
          id: 'q3',
          question: 'How do we store text in a variable? 📝',
          options: [
            'let name = Alex;',
            'let name = "Alex";',
            'let name = (Alex);',
            'let name = Alex;'
          ],
          correctAnswer: 1,
          explanation: 'Text (strings) must be wrapped in quotes!',
          emoji: '📝'
        },
        {
          id: 'q4',
          question: 'What happens when we do: let score = 5; score = 10; 🔄',
          options: [
            'We get an error',
            'score becomes 15',
            'score becomes 10',
            'score stays 5'
          ],
          correctAnswer: 2,
          explanation: 'Variables can change! The score becomes 10 (the new value).',
          emoji: '🔄'
        },
        {
          id: 'q5',
          question: 'When should we use const instead of let? 🔒',
          options: [
            'For values that never change',
            'For numbers only',
            'For text only',
            'We should always use let'
          ],
          correctAnswer: 0,
          explanation: 'Use const for values that should never change, like your birthday!',
          emoji: '🔒'
        }
      ]
    },
    prerequisites: ['js-intro-syntax']
  }
];

// Python Curriculum
export const pythonLessons: Lesson[] = [
  {
    id: 'python-intro-syntax',
    title: 'Getting Started with Python',
    description: 'Learn what Python is and how to write your first code',
    difficulty: 'beginner',
    language: 'python',
    estimatedTime: 25,
    content: {
      theory: `
# Welcome to Python! 🐍

Python is an amazing programming language that's perfect for beginners! It's named after "Monty Python" (a comedy group), so it's meant to be fun!

## What Makes Python Special?
Python is like the English of programming languages - it's designed to be easy to read and understand. Compare these:

**Other languages might look like:**
\`\`\`
printf("Hello, World!");
\`\`\`

**Python looks like:**
\`\`\`python
print("Hello, World!")
\`\`\`

Much cleaner, right?

## What Can You Build with Python?
- **Games** like Minecraft mods 🎮
- **Websites** like Instagram and YouTube 🌐
- **Apps** that recognize faces in photos 📱
- **Robots** that can move and think 🤖
- **Data analysis** to find cool patterns 📊

## The Python Shell/IDLE
The Python shell is your practice space! It's where you can:
- Type code and see results immediately
- Experiment with new ideas
- Test small pieces of code
- Learn by trying things out

## How to Access Python
1. **IDLE**: Comes with Python installation
2. **Command Prompt/Terminal**: Type \`python\` and press Enter
3. **Online**: Websites like repl.it or trinket.io
4. **VS Code**: With Python extension

## Your First Python Code
Let's make Python say hello!

\`\`\`python
print("Hello, World!")
\`\`\`

The \`print()\` function is like Python's voice - it displays whatever you put inside the parentheses!

## Python Syntax - The Rules
Python has some special rules that make it unique:

### 1. Indentation Matters!
Python uses spaces/tabs to group code together (like paragraphs in an essay):

\`\`\`python
if True:
    print("This line is indented")
    print("This line is also indented")
print("This line is not indented")
\`\`\`

Think of indentation like organizing your backpack - related items go in the same pocket!

### 2. No Semicolons Needed
Unlike some languages, Python doesn't need semicolons:

\`\`\`python
print("First line")
print("Second line")
print("Third line")
\`\`\`

### 3. Case Sensitive
Capital letters matter:

\`\`\`python
print("This works")
Print("This won't work - wrong capital P!")
\`\`\`

### 4. Comments for Notes
Use \`#\` to write notes:

\`\`\`python
# This is a comment - Python ignores this
print("But Python reads this!")

# Comments help you remember what your code does
print("Learning Python is fun!")  # You can also put comments here
\`\`\`

## Python's Friendly Error Messages
When you make a mistake, Python tries to help! For example:

\`\`\`python
print("Hello"  # Missing closing parenthesis
\`\`\`

Python will say something like: "SyntaxError: unexpected EOF while parsing" - it's trying to tell you about the missing parenthesis!

## Interactive Mode vs Script Mode

**Interactive Mode** (Shell): Type one line at a time
\`\`\`python
>>> print("Hello!")
Hello!
>>> print("How are you?")
How are you?
\`\`\`

**Script Mode**: Write multiple lines in a file and run it all at once
\`\`\`python
print("Hello!")
print("How are you?")
print("I'm learning Python!")
\`\`\`
      `,
      instructions: `
Let's practice Python basics! Try these in order:

1. Use print() to display your name
2. Write a comment explaining what your code does  
3. Display your grade level using print()
4. Try printing multiple lines of text
5. Experiment with both single and double quotes
      `,
      starterCode: `# Write your name here


# Write your grade level here


# Try printing multiple messages


# Experiment with quotes

`,
      solution: `# Write your name here
print("My name is Sarah")

# Write your grade level here
print("I'm in 8th grade")

# Try printing multiple messages
print("I love learning!")
print("Python is awesome!")
print("This is my first program!")

# Experiment with quotes
print('Single quotes work too')
print("Double quotes also work")`,
      testCases: []
    },
    quiz: {
      id: 'python-intro-quiz',
      title: 'Python Basics Quiz',
      timePerQuestion: 30,
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What function do we use to display text in Python? 🐍',
          options: [
            'console.log()',
            'print()',
            'display()',
            'show()'
          ],
          correctAnswer: 1,
          explanation: 'print() is Python\'s way of displaying text on the screen!',
          emoji: '🖨️'
        },
        {
          id: 'q2',
          question: 'What makes Python different from many other languages? 📏',
          options: [
            'It uses lots of semicolons',
            'Indentation (spaces/tabs) matters',
            'It only works on certain computers',
            'You can only write short programs'
          ],
          correctAnswer: 1,
          explanation: 'Python uses indentation to organize code - like using paragraphs in writing!',
          emoji: '📏'
        },
        {
          id: 'q3',
          question: 'How do we write comments in Python? 💭',
          options: [
            'Using //',
            'Using /* */',
            'Using #',
            'Using --'
          ],
          correctAnswer: 2,
          explanation: 'In Python, we use # to write comments that help explain our code!',
          emoji: '💭'
        },
        {
          id: 'q4',
          question: 'Which of these will work in Python? ✅',
          options: [
            'Print("Hello")',
            'print("Hello")',
            'PRINT("Hello")',
            'print("Hello");'
          ],
          correctAnswer: 1,
          explanation: 'Python is case-sensitive, so "print" must be lowercase. No semicolon needed!',
          emoji: '✅'
        },
        {
          id: 'q5',
          question: 'Python is named after what? 🎭',
          options: [
            'A type of snake',
            'A famous programmer',
            'Monty Python (comedy group)',
            'A computer company'
          ],
          correctAnswer: 2,
          explanation: 'Python is named after Monty Python\'s Flying Circus - that\'s why it\'s designed to be fun!',
          emoji: '🎭'
        }
      ]
    }
  },
  {
    id: 'python-variables',
    title: 'Python Variables - Storing Information',
    description: 'Learn how to store and use information in your Python programs',
    difficulty: 'beginner',
    language: 'python',
    estimatedTime: 30,
    content: {
      theory: `
# Variables in Python - Your Data Storage! 💾

## What is a Variable?
A variable is like a labeled container that holds information. Imagine your locker at school:
- It has your name on it (the variable name)
- It holds your stuff (the data)
- You can change what's inside (update the value)
- Other people know it's yours because of the label

## Creating Variables in Python
Python makes creating variables super easy - just give it a name and a value!

\`\`\`python
student_name = "Alex"
age = 14
grade_level = 8
is_honor_student = True
\`\`\`

No need for special keywords like \`let\` - Python figures it out!

## Variable Names - Make Them Clear!
Good variable names are like good nicknames - they tell you exactly who or what they're talking about.

**Great Examples:**
\`\`\`python
favorite_color = "blue"
number_of_siblings = 2
current_temperature = 75.5
has_finished_homework = True
\`\`\`

**Not So Great Examples:**
\`\`\`python
x = "blue"        # What is x?
n = 2            # What does n represent?
temp = 75.5      # Could be clearer
done = True      # Done with what?
\`\`\`

## Python Variable Naming Rules
Python has some rules (but they're pretty simple!):

1. **Use letters, numbers, and underscores**
   \`\`\`python
   student_1 = "Maya"     # ✅ Good
   user_name = "Alex"     # ✅ Good
   my-age = 15           # ❌ No dashes
   \`\`\`

2. **Start with a letter or underscore** (not a number)
   \`\`\`python
   age_15 = "fifteen"     # ✅ Good
   _secret = "hidden"     # ✅ Good (but unusual)
   15_age = "fifteen"     # ❌ Can't start with number
   \`\`\`

3. **Use snake_case** (Python's favorite style)
   \`\`\`python
   first_name = "Sam"          # ✅ Python style
   favorite_ice_cream = "vanilla"  # ✅ Easy to read
   firstName = "Sam"           # ✅ Works, but not Python style
   \`\`\`

## Types of Data Variables Can Hold

### Strings (Text)
Text information goes in quotes:
\`\`\`python
greeting = "Hello there!"
favorite_book = 'Harry Potter'
message = "I'm learning Python!"
\`\`\`

**Fun String Facts:**
- Single quotes ('') and double quotes ("") both work
- Use triple quotes for long text:
\`\`\`python
long_message = """This is a very long message
that goes across multiple lines
and is still just one string!"""
\`\`\`

### Numbers
Python handles two types of numbers:

**Integers (whole numbers):**
\`\`\`python
age = 14
score = 100
temperature = -5
\`\`\`

**Floats (decimal numbers):**
\`\`\`python
height = 5.6
price = 12.99
pi = 3.14159
\`\`\`

### Booleans (True/False)
For yes/no, on/off, true/false situations:
\`\`\`python
is_student = True
has_pet = False
likes_pizza = True
is_raining = False
\`\`\`

**Remember:** \`True\` and \`False\` must be capitalized!

## Using Variables
Once you create a variable, you can use it anywhere!

\`\`\`python
name = "Jordan"
age = 13

print("Hello, my name is " + name)
print("I am " + str(age) + " years old")  # Need str() to combine number with text
print(f"Hi! I'm {name} and I'm {age}")    # Modern Python way (f-strings)
\`\`\`

## Changing Variable Values
Variables can change - that's their superpower!

\`\`\`python
score = 0
print("Starting score:", score)

score = 10
print("After first level:", score)

score = score + 5    # Add 5 to current score
print("Bonus points added:", score)

score += 10          # Shortcut for adding
print("Final score:", score)
\`\`\`

## Getting Input from Users
Make your programs interactive!

\`\`\`python
name = input("What's your name? ")
print("Nice to meet you, " + name + "!")

age = input("How old are you? ")
print("Wow, " + age + " is a great age!")
\`\`\`

**Important:** \`input()\` always gives you text (string), even if someone types a number!

\`\`\`python
age_text = input("Your age: ")    # This is text
age_number = int(age_text)        # Convert to number
print("Next year you'll be", age_number + 1)
\`\`\`

## Variable Math
You can do math with number variables:

\`\`\`python
a = 10
b = 3

sum_result = a + b        # Addition: 13
difference = a - b        # Subtraction: 7
product = a * b           # Multiplication: 30
division = a / b          # Division: 3.333...
whole_division = a // b   # Whole number division: 3
remainder = a % b         # Remainder: 1
power = a ** b            # Exponent (10 to the 3rd power): 1000
\`\`\`
      `,
      instructions: `
Let's practice Python variables! Complete these tasks:

1. Create variables for your name, age, and favorite hobby
2. Use print() to display them nicely
3. Ask the user for their favorite color using input()
4. Try some math with numbers
5. Create a boolean variable about yourself
      `,
      starterCode: `# Create variables about yourself
my_name = ""
my_age = 0
favorite_hobby = ""

# Display your information


# Ask user for their favorite color
favorite_color = input("What's your favorite color? ")

# Try some math
num1 = 15
num2 = 4
# Calculate sum, difference, and product


# Create a boolean variable
loves_python = True

`,
      solution: `# Create variables about yourself
my_name = "Alex"
my_age = 14
favorite_hobby = "reading"

# Display your information
print("My name is", my_name)
print(f"I am {my_age} years old")
print("My favorite hobby is " + favorite_hobby)

# Ask user for their favorite color
favorite_color = input("What's your favorite color? ")
print(f"Cool! {favorite_color} is a beautiful color!")

# Try some math
num1 = 15
num2 = 4
sum_result = num1 + num2
difference = num1 - num2
product = num1 * num2

print("Sum:", sum_result)
print("Difference:", difference)
print("Product:", product)

# Create a boolean variable
loves_python = True
print("Do I love Python?", loves_python)`,
      testCases: []
    },
    quiz: {
      id: 'python-variables-quiz',
      title: 'Python Variables Quiz',
      timePerQuestion: 30,
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'How do we create a variable in Python? 🏗️',
          options: [
            'let name = "Alex"',
            'var name = "Alex"',
            'name = "Alex"',
            'create name = "Alex"'
          ],
          correctAnswer: 2,
          explanation: 'Python makes it simple - just use the variable name and assign a value!',
          emoji: '🏗️'
        },
        {
          id: 'q2',
          question: 'Which variable name follows Python style? 🐍',
          options: [
            'firstName',
            'first_name',
            'FirstName',
            'first-name'
          ],
          correctAnswer: 1,
          explanation: 'Python uses snake_case - words separated by underscores!',
          emoji: '🐍'
        },
        {
          id: 'q3',
          question: 'What does input() always give you? 📝',
          options: [
            'A number',
            'A boolean',
            'Text (string)',
            'It depends on what the user types'
          ],
          correctAnswer: 2,
          explanation: 'input() always returns text, even if someone types a number!',
          emoji: '📝'
        },
        {
          id: 'q4',
          question: 'How do you write True and False in Python? ✅',
          options: [
            'true and false',
            'TRUE and FALSE',
            'True and False',
            '"True" and "False"'
          ],
          correctAnswer: 2,
          explanation: 'Booleans in Python must be capitalized: True and False!',
          emoji: '✅'
        },
        {
          id: 'q5',
          question: 'What does score += 5 mean? 🔢',
          options: [
            'Set score to 5',
            'Check if score equals 5',
            'Add 5 to the current score',
            'Subtract 5 from score'
          ],
          correctAnswer: 2,
          explanation: '+= is a shortcut for adding to a variable: score = score + 5',
          emoji: '🔢'
        }
      ]
    },
    prerequisites: ['python-intro-syntax']
  }
];