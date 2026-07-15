"use client";

import { useActionState } from "react";
import { ChevronDown, Send } from "lucide-react";
import { submitContact, type ContactState } from "@/app/contact/actions";

const initialState: ContactState = { ok: false, message: "" };

const CATEGORIES = [
  "事業・サービスについて",
  "NodeFlare（プロダクト）について",
  "セキュリティ診断・修正",
  "パフォーマンス診断・改善",
  "取材・その他",
];

const fieldClass =
  "w-full rounded-sm border border-[#e5e5e5] bg-[#fafafa] px-4 py-2.5 text-[0.95rem] text-[#333] outline-none transition-colors placeholder:text-[#bbb] focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15";

const labelClass = "block text-[0.82rem] font-medium text-[#555]";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  if (state.ok) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-primary">
            <path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="mt-6 text-[1.3rem] font-bold text-[#333]">送信が完了しました</h2>
        <p className="mt-3 text-[0.92rem] leading-7 text-[#555]">
          お問い合わせありがとうございます。<br />
          担当者より 2〜3 営業日以内にご返信いたします。
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-[0.88rem] text-primary hover:underline"
        >
          ← トップページへ戻る
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {state.message && !state.ok && (
        <p role="alert" className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            お名前 <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={`mt-1.5 ${fieldClass}`}
            placeholder="山田 太郎"
          />
          {state.errors?.name && (
            <p className="mt-1.5 text-xs text-red-500">{state.errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            会社名
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={`mt-1.5 ${fieldClass}`}
            placeholder="株式会社〇〇"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          メールアドレス <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={`mt-1.5 ${fieldClass}`}
          placeholder="you@example.com"
        />
        {state.errors?.email && (
          <p className="mt-1.5 text-xs text-red-500">{state.errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className={labelClass}>
          お問い合わせ種別 <span className="text-red-400">*</span>
        </label>
        <div className="relative mt-1.5">
          <select
            id="category"
            name="category"
            className={`${fieldClass} appearance-none pr-10`}
            defaultValue=""
          >
            <option value="" disabled>選択してください</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa]"
            size={16}
          />
        </div>
        {state.errors?.category && (
          <p className="mt-1.5 text-xs text-red-500">{state.errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          お問い合わせ内容 <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={`mt-1.5 ${fieldClass}`}
          placeholder="ご相談内容をご記入ください。"
        />
        {state.errors?.message && (
          <p className="mt-1.5 text-xs text-red-500">{state.errors.message}</p>
        )}
      </div>

      <p className="text-xs leading-6 text-muted">
        送信いただいた個人情報は、
        <a href="/privacy" className="text-[#555] underline underline-offset-2 hover:text-primary">
          プライバシーポリシー
        </a>
        に基づき適切に取り扱います。
      </p>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-10 items-center gap-2 rounded-sm bg-primary px-6 text-[0.9rem] font-medium text-white transition-colors hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={15} />
        {pending ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
