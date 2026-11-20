"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PageIntro from "@/components/design/PageIntro";
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ShieldCheck, 
  HelpCircle,
  Clock
} from "lucide-react";

const LEGACY_SERVICES_CATEGORY = '終了したサービスについて';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "サイト掲載内容・記事について",
    subject: "",
    message: "",
    botCheck: "", // ハニーポット
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get('topic');
    if (topic === 'legacy-services' || topic === 'premium-reopening' || topic === 'premium-support') {
      const timer = setTimeout(() => setFormData(previous => ({ ...previous,
        category: LEGACY_SERVICES_CATEGORY,
        subject: previous.subject || '終了したサービスに関する問い合わせ',
      })), 0);
      return () => clearTimeout(timer);
    }
    const source = params.get('source');
    if (!source || (source !== '/symptoms' && !/^\/(tsubo|articles|symptoms)\/[a-z0-9-]+$/.test(source))) return;
    const timer = setTimeout(() => setFormData(previous => ({ ...previous,
      subject: previous.subject || '掲載内容・出典の確認：' + source,
      message: previous.message || '対象ページ：https://www.haritaro.jp' + source + '\n\n確認・訂正をお願いしたい箇所：\n\n参照資料（分かる場合）：\n',
    })), 0);
    return () => clearTimeout(timer);
  }, []);

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
          subject: `【はり太郎】[${formData.category}] ${formData.subject}`,
          message: `【お問い合わせ種別】: ${formData.category}\n【お名前】: ${formData.name}\n【返信先メールアドレス】: ${formData.email}\n【件名】: ${formData.subject}\n\n【本文】:\n${formData.message}`,
          from_name: "はり太郎 お問い合わせフォーム",
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
        setErrorMessage("入力した内容はこの画面に残っています。少し時間をおいて「お問い合わせを送信する」をもう一度押してください。");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("入力した内容はこの画面に残っています。インターネット接続を確認してから、もう一度送信してください。");
    }
  };

  return (
    <div className="page-layout page-layout--compact">
      <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">
        {/* パンくず・戻るリンク */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#59615D] dark:text-[#A0B0BC] hover:text-[#1E3D34] dark:hover:text-[#74BA9E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>トップページへ戻る</span>
          </Link>
        </div>

        <PageIntro title="お問い合わせ" description="記事の訂正、サイトの使い方、取材や執筆について連絡できます。掲載内容については、該当するページのURLと文章を添えてください。" art="notes" compact />

        {/* フォームカード */}
        <div className="bg-[#FFFFFF]/95 dark:bg-[#17212A]/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-[#E5DEC9] dark:border-[#2A3B4A] p-4 sm:p-10 shadow-sm transition-colors">
          {status === "success" ? (
            <div className="py-10 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#EBF3EF] dark:bg-[#182823] text-[#1E3D34] dark:text-[#74BA9E] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#232826] dark:text-[#FAF8F5]">
                  お問い合わせを送信しました
                </h3>
                <p className="text-sm sm:text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed max-w-md mx-auto">
                  内容を確認し、入力いただいたメールアドレスに返信します。
                </p>
              </div>
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="px-5 py-2.5 rounded-xl border border-[#E5DEC9] dark:border-[#2A3B4A] text-sm font-bold text-[#404743] dark:text-[#C5D2DB] hover:bg-[#FAF8F5] dark:hover:bg-[#121920] transition-all"
                >
                  別のお問い合わせを送る
                </button>
                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-xl bg-[#1E3D34] dark:bg-[#2B6958] text-white text-sm font-bold hover:bg-[#162E27] dark:hover:bg-[#225345] transition-all shadow-sm"
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
                <div role="alert" className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-start gap-3 text-red-700 dark:text-red-400 text-sm leading-relaxed">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">送信できませんでした</span>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* お名前 */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                    お名前 <span className="text-[#A83629] dark:text-[#E6C387]">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                  name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="例：山田 太郎"
                    className="min-h-12 w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] text-[#232826] dark:text-[#FAF8F5] text-base focus:outline-none focus:border-[#1E3D34] dark:focus:border-[#74BA9E] transition-colors"
                  />
                </div>

                {/* メールアドレス */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                    返信先メールアドレス <span className="text-[#A83629] dark:text-[#E6C387]">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                  name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="例：yamada@example.com"
                    className="min-h-12 w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] text-[#232826] dark:text-[#FAF8F5] text-base focus:outline-none focus:border-[#1E3D34] dark:focus:border-[#74BA9E] transition-colors"
                  />
                </div>
              </div>

              {/* お問い合わせ種別 */}
              <div className="space-y-1.5">
                <label htmlFor="contact-category" className="block text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                  お問い合わせ種別 <span className="text-[#A83629] dark:text-[#E6C387]">*</span>
                </label>
                <select
                  id="contact-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="min-h-12 w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] text-[#232826] dark:text-[#FAF8F5] text-base focus:outline-none focus:border-[#1E3D34] dark:focus:border-[#74BA9E] transition-colors"
                >
                  <option value="サイト掲載内容・記事について">サイト掲載内容・記事について</option>
                  <option value="ご意見・ご要望・誤字等のご指摘">ご意見・ご要望・誤字等のご指摘</option>
                  <option value="取材・執筆・ビジネスのご相談">取材・執筆・ビジネスのご相談</option>
                  <option value="その他">その他</option>
                  <option value={LEGACY_SERVICES_CATEGORY}>{LEGACY_SERVICES_CATEGORY}</option>
                </select>
              </div>

              {/* 件名 */}
              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="block text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                  件名 <span className="text-[#A83629] dark:text-[#E6C387]">*</span>
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="例：掲載内容についてのご質問"
                  className="min-h-12 w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] text-[#232826] dark:text-[#FAF8F5] text-base focus:outline-none focus:border-[#1E3D34] dark:focus:border-[#74BA9E] transition-colors"
                />
              </div>

              {/* 本文 */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-sm font-bold text-[#232826] dark:text-[#FAF8F5]">
                  お問い合わせ内容 <span className="text-[#A83629] dark:text-[#E6C387]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="例：ツボ図鑑の〇〇ページにある△△の説明について"
                  className="min-h-12 w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC0] dark:border-[#2A3B4A] bg-[#FAF8F5] dark:bg-[#121920] text-[#232826] dark:text-[#FAF8F5] text-base focus:outline-none focus:border-[#1E3D34] dark:focus:border-[#74BA9E] transition-colors resize-y leading-relaxed"
                />
              </div>

              {/* 個人情報取り扱い注意 */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121920] border border-[#EBE4D5] dark:border-[#22303D] flex items-start gap-2.5 text-sm text-[#59615D] dark:text-[#A0B0BC] leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-[#1E3D34] dark:text-[#74BA9E] shrink-0 mt-0.5" />
                <p>
                  フォームの送信にはWeb3Formsを利用します。入力した内容は、返信やサイトの改善に使います。
                </p>
              </div>

              {/* 送信ボタン */}
              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="page-primary-action w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === "submitting" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                      <span>送信中...</span>
                    </>
                  ) : (
                    <>
                      <Send aria-hidden="true" className="w-4 h-4" />
                      <span>お問い合わせを送信する</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 補足案内 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#59615D] dark:text-[#A0B0BC]">
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
              このフォームでは、病状の判断や薬の選び方にはお答えできません。体調や治療の相談は、かかりつけの医療機関へお願いします。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
