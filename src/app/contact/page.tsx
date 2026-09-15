"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ShieldCheck, 
  HelpCircle,
  Clock,
  Sparkles
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "サイト掲載内容・記事について",
    subject: "",
    message: "",
    botCheck: "", // ハニーポット
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "530b5503-9c8a-440f-a96d-affe827029ba",
          name: formData.name,
          email: formData.email,
          subject: `【はり太郎の東洋医学】[${formData.category}] ${formData.subject}`,
          message: `【お問い合わせ種別】: ${formData.category}\n【お名前】: ${formData.name}\n【返信先メールアドレス】: ${formData.email}\n【件名】: ${formData.subject}\n\n【本文】:\n${formData.message}`,
          from_name: "はり太郎の東洋医学 お問い合わせフォーム",
          botcheck: formData.botCheck,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          category: "サイト掲載内容・記事について",
          subject: "",
          message: "",
          botCheck: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "送信に失敗しました。時間をおいて再試行してください。");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("通信エラーが発生しました。ネットワーク環境をご確認の上、再度お試しください。");
    }
  };

  return (
    <div className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* パンくず・戻るリンク */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>トップページへ戻る</span>
          </Link>
        </div>

        {/* ヘッダー */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#83BEA8] text-xs font-bold tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5] tracking-tight">
            お問い合わせ
          </h1>
          <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-xl mx-auto">
            当サイトへのご質問、掲載内容・文献考証に関するご意見、臨床推論シミュレーターへのご要望、執筆・取材のご依頼など、以下のフォームよりお気軽にお寄せください。
          </p>
        </div>

        {/* フォームカード */}
        <div className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-6 sm:p-10 shadow-sm transition-colors">
          {status === "success" ? (
            <div className="py-10 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                  送信が完了いたしました
                </h3>
                <p className="text-xs sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-md mx-auto">
                  お問い合わせいただき誠にありがとうございます。内容を確認のうえ、ご入力いただいたメールアドレス宛に折り返しご連絡いたします。
                </p>
              </div>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="px-5 py-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] text-xs font-bold text-[#404743] dark:text-[#C5D2DB] hover:bg-[#FAF8F5] dark:hover:bg-[#121920] transition-all"
                >
                  別のお問い合わせを送る
                </button>
                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-white text-xs font-bold hover:bg-[#162E27] dark:hover:bg-[#225345] transition-all shadow-sm"
                >
                  トップページへ戻る
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* スパム対策用（非表示ハニーポット） */}
              <input
                type="text"
                name="botCheck"
                value={formData.botCheck}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* エラー表示 */}
              {status === "error" && (
                <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-start gap-3 text-red-700 dark:text-red-400 text-xs leading-relaxed">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">送信エラー</span>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* お名前 */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
                    お名前 <span className="text-[#A83629] dark:text-[#E6C387]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="例：山田 太郎"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] text-[#232826] dark:text-[#FAF8F5] text-xs focus:outline-none focus:border-[#1E3D34] dark:focus:border-[#74BA9E] transition-colors"
                  />
                </div>

                {/* メールアドレス */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
                    返信先メールアドレス <span className="text-[#A83629] dark:text-[#E6C387]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="例：yamada@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] text-[#232826] dark:text-[#FAF8F5] text-xs focus:outline-none focus:border-[#1E3D34] dark:focus:border-[#74BA9E] transition-colors"
                  />
                </div>
              </div>

              {/* お問い合わせ種別 */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
                  お問い合わせ種別 <span className="text-[#A83629] dark:text-[#E6C387]">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] text-[#232826] dark:text-[#FAF8F5] text-xs focus:outline-none focus:border-[#1E3D34] dark:focus:border-[#74BA9E] transition-colors"
                >
                  <option value="サイト掲載内容・記事について">サイト掲載内容・記事について</option>
                  <option value="ご意見・ご要望・誤字等のご指摘">ご意見・ご要望・誤字等のご指摘</option>
                  <option value="取材・執筆・ビジネスのご相談">取材・執筆・ビジネスのご相談</option>
                  <option value="その他">その他</option>
                </select>
              </div>

              {/* 件名 */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
                  件名 <span className="text-[#A83629] dark:text-[#E6C387]">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="例：掲載内容についてのご質問"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] text-[#232826] dark:text-[#FAF8F5] text-xs focus:outline-none focus:border-[#1E3D34] dark:focus:border-[#74BA9E] transition-colors"
                />
              </div>

              {/* 本文 */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#232826] dark:text-[#FAF8F5]">
                  お問い合わせ内容 <span className="text-[#A83629] dark:text-[#E6C387]">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="お問い合わせ内容を具体的にご記入ください。"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] text-[#232826] dark:text-[#FAF8F5] text-xs focus:outline-none focus:border-[#1E3D34] dark:focus:border-[#74BA9E] transition-colors resize-y leading-relaxed"
                />
              </div>

              {/* 個人情報取り扱い注意 */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] flex items-start gap-2.5 text-[11px] text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                <p>
                  ご入力いただいたメールアドレスおよび個人情報は、お問い合わせへの回答・連絡の目的にのみ使用し、第三者への開示・提供は行いません。
                </p>
              </div>

              {/* 送信ボタン */}
              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-3.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] hover:bg-[#162E27] dark:hover:bg-[#225345] text-[#FAF8F5] font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {status === "submitting" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>送信中...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#E6C387]" />
                      <span>お問い合わせを送信する</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 補足案内 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#59615D] dark:text-[#A0B0BC]">
          <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#1E3D34] dark:text-[#74BA9E] font-bold">
              <Clock className="w-4 h-4" />
              <span>返信までの目安</span>
            </div>
            <p className="leading-relaxed">
              通常、2〜3営業日以内にご入力いただいたメールアドレス宛に回答を差し上げております。内容によってはお時間をいただく場合もございます。
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#17212A] border border-[#E5DEC9] dark:border-[#2A3B4A] space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#B86924] dark:text-[#E6C387] font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>健康相談について</span>
            </div>
            <p className="leading-relaxed">
              個別の病状に関する医療相談・投薬判断については、医師法・医療法に基づき直接お答えいたしかねる場合があります。かかりつけの医療機関への受診をおすすめいたします。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
