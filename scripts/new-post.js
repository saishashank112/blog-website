const fs = require('fs');
const path = require('path');

const title = process.argv[2];
if (!title) {
    console.log('Please provide a title: npm run new-post "My New Post"');
    process.exit(1);
}

const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
});

const template = `---
title: "${title}"
date: "${date}"
category: "Technology"
image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
excerpt: "A short summary of your daily blog post goes here..."
---

Start writing your blog post in Markdown here!
`;

const filePath = path.join(__dirname, '..', 'content/posts', `${slug}.md`);

if (fs.existsSync(filePath)) {
    console.log(`Post ${slug}.md already exists!`);
} else {
    fs.writeFileSync(filePath, template);
    console.log(`Created new post: ${filePath}`);
}
