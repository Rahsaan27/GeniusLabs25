'use client';

import { useState } from 'react';
import Link from 'next/link';
import { InteractiveIDE } from '@/components/IDE';

export default function IDETestLesson() {
  const [userCode, setUserCode] = useState('');

  const pythonStarterCode = `# Try modifying this code and clicking "Run Code"
name = "Student"
age = 16

print("Hello, my name is", name)
print("I am", age, "years old")
`;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-2 bg-gradient-to-r from-black to-gray-900">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Link
              href="/modules/python-basics"
              className="text-green-400 hover:text-green-300 text-xs mb-1 inline-block"
            >
              ← Back to Python Fundamentals
            </Link>
            <h1 className="text-xl font-bold text-white">Python Basics: Variables & Print</h1>
            <p className="text-gray-400 text-sm">Learn how to use variables and print statements in Python</p>
          </div>

          {/* Activity Navigation */}
          <div className="flex items-center gap-1 flex-shrink-0 border border-gray-700 rounded-lg p-1 bg-gray-900/50">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-800 transition-colors group">
              <svg className="w-4 h-4 text-gray-400 group-hover:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-gray-400 group-hover:text-gray-200">Videos</span>
              <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
            </button>

            <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-800 transition-colors group">
              <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-xs text-gray-400 group-hover:text-gray-200">Docs</span>
              <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
            </button>

            <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-green-500/10 border border-green-500/30">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="text-xs text-green-400 font-medium">Code</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
            </button>

            <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-800 transition-colors opacity-40 cursor-not-allowed">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span className="text-xs text-gray-500">Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Instructions */}
        <div className="lg:w-80 border-r border-gray-800 overflow-y-auto bg-gray-900/50">
          <div className="p-4 space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-blue-400 mb-2">💡 Key Concepts</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                <strong>Variables</strong> store information.<br/>
                <strong>print()</strong> displays text on screen.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-2">🎯 Try This</h3>
              <div className="bg-gray-800/50 rounded-lg p-3 space-y-2 text-xs">
                <div className="text-gray-300">
                  <span className="text-yellow-400 font-bold">1.</span> Click "Run Code" to see the output
                </div>
                <div className="text-gray-300">
                  <span className="text-yellow-400 font-bold">2.</span> Change the name to yours
                </div>
                <div className="text-gray-300">
                  <span className="text-yellow-400 font-bold">3.</span> Add a new variable called <code className="text-green-400 bg-gray-900 px-1 rounded">school</code>
                </div>
                <div className="text-gray-300">
                  <span className="text-yellow-400 font-bold">4.</span> Print your school name
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive IDE */}
        <div className="flex-1 flex flex-col">
          <InteractiveIDE
            language="python"
            initialCode={pythonStarterCode}
            onCodeChange={setUserCode}
            className="h-full"
          />
        </div>
      </div>

      {/* Footer with Next Steps */}
      <div className="border-t border-gray-800 bg-gray-900/50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-sm text-gray-400">
            <span className="text-green-400 font-semibold">Tip:</span> Try experimenting with different values and see what happens!
          </div>
          <Link
            href="/modules/python-basics"
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-colors"
          >
            Back to Module
          </Link>
        </div>
      </div>
    </div>
  );
}
