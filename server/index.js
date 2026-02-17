const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));

// Database Initialization
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ posts: [] }, null, 2));
}

const getDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const saveDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// Routes
app.get('/api/posts', (req, res) => {
    const db = getDB();
    res.json(db.posts);
});

app.get('/api/posts/:identifier', (req, res) => {
    const db = getDB();
    const post = db.posts.find(p => p.slug === req.params.identifier || p.id === req.params.identifier);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
});

app.post('/api/posts', (req, res) => {
    const { title, content, category, image, excerpt, password } = req.body;

    // Simple Admin Security
    if (password !== 'admin123') {
        return res.status(401).json({ message: 'Unauthorized: Invalid Admin Password' });
    }

    if (!title || !content) return res.status(400).json({ message: 'Title and content are required' });

    const db = getDB();
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const newPost = {
        id: Date.now().toString(),
        title,
        slug,
        content,
        category: category || 'General',
        image: image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
        excerpt: excerpt || content.substring(0, 150) + '...',
        createdAt: new Date().toISOString()
    };

    db.posts.push(newPost);
    saveDB(db);

    res.status(201).json(newPost);
});

app.put('/api/posts/:id', (req, res) => {
    const { title, content, category, image, excerpt, password } = req.body;
    const { id } = req.params;

    if (password !== 'admin123') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const db = getDB();
    const index = db.posts.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ message: 'Post not found' });

    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    db.posts[index] = {
        ...db.posts[index],
        title,
        slug,
        content,
        category,
        image,
        excerpt,
        updatedAt: new Date().toISOString()
    };

    saveDB(db);
    res.json(db.posts[index]);
});

app.delete('/api/posts/:id', (req, res) => {
    const { password } = req.body;
    const { id } = req.params;

    if (password !== 'admin123') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const db = getDB();
    const filteredPosts = db.posts.filter(p => p.id !== id);

    if (db.posts.length === filteredPosts.length) {
        return res.status(404).json({ message: 'Post not found' });
    }

    db.posts = filteredPosts;
    saveDB(db);
    res.json({ message: 'Post deleted successfully' });
});

app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const db = getDB();
    if (!db.subscribers) db.subscribers = [];

    if (db.subscribers.includes(email)) {
        return res.status(400).json({ message: 'Email already subscribed' });
    }

    db.subscribers.push(email);
    saveDB(db);

    console.log(`New subscriber: ${email}`);
    res.json({ message: 'Subscribed successfully' });
});

app.get('/api/subscribers', (req, res) => {
    const db = getDB();
    res.json(db.subscribers || []);
});

app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const db = getDB();
    if (!db.messages) db.messages = [];

    const newMessage = {
        id: Date.now().toString(),
        name,
        email,
        subject: subject || 'No Subject',
        message,
        createdAt: new Date().toISOString()
    };

    db.messages.push(newMessage);
    saveDB(db);

    console.log(`New contact message from ${name} (${email})`);
    res.json({ message: 'Message sent successfully' });
});

app.get('/api/messages', (req, res) => {
    const db = getDB();
    res.json(db.messages || []);
});

app.listen(PORT, () => {
    console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
