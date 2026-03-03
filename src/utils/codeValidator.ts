/**
 * Code validation utilities for checking student solutions
 */

export interface ValidationResult {
  isValid: boolean;
  message: string;
  hints?: string[];
}

/**
 * Validate code for Lesson 1: Console.log()
 * Expected: Two console.log() statements with any positive integers
 */
function validateLesson1(code: string, output: string): ValidationResult {
  const consoleLogCount = (code.match(/console\.log\(/g) || []).length;

  if (consoleLogCount < 2) {
    return {
      isValid: false,
      message: 'Not quite! You need two console.log() statements.',
      hints: ['Remember to log your birth year AND your favorite number', 'Each should be on a separate line']
    };
  }

  const outputLines = output.trim().split('\n').filter(line => line.trim());

  if (outputLines.length < 2) {
    return {
      isValid: false,
      message: 'Make sure both console.log() statements are working!',
      hints: ['Check that you\'re logging two different numbers']
    };
  }

  return {
    isValid: true,
    message: 'Perfect! You\'ve successfully used console.log() twice! 🎉'
  };
}

/**
 * Validate code for Lesson 2: Variables
 * Expected: const myName, let myAge, both logged
 */
function validateLesson2(code: string, output: string): ValidationResult {
  const hasConstMyName = /const\s+myName\s*=/.test(code);
  const hasLetMyAge = /let\s+myAge\s*=/.test(code);
  const hasStringValue = /"[^"]+"|'[^']+'/.test(code);
  const hasNumberValue = /=\s*\d+/.test(code);

  if (!hasConstMyName) {
    return {
      isValid: false,
      message: 'Use const to create a variable called myName',
      hints: ['const myName = "YourName";', 'Don\'t forget the quotes around your name!']
    };
  }

  if (!hasLetMyAge) {
    return {
      isValid: false,
      message: 'Use let to create a variable called myAge',
      hints: ['let myAge = 16;', 'Age should be a number (no quotes)']
    };
  }

  if (!hasStringValue) {
    return {
      isValid: false,
      message: 'Your name should be wrapped in quotes',
      hints: ['Strings need quotes: "Alex" or \'Alex\'']
    };
  }

  const outputLines = output.trim().split('\n').filter(line => line.trim());

  if (outputLines.length < 2) {
    return {
      isValid: false,
      message: 'Don\'t forget to log both variables!',
      hints: ['console.log(myName);', 'console.log(myAge);']
    };
  }

  return {
    isValid: true,
    message: 'Excellent! You\'ve mastered variables! 🎉'
  };
}

/**
 * Validate code for Lesson 3: Data Types
 * Expected: Three variables, typeof for each
 */
function validateLesson3(code: string, output: string): ValidationResult {
  const typeofCount = (code.match(/typeof/g) || []).length;

  if (typeofCount < 3) {
    return {
      isValid: false,
      message: 'You need to use typeof three times - once for each variable',
      hints: ['console.log(typeof movie);', 'console.log(typeof rating);', 'console.log(typeof wouldRecommend);']
    };
  }

  const outputLines = output.trim().split('\n').filter(line => line.trim());
  const hasString = outputLines.some(line => line.includes('string'));
  const hasNumber = outputLines.some(line => line.includes('number'));
  const hasBoolean = outputLines.some(line => line.includes('boolean'));

  if (!hasString || !hasNumber || !hasBoolean) {
    return {
      isValid: false,
      message: 'Make sure you have three different data types!',
      hints: ['One variable should be a string (text in quotes)', 'One should be a number', 'One should be a boolean (true/false)']
    };
  }

  return {
    isValid: true,
    message: 'Amazing! You understand data types! 🎉'
  };
}

/**
 * Validate code for Lesson 4: Arithmetic Operators
 * Expected: a = 12, b = 5, log(a+b), log(a%b)
 */
function validateLesson4(code: string, output: string): ValidationResult {
  const hasA12 = /a\s*=\s*12/.test(code);
  const hasB5 = /b\s*=\s*5/.test(code);

  if (!hasA12 || !hasB5) {
    return {
      isValid: false,
      message: 'Make sure a = 12 and b = 5',
      hints: ['let a = 12;', 'let b = 5;']
    };
  }

  const hasAddition = /a\s*\+\s*b/.test(code);
  const hasModulus = /a\s*%\s*b/.test(code);

  if (!hasAddition || !hasModulus) {
    return {
      isValid: false,
      message: 'You need to log both a + b and a % b',
      hints: ['console.log(a + b);', 'console.log(a % b);']
    };
  }

  const outputLines = output.trim().split('\n').filter(line => line.trim());

  if (outputLines.includes('17') && outputLines.includes('2')) {
    return {
      isValid: true,
      message: 'Perfect! You nailed arithmetic operators! 🎉'
    };
  }

  return {
    isValid: false,
    message: 'Check your output - should be 17 and 2',
    hints: ['12 + 5 = 17', '12 % 5 = 2 (remainder)']
  };
}

/**
 * Validate code for Lesson 5: Conditionals
 * Expected: if/else if/else for age categorization
 */
function validateLesson5(code: string, output: string): ValidationResult {
  const hasIf = /if\s*\(/.test(code);
  const hasElseIf = /else\s+if\s*\(/.test(code);
  const hasElse = /else\s*{/.test(code);

  if (!hasIf || !hasElseIf || !hasElse) {
    return {
      isValid: false,
      message: 'You need if, else if, and else statements',
      hints: ['if (age < 13) { ... }', 'else if (age < 18) { ... }', 'else { ... }']
    };
  }

  const hasChild = code.includes('"child"') || code.includes("'child'");
  const hasTeenager = code.includes('"teenager"') || code.includes("'teenager'");
  const hasAdult = code.includes('"adult"') || code.includes("'adult'");

  if (!hasChild || !hasTeenager || !hasAdult) {
    return {
      isValid: false,
      message: 'Make sure you log "child", "teenager", and "adult"',
      hints: ['console.log("child") for age < 13', 'console.log("teenager") for age < 18', 'console.log("adult") for everyone else']
    };
  }

  const outputTrimmed = output.trim().toLowerCase();
  if (outputTrimmed === 'child' || outputTrimmed === 'teenager' || outputTrimmed === 'adult') {
    return {
      isValid: true,
      message: 'Fantastic! You\'ve mastered conditionals! 🎉'
    };
  }

  return {
    isValid: false,
    message: 'Your code should output one category based on age',
    hints: ['Test your code with different ages!']
  };
}

/**
 * Validate code for Lesson 6: Functions
 * Expected: function double(num) returns num * 2, called with 8
 */
function validateLesson6(code: string, output: string): ValidationResult {
  const hasFunctionDeclaration = /function\s+double\s*\(/.test(code);
  const hasReturn = /return/.test(code);
  const hasCall = /double\s*\(\s*8\s*\)/.test(code);

  if (!hasFunctionDeclaration) {
    return {
      isValid: false,
      message: 'You need to declare a function called double',
      hints: ['function double(num) { ... }']
    };
  }

  if (!hasReturn) {
    return {
      isValid: false,
      message: 'Your function needs to return a value',
      hints: ['return num * 2;']
    };
  }

  if (!hasCall) {
    return {
      isValid: false,
      message: 'Don\'t forget to call double(8) and log the result',
      hints: ['console.log(double(8));']
    };
  }

  if (output.trim() === '16') {
    return {
      isValid: true,
      message: 'Excellent! You\'ve mastered functions! 🎉'
    };
  }

  return {
    isValid: false,
    message: 'Check your function - double(8) should return 16',
    hints: ['Make sure you\'re multiplying by 2', 'return num * 2;']
  };
}

/**
 * Validate code for Lesson 7: Arrays
 * Expected: array with 3 items, access [1], push, log length
 */
function validateLesson7(code: string, output: string): ValidationResult {
  const hasArrayDeclaration = /let\s+fruits\s*=\s*\[/.test(code);
  const hasPush = /\.push\(/.test(code);
  const hasLength = /\.length/.test(code);
  const hasIndexAccess = /\[1\]/.test(code);

  if (!hasArrayDeclaration) {
    return {
      isValid: false,
      message: 'Create an array called fruits',
      hints: ['let fruits = ["apple", "banana", "orange"];']
    };
  }

  if (!hasIndexAccess) {
    return {
      isValid: false,
      message: 'Don\'t forget to log the second item using [1]',
      hints: ['console.log(fruits[1]);', 'Remember: arrays start at index 0!']
    };
  }

  if (!hasPush) {
    return {
      isValid: false,
      message: 'Use .push() to add a fourth fruit',
      hints: ['fruits.push("mango");']
    };
  }

  if (!hasLength) {
    return {
      isValid: false,
      message: 'Log the array length',
      hints: ['console.log(fruits.length);']
    };
  }

  const outputLines = output.trim().split('\n').filter(line => line.trim());

  if (outputLines.length >= 2 && outputLines[outputLines.length - 1] === '4') {
    return {
      isValid: true,
      message: 'Perfect! You\'ve mastered arrays! 🎉'
    };
  }

  return {
    isValid: false,
    message: 'Check your output - the final length should be 4',
    hints: ['You start with 3 fruits, then push 1 more']
  };
}

/**
 * Validate code for Lesson 8: Loops
 * Expected: for loop iterating through [10, 20, 30, 40, 50]
 */
function validateLesson8(code: string, output: string): ValidationResult {
  const hasForLoop = /for\s*\(/.test(code);
  const hasArray = /numbers\s*=\s*\[/.test(code);
  const hasLength = /\.length/.test(code);

  if (!hasArray) {
    return {
      isValid: false,
      message: 'Create an array called numbers with [10, 20, 30, 40, 50]',
      hints: ['let numbers = [10, 20, 30, 40, 50];']
    };
  }

  if (!hasForLoop) {
    return {
      isValid: false,
      message: 'You need a for loop',
      hints: ['for (let i = 0; i < numbers.length; i++) { ... }']
    };
  }

  if (!hasLength) {
    return {
      isValid: false,
      message: 'Use .length in your loop condition',
      hints: ['i < numbers.length']
    };
  }

  const outputLines = output.trim().split('\n').filter(line => line.trim());
  const expectedOutput = ['10', '20', '30', '40', '50'];

  if (JSON.stringify(outputLines) === JSON.stringify(expectedOutput)) {
    return {
      isValid: true,
      message: 'Amazing! You\'ve mastered loops! 🎉'
    };
  }

  return {
    isValid: false,
    message: 'Your loop should output: 10, 20, 30, 40, 50',
    hints: ['Make sure you\'re logging numbers[i] inside the loop', 'Check that your loop goes through all 5 elements']
  };
}

/**
 * Main validation function - routes to specific lesson validator
 */
export function validateCode(lessonId: string, code: string, output: string): ValidationResult {
  switch (lessonId) {
    case 'js-console-log':
      return validateLesson1(code, output);
    case 'js-variables':
      return validateLesson2(code, output);
    case 'js-data-types':
      return validateLesson3(code, output);
    case 'js-arithmetic':
      return validateLesson4(code, output);
    case 'js-conditionals':
      return validateLesson5(code, output);
    case 'js-functions':
      return validateLesson6(code, output);
    case 'js-arrays':
      return validateLesson7(code, output);
    case 'js-loops':
      return validateLesson8(code, output);
    default:
      return {
        isValid: true,
        message: 'Code validation not available for this lesson yet.'
      };
  }
}
