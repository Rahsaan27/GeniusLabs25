import React from 'react';

interface SyntaxHighlighterProps {
  code: string;
  language: 'javascript' | 'python';
}

export default function SyntaxHighlighter({ code, language }: SyntaxHighlighterProps) {
  const highlightJavaScript = (text: string) => {
    // Keywords
    text = text.replace(/\b(let|const|var|function|if|else|for|while|return|true|false|null|undefined)\b/g, 
      '<span style="color: #569CD6;">$1</span>');
    
    // Strings
    text = text.replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, 
      '<span style="color: #CE9178;">$1$2$1</span>');
    
    // Numbers
    text = text.replace(/\b\d+\.?\d*\b/g, 
      '<span style="color: #B5CEA8;">$&</span>');
    
    // Comments
    text = text.replace(/(\/\/.*$)/gm, 
      '<span style="color: #6A9955;">$1</span>');
    
    // Methods/functions
    text = text.replace(/\b(\w+)(?=\()/g, 
      '<span style="color: #DCDCAA;">$1</span>');
    
    return text;
  };

  const highlightPython = (text: string) => {
    // Keywords
    text = text.replace(/\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|with|lambda|and|or|not|is|in|True|False|None)\b/g, 
      '<span style="color: #569CD6;">$1</span>');
    
    // Strings
    text = text.replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, 
      '<span style="color: #CE9178;">$1$2$1</span>');
    
    // Numbers
    text = text.replace(/\b\d+\.?\d*\b/g, 
      '<span style="color: #B5CEA8;">$&</span>');
    
    // Comments
    text = text.replace(/(#.*$)/gm, 
      '<span style="color: #6A9955;">$1</span>');
    
    // Methods/functions
    text = text.replace(/\b(\w+)(?=\()/g, 
      '<span style="color: #DCDCAA;">$1</span>');
    
    return text;
  };

  const getHighlightedCode = () => {
    let highlighted = code;
    
    if (language === 'javascript') {
      highlighted = highlightJavaScript(highlighted);
    } else if (language === 'python') {
      highlighted = highlightPython(highlighted);
    }
    
    return highlighted;
  };

  return (
    <pre 
      className="whitespace-pre-wrap font-mono text-sm"
      dangerouslySetInnerHTML={{ __html: getHighlightedCode() }}
    />
  );
}