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
      <div className="flex-1 flex bg-black px-8 py-4 overflow-y-auto">
        <div className="max-w-2xl w-full mx-auto">
          <div className="bg-[#111] border border-[#1c1c1c] rounded-2xl p-12 text-center">
            {/* Result Icon */}
            <div className="text-7xl mb-6">
              {passed ? '🎉' : '📚'}
            </div>

            {/* Title */}
            <h2 className={`text-3xl font-bold mb-4 ${passed ? 'text-white' : 'text-white'}`}>
              {passed ? 'Quiz Completed!' : 'Keep Practicing!'}
            </h2>

            {/* Score Display */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-4" style={{
                background: passed
                  ? 'linear-gradient(135deg, rgba(255, 222, 33, 0.1), rgba(255, 222, 33, 0.05))'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                border: passed ? '2px solid #FFDE21' : '2px solid #333'
              }}>
                <span className="text-4xl font-bold" style={{ color: passed ? '#FFDE21' : '#999' }}>
                  {score}%
                </span>
              </div>
              <p className="text-base text-gray-400">
                {selectedAnswers.filter((ans, idx) => ans === quiz.questions[idx].correctAnswer).length} out of {totalQuestions} questions correct
              </p>
            </div>

            {/* Message */}
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-md mx-auto">
              {passed
                ? `Excellent work! You've passed with ${score}%.`
                : `You need ${passingScore}% to pass. Review the lesson and try again!`
              }
            </p>

            {/* Review incorrect answers */}
            {!passed && (
              <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 mb-8 text-left">
                <h3 className="text-base font-bold text-gray-200 mb-4 flex items-center gap-2">
                  <span style={{ color: '#FFDE21' }}>→</span> Review These Topics
                </h3>
                <ul className="space-y-3">
                  {quiz.questions.map((question, index) => {
                    if (selectedAnswers[index] !== question.correctAnswer) {
                      return (
                        <li key={question.id} className="text-sm text-gray-400 flex items-start gap-3 p-3 bg-[#111] rounded-lg border border-[#1c1c1c]">
                          <span className="text-red-400 mt-0.5">✗</span>
                          <span>Question {index + 1}: {question.question.substring(0, 60)}...</span>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              {!passed && (
                <button
                  onClick={handleRetry}
                  className="text-black px-12 py-5 font-bold text-lg rounded-2xl transition-all duration-150"
                  style={{
                    backgroundColor: '#FFDE21',
                    boxShadow: '0 6px 0 #E5C71D, 0 8px 12px rgba(0,0,0,0.3)',
                    transform: 'perspective(300px) rotateX(5deg)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFE84D';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'perspective(300px) rotateX(5deg) translateY(4px)';
                    e.currentTarget.style.boxShadow = '0 2px 0 #E5C71D, 0 4px 12px rgba(0,0,0,0.3)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'perspective(300px) rotateX(5deg) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 0 #E5C71D, 0 8px 12px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(300px) rotateX(5deg) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 0 #E5C71D, 0 8px 12px rgba(0,0,0,0.3)';
                    e.currentTarget.style.backgroundColor = '#FFDE21';
                  }}
                >
                  Try Again
                </button>
              )}
              {passed && (
                <button
                  onClick={handleFinish}
                  className="text-black px-12 py-5 font-bold text-lg rounded-2xl transition-all duration-150"
                  style={{
                    backgroundColor: '#FFDE21',
                    boxShadow: '0 6px 0 #E5C71D, 0 8px 12px rgba(0,0,0,0.3)',
                    transform: 'perspective(300px) rotateX(5deg)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFE84D';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'perspective(300px) rotateX(5deg) translateY(4px)';
                    e.currentTarget.style.boxShadow = '0 2px 0 #E5C71D, 0 4px 12px rgba(0,0,0,0.3)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'perspective(300px) rotateX(5deg) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 0 #E5C71D, 0 8px 12px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(300px) rotateX(5deg) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 0 #E5C71D, 0 8px 12px rgba(0,0,0,0.3)';
                    e.currentTarget.style.backgroundColor = '#FFDE21';
                  }}
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
    <div className="flex-1 flex bg-black px-8 py-4 overflow-y-auto">
      <div className="max-w-3xl w-full mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-400">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium" style={{ color: '#FFDE21' }}>
              {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-[#1c1c1c] rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                background: 'linear-gradient(90deg, #FFDE21, #FFE84D)'
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-[#111] border border-[#1c1c1c] rounded-2xl p-10">
          {/* Emoji and Question */}
          <div className="mb-10 text-center">
            <div className="text-6xl mb-6">
              {currentQuestion.emoji || '❓'}
            </div>
            <h2 className="text-2xl font-bold text-white leading-relaxed max-w-2xl mx-auto">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options - Grid Layout */}
          <div className="grid grid-cols-1 gap-4 mb-10">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === index;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-5 rounded-xl text-left transition-all duration-200 border-2 ${
                    isSelected
                      ? 'bg-[#FFDE21]/10 border-[#FFDE21] text-white'
                      : 'bg-[#0a0a0a] border-[#222] text-gray-300 hover:border-[#333] hover:bg-[#111]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected ? 'border-[#FFDE21] bg-[#FFDE21]' : 'border-gray-600'
                    }`}>
                      {isSelected && (
                        <div className="w-3 h-3 rounded-full bg-black"></div>
                      )}
                    </div>
                    <span className="flex-1 text-base font-medium">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-8 py-4 bg-[#1c1c1c] hover:bg-[#222] text-white font-medium rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#1c1c1c]"
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="px-8 py-4 font-bold rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={selectedAnswers[currentQuestionIndex] !== undefined ? {
                backgroundColor: '#FFDE21',
                color: '#000',
              } : {
                backgroundColor: '#1c1c1c',
                color: '#666'
              }}
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Submit Quiz' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
