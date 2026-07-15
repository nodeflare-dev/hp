"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { NewsList } from "./NewsList";
import { CategoryTabs } from "./CategoryTabs";
import type { Post } from "@/lib/news";

export function NewsFilter({
  posts,
  activeCategory,
}: {
  posts: Post[];
  activeCategory: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q),
    );
  }, [posts, query]);

  return (
    <>
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            type="search"
            placeholder="記事を検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-ink/25 bg-white py-2 pl-11 pr-10 text-[0.9rem] text-ink placeholder:text-muted/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="検索をクリア"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted transition-colors hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-12">
        <CategoryTabs active={activeCategory} />
      </div>

      <div className="mt-10">
        {query && (
          <p className="mb-6 text-sm text-muted">
            「{query}」の検索結果：{filtered.length} 件
          </p>
        )}
        <NewsList posts={filtered} />
      </div>
    </>
  );
}
