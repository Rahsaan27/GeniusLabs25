'use client';

import React from 'react';
import { Terminal, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface OutputPanelProps {
  output: string;
  isRunning?: boolean;
  hasError?: boolean;
  className?: string;
}

export default function OutputPanel({ 
  output, 
  isRunning = false, 
  hasError = false,
  className = '' 
}: OutputPanelProps) {
  const getStatusIcon = () => {
    if (isRunning) {
      return <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full" />;
    }
    if (hasError) {
      return <XCircle className="w-4 h-4 text-red-400" />;
    }
    if (output && !hasError) {
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    }
    return <Terminal className="w-4 h-4 text-gray-400" />;
  };

  const getStatusText = () => {
    if (isRunning) return 'Executing...';
    if (hasError) return 'Error';
    if (output && !hasError) return 'Success';
    return 'Ready';
  };

  const getStatusColor = () => {
    if (isRunning) return 'text-yellow-400';
    if (hasError) return 'text-red-400';
    if (output && !hasError) return 'text-green-400';
    return 'text-gray-400';
  };

  return (
    <div className={`bg-black rounded-xl border border-gray-700 overflow-hidden shadow-2xl ${className}`}>
      {/* Output Header */}
      <div className="bg-gray-900 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                Output • {getStatusText()}
              </span>
            </div>
          </div>
          
          {output && (
            <div className="text-xs text-gray-500">
              {output.split('\n').length} lines
            </div>
          )}
        </div>
      </div>
      
      {/* Output Content */}
      <div className="p-4 min-h-[120px] max-h-[300px] overflow-y-auto">
        {isRunning ? (
          <div className="flex items-center justify-center h-16">
            <div className="flex items-center gap-3 text-yellow-400">
              <div className="animate-spin w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full" />
              <span className="text-sm font-medium">Executing code...</span>
            </div>
          </div>
        ) : output ? (
          <pre className={`font-mono text-sm leading-relaxed whitespace-pre-wrap ${
            hasError ? 'text-red-300' : 'text-green-300'
          }`}>
            {output}
          </pre>
        ) : (
          <div className="flex items-center justify-center h-16">
            <div className="text-center text-gray-500">
              <Terminal className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Run your code to see the output here</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Output Footer for additional info */}
      {output && !isRunning && (
        <div className="bg-gray-800/30 px-4 py-2 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">
              Execution completed
            </span>
            {!hasError && (
              <span className="text-green-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Success
              </span>
            )}
            {hasError && (
              <span className="text-red-400 flex items-center gap-1">
                <XCircle className="w-3 h-3" />
                Error occurred
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}