'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lesson } from '@/types/lesson';
import { getUserProgress, updateUserProgress, markLessonComplete, startLesson, saveCurrentCode } from '@/utils/progress';
import TheoryRenderer from '@/components/TheoryRenderer';
import QuizComponent from '@/components/QuizComponent';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';
import jsLogo from '@/assets/javascript.png';
import pythonLogo from '@/assets/python.png';

interface LessonViewProps {
  lesson: Lesson;
  onComplete?: () => void;
}

export default function LessonView({ lesson, onComplete }: LessonViewProps) {
  const [currentCode, setCurrentCode] = useState(lesson.content.starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    // Load existing progress
    const progress = getUserProgress(lesson.id);
    if (progress?.currentCode) {
      setCurrentCode(progress.currentCode);
    }
    
    // Mark lesson as started
    startLesson(lesson.id);
  }, [lesson.id]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCurrentCode(newCode);
    // Save code automatically
    saveCurrentCode(lesson.id, newCode);
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    
    // Simple code execution simulation
    setTimeout(() => {
      try {
        // Create a simple sandbox for JavaScript execution
        if (lesson.language === 'javascript') {
          const logs: string[] = [];
          const mockConsole = {
            log: (...args: any[]) => {
              logs.push(args.map(arg => String(arg)).join(' '));
            }
          };
          
          // Simple evaluation (in a real app, use a proper sandbox)
          const func = new Function('console', currentCode);
          func(mockConsole);
          
          setOutput(logs.join('\n') || 'Code executed successfully!');
        } else if (lesson.language === 'python') {
          // For Python, we'd use a proper Python interpreter
          setOutput('Python execution not implemented in this demo');
        }
      } catch (error) {
        setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsRunning(false);
      }
    }, 1000);
  };

  const checkSolution = () => {
    // Simple solution checking (in a real app, use proper test runners)
    const isCorrect = currentCode.trim().length > lesson.content.starterCode.trim().length;
    
    if (isCorrect) {
      // If lesson has a quiz and it's not completed yet, automatically show the quiz
      if (lesson.quiz && !quizCompleted) {
        setOutput('🎉 Great job! Your code looks good! Now let\'s test your knowledge with a quiz.');
        setTimeout(() => {
          setShowQuiz(true);
        }, 1500); // Small delay to let them read the message
      } else {
        // No quiz or quiz already completed - finish the lesson
        const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // minutes
        markLessonComplete(lesson.id, 100);
        updateUserProgress(lesson.id, { timeSpent });
        setOutput('🎉 Congratulations! You completed the lesson!');
        onComplete?.();
      }
    } else {
      setOutput('❌ Not quite right. Try again!');
    }
  };

  const handleQuizComplete = (score: number, passed: boolean) => {
    setQuizCompleted(true);
    if (passed) {
      const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // minutes
      markLessonComplete(lesson.id, score);
      updateUserProgress(lesson.id, { timeSpent });
      onComplete?.();
    }
  };

  const toggleSolution = () => {
    setShowSolution(!showSolution);
    if (!showSolution) {
      setCurrentCode(lesson.content.solution);
    } else {
      setCurrentCode(lesson.content.starterCode);
    }
  };

  const getLanguageLogo = (language: string) => {
    switch(language) {
      case 'javascript': return jsLogo;
      case 'python': return pythonLogo;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-black min-h-screen">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-green-400/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-black p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {getLanguageLogo(lesson.language) && (
                <Image
                  src={getLanguageLogo(lesson.language)!}
                  alt={`${lesson.language} logo`}
                  width={40}
                  height={40}
                  className="w-10 h-10 mr-4"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
                <p className="text-black/80">{lesson.description}</p>
              </div>
            </div>
            <Link
              href="/activity"
              className="bg-black/20 hover:bg-black/30 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center space-x-2"
            >
              <span>❌</span>
              <span>Exit</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-black/20 px-3 py-1 rounded-full text-sm">
              {lesson.difficulty}
            </span>
            <span className="bg-black/20 px-3 py-1 rounded-full text-sm">
              {lesson.estimatedTime} min
            </span>
            <span className="bg-black/20 px-3 py-1 rounded-full text-sm">
              {lesson.language}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 p-6">
          {/* Theory Section */}
          <div className="space-y-6">
            <TheoryRenderer theory={lesson.content.theory} />
            
            <div className="bg-gradient-to-br from-green-400/10 to-green-500/10 p-6 rounded-xl border border-green-400/30 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">📝</span>
                </div>
                <h3 className="text-xl font-bold text-green-400">Task Instructions</h3>
              </div>
              <div className="text-green-200 leading-relaxed space-y-2">
                {lesson.content.instructions.split('\n').map((line, index) => (
                  <div key={index} className="flex items-start font-bold">
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Editor Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Code Editor</h3>
              <button
                onClick={toggleSolution}
                className="bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 hover:text-green-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
            </div>
            
            <textarea
              value={currentCode}
              onChange={handleCodeChange}
              className="w-full h-64 p-4 border border-gray-500 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-900 text-white placeholder-gray-400"
              placeholder="Write your code here..."
            />
            
            <div className="flex gap-2">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="bg-green-400 text-black px-4 py-2 rounded-lg hover:bg-green-300 disabled:opacity-50 transition-colors"
              >
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
              <button
                onClick={checkSolution}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                {lesson.quiz && !quizCompleted ? 'Complete Lesson' : 'Check Solution'}
              </button>
            </div>
            
            {/* Output */}
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm min-h-[100px] border border-green-400/20">
              <div className="text-gray-500 mb-2">Output:</div>
              {output ? (
                <pre className="whitespace-pre-wrap">{output}</pre>
              ) : (
                <div className="text-gray-600 italic">Run your code to see the output here...</div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Quiz Component */}
      {showQuiz && lesson.quiz && (
        <QuizComponent
          quiz={lesson.quiz}
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
          isRequired={true}
        />
      )}
    </div>
  );
}