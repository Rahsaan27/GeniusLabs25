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
      <div className="flex-1 flex items-center justify-center bg-black p-8">
        <div className="max-w-2xl w-full">
          <div className={`bg-gray-900/50 border-2 ${passed ? 'border-green-400' : 'border-red-400'} rounded-lg p-8 text-center`}>
            {/* Result Icon */}
            <div className="text-8xl mb-6">
              {passed ? '🎉' : '📚'}
            </div>

            {/* Title */}
            <h2 className={`text-3xl font-bold mb-4 ${passed ? 'text-green-400' : 'text-red-400'}`}>
              {passed ? 'Quiz Passed!' : 'Keep Practicing!'}
            </h2>

            {/* Score */}
            <div className="mb-6">
              <div className="text-6xl font-bold text-white mb-2">{score}%</div>
              <p className="text-gray-400">
                You got {selectedAnswers.filter((ans, idx) => ans === quiz.questions[idx].correctAnswer).length} out of {totalQuestions} questions correct
              </p>
            </div>

            {/* Message */}
            <p className="text-xl text-gray-300 mb-8">
              {passed
                ? `Great job! You scored ${score}% and need ${passingScore}% to pass.`
                : `You need ${passingScore}% to pass. Review the lesson and try again!`
              }
            </p>

            {/* Review incorrect answers */}
            {!passed && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 mb-6 text-left">
                <h3 className="text-lg font-bold text-red-400 mb-4">📝 Review These Topics:</h3>
                <ul className="space-y-2">
                  {quiz.questions.map((question, index) => {
                    if (selectedAnswers[index] !== question.correctAnswer) {
                      return (
                        <li key={question.id} className="text-gray-300">
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
            <div className="flex gap-4">
              {!passed && (
                <button
                  onClick={handleRetry}
                  className="flex-1 px-6 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg transition-colors"
                >
                  Try Again
                </button>
              )}
              {passed && (
                <button
                  onClick={handleFinish}
                  className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
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
    <div className="flex-1 flex flex-col bg-black p-8">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-gray-400">
              {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="h-2 bg-green-400 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 flex-1 flex flex-col">
          {/* Emoji */}
          <div className="text-6xl mb-6 text-center">
            {currentQuestion.emoji || '❓'}
          </div>

          {/* Question */}
          <h2 className="text-2xl font-bold text-white mb-8 text-center whitespace-pre-wrap">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-4 mb-8 flex-1">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === index;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 rounded-lg text-left transition-all ${
                    isSelected
                      ? 'bg-green-500/20 border-2 border-green-500 text-white'
                      : 'bg-gray-800 border-2 border-gray-700 text-gray-300 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-green-500 bg-green-500' : 'border-gray-600'
                    }`}>
                      {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="flex-1 font-mono">{option}</span>
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
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Submit Quiz' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
