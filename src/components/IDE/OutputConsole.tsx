'use client';

interface OutputConsoleProps {
  output: string;
  isRunning: boolean;
  hasError: boolean;
  language?: 'python' | 'javascript' | 'html';
  htmlContent?: string;
}

export default function OutputConsole({ output, isRunning, hasError, language, htmlContent }: OutputConsoleProps) {
  // For HTML, show a fake browser preview
  if (language === 'html' && htmlContent && !isRunning) {
    return (
      <div className="flex-1 h-full bg-[#2d2d2d] overflow-auto p-4">
        {/* Fake Browser Chrome */}
        <div className="bg-[#1e1e1e] rounded-lg overflow-hidden h-full flex flex-col">
          {/* Browser Header */}
          <div className="bg-[#2d2d2d] px-3 py-2 flex items-center gap-2 border-b border-gray-700">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 mx-3 px-3 py-1 bg-[#1e1e1e] rounded text-xs text-gray-400 flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>localhost:3000/preview.html</span>
            </div>
          </div>

          {/* Browser Content */}
          <div className="flex-1 bg-white overflow-auto">
            <iframe
              srcDoc={htmlContent}
              title="HTML Preview"
              sandbox="allow-scripts"
              className="w-full h-full border-0"
              style={{ minHeight: '400px' }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Regular console output for Python/JavaScript
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
