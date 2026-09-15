<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 開発・デプロイルール
- コードの作成・変更を行った際は、必ず `npm run build` で静的ビルドと型チェックを検証する。
- 検証にパスしたら、都度 git commit および `git push origin main` を行い、本番環境（Vercel / haritaro.jp）へ反映する。
