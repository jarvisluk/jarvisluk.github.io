# 项目原始素材来源

重排时优先用 Figma（内容最全），NAS 用来取相机原片、视频、源文件。现有网站图片只作兜底。

## 访问方式

- **Figma**：MCP 登录账号 usrrrrrlu@gmail.com（团队「No. 6」，Starter + View 席位，调用额度很低，集中使用）。
- **NAS（推荐，挂载卷）**：`/Volumes/junrong.synology.me/home/Drive/`
  - 大学项目：`2021-2025大学阶段/`
  - 备用路径（Synology Drive 按需同步，较慢）：`~/Library/CloudStorage/SynologyDrive-DS920/2021-2025大学阶段/`
- 不读取个人证件类文件夹（签证、身份证、证书等），只用作品集和项目文件夹。

## Figma 文件

| 文件 | fileKey | 用途 |
|---|---|---|
| 作品集排版 | `szJ64DtbpmNSwGfEEhCsGe`（node 437-281） | 作品集版面：各项目叙事顺序、原文、透明底渲染、App 界面。FlexBench 已从这里取素材（Project 2）。 |
| 毕设开题汇报 | `tMK75hDRWVCuIDuWqVpgUS` | **PawPals（猫友迹）用 Page 2**（canvas `990:311`），19 张 1920×1080 汇报页。 |

### 毕设开题汇报 · Page 2 画板（按画布从左到右）

| 页 | node | 页 | node |
|---|---|---|---|
| 1 | 990:921 | 11 | 990:937 |
| 2 | 990:1039 | 12 | 990:841 |
| 3 | 990:312 | 19 | 990:953（位于 12 与 13 之间） |
| 4 | 990:423 | 13 | 990:994 |
| 5 | 990:727 | 14 | 990:1020 |
| 6 | 990:929 | 15 | 990:945 |
| 7 | 990:522 | 16 | 990:1073 |
| 8 | 990:1159 | 17 | 990:1122 |
| 9 | 990:1272 | 18 | 990:1057 |
| 10 | 990:1141 | | |

这 19 页已导出为 `个人资料/作品集/PawPals.pdf`（每页 3840×2160 位图），PawPals 页面的版面裁切直接从该 PDF 取，不消耗 Figma 额度（见 `scripts/build_pawpals.py`）。成员分工见 `24-9 毕设/终期汇报最终.png`：合作者张露桐。

内容涵盖：选题由来、选择流浪猫的原因、流浪猫面临的危险、种群特点与领地意识、现有干预流程（以「有良犬」为例）、TNR 为什么有效、结合 TNR 的发现流程、服务流程（前期准备 → 站点部署 → 流浪猫管控 → 日常维护）。

## NAS 项目文件夹

| 项目 | 路径（相对 `Drive/`） |
|---|---|
| FlexBench（移动工坊） | `2021-2025大学阶段/2024-5 移动工坊`（最终JPG、学校场景调研、过程、建模设计图、移动工坊视频.mov、Service Blueprint.ai） |
| SoundBricks（自闭症项目） | `2021-2025大学阶段/2024-4 自闭症项目` |
| Matrix（涌现矩阵） | `2021-2025大学阶段/2024-10 项目四 - 涌现矩阵`；PDF：`个人资料/作品集/Matrix - Emergence Necessity.pdf` |
| PawPals（猫友迹，毕设） | `24-9 毕设`（开题汇报 PPT/PDF、猫友迹最终照片视频、穿戴设备照片、展陈渲染图、问卷、访谈、毕设论文）；`25-12 PawPals Poster`（CHI 2026 海报 final/images/测试视频） |
| Just A 2nd | `2025-12 Just A 2nd` |
| PolyU 课程项目 | `2025-2026 PolyU/`（Sem 1、SD5413、SD5432、SD5438、SD5514） |
| 作品集 PDF | `个人资料/作品集/Lu_Junrong_Portfolio 2.pdf`（高分辨率）、`NEO Portfolio.pdf`、`PawPals.pdf` |

## SF Eats（SD5431 小组项目）

- NAS：`2025-2026 PolyU/Sem 1/Interdisciplinary Studio 5431/`（终期汇报 PDF、Process Book、`SF Video/` 概念视频与 UI 原图）。
- 作品集第 1–10 页复用了终期汇报的第 1、6、19–25、29 页，所以版面直接从终期汇报 PDF（矢量）导出，见 `scripts/build_sf_eats.py`；左上角顺丰 / 理大 logo 用左右背景插值抹去。
- 概念视频 `SF Video.m4v` → `public/assets/video/sf-eats-concept.mp4`；展示图是视频截帧（只有手、手机和餐食，没有人脸）。
- 组员（终期汇报封面）：Yu Xinyan Connie、Tsang Hiu Ching Christy、Lu Junrong Jarvis、Qu Sichen Fiona、Li Xiang Kate、Fan Shuyu Gina。
- 未使用：人物画像页（Julia Lu，含真人照片）、食堂观察页（含路人正脸）。

## Bambu Lab（SD5412 小组项目 "Untitled Fridays"）

- NAS：`2025-2026 PolyU/Sem 1/Advanced Service Design Method/`（`Bambu Lab Project.pdf` 终期汇报、`Bambu Redesign Demo Video/`：门店 4K 实拍 `Bambu Store/`、工作坊素材、小竹表情包）。
- 作品集第 11–18 页复用了终期汇报第 1、3、13、16、20–22、24 页；版面从汇报 PDF（矢量）导出，见 `scripts/build_bambu.py`。
- 展示图是门店实拍片段的中间帧（沙盘、模型墙、耗材墙，没有人脸）。
- 组员（汇报封面）：Tsang Hiu Ching Christy、Liu Yinghong Judy、Zhang Kaiying Kayla、Lu Junrong Jarvis、Zhu Zhengming Ricardo。
- 匿名：共创工作坊照片、访谈照片和工作坊回顾视频（能看到参与者正脸）都没有用；共创页只保留左侧文字部分。

## Matrix — Emergence Necessity（个人项目）

- 版面：NAS `个人资料/作品集/Matrix - Emergence Necessity.pdf`（6 页 1800×900，矢量，黑底），见 `scripts/build_matrix.py`；页面用黑底深色主题（study `theme:'dark'`）。
- 视频：NAS `2021-2025大学阶段/2024-10 项目四 - 涌现矩阵/项目四视频.mp4`；线上 YouTube `t3h_mF45gQY`、Bilibili `BV1iyVYzBE4a`。展示图是视频截帧和第 6 页的单元内部特写。

## Just A 2nd（个人项目，已上架 App Store）

- 线上：App Store id6756837888（2026-01-13 上架，v1.2），商店截图就是 NAS 里 5 张 iPhone 17 Pro Max 模拟器截图；文案以商店描述和作品集第 19 页为准。
- 代码：GitHub `jarvisluk/pitchlab-swift`（SwiftUI 原生 App：纯律音程、难度分级、和弦模式、错题回放、StoreKit Pro、iCloud 同步、中英本地化）；`Just-A-2nd-Web` 是隐私政策与支持页；`pitch-lab` / `music_theory` 是早期网页原型。
- NAS：`2025-12 Just A 2nd/`（iPhone、iPad、macOS 截图）→ `source-assets/just-a-2nd/`。
- 导出：`scripts/build_just_a_2nd.py`（作品集页、圆角界面图、带设备外框的展示图）；首页卡片 `just-a-2nd-cover.webp` 用展示三联图。
- 首页卡片：SF Eats、Bambu Lab 的封面由 `scripts/build_covers.py` 按卡片比例从汇报 PDF 裁出（`sf-eats-cover`、`bambu-concept`）。

## Gocus（个人项目，桌面工具）

- 线上：官网 https://gocus.pages.dev （首屏截图作头图和首页封面）；GitHub `jarvisluk/Gocus`，Releases v0.1.0（2026-06-19）→ v0.1.12（2026-07-22）；最早是 2026-06-03 的 Git Peek 原型。
- 页面尽量不用截图，三块内容都是活页面，放在 `public/embeds/gocus/panel/`：
  - `index.html`：Gocus v0.1.12 的网页打包，接一个只读的演示桥（`scripts/gocus-demo/demo-bridge.js`），数据是 `~/codespace/git-tree-vis` 的录制快照（553 条提交、85 个分支，`scripts/gocus-demo/record.cjs`，只读）。改动 Git 的操作只走到确认对话框。重建：`scripts/gocus-demo/build.sh <Gocus 检出目录> <demo-data.json>`。
  - `library.html`（组件库）、`guidelines.html`（设计规范）：`scripts/gocus-demo/library.mjs` 从运行中的面板提取真实组件 HTML，配原版 CSS；规范页的数值从 CSS token 实时读取，规则来自仓库 DESIGN.md。页面会把高度发给作品集，iframe 自动适配。
- 原始矢量：仓库 `assets/app-icon.svg`、`assets/icon-concepts/icon-style-board.svg`（`scripts/build_gocus.py` 复制）。

## OpenSwim Pro 2（韶音 Shokz 配套 App）

- Figma：`Jf4N724rkfcY67QNLaTnC7`，Section 12（node `1224:62124`），7 张 1920×1280 展示页。需要用 junrong.lu@connect.polyu.hk 账号访问（Shokz 组织访客）；usrrrrrlu 账号无权限。MCP 额度很低，这次只用了一次 get_metadata。
- 导出：整个 Section 从 Figma 导出为 SVG（约 100MB，内嵌位图）。每张画板通过改写 SVG viewBox，用 headless Chrome 以 2 倍渲染，得到 `source-assets/shokz/board-1..7.png`（3840×2560）。整张 2 倍渲染会超出 Chrome 的尺寸上限，下半部分会变成空白。
- 内部代号不能出现在网站上：board-1 首页标题已改成 "OpenSwim Pro 2"，board-5 导入说明改成 "connect them to your computer"（用 Noto Sans SC 重绘，已直接写回 PNG）。重新从 SVG 渲染时要再处理一次。
- 网页素材：`scripts/build_shokz.py`（`sk-*` 展示页和首页封面 `shokz-cover.webp`）。
- 配网流程优化（音频导入）：交互稿 SVG 由用户从 Figma 导出（`7.2.3.1 WiFi连接.svg` 为优化前，`7.2 音频导入.svg` 为终版，原文件在桌面，没有拷进仓库，因为稿子里有内部文档链接和开发标注）。手机画板 393×852，坐标从 SVG 里的 rect 读出，以 3 倍渲染后抹掉红色标注线，结果存在 `source-assets/shokz/wifi/`。网站用 `public/embeds/shokz/wifi/` 重新排版的前后对比流程图，连线和标注都在页面里重画。
