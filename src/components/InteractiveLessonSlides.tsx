'use client';

import React, { useState, useEffect } from 'react';
import { Lesson } from '@/types/lesson';
import { X } from 'lucide-react';
import Link from 'next/link';

interface InteractiveLessonSlidesProps {
  lesson: Lesson;
  onComplete?: () => void;
}

interface SlideData {
  id: string;
  type: 'hook' | 'tap-reveal' | 'fill-blank' | 'quiz' | 'drag-drop' | 'victory';
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  emoji?: string;
}

export default function InteractiveLessonSlides({ lesson, onComplete }: InteractiveLessonSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [streak, setStreak] = useState(0);
  const [startTime] = useState(Date.now());
  const [slideStates, setSlideStates] = useState<Record<number, any>>({});

  // Convert lesson to interactive slides
  const slides = convertLessonToInteractiveSlides(lesson);
  const totalSlides = slides.length;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (currentSlide === totalSlides - 1) {
      onComplete?.();
    }
  };

  const updateStreak = () => {
    setStreak(prev => prev + 1);
  };

  const updateSlideState = (slideIndex: number, state: any) => {
    setSlideStates(prev => ({
      ...prev,
      [slideIndex]: { ...prev[slideIndex], ...state }
    }));
  };

  const getSlideState = (slideIndex: number) => {
    return slideStates[slideIndex] || {};
  };

  // Handle slide navigation events
  useEffect(() => {
    const handleNext = () => nextSlide();
    const handleStreak = () => updateStreak();
    
    window.addEventListener('nextSlide', handleNext);
    window.addEventListener('updateStreak', handleStreak);
    
    return () => {
      window.removeEventListener('nextSlide', handleNext);
      window.removeEventListener('updateStreak', handleStreak);
    };
  }, [currentSlide, totalSlides]);

  return (
    <div className="h-screen bg-black text-white overflow-hidden p-4">
      {/* Main container using CSS Grid */}
      <div className="h-[90%] max-w-2xl mx-auto grid grid-rows-[auto_1fr] gap-0">
        {/* Header Section - Fixed height for progress and controls */}
        <div className="relative h-16 flex items-center justify-center px-6">
          {/* Progress dots */}
          <div className="flex gap-1.5">
            {Array.from({ length: totalSlides }, (_, i) => (
              <div
                key={i}
                className={`w-10 h-1 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? 'bg-gradient-to-r from-green-400 to-green-300 shadow-lg shadow-green-400/50'
                    : i < currentSlide
                    ? 'bg-green-400'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Streak counter */}
          {streak > 0 && (
            <div className="absolute right-16 bg-gradient-to-r from-green-400 to-green-500 text-black px-3 py-1.5 rounded-full font-bold text-sm flex items-center gap-1 animate-bounce">
              🔥 {streak}
            </div>
          )}

          {/* Exit button */}
          <Link
            href="/activity"
            className="absolute right-6 bg-black/20 hover:bg-black/30 p-2 rounded-full transition-all duration-200"
          >
            <X size={18} />
          </Link>
        </div>

        {/* Content Section - Uses remaining height */}
        <div className="relative overflow-hidden p-2">
          {/* Slides */}
          {slides.map((slide, index) => (
            <SlideComponent
              key={slide.id}
              slide={slide}
              isActive={index === currentSlide}
              isCompleted={index < currentSlide}
              onNext={nextSlide}
              onStreak={updateStreak}
              slideState={getSlideState(index)}
              onStateUpdate={(state) => updateSlideState(index, state)}
              lesson={lesson}
              startTime={startTime}
              slideIndex={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Individual slide component
function SlideComponent({ 
  slide, 
  isActive, 
  isCompleted, 
  onNext, 
  onStreak,
  slideState,
  onStateUpdate,
  lesson,
  startTime,
  slideIndex
}: {
  slide: SlideData;
  isActive: boolean;
  isCompleted: boolean;
  onNext: () => void;
  onStreak: () => void;
  slideState: any;
  onStateUpdate: (state: any) => void;
  lesson: Lesson;
  startTime: number;
  slideIndex: number;
}) {
  const slideClasses = `
    absolute inset-0 bg-gray-900/95 backdrop-blur-xl 
    border border-white/10 rounded-3xl p-3 text-white 
    flex flex-col transition-all duration-500 cubic-bezier(0.68, -0.55, 0.265, 1.55)
    shadow-2xl shadow-black/50 overflow-hidden
    ${isActive ? 'opacity-100 translate-y-0 scale-100' : ''}
    ${isCompleted ? 'opacity-0 -translate-y-full scale-90' : ''}
    ${!isActive && !isCompleted ? 'opacity-0 translate-y-full' : ''}
  `;

  return (
    <div className={slideClasses}>
      {slide.content}
    </div>
  );
}

// Convert lesson to interactive slides
function convertLessonToInteractiveSlides(lesson: Lesson): SlideData[] {
  const slides: SlideData[] = [];

  // Slide 1: Hook
  slides.push({
    id: `${lesson.id}-hook`,
    type: 'hook',
    title: lesson.title,
    emoji: lesson.language === 'javascript' ? '📦' : '🐍',
    content: (
      <HookSlide 
        lesson={lesson}
      />
    )
  });

  // Slide 2: Interactive Tap Reveal
  slides.push({
    id: `${lesson.id}-tap-reveal`,
    type: 'tap-reveal',
    title: 'Tap to Reveal!',
    content: (
      <TapRevealSlide 
        lesson={lesson}
      />
    )
  });

  // Slide 3: Fill in the Blank
  slides.push({
    id: `${lesson.id}-fill-blank`,
    type: 'fill-blank',
    title: 'Quick! Fill the Gap!',
    content: (
      <FillBlankSlide 
        lesson={lesson}
      />
    )
  });

  // Slide 4: Quiz
  if (lesson.quiz && lesson.quiz.questions.length > 0) {
    slides.push({
      id: `${lesson.id}-quiz`,
      type: 'quiz',
      title: 'Speed Round!',
      content: (
        <QuizSlide 
          lesson={lesson}
        />
      )
    });
  }

  // Slide 5: Victory
  slides.push({
    id: `${lesson.id}-victory`,
    type: 'victory',
    title: 'You Did It!',
    emoji: '🏆',
    content: (
      <VictorySlide 
        lesson={lesson}
      />
    )
  });

  return slides;
}

// Hook slide component
function HookSlide({ lesson }: { lesson: Lesson }) {
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContinue(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="text-5xl mb-3 mt-6 animate-float text-center">
        {lesson.language === 'javascript' ? '📦' : '🐍'}
      </div>
      <h1 className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent text-center leading-tight">
        {lesson.title} in 60 Seconds!
      </h1>
      <p className="text-sm mb-2 opacity-90 text-center">
        Think you can't learn <span className="bg-gradient-to-r from-green-500 to-green-400 px-2 py-1 rounded-full font-bold animate-pulse text-xs">in 1 minute</span>?
      </p>
      <p className="text-sm mb-4 text-center">Let's prove you wrong! 🚀</p>
      
      {showContinue && (
        <div className="mt-auto space-y-3">
          <p className="text-sm opacity-60 text-center">Tap anywhere to start...</p>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('nextSlide'))}
            className="w-full bg-gradient-to-r from-green-400 to-green-500 text-black font-bold py-3 rounded-full text-base hover:shadow-lg hover:shadow-green-400/30 transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Let's Go! ⚡</span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      )}
    </>
  );
}

// Tap reveal slide component
function TapRevealSlide({ lesson }: { lesson: Lesson }) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  const revealZone = (index: number) => {
    setRevealedCount(prev => {
      const newCount = prev | (1 << index); // Use bitwise OR to track which zones are revealed
      const totalRevealed = (newCount & 1) + ((newCount >> 1) & 1) + ((newCount >> 2) & 1);
      
      if (totalRevealed === 3) {
        setTimeout(() => setShowContinue(true), 500);
      }
      return newCount;
    });
  };

  const isRevealed = (index: number) => (revealedCount & (1 << index)) > 0;

  return (
    <>
      <h2 className="text-xl font-bold mb-3 text-green-400">Tap to Reveal! 👆</h2>
      <p className="text-sm mb-4">Variables are like...</p>
      
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { emoji: '📦', title: 'Storage Boxes', subtitle: 'They hold your stuff!' },
          { emoji: '🏷️', title: 'Labels', subtitle: 'With names!' },
          { emoji: '🔄', title: 'Changeable', subtitle: 'Update anytime!' }
        ].map((zone, index) => (
          <div
            key={index}
            onClick={() => revealZone(index)}
            className={`flex-1 min-w-0 bg-white/5 border-2 border-white/20 rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 relative overflow-hidden ${
              isRevealed(index) 
                ? 'bg-gradient-to-br from-green-400/20 to-green-500/20 border-green-400 transform scale-105' 
                : 'hover:scale-105 hover:border-green-400/50'
            }`}
          >
            <div className="text-3xl mb-2">{zone.emoji}</div>
            <div className={`transition-all duration-300 ${isRevealed(index) ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-0'}`}>
              <strong className="block text-green-400">{zone.title}</strong>
              <small className="text-white/80">{zone.subtitle}</small>
            </div>
          </div>
        ))}
      </div>

      {revealedCount === 7 && ( // 111 in binary = 7
        <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-4 mb-6 animate-slideUp">
          <div className="text-green-500 font-bold text-center">Perfect! All revealed! 🎉</div>
        </div>
      )}

      {showContinue && (
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('nextSlide'))}
          className="mt-auto w-full bg-gradient-to-r from-green-400 to-green-500 text-black font-bold py-3 rounded-full text-base transition-all duration-300 hover:shadow-lg hover:shadow-green-400/30"
        >
          Continue →
        </button>
      )}
    </>
  );
}

// Fill blank slide component
function FillBlankSlide({ lesson }: { lesson: Lesson }) {
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const checkInput = (value: string) => {
    setInput(value);
    const regex = /^["'][^"']+["']$/;
    const correct = regex.test(value.trim());
    setIsCorrect(correct);
    
    if (correct && !showFeedback) {
      setShowFeedback(true);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-3 text-green-400">Quick! Fill the Gap! ⚡</h2>
      <p className="text-sm mb-3">Complete this variable:</p>
      
      <div className="bg-gray-800 border-2 border-green-400 rounded-2xl p-4 mb-4 relative overflow-hidden">
        <div className="absolute top-3 right-4 text-xs text-green-400 opacity-70">▶ Try it!</div>
        <div className="text-green-400 mb-4 font-mono text-lg">
          let playerName = 
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => checkInput(e.target.value)}
          className="bg-transparent border-none text-green-400 font-mono text-lg w-full outline-none placeholder-gray-500"
          placeholder='Type a name in quotes...'
        />
      </div>

      {showFeedback && (
        <div className={`p-4 rounded-xl mb-6 text-center font-bold animate-slideUp ${
          isCorrect 
            ? 'bg-green-500/20 border-2 border-green-500 text-green-400' 
            : 'bg-red-500/20 border-2 border-red-500 text-red-400'
        }`}>
          {isCorrect ? "Perfect! That's a valid string! ✨" : 'Use quotes like "Alex" or \'Sam\''}
        </div>
      )}

      <p className="text-sm opacity-60 mb-8">Hint: Use quotes like "Alex" or 'Sam'</p>

      {isCorrect && (
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('nextSlide'))}
          className="mt-auto w-full bg-gradient-to-r from-green-400 to-green-500 text-black font-bold py-3 rounded-full text-base transition-all duration-300 hover:shadow-lg hover:shadow-green-400/30"
        >
          Nice! Continue →
        </button>
      )}
    </>
  );
}

// Quiz slide component
function QuizSlide({ lesson }: { lesson: Lesson }) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const question = lesson.quiz?.questions[0];
  if (!question) return null;

  const selectAnswer = (index: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    if (index === question.correctAnswer) {
      setTimeout(() => setShowContinue(true), 1500);
    } else {
      // Re-enable selection after wrong answer
      setTimeout(() => {
        setSelectedAnswer(null);
        setShowFeedback(false);
      }, 2000);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-3 text-green-400">Speed Round! 🏃‍♂️</h2>
      <p className="text-sm mb-4">{question.question}</p>
      
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <div
            key={index}
            onClick={() => selectAnswer(index)}
            className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden border-2 ${
              selectedAnswer === null
                ? 'bg-white/5 border-white/10 hover:border-green-400 hover:translate-x-1'
                : selectedAnswer === index
                  ? index === question.correctAnswer
                    ? 'bg-green-500/20 border-green-500 animate-pulse'
                    : 'bg-red-500/20 border-red-500 animate-shake'
                  : 'bg-white/5 border-white/10 opacity-50'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent transform -translate-x-full hover:translate-x-full transition-transform duration-500"></div>
            <div className="relative z-10">{option}</div>
          </div>
        ))}
      </div>

      {showFeedback && (
        <div className={`p-4 rounded-xl mb-6 text-center font-bold animate-slideUp ${
          selectedAnswer === question.correctAnswer
            ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
            : 'bg-red-500/20 border-2 border-red-500 text-red-400'
        }`}>
          {selectedAnswer === question.correctAnswer ? question.explanation : 'Not quite! Try again...'}
        </div>
      )}

      {showContinue && (
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('nextSlide'))}
          className="mt-auto w-full bg-gradient-to-r from-green-400 to-green-500 text-black font-bold py-3 rounded-full text-base transition-all duration-300 hover:shadow-lg hover:shadow-green-400/30"
        >
          Correct! →
        </button>
      )}
    </>
  );
}

// Victory slide component
function VictorySlide({ lesson }: { lesson: Lesson }) {
  const [finalTime, setFinalTime] = useState(60);

  useEffect(() => {
    // Calculate time taken
    const timeTaken = Math.round((Date.now() - Date.now()) / 1000) || 60;
    setFinalTime(timeTaken);
  }, []);

  return (
    <>
      <div className="text-5xl mt-6 mb-2 animate-float text-center">🏆</div>
      <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent text-center">
        You Did It!
      </h1>
      
      <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent mb-2 text-center">
        {finalTime}
      </div>
      <p className="text-sm mb-4 text-center">Seconds to learn {lesson.title.toLowerCase()}!</p>
      
      <div className="bg-green-400/5 border-2 border-green-400 rounded-2xl p-4 mb-6">
        <p className="text-center font-bold text-green-400 mb-4">You learned:</p>
        <div className="space-y-2 text-center">
          <p>✅ What variables are</p>
          <p>✅ How to name them</p>
          <p>✅ Different types</p>
        </div>
      </div>
      
      <Link
        href="/activity"
        className="block w-full bg-gradient-to-r from-green-400 to-green-500 text-black text-center font-bold py-3 rounded-full text-base transition-all duration-300 hover:shadow-lg hover:shadow-green-400/30"
      >
        Back to Lessons! 🚀
      </Link>
    </>
  );
}