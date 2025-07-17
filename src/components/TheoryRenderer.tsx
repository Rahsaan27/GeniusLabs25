import React from 'react';

interface TheoryRendererProps {
  theory: string;
}

const TheoryRenderer: React.FC<TheoryRendererProps> = ({ theory }) => {
  const parseTheory = (text: string) => {
    const lines = text.trim().split('\n').filter(line => line.trim() !== '');
    const elements: JSX.Element[] = [];
    let currentCodeBlock = '';
    let inCodeBlock = false;
    let currentList: string[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <div key={`list-${elements.length}`} className="space-y-2 my-4">
            {currentList.map((item, idx) => (
              <div key={idx} className="flex items-start">
                <div className="bg-green-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-gray-300" dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-green-400">$1</strong>') }} />
              </div>
            ))}
          </div>
        );
        currentList = [];
      }
    };

    const flushCodeBlock = () => {
      if (currentCodeBlock.trim()) {
        elements.push(
          <div key={`code-${elements.length}`} className="my-4">
            <div className="bg-gray-900 border border-green-500/30 rounded-lg p-4">
              <pre className="text-green-300 text-sm overflow-x-auto">
                <code>{currentCodeBlock.trim()}</code>
              </pre>
            </div>
          </div>
        );
        currentCodeBlock = '';
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Handle code blocks
      if (trimmedLine.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
          inCodeBlock = false;
        } else {
          flushList();
          inCodeBlock = true;
          currentCodeBlock = '';
        }
        return;
      }

      if (inCodeBlock) {
        currentCodeBlock += line + '\n';
        return;
      }

      // Handle main heading
      if (trimmedLine.startsWith('# ')) {
        flushList();
        const title = trimmedLine.substring(2);
        elements.push(
          <div key={`h1-${elements.length}`} className="mb-6">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-green-400 to-green-500 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                <span className="text-black text-lg font-bold">📚</span>
              </div>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
            </div>
          </div>
        );
        return;
      }

      // Handle sub headings
      if (trimmedLine.startsWith('## ')) {
        flushList();
        const title = trimmedLine.substring(3);
        elements.push(
          <div key={`h2-${elements.length}`} className="mt-6 mb-3">
            <div className="flex items-center">
              <div className="bg-green-500/20 w-6 h-6 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-400 text-sm">▶</span>
              </div>
              <h2 className="text-lg font-semibold text-green-400">{title}</h2>
            </div>
          </div>
        );
        return;
      }

      // Handle list items
      if (trimmedLine.startsWith('- ')) {
        const item = trimmedLine.substring(2);
        currentList.push(item);
        return;
      }

      // Handle regular paragraphs
      if (trimmedLine.length > 0) {
        flushList();
        elements.push(
          <p key={`p-${elements.length}`} className="text-gray-300 leading-relaxed mb-4">
            {trimmedLine}
          </p>
        );
      }
    });

    // Flush any remaining content
    flushList();
    flushCodeBlock();

    return elements;
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm">
      <div className="space-y-4">
        {parseTheory(theory)}
      </div>
    </div>
  );
};

export default TheoryRenderer;