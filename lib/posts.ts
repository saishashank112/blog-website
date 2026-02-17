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
  try {
    const res = await fetch(`${BACKEND_URL}/posts`, {
      next: { revalidate: 0 },
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const posts = await res.json();
    return posts.map((p: any) => ({
      ...p,
      id: p.id, // Use the real unique ID for React keys
      slug: p.slug || p.id, // Prefer slug for URL routing
      date: p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }) : p.date
    }));
  } catch (e) {
    console.error('Backend connection failed, ensuring fallback...');
    return [];
  }
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
  const backendIds = new Set(backendPosts.map(p => p.id));
  const uniqueFilePosts = filePosts.filter(p => !backendIds.has(p.id));

  const allPosts = [...backendPosts, ...uniqueFilePosts];
  return allPosts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export async function getPostData(id: string) {
  // 1. Try fetching from Backend first (using slug/id)
  try {
    const res = await fetch(`${BACKEND_URL}/posts/${id}`);
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

  // 2. Fallback to Markdown files
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
