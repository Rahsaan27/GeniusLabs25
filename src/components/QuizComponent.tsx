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
        <div className="max-w-xl w-full mx-auto">
          <div className="bg-[#111] border border-[#1c1c1c] rounded-xl p-8 text-center">
            {/* Result Icon */}
            <div className="text-5xl mb-4">
              {passed ? '🎉' : '📚'}
            </div>

            {/* Title */}
            <h2 className={`text-2xl font-bold mb-3 ${passed ? 'text-white' : 'text-white'}`}>
              {passed ? 'Quiz Completed!' : 'Keep Practicing!'}
            </h2>

            {/* Score Display */}
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-3" style={{
                background: passed
                  ? 'linear-gradient(135deg, rgba(255, 222, 33, 0.1), rgba(255, 222, 33, 0.05))'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                border: passed ? '2px solid #FFDE21' : '2px solid #333'
              }}>
                <span className="text-3xl font-bold" style={{ color: passed ? '#FFDE21' : '#999' }}>
                  {score}%
                </span>
              </div>
              <p className="text-sm text-gray-400">
                {selectedAnswers.filter((ans, idx) => ans === quiz.questions[idx].correctAnswer).length} out of {totalQuestions} questions correct
              </p>
            </div>

            {/* Message */}
            <p className="text-base text-gray-300 mb-6 leading-relaxed">
              {passed
                ? `Excellent work! You've passed with ${score}%.`
                : `You need ${passingScore}% to pass. Review the lesson and try again!`
              }
            </p>

            {/* Actions */}
            <div className="flex gap-3 justify-center">
              {!passed && (
                <button
                  onClick={handleRetry}
                  className="text-black px-8 py-3 font-bold text-base rounded-xl transition-all duration-150"
                  style={{
                    backgroundColor: '#FFDE21',
                    boxShadow: '0 4px 0 #E5C71D, 0 6px 10px rgba(0,0,0,0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFE84D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFDE21';
                  }}
                >
                  Try Again
                </button>
              )}
              {passed && (
                <button
                  onClick={handleFinish}
                  className="text-black px-8 py-3 font-bold text-base rounded-xl transition-all duration-150"
                  style={{
                    backgroundColor: '#FFDE21',
                    boxShadow: '0 4px 0 #E5C71D, 0 6px 10px rgba(0,0,0,0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFE84D';
                  }}
                  onMouseLeave={(e) => {
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
    <div className="flex-1 flex bg-black px-6 py-4 overflow-y-auto">
      <div className="max-w-2xl w-full mx-auto">
        {/* Progress Bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-xs font-medium" style={{ color: '#FFDE21' }}>
              {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-[#1c1c1c] rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                background: 'linear-gradient(90deg, #FFDE21, #FFE84D)'
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-[#111] border border-[#1c1c1c] rounded-xl p-6">
          {/* Emoji and Question */}
          <div className="mb-6 text-center">
            <div className="text-4xl mb-3">
              {currentQuestion.emoji || '❓'}
            </div>
            <h2 className="text-lg font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options - 2x2 Grid Layout */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === index;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-4 rounded-lg text-left transition-all duration-200 border-2 ${
                    isSelected
                      ? 'bg-[#FFDE21]/10 border-[#FFDE21] text-white'
                      : 'bg-[#0a0a0a] border-[#222] text-gray-300 hover:border-[#333] hover:bg-[#111]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all mt-0.5 ${
                      isSelected ? 'border-[#FFDE21] bg-[#FFDE21]' : 'border-gray-600'
                    }`}>
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                      )}
                    </div>
                    <span className="flex-1 text-sm font-medium leading-snug">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center gap-3">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2.5 bg-[#1c1c1c] hover:bg-[#222] text-white text-sm font-medium rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#1c1c1c]"
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="px-6 py-2.5 text-sm font-bold rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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
