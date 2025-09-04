'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Lesson } from '@/types/lesson';

interface ShortFormLessonProps {
  lesson: Lesson;
  onComplete?: () => void;
}

interface SlideState {
  revealedCount?: number;
  userInput?: string;
  selectedAnswer?: number;
  draggedItems?: Record<string, string>;
  codeOutput?: string;
}

export default function ShortFormLesson({ lesson, onComplete }: ShortFormLessonProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [streak, setStreak] = useState(0);
  const [startTime] = useState(Date.now());
  const [slideStates, setSlideStates] = useState<Record<number, SlideState>>({});

  const totalSlides = 6; // hook, tap-reveal, code-challenge, quiz, drag-drop, victory

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete?.();
    }
  };

  const updateStreak = () => {
    setStreak(prev => prev + 1);
  };

  const updateSlideState = (slideIndex: number, state: Partial<SlideState>) => {
    setSlideStates(prev => ({
      ...prev,
      [slideIndex]: { ...prev[slideIndex], ...state }
    }));
  };

  const getSlideState = (slideIndex: number): SlideState => {
    return slideStates[slideIndex] || {};
  };

  // Touch/swipe support
  useEffect(() => {
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      if (touchStartY - touchEndY > 50) {
        // Swipe up to continue (if slide is ready)
        const currentSlideState = getSlideState(currentSlide);
        if (canProceedFromSlide(currentSlide, currentSlideState)) {
          nextSlide();
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlide, slideStates]);

  const canProceedFromSlide = (slideIndex: number, state: SlideState): boolean => {
    switch (slideIndex) {
      case 0: return true; // Hook slide
      case 1: return (state.revealedCount || 0) === 7; // All 3 zones revealed (binary 111 = 7)
      case 2: return !!state.codeOutput && state.codeOutput.includes('success'); // Code challenge completed
      case 3: return !!state.selectedAnswer && state.selectedAnswer === getCorrectAnswer(); // Quiz answered correctly
      case 4: return Object.keys(state.draggedItems || {}).length === 3; // All items dragged
      case 5: return true; // Victory slide
      default: return false;
    }
  };

  const getCorrectAnswer = (): number => {
    // Based on our technical quiz question
    return 1; // Index of the correct answer
  };

  return (
    <div className="h-screen bg-black text-white overflow-hidden relative">
      <div className="relative z-10 h-full max-w-4xl mx-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
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
            <div className="bg-gradient-to-r from-green-400 to-green-500 text-black px-3 py-1.5 rounded-full font-bold text-sm flex items-center gap-1 animate-bounce">
              🔥 {streak}
            </div>
          )}

          {/* Exit button */}
          <Link
            href="/activity"
            className="bg-black/20 hover:bg-black/30 p-2 rounded-full transition-all duration-200"
          >
            <X size={18} />
          </Link>
        </div>

        {/* Main content area */}
        <div className="flex-1 relative overflow-hidden px-6 max-w-none">
          {currentSlide === 0 && (
            <HookSlide onNext={nextSlide} />
          )}
          {currentSlide === 1 && (
            <TapRevealSlide 
              state={getSlideState(1)}
              onStateUpdate={(state) => updateSlideState(1, state)}
              onNext={nextSlide}
              onStreak={updateStreak}
            />
          )}
          {currentSlide === 2 && (
            <CodeChallengeSlide 
              state={getSlideState(2)}
              onStateUpdate={(state) => updateSlideState(2, state)}
              onNext={nextSlide}
              onStreak={updateStreak}
            />
          )}
          {currentSlide === 3 && (
            <QuizSlide 
              state={getSlideState(3)}
              onStateUpdate={(state) => updateSlideState(3, state)}
              onNext={nextSlide}
              onStreak={updateStreak}
            />
          )}
          {currentSlide === 4 && (
            <DragDropSlide 
              state={getSlideState(4)}
              onStateUpdate={(state) => updateSlideState(4, state)}
              onNext={nextSlide}
              onStreak={updateStreak}
            />
          )}
          {currentSlide === 5 && (
            <VictorySlide startTime={startTime} />
          )}
        </div>
      </div>
    </div>
  );
}

// Hook Slide Component
function HookSlide({ onNext }: { onNext: () => void }) {
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContinue(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full bg-gray-900/95 backdrop-blur-sm rounded-3xl border border-green-400/20 p-8 flex flex-col justify-center items-center text-center shadow-2xl">
      <div className="text-8xl mb-6 animate-pulse">⚡</div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent leading-tight">
        JavaScript Closures in 60 Seconds!
      </h1>
      <p className="text-lg mb-4 opacity-90">
        Think closures are <span className="bg-gradient-to-r from-green-500 to-green-400 px-3 py-1 rounded-full font-bold animate-pulse">too complex</span>?
      </p>
      <p className="text-lg mb-8">We'll prove you wrong! 🚀</p>
      
      {showContinue && (
        <div className="space-y-4 w-full">
          <p className="text-sm opacity-60">Swipe up or tap to start...</p>
          <button 
            onClick={onNext}
            className="w-full bg-gradient-to-r from-green-400 to-green-500 text-black font-bold py-4 rounded-full text-lg hover:shadow-lg hover:shadow-green-400/30 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Master Closures! ⚡</span>
            <div className="absolute inset-0 bg-white/20 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      )}
    </div>
  );
}

// Tap Reveal Slide Component
function TapRevealSlide({ 
  state, 
  onStateUpdate, 
  onNext, 
  onStreak 
}: {
  state: SlideState;
  onStateUpdate: (state: Partial<SlideState>) => void;
  onNext: () => void;
  onStreak: () => void;
}) {
  const [showContinue, setShowContinue] = useState(false);

  const revealZone = (index: number) => {
    const currentRevealed = state.revealedCount || 0;
    const newRevealed = currentRevealed | (1 << index);
    onStateUpdate({ revealedCount: newRevealed });
    
    const totalRevealed = (newRevealed & 1) + ((newRevealed >> 1) & 1) + ((newRevealed >> 2) & 1);
    if (totalRevealed === 3) {
      onStreak();
      setTimeout(() => setShowContinue(true), 500);
    }
  };

  const isRevealed = (index: number) => ((state.revealedCount || 0) & (1 << index)) > 0;

  const zones = [
    { emoji: '📦', title: 'Function Factory', subtitle: 'Creates new functions!' },
    { emoji: '🔐', title: 'Private Variables', subtitle: 'Hidden from outside!' },
    { emoji: '🎯', title: 'Remember Context', subtitle: 'Keeps parent scope!' }
  ];

  return (
    <div className="h-full bg-gray-900/95 backdrop-blur-sm rounded-3xl border border-green-400/20 p-6 flex flex-col shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-green-400">Tap to Reveal! 👆</h2>
      <p className="text-lg mb-6">JavaScript closures are like...</p>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        {zones.map((zone, index) => (
          <div
            key={index}
            onClick={() => revealZone(index)}
            className={`bg-white/5 border-2 border-white/20 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 relative overflow-hidden ${
              isRevealed(index) 
                ? 'bg-gradient-to-br from-green-400/20 to-green-500/20 border-green-400 transform scale-105' 
                : 'hover:scale-105 hover:border-green-400/50'
            }`}
          >
            {!isRevealed(index) && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent transform -translate-x-full hover:translate-x-full transition-transform duration-500"></div>
            )}
            
            <div className="text-4xl mb-3">{zone.emoji}</div>
            <div className={`transition-all duration-500 ${
              isRevealed(index) 
                ? 'opacity-100 transform scale-100' 
                : 'opacity-0 transform scale-0'
            }`}>
              <strong className="block text-green-400 text-lg mb-2">{zone.title}</strong>
              <small className="text-white/80">{zone.subtitle}</small>
            </div>
          </div>
        ))}
      </div>

      {(state.revealedCount || 0) === 7 && (
        <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-4 mb-6 animate-bounce">
          <div className="text-green-400 font-bold text-center">Perfect! All revealed! 🎉</div>
        </div>
      )}

      {showContinue && (
        <button 
          onClick={onNext}
          className="mt-auto w-full bg-gradient-to-r from-green-400 to-green-500 text-black font-bold py-3 rounded-full text-base transition-all duration-300 hover:shadow-lg hover:shadow-green-400/30"
        >
          Continue →
        </button>
      )}
    </div>
  );
}

// Code Challenge Slide Component
function CodeChallengeSlide({ 
  state, 
  onStateUpdate, 
  onNext, 
  onStreak 
}: {
  state: SlideState;
  onStateUpdate: (state: Partial<SlideState>) => void;
  onNext: () => void;
  onStreak: () => void;
}) {
  const [userCode, setUserCode] = useState(state.userInput || '');
  const [output, setOutput] = useState(state.codeOutput || '');
  const [isRunning, setIsRunning] = useState(false);

  const starterCode = `function createCounter() {
  let count = 0;
  
  return function() {
    count = count + 1;
    // Return the count here
    
  };
}

const counter = createCounter();
console.log(counter());`;

  const runCode = () => {
    setIsRunning(true);
    onStateUpdate({ userInput: userCode });
    
    setTimeout(() => {
      try {
        // Simple check for the return statement
        const hasReturn = userCode.includes('return count');
        
        if (hasReturn) {
          const successOutput = `1
🎉 Perfect! Your closure works correctly!`;
          setOutput(successOutput);
          onStateUpdate({ codeOutput: successOutput });
          onStreak();
        } else {
          setOutput('❌ Add "return count" to complete the function.');
        }
      } catch (error) {
        setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsRunning(false);
      }
    }, 1500);
  };

  useEffect(() => {
    setUserCode(state.userInput || starterCode);
  }, []);

  const isCorrect = output.includes('🎉');

  return (
    <div className="h-full bg-gray-900/95 backdrop-blur-sm rounded-3xl border border-green-400/20 p-6 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Left column - Instructions and buttons */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-green-400">Code Challenge! 💻</h2>
          <p className="text-lg mb-6">Complete this closure to create a private counter:</p>
          
          <div className="flex gap-2 mb-4">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="bg-green-400 text-black px-6 py-3 rounded-lg hover:bg-green-300 disabled:opacity-50 transition-colors flex-1 font-bold text-lg"
            >
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
          </div>

          {/* Output */}
          <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm border border-green-400/20 mb-6">
            <div className="text-gray-500 mb-2">Output:</div>
            {output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <div className="text-gray-600 italic">Run your code to see the output...</div>
            )}
          </div>

          {isCorrect && (
            <button 
              onClick={onNext}
              className="w-full bg-gradient-to-r from-green-400 to-green-500 text-black font-bold py-3 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-400/30"
            >
              Excellent! Continue →
            </button>
          )}
        </div>

        {/* Right column - Code editor */}
        <div className="flex flex-col">
          <div className="bg-gray-800 border-2 border-green-400 rounded-2xl p-4 relative overflow-hidden flex-1">
            <div className="absolute top-3 right-4 text-xs text-green-400 opacity-70">▶ Complete & Run</div>
            <textarea
              value={userCode}
              onChange={(e) => {
                setUserCode(e.target.value);
                onStateUpdate({ userInput: e.target.value });
              }}
              className="bg-transparent border-none text-green-400 font-mono text-sm w-full h-full outline-none resize-none"
              style={{ minHeight: '350px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Quiz Slide Component
function QuizSlide({ 
  state, 
  onStateUpdate, 
  onNext, 
  onStreak 
}: {
  state: SlideState;
  onStateUpdate: (state: Partial<SlideState>) => void;
  onNext: () => void;
  onStreak: () => void;
}) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const question = "What happens to variables in a closure's outer scope?";
  const options = [
    "They are copied into the closure",
    "They remain accessible and live as long as the closure exists",
    "They are deleted when the function returns",
    "They become global variables"
  ];
  const correctAnswer = 1;
  const explanation = "Correct! Closures maintain references to their outer scope variables, keeping them alive!";

  const selectAnswer = (index: number) => {
    if (state.selectedAnswer !== undefined) return;
    
    onStateUpdate({ selectedAnswer: index });
    setShowFeedback(true);
    
    if (index === correctAnswer) {
      onStreak();
      setTimeout(() => setShowContinue(true), 1500);
    } else {
      setTimeout(() => {
        onStateUpdate({ selectedAnswer: undefined });
        setShowFeedback(false);
      }, 2500);
    }
  };

  return (
    <div className="h-full bg-gray-900/95 backdrop-blur-sm rounded-3xl border border-green-400/20 p-6 flex flex-col shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-green-400">Speed Round! 🏃‍♂️</h2>
      <p className="text-lg mb-6 font-semibold">{question}</p>
      
      <div className="space-y-3 mb-6 flex-1">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => selectAnswer(index)}
            className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden border-2 ${
              state.selectedAnswer === undefined
                ? 'bg-white/5 border-white/10 hover:border-green-400 hover:translate-x-1'
                : state.selectedAnswer === index
                  ? index === correctAnswer
                    ? 'bg-green-500/20 border-green-500 animate-pulse'
                    : 'bg-red-500/20 border-red-500 animate-shake'
                  : 'bg-white/5 border-white/10 opacity-50'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent transform -translate-x-full hover:translate-x-full transition-transform duration-500"></div>
            <div className="relative z-10 font-medium">{option}</div>
          </div>
        ))}
      </div>

      {showFeedback && (
        <div className={`p-4 rounded-xl mb-6 text-center font-bold animate-bounce ${
          state.selectedAnswer === correctAnswer
            ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
            : 'bg-red-500/20 border-2 border-red-500 text-red-400'
        }`}>
          {state.selectedAnswer === correctAnswer ? explanation : 'Not quite! Think about memory management...'}
        </div>
      )}

      {showContinue && (
        <button 
          onClick={onNext}
          className="w-full bg-gradient-to-r from-green-400 to-green-500 text-black font-bold py-3 rounded-full text-base transition-all duration-300 hover:shadow-lg hover:shadow-green-400/30"
        >
          Correct! →
        </button>
      )}
    </div>
  );
}

// Drag Drop Slide Component
function DragDropSlide({ 
  state, 
  onStateUpdate, 
  onNext, 
  onStreak 
}: {
  state: SlideState;
  onStateUpdate: (state: Partial<SlideState>) => void;
  onNext: () => void;
  onStreak: () => void;
}) {
  const [draggedItems, setDraggedItems] = useState(state.draggedItems || {});
  const [showContinue, setShowContinue] = useState(false);

  const items = [
    { id: 'outer-scope', text: 'Outer Scope Variables', type: 'accessible' },
    { id: 'private-state', text: 'Private State', type: 'maintained' },
    { id: 'memory-leaks', text: 'Memory Leaks', type: 'avoided' }
  ];

  const dropZones = [
    { id: 'accessible', label: '✅ Accessible in Closure', type: 'accessible' },
    { id: 'maintained', label: '🔒 Maintained Between Calls', type: 'maintained' },
    { id: 'avoided', label: '❌ Common Pitfall to Avoid', type: 'avoided' }
  ];

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, zoneType: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    const item = items.find(i => i.id === itemId);
    
    if (item && item.type === zoneType) {
      const newDraggedItems = { ...draggedItems, [itemId]: zoneType };
      setDraggedItems(newDraggedItems);
      onStateUpdate({ draggedItems: newDraggedItems });
      
      if (Object.keys(newDraggedItems).length === 3) {
        onStreak();
        setTimeout(() => setShowContinue(true), 500);
      }
    }
  };

  const isItemDragged = (itemId: string) => itemId in draggedItems;
  const getItemsInZone = (zoneType: string) => {
    return Object.entries(draggedItems)
      .filter(([_, type]) => type === zoneType)
      .map(([itemId, _]) => items.find(item => item.id === itemId)!)
      .filter(Boolean);
  };

  return (
    <div className="h-full bg-gray-900/95 backdrop-blur-sm rounded-3xl border border-green-400/20 p-6 flex flex-col shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-green-400">Match the Concepts! 🎯</h2>
      <p className="text-sm mb-4">Drag each concept to where it belongs in closures:</p>
      
      {/* Draggable items */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            !isItemDragged(item.id) && (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                className="bg-gradient-to-r from-green-500 to-green-400 text-black px-4 py-2 rounded-full cursor-grab active:cursor-grabbing font-bold text-sm transition-all duration-300 hover:scale-105"
              >
                {item.text}
              </div>
            )
          ))}
        </div>
      </div>
      
      {/* Drop zones */}
      <div className="space-y-3 flex-1">
        {dropZones.map((zone) => (
          <div
            key={zone.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, zone.type)}
            className="bg-gray-800 border-2 border-dashed border-green-400 rounded-xl p-4 min-h-16 transition-all duration-300 hover:bg-green-400/10 hover:scale-105"
          >
            <div className="text-green-400 font-bold text-sm mb-2">{zone.label}</div>
            <div className="flex flex-wrap gap-2">
              {getItemsInZone(zone.type).map((item) => (
                <div
                  key={item.id}
                  className="bg-green-400 text-black px-3 py-1 rounded-full text-sm font-bold"
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {Object.keys(draggedItems).length === 3 && (
        <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-4 mb-4 animate-bounce">
          <div className="text-green-400 font-bold text-center">Perfect matching! You understand closures! 🌟</div>
        </div>
      )}

      {showContinue && (
        <button 
          onClick={onNext}
          className="w-full bg-gradient-to-r from-green-400 to-green-500 text-black font-bold py-3 rounded-full text-base transition-all duration-300 hover:shadow-lg hover:shadow-green-400/30"
        >
          All correct! →
        </button>
      )}
    </div>
  );
}

// Victory Slide Component
function VictorySlide({ startTime }: { startTime: number }) {
  const [finalTime, setFinalTime] = useState(60);

  useEffect(() => {
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    setFinalTime(Math.max(timeTaken, 45)); // Minimum 45 seconds for realism
  }, [startTime]);

  return (
    <div className="h-full bg-gray-900/95 backdrop-blur-sm rounded-3xl border border-green-400/20 p-8 flex flex-col justify-center items-center text-center shadow-2xl">
      <div className="text-8xl mb-6 animate-bounce">🏆</div>
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
        You Mastered Closures!
      </h1>
      
      <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent mb-2">
        {finalTime}s
      </div>
      <p className="text-lg mb-6">To learn advanced JavaScript closures!</p>
      
      <div className="bg-green-400/5 border-2 border-green-400 rounded-2xl p-6 mb-8 w-full">
        <p className="text-center font-bold text-green-400 mb-4">🧠 You learned:</p>
        <div className="space-y-2 text-center">
          <p>✅ How closures capture scope</p>
          <p>✅ Private variables & encapsulation</p>
          <p>✅ Memory management in closures</p>
          <p>✅ Real-world closure patterns</p>
        </div>
      </div>
      
      <Link
        href="/activity"
        className="w-full bg-gradient-to-r from-green-400 to-green-500 text-black text-center font-bold py-4 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-400/30 hover:scale-105"
      >
        Explore More Lessons! 🚀
      </Link>
    </div>
  );
}

// Animations are now defined in globals.css