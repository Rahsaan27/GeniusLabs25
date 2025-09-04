import { Lesson, Module } from '@/types/lesson';
import { modernJavascriptLessons, modernPythonLessons } from './modernCurriculum';
import { shortFormLessons, shortFormModules } from './shortFormLessons';

export const lessons: Lesson[] = [
  ...shortFormLessons, // New short-form technical lessons
  ...modernJavascriptLessons,
  ...modernPythonLessons,
  // Keep the old lessons for now but they'll be replaced
  /*
  {
    id: 'js-variables',
    title: 'JavaScript Variables',
    description: 'Learn how to declare and use variables in JavaScript',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 15,
    content: {
      theory: `
# JavaScript Variables

Variables are containers for storing data values. In JavaScript, you can declare variables using three keywords:

- **let**: Block-scoped variable that can be reassigned
- **const**: Block-scoped variable that cannot be reassigned
- **var**: Function-scoped variable (older syntax)

## Examples:
\`\`\`javascript
let name = "John";
const age = 25;
var city = "New York";
\`\`\`

## Rules:
- Variable names must start with a letter, underscore, or dollar sign
- They can contain letters, numbers, underscores, and dollar signs
- They are case-sensitive
      `,
      instructions: `
Create three variables:
1. A \`let\` variable called \`userName\` with your name
2. A \`const\` variable called \`birthYear\` with a birth year
3. Calculate and store the current age in a variable called \`currentAge\`
      `,
      starterCode: `// Declare your variables here
let userName = "";
const birthYear = 0;
let currentAge = 0;

// Don't modify this line - it's for testing
console.log(userName, birthYear, currentAge);`,
      solution: `// Declare your variables here
let userName = "John";
const birthYear = 1998;
let currentAge = 2024 - birthYear;

// Don't modify this line - it's for testing
console.log(userName, birthYear, currentAge);`,
      testCases: [
        {
          id: 'test-1',
          input: '',
          expectedOutput: 'Variables should be declared with correct values',
          description: 'Check if variables are properly declared'
        }
      ]
    }
  },
  {
    id: 'js-functions',
    title: 'JavaScript Functions',
    description: 'Learn how to create and use functions in JavaScript',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 20,
    content: {
      theory: `
# JavaScript Functions

Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.

## Function Declaration:
\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}
\`\`\`

## Function Expression:
\`\`\`javascript
const greet = function(name) {
  return "Hello, " + name + "!";
};
\`\`\`

## Arrow Function:
\`\`\`javascript
const greet = (name) => {
  return "Hello, " + name + "!";
};
\`\`\`
      `,
      instructions: `
Create a function called \`calculateArea\` that:
1. Takes two parameters: \`width\` and \`height\`
2. Returns the area (width × height)
3. Call the function with values 5 and 3
      `,
      starterCode: `// Create your function here
function calculateArea(width, height) {
  // Your code here
}

// Call the function and store the result
const area = calculateArea(5, 3);
console.log(area);`,
      solution: `// Create your function here
function calculateArea(width, height) {
  return width * height;
}

// Call the function and store the result
const area = calculateArea(5, 3);
console.log(area);`,
      testCases: [
        {
          id: 'test-1',
          input: 'calculateArea(5, 3)',
          expectedOutput: '15',
          description: 'Function should return correct area calculation'
        }
      ]
    },
    prerequisites: ['js-variables']
  },
  {
    id: 'js-loops',
    title: 'JavaScript Loops',
    description: 'Learn how to use loops to repeat code execution',
    difficulty: 'beginner',
    language: 'javascript',
    estimatedTime: 25,
    content: {
      theory: `
# JavaScript Loops

Loops allow you to repeat code multiple times. JavaScript has several types of loops:

## For Loop:
\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
\`\`\`

## While Loop:
\`\`\`javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
\`\`\`

## For...of Loop (for arrays):
\`\`\`javascript
const fruits = ['apple', 'banana', 'orange'];
for (const fruit of fruits) {
  console.log(fruit);
}
\`\`\`
      `,
      instructions: `
Create a function called \`countToNumber\` that:
1. Takes a parameter called \`num\`
2. Uses a for loop to count from 1 to that number
3. Returns an array containing all numbers from 1 to num
      `,
      starterCode: `// Create your function here
function countToNumber(num) {
  const numbers = [];
  // Your for loop here
  
  return numbers;
}

// Test your function
const result = countToNumber(5);
console.log(result);`,
      solution: `// Create your function here
function countToNumber(num) {
  const numbers = [];
  for (let i = 1; i <= num; i++) {
    numbers.push(i);
  }
  return numbers;
}

// Test your function
const result = countToNumber(5);
console.log(result);`,
      testCases: [
        {
          id: 'test-1',
          input: 'countToNumber(5)',
          expectedOutput: '[1, 2, 3, 4, 5]',
          description: 'Function should return array with numbers 1 to 5'
        }
      ]
    },
    prerequisites: ['js-variables', 'js-functions']
  },
  {
    id: 'js-arrays',
    title: 'JavaScript Arrays',
    description: 'Learn how to work with arrays in JavaScript',
    difficulty: 'intermediate',
    language: 'javascript',
    estimatedTime: 20,
    content: {
      theory: `
# JavaScript Arrays

Arrays are used to store multiple values in a single variable. They are ordered lists of elements.

## Creating Arrays:
\`\`\`javascript
const fruits = ["apple", "banana", "orange"];
const numbers = [1, 2, 3, 4, 5];
const mixed = ["hello", 42, true];
\`\`\`

## Array Methods:
- **push()**: Add element to end
- **pop()**: Remove last element
- **shift()**: Remove first element
- **unshift()**: Add element to beginning
- **length**: Get array length

## Examples:
\`\`\`javascript
fruits.push("grape");
const lastFruit = fruits.pop();
console.log(fruits.length);
\`\`\`
      `,
      instructions: `
Create an array called \`colors\` with 3 color names, then:
1. Add "purple" to the end using push()
2. Remove the first color using shift()
3. Print the final array and its length
      `,
      starterCode: `// Create your array here
const colors = [];

// Add "purple" to the end

// Remove the first color

// Print the array and its length
console.log(colors);
console.log("Length:", colors.length);`,
      solution: `// Create your array here
const colors = ["red", "green", "blue"];

// Add "purple" to the end
colors.push("purple");

// Remove the first color
colors.shift();

// Print the array and its length
console.log(colors);
console.log("Length:", colors.length);`,
      testCases: [
        {
          id: 'test-1',
          input: '',
          expectedOutput: 'Array should be modified correctly',
          description: 'Check if array operations work correctly'
        }
      ]
    }
  },
  {
    id: 'js-objects',
    title: 'JavaScript Objects',
    description: 'Learn how to create and use objects in JavaScript',
    difficulty: 'intermediate',
    language: 'javascript',
    estimatedTime: 25,
    content: {
      theory: `
# JavaScript Objects

Objects are collections of key-value pairs. They allow you to group related data and functions together.

## Creating Objects:
\`\`\`javascript
const person = {
  name: "John",
  age: 30,
  city: "New York"
};
\`\`\`

## Accessing Properties:
\`\`\`javascript
console.log(person.name);        // Dot notation
console.log(person["age"]);      // Bracket notation
\`\`\`

## Adding/Modifying Properties:
\`\`\`javascript
person.job = "Developer";        // Add new property
person.age = 31;                 // Modify existing property
\`\`\`
      `,
      instructions: `
Create an object called \`car\` with properties:
1. brand (string)
2. model (string)
3. year (number)
4. Add a new property \`color\` after creation
5. Print the complete object
      `,
      starterCode: `// Create your car object here
const car = {
  // Add properties here
};

// Add color property

// Print the object
console.log(car);`,
      solution: `// Create your car object here
const car = {
  brand: "Toyota",
  model: "Camry",
  year: 2022
};

// Add color property
car.color = "blue";

// Print the object
console.log(car);`,
      testCases: [
        {
          id: 'test-1',
          input: '',
          expectedOutput: 'Object should have all required properties',
          description: 'Check if object is created correctly'
        }
      ]
    }
  },
  {
    id: 'python-variables',
    title: 'Python Variables',
    description: 'Learn how to work with variables in Python',
    difficulty: 'beginner',
    language: 'python',
    estimatedTime: 15,
    content: {
      theory: `
# Python Variables

Variables in Python are created when you assign a value to them. Python is dynamically typed, so you don't need to declare the type.

## Examples:
\`\`\`python
name = "Alice"
age = 30
height = 5.6
is_student = True
\`\`\`

## Variable Types:
- **str**: String (text)
- **int**: Integer (whole numbers)
- **float**: Float (decimal numbers)
- **bool**: Boolean (True/False)

## Rules:
- Variable names must start with a letter or underscore
- They can contain letters, numbers, and underscores
- They are case-sensitive
- Use snake_case for variable names
      `,
      instructions: `
Create the following variables:
1. A string variable \`student_name\` with your name
2. An integer variable \`current_year\` with the current year
3. A float variable \`gpa\` with a GPA value
4. A boolean variable \`is_enrolled\` set to True
      `,
      starterCode: `# Create your variables here
student_name = ""
current_year = 0
gpa = 0.0
is_enrolled = False

# Print all variables
print(student_name, current_year, gpa, is_enrolled)`,
      solution: `# Create your variables here
student_name = "Alice"
current_year = 2024
gpa = 3.8
is_enrolled = True

# Print all variables
print(student_name, current_year, gpa, is_enrolled)`,
      testCases: [
        {
          id: 'test-1',
          input: '',
          expectedOutput: 'Variables should be declared with correct types',
          description: 'Check if variables are properly declared'
        }
      ]
    }
  },
  {
    id: 'python-lists',
    title: 'Python Lists',
    description: 'Learn how to work with lists in Python',
    difficulty: 'beginner',
    language: 'python',
    estimatedTime: 20,
    content: {
      theory: `
# Python Lists

Lists are ordered collections of items. They are mutable, meaning you can change their contents.

## Creating Lists:
\`\`\`python
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True]
\`\`\`

## List Methods:
- **append()**: Add item to end
- **insert()**: Add item at specific index
- **remove()**: Remove first occurrence of item
- **pop()**: Remove and return item at index
- **len()**: Get list length

## Examples:
\`\`\`python
fruits.append("grape")
fruits.insert(0, "strawberry")
fruits.remove("banana")
last_fruit = fruits.pop()
print(len(fruits))
\`\`\`
      `,
      instructions: `
Create a list called \`animals\` with 3 animal names, then:
1. Add "elephant" to the end using append()
2. Insert "lion" at the beginning using insert()
3. Remove one animal using remove()
4. Print the final list and its length
      `,
      starterCode: `# Create your list here
animals = []

# Add "elephant" to the end

# Insert "lion" at the beginning

# Remove one animal

# Print the list and its length
print(animals)
print("Length:", len(animals))`,
      solution: `# Create your list here
animals = ["dog", "cat", "bird"]

# Add "elephant" to the end
animals.append("elephant")

# Insert "lion" at the beginning
animals.insert(0, "lion")

# Remove one animal
animals.remove("cat")

# Print the list and its length
print(animals)
print("Length:", len(animals))`,
      testCases: [
        {
          id: 'test-1',
          input: '',
          expectedOutput: 'List should be modified correctly',
          description: 'Check if list operations work correctly'
        }
      ]
    }
  },
  {
    id: 'python-functions',
    title: 'Python Functions',
    description: 'Learn how to create and use functions in Python',
    difficulty: 'intermediate',
    language: 'python',
    estimatedTime: 25,
    content: {
      theory: `
# Python Functions

Functions are reusable blocks of code that perform specific tasks. They help organize code and make it more modular.

## Defining Functions:
\`\`\`python
def greet(name):
    return f"Hello, {name}!"

def add_numbers(a, b):
    return a + b
\`\`\`

## Function Parameters:
- **Required parameters**: Must be provided
- **Default parameters**: Have default values
- **Keyword arguments**: Named parameters

## Examples:
\`\`\`python
def introduce(name, age=25):
    return f"Hi, I'm {name} and I'm {age} years old."

result = introduce("Alice")
result2 = introduce("Bob", age=30)
\`\`\`
      `,
      instructions: `
Create a function called \`calculate_rectangle_area\` that:
1. Takes two parameters: \`width\` and \`height\`
2. Returns the area (width * height)
3. Call the function with values 8 and 5
4. Print the result
      `,
      starterCode: `# Create your function here
def calculate_rectangle_area(width, height):
    # Your code here
    pass

# Call the function and print the result
result = calculate_rectangle_area(8, 5)
print(f"Area: {result}")`,
      solution: `# Create your function here
def calculate_rectangle_area(width, height):
    return width * height

# Call the function and print the result
result = calculate_rectangle_area(8, 5)
print(f"Area: {result}")`,
      testCases: [
        {
          id: 'test-1',
          input: 'calculate_rectangle_area(8, 5)',
          expectedOutput: '40',
          description: 'Function should return correct area calculation'
        }
      ]
    }
  }
  */
];

// Create placeholder lessons for entrepreneurship and leadership
const entrepreneurshipLessons: Lesson[] = [
  {
    id: 'social-impact-intro',
    title: 'Introduction to Social Impact',
    description: 'Understanding the fundamentals of creating social change',
    difficulty: 'beginner',
    language: 'theory',
    estimatedTime: 20,
    content: {
      theory: `
# Introduction to Social Impact

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Key Concepts:
- **Social Innovation**: Lorem ipsum dolor sit amet
- **Impact Measurement**: Consectetur adipiscing elit
- **Stakeholder Engagement**: Sed do eiusmod tempor

## Examples:
Social entrepreneurs who have changed the world through innovative solutions.
      `,
      instructions: `
Reflect on the following questions:
1. What social issues are you passionate about?
2. How might technology help address these issues?
3. Who would be your key stakeholders?
      `,
      starterCode: '',
      solution: '',
      testCases: []
    }
  },
  {
    id: 'business-model-canvas',
    title: 'Business Model Canvas',
    description: 'Learn to design sustainable business models',
    difficulty: 'intermediate',
    language: 'theory',
    estimatedTime: 30,
    content: {
      theory: `
# Business Model Canvas

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.

## Nine Building Blocks:
- **Value Propositions**: Lorem ipsum
- **Customer Segments**: Dolor sit amet
- **Revenue Streams**: Consectetur adipiscing

## Implementation:
Detailed steps for creating your own business model canvas.
      `,
      instructions: `
Create a business model canvas for your social venture:
1. Define your value proposition
2. Identify customer segments
3. Map out revenue streams
      `,
      starterCode: '',
      solution: '',
      testCases: []
    }
  }
];


export const modules: Module[] = [
  // Short-form Advanced Lessons
  ...shortFormModules,
  
  // Technology Creation
  {
    id: 'javascript-basics',
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript programming',
    language: 'javascript',
    category: 'technology',
    difficulty: 'beginner',
    estimatedTime: 60,
    lessons: lessons.filter(lesson => lesson.language === 'javascript')
  },
  {
    id: 'python-basics',
    title: 'Python Fundamentals',
    description: 'Learn the basics of Python programming',
    language: 'python',
    category: 'technology',
    difficulty: 'beginner',
    estimatedTime: 45,
    lessons: lessons.filter(lesson => lesson.language === 'python')
  },

  // Entrepreneurship
  {
    id: 'social-entrepreneurship',
    title: 'Radical Social Entrepreneurship',
    description: 'Create ventures that address pressing social issues',
    language: 'theory',
    category: 'entrepreneurship',
    difficulty: 'beginner',
    estimatedTime: 90,
    lessons: entrepreneurshipLessons
  }
];