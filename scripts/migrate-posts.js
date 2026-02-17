const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Root is one level up from this script
const root = path.join(__dirname, '..');
const postsDirectory = path.join(root, 'content/posts');
const dbPath = path.join(root, 'server/db.json');

if (!fs.existsSync(dbPath)) {
    console.error(`db.json not found at: ${dbPath}`);
    process.exit(1);
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
if (!db.posts) db.posts = [];

const existingSlugs = new Set(db.posts.map(p => p.slug));

if (fs.existsSync(postsDirectory)) {
    const fileNames = fs.readdirSync(postsDirectory);
    fileNames.forEach((fileName) => {
        if (!fileName.endsWith('.md')) return;

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const slug = fileName.replace(/\.md$/, '');

        if (!existingSlugs.has(slug)) {
            const newPost = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                title: data.title || slug,
                slug: slug,
                content: content,
                category: data.category || 'General',
                image: data.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
                excerpt: data.excerpt || content.substring(0, 150) + '...',
                createdAt: data.date ? new Date(data.date).toISOString() : new Date().toISOString()
            };
            db.posts.push(newPost);
            console.log(`Migrated: ${slug}`);
        } else {
            console.log(`Skipped (already exists): ${slug}`);
        }
    });

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log('Migration complete. You can now manage all posts in the Admin panel.');
} else {
    console.log('No markdown posts found.');
}
