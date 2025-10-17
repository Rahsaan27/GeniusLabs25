'use client';

interface OutputConsoleProps {
  output: string;
  isRunning: boolean;
  hasError: boolean;
}

export default function OutputConsole({ output, isRunning, hasError }: OutputConsoleProps) {
  return (
    <div className="flex-1 h-full bg-[#2d2d2d] overflow-auto p-4 font-mono text-sm">
      {isRunning ? (
        <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium">
          <div className="w-3 h-3 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          <span>Running...</span>
        </div>
      ) : output ? (
        <pre className={`whitespace-pre-wrap break-words text-sm select-text font-medium leading-relaxed ${hasError ? 'text-red-400' : 'text-gray-200'}`}>
          {output}
        </pre>
      ) : (
        <div className="text-gray-500 text-sm font-medium h-full flex items-center justify-center">
          Run code to see output
        </div>
      )}
    </div>
  );
}
