# Interactive IDE Component

A reusable, extensible interactive coding environment for GeniusLabs that supports multiple programming languages with syntax highlighting and code execution.

## Features

- ✅ **Syntax Highlighting** - VS Code-style color-coded text for Python, JavaScript, and HTML
- ✅ **Code Execution** - Run Python and JavaScript code directly in the browser
- ✅ **Split View** - Editor on the left, output console on the right
- ✅ **Line Numbers** - Professional IDE-style line numbering
- ✅ **Tab Support** - Press Tab to indent code (inserts 4 spaces)
- ✅ **Error Handling** - Clear error messages in the output console
- ✅ **Responsive Design** - Works on desktop and mobile devices

## Components

### InteractiveIDE
Main wrapper component that manages code state and execution.

```tsx
import { InteractiveIDE } from '@/components/IDE';

<InteractiveIDE
  language="python"
  initialCode="print('Hello, World!')"
  onCodeChange={(code) => console.log(code)}
  className="h-full"
/>
```

### CodeEditor
The code editing area with syntax highlighting and line numbers.

### OutputConsole
Displays execution results, errors, and status messages.

## Supported Languages

- **Python** - Basic Python execution (print statements, variables)
- **JavaScript** - Full JavaScript execution with console.log support
- **HTML** - Ready for HTML rendering (coming soon)

## Usage Example

```tsx
'use client';

import { InteractiveIDE } from '@/components/IDE';

export default function MyLesson() {
  return (
    <div className="h-screen">
      <InteractiveIDE
        language="python"
        initialCode={`# Python Basics
name = "Student"
print("Hello,", name)`}
      />
    </div>
  );
}
```

## Future Enhancements

### Planned Features
- [ ] Real Python execution using Pyodide (Python compiled to WebAssembly)
- [ ] HTML/CSS preview with live rendering
- [ ] Multi-file support
- [ ] Code saving and loading
- [ ] Autocomplete suggestions
- [ ] Code formatting
- [ ] Theme customization
- [ ] Terminal/shell integration
- [ ] Collaborative editing
- [ ] Unit test runner
- [ ] Debugger integration

### Language Support
- [ ] C++
- [ ] Java
- [ ] Go
- [ ] Rust
- [ ] SQL

## Technical Details

### Syntax Highlighting
Currently uses a custom regex-based syntax highlighter. Colors match VS Code Dark+ theme:
- Keywords: `#C586C0` (purple)
- Strings: `#CE9178` (orange)
- Comments: `#6A9955` (green)
- Functions: `#DCDCAA` (yellow)
- Numbers: `#B5CEA8` (light green)

### Code Execution
- **Python**: Simulated execution (will be replaced with Pyodide)
- **JavaScript**: Uses `new Function()` with sandboxed console

## File Structure

```
src/components/IDE/
├── InteractiveIDE.tsx    # Main component
├── CodeEditor.tsx         # Editor with syntax highlighting
├── OutputConsole.tsx      # Output display
├── index.ts              # Exports
└── README.md             # This file
```

## Contributing

When adding new features to the IDE:

1. Keep components modular and reusable
2. Follow the existing color scheme
3. Test with multiple languages
4. Update this README with new features
5. Add TypeScript types for all props

## Test Lesson

A complete test lesson is available at `/lesson/ide-test` to see the IDE in action.
