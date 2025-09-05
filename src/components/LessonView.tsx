'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lesson } from '@/types/lesson';
import { getUserProgress, updateUserProgress, markLessonComplete, startLesson, saveCurrentCode } from '@/utils/progress';
import TheoryRenderer from '@/components/TheoryRenderer';
import QuizComponent from '@/components/QuizComponent';
import CodeConsole from '@/components/CodeConsole';
import OutputPanel from '@/components/OutputPanel';
import VideoPlaceholder from '@/components/VideoPlaceholder';
import LessonTypeIcon from '@/components/LessonTypeIcon';
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
  const [hasError, setHasError] = useState(false);
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


  const runCode = (code: string) => {
    setIsRunning(true);
    setOutput('');
    setHasError(false);
    
    // Simple code execution simulation
    setTimeout(() => {
      try {
        // Create a simple sandbox for JavaScript execution
        if (lesson.language === 'javascript') {
          const logs: string[] = [];
          const mockConsole = {
            log: (...args: unknown[]) => {
              logs.push(args.map(arg => String(arg)).join(' '));
            }
          };
          
          // Simple evaluation (in a real app, use a proper sandbox)
          const func = new Function('console', code);
          func(mockConsole);
          
          setOutput(logs.join('\n') || 'Code executed successfully!');
          setHasError(false);
        } else if (lesson.language === 'python') {
          // For Python, we'd use a proper Python interpreter
          setOutput('Python execution not implemented in this demo');
          setHasError(false);
        }
      } catch (error) {
        const errorMessage = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
        setOutput(errorMessage);
        setHasError(true);
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

        <div className="p-6 space-y-8">
          {/* Lesson Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Theory Section */}
            <div className="space-y-6">
              {/* Video Placeholder - Show for video lessons */}
              {lesson.language !== 'theory' && (
                <VideoPlaceholder 
                  title={`${lesson.title} - Introduction`}
                  description="Watch this introduction video before starting the coding exercise"
                  duration="3:25"
                />
              )}
              
              <TheoryRenderer theory={lesson.content.theory} />
              
              <div className="bg-gradient-to-br from-green-400/10 to-green-500/10 p-6 rounded-xl border border-green-400/30 shadow-lg">
                <div className="flex items-center mb-4">
                  <LessonTypeIcon 
                    type={lesson.language === 'theory' ? 'theory' : 'coding'} 
                    size="md" 
                  />
                  <h3 className="text-xl font-bold text-green-400 ml-3">Task Instructions</h3>
                </div>
                <div className="text-green-200 leading-relaxed space-y-2">
                  {lesson.content.instructions.split('\n').map((line, index) => (
                    <div key={index} className="flex items-start font-medium">
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Section */}
            <div className="space-y-6">
              {/* Solution Toggle */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center gap-3">
                  <LessonTypeIcon type="coding" size="sm" />
                  Interactive Console
                </h3>
                <button
                  onClick={toggleSolution}
                  className="bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 hover:text-green-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  {showSolution ? 'Hide' : 'Show'} Solution
                </button>
              </div>
              
              {/* Code Console */}
              <CodeConsole
                language={lesson.language as 'javascript' | 'python' | 'html'}
                initialCode={currentCode}
                onCodeChange={setCurrentCode}
                onRun={runCode}
                isRunning={isRunning}
                className="shadow-2xl"
              />
              
              {/* Output Panel */}
              <OutputPanel
                output={output}
                isRunning={isRunning}
                hasError={hasError}
                className="shadow-2xl"
              />
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={checkSolution}
                  className="flex-1 bg-green-400 text-black px-6 py-3 rounded-xl hover:bg-green-300 transition-all duration-200 text-center font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {lesson.quiz && !quizCompleted ? 'Complete Lesson' : 'Check Solution'}
                </button>
              </div>
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