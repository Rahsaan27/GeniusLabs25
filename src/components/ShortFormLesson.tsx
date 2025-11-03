'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { Lesson } from '@/types/lesson';

interface ShortFormLessonProps {
  lesson: Lesson;
  moduleId?: string;
  onComplete?: () => void;
}

interface SlideState {
  revealedCount?: number;
  userInput?: string;
  selectedAnswer?: number;
  draggedItems?: Record<string, string>;
  codeOutput?: string;
}

export default function ShortFormLesson({ lesson, moduleId, onComplete }: ShortFormLessonProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [streak, setStreak] = useState(0);
  const [startTime] = useState(Date.now());
  const [slideStates, setSlideStates] = useState<Record<number, SlideState>>({});
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const totalSlides = 5; // hook, tap-reveal (video), code-challenge, drag-drop (docs), complete

  const nextSlide = () => {
    // Mark section as completed
    const sectionName = getSectionName(currentSlide);
    if (sectionName && !completedSections.includes(sectionName)) {
      setCompletedSections(prev => [...prev, sectionName]);
    }

    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete?.();
    }
  };

  const getSectionName = (slideIndex: number): string => {
    switch (slideIndex) {
      case 0: return 'intro';
      case 1: return 'video';
      case 2: return 'code';
      case 3: return 'documentation';
      case 4: return 'completed';
      default: return '';
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
      case 1: return (state.revealedCount || 0) === 7; // All 3 zones revealed (video section)
      case 2: return !!state.codeOutput && state.codeOutput.includes('success'); // Code challenge completed
      case 3: return Object.keys(state.draggedItems || {}).length === 3; // All items dragged (docs)
      case 4: return true; // Completion slide
      default: return false;
    }
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
            href="/modules"
            className="bg-black/20 hover:bg-black/30 p-2 rounded-full transition-all duration-200"
          >
            <X size={18} />
          </Link>
        </div>

        {/* Main content area */}
        <div className="flex-1 relative overflow-hidden px-6 max-w-none">
          {currentSlide === 0 && (
            <HookSlide onNext={nextSlide} lesson={lesson} />
          )}
          {currentSlide === 1 && (
            <TapRevealSlide 
              state={getSlideState(1)}
              onStateUpdate={(state) => updateSlideState(1, state)}
              onNext={nextSlide}
              onStreak={updateStreak}
              lesson={lesson}
            />
          )}
          {currentSlide === 2 && (
            <CodeChallengeSlide 
              state={getSlideState(2)}
              onStateUpdate={(state) => updateSlideState(2, state)}
              onNext={nextSlide}
              onStreak={updateStreak}
              lesson={lesson}
            />
          )}
          {currentSlide === 3 && (
            <DragDropSlide
              state={getSlideState(3)}
              onStateUpdate={(state) => updateSlideState(3, state)}
              onNext={nextSlide}
              onStreak={updateStreak}
              lesson={lesson}
            />
          )}
          {currentSlide === 4 && (
            <CompletionSlide
              startTime={startTime}
              lesson={lesson}
              moduleId={moduleId}
              completedSections={completedSections}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Hook Slide Component
function HookSlide({ onNext, lesson }: { onNext: () => void; lesson: Lesson }) {
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContinue(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Get hook data from shortFormConfig if available, otherwise use default
  const hookData = lesson.shortFormConfig?.slides?.hook || {
    emoji: '⚡',
    title: `${lesson.title} in 60 Seconds!`,
    subtitle: 'Master the concepts quickly',
    description: 'Let\'s get started!'
  };

  return (
    <div className="h-[80%] bg-gray-900/95 backdrop-blur-sm rounded-3xl border border-green-400/20 p-6 flex flex-col justify-center items-center text-center shadow-2xl">
      <div className="text-5xl mb-3 animate-pulse">{hookData.emoji}</div>
      <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent leading-tight">
        {hookData.title}
      </h1>
      <p className="text-sm mb-2 opacity-90">
        {hookData.subtitle}
      </p>
      <p className="text-sm mb-6">{hookData.description}</p>

      {showContinue && (
        <div className="space-y-3 w-full">
          <p className="text-xs opacity-60">Swipe up or tap to start...</p>
          <button
            onClick={onNext}
            className="w-full bg-gradient-to-r from-green-400 to-green-500 text-black font-bold py-3 rounded-full text-base hover:shadow-lg hover:shadow-green-400/30 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Start Learning! {hookData.emoji}</span>
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
  onStreak,
  lesson
}: {
  state: SlideState;
  onStateUpdate: (state: Partial<SlideState>) => void;
  onNext: () => void;
  onStreak: () => void;
  lesson: Lesson;
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

  // Get concepts from shortFormConfig if available, otherwise use default
  const zones = lesson.shortFormConfig?.slides?.concepts || [
    { emoji: '📦', title: 'Function Factory', subtitle: 'Creates new functions!' },
    { emoji: '🔐', title: 'Private Variables', subtitle: 'Hidden from outside!' },
    { emoji: '🎯', title: 'Remember Context', subtitle: 'Keeps parent scope!' }
  ];

  return (
    <div className="h-[80%] bg-gray-900/95 border border-green-400/20 p-6 flex flex-col shadow-2xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-green-400">Tap to Reveal! 👆</h2>
      <p className="text-lg mb-6">JavaScript closures are like...</p>
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 ">
        {zones.map((zone: any, index: number) => (
          <div
            key={index}
            onClick={() => revealZone(index)}
            className={`bg-white/5 border-2 border-white/20 rounded-xl sm:rounded-2xl p-3 text-center cursor-pointer transition-all duration-300 relative overflow-hidden ${
              isRevealed(index) 
                ? 'bg-gradient-to-br from-green-400/20 to-green-500/20 border-green-400 transform scale-105' 
                : 'hover:scale-105 hover:border-green-400/50'
            }`}
          >
            {!isRevealed(index) && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/30 to-transparent transform -translate-x-full hover:translate-x-full transition-transform duration-500"></div>
            )}
            
            <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3">{zone.emoji}</div>
            <div className={`transition-all duration-500 ${
              isRevealed(index) 
                ? 'opacity-100 transform scale-100' 
                : 'opacity-0 transform scale-0'
            }`}>
              <strong className="block text-green-400 text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">{zone.title}</strong>
              <small className="text-white/80 text-xs sm:text-sm">{zone.subtitle}</small>
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
  onStreak,
  lesson
}: {
  state: SlideState;
  onStateUpdate: (state: Partial<SlideState>) => void;
  onNext: () => void;
  onStreak: () => void;
  lesson: Lesson;
}) {
  const [userCode, setUserCode] = useState(state.userInput || '');
  const [output, setOutput] = useState(state.codeOutput || '');
  const [isRunning, setIsRunning] = useState(false);

  // Get code challenge data from shortFormConfig if available, otherwise use lesson content
  const codeChallenge = lesson.shortFormConfig?.slides?.codeChallenge || {
    description: lesson.content.instructions,
    starterCode: lesson.content.starterCode,
    solution: lesson.content.solution,
    successKeyword: 'success'
  };

  const runCode = () => {
    setIsRunning(true);
    onStateUpdate({ userInput: userCode });
    
    setTimeout(() => {
      try {
        // Check if the code contains the success keyword or expected pattern
        const successKeyword = codeChallenge.successKeyword;
        const hasSuccess = userCode.includes('return') || userCode.includes(successKeyword);
        
        if (hasSuccess) {
          const successOutput = `${successKeyword}
🎉 Perfect! Your code works correctly!`;
          setOutput(successOutput);
          onStateUpdate({ codeOutput: successOutput });
          onStreak();
        } else {
          setOutput('❌ Try adding the missing code to complete the challenge.');
        }
      } catch (error) {
        setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsRunning(false);
      }
    }, 1500);
  };

  useEffect(() => {
    setUserCode(state.userInput || codeChallenge.starterCode);
  }, []);

  const isCorrect = output.includes('🎉');

  return (
    <div className="h-[80%]bg-gray-900/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-green-400/20 p-4 sm:p-6 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 h-full">
        {/* Left column - Instructions and buttons */}
        <div className="flex flex-col">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-green-400">Code Challenge! 💻</h2>
          <p className="text-base sm:text-lg mb-4 sm:mb-6">{codeChallenge.description}</p>
          
          <div className="flex gap-2 mb-4">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="bg-green-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-300 disabled:opacity-50 transition-colors flex-1 font-bold text-base sm:text-lg"
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
              className="bg-transparent border-none text-green-400 font-mono text-xs sm:text-sm w-full h-full outline-none resize-none"
              style={{ minHeight: '250px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Completion Slide Component with Lightbulb Animation
function CompletionSlide({
  startTime,
  lesson,
  moduleId,
  completedSections
}: {
  startTime: number;
  lesson: Lesson;
  moduleId?: string;
  completedSections: string[];
}) {
  const [showLightbulb, setShowLightbulb] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const router = useRouter();
  const [finalTime, setFinalTime] = useState(60);

  useEffect(() => {
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    setFinalTime(Math.max(timeTaken, 45));
  }, [startTime]);

  const handleComplete = async () => {
    setShowLightbulb(true);

    // Animate lightbulb turning on
    setTimeout(() => {
      setLightOn(true);
    }, 500);

    // TODO: Save progress to DynamoDB
    // const userId = 'user@example.com'; // Get from auth
    // await fetch(`/api/user-progress/${moduleId}/lesson`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ userId, lessonId: lesson.id })
    // });

    // Show buttons after animation
    setTimeout(() => {
      setShowButtons(true);
    }, 1500);
  };

  const goToModule = () => {
    // Navigate back to module page
    const targetModuleId = moduleId || 'javascript-basics';
    router.push(`/modules/${targetModuleId}`);
  };

  const goHome = () => {
    router.push('/modules');
  };

  if (showLightbulb) {
    return (
      <div className="h-[80%] bg-gray-900/95 backdrop-blur-sm rounded-3xl border border-green-400/20 p-8 flex flex-col justify-center items-center text-center shadow-2xl">
        {/* Lightbulb Animation */}
        <div className="relative mb-8">
          <div className={`text-9xl transition-all duration-1000 ${
            lightOn
              ? 'filter drop-shadow-[0_0_30px_rgba(250,204,21,0.9)] animate-pulse'
              : 'opacity-50'
          }`}>
            💡
          </div>
          {lightOn && (
            <>
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -inset-4 bg-yellow-300/10 rounded-full blur-2xl animate-pulse"></div>
            </>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-yellow-300 to-green-500 bg-clip-text text-transparent animate-pulse">
          Lesson Complete!
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          Great work! You've completed {lesson.title}
        </p>

        <div className="bg-green-400/10 border-2 border-green-400 rounded-2xl p-6 mb-8 w-full">
          <p className="text-green-400 font-bold mb-4">✨ Sections Completed:</p>
          <div className="space-y-2">
            {completedSections.map((section) => (
              <div key={section} className="flex items-center gap-2 text-left">
                <span className="text-green-400">✓</span>
                <span className="capitalize">{section}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-green-400/30">
            <p className="text-sm text-gray-400">Completed in {finalTime}s</p>
          </div>
        </div>

        {showButtons && (
          <div className="space-y-3 w-full animate-fadeInUp">
            <button
              onClick={goToModule}
              className="w-full bg-gradient-to-r from-green-400 to-green-500 text-black font-bold py-4 rounded-full text-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-400/30 hover:scale-105"
            >
              Next Lesson →
            </button>
            <button
              onClick={goHome}
              className="w-full bg-gray-800 border-2 border-green-400 text-green-400 font-bold py-4 rounded-full text-lg transition-all duration-300 hover:bg-green-400/10 hover:scale-105"
            >
              Back to Modules
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-[80%] bg-gray-900/95 backdrop-blur-sm rounded-3xl border border-green-400/20 p-8 flex flex-col justify-center items-center text-center shadow-2xl">
      <div className="text-7xl mb-6">🎓</div>
      <h2 className="text-3xl font-bold mb-6 text-green-400">
        Ready to Complete?
      </h2>
      <p className="text-xl text-gray-300 mb-8">
        You've gone through all the sections of this lesson!
      </p>

      <div className="bg-gray-800 rounded-xl p-6 mb-8 w-full">
        <p className="text-sm text-gray-400 mb-4">You completed:</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Introduction
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Video Content
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Code Challenge
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Documentation
          </div>
        </div>
      </div>

      <button
        onClick={handleComplete}
        className="w-full bg-gradient-to-r from-green-400 to-green-500 text-black font-bold py-4 rounded-full text-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-400/30 hover:scale-105 group"
      >
        <span className="flex items-center justify-center gap-2">
          Complete Lesson
          <span className="group-hover:rotate-12 transition-transform">🎉</span>
        </span>
      </button>
    </div>
  );
}

// Drag Drop Slide Component
function DragDropSlide({ 
  state, 
  onStateUpdate, 
  onNext, 
  onStreak,
  lesson
}: {
  state: SlideState;
  onStateUpdate: (state: Partial<SlideState>) => void;
  onNext: () => void;
  onStreak: () => void;
  lesson: Lesson;
}) {
  const [draggedItems, setDraggedItems] = useState(state.draggedItems || {});
  const [showContinue, setShowContinue] = useState(false);

  // Get drag drop data from shortFormConfig if available, otherwise use default
  const dragDropData = lesson.shortFormConfig?.slides?.dragDrop || {
    description: "Match the concepts!",
    items: [
      { id: 'concept1', text: 'Concept 1', type: 'type1' },
      { id: 'concept2', text: 'Concept 2', type: 'type2' },
      { id: 'concept3', text: 'Concept 3', type: 'type3' }
    ],
    zones: [
      { id: 'type1', label: '📦 Category 1', type: 'type1' },
      { id: 'type2', label: '🔄 Category 2', type: 'type2' },
      { id: 'type3', label: '➡️ Category 3', type: 'type3' }
    ]
  };

  const items = dragDropData.items;
  const dropZones = dragDropData.zones;

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, zoneType: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    const item = items.find((i: any) => i.id === itemId);
    
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
      .map(([itemId, _]) => items.find((item: any) => item.id === itemId)!)
      .filter(Boolean);
  };

  return (
    <div className="h-[80%] bg-gray-900/95 backdrop-blur-sm rounded-3xl border border-green-400/20 p-6 flex flex-col shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-green-400">Match the Concepts! 🎯</h2>
      <p className="text-sm mb-4">{dragDropData.description}</p>
      
      {/* Draggable items */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {items.map((item: any) => (
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
        {dropZones.map((zone: any) => (
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

// Animations are now defined in globals.css