import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-normal uppercase tracking-[0.2em] text-muted">
        404
      </p>
      <h1 className="mt-4 text-3xl font-medium text-ink sm:text-4xl">
        ページが見つかりませんでした
      </h1>
      <p className="mt-4 max-w-md text-base leading-8 text-muted">
        お探しのページは移動または削除された可能性があります。URL をご確認いただくか、トップページからお探しください。
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/" variant="primary" withArrow>
          トップページへ
        </Button>
        <Button href="/contact" variant="outline">
          お問い合わせ
        </Button>
      </div>
    </Container>
  );
}
