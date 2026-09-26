-- ==============================================================================
-- はり太郎の東洋医学：マイノート（臨床ノート ＆ 配穴ストック）データベース定義
-- 
-- 【セキュリティ＆プライバシー設計】
-- 1. 匿名設計: 患者の実名、電話番号、住所等はテーブルにカラムすら存在しません。
--    カルテ番号（PT-001等）やイニシャルのみを記録します。
-- 2. Row Level Security (RLS): ログインしている本人（auth.uid()）以外のアクセスを
--    データベース層で物理的に100%遮断します。
-- ==============================================================================

-- 1. 臨床ノート（患者症例記録）テーブル
CREATE TABLE IF NOT EXISTS public.patient_notes (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  patient_identifier TEXT NOT NULL, -- カルテ番号やイニシャル（実名は非保持）
  gender TEXT,                      -- "男性" | "女性" | "その他" | "未回答"
  age_group TEXT,                   -- "30代", "50代" など
  visit_date TEXT NOT NULL,         -- YYYY-MM-DD
  chief_complaint TEXT NOT NULL,    -- 主訴・お悩み
  constitution TEXT,               -- 気血水・体質見立て
  syndrome TEXT,                   -- 弁証・病態
  selected_points TEXT[] DEFAULT '{}'::TEXT[], -- 採用ツボ・配穴
  treatment_plan TEXT,             -- 施術方針・手技メモ
  patient_reaction TEXT,           -- 施術後の反応・変化
  next_action TEXT,                -- 養生指導・次回申し送り
  created_at BIGINT NOT NULL,      -- エポックミリ秒
  updated_at BIGINT NOT NULL       -- エポックミリ秒
);

-- インデックス作成（高速検索・ソート用）
CREATE INDEX IF NOT EXISTS idx_patient_notes_user_id ON public.patient_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_patient_notes_updated_at ON public.patient_notes(user_id, updated_at DESC);

-- 2. 配穴・ツボストック（自作配穴・お気に入り）テーブル
CREATE TABLE IF NOT EXISTS public.clinical_memos (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,              -- "pair" | "tsubo" | "diagnosis" | "custom"
  title TEXT NOT NULL,             -- 配穴・ツボ名称
  sub_title TEXT,                  -- 作用・標治
  points TEXT[] DEFAULT '{}'::TEXT[],       -- 構成ツボ一覧
  elements TEXT[] DEFAULT '{}'::TEXT[],     -- 五行 ("木", "火", "土", "金", "水")
  indications TEXT[] DEFAULT '{}'::TEXT[],  -- 適応症
  summary TEXT,                    -- 解説・要約
  mechanism TEXT,                  -- 作用機序
  caution TEXT,                    -- 留意点
  personal_notes TEXT,             -- 施術者の臨床メモ
  created_at BIGINT NOT NULL,      -- エポックミリ秒
  updated_at BIGINT NOT NULL       -- エポックミリ秒
);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_clinical_memos_user_id ON public.clinical_memos(user_id);
CREATE INDEX IF NOT EXISTS idx_clinical_memos_updated_at ON public.clinical_memos(user_id, updated_at DESC);

-- ==============================================================================
-- 3. Row Level Security (RLS) の有効化とポリシー設定
-- 【最重要】これにより、他のユーザーがAPI経由でデータを読み書きすることは絶対にできません。
-- ==============================================================================

-- patient_notes のRLS有効化
ALTER TABLE public.patient_notes ENABLE ROW LEVEL SECURITY;

-- 自身のデータのみ閲覧可能
CREATE POLICY "Users can view own patient notes"
ON public.patient_notes
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 自身のデータのみ挿入可能
CREATE POLICY "Users can insert own patient notes"
ON public.patient_notes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 自身のデータのみ更新可能
CREATE POLICY "Users can update own patient notes"
ON public.patient_notes
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 自身のデータのみ削除可能
CREATE POLICY "Users can delete own patient notes"
ON public.patient_notes
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- clinical_memos のRLS有効化
ALTER TABLE public.clinical_memos ENABLE ROW LEVEL SECURITY;

-- 自身のデータのみ閲覧可能
CREATE POLICY "Users can view own clinical memos"
ON public.clinical_memos
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 自身のデータのみ挿入可能
CREATE POLICY "Users can insert own clinical memos"
ON public.clinical_memos
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 自身のデータのみ更新可能
CREATE POLICY "Users can update own clinical memos"
ON public.clinical_memos
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 自身のデータのみ削除可能
CREATE POLICY "Users can delete own clinical memos"
ON public.clinical_memos
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
