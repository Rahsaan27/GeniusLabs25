/**
 * Escape HTML to prevent XSS and unwanted HTML rendering
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Parse markdown content for lesson documentation
 * Uses a line-by-line approach for safety and precision
 */
export function parseMarkdown(markdown: string): string {
  const lines = markdown.split('\n');
  const result: string[] = [];
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Handle code blocks (```js or ```javascript)
    if (trimmed.startsWith('```')) {
      if (!inCodeBlock) {
        // Starting a code block
        inCodeBlock = true;
        codeBlockLines = [];
        continue;
      } else {
        // Ending a code block
        inCodeBlock = false;
        const codeContent = codeBlockLines.join('\n');
        result.push(renderCodeBlock(codeContent));
        codeBlockLines = [];
        continue;
      }
    }

    // If inside code block, collect lines
    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Empty lines
    if (trimmed === '') {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      result.push('<div class="h-4"></div>'); // Spacer
      continue;
    }

    // Horizontal rules
    if (trimmed === '---') {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      result.push('<hr class="border-gray-700 my-6" />');
      continue;
    }

    // Headers
    if (trimmed.startsWith('# ')) {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      const text = trimmed.substring(2);
      result.push(`<h1 class="text-3xl font-bold text-white mb-4 mt-8">${processInlineMarkdown(text)}</h1>`);
      continue;
    }

    if (trimmed.startsWith('## ')) {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      const text = trimmed.substring(3);
      result.push(`<h2 class="text-2xl font-bold text-green-400 mb-3 mt-6">${processInlineMarkdown(text)}</h2>`);
      continue;
    }

    if (trimmed.startsWith('### ')) {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      const text = trimmed.substring(4);
      result.push(`<h3 class="text-xl font-semibold text-white mb-2 mt-4">${processInlineMarkdown(text)}</h3>`);
      continue;
    }

    // List items
    if (trimmed.startsWith('- ')) {
      if (!inList) {
        result.push('<ul class="space-y-2 my-4">');
        inList = true;
      }
      const text = trimmed.substring(2);
      result.push(`<li class="ml-6 text-gray-300 list-disc">${processInlineMarkdown(text)}</li>`);
      continue;
    }

    // Regular paragraph
    if (inList) {
      result.push('</ul>');
      inList = false;
    }
    result.push(`<p class="text-gray-300 leading-relaxed mb-4">${processInlineMarkdown(trimmed)}</p>`);
  }

  // Close any open list
  if (inList) {
    result.push('</ul>');
  }

  return result.join('\n');
}

/**
 * Process inline markdown (bold, inline code)
 * This function is ONLY called for regular text, never for code blocks
 */
function processInlineMarkdown(text: string): string {
  let result = text;

  // Process inline code FIRST - find all occurrences and replace with placeholders
  const inlineCodeMatches: { placeholder: string; html: string }[] = [];
  let inlineCodeIndex = 0;

  // Match inline code: single backticks with no newlines inside
  result = result.replace(/`([^`]+?)`/g, (match, code) => {
    const placeholder = `__INLINE_CODE_${inlineCodeIndex}__`;
    const escaped = escapeHtml(code);
    inlineCodeMatches.push({
      placeholder,
      html: `<code class="bg-[#1e1e1e] text-green-400 px-2 py-0.5 rounded text-sm border border-gray-700/50 whitespace-nowrap font-mono">${escaped}</code>`
    });
    inlineCodeIndex++;
    return placeholder;
  });

  // Process bold text (now safe from code interference)
  result = result.replace(/\*\*([^\*]+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');

  // Restore inline code
  inlineCodeMatches.forEach(({ placeholder, html }) => {
    result = result.replace(placeholder, html);
  });

  return result;
}

/**
 * Render a code block with proper styling
 * Completely separate from inline code rendering
 */
function renderCodeBlock(code: string): string {
  const escaped = escapeHtml(code);
  return `<div class="my-6 rounded-lg overflow-hidden border border-gray-700 bg-[#1e1e1e]">
  <div class="bg-gray-800/50 px-4 py-2 border-b border-gray-700">
    <div class="flex items-center gap-2">
      <div class="flex gap-1.5">
        <div class="w-3 h-3 rounded-full bg-red-500/60"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500/60"></div>
        <div class="w-3 h-3 rounded-full bg-green-500/60"></div>
      </div>
      <span class="text-xs text-gray-400 ml-2 font-mono">JavaScript</span>
    </div>
  </div>
  <pre class="p-4 overflow-x-auto"><code class="text-green-400 text-sm font-mono leading-relaxed block">${escaped}</code></pre>
</div>`;
}
