/**
 * Enhanced Markdown Parser with Premium Styling
 * Matches the design system from the reference documentation
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
 * Parse markdown with enhanced styling
 */
export function parseEnhancedMarkdown(markdown: string): string {
  const lines = markdown.split('\n');
  const result: string[] = [];
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Handle code blocks
    if (trimmed.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLines = [];
        continue;
      } else {
        inCodeBlock = false;
        const codeContent = codeBlockLines.join('\n');
        result.push(renderEnhancedCodeBlock(codeContent));
        codeBlockLines = [];
        continue;
      }
    }

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
      result.push('<div style="height: 8px;"></div>');
      continue;
    }

    // Main heading (# - largest)
    if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      const text = trimmed.substring(2);
      result.push(`
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 32px; margin-top: 24px;">
          <div style="width: 5px; height: 42px; border-radius: 3px; background: linear-gradient(180deg, #ffe14d, #ebc81a);"></div>
          <h1 style="font-size: 36px; font-weight: 700; color: #fff; margin: 0; letter-spacing: -0.5px;">${escapeHtml(text)}</h1>
        </div>
      `);
      continue;
    }

    // Section headings with styled bar
    if (trimmed.startsWith('## ')) {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      const text = trimmed.substring(3);
      result.push(`
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; margin-top: 48px;">
          <div style="width: 3px; height: 20px; border-radius: 2px; background: linear-gradient(180deg, #ffe14d, #ebc81a);"></div>
          <h2 style="font-size: 20px; font-weight: 600; color: #efefef; margin: 0;">${escapeHtml(text)}</h2>
        </div>
      `);
      continue;
    }

    // Regular headings
    if (trimmed.startsWith('### ')) {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      const text = trimmed.substring(4);
      result.push(`<h3 style="font-size: 18px; font-weight: 600; color: #efefef; margin: 24px 0 12px 0;">${escapeHtml(text)}</h3>`);
      continue;
    }

    // List items with yellow bullet
    if (trimmed.startsWith('- ')) {
      if (!inList) {
        result.push('<div style="display: flex; flex-direction: column; gap: 8px; margin: 16px 0;">');
        inList = true;
      }
      const text = trimmed.substring(2);
      result.push(`
        <div style="display: flex; align-items: center; gap: 14px; padding: 13px 20px; border-radius: 10px; background: #111; border: 1px solid #1c1c1c;">
          <span style="color: #ffe14d; font-size: 12px; font-weight: 700; font-family: 'JetBrains Mono', monospace; flex-shrink: 0;">→</span>
          <span style="font-size: 14px; color: #999; line-height: 1.5;">${processEnhancedInline(text)}</span>
        </div>
      `);
      continue;
    }

    // Regular paragraph
    if (inList) {
      result.push('</div>');
      inList = false;
    }

    result.push(`<p style="margin-bottom: 14px; line-height: 1.85; font-size: 15px; color: #aaa;">${processEnhancedInline(trimmed)}</p>`);
  }

  // Close any open list
  if (inList) {
    result.push('</div>');
  }

  return result.join('\n');
}

/**
 * Process inline markdown with enhanced token styling
 */
function processEnhancedInline(text: string): string {
  let result = text;

  // Process inline code with token styling
  const inlineCodeMatches: { placeholder: string; html: string }[] = [];
  let inlineCodeIndex = 0;

  result = result.replace(/`([^`]+?)`/g, (match, code) => {
    const placeholder = `__INLINE_CODE_${inlineCodeIndex}__`;
    const escaped = escapeHtml(code);
    inlineCodeMatches.push({
      placeholder,
      html: `<code style="background: rgba(255, 220, 40, 0.08); color: #ffe14d; padding: 2px 8px; border-radius: 5px; font-size: 0.86em; font-family: 'JetBrains Mono', 'Fira Code', monospace; border: 1px solid rgba(255, 220, 40, 0.14); letter-spacing: 0.3px;">${escaped}</code>`
    });
    inlineCodeIndex++;
    return placeholder;
  });

  // Process bold text
  result = result.replace(/\*\*([^\*]+?)\*\*/g, '<strong style="color: #efefef; font-weight: 600;">$1</strong>');

  // Restore inline code
  inlineCodeMatches.forEach(({ placeholder, html }) => {
    result = result.replace(placeholder, html);
  });

  return result;
}

/**
 * Render enhanced code block
 */
function renderEnhancedCodeBlock(code: string): string {
  const escaped = escapeHtml(code);
  return `
    <div style="background: #141414; border-radius: 12px; border: 1px solid rgba(255, 220, 40, 0.1); overflow: hidden; font-family: 'JetBrains Mono', 'Fira Code', monospace; margin: 24px 0;">
      <div style="display: flex; align-items: center; padding: 9px 16px; background: rgba(255, 220, 40, 0.03); border-bottom: 1px solid rgba(255, 220, 40, 0.07);">
        <span style="font-size: 11px; color: #666; letter-spacing: 1px; text-transform: uppercase;">JavaScript</span>
      </div>
      <pre style="padding: 18px 22px; margin: 0; font-size: 13.5px; line-height: 1.7; color: #e5e5e5; overflow-x: auto;"><code>${escaped}</code></pre>
    </div>
  `;
}

/**
 * Wrap content in documentation container
 */
export function wrapInDocContainer(content: string, title?: string): string {
  const titleHtml = title ? `
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid #1c1c1c;">
      <div style="width: 5px; height: 32px; border-radius: 3px; background: linear-gradient(180deg, #ffe14d, #ebc81a);"></div>
      <h2 style="font-size: 28px; font-weight: 700; color: #fff; margin: 0; letter-spacing: -0.5px;">${escapeHtml(title)}</h2>
    </div>
  ` : '';

  return `
    <div style="background: #111; border: 1px solid #1c1c1c; border-radius: 14px; padding: 26px 30px; line-height: 1.85;">
      ${titleHtml}
      ${content}
    </div>
  `;
}
