'use client';

import { useRef, useEffect } from 'react';

interface CodeEditorProps {
  language: 'python' | 'javascript' | 'html';
  code: string;
  onChange: (code: string) => void;
}

interface Token {
  type: 'keyword' | 'builtin' | 'string' | 'comment' | 'number' | 'function' | 'text';
  value: string;
}

export default function CodeEditor({ language, code, onChange }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    const highlight = highlightRef.current;

    if (textarea && highlight) {
      const syncScroll = () => {
        highlight.scrollTop = textarea.scrollTop;
        highlight.scrollLeft = textarea.scrollLeft;
      };

      textarea.addEventListener('scroll', syncScroll);
      return () => textarea.removeEventListener('scroll', syncScroll);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = code.substring(0, start) + '    ' + code.substring(end);
      onChange(newValue);

      // Set cursor position after the inserted tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const tokenizeCode = (code: string, lang: string): Token[][] => {
    return code.split('\n').map(line => {
      if (lang === 'python') {
        return tokenizePython(line);
      } else if (lang === 'javascript') {
        return tokenizeJavaScript(line);
      }
      return [{ type: 'text', value: line }];
    });
  };

  const renderTokens = (tokens: Token[][]) => {
    return tokens.map((lineTokens, lineIndex) => (
      <div key={lineIndex}>
        {lineTokens.map((token, tokenIndex) => {
          const style = getTokenStyle(token.type);
          return (
            <span key={tokenIndex} style={style}>
              {token.value}
            </span>
          );
        })}
        {lineIndex < tokens.length - 1 && '\n'}
      </div>
    ));
  };

  const getTokenStyle = (type: Token['type']) => {
    switch (type) {
      case 'keyword':
        return { color: '#C586C0', fontWeight: 600 };
      case 'builtin':
        return { color: '#DCDCAA', fontWeight: 500 };
      case 'string':
        return { color: '#CE9178', fontWeight: 500 };
      case 'comment':
        return { color: '#6A9955', fontWeight: 500 };
      case 'number':
        return { color: '#B5CEA8', fontWeight: 500 };
      case 'function':
        return { color: '#DCDCAA', fontWeight: 500 };
      default:
        return { color: '#E8E8E8', fontWeight: 500 };
    }
  };

  return (
    <div className="relative flex-1 overflow-hidden bg-[#1e1e1e] flex h-full">
      {/* Line Numbers */}
      <div className="w-14 py-4 px-2 font-mono text-xs text-gray-500 leading-relaxed overflow-auto select-none flex-shrink-0 border-r border-gray-800 bg-[#1e1e1e]">
        {code.split('\n').map((_, i) => (
          <div key={i} className="text-right pr-3 min-h-[21px] font-medium">{i + 1}</div>
        ))}
      </div>

      {/* Editor Area */}
      <div className="relative flex-1 overflow-hidden h-full">
        {/* Syntax Highlighted Background */}
        <div
          ref={highlightRef}
          className="absolute inset-0 overflow-auto pointer-events-none whitespace-pre-wrap break-words"
          aria-hidden="true"
          style={{
            padding: '16px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: '14px',
            lineHeight: '21px',
            letterSpacing: 'normal',
            wordSpacing: 'normal'
          }}
        >
          {renderTokens(tokenizeCode(code, language))}
        </div>

        {/* Editable Textarea Overlay */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 bg-transparent outline-none resize-none overflow-auto whitespace-pre-wrap break-words selection:bg-green-400/30"
          style={{
            padding: '16px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: '14px',
            lineHeight: '21px',
            letterSpacing: 'normal',
            wordSpacing: 'normal',
            color: '#E8E8E8',
            WebkitTextFillColor: 'transparent',
            caretColor: '#4ade80'
          }}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  );
}

// Tokenizer for Python
function tokenizePython(line: string): Token[] {
  const tokens: Token[] = [];
  const keywords = ['def', 'class', 'import', 'from', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'try', 'except', 'finally', 'with', 'as', 'pass', 'break', 'continue', 'lambda', 'yield', 'True', 'False', 'None', 'and', 'or', 'not', 'is'];
  const builtins = ['print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple', 'input', 'open', 'type', 'isinstance', 'enumerate', 'zip', 'map', 'filter'];

  // Check if entire line is a comment
  if (line.trim().startsWith('#')) {
    return [{ type: 'comment', value: line }];
  }

  let i = 0;
  while (i < line.length) {
    // Comments
    if (line[i] === '#') {
      tokens.push({ type: 'comment', value: line.slice(i) });
      break;
    }

    // Strings
    if (line[i] === '"' || line[i] === "'") {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === '\\') j++; // Skip escaped characters
        j++;
      }
      tokens.push({ type: 'string', value: line.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    // Numbers
    if (/\d/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\d.]/.test(line[j])) j++;
      tokens.push({ type: 'number', value: line.slice(i, j) });
      i = j;
      continue;
    }

    // Words (keywords, builtins, or identifiers)
    if (/[a-zA-Z_]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_]/.test(line[j])) j++;
      const word = line.slice(i, j);

      if (keywords.includes(word)) {
        tokens.push({ type: 'keyword', value: word });
      } else if (builtins.includes(word)) {
        tokens.push({ type: 'builtin', value: word });
      } else {
        // Check if it's a function call
        let k = j;
        while (k < line.length && line[k] === ' ') k++;
        if (k < line.length && line[k] === '(') {
          tokens.push({ type: 'function', value: word });
        } else {
          tokens.push({ type: 'text', value: word });
        }
      }
      i = j;
      continue;
    }

    // Everything else
    tokens.push({ type: 'text', value: line[i] });
    i++;
  }

  return tokens;
}

// Tokenizer for JavaScript
function tokenizeJavaScript(line: string): Token[] {
  const tokens: Token[] = [];
  const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'async', 'await', 'class', 'extends', 'import', 'export', 'default', 'new', 'this', 'typeof', 'instanceof'];

  // Check if entire line is a comment
  if (line.trim().startsWith('//')) {
    return [{ type: 'comment', value: line }];
  }

  let i = 0;
  while (i < line.length) {
    // Comments
    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push({ type: 'comment', value: line.slice(i) });
      break;
    }

    // Strings
    if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === '\\') j++; // Skip escaped characters
        j++;
      }
      tokens.push({ type: 'string', value: line.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    // Numbers
    if (/\d/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\d.]/.test(line[j])) j++;
      tokens.push({ type: 'number', value: line.slice(i, j) });
      i = j;
      continue;
    }

    // Words (keywords or identifiers)
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);

      if (keywords.includes(word)) {
        tokens.push({ type: 'keyword', value: word });
      } else {
        // Check if it's a function call
        let k = j;
        while (k < line.length && line[k] === ' ') k++;
        if (k < line.length && line[k] === '(') {
          tokens.push({ type: 'function', value: word });
        } else {
          tokens.push({ type: 'text', value: word });
        }
      }
      i = j;
      continue;
    }

    // Everything else
    tokens.push({ type: 'text', value: line[i] });
    i++;
  }

  return tokens;
}
