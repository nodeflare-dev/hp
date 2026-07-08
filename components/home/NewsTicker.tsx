import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getPosts, getCategory } from "@/lib/news";
import { formatDate } from "@/lib/format";

/** ヒーロー直下のお知らせ帯。 */
export async function NewsTicker() {
  const [latest] = await getPosts(1);
  if (!latest) return null;
  const cat = getCategory(latest.category);

  return (
    <div className="bg-surface shadow-[0_1px_0_rgba(13,14,18,0.06)]">
      <Container size="wide">
        <Link
          href={`/news/${latest.category}/${latest.slug}`}
          className="group flex items-center gap-5 py-5"
        >
          <span className="flex shrink-0 items-center gap-2.5 text-sm font-normal text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            最新のお知らせ
          </span>
          <time className="hidden shrink-0 text-sm tabular-nums text-muted sm:block">
            {formatDate(latest.publishedAt)}
          </time>
          {cat && (
            <span className="hidden shrink-0 text-[0.8rem] font-normal text-muted md:block">
              {cat.label}
            </span>
          )}
          <span className="truncate text-sm text-ink-soft transition-colors group-hover:text-primary">
            {latest.title}
          </span>
          <span
            aria-hidden
            className="ml-auto hidden shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1 sm:block"
          >
            ›
          </span>
        </Link>
      </Container>
    </div>
  );
}
