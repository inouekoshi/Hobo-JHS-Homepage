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
| 会費 | 10,000円（恩師の先生方は無料） |
| 主催・管理 | 井上高志 |

---

## 🛠 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router) |
| スタイリング | Tailwind CSS v4 |
| アニメーション | Framer Motion |
| フォーム送信 | Formspree |
| デプロイ | Vercel |
| 言語 | TypeScript |

---

## 📁 ディレクトリ構成

```
Hobo-JHS-Homepage/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # ルートレイアウト（SEO・フォント設定）
│   │   ├── page.tsx            # メインページ（全セクション組み合わせ）
│   │   └── globals.css         # グローバルスタイル
│   └── components/
│       ├── Header.tsx          # ヘッダー（ナビ・ハンバーガーメニュー）
│       ├── Hero.tsx            # ヒーローセクション
│       ├── Countdown.tsx       # カウントダウンタイマー＋祝・開催演出
│       ├── EventOverview.tsx   # イベント概要（6枚カード）
│       ├── TeachersMessage.tsx # 恩師へのメッセージ（招待状デザイン）
│       ├── Schedule.tsx        # 当日スケジュール
│       ├── Access.tsx          # アクセス・Google Maps
│       ├── ContactForm.tsx     # お問い合わせフォーム（Formspree連携）
│       └── Footer.tsx          # フッター（SNSリンク）
├── public/
│   └── ogp.png                 # OGP画像（SNSシェア用）
├── Document/
│   ├── 要件定義書.md            # 機能要件・コンポーネント設計
│   └── 要求定義書.md            # プロジェクト目的・ユーザー要件
├── .env.local.example          # 環境変数サンプル
└── README.md
```

---

## 🚀 ローカル開発

### 必要環境
- Node.js 18以上
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

---

## 🎨 デザイン仕様

- **カラーパレット**: ダークネイビー（`#050510`〜`#0a1628`）× ゴールド（`#f59e0b`）
- **フォント**: Noto Sans JP（日本語） / Inter（英数字）
- **スタイル**: Glassmorphism（ガラス質カード）
- **アニメーション**: Framer Motion（スクロール連動フェードイン・フリップカウントダウン・招待状展開）
- **レスポンシブ**: モバイルファースト（iPhoneでの閲覧を最優先）

---

## 📐 ページ構成

| セクション | ID | 内容 |
|---|---|---|
| ヒーロー | `#hero` | キャッチコピー・バッジ・カウントダウン・CTA |
| イベント概要 | `#overview` | 日時・会場・会費・対象・服装・内容の6カード |
| 恩師へのメッセージ | `#teachers` | 先生方への招待状（プレミアムデザイン） |
| スケジュール | `#schedule` | 当日タイムライン（Coming Soon） |
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

- [ ] 当日スケジュールの詳細更新（タイムライン確定後）
- [ ] フォトギャラリーページ（イベント後）
- [ ] SNS認証ログイン（NextAuth.js）
- [ ] LINE / X（Twitter）共有ボタン

---

## 📞 連絡先

- **LINE**: [https://line.me/ti/p/_eOAwVUtl4](https://line.me/ti/p/_eOAwVUtl4)
- **Instagram**: [@i_noueeeee](https://www.instagram.com/i_noueeeee)
