import { Lesson } from '@/types/lesson';

export interface ShortFormLessonConfig {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  slides: {
    hook: {
      emoji: string;
      title: string;
      subtitle: string;
      description: string;
    };
    concepts: Array<{
      emoji: string;
      title: string;
      subtitle: string;
    }>;
    codeChallenge?: {
      description: string;
      starterCode: string;
      solution: string;
      successKeyword: string;
    };
    quiz: {
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    };
    dragDrop: {
      description: string;
      items: Array<{
        id: string;
        text: string;
        type: string;
      }>;
      zones: Array<{
        id: string;
        label: string;
        type: string;
      }>;
    };
  };
}

export function generateLessonFromConfig(config: ShortFormLessonConfig): Lesson {
  return {
    id: config.id,
    title: config.title,
    description: config.description,
    difficulty: config.difficulty,
    language: config.language,
    estimatedTime: config.estimatedTime,
    activities: ['code', 'quiz'],
    content: {
      theory: `# ${config.title}\n\n${config.description}\n\n## What You'll Learn:\n${config.slides.concepts.map(c => `- **${c.title}**: ${c.subtitle}`).join('\n')}`,
      instructions: config.slides.codeChallenge ? `Complete the coding challenge:\n\n${config.slides.codeChallenge.description}` : 'Learn through interactive activities and quizzes.',
      starterCode: config.slides.codeChallenge?.starterCode || '',
      solution: config.slides.codeChallenge?.solution || '',
      testCases: config.slides.codeChallenge ? [
        {
          id: 'test-1',
          input: 'Run the code',
          expectedOutput: config.slides.codeChallenge.successKeyword,
          description: 'Code should work correctly'
        }
      ] : []
    },
    quiz: {
      id: `${config.id}-quiz`,
      title: `${config.title} Knowledge Check`,
      timePerQuestion: 15,
      passingScore: 80,
      questions: [
        {
          id: `${config.id}-q1`,
          question: config.slides.quiz.question,
          options: config.slides.quiz.options,
          correctAnswer: config.slides.quiz.correctAnswer,
          explanation: config.slides.quiz.explanation,
          emoji: config.slides.hook.emoji
        }
      ]
    },
    // Store additional config data for short-form rendering
    shortFormConfig: config
  };
}

export const lessonConfigs: ShortFormLessonConfig[] = [
  // JavaScript Fundamentals - Super Simple Variables
  {
    id: 'js-variables-functions',
    title: 'JavaScript Variables',
    description: 'Learn how to store your name and favorite number in code',
    language: 'javascript',
    difficulty: 'beginner',
    estimatedTime: 1,
    slides: {
      hook: {
        emoji: '📦',
        title: 'JavaScript Storage Box!',
        subtitle: 'Variables are like labeled boxes that hold your stuff',
        description: 'Let\'s store your name in code!'
      },
      concepts: [
        { emoji: '📦', title: 'Variables', subtitle: 'Boxes that hold information' },
        { emoji: '✏️', title: 'let keyword', subtitle: 'Creates a new box' },
        { emoji: '🏷️', title: 'Names', subtitle: 'Labels for your boxes' }
      ],
      codeChallenge: {
        description: 'Create a variable with your name and display it',
        starterCode: `// Create a variable called myName
// Put your name inside it

console.log(myName);`,
        solution: `// Create a variable called myName
let myName = "Alex";

console.log(myName);`,
        successKeyword: 'Alex'
      },
      quiz: {
        question: 'Which word creates a new variable in JavaScript?',
        options: ['let', 'make', 'create', 'new'],
        correctAnswer: 0,
        explanation: 'Correct! The "let" keyword creates a new variable box.'
      },
      dragDrop: {
        description: 'Match the parts of creating a variable',
        items: [
          { id: 'keyword', text: 'let', type: 'start' },
          { id: 'name', text: 'myAge', type: 'middle' },
          { id: 'value', text: '= 15', type: 'end' }
        ],
        zones: [
          { id: 'start', label: '1️⃣ Keyword', type: 'start' },
          { id: 'middle', label: '2️⃣ Name', type: 'middle' },
          { id: 'end', label: '3️⃣ Value', type: 'end' }
        ]
      }
    }
  },

  // Python Fundamentals - Super Simple Lists
  {
    id: 'python-lists-loops',
    title: 'Python Lists',
    description: 'Learn how to make a shopping list in Python',
    language: 'python',
    difficulty: 'beginner',
    estimatedTime: 1,
    slides: {
      hook: {
        emoji: '📝',
        title: 'Python Shopping Lists!',
        subtitle: 'Lists in Python are like real shopping lists',
        description: 'Let\'s make a list of your favorite snacks!'
      },
      concepts: [
        { emoji: '📝', title: 'Lists', subtitle: 'Hold multiple items in order' },
        { emoji: '🔢', title: 'Index Numbers', subtitle: 'Each item has a position' },
        { emoji: '👆', title: 'Access Items', subtitle: 'Get items by their position' }
      ],
      codeChallenge: {
        description: 'Create a list of 3 favorite foods and print the first one',
        starterCode: `# Create a list called foods with 3 items
foods = 

# Print the first item (remember: first item is [0])
print()`,
        solution: `# Create a list called foods with 3 items
foods = ["pizza", "ice cream", "cookies"]

# Print the first item (remember: first item is [0])
print(foods[0])`,
        successKeyword: 'pizza'
      },
      quiz: {
        question: 'How do you get the FIRST item from a list called snacks?',
        options: ['snacks[0]', 'snacks[1]', 'snacks.first', 'snacks.start'],
        correctAnswer: 0,
        explanation: 'Correct! Lists start counting at 0, so the first item is [0].'
      },
      dragDrop: {
        description: 'Put these list parts in the right order',
        items: [
          { id: 'name', text: 'colors', type: 'name' },
          { id: 'equals', text: '=', type: 'equals' },
          { id: 'list', text: '["red", "blue"]', type: 'list' }
        ],
        zones: [
          { id: 'name', label: '1️⃣ List Name', type: 'name' },
          { id: 'equals', label: '2️⃣ Equals', type: 'equals' },
          { id: 'list', label: '3️⃣ Items', type: 'list' }
        ]
      }
    }
  },

  // Simple Problem Solving
  {
    id: 'problem-solution-fit',
    title: 'Finding Problems to Solve',
    description: 'Learn how to spot problems around you that need fixing',
    language: 'theory',
    difficulty: 'beginner',
    estimatedTime: 1,
    slides: {
      hook: {
        emoji: '🔍',
        title: 'Become a Problem Detective!',
        subtitle: 'Look around - what bothers people every day?',
        description: 'Every great invention started with noticing a problem!'
      },
      concepts: [
        { emoji: '👀', title: 'Observe', subtitle: 'Watch people struggle with things' },
        { emoji: '❓', title: 'Ask Questions', subtitle: 'What makes people frustrated?' },
        { emoji: '💡', title: 'Think Solutions', subtitle: 'How could this be easier?' }
      ],
      quiz: {
        question: 'Where should you look for problems to solve?',
        options: [
          'Only in books',
          'Everywhere around you',
          'Only online',
          'Only at school'
        ],
        correctAnswer: 1,
        explanation: 'Correct! Problems are everywhere - at home, school, and in your community!'
      },
      dragDrop: {
        description: 'Put these problem-solving steps in order',
        items: [
          { id: 'notice', text: 'Notice a problem', type: 'first' },
          { id: 'think', text: 'Think of a solution', type: 'second' },
          { id: 'try', text: 'Try your idea', type: 'third' }
        ],
        zones: [
          { id: 'first', label: '1️⃣ First Step', type: 'first' },
          { id: 'second', label: '2️⃣ Second Step', type: 'second' },
          { id: 'third', label: '3️⃣ Third Step', type: 'third' }
        ]
      }
    }
  }
];