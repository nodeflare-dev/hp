import { Container } from "@/components/ui/Container";
import { NewsList } from "@/components/news/NewsList";
import { getPosts } from "@/lib/news";

export async function NewsSection() {
  const posts = await getPosts(5);
  return (
    <section className="bg-surface pt-12 pb-24 sm:pt-16 sm:pb-32">
      <Container>
        <h2 className="text-[1.5rem] font-semibold tracking-[-0.015em] text-[#333333] sm:text-[1.8rem]">
          Company Highlights
        </h2>
        <div className="mt-6">
          <NewsList posts={posts} showMeta={false} />
        </div>
      </Container>
    </section>
  );
}
