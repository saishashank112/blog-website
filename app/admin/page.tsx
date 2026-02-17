'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './Admin.module.css';

interface Post {
    id: string;
    title: string;
    category: string;
    image: string;
    excerpt: string;
    content: string;
    createdAt: string;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginPassword, setLoginPassword] = useState('');
    const [password, setPassword] = useState('');

    // Form State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Technology');
    const [image, setImage] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');

    const [posts, setPosts] = useState<Post[]>([]);
    const [subscribers, setSubscribers] = useState<string[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'unauthorized'>('idle');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (loginPassword === 'admin123') {
            setIsAuthenticated(true);
            setPassword('admin123');
            localStorage.setItem('admin_auth', 'true');
        } else {
            alert('Wrong password!');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('admin_auth') === 'true') {
            setIsAuthenticated(true);
            setPassword('admin123');
        }
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/posts');
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    const fetchSubscribers = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/subscribers');
            if (res.ok) {
                const data = await res.json();
                setSubscribers(data);
            }
        } catch (error) {
            console.error('Failed to fetch subscribers:', error);
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/messages');
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            }
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchPosts();
            fetchSubscribers();
            fetchMessages();
        }
    }, [isAuthenticated]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const url = editingId
            ? `http://localhost:5000/api/posts/${editingId}`
            : 'http://localhost:5000/api/posts';

        const method = editingId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    category,
                    image,
                    excerpt,
                    content,
                    password,
                }),
            });

            if (res.ok) {
                setStatus('success');
                resetForm();
                fetchPosts();
                setTimeout(() => setStatus('idle'), 3000);
            } else if (res.status === 401) {
                setStatus('unauthorized');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Failed to save post:', error);
            setStatus('error');
        }
    };

    const handleEdit = (post: Post) => {
        setEditingId(post.id);
        setTitle(post.title);
        setCategory(post.category);
        setImage(post.image);
        setExcerpt(post.excerpt);
        setContent(post.content);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                fetchPosts();
            } else {
                alert('Failed to delete post');
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setTitle('');
        setCategory('Technology');
        setImage('');
        setExcerpt('');
        setContent('');
    };

    if (!isAuthenticated) {
        return (
            <main className={styles.main}>
                <div className="mesh-bg"></div>
                <Navbar />
                <div className={styles.loginContainer}>
                    <div className={`${styles.loginCard} card`}>
                        <h2 className="gradient-text">Admin Login</h2>
                        <p>Secret access to the publishing engine.</p>
                        <form onSubmit={handleLogin} className={styles.form}>
                            <div className={styles.passwordWrapper}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    className={styles.input}
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.eyeBtn}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Unlock Dashboard</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className="mesh-bg"></div>
            <Navbar />

            <section className={styles.hero}>
                <div className="container">
                    <div className="animate-reveal">
                        <h1 className={styles.title}>The <span className="gradient-text italic serif">Creator</span> Control</h1>
                        <p className={styles.subtitle}>Refine your signal. Edit, prune, and publish from the heart of the engine.</p>

                        <div className={styles.statsRow}>
                            <div className={`${styles.statTile} card`}>
                                <span>Subscribers</span>
                                <h2>{subscribers.length}</h2>
                            </div>
                            <div className={`${styles.statTile} card`}>
                                <span>Inquiries</span>
                                <h2>{messages.length}</h2>
                            </div>
                            <div className={`${styles.statTile} card`}>
                                <span>Live Posts</span>
                                <h2>{posts.length}</h2>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                localStorage.removeItem('admin_auth');
                                setIsAuthenticated(false);
                            }}
                            className="btn-secondary"
                            style={{ marginTop: '40px' }}
                        >
                            Secure Logout
                        </button>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className={`${styles.adminGrid} animate-reveal`}>
                        {/* LEFT: FORM */}
                        <div className={`${styles.adminCard} card`}>
                            <h3 className="serif" style={{ fontSize: '24px', marginBottom: '24px' }}>
                                {editingId ? 'Edit Article' : 'New Article'}
                            </h3>
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.group}>
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        placeholder="Headline..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.group}>
                                        <label>Category</label>
                                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                            <option value="Technology">Technology</option>
                                            <option value="AI">AI</option>
                                            <option value="Startups">Startups</option>
                                            <option value="Programming">Programming</option>
                                        </select>
                                    </div>
                                    <div className={styles.group}>
                                        <label>Image URL</label>
                                        <input
                                            type="text"
                                            placeholder="URL..."
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={styles.group}>
                                    <label>Excerpt</label>
                                    <textarea
                                        rows={2}
                                        placeholder="Summary..."
                                        value={excerpt}
                                        onChange={(e) => setExcerpt(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className={styles.group}>
                                    <label>Body Content</label>
                                    <textarea
                                        rows={12}
                                        placeholder="Markdown supported..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <div className={styles.btnRow}>
                                    <button
                                        type="submit"
                                        className="btn-primary"
                                        disabled={status === 'loading'}
                                    >
                                        {status === 'loading' ? 'Saving...' : editingId ? 'Update Post' : 'Publish Post'}
                                    </button>
                                    {editingId && (
                                        <button type="button" className="btn-secondary" onClick={resetForm}>
                                            Cancel
                                        </button>
                                    )}
                                </div>

                                {status === 'success' && <p className={styles.success}>Operation successful!</p>}
                                {status === 'error' && <p className={styles.error}>An error occurred. Check backend.</p>}
                            </form>
                        </div>

                        {/* RIGHT: LISTS */}
                        <div className={styles.postListSide}>
                            {/* MESSAGES SECTION */}
                            <h3 className="serif" style={{ fontSize: '24px', marginBottom: '24px' }}>Secure Inquiries</h3>
                            <div className={styles.listContainer} style={{ marginBottom: '60px' }}>
                                {messages.length === 0 ? (
                                    <p style={{ color: 'var(--text-muted)' }}>No messages yet.</p>
                                ) : (
                                    messages.map((msg: any) => (
                                        <div key={msg.id} className={styles.messageCard}>
                                            <div className={styles.messageHeader}>
                                                <h4>{msg.subject}</h4>
                                                <span>{new Date(msg.createdAt).toLocaleString()}</span>
                                            </div>
                                            <p className={styles.messageBody}>{msg.message}</p>
                                            <div className={styles.messageFooter}>
                                                From: {msg.name} ({msg.email})
                                            </div>
                                        </div>
                                    )).reverse() // Show newest first
                                )}
                            </div>

                            <h3 className="serif" style={{ fontSize: '24px', marginBottom: '24px' }}>Archive Management</h3>
                            <div className={styles.listContainer}>
                                {posts.length === 0 ? (
                                    <p style={{ color: 'var(--text-muted)' }}>No articles found.</p>
                                ) : (
                                    posts.map(post => (
                                        <div key={post.id} className={`${styles.listItem} card`}>
                                            <div className={styles.listInfo}>
                                                <h4>{post.title}</h4>
                                                <span>{post.category} • {new Date(post.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className={styles.listActions}>
                                                <button onClick={() => handleEdit(post)} className={styles.editBtn}>✎</button>
                                                <button onClick={() => handleDelete(post.id)} className={styles.deleteBtn}>🗑</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
