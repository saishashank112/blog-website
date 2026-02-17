import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const BACKEND_URL = 'http://localhost:5000/api';

export interface PostData {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content?: string;
  contentHtml?: string;
  slug?: string;
}

// Helper to fetch from Backend
async function getBackendPosts(): Promise<PostData[]> {
  // 1. Try API first (Works locally)
  try {
    const res = await fetch(`${BACKEND_URL}/posts`, {
      next: { revalidate: 0 },
      cache: 'no-store'
    });
    if (res.ok) {
      const posts = await res.json();
      return posts.map((p: any) => ({
        ...p,
        id: p.id,
        slug: p.slug || p.id,
        date: p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }) : p.date
      }));
    }
  } catch (e) {
    console.log('API not reachable, attempting direct database read...');
  }

  // 2. Direct DB Read (Fallback for Vercel/Production)
  try {
    const dbPath = path.join(process.cwd(), 'server', 'db.json');
    if (fs.existsSync(dbPath)) {
      const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      return (dbData.posts || []).map((p: any) => ({
        ...p,
        id: p.id,
        slug: p.slug || p.id,
        date: p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric'
        }) : p.date
      }));
    }
  } catch (e) {
    console.error('Database read failed:', e);
  }

  return [];
}

export async function getAllPosts(): Promise<PostData[]> {
  // 1. Get posts from Backend
  const backendPosts = await getBackendPosts();

  // 2. Get posts from Markdown files (Fallback/Local)
  let filePosts: PostData[] = [];
  if (fs.existsSync(postsDirectory)) {
    const fileNames = fs.readdirSync(postsDirectory);
    filePosts = fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      return {
        id,
        ...matterResult.data,
      } as PostData;
    });
  }

  // Combine and remove duplicates (prefer backend)
  const backendIdentifiers = new Set([
    ...backendPosts.map(p => p.id),
    ...backendPosts.map(p => p.slug).filter(Boolean)
  ]);

  const uniqueFilePosts = filePosts.filter(p => !backendIdentifiers.has(p.id));

  const allPosts = [...backendPosts, ...uniqueFilePosts];
  return allPosts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export async function getPostData(id: string) {
  // 1. Try fetching from Backend first (using slug/id)
  try {
    const res = await fetch(`${BACKEND_URL}/posts/${id}`, { cache: 'no-store' });
    if (res.ok) {
      const post = await res.json();
      const processedContent = await remark().use(html).process(post.content);
      const contentHtml = processedContent.toString();
      return {
        ...post,
        date: new Date(post.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        contentHtml
      };
    }
  } catch (e) { }

  // 2. Try direct DB read (Fallback for Vercel)
  try {
    const dbPath = path.join(process.cwd(), 'server', 'db.json');
    if (fs.existsSync(dbPath)) {
      const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      const post = dbData.posts.find((p: any) => p.slug === id || p.id === id);
      if (post) {
        const processedContent = await remark().use(html).process(post.content);
        const contentHtml = processedContent.toString();
        return {
          ...post,
          id: post.id,
          date: new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
          }),
          contentHtml
        };
      }
    }
  } catch (e) { }

  // 3. Fallback to Markdown files
  const fullPath = path.join(postsDirectory, `${id}.md`);
  if (fs.existsSync(fullPath)) {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id,
      contentHtml,
      ...(matterResult.data as { date: string; title: string; category: string; image: string; excerpt: string }),
    };
  }

  throw new Error('Post not found');
}
