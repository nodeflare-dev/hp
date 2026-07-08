import { Container } from "./Container";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/** 下層ページ共通のヘッダー。大見出し + パンくず。装飾ラベルは使わない。 */
export function PageHeader({
  title,
  description,
  crumbs,
}: {
  /** 互換用（未使用） */
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
}) {
  return (
    <header className="bg-surface">
      <Container className="pb-14 pt-10 sm:pb-16 sm:pt-12">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="max-w-3xl text-[2.4rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[3.25rem]">
            {title}
          </h1>
          {description && (
            <p className="max-w-md text-[0.98rem] leading-8 text-muted lg:pb-2">
              {description}
            </p>
          )}
        </div>
      </Container>
    </header>
  );
}
