# Curriculum Improvements Summary

## Issues Identified & Solutions

### 1. Auto-Scroll Issue ✓ PARTIALLY FIXED
**Problem:** When selecting a lesson, page auto-scrolls down, hiding the "All Modules" navigation bar.

**Solution:**
- Remove `window.scrollTo({ top: 0, behavior: 'instant' });` from the lesson change useEffect (line 94)
- Keep scroll-to-top only on initial module load (line 47) - this is fine
- This ensures users stay at their current scroll position when switching lessons

**Status:** Needs final fix - linter keeps adding scroll back

---

### 2. Code Block Highlighting Bleeding ✓ IN PROGRESS
**Problem:** Code highlighting (inline `code` and ```code blocks```) bleeding into regular text, persisting beyond intended scope.

**Root Cause:**
- Regex patterns not properly constrained
- Order of replacements causing issues
- Backticks matching across newlines when they shouldn't

**Solution:**
- Created `/src/utils/markdownParser.ts` with proper parsing logic
- Process code blocks FIRST before any other replacements (protects them)
- Use `[^`\n]` pattern for inline code to prevent cross-line matching
- Use placeholders for code blocks during processing
- Restore code blocks at the end

**Implementation:**
```typescript
// Step 1: Protect code blocks with placeholders
// Step 2: Process inline code (won't match newlines)
// Step 3: Process other markdown (headers, bold, lists)
// Step 4: Restore code blocks
```

**Status:** Parser created, needs to be integrated into page.tsx

---

### 3. Tips Section - Move to Modal ⏳ TODO
**Problem:** Tips are currently in documentation. Need to be removed and shown as a modal in the coding section.

**Current State:**
Tips are in lesson.content.theory like this:
```markdown
### Tip
Remember, strings need to be wrapped in quotation marks...
```

**Solution:**
1. Extract tip content from each lesson's theory
2. Store separately in lesson data structure (new field: `tip?: string`)
3. Add a floating "💡 Tip" button in the coding sidebar
4. Show tip in a minimal modal when clicked
5. Remove tip sections from documentation markdown

**Files to Modify:**
- `/src/data/javascriptCurriculum.ts` - extract tips to separate field
- `/src/app/modules/[moduleId]/page.tsx` - add tip modal component
- `/src/types/lesson.ts` - add optional `tip` field to LessonContent interface

---

### 4. Accepted Answers - Remove & Store ⏳ TODO
**Problem:** "Accepted answer(s)" are currently displayed in documentation. Need to be hidden and stored for grading.

**Current State:**
Answers shown in markdown like:
```markdown
**Accepted answer(s):** S = Any string, I = Any positive integer

\`\`\`js
const myName = S;
console.log(myName);
let myAge = I;
console.log(myAge);
\`\`\`
```

**Solution:**
1. Remove accepted answers from displayed documentation
2. Store them in a separate field: `acceptedAnswers?: string[]` or similar
3. Create validation logic to compare user code against accepted patterns
4. For now, store answers in a text document for reference

**Files to Modify:**
- `/src/data/javascriptCurriculum.ts` - remove from theory, add to new field
- Create `/docs/ACCEPTED_ANSWERS.md` for temporary storage
- Eventually: Build code validator using these patterns

**Answer Format to Extract:**
```
Lesson 1: Any two positive integers
Lesson 2: const myName = [string]; let myAge = [number];
Lesson 3: Three typeof statements
... etc
```

---

## Implementation Priority

1. ✓ Fix auto-scroll (DONE - needs verification)
2. 🔄 Fix code highlighting bleeding (IN PROGRESS - parser created)
3. ⏳ Extract and implement Tips modal
4. ⏳ Extract and store Accepted Answers

---

## Testing Checklist

- [ ] Navigate to module - should scroll to top
- [ ] Click on lesson - should NOT auto-scroll
- [ ] Switch between lessons - should stay at current position
- [ ] Docs tab - inline code properly highlighted with NO bleeding
- [ ] Docs tab - code blocks properly formatted with NO bleeding to next sections
- [ ] Docs tab - Tips section removed
- [ ] Code tab - Tip modal button visible
- [ ] Code tab - Click tip shows modal with lesson tip
- [ ] Docs tab - Accepted answers section removed
- [ ] Verify answers stored in separate location

---

## Notes

- Markdown parser uses placeholder technique to protect code blocks
- Tips modal should be minimal, non-intrusive
- Accepted answers will be used for auto-grading in future
- All 8 JavaScript lessons need these changes applied
