import { Lesson } from '@/types/lesson';

export const htmlLessons: Lesson[] = [
  {
    id: 'html-basics-structure',
    title: 'HTML Basics: Building Your First Webpage! 🏗️',
    description: 'Learn the fundamental structure of HTML and create your first webpage',
    difficulty: 'beginner',
    language: 'html',
    estimatedTime: 20,
    activities: ['code'],
    content: {
      theory: `
# Welcome to HTML! 🌐

## HTML = HyperText Markup Language

HTML is the skeleton of every website you've ever visited! Think of it as the blueprint of a house.

## Your First HTML Page! 🎉

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first webpage!</p>
</body>
</html>
\`\`\`

### Breaking it down:
- \`<!DOCTYPE html>\` = Tells the browser this is HTML5 📄
- \`<html>\` = The root of your page 🌳
- \`<head>\` = Information about the page (not visible) 🧠
- \`<title>\` = Shows in the browser tab 🏷️
- \`<body>\` = Everything you see on the page 👀
- \`<h1>\` = Big heading text 📢
- \`<p>\` = Paragraph text 📝

## 🔥 HTML Tags Always Come in Pairs!

Most tags have an opening and closing:
- \`<h1>Content</h1>\` ✅
- \`<p>Text goes here</p>\` ✅

## 💡 Common Tags You'll Love:

- **Headings**: \`<h1>\` to \`<h6>\` (biggest to smallest)
- **Paragraph**: \`<p>\`
- **Bold**: \`<strong>\`
- **Italic**: \`<em>\`
- **Line Break**: \`<br>\`

Ready to build your first webpage? Let's go! 🚀
      `,
      instructions: `
🎯 Your Mission:
1. Create a webpage with a heading that says your name
2. Add a paragraph introducing yourself
3. Add another paragraph about your favorite hobby
4. Use <strong> to make one word bold

💡 Remember: Most tags need opening <tag> and closing </tag>!
      `,
      starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <!-- Write your code here! -->

</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
    <title>About Alex</title>
</head>
<body>
    <h1>Alex Johnson</h1>
    <p>Hi! I'm Alex and I'm learning to code. It's <strong>awesome</strong>!</p>
    <p>My favorite hobby is playing video games and building things.</p>
</body>
</html>`,
      testCases: [
        {
          id: 'test-1',
          input: '',
          expectedOutput: 'h1',
          description: 'Page should have at least one h1 heading'
        }
      ]
    }
  },
  {
    id: 'html-headings-paragraphs',
    title: 'Headings & Paragraphs: Organize Your Content! 📝',
    description: 'Master headings and paragraphs to structure your content',
    difficulty: 'beginner',
    language: 'html',
    estimatedTime: 15,
    activities: ['code'],
    content: {
      theory: `
# Headings & Paragraphs: The Building Blocks! 🧱

## Headings Create Structure 📊

HTML has 6 levels of headings:

\`\`\`html
<h1>Biggest - Main Title</h1>
<h2>Section Heading</h2>
<h3>Subsection</h3>
<h4>Smaller heading</h4>
<h5>Even smaller</h5>
<h6>Smallest heading</h6>
\`\`\`

### 🎯 Pro Tips:
- Use \`<h1>\` only once per page (your main title!)
- Use headings in order (don't skip from h1 to h4!)
- Headings help people understand your page structure

## Paragraphs for Text ✍️

\`\`\`html
<p>This is a paragraph. It contains text about a topic.</p>
<p>This is another paragraph. Browsers automatically add space between paragraphs!</p>
\`\`\`

## 🔥 Text Formatting:

Make your text stand out:
- \`<strong>Bold text</strong>\` - **important stuff**
- \`<em>Italic text</em>\` - *emphasis*
- \`<br>\` - Line break (no closing tag needed!)

## 💪 Example:

\`\`\`html
<h1>My Favorite Games</h1>
<p>I <strong>love</strong> playing video games!</p>

<h2>Minecraft</h2>
<p>Minecraft is <em>amazing</em> because you can build anything.</p>

<h2>Fortnite</h2>
<p>Fortnite is super fun to play with friends!</p>
\`\`\`

Ready to structure some content? Let's code! 🚀
      `,
      instructions: `
🎯 Your Challenge:
1. Create an h1 with the title "My Favorite Things"
2. Add an h2 for "Food" with a paragraph about your favorite food
3. Add an h2 for "Music" with a paragraph about your favorite music
4. Use <strong> and <em> to emphasize words
5. Add a line break <br> somewhere

⚡ Make it personal and fun!
      `,
      starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>My Favorites</title>
</head>
<body>
    <!-- Create your structured content here! -->

</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
    <title>My Favorites</title>
</head>
<body>
    <h1>My Favorite Things</h1>

    <h2>Food</h2>
    <p>My favorite food is <strong>pizza</strong>! I could eat it <em>every single day</em>.<br>
    Pepperoni is the best topping!</p>

    <h2>Music</h2>
    <p>I love listening to <strong>hip hop</strong> and <em>pop music</em>. Music makes me feel <strong>energized</strong>!</p>
</body>
</html>`,
      testCases: [
        {
          id: 'test-1',
          input: '',
          expectedOutput: 'h2',
          description: 'Page should have at least one h2 heading'
        }
      ]
    }
  },
  {
    id: 'html-lists',
    title: 'Lists: Organize Like a Pro! 📋',
    description: 'Learn to create ordered and unordered lists',
    difficulty: 'beginner',
    language: 'html',
    estimatedTime: 20,
    activities: ['code'],
    content: {
      theory: `
# Lists Make Everything Better! 📋

## Two Types of Lists 🎯

### Unordered Lists (Bullet Points) •
Perfect for items where order doesn't matter:

\`\`\`html
<ul>
    <li>Apples</li>
    <li>Oranges</li>
    <li>Bananas</li>
</ul>
\`\`\`

Result:
• Apples
• Oranges
• Bananas

### Ordered Lists (Numbered) 🔢
Perfect for steps or rankings:

\`\`\`html
<ol>
    <li>Wake up</li>
    <li>Brush teeth</li>
    <li>Eat breakfast</li>
</ol>
\`\`\`

Result:
1. Wake up
2. Brush teeth
3. Eat breakfast

## 🔥 Breaking it Down:

- \`<ul>\` = Unordered List (bullets)
- \`<ol>\` = Ordered List (numbers)
- \`<li>\` = List Item (goes inside ul or ol)

## 💡 You Can Mix Lists!

\`\`\`html
<h2>My Favorite Games</h2>
<ul>
    <li>Minecraft</li>
    <li>Fortnite</li>
    <li>Roblox</li>
</ul>

<h2>How to Make a Sandwich</h2>
<ol>
    <li>Get two slices of bread</li>
    <li>Add your favorite toppings</li>
    <li>Put the slices together</li>
    <li>Enjoy!</li>
</ol>
\`\`\`

## 🎮 Pro Tip:
Lists are EVERYWHERE on the web - navigation menus, to-do lists, product features, social media feeds!

Ready to list everything? Let's go! 🚀
      `,
      instructions: `
🎯 Your List Challenge:
1. Create an h1 title "All About Me"
2. Add an h2 "My Top 3 Favorite Foods"
3. Make an ORDERED list of your top 3 foods
4. Add an h2 "Things I Like To Do"
5. Make an UNORDERED list of hobbies
6. Add at least 4 items to each list

💡 Choose ul or ol wisely - does order matter?
      `,
      starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>My Lists</title>
</head>
<body>
    <!-- Create your lists here! -->

</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
    <title>My Lists</title>
</head>
<body>
    <h1>All About Me</h1>

    <h2>My Top 3 Favorite Foods</h2>
    <ol>
        <li>Pizza</li>
        <li>Burgers</li>
        <li>Ice Cream</li>
    </ol>

    <h2>Things I Like To Do</h2>
    <ul>
        <li>Play video games</li>
        <li>Watch movies</li>
        <li>Hang out with friends</li>
        <li>Code awesome websites</li>
    </ul>
</body>
</html>`,
      testCases: [
        {
          id: 'test-1',
          input: '',
          expectedOutput: 'ul',
          description: 'Page should have at least one unordered list'
        }
      ]
    }
  },
  {
    id: 'html-links-images',
    title: 'Links & Images: Make It Interactive! 🔗🖼️',
    description: 'Add links and images to bring your webpage to life',
    difficulty: 'beginner',
    language: 'html',
    estimatedTime: 25,
    activities: ['code'],
    content: {
      theory: `
# Links & Images: The Fun Stuff! 🎨

## Links: Connect to the World! 🔗

Links let you navigate to other pages:

\`\`\`html
<a href="https://www.google.com">Go to Google</a>
\`\`\`

### Breaking it down:
- \`<a>\` = Anchor tag (for links)
- \`href\` = Where to go (the destination)
- Text between tags = What users click on

## 🎯 Link Pro Tips:

Open in new tab:
\`\`\`html
<a href="https://www.youtube.com" target="_blank">YouTube</a>
\`\`\`

Link to email:
\`\`\`html
<a href="mailto:friend@email.com">Email Me</a>
\`\`\`

## Images: Make It Visual! 🖼️

Add pictures to your page:

\`\`\`html
<img src="https://example.com/cool-image.jpg" alt="A cool image">
\`\`\`

### Image tag explained:
- \`<img>\` = Image tag (no closing tag needed!)
- \`src\` = Source (the image URL)
- \`alt\` = Description (shows if image doesn't load)

## 🔥 Real Example:

\`\`\`html
<h1>My Favorite Websites</h1>

<p>Check out these cool sites:</p>
<ul>
    <li><a href="https://www.youtube.com" target="_blank">YouTube - Watch videos</a></li>
    <li><a href="https://www.github.com" target="_blank">GitHub - Share code</a></li>
</ul>

<h2>Cool Image</h2>
<img src="https://picsum.photos/400/300" alt="Random cool picture">
\`\`\`

## 💡 Why Use 'alt'?
- Helps people using screen readers
- Shows text if image doesn't load
- Helps search engines understand your image

Ready to link and show images? Let's build! 🚀
      `,
      instructions: `
🎯 Your Challenge:
1. Create an h1 "My Favorite Things Online"
2. Add a paragraph introducing your favorite websites
3. Create a list of 3 links to websites you like (use target="_blank")
4. Add an h2 "Cool Picture"
5. Add an image using this URL: https://picsum.photos/400/300
6. Don't forget the alt attribute!

⚡ Bonus: Make your link text interesting!
      `,
      starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Links and Images</title>
</head>
<body>
    <!-- Create your links and images here! -->

</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
    <title>Links and Images</title>
</head>
<body>
    <h1>My Favorite Things Online</h1>

    <p>Here are some of the websites I visit every day. They're super cool!</p>

    <ul>
        <li><a href="https://www.youtube.com" target="_blank">YouTube - Watch awesome videos</a></li>
        <li><a href="https://www.spotify.com" target="_blank">Spotify - Listen to music</a></li>
        <li><a href="https://www.github.com" target="_blank">GitHub - Learn to code</a></li>
    </ul>

    <h2>Cool Picture</h2>
    <img src="https://picsum.photos/400/300" alt="A random beautiful image">
    <p>Pretty cool, right? This is a random image from the internet!</p>
</body>
</html>`,
      testCases: [
        {
          id: 'test-1',
          input: '',
          expectedOutput: 'img',
          description: 'Page should have at least one image'
        }
      ]
    }
  },
  {
    id: 'html-divs-styling',
    title: 'Divs & Basic Styling: Layout Like a Pro! 🎨',
    description: 'Learn to organize content with divs and add inline styles',
    difficulty: 'beginner',
    language: 'html',
    estimatedTime: 25,
    activities: ['code'],
    content: {
      theory: `
# Divs & Styling: Make It Pretty! 🎨

## What's a Div? 📦

Think of \`<div>\` as an invisible box that holds your content:

\`\`\`html
<div>
    <h2>This is in a box</h2>
    <p>Everything in this div is grouped together!</p>
</div>
\`\`\`

## 🎯 Why Use Divs?

- **Organization**: Keep related content together
- **Styling**: Style groups of elements at once
- **Layout**: Build complex page layouts

## Adding Colors & Styles! 🌈

Use the \`style\` attribute to add CSS:

\`\`\`html
<div style="background-color: lightblue; padding: 20px;">
    <h2>Welcome!</h2>
    <p>This div has a blue background!</p>
</div>
\`\`\`

## 🔥 Common Style Properties:

**Colors:**
\`\`\`html
<p style="color: red;">Red text!</p>
<div style="background-color: yellow;">Yellow background!</div>
\`\`\`

**Spacing:**
\`\`\`html
<div style="padding: 20px;">Space inside</div>
<div style="margin: 20px;">Space outside</div>
\`\`\`

**Text:**
\`\`\`html
<p style="font-size: 24px;">Big text!</p>
<p style="text-align: center;">Centered text!</p>
\`\`\`

**Borders:**
\`\`\`html
<div style="border: 2px solid black;">Box with border!</div>
\`\`\`

## 💡 Full Example:

\`\`\`html
<div style="background-color: #f0f0f0; padding: 20px; border: 3px solid blue;">
    <h2 style="color: blue;">My Cool Section</h2>
    <p style="font-size: 18px;">This content is styled and organized!</p>
</div>

<div style="background-color: lightgreen; padding: 20px; margin-top: 20px;">
    <h2 style="color: darkgreen;">Another Section</h2>
    <p>Different style, different vibe!</p>
</div>
\`\`\`

## 🎨 Color Options:
- Names: \`red\`, \`blue\`, \`lightgreen\`
- Hex codes: \`#FF0000\`, \`#0000FF\`, \`#90EE90\`
- RGB: \`rgb(255, 0, 0)\`

Ready to style your page? Let's make it beautiful! 🚀
      `,
      instructions: `
🎯 Your Styling Challenge:
1. Create an h1 "My Styled Page" (centered with blue color)
2. Create a div with a light gray background
   - Add heading "About Me" inside
   - Add paragraph about yourself
   - Add padding and a border
3. Create another div with a different color
   - Add heading "My Skills"
   - Add a list of skills
   - Style it differently!

💡 Experiment with colors, padding, and borders!
      `,
      starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Styled Page</title>
</head>
<body>
    <!-- Create your styled divs here! -->

</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
    <title>Styled Page</title>
</head>
<body>
    <h1 style="text-align: center; color: blue;">My Styled Page</h1>

    <div style="background-color: #f5f5f5; padding: 20px; border: 2px solid #333; margin: 20px;">
        <h2 style="color: #333;">About Me</h2>
        <p style="font-size: 16px;">Hi! I'm learning HTML and CSS. It's amazing how much you can do with just a few styles!</p>
    </div>

    <div style="background-color: lightblue; padding: 20px; border: 3px solid blue; margin: 20px;">
        <h2 style="color: darkblue;">My Skills</h2>
        <ul style="font-size: 18px;">
            <li>HTML</li>
            <li>Problem Solving</li>
            <li>Creativity</li>
            <li>Learning New Things</li>
        </ul>
    </div>
</body>
</html>`,
      testCases: [
        {
          id: 'test-1',
          input: '',
          expectedOutput: 'div',
          description: 'Page should have at least one div element'
        }
      ]
    }
  }
];
