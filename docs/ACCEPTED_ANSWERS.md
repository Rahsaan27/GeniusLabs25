# JavaScript Curriculum - Accepted Answers Reference

This document stores the accepted answer patterns for each lesson's coding challenge. These will be used in the future to implement auto-grading functionality.

---

## Lesson 1: Console.log()

**Pattern:** Any two positive integers

**Example:**
```js
console.log(2005)
console.log(7)
```

**Validation Rules:**
- Must have exactly 2 console.log() statements
- Both arguments must be positive integers

---

## Lesson 2: Variables

**Pattern:** const myName = [string]; console.log(myName); let myAge = [number]; console.log(myAge);

**Example:**
```js
const myName = "Alex";
console.log(myName);
let myAge = 16;
console.log(myAge);
```

**Validation Rules:**
- Must use `const` for myName with a string value
- Must use `let` for myAge with a number value
- Must log both variables

---

## Lesson 3: Data Types

**Pattern:** Three typeof statements for three different variable types

**Example:**
```js
let movie = "Inception";
let rating = 9;
let wouldRecommend = true;
console.log(typeof movie);
console.log(typeof rating);
console.log(typeof wouldRecommend);
```

**Validation Rules:**
- Must create 3 variables (any names) with different types
- Must log typeof for each variable
- Should result in "string", "number", "boolean"

---

## Lesson 4: Arithmetic Operators

**Pattern:** a = 12, b = 5, log(a + b), log(a % b)

**Example:**
```js
let a = 12;
let b = 5;
console.log(a + b);
console.log(a % b);
```

**Validation Rules:**
- Variables a and b with values 12 and 5
- Must log result of addition (17)
- Must log result of modulus (2)

---

## Lesson 5: Conditionals

**Pattern:** Age categorization using if/else if/else

**Example:**
```js
let age = 15;

if (age < 13) {
  console.log("child");
} else if (age < 18) {
  console.log("teenager");
} else {
  console.log("adult");
}
```

**Validation Rules:**
- Must have if/else if/else structure
- Must check age < 13 and age < 18
- Must log correct category for the age value

---

## Lesson 6: Functions

**Pattern:** Function that doubles a number

**Example:**
```js
function double(num) {
  return num * 2;
}

console.log(double(8));
```

**Validation Rules:**
- Must declare function named `double`
- Must have one parameter
- Must return parameter * 2
- Must call function with 8 and log result (16)

---

## Lesson 7: Arrays

**Pattern:** Array with 3 items, access [1], push(), log length

**Example:**
```js
let fruits = ["apple", "banana", "orange"];
console.log(fruits[1]);
fruits.push("mango");
console.log(fruits.length);
```

**Validation Rules:**
- Must create array with 3 string elements
- Must log element at index 1
- Must use .push() to add element
- Must log length (should be 4)

---

## Lesson 8: Loops

**Pattern:** For loop iterating through array

**Example:**
```js
let numbers = [10, 20, 30, 40, 50];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
```

**Validation Rules:**
- Must create array [10, 20, 30, 40, 50]
- Must use for loop starting at 0
- Must iterate using i < array.length
- Must log each element using numbers[i]
- Output should be: 10, 20, 30, 40, 50

---

## Future Implementation Notes

### Auto-Grading System

To implement auto-grading, we'll need to:

1. **Code Parser**: Parse student code into AST
2. **Pattern Matcher**: Check for required patterns
3. **Test Runner**: Execute code and verify output
4. **Feedback Generator**: Provide specific hints based on what's missing

### Validation Levels

- **Level 1**: Syntax check (does code run without errors?)
- **Level 2**: Structure check (are required elements present?)
- **Level 3**: Output check (does it produce correct results?)
- **Level 4**: Style check (follows best practices?)

### Success Criteria

Each lesson should pass:
- ✅ Code executes without errors
- ✅ Required elements present (variables, functions, etc.)
- ✅ Correct output produced
- ✅ Follows the lesson's specific requirements

---

**Last Updated:** 2026-03-03
