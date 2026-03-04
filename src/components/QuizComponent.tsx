'use client';

import { useState } from 'react';
import { Quiz, QuizQuestion } from '@/types/lesson';

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: (passed: boolean, score: number) => void;
}

export default function QuizComponent({ quiz, onComplete }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const passingScore = quiz.passingScore || 75;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final score
      let correctCount = 0;
      quiz.questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correctAnswer) {
          correctCount++;
        }
      });

      const finalScore = Math.round((correctCount / totalQuestions) * 100);
      setScore(finalScore);
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const handleFinish = () => {
    const passed = score >= passingScore;
    onComplete(passed, score);
  };

  if (showResults) {
    const passed = score >= passingScore;

    return (
      <div className="flex-1 flex flex-col bg-black p-4 pt-12 overflow-y-auto">
        <div className="max-w-2xl w-full mx-auto">
          <div className={`bg-gray-900/50 border-2 ${passed ? 'border-green-400' : 'border-red-400'} rounded-lg p-6 text-center`}>
            {/* Result Icon */}
            <div className="text-5xl mb-4">
              {passed ? '🎉' : '📚'}
            </div>

            {/* Title */}
            <h2 className={`text-2xl font-bold mb-3 ${passed ? 'text-green-400' : 'text-red-400'}`}>
              {passed ? 'Quiz Passed!' : 'Keep Practicing!'}
            </h2>

            {/* Score */}
            <div className="mb-4">
              <div className="text-4xl font-bold text-white mb-1">{score}%</div>
              <p className="text-sm text-gray-400">
                You got {selectedAnswers.filter((ans, idx) => ans === quiz.questions[idx].correctAnswer).length} out of {totalQuestions} questions correct
              </p>
            </div>

            {/* Message */}
            <p className="text-base text-gray-300 mb-6">
              {passed
                ? `Great job! You scored ${score}% and need ${passingScore}% to pass.`
                : `You need ${passingScore}% to pass. Review the lesson and try again!`
              }
            </p>

            {/* Review incorrect answers */}
            {!passed && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 pt-12 mb-4 text-left">
                <h3 className="text-base font-bold text-red-400 mb-3">📝 Review These Topics:</h3>
                <ul className="space-y-1.5">
                  {quiz.questions.map((question, index) => {
                    if (selectedAnswers[index] !== question.correctAnswer) {
                      return (
                        <li key={question.id} className="text-sm text-gray-300">
                          <span className="text-red-400">✗</span> Question {index + 1}: {question.question.substring(0, 50)}...
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {!passed && (
                <button
                  onClick={handleRetry}
                  className="flex-1 px-4 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  Try Again
                </button>
              )}
              {passed && (
                <button
                  onClick={handleFinish}
                  className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  Continue →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-black p-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-xs text-gray-400">
              {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div
              className="h-1.5 bg-green-400 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          {/* Emoji and Question */}
          <div className="mb-6">
            <div className="text-4xl mb-3 text-center">
              {currentQuestion.emoji || '❓'}
            </div>
            <h2 className="text-xl font-bold text-white text-center whitespace-pre-wrap">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === index;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-3 rounded-lg text-left transition-all ${
                    isSelected
                      ? 'bg-blue-500/20 border-2 border-blue-500 text-white'
                      : 'bg-gray-800 border-2 border-gray-700 text-gray-300 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-600'
                    }`}>
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="flex-1 font-mono text-sm">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Submit Quiz' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
