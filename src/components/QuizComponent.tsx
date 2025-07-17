'use client';

import React, { useState, useEffect } from 'react';
import { Quiz, QuizQuestion } from '@/types/lesson';

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: (score: number, passed: boolean) => void;
  onClose: () => void;
  isRequired?: boolean; // If true, quiz must be passed to close
}

export default function QuizComponent({ quiz, onComplete, onClose, isRequired = false }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(quiz.timePerQuestion);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  // Timer effect
  useEffect(() => {
    if (isQuizComplete || showResults) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - auto-select no answer and move to next
          handleNextQuestion(-1);
          return quiz.timePerQuestion;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, isQuizComplete, showResults, quiz.timePerQuestion]);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(quiz.timePerQuestion);
  }, [currentQuestionIndex, quiz.timePerQuestion]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = (selectedAnswer?: number) => {
    // Record the answer (or -1 for no answer/timeout)
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer ?? selectedAnswers[currentQuestionIndex] ?? -1;
    setSelectedAnswers(newAnswers);

    if (isLastQuestion) {
      // Quiz is complete
      setIsQuizComplete(true);
      calculateResults(newAnswers);
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const calculateResults = (answers: number[]) => {
    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = finalScore >= quiz.passingScore;
    
    setScore(finalScore);
    setShowResults(true);
    onComplete(finalScore, passed);
  };

  const getTimePercentage = () => {
    return (timeLeft / quiz.timePerQuestion) * 100;
  };

  const getTimerColor = () => {
    const percentage = getTimePercentage();
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  if (showResults) {
    const correctAnswers = selectedAnswers.filter((answer, index) => 
      answer === quiz.questions[index].correctAnswer
    ).length;
    const passed = score >= quiz.passingScore;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="bg-gray-900 rounded-2xl p-8 mx-4 max-w-2xl w-full border border-green-400/20">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {passed ? '🎉' : '📚'}
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {passed ? 'Congratulations!' : 'Keep Learning!'}
            </h2>
            <div className="text-xl text-gray-300 mb-6">
              You scored {score}% ({correctAnswers}/{quiz.questions.length} correct)
            </div>
            
            <div className={`text-lg font-semibold mb-6 ${passed ? 'text-green-400' : 'text-orange-400'}`}>
              {passed 
                ? `Great job! You passed with ${score}%!`
                : `You need ${quiz.passingScore}% to pass. You got ${score}%. Try again!`
              }
            </div>

            {/* Question Review */}
            <div className="text-left bg-gray-800/50 rounded-lg p-4 mb-6 max-h-60 overflow-y-auto">
              <h3 className="text-lg font-semibold text-white mb-3">Review:</h3>
              {quiz.questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                const wasSkipped = userAnswer === -1;
                
                return (
                  <div key={question.id} className="mb-3 pb-3 border-b border-gray-700 last:border-b-0">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">
                        {isCorrect ? '✅' : wasSkipped ? '⏭️' : '❌'}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-300 mb-1">
                          {question.question}
                        </p>
                        {!isCorrect && (
                          <p className="text-xs text-green-400">
                            {question.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 justify-center">
              {passed || !isRequired ? (
                <button
                  onClick={onClose}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Continue Learning
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-orange-400 mb-4 text-sm">
                    You must pass the quiz to continue to the next lesson!
                  </p>
                </div>
              )}
              {!passed && (
                <button
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setSelectedAnswers([]);
                    setTimeLeft(quiz.timePerQuestion);
                    setIsQuizComplete(false);
                    setShowResults(false);
                    setScore(0);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl p-8 mx-4 max-w-2xl w-full border border-green-400/20">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{quiz.title}</h2>
          {!isRequired && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
          )}
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
            <span className="text-sm text-gray-400">
              {timeLeft}s remaining
            </span>
          </div>
          
          {/* Timer Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${getTimerColor()}`}
              style={{ width: `${getTimePercentage()}%` }}
            ></div>
          </div>

          {/* Question Progress */}
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div 
              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {currentQuestion.emoji && (
              <span className="text-3xl">{currentQuestion.emoji}</span>
            )}
            <h3 className="text-xl font-semibold text-white">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === index;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 rounded-lg text-left transition-all duration-200 border-2 ${
                    isSelected 
                      ? 'bg-gray-700/50 border-gray-500 text-white' 
                      : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-800/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-gray-400 bg-gray-400' : 'border-gray-600'
                    }`}>
                      {isSelected && <div className="w-3 h-3 rounded-full bg-gray-800"></div>}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            {selectedAnswers[currentQuestionIndex] !== undefined 
              ? '✅ Answer selected' 
              : '⏰ Select an answer or wait for timeout'
            }
          </div>
          
          <button
            onClick={() => handleNextQuestion()}
            disabled={selectedAnswers[currentQuestionIndex] === undefined}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}