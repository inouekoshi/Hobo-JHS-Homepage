# 保々中学校 新成人同窓会 — 公式サイト

> 2027年1月10日（日）開催予定の「保々中学校 新成人同窓会」告知・お問い合わせ受付サイトです。

**🌐 本番URL**: [https://hobo-jhs-homepage.vercel.app/](https://hobo-jhs-homepage.vercel.app/)

---

## 📋 プロジェクト概要

| 項目 | 内容 |
|---|---|
| イベント名 | 保々中学校 新成人同窓会 |
| 開催日時 | 2027年1月10日（日）18:00 開宴 |
| 会場 | [プラトンホテル四日市](https://www.platon-hotel.co.jp/)（〒510-0087 三重県四日市市西新地7-3） |
| 参加人数 | 卒業生 47名 ＋ 恩師の先生方 4名（出欠の回答は締切済み） |
| 会費 | 10,000円。12月6日（日）までに事前振込（恩師の先生方は無料） |
| 主催・管理 | 井上高志 |

---

## 🛠 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js 16.4 (App Router) / React 19.3 |
| スタイリング | CSS Modules + グローバルCSS |
| アニメーション | Motion（旧 Framer Motion）、Web Animations API |
| フォーム送信 | Formspree |
| アクセス解析 | Vercel Web Analytics（Vercel のダッシュボードの Analytics タブで閲覧数・訪問者数を確認） |
| デプロイ | Vercel |
| 言語 | TypeScript |

---

## 📁 ディレクトリ構成

```
Hobo-JHS-Homepage/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # ルートレイアウト（SEO・フォント・SVGフィルタ）
│   │   ├── page.tsx            # メインページ（全セクション組み合わせ）
│   │   ├── opengraph-image.tsx # リンク共有時のプレビュー画像（OGP）の生成
│   │   ├── icon.tsx            # タブのアイコン（ピンクの紙片に「保」）
│   │   ├── apple-icon.tsx      # iPhoneのホーム画面用アイコン
│   │   └── globals.css         # デザイントークンと共通部品（テープ・カード・ボタン）
│   ├── components/
│   │   ├── OpSplash.tsx        # オープニング（あと◯日の数字を紙片で貼る演出）
│   │   ├── Header.tsx          # ヘッダー（ナビ・ハンバーガーメニュー）
│   │   ├── Hero.tsx            # ヒーローセクション
│   │   ├── CollageLogo.tsx     # 1文字ずつ紙を切り貼りしたタイトルロゴ
│   │   ├── Countdown.tsx       # カウントダウンタイマー＋祝・開催演出
│   │   ├── EventOverview.tsx   # イベント概要（6枚カード）
│   │   ├── TeachersMessage.tsx # 恩師へのメッセージ（便箋風カード）
│   │   ├── Schedule.tsx        # 当日までのスケジュール
│   │   ├── Access.tsx          # アクセス・Google Maps
│   │   ├── ContactForm.tsx     # お問い合わせフォーム（Formspree連携）
│   │   ├── Footer.tsx          # フッター
│   │   ├── Reveal.tsx          # スクロール登場演出
│   │   ├── SvgDefs.tsx         # ちぎれ・破れのSVGフィルタ
│   │   └── ui.tsx              # テープ・チップ・区切りなどの共通部品
│   └── lib/
│       ├── event.ts            # 開催日時・残り日数の計算
│       └── og.tsx              # OGP画像・アイコン共通の部品（フォント読込・破れ縁）
├── public/
│   └── op/countdown-digits.webp # カウントダウン用の数字画像
├── scripts/
│   └── generate-countdown-digits.py # 数字画像の生成スクリプト
├── Document/
│   ├── 要件定義書.md            # 機能要件・コンポーネント設計
│   └── 要求定義書.md            # プロジェクト目的・ユーザー要件
├── .github/workflows/
│   └── keep-supabase-alive.yml # Supabaseの自動停止を防ぐ定期実行
├── .env.local.example          # 環境変数サンプル
└── README.md
```

---

## 🚀 ローカル開発

### 必要環境
- Node.js 20.9以上
- npm

### セットアップ

```bash
# リポジトリのクローン
git clone https://github.com/inouekoshi/Hobo-JHS-Homepage.git
cd Hobo-JHS-Homepage

# 依存パッケージのインストール
npm install

# 環境変数の設定
cp .env.local.example .env.local
# .env.local を編集して NEXT_PUBLIC_FORMSPREE_ID を設定

# 開発サーバー起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認。

### 主なコマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド
npm run start    # 本番サーバー起動
npm run lint     # ESLintチェック
```

---

## ⚙️ 環境変数

`.env.local` ファイルを作成し、以下を設定してください。

| 変数名 | 説明 | 取得方法 |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_ID` | FormspreeのフォームID | [formspree.io](https://formspree.io) でフォーム作成後に取得 |

```env
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id_here
```

> **Vercelにデプロイする場合**: Vercel管理画面の **Settings → Environment Variables** に同じ変数を設定してください。

GitHub Actions の定期実行（Supabaseの自動停止防止）には、リポジトリの **Settings → Secrets and variables → Actions** に `SUPABASE_URL` と `SUPABASE_ANON_KEY` を登録してください。

---

## 🎨 デザイン仕様

- **スタイル**: 切り貼り（コラージュ）／ZINE風。紙の地に、ちぎれたテープとハードシャドウの紙片を重ねます
- **カラーパレット**: ピンク `#ec4b86`・緑 `#179c6b`・レモン `#f4dc3c`・墨 `#161616`・紙 `#f9f8f6`
- **フォント**: Noto Sans JP（本文）/ Bebas Neue（数字・英字見出し）/ Murecho（ロゴ）/ Courier Prime（曜日・単位）
- **アニメーション**: 初回訪問時のオープニング、紙片が傾きながら貼られるスクロール演出、数字が変わるたびに貼り直されるカウントダウン
- **カウントダウンの数字画像**: `scripts/generate-countdown-digits.py` で生成しています（フォントは OFL の Archivo Black）
- **レスポンシブ**: スマホで見る前提で設計。横幅320pxから確認し、ファーストビューでカウントダウンまで見えるようにしています

---

## 📐 ページ構成

| セクション | ID | 内容 |
|---|---|---|
| オープニング | — | 初回訪問時に「開催まであと◯日」を紙片で貼る演出（ロゴを押すと再生） |
| ヒーロー | `#top` | キャッチコピー・日時・会場・カウントダウン・CTA |
| イベント概要 | `#overview` | 日時・会場・会費・参加者・服装・内容の6カードと、会費のお支払いについて |
| 恩師へのメッセージ | `#teachers` | 先生方への招待状（便箋風カード） |
| スケジュール | `#schedule` | 振込締切・返金期限・当日までの流れ（当日のタイムテーブルは Coming Soon） |
| アクセス | `#access` | Google Maps ＋ 交通案内 |
| お問い合わせ | `#contact` | Formspree連携フォーム |

---

## 📦 デプロイ

GitHub の `main` ブランチへのプッシュで **Vercel が自動デプロイ**します。

```bash
git add -A
git commit -m "コミットメッセージ"
git push origin main
```

---

## 📝 今後の予定

- [ ] 当日のタイムテーブルを掲載（確定後）
- [ ] フォトギャラリーページ（イベント後）
- [ ] SNS認証ログイン（NextAuth.js）
- [ ] LINE / X（Twitter）共有ボタン
