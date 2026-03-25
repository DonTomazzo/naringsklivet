// src/pages/BlogPage.tsx
import { getPublishedPosts } from '../data/posts';
import { NewsroomClient } from '../components/blog/NewsroomClient';

export default function BlogPage() {
  const posts = getPublishedPosts();
  
  return <NewsroomClient initialPosts={posts} />;
}