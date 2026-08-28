import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';

type Post = { id: string; title: string; description: string; tags: string[]; date: string };
export default function SearchPosts({ posts, base }: { posts: Post[]; base: string }) {
  const [query, setQuery] = useState(''); const [tag, setTag] = useState('All');
  const tags = ['All', ...Array.from(new Set(posts.flatMap((post) => post.tags)))];
  const fuse = useMemo(() => new Fuse(posts, { keys: ['title', 'description', 'tags'], threshold: .35 }), [posts]);
  const searched = query.trim() ? fuse.search(query).map((item) => item.item) : posts;
  const results = tag === 'All' ? searched : searched.filter((post) => post.tags.includes(tag));
  return <div>
    <label className="block"><span className="sr-only">Search posts</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search titles, summaries, or tags…" className="glass w-full rounded-2xl px-5 py-4 outline-none focus:border-[var(--accent)]" /></label>
    <div className="my-5 flex flex-wrap gap-2">{tags.map((item) => <button key={item} onClick={() => setTag(item)} className={`rounded-full border px-3 py-1.5 text-xs transition ${tag === item ? 'border-[var(--accent)] bg-[var(--accent)] text-white' : 'border-[var(--line)] text-[var(--muted)]'}`}>{item}</button>)}</div>
    <div className="grid gap-4 md:grid-cols-2">{results.map((post) => <article key={post.id} className="card p-6"><div className="mb-3 text-xs text-[var(--accent)]">{post.tags.join(' · ')}</div><h2 className="text-xl font-semibold"><a className="after:absolute after:inset-0" href={`${base}/blog/${post.id}/`}>{post.title}</a></h2><p className="mt-2 text-sm text-[var(--muted)]">{post.description}</p><time className="mt-5 block text-xs text-[var(--muted)]">{post.date}</time></article>)}</div>
    {!results.length && <p className="py-16 text-center text-[var(--muted)]">No matching posts found.</p>}
  </div>;
}
