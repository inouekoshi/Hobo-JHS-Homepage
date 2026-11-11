"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { SectionHead, Tape } from "./ui";
import styles from "./ContactForm.module.css";

interface FormData {
  name: string;
  email: string;
  message: string;
}

// Formspree エンドポイント
// .env.local に NEXT_PUBLIC_FORMSPREE_ID=xxxxxxxx を設定してください
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
  : null;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (FORMSPREE_ENDPOINT) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _replyto: formData.email,
            _subject: `【保々中同窓会】${formData.name}さんからのお問い合わせ`,
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error ?? "送信に失敗しました");
        }
      } else {
        // 開発環境: Formspree未設定時はコンソールに出力
        console.log("【開発モード】フォーム送信データ:", formData);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "送信中にエラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <Reveal rotate={-1.5}>
        <SectionHead
          label="CONTACT"
          color="black"
          title="お問い合わせ"
          lead={
            <>
              ご質問やご不明な点がございましたら、お気軽にお問い合わせください。
              <br />
              欠席のご連絡は、1月8日（金）正午までに幹事へお知らせください。
            </>
          }
        />
      </Reveal>

      <Reveal rotate={0.6} delay={0.05}>
        {isSubmitted ? (
          <div className={`card ${styles.done}`} role="status">
            <span className="corner-tape" aria-hidden="true" />
            <Tape color="green" rotate={-2} className={styles.doneTape}>
              THANK YOU!
            </Tape>
            <h3 className={styles.doneTitle}>送信完了！</h3>
            <p>
              お問い合わせありがとうございます。
              <br />
              担当者より折り返しご連絡いたします。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={`card ${styles.form}`}>
            <span className="corner-tape pink" aria-hidden="true" />

            <div className={styles.field}>
              <label htmlFor="contact-name">
                お名前 <span className={styles.req}>必須</span>
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                required
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="山田 太郎"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-email">
                返信用メールアドレス <span className={styles.req}>必須</span>
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-message">
                お問い合わせ内容 <span className={styles.req}>必須</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="お気軽にご記入ください"
              />
            </div>

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <div className={styles.submit}>
              <button type="submit" className="btn pink" disabled={isSubmitting}>
                {isSubmitting ? "送信中…" : "送信する →"}
              </button>
            </div>
          </form>
        )}
      </Reveal>
    </section>
  );
}
