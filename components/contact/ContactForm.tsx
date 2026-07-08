"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/contact/actions";

const initialState: ContactState = { ok: false, message: "" };

const CATEGORIES = [
  "事業・サービスについて",
  "NodeFlare（プロダクト）について",
  "セキュリティ診断・修正",
  "パフォーマンス診断・改善",
  "採用について",
  "取材・その他",
];

const fieldClass =
  "mt-2 w-full border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  if (state.ok) {
    return (
      <div className="border border-line bg-surface p-12 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center border border-primary/30 text-ink">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5l4 4 10-10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-xl font-normal text-ink">送信が完了しました</h2>
        <p className="mt-3 text-sm leading-7 text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.message && !state.ok && (
        <p
          role="alert"
          className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      {/* ハニーポット（非表示） */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-normal text-ink">
            お名前 <span className="text-muted">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={fieldClass}
            placeholder="山田 太郎"
          />
          {state.errors?.name && (
            <p className="mt-1.5 text-xs text-red-600">{state.errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="text-sm font-normal text-ink">
            会社名
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={fieldClass}
            placeholder="株式会社〇〇"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-normal text-ink">
          メールアドレス <span className="text-muted">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          placeholder="you@example.com"
        />
        {state.errors?.email && (
          <p className="mt-1.5 text-xs text-red-600">{state.errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="text-sm font-normal text-ink">
          お問い合わせ種別 <span className="text-muted">*</span>
        </label>
        <select id="category" name="category" className={fieldClass} defaultValue="">
          <option value="" disabled>
            選択してください
          </option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {state.errors?.category && (
          <p className="mt-1.5 text-xs text-red-600">{state.errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-normal text-ink">
          お問い合わせ内容 <span className="text-muted">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={fieldClass}
          placeholder="ご相談内容をご記入ください。"
        />
        {state.errors?.message && (
          <p className="mt-1.5 text-xs text-red-600">{state.errors.message}</p>
        )}
      </div>

      <p className="text-xs leading-6 text-muted">
        送信いただいた個人情報は、
        <a href="/privacy" className="text-ink underline underline-offset-2">
          プライバシーポリシー
        </a>
        に基づき適切に取り扱います。
      </p>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-13 w-full items-center justify-center bg-ink px-8 text-sm font-normal text-white transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "送信中…" : "この内容で送信する"}
      </button>
    </form>
  );
}
