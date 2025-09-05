import { Lesson, QuizQuestion } from '@/types/lesson';

// Advanced technical lessons designed for the short-form format
export const shortFormLessons: Lesson[] = [
  {
    id: 'js-closures-advanced',
    title: 'JavaScript Closures Mastery',
    description: 'Master closures, lexical scoping, and memory management in 60 seconds',
    difficulty: 'advanced',
    language: 'javascript',
    estimatedTime: 1,
    content: {
      theory: `
# JavaScript Closures Mastery

Closures are one of JavaScript's most powerful features. They allow functions to access variables from their outer (enclosing) scope even after the outer function has returned.

## Key Concepts:
- **Lexical Scoping**: Inner functions have access to outer function's variables
- **Function Factories**: Functions that return other functions with captured state
- **Private Variables**: Using closures to create data privacy
- **Memory Considerations**: Closures keep references to outer scope variables

## Real-World Usage:
- Module patterns
- Event handlers with private state  
- Partial application and currying
- Asynchronous programming patterns
      `,
      instructions: `
Create a simple closure that remembers a value:

1. Complete the inner function
2. Return the count value
3. Test it by calling the function
      `,
      starterCode: `function createCounter() {
  let count = 0;
  
  return function() {
    count = count + 1;
    // Return the count here
    
  };
}

const counter = createCounter();
console.log(counter());`,
      solution: `function createCounter() {
  let count = 0;
  
  return function() {
    count = count + 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter());`,
      testCases: [
        {
          id: 'test-1',
          input: 'counter()',
          expectedOutput: '1',
          description: 'First call should return 1'
        },
        {
          id: 'test-2',
          input: 'counter()',
          expectedOutput: '2',
          description: 'Second call should return 2'
        }
      ]
    },
    quiz: {
      id: 'closures-quiz',
      title: 'Closures Knowledge Check',
      timePerQuestion: 15,
      passingScore: 80,
      questions: [
        {
          id: 'closure-scope',
          question: 'What happens to variables in a closure\'s outer scope?',
          options: [
            'They are copied into the closure',
            'They remain accessible and live as long as the closure exists',
            'They are deleted when the function returns',
            'They become global variables'
          ],
          correctAnswer: 1,
          explanation: 'Correct! Closures maintain references to their outer scope variables, keeping them alive!',
          emoji: '🔐'
        }
      ]
    }
  },
  
  {
    id: 'js-async-await-patterns',
    title: 'Async/Await Patterns',
    description: 'Master modern asynchronous JavaScript patterns and error handling',
    difficulty: 'advanced',
    language: 'javascript',
    estimatedTime: 1,
    content: {
      theory: `
# Advanced Async/Await Patterns

Modern JavaScript asynchronous programming using async/await provides cleaner, more readable code compared to callbacks and raw promises.

## Key Concepts:
- **Async Functions**: Functions that return promises implicitly
- **Await Expression**: Pauses execution until promise resolves
- **Error Handling**: Try/catch blocks with async operations
- **Parallel Execution**: Promise.all() for concurrent operations

## Advanced Patterns:
- Sequential vs parallel execution
- Error boundaries in async code
- Async iteration with for-await-of
- Promise combinators (all, race, allSettled)
      `,
      instructions: `
Complete the async function to make a simple API call:

1. Use await to wait for the response
2. Return a simple message
3. Handle any errors
      `,
      starterCode: `async function getMessage() {
  try {
    // Add your code here
    return "Hello from API";
    
  } catch (error) {
    return "Error occurred";
  }
}

// Test it
getMessage().then(result => console.log(result));`,
      solution: `async function getMessage() {
  try {
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 100));
    return "Hello from API";
    
  } catch (error) {
    return "Error occurred";
  }
}

// Test it
getMessage().then(result => console.log(result));`,
      testCases: [
        {
          id: 'test-1',
          input: 'fetchUserData(123)',
          expectedOutput: 'User data object',
          description: 'Should fetch and return user data'
        }
      ]
    },
    quiz: {
      id: 'async-quiz',
      title: 'Async/Await Knowledge Check',
      timePerQuestion: 15,
      passingScore: 80,
      questions: [
        {
          id: 'async-error-handling',
          question: 'How do you handle errors in async/await functions?',
          options: [
            'Use .catch() method on the function call',
            'Use try/catch blocks inside the async function',
            'Use Promise.catch() wrapper',
            'Errors are automatically handled'
          ],
          correctAnswer: 1,
          explanation: 'Correct! Try/catch blocks are the idiomatic way to handle errors in async/await!',
          emoji: '🎯'
        }
      ]
    }
  },

  {
    id: 'python-decorators-advanced',
    title: 'Python Decorators Mastery',
    description: 'Master decorators, metaclasses, and advanced Python patterns',
    difficulty: 'advanced',
    language: 'python',
    estimatedTime: 1,
    content: {
      theory: `
# Python Decorators Mastery

Decorators are a powerful feature in Python that allow you to modify or extend the behavior of functions, methods, or classes without permanently modifying their code.

## Key Concepts:
- **Function Decorators**: Wrap functions to extend behavior
- **Class Decorators**: Modify class behavior
- **Decorator Factories**: Decorators that accept arguments
- **Built-in Decorators**: @property, @staticmethod, @classmethod

## Advanced Usage:
- Authentication and authorization
- Caching and memoization
- Timing and profiling
- Input validation and sanitization
      `,
      instructions: `
Create a simple decorator that prints when a function is called:

1. Define the wrapper function
2. Print a message before calling the function
3. Return the original function result
      `,
      starterCode: `def print_decorator(func):
    def wrapper():
        # Print a message here
        
        # Call and return the original function
        
    return wrapper

# Usage
@print_decorator
def say_hello():
    return "Hello!"

result = say_hello()
print(result)`,
      solution: `def print_decorator(func):
    def wrapper():
        print("Function is being called!")
        result = func()
        return result
    return wrapper

# Usage
@print_decorator
def say_hello():
    return "Hello!"

result = say_hello()
print(result)`,
      testCases: [
        {
          id: 'test-1',
          input: 'slow_function()',
          expectedOutput: 'Execution time printed and "Done!" returned',
          description: 'Should measure and print execution time'
        }
      ]
    },
    quiz: {
      id: 'decorators-quiz',
      title: 'Decorators Knowledge Check',
      timePerQuestion: 15,
      passingScore: 80,
      questions: [
        {
          id: 'decorator-syntax',
          question: 'What does @functools.wraps(func) do in a decorator?',
          options: [
            'Improves performance',
            'Preserves the original function\'s metadata',
            'Adds error handling',
            'Enables async support'
          ],
          correctAnswer: 1,
          explanation: 'Correct! @functools.wraps preserves the original function\'s name, docstring, and other metadata!',
          emoji: '🎭'
        }
      ]
    }
  },

  {
    id: 'algorithms-big-o',
    title: 'Big O Complexity Analysis',
    description: 'Master time and space complexity analysis for algorithm optimization',
    difficulty: 'advanced',
    language: 'theory',
    estimatedTime: 1,
    content: {
      theory: `
# Big O Complexity Analysis

Big O notation describes the upper bound of algorithm complexity, helping developers choose efficient algorithms and optimize code performance.

## Common Complexities:
- **O(1)**: Constant time - array access, hash lookup
- **O(log n)**: Logarithmic - binary search, balanced trees
- **O(n)**: Linear - linear search, single loop
- **O(n log n)**: Linearithmic - merge sort, heap sort
- **O(n²)**: Quadratic - bubble sort, nested loops
- **O(2ⁿ)**: Exponential - recursive Fibonacci

## Analysis Tips:
- Focus on worst-case scenarios
- Drop constants and lower-order terms
- Consider both time and space complexity
- Analyze loops, recursion, and data structure operations
      `,
      instructions: `
Analyze the time complexity of common algorithms:

1. Identify the dominant operations
2. Count nested loops and recursive calls
3. Consider input size growth impact
4. Choose the correct Big O classification
      `,
      starterCode: `# Algorithm 1: Linear Search
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Algorithm 2: Binary Search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      solution: `# Algorithm 1: Linear Search - O(n)
# In worst case, searches through entire array

# Algorithm 2: Binary Search - O(log n)  
# Eliminates half of search space each iteration

# Time Complexity Analysis:
# Linear Search: O(n) - checks each element once
# Binary Search: O(log n) - halves search space each step`,
      testCases: [
        {
          id: 'test-1',
          input: 'Complexity analysis',
          expectedOutput: 'O(n) for linear, O(log n) for binary',
          description: 'Should identify correct time complexities'
        }
      ]
    },
    quiz: {
      id: 'big-o-quiz',
      title: 'Big O Analysis Knowledge Check',
      timePerQuestion: 15,
      passingScore: 80,
      questions: [
        {
          id: 'nested-loops-complexity',
          question: 'What is the time complexity of nested loops iterating over the same input size n?',
          options: [
            'O(n)',
            'O(n²)',
            'O(log n)',
            'O(n log n)'
          ],
          correctAnswer: 1,
          explanation: 'Correct! Nested loops over the same input create O(n²) quadratic complexity!',
          emoji: '📊'
        }
      ]
    }
  }
];

export const shortFormModules = [
  {
    id: 'advanced-javascript-mastery',
    title: 'Advanced JavaScript Mastery',
    description: 'Master advanced JavaScript concepts in bite-sized, interactive lessons',
    language: 'javascript',
    category: 'technology' as const,
    difficulty: 'advanced' as const,
    estimatedTime: 5,
    lessons: shortFormLessons.filter(lesson => lesson.language === 'javascript')
  },
  {
    id: 'python-advanced-patterns',
    title: 'Advanced Python Patterns',
    description: 'Learn advanced Python programming patterns and best practices',
    language: 'python', 
    category: 'technology' as const,
    difficulty: 'advanced' as const,
    estimatedTime: 1,
    lessons: shortFormLessons.filter(lesson => lesson.language === 'python')
  },
  {
    id: 'computer-science-fundamentals',
    title: 'CS Fundamentals Express',
    description: 'Essential computer science concepts in rapid-fire format',
    language: 'theory',
    category: 'technology' as const,
    difficulty: 'advanced' as const,
    estimatedTime: 1,
    lessons: shortFormLessons.filter(lesson => lesson.language === 'theory')
  }
];