import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Post } from "@/lib/news";
import { getCategory } from "@/lib/news";
import { formatDate } from "@/lib/format";
import { Placeholder } from "@/components/ui/Placeholder";

/** お知らせ一覧。サムネイル + 見出し（showMeta で日付・カテゴリーを表示）。 */
export function NewsList({
  posts,
  showMeta = true,
}: {
  posts: Post[];
  showMeta?: boolean;
}) {
  if (posts.length === 0) {
    return <p className="py-16 text-muted">現在、お知らせはありません。</p>;
  }

  return (
    <ul className="divide-y divide-line/60">
      {posts.map((post) => {
        const cat = getCategory(post.category);
        return (
          <li key={post.slug}>
            <Link
              href={`/news/${post.category}/${post.slug}`}
              className="group flex gap-5 sm:gap-8"
            >
              {/* サムネイル */}
              <div className="w-28 shrink-0 overflow-hidden sm:w-52">
                <div className="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                  <Placeholder src={post.coverImageUrl} alt="" ratio="16/9" />
                </div>
              </div>

              {/* テキスト */}
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 sm:gap-2.5">
                {showMeta && (
                  <div className="flex items-baseline gap-4">
                    <time
                      dateTime={post.publishedAt}
                      className="text-sm tabular-nums text-muted"
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                    {cat && (
                      <span className="text-[0.78rem] font-normal text-muted">
                        {cat.label}
                      </span>
                    )}
                  </div>
                )}
                <p
                  className={`font-medium leading-7 text-ink transition-colors group-hover:text-primary ${
                    showMeta
                      ? "text-[1rem]"
                      : "text-[1.15rem] sm:text-[1.3rem]"
                  }`}
                >
                  {post.title}
                </p>
                {!showMeta && post.excerpt && (
                  <p className="line-clamp-2 text-[0.9rem] leading-6 text-ink-soft">
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* 右端の矢印（黒背景・白矢印） */}
              <div className="flex shrink-0 items-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink text-white transition-colors group-hover:bg-primary">
                  <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
