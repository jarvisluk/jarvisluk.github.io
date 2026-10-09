// Gocus, built from the official site (gocus.pages.dev), the GitHub repository (jarvisluk/Gocus, v0.1.12) and its releases.
// The panel, component library and guidelines are live pages in public/embeds/gocus (see scripts/gocus-demo/);
// the only bitmap is the hero board (scripts/gocus-demo/hero.html). The icon breakdown (public/embeds/gocus/icon) uses the repository's original SVG geometry.
const b=(zh,en)=>({zh,en});
const img=(id,zh,en,kind='diagram')=>({id,caption:b(zh,en),kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,dark:true,...extra});
const EMBED='/embeds/gocus/panel/';

export default {
 tone:{h:40,s:20,accent:'#f2b431',ink:'#f2b431'},
 accent:'#f2b431',surface:'#121212',theme:'dark',hero:'gc-site-hero',heroStyle:'board',
 // The first screen is the working panel itself (Gocus 0.1.12 on a recorded snapshot of its repository); the site's
 // two download buttons sit with the title and description above it.
 heroEmbed:{src:`${EMBED}index.html`,fixed:true,width:342,height:760,title:b('Gocus 可交互面板','Interactive Gocus panel')},
 actions:[
  {href:'https://github.com/jarvisluk/gocus/releases/latest',label:b('下载 macOS 版','Download for macOS'),icon:'download',primary:true},
  {href:'https://github.com/jarvisluk/gocus/releases',label:b('查看 GitHub Releases','View GitHub Releases'),icon:'github'},
 ],
 heroCaption:b('Gocus：左边是官网的一句话介绍和下载入口，右边是面板本身和分支菜单','Gocus: the site’s pitch and download on the left, the panel and its branch menu on the right.'),
 oneLiner:b('一个贴在 AI 编程工具旁边的紧凑 Git 面板：Agent 提交、分支和工作树一眼看清，不用切回完整的 IDE。','A compact Git panel that sits beside AI-native editors, keeping agent commits, branches and worktrees in view without switching to a full IDE.'),
 credit:b('个人项目','Individual project'),
 sections:[
  sec('context',b('Agent 写得越快，越需要看清','Faster agents need a clearer view.'),b('用 Codex、Claude Code 或 Antigravity 写代码时，主界面是对话而不是 IDE。Agent 一会儿提交、一会儿开新的工作树，传统 IDE 的 Git 侧栏跟不上，打开完整的 Git 客户端又会打断节奏。Gocus 是一条贴在编辑器旁边的窄面板，只放最常看的仓库状态：分支轨道和标签、每条提交的增删行数、工作树，以及现在改了哪些文件。','When you code with Codex, Claude Code or Antigravity, the main surface is a conversation, not an IDE. Agents commit and open worktrees constantly; an IDE’s Git sidebar can’t keep up, and a full Git client breaks the flow. Gocus is a narrow panel beside the editor holding only the state you check most: branch rails and tags, lines changed per commit, worktrees and the files changed right now.'),[
  ],{points:[b('改动 Git 之前一律先确认：新建分支、合并、检出','Every Git change is confirmed first: branch, merge, checkout.'),b('已合并的工作树标为可清理，帮 Agent 留下的工作树收尾','Merged worktrees are marked safe to clean, tidying up after agents.'),b('一键回到 VS Code、Cursor、Antigravity、Finder、终端或 Xcode。','One click back to VS Code, Cursor, Antigravity, Finder, Terminal or Xcode.')]}),
  sec('graph',b('让每一次分叉，都读得懂','Every fork, easy to read.'),b('提交图是 Gocus 里最常被看的部分。分叉和汇入的弯度、线和节点之间留出的空隙、线条对齐到半像素，都是对着真实仓库一遍遍调出来的。下面这张图直接用了 app 里的公式，可以拖动试试。','The commit graph is what people look at most in Gocus. How far a fork or a join bends, the gap left around each node and the half-pixel alignment of every line were all adjusted against real repositories, again and again. The graph below uses the app’s own formulas; try dragging it.'),[
   {type:'embed',src:'/embeds/gocus/code/index.html?part=graph',height:900,title:b('Gocus 提交图画线逻辑','Gocus commit graph drawing')},
  ]),
  sec('build',b('从一个面板，到持续发布','From a panel to regular releases.'),b('Gocus 用 Electron、React 和 TypeScript 写成，提供 macOS（Apple 芯片）和 Windows 版本，能从 GitHub Releases 自动更新。2026 年 6 月 19 日发布 0.1.0，一个多月里迭代到 0.1.12。每次发布前跑完整的质量检查：依赖审计、密钥扫描、lint、单元测试、UI 冒烟测试和构建。同一套提交图还做成了 Codex 插件预览版，在 Codex 里直接开冲突处理、提交或清理工作树的会话。','Gocus is built with Electron, React and TypeScript, ships for macOS (Apple silicon) and Windows, and updates itself from GitHub Releases. Version 0.1.0 shipped on 19 June 2026, reaching 0.1.12 a month later. Each release passes a quality gate of dependency audit, secret scan, lint, unit tests, UI smoke tests and build. The same commit graph also ships as a Codex plugin preview that starts conflict-resolution, commit or worktree-cleanup sessions inside Codex.'),[
   {type:'embed',src:'/embeds/gocus/code/index.html?part=repo',height:700,title:b('Gocus 仓库检测','Gocus repository detection')},
 
  ],{points:[b('Electron · React · TypeScript','Electron · React · TypeScript'),b('macOS 与 Windows · GitHub Releases 自动更新','macOS and Windows · auto-update from GitHub Releases'),b('13 个版本：0.1.0 → 0.1.12','13 releases: 0.1.0 → 0.1.12')]}),
  sec('library',b('一套紧凑的组件','A compact component set.'),b('面板里的每个部件都来自同一组 ui-* 原语。下面的组件直接取自 0.1.12 的界面，用的是原版 CSS，每张卡片是一个组件，默认、悬停、聚焦、选中、展开、禁用等状态直接并排或组合在一起；状态样式由原版的 :hover / :focus 规则生成，分段控件和视图切换可以点。','Every part of the panel comes from one set of ui-* primitives. The components below are lifted from the 0.1.12 interface with its original CSS. Each card is one component with its states (default, hover, focus, active, open, disabled) side by side or composed together, generated from the interface’s own :hover and :focus rules; segmented controls and view chips respond to clicks.'),[
   {type:'embed',src:`${EMBED}library.html`,height:1400,title:b('Gocus 组件库','Gocus component library')},
  ]),
  sec('guidelines',b('规则写进代码里','Guidelines enforced in code.'),b('Gocus 应该读起来像一条窄的桌面工具，而不是一张大的内容页。字号、颜色、间距和控件尺寸都收在 CSS token 里，下面的数值从界面实际使用的 token 实时读取；规则来自仓库的 DESIGN.md，由自定义的 Stylelint 规则在每次提交前检查。','Gocus should read like a narrow desktop tool, not a large content page. Type, colour, spacing and control sizes live in CSS tokens; the values below are read live from the tokens the interface uses. The rules come from the repository’s DESIGN.md and a custom Stylelint rule checks them on every change.'),[
   {type:'embed',src:`${EMBED}guidelines.html`,height:1000,title:b('Gocus 设计规范','Gocus design guidelines')},
  ]),
  sec('identity',b('图标：一条主线，一个分支','The icon: one main line, one branch.'),b('项目最早叫 Git Peek，是 2026 年 6 月初的一个侧边原型，6 月 19 日改名为 Gocus。图标直接取自面板的提交图：石墨色底板、淡出的点阵、琥珀色主线上的三个提交，以及从中间分出去的一条蓝色分支。下面按原始 SVG 拆成五层，可以拆开图层、看结构线，或把鼠标放在某一层上单独查看；菜单栏图标是同一图形的单色模板。','The project began in early June 2026 as Git Peek, a sidecar prototype, and became Gocus on 19 June. The icon is taken straight from the panel’s commit graph: a graphite tile, a fading dot grid, three commits on an amber main line and one blue branch leaving the middle. Below, the original SVG is split into its five layers: explode them, show the construction lines, or hover a layer to isolate it. The menu bar icon is a monochrome template of the same mark.'),[
   {type:'embed',src:'/embeds/gocus/icon/index.html',height:1500,title:b('Gocus 图标拆解','Gocus icon breakdown')},
  ]),
 ],
};
