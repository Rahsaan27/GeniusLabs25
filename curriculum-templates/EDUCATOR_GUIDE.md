# Educator Curriculum Guide

## Quick Start: Adding New Lessons

As an educator, you can easily add curriculum to GeniusLabs using our simple JSON template system. No coding required!

### Step 1: Copy the Template

1. Navigate to `curriculum-templates/lesson-template.json`
2. Make a copy and rename it (e.g., `my-new-lesson.json`)

### Step 2: Fill in the Lesson Details

Open your JSON file and update these sections:

#### A. Lesson Info
```json
"lessonInfo": {
  "id": "js-variables",  // Unique ID (use lowercase with dashes)
  "title": "JavaScript Variables",  // Display title
  "description": "Learn how to store data in JavaScript",
  "difficulty": "beginner",  // beginner | intermediate | advanced
  "estimatedTime": 30,  // Minutes
  "language": "javascript"
}
```

#### B. Activities (What students will do)
```json
"activities": ["videos", "docs", "code", "quiz"]
```

Choose from:
- `"videos"` - Video tutorials
- `"docs"` - Written documentation/reading
- `"code"` - Hands-on coding exercise
- `"quiz"` - Multiple choice questions

#### C. Theory (Learning Content)
```json
"theory": "# Variables in JavaScript\n\nVariables store data..."
```

**Tips:**
- Use Markdown formatting
- `\n` creates new lines
- `#` for headings
- `**bold**` for bold text
- `` `code` `` for inline code

#### D. Coding Instructions
```json
"instructions": "Create a variable named 'age' and set it to your age.\n\n1. Use const or let\n2. Print it with console.log()\n3. Run your code"
```

#### E. Starter Code
```json
"starterCode": "// Your code here\n"
```

This is the code students see when they start.

#### F. Solution (Hidden from students)
```json
"solution": "const age = 25;\nconsole.log(age);"
```

This is for your reference and auto-grading.

#### G. Test Cases (Auto-check student code)
```json
"testCases": [
  {
    "id": "test-1",
    "input": "",  // Usually empty for JS
    "expectedOutput": "25",  // What console.log should print
    "description": "Should print the age"
  }
]
```

**How it works:**
- Student runs their code
- Output is compared to `expectedOutput`
- Green checkmark if it matches!

#### H. Videos (Optional)
```json
"videos": [
  {
    "title": "Introduction to Variables",
    "url": "https://www.youtube.com/embed/VIDEO_ID",
    "duration": "10:30"
  }
]
```

**To get YouTube embed URL:**
1. Go to YouTube video
2. Click "Share" → "Embed"
3. Copy the URL from `src="..."`

#### I. Documentation
```json
"documentation": "# Further Reading\n\n- [MDN Variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables)"
```

Add links, examples, and explanations here.

#### J. Quiz Questions
```json
"quiz": {
  "id": "quiz-1",
  "title": "Check Your Understanding",
  "questions": [
    {
      "id": "q1",
      "question": "Which keyword creates a variable that cannot be reassigned?",
      "options": [
        "var",
        "let",
        "const",
        "function"
      ],
      "correctAnswer": 2,  // Index starts at 0, so 2 = "const"
      "explanation": "const creates variables that cannot be reassigned",
      "emoji": "🔒"
    }
  ],
  "timePerQuestion": 30,  // Seconds per question
  "passingScore": 70  // Percentage needed to pass
}
```

---

### Step 3: Submit Your Lesson

Once your JSON file is ready, **send it to the development team** via:
- Email attachment
- Slack message
- Shared Google Drive folder

The development team will integrate it into the platform. If you're comfortable with code, see the **Technical Integration Guide** below.

---

## Technical Integration Guide (For Developers)

### How to Import Educator-Created Lessons

When an educator submits a JSON lesson file, follow these steps:

#### 1. Create a Template Converter Function

Add this utility to `src/utils/lessonTemplate.ts`:

```typescript
import { Lesson } from '@/types/lesson';

export function generateLessonFromTemplate(template: any): Lesson {
  return {
    id: template.lessonInfo.id,
    title: template.lessonInfo.title,
    description: template.lessonInfo.description,
    difficulty: template.lessonInfo.difficulty,
    language: template.lessonInfo.language,
    estimatedTime: template.lessonInfo.estimatedTime,
    activities: template.activities,
    content: {
      theory: template.content.theory || '',
      instructions: template.content.instructions || '',
      starterCode: template.content.starterCode || '',
      solution: template.content.solution || '',
      videos: template.content.videos || [],
      documentation: template.content.documentation || '',
      testCases: template.testCases || []
    },
    quiz: template.quiz
  };
}
```

#### 2. Place Lesson File

Save the educator's JSON file in:
```
src/data/intro-js-lessons/[lesson-name].json
```

#### 3. Import and Add to Curriculum

In `src/data/modernCurriculum.ts`:

```typescript
import { generateLessonFromTemplate } from '@/utils/lessonTemplate';
import educatorLesson1 from './intro-js-lessons/variables-lesson.json';
import educatorLesson2 from './intro-js-lessons/functions-lesson.json';

export const modernJavascriptLessons: Lesson[] = [
  // ... existing lessons
  generateLessonFromTemplate(educatorLesson1),
  generateLessonFromTemplate(educatorLesson2),
];
```

#### 4. Verify Lesson Appears

1. Restart dev server: `npm run dev`
2. Navigate to: http://localhost:3000/modules/javascript-basics
3. Check that the new lesson appears in the list
4. Test code execution, quiz, and all activities

### Code Execution Details

**JavaScript execution is already fully functional** in the IDE. When students run JavaScript code:

1. The code is executed in a sandboxed environment
2. `console.log()` output is captured and displayed in the terminal
3. Test cases automatically validate student code
4. Results appear instantly in the Output panel

**Supported JavaScript features:**
- ✅ Variables (let, const, var)
- ✅ Functions
- ✅ Arrays and Objects
- ✅ Loops (for, while)
- ✅ Conditionals (if, else, switch)
- ✅ String manipulation
- ✅ Math operations
- ✅ console.log() for output

**Note:** Browser APIs (DOM, fetch, localStorage) are not available since code runs in an isolated function context.

---

## Content Guidelines

### Writing Theory Content

**Good Example:**
```
# What are Variables?

Variables are containers for storing data. Think of them like labeled boxes.

## Three Ways to Declare Variables

1. **const** - Cannot be changed
2. **let** - Can be changed
3. **var** - Old way (avoid)

### Example:
const name = "Alice";  // Cannot change
let age = 25;          // Can change
```

**Bad Example:**
```
variables r containers
u can use const let var
```

### Writing Instructions

**Good:**
```
Create a variable called 'temperature' and set it to 72.

Steps:
1. Use the const keyword
2. Name it 'temperature'
3. Set the value to 72
4. Print it with console.log()
5. Click "Run Code"
```

**Bad:**
```
Make a variable
```

### Creating Test Cases

**Test case rules:**
1. Start simple, then add complexity
2. Test edge cases (empty, zero, negative)
3. Make descriptions clear
4. Match expected output EXACTLY (including spaces, punctuation)

**Example:**
```json
"testCases": [
  {
    "id": "test-1",
    "input": "",
    "expectedOutput": "Hello, World!",
    "description": "Should print 'Hello, World!' exactly"
  },
  {
    "id": "test-2",
    "input": "",
    "expectedOutput": "42",
    "description": "Should print the number 42"
  }
]
```

---

## Common Patterns

### Pattern 1: Basic Concept Lesson
```json
{
  "activities": ["docs", "code", "quiz"],
  "content": {
    "theory": "Explain the concept...",
    "instructions": "Try it yourself...",
    "starterCode": "// Simple starter",
    "testCases": [{ "expectedOutput": "result" }]
  }
}
```

### Pattern 2: Video + Practice
```json
{
  "activities": ["videos", "code"],
  "content": {
    "videos": [{ "title": "...", "url": "..." }],
    "instructions": "Now you try...",
    "starterCode": "// Based on video"
  }
}
```

### Pattern 3: Reading + Quiz
```json
{
  "activities": ["docs", "quiz"],
  "content": {
    "documentation": "# Read this article...",
    "quiz": {
      "questions": [...]
    }
  }
}
```

---

## Troubleshooting

### Issue: Test always fails

**Problem:** Expected output doesn't match student output

**Solution:**
1. Run the solution code yourself
2. Copy the EXACT output (including spaces, newlines)
3. Paste into `expectedOutput`

### Issue: Video doesn't show

**Problem:** Wrong URL format

**Solution:**
- Use: `https://www.youtube.com/embed/VIDEO_ID`
- Not: `https://www.youtube.com/watch?v=VIDEO_ID`

### Issue: Markdown not formatting

**Problem:** Need to use `\n` for newlines in JSON

**Solution:**
```json
"theory": "Line 1\n\nLine 2\n\n## Heading"
```

### Issue: Quiz answer always wrong

**Problem:** `correctAnswer` index is off

**Solution:**
- Remember: indexes start at 0!
- First option = 0
- Second option = 1
- Third option = 2
- Fourth option = 3

---

## Best Practices

✅ **DO:**
- Keep lessons focused on ONE concept
- Use clear, simple language
- Provide examples before exercises
- Test your own lesson before publishing
- Use emojis sparingly (quiz questions only)

❌ **DON'T:**
- Cover too many topics in one lesson
- Use jargon without explanation
- Skip test cases (students need feedback!)
- Make quizzes too hard
- Forget to set estimated time

---

## Example: Complete Lesson

Here's a complete, production-ready lesson:

```json
{
  "lessonInfo": {
    "id": "js-console-log",
    "title": "Printing with console.log()",
    "description": "Learn how to display messages in the browser console",
    "difficulty": "beginner",
    "estimatedTime": 15,
    "language": "javascript"
  },
  "activities": ["docs", "code", "quiz"],
  "content": {
    "theory": "# The console.log() Function\n\nconsole.log() is used to print messages to the browser's console. It's essential for debugging and seeing what your code is doing.\n\n## Syntax\n\n```javascript\nconsole.log('message');\n```\n\n## Examples\n\n```javascript\nconsole.log('Hello!');\nconsole.log(42);\nconsole.log(5 + 3);\n```",
    "instructions": "Use console.log() to print your name.\n\n1. Write console.log()\n2. Inside the parentheses, put your name in quotes\n3. Click 'Run Code'\n4. Check the output below!",
    "starterCode": "// Print your name here\n",
    "solution": "console.log('Alice');",
    "documentation": "# More About console.log()\n\n## You can print:\n- Strings: `console.log('text')`\n- Numbers: `console.log(42)`\n- Math: `console.log(5 + 3)`\n- Variables: `console.log(myVariable)`\n\n## Learn More\n- [MDN console.log()](https://developer.mozilla.org/en-US/docs/Web/API/console/log)"
  },
  "testCases": [
    {
      "id": "test-1",
      "input": "",
      "expectedOutput": "",
      "description": "Code should run without errors"
    }
  ],
  "quiz": {
    "id": "quiz-console",
    "title": "Quick Check",
    "questions": [
      {
        "id": "q1",
        "question": "What does console.log('Hi') do?",
        "options": [
          "Prints 'Hi' to the console",
          "Creates a variable named Hi",
          "Deletes the console",
          "Opens a new window"
        ],
        "correctAnswer": 0,
        "explanation": "console.log() prints the message to the browser console.",
        "emoji": "📺"
      }
    ],
    "timePerQuestion": 30,
    "passingScore": 100
  }
}
```

---

## Need Help?

**Contact:**
- Developer team: [developer@geniuslabs.com]
- Submit issues: [GitHub Issues]
- Documentation: `/docs/ARCHITECTURE.md`

**Quick Links:**
- [Markdown Guide](https://www.markdownguide.org/basic-syntax/)
- [YouTube Embed Guide](https://support.google.com/youtube/answer/171780)
- [JSON Validator](https://jsonlint.com/)

---

**Happy Teaching! 🎓**
