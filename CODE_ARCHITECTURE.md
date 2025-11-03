# GeniusLabs Code Architecture

## 📁 Project Structure (Post-Cleanup)

### `/src/app` - Next.js App Router Pages

#### Core Pages
- **`/page.tsx`** - Landing page
- **`/activity/page.tsx`** - Activity feed showing all lessons
- **`/modules/page.tsx`** - Module list view
- **`/modules/[moduleId]/page.tsx`** - Dynamic module detail page with embedded IDE
- **`/lesson/[id]/page.tsx`** - Dynamic lesson page (handles all languages: Python, JS, HTML)
- **`/lesson/ide-test/page.tsx`** - Python IDE test page
- **`/short-form/[moduleId]/page.tsx`** - Short-form lesson viewer
- **`/profile/page.tsx`** - User profile and settings
- **`/cohort/page.tsx`** - Cohort chat and collaboration

#### Auth Pages
- **`/login/page.tsx`** - Login page
- **`/signup/page.tsx`** - Signup page
- **`/callback/page.tsx`** - Auth callback handler

### `/src/components` - Reusable Components

#### IDE Components (`/IDE`)
- **`InteractiveIDE.tsx`** - Main IDE component (supports Python, JavaScript, HTML)
- **`CodeEditor.tsx`** - Code editor with syntax highlighting for all 3 languages
- **`OutputConsole.tsx`** - Output display (console for Python/JS, browser preview for HTML)

#### Other Components
- **`Navigation.tsx`** - Top navigation bar
- **`ShortFormLesson.tsx`** - Short-form interactive lesson component
- **`CohortPage.tsx`** - Cohort page layout
- **`CohortChat.tsx`** - Real-time chat component
- **`CohortSelector.tsx`** - Cohort selection UI
- **`AdminPanel.tsx`** - Admin dashboard
- **`AmplifyProvider.tsx`** - Auth provider wrapper

### `/src/data` - Lesson & Module Data

- **`lessons.ts`** - Main lessons export, combines all lesson types
- **`htmlLessons.ts`** - 5 HTML lessons with 1 test each
- **`modernCurriculum.ts`** - Modern JavaScript & Python lessons
- **`shortFormLessons.ts`** - Short-form interactive lessons
- **`cohorts.ts`** - Cohort configuration
- **`cohortStyles.ts`** - Cohort styling themes

### `/src/utils` - Utility Functions

- **`progress.ts`** - Progress tracking utilities (localStorage)
- **`lessonTemplates.ts`** - Lesson generation templates

### `/src/services` - External Services

- **`user-progress.ts`** - DynamoDB progress service

### `/src/hooks` - Custom React Hooks

- **`useAuth.ts`** - Authentication hook

---

## 🏗️ How Lessons Work

### Language-Specific Routing

Each language now uses the **same lesson page** but renders differently based on `lesson.language`:

```typescript
// /lesson/[id]/page.tsx
if (lesson.language === 'html') {
  // Render HTML IDE with browser preview
} else if (lesson.language === 'javascript') {
  // Render JS IDE with console
} else if (lesson.language === 'python') {
  // Render Python IDE with console
}
```

### Module Page IDE

The **module detail page** (`/modules/[moduleId]`) embeds the IDE directly:

```typescript
<InteractiveIDE
  language={module.language as 'python' | 'javascript' | 'html'}
  initialCode={
    module.language === 'html' ? 'HTML starter...' :
    module.language === 'javascript' ? 'JS starter...' :
    'Python starter...'
  }
/>
```

This ensures:
- ✅ Python modules only show Python editor
- ✅ JavaScript modules only show JavaScript editor
- ✅ HTML modules only show HTML editor with browser preview

---

## 🎨 IDE Language Support

### Python
- **Editor**: Python syntax highlighting
- **Output**: Terminal-style console
- **Execution**: Pyodide (Python in browser)

### JavaScript
- **Editor**: JavaScript syntax highlighting
- **Output**: Console output
- **Execution**: Sandboxed `new Function()`

### HTML
- **Editor**: HTML syntax highlighting (tags, attributes, comments)
- **Output**: Fake browser with Chrome UI showing live iframe
- **Execution**: Direct iframe rendering with `srcDoc`

---

## 🗑️ Removed in Cleanup

### Deleted Files
- ❌ `/lesson/html-test/page.tsx` - Redundant HTML test page
- ❌ `/lesson/html/[lessonId]/page.tsx` - Redundant HTML dynamic route
- ❌ **564 lines** of commented-out old lesson code in `lessons.ts`

### Consolidated Imports
- Merged `useState` and `useEffect` imports in lesson pages
- Removed obsolete comments

### Code Reduction
- **Before**: 295 + 564 = 859 lines in `lessons.ts`
- **After**: 295 lines in `lessons.ts`
- **Savings**: 564 lines (~66% reduction)

---

## 📊 Current Lesson Count

### By Language
- **Python**: 10 fundamental + 2 modern = 12 lessons
- **JavaScript**: 2 modern lessons
- **HTML**: 5 lessons
- **Short-form**: Multiple interactive lessons
- **Theory**: 2 entrepreneurship lessons

### By Module
1. **Python Fundamentals** (10 lessons)
2. **HTML & CSS Fundamentals** (5 lessons)
3. **JavaScript Fundamentals** (uses filtered lessons)
4. **Social Entrepreneurship** (2 lessons)

---

## 🔌 API Routes

### User Progress
- `GET/POST /api/user-progress` - Get/create all user progress
- `GET/PUT /api/user-progress/[moduleId]` - Module-specific progress
- `POST /api/user-progress/[moduleId]/lesson` - Mark lesson complete
- `POST /api/user-progress/[moduleId]/quiz` - Save quiz score

### Messaging
- `GET/POST /api/messages` - Cohort messages

---

## 🎯 Best Practices Maintained

1. **Single Source of Truth**: All lessons in `/data` directory
2. **Type Safety**: TypeScript throughout
3. **Separation of Concerns**: Components, data, utils clearly separated
4. **No Duplication**: Removed all redundant routes and code
5. **Language Isolation**: Each language gets appropriate editor/output
6. **Clean Exports**: No commented code in production

---

## 🚀 Future Improvements

### Potential Optimizations
- [ ] Add lazy loading for large lesson data files
- [ ] Consider splitting `ShortFormLesson.tsx` (730 lines)
- [ ] Add ESLint to catch unused imports automatically
- [ ] Consider code-splitting for IDE components

### Feature Additions
- [ ] Add CSS lessons with live CSS editor
- [ ] Add more JavaScript lessons
- [ ] Add test runner for lesson validation
- [ ] Add collaborative coding features

---

## 📝 Development Guidelines

### Adding a New Lesson

1. Add lesson data to appropriate file in `/data`
2. Ensure `language` property is set correctly
3. Add to module's `lessons` array
4. Test with the module page - the IDE will automatically use the right language!

### Adding a New Language

1. Update `InteractiveIDE.tsx` to support new language
2. Add tokenizer to `CodeEditor.tsx`
3. Update `OutputConsole.tsx` if needed
4. Add starter code templates to module page
5. Create lesson data file in `/data`

---

## ✅ Code Quality Checklist

- ✅ No duplicate files or routes
- ✅ No unused imports
- ✅ No large commented blocks
- ✅ Consistent file organization
- ✅ Clear separation by language
- ✅ TypeScript types throughout
- ✅ Build passes successfully
- ✅ All routes functional

---

Last Updated: November 3, 2024
