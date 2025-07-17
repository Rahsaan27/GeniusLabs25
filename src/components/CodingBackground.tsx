import React from 'react';

export default function CodingBackground() {
  const codingSymbols = [
    '{}', '[]', '()', '<>', '/>', '&&', '||', '===', '!==', '=>', 
    'function', 'const', 'let', 'if', 'else', 'for', 'while', 'return',
    'class', 'import', 'export', 'async', 'await', 'try', 'catch'
  ];

  const gearSymbols = ['⚙️', '🔧', '⚡', '💻', '🔩', '⚙️'];
  
  const binaryStrings = [
    '1010101', '1100110', '0110011', '1001100', '0101010', '1111000',
    '0000111', '1010011', '1100101', '0011110', '1011101', '0100100'
  ];

  const generateRandomPosition = () => ({
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 90}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${5 + Math.random() * 10}s`
  });

  return (
    <div className="coding-bg">
      {/* Coding Symbols */}
      {codingSymbols.map((symbol, index) => (
        <div
          key={`symbol-${index}`}
          className="coding-symbol"
          style={{
            ...generateRandomPosition(),
            fontSize: `${1 + Math.random() * 1.5}rem`,
          }}
        >
          {symbol}
        </div>
      ))}
      
      {/* Gears */}
      {gearSymbols.map((gear, index) => (
        <div
          key={`gear-${index}`}
          className="gear"
          style={{
            ...generateRandomPosition(),
            fontSize: `${1.5 + Math.random() * 1}rem`,
          }}
        >
          {gear}
        </div>
      ))}
      
      {/* Binary Strings */}
      {binaryStrings.map((binary, index) => (
        <div
          key={`binary-${index}`}
          className="binary"
          style={{
            ...generateRandomPosition(),
            fontSize: `${0.6 + Math.random() * 0.4}rem`,
          }}
        >
          {binary}
        </div>
      ))}
      
      {/* Additional floating elements */}
      <div className="coding-symbol" style={{ top: '10%', left: '15%', fontSize: '1.2rem', animationDelay: '0s' }}>
        &lt;/&gt;
      </div>
      <div className="coding-symbol" style={{ top: '30%', left: '80%', fontSize: '0.9rem', animationDelay: '2s' }}>
        console.log()
      </div>
      <div className="coding-symbol" style={{ top: '60%', left: '20%', fontSize: '1.1rem', animationDelay: '4s' }}>
        {'{'}code{'}'}
      </div>
      <div className="coding-symbol" style={{ top: '80%', left: '70%', fontSize: '0.8rem', animationDelay: '1s' }}>
        def function():
      </div>
      <div className="coding-symbol" style={{ top: '20%', left: '60%', fontSize: '1rem', animationDelay: '3s' }}>
        npm install
      </div>
    </div>
  );
}