'use client';

import { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import OutputConsole from './OutputConsole';

// Load Pyodide from CDN
let pyodideInstance: any = null;
let pyodideLoading: Promise<any> | null = null;

async function loadPyodide() {
  if (pyodideInstance) {
    return pyodideInstance;
  }

  if (pyodideLoading) {
    return pyodideLoading;
  }

  pyodideLoading = (async () => {
    // Load Pyodide script from CDN
    if (typeof window !== 'undefined' && !(window as any).loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Pyodide'));
        document.head.appendChild(script);
      });
    }

    // Initialize Pyodide
    pyodideInstance = await (window as any).loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
    });

    return pyodideInstance;
  })();

  return pyodideLoading;
}

interface InteractiveIDEProps {
  language: 'python' | 'javascript' | 'html';
  initialCode?: string;
  onCodeChange?: (code: string) => void;
  className?: string;
}

export default function InteractiveIDE({
  language,
  initialCode = '',
  onCodeChange,
  className = ''
}: InteractiveIDEProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const executeCode = async () => {
    setIsRunning(true);
    setOutput('');
    setHasError(false);

    try {
      if (language === 'python') {
        await executePython(code);
      } else if (language === 'javascript') {
        executeJavaScript(code);
      } else if (language === 'html') {
        executeHTML(code);
      }
    } catch (error) {
      setHasError(true);
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const executePython = async (pythonCode: string) => {
    try {
      // Load Pyodide (real Python in the browser)
      const pyodide = await loadPyodide();

      // Capture stdout
      const outputLines: string[] = [];
      pyodide.setStdout({
        batched: (text: string) => {
          outputLines.push(text);
        }
      });

      // Run the Python code
      await pyodide.runPythonAsync(pythonCode);

      if (outputLines.length > 0) {
        setOutput(outputLines.join('').trim());
      } else {
        setOutput('Code executed successfully (no output)');
      }
    } catch (error: any) {
      // Extract Python error message
      const errorMessage = error.message || String(error);
      throw new Error(errorMessage);
    }
  };

  const executeJavaScript = (jsCode: string) => {
    const outputLines: string[] = [];

    const mockConsole = {
      log: (...args: any[]) => {
        outputLines.push(args.map(arg => String(arg)).join(' '));
      }
    };

    try {
      const func = new Function('console', jsCode);
      func(mockConsole);
      setOutput(outputLines.join('\n') || 'Code executed successfully (no output)');
    } catch (error) {
      throw error;
    }
  };

  const executeHTML = (htmlCode: string) => {
    // For HTML, we'll render it in an iframe
    setHtmlContent(htmlCode);
    setOutput('HTML rendered successfully');
  };

  const clearOutput = () => {
    setOutput('');
    setHasError(false);
    setHtmlContent('');
  };

  return (
    <div className="flex flex-col lg:flex-row flex-1 min-h-0 bg-[#1e1e1e]">
      {/* Code Editor */}
      <div className="flex-1 flex flex-col border-r border-gray-800 min-h-0 min-w-0">
        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#252526] border-b border-gray-800 h-[50px] flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e1e1e] rounded-sm">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="text-xs text-gray-300 font-medium">{language === 'python' ? 'main.py' : language === 'javascript' ? 'main.js' : 'index.html'}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={executeCode}
              disabled={isRunning}
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded font-medium transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
            >
              {isRunning ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Running
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Run Code
                </>
              )}
            </button>
          </div>
        </div>
        <CodeEditor
          language={language}
          code={code}
          onChange={handleCodeChange}
        />
      </div>

      {/* Output Console */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0">
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#252526] border-b border-gray-800 h-[50px] flex-shrink-0">
          <div className="flex items-center gap-2">
            {language === 'html' ? (
              <>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="text-xs text-gray-300 font-medium">Browser Preview</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-300 font-medium">Output</span>
              </>
            )}
          </div>
          <button
            onClick={clearOutput}
            className="px-2 py-1 text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        <OutputConsole
          output={output}
          isRunning={isRunning}
          hasError={hasError}
          language={language}
          htmlContent={htmlContent}
        />
      </div>
    </div>
  );
}
