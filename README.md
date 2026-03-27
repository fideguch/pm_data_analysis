# pm-data-analysis

> CSVを渡すだけで、GAFA水準の信頼度付き分析レポートを自動生成する Claude Code スキル。

## 特徴

- **自律ルーティング**: 固定フローなし。蓄積された知識とユーザーの入力から何をすべきか自動判断
- **プロジェクト知識の蓄積**: `analysis/` ディレクトリに事業コンテキスト・KPI・過去の分析結果を蓄積。2回目以降はヒアリング不要
- **信頼度スコア**: 全ての示唆に High/Medium/Low の信頼度を付与。Low の場合は追加データを要求
- **バイアス自動検出**: シンプソンのパラドックス、生存者バイアス、平均回帰を結果提示前に自動チェック
- **GAFA品質の出力**: エグゼクティブサマリー、So What / Now What、Limitations セクション

## 使い方

```
データ分析して
```

```
この CSV を分析して
```

```
前回の分析の続き
```

```
A/Bテストの結果を検証して
```

## 5つの Capability

| Capability | 内容 | 自動呼び出し条件 |
|-----------|------|----------------|
| 1. ヒアリング + コンテキスト構築 | 事業理解、KPI定義、メトリクスツリー | context.md が未作成の場合のみ |
| 2. データ取り込み + 品質チェック | CSV/画像/MCP からデータ取得、品質検証 | データが添付された場合 |
| 3. 仮説生成 + 分析方針 | 分析計画、信頼度事前見積もり、ガードレール指標 | 「何を分析すべきか」を探している場合 |
| 4. 分析実行 | Python統計分析、SQL、バイアスチェック、分解プロトコル | データと目的が揃った場合 |
| 5. 信頼度付き示唆 | エグゼクティブサマリー、So What / Now What、Limitations | 分析完了後、常に実行 |
| 6. 再現性 — 保存・検索・再実行 | コード/クエリの自動保存、自然言語検索、差分比較付き再実行 | 分析完了後（自動）、または「前回の分析」「再実行」 |

## 対応データ形式

| 形式 | 方法 |
|------|------|
| CSV / TSV | Read ツールで読み込み + pandas で統計処理 |
| JSON / JSONL | 構造解析 + フラット化 |
| 画像（ダッシュボードスクショ） | マルチモーダル読み込み → 数値抽出 |
| データベース | DuckDB MCP（CSV に SQL）、BigQuery MCP |
| GA4 / Google Ads | 対応 MCP 経由 |
| 手動入力 | 対話でヒアリング → 構造化 |

## GAFA品質の分析要素

| 企業 | 取り入れた要素 |
|------|-------------|
| Google | 4段階分析成熟度（記述→診断→予測→処方）、因果推論デシジョンツリー |
| Meta | AARRRライフサイクル、メトリクスツリー、成長会計、行動コホート |
| Amazon | 意思決定文の強制、テネッツ、インプット/アウトプット指標、分解プロトコル |
| Apple | エグゼクティブサマリー、平易な信頼度表現、チャート選択ガイド |

## 知識蓄積の仕組み

```
analysis/
├── context.md              ← 事業コンテキスト（初回生成、以降自動更新）
├── kpi_definitions.md      ← KPI定義 + メトリクスツリー + AARRR
├── data_catalog.md         ← 利用可能データソース一覧
└── history/                ← 過去の分析レポート（再現コード付き）
    ├── index.md            ← 検索可能なインデックス（自動更新）
    └── YYYY-MM-DD_type.md  ← 各レポート + Reproduction セクション
```

| 回数 | ヒアリング | 使える情報 |
|------|----------|-----------|
| 1回目 | フル（5-10分） | ゼロから |
| 2回目 | 差分のみ（1-2分） | 前回コンテキスト + 過去結果 |
| 3回目以降 | ほぼゼロ | 全蓄積知識を活用 |

## Prerequisites

- Claude Code CLI
- Python 3.11+

```bash
pip install pandas scipy statsmodels matplotlib seaborn
```

### Optional (MCP connections)

- DuckDB MCP — CSV に直接 SQL を実行
- GA4 MCP — Google Analytics 4 データ取得
- BigQuery MCP — 大規模データ分析

## Installation

```bash
# Clone and symlink
git clone git@github.com:fideguch/pm_data_analysis.git ~/pm_data_analysis
ln -s ~/pm_data_analysis ~/.claude/skills/pm-data-analysis

# Verify
ls ~/.claude/skills/pm-data-analysis/SKILL.md
```

Setup time: ~5 min

## When to Use

- CSV/スプレッドシートのデータを統計的に分析したい
- A/Bテストの結果を検証したい（有意差あるのか？）
- KPIの異常値の原因を特定したい
- 仮説を立ててからデータで検証したい

## When NOT to Use

- 広告データの分析 → `pm-ad-analysis` を使用
- ファネル分析の詳細 → `funnel-analysis` を使用
- ダッシュボードの構築 → BIツールを使用

## PM Tool Suite

このスキルは5つのPMツールスイートの一部です:

```
requirements_designer → speckit-bridge → my_pm_tools
                              ↕
                  ▶ pm-data-analysis ◀ ← pm_ad_analysis
```

## License

MIT
