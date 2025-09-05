'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';

interface CodeConsoleProps {
  language?: 'javascript' | 'python' | 'html';
  initialCode?: string;
  onCodeChange?: (code: string) => void;
  onRun?: (code: string) => void;
  output?: string;
  isRunning?: boolean;
  className?: string;
}

export default function CodeConsole({ 
  language = 'javascript',
  initialCode = '',
  onCodeChange,
  onRun,
  output = '',
  isRunning = false,
  className = ''
}: CodeConsoleProps) {
  const [code, setCode] = useState(initialCode);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleRun = () => {
    if (!isRunning && onRun) {
      onRun(code);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    onCodeChange?.(initialCode);
  };

  const getLanguageIcon = () => {
    switch (language) {
      case 'javascript':
        return '🟨';
      case 'python':
        return '🐍';
      case 'html':
        return '🌐';
      default:
        return '⚡';
    }
  };

  return (
    <div className={`bg-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-2xl ${className}`}>
      {/* Console Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Terminal Buttons */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-lg">{getLanguageIcon()}</span>
              <span className="text-sm font-medium text-gray-300 capitalize">{language} Console</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-all duration-200"
              title="Reset Code"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isRunning
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isRunning ? (
                <>
                  <Square size={14} />
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <Play size={14} />
                  <span>Run</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Code Editor */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleCodeChange}
          className="w-full h-64 p-4 bg-gray-900 text-green-300 font-mono text-sm resize-none focus:outline-none placeholder-gray-500 leading-relaxed"
          placeholder={`// Write your ${language} code here...`}
          spellCheck={false}
        />
        
        {/* Line Numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800/50 border-r border-gray-700 text-gray-500 text-xs font-mono select-none pointer-events-none">
          {code.split('\n').map((_, index) => (
            <div key={index} className="px-2 leading-relaxed h-[1.5rem] flex items-center justify-end">
              {index + 1}
            </div>
          ))}
        </div>
        
        <div className="pl-12">
          <style jsx>{`
            textarea {
              padding-left: 1rem;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}