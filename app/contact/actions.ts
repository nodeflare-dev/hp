"use server";

/**
 * お問い合わせフォームの送信処理（Server Action）。
 *
 * 現状はサーバーログに記録し、成功レスポンスを返すのみ。
 * メール送信・CRM 連携などは、後でこの関数内に実装する
 * （SendGrid / Resend / Slack Webhook 等）。
 * 送信先の設定は環境変数を追加して行う想定（HYGRAPH.md 参照）。
 */

export type ContactState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<"name" | "email" | "message" | "category", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // ハニーポット（bot 対策）：埋まっていたら成功を装って無視
  const honeypot = String(formData.get("website") ?? "");
  if (honeypot) return { ok: true, message: "送信しました。" };

  const errors: ContactState["errors"] = {};
  if (!name) errors.name = "お名前を入力してください。";
  if (!email) errors.email = "メールアドレスを入力してください。";
  else if (!EMAIL_RE.test(email))
    errors.email = "メールアドレスの形式が正しくありません。";
  if (!category) errors.category = "お問い合わせ種別を選択してください。";
  if (!message) errors.message = "お問い合わせ内容を入力してください。";
  else if (message.length < 10)
    errors.message = "お問い合わせ内容は 10 文字以上でご入力ください。";

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "入力内容をご確認ください。",
      errors,
    };
  }

  // TODO: メール送信 / 通知連携をここに実装する。
  console.info("[contact] new submission", {
    name,
    email,
    company,
    category,
    message,
  });

  return {
    ok: true,
    message:
      "お問い合わせありがとうございます。担当者より折り返しご連絡いたします。",
  };
}
