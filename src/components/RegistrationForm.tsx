"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface FormData {
  name: string;
  furigana: string;
  attendance: string;
  email: string;
  phone: string;
  message: string;
}

export default function RegistrationForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<FormData>({
    name: "", furigana: "", attendance: "", email: "", phone: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: バックエンド連携
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="registration" className="relative py-20 sm:py-28 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d1520] to-[#0a0a12]" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 sm:p-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-3xl">✅</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">送信完了！</h3>
            <p className="text-white/60">ご回答ありがとうございます。<br />当日お会いできることを楽しみにしています！</p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputCls = "w-full px-4 py-3 sm:py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all text-sm sm:text-base";

  return (
    <section id="registration" className="relative py-20 sm:py-28 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d1520] to-[#0a0a12]" />
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium text-amber-400/80 border border-amber-500/20 rounded-full bg-amber-500/5 mb-4">REGISTRATION</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">参加登録</h2>
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto">出欠のご連絡をお願いします。</p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card p-6 sm:p-8 space-y-5"
        >
          {/* 氏名 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1.5">
              氏名 <span className="text-amber-400">*</span>
            </label>
            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="山田 太郎" className={inputCls} />
          </div>

          {/* フリガナ */}
          <div>
            <label htmlFor="furigana" className="block text-sm font-medium text-white/80 mb-1.5">
              フリガナ <span className="text-amber-400">*</span>
            </label>
            <input type="text" id="furigana" name="furigana" required value={formData.furigana} onChange={handleChange} placeholder="ヤマダ タロウ" className={inputCls} />
          </div>

          {/* 出欠 */}
          <div>
            <label htmlFor="attendance" className="block text-sm font-medium text-white/80 mb-1.5">
              出欠 <span className="text-amber-400">*</span>
            </label>
            <select id="attendance" name="attendance" required value={formData.attendance} onChange={handleChange}
              className={`${inputCls} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23999%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center]`}
            >
              <option value="">選択してください</option>
              <option value="attend">参加する 🎉</option>
              <option value="absent">参加しない</option>
              <option value="undecided">未定</option>
            </select>
          </div>

          {/* メールアドレス */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1.5">
              メールアドレス <span className="text-white/30 text-xs">（任意）</span>
            </label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@mail.com" className={inputCls} />
          </div>

          {/* 電話番号 */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-1.5">
              電話番号 <span className="text-white/30 text-xs">（任意）</span>
            </label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="090-1234-5678" className={inputCls} />
          </div>

          {/* ひとこと */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1.5">
              ひとこと <span className="text-white/30 text-xs">（任意）</span>
            </label>
            <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleChange} placeholder="楽しみにしています！" className={`${inputCls} resize-none`} />
          </div>

          {/* Submit */}
          <button type="submit" disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-base sm:text-lg rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                送信中...
              </span>
            ) : "回答を送信する"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
