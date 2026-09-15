import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, category, subject, message, botCheck } = body;

    // スパム対策（ハニーポット）
    if (botCheck) {
      return NextResponse.json({ success: true, message: "送信完了" }, { status: 200 });
    }

    // 入力バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "必須項目（お名前、メールアドレス、お問い合わせ内容）を入力してください。" },
        { status: 400 }
      );
    }

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY || "530b5503-9c8a-440f-a96d-affe827029ba";

    // Web3Forms APIへのリクエスト（サーバーサイドから送信するため、訪問者には宛先メールアドレスが一切見えません）
    if (accessKey) {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          subject: `【はり太郎の東洋医学】[${category || "お問い合わせ"}] ${subject || "無題"}`,
          message: `【お問い合わせ種別】: ${category || "未指定"}\n【お名前】: ${name}\n【返信先メールアドレス】: ${email}\n【件名】: ${subject || "無題"}\n\n【本文】:\n${message}`,
          from_name: "はり太郎の東洋医学 お問い合わせフォーム",
        }),
      });

      const result = await response.json();

      if (result.success) {
        return NextResponse.json({ success: true, message: "お問い合わせを送信しました。" }, { status: 200 });
      } else {
        return NextResponse.json(
          { success: false, error: result.message || "送信に失敗しました。" },
          { status: 500 }
        );
      }
    } else {
      // accessKey がまだ設定されていない場合の安全なフォールバック
      return NextResponse.json(
        { 
          success: false, 
          error: "現在お問い合わせシステムの初期設定中です。WEB3FORMS_ACCESS_KEYの設定をお待ちください。" 
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "サーバー内部でエラーが発生しました。時間をおいて再試行してください。" },
      { status: 500 }
    );
  }
}
