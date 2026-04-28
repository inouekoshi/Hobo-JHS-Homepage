"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (FORMSPREE_ENDPOINT) {
        // Formspree に送信
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _replyto: formData.email,
            _subject: `【保々中同窓会】${formData.name}さんからのお問い合わせ`,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data?.error ?? "送信に失敗しました");
        }
      } else {
        // 開発環境: Formspree未設定時はコンソールに出力
        console.log("【開発モード】フォーム送信データ:", formData);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "送信中にエラーが発生しました。時間をおいて再度お試しください。"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="relative py-20 sm:py-28 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d1520] to-[#0a0a12]" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 sm:p-12"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-3xl">
              ✅
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              送信完了！
            </h3>
            <p className="text-white/60 leading-relaxed">
              お問い合わせありがとうございます。
              <br />
              担当者より折り返しご連絡いたします。
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputCls =
    "w-full px-4 py-3 sm:py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all text-sm sm:text-base";

  return (
    <section id="contact" className="relative py-20 sm:py-28 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d1520] to-[#0a0a12]" />
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-amber-400/80 border border-amber-500/20 rounded-full bg-amber-500/5 mb-4">
            CONTACT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            お問い合わせ
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto">
            ご質問やご不明な点がございましたら、
            <br className="sm:hidden" />
            お気軽にお問い合わせください。
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card p-6 sm:p-8 space-y-5"
        >
          {/* お名前 */}
          <div>
            <label
              htmlFor="contact-name"
              className="block text-sm font-medium text-white/80 mb-1.5"
            >
              お名前 <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="山田 太郎"
              className={inputCls}
            />
          </div>

          {/* メールアドレス */}
          <div>
            <label
              htmlFor="contact-email"
              className="block text-sm font-medium text-white/80 mb-1.5"
            >
              返信用メールアドレス <span className="text-amber-400">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className={inputCls}
            />
          </div>

          {/* お問い合わせ内容 */}
          <div>
            <label
              htmlFor="contact-message"
              className="block text-sm font-medium text-white/80 mb-1.5"
            >
              お問い合わせ内容 <span className="text-amber-400">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="お気軽にご記入ください"
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* エラーメッセージ */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              <span className="shrink-0 mt-0.5">⚠️</span>
              <span>{error}</span>
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-base sm:text-lg rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                送信中...
              </span>
            ) : (
              "送信する"
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
