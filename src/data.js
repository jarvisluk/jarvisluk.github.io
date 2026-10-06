const bi = (zh, en) => ({ zh, en });
// Home timeline, oldest first, with the (approximate) year each project was made.
export const timeline = [
 { id: 'matrix', year: 2023 }, { id: 'flexbench', year: 2024 }, { id: 'soundbricks', year: 2024 },
 { id: 'pawpals', year: 2025 }, { id: 'sf-eats', year: 2025 }, { id: 'just-a-2nd', year: 2025 },
 { id: 'gocus', year: 2025 }, { id: 'bambu-lab', year: 2025 }, { id: 'shokz', year: 2026 },
];
export const categories = [
 { id: 'all', label: bi('全部', 'All') },
 { id: 'service', label: bi('服务与系统', 'Service & systems') },
 { id: 'digital', label: bi('数字体验', 'Digital experience') },
 { id: 'physical', label: bi('实体与交互', 'Objects & interaction') },
];
export const projects = [
 {
  id: 'soundbricks', name: 'SoundBricks', cover: 'soundbricks', categories: ['physical', 'digital'], color: '#dedfd3', pages: [20,27],
  subtitle: bi('让声音，成为连接的积木', 'Play, listen, connect.'),
  type: bi('交互玩具 · 数字产品', 'Interactive toy · Digital product'),
  intro: bi('为自闭症谱系儿童探索一种声音与搭建相结合的游戏体验。SoundBricks 将实体积木、声音反馈和配套应用连接起来，让互动发生在双手之间。', 'An exploration of sound and construction play for children on the autism spectrum. SoundBricks connects physical building blocks, audio feedback and a companion app, bringing interaction into the hands.'),
  brief: bi('从儿童的重复行为、感官体验与日常游戏出发，通过实地调研和教师访谈，寻找声音交互的设计机会。', 'Field research and teacher interviews explore design opportunities around repetitive behaviours, sensory experiences and everyday play.'),
  approach: bi('以刺激—刺激配对（SSP）为设计探索起点，将搭建动作与声音反馈结合，并通过电路、结构和应用原型进行迭代。', 'The concept draws on stimulus–stimulus pairing (SSP), connecting building actions with audio feedback through electronics, structural prototypes and a companion app.'),
  output: bi('可交互积木原型、配套应用设计与两轮测试记录。', 'An interactive brick prototype, companion app design and documentation of two test rounds.'),
  chapters: [ [20,bi('项目概览','Overview')], [21,bi('研究与洞察','Research & insights')], [23,bi('原型与应用','Prototype & app')], [26,bi('测试与呈现','Testing & presentation')] ],
 },
 {
  id:'pawpals',name:'PawPals',cover:'pawpals',categories:['service','physical','digital'],color:'#f2eabd',pages:[42,60],
  subtitle:bi('让城市里的善意，彼此连接','A kinder city, together.'),
  type:bi('服务系统 · 物联网 · 毕业设计','Service system · IoT · Graduation project'),
  intro:bi('猫友迹是一套面向流浪猫管理的服务系统。通过定位穿戴设备、物联网站点与多端应用，把社区协作与持续照护连接起来，为 TNR 行动提供系统支持。','PawPals is a service system for community cat care. Wearable tracking devices, IoT stations and a multi-platform app connect community participation with ongoing care and support for TNR programmes.'),
  brief:bi('传统的人工观察和零散记录难以形成持续协作。项目从流浪猫干预流程与利益相关者关系出发，探索更连贯的照护方式。','Fragmented observations and records make sustained collaboration difficult. The project maps existing intervention processes and stakeholders to explore a more connected care system.'),
  approach:bi('整合多模 GNSS 定位、穿戴式设备、站点与任务激励机制，结合用户旅程、服务蓝图和原型测试推进系统设计。','The system brings together multi-mode GNSS tracking, wearables, care stations and task incentives, developed through journey mapping, service blueprints and prototype testing.'),
  output:bi('服务蓝图、多端界面、定位硬件原型、站点设计与毕业展陈。','Service blueprints, multi-platform interfaces, tracking hardware prototypes, station design and a graduation exhibition.'),
  chapters:[[42,bi('项目概览','Overview')],[44,bi('问题与服务蓝图','Context & service blueprint')],[48,bi('系统与用户体验','System & user experience')],[52,bi('硬件原型','Hardware prototyping')],[57,bi('站点与最终展陈','Stations & exhibition')]],
 },
 {
  id:'sf-eats',name:'SF Eats',cover:'sf-eats-cover',categories:['service','digital'],color:'#1f1a16',pages:[1,10],
  subtitle:bi('让好好吃饭，成为日常','Better meals. Better everyday.'),
  type:bi('服务设计 · 健康饮食 · 2025','Service design · Healthy eating · 2025'),
  intro:bi('围绕大学生的校园饮食体验，探索更便捷、更个性化的点餐服务。将社区、团体订单、AI 饮食计划与预订餐食整合为一个连续的体验。','A campus dining concept exploring convenient, personalised food ordering for university students. Community, group orders, AI diet plans and pre-ordered meals come together in one connected experience.'),
  brief:bi('针对高峰期等待、就餐拥挤及健康饮食习惯的维持难题，重新思考校园里的食物服务生态。','The project rethinks the campus food ecosystem around busy-hour waiting, overcrowding and the challenge of maintaining healthy eating habits.'),
  approach:bi('将团体点餐、主题活动、个性化饮食计划和连续打卡结合，并探索与顺丰无人车配送衔接的服务流程。','Group ordering, themed events, personalised plans and streaks are combined with a proposed ordering journey supported by SF Express unmanned delivery vehicles.'),
  output:bi('移动端服务概念、点餐流程、社区机制与松鼠吉祥物视觉设计。','A mobile service concept, ordering journey, community mechanics and a squirrel mascot identity.'),
  chapters:[[1,bi('背景与目标','Context & goals')],[3,bi('服务与品牌','Service & identity')],[5,bi('社区与团体点餐','Community & group orders')],[7,bi('饮食计划与流程','Diet plans & ordering')]],
 },
 {
  id:'flexbench',name:'FlexBench',cover:'flexbench',categories:['service','physical'],color:'#ded7cb',pages:[28,35],
  subtitle:bi('让工作坊，跟着创作发生','A workshop, wherever you make.'),
  type:bi('模块化产品 · 服务设计','Modular product · Service design'),
  intro:bi('为设计学生构想的移动工作坊系统。将可组装的工作台、工具收纳和预约借用服务结合，使制作空间更灵活地适应不同的项目需求。','A mobile workshop system for design students. Modular workbenches, tool storage and a booking service make fabrication spaces adaptable to different projects.'),
  brief:bi('学生的制作需求分散在不同空间与项目中。工作坊位置、设备管理和工具使用流程，都影响着从想法到实物的过程。','Making happens across different spaces and projects. Workshop locations, equipment management and tool access all shape the path from an idea to a physical outcome.'),
  approach:bi('通过访谈、工作流与空间分析梳理需求，构建服务蓝图，再以模块化结构和工具组织方案落实到实体工作台。','Interviews, workflow analysis and spatial research inform a service blueprint, translated into a physical workbench through modular structures and tool organisation.'),
  output:bi('移动工作台实物、模块组合方案、工具收纳设计与完整的预约借用服务流程。','A physical mobile workbench, modular configurations, tool storage and a proposed booking-to-return service journey.'),
  chapters:[[28,bi('项目概览','Overview')],[29,bi('研究与场景','Research & context')],[32,bi('服务与模块设计','Service & modular design')],[34,bi('实物与使用流程','Prototype & use journey')]],
 },
 {
  id:'bambu-lab',name:'Bambu Lab',cover:'bambu-concept',categories:['service','digital'],color:'#dce7cd',pages:[11,18],
  subtitle:bi('把第一次好奇，变成第一次创造','From curiosity to making.'),
  type:bi('零售体验 · 服务设计 · 2025','Retail experience · Service design · 2025'),
  intro:bi('面向 Bambu Lab 首家旗舰店的顾客体验设计。连接店内陈列、探索动线与小程序，让初次到访者逐步走近 3D 打印与创作。','A customer experience concept for Bambu Lab’s first flagship store. Physical displays, visitor journeys and a mini program help first-time visitors explore 3D printing and making.'),
  brief:bi('如何让展品不仅激发好奇，也能帮助第一次到店的顾客理解技术、找到指导，并迈出创作的第一步？','How can displays do more than spark curiosity—helping first-time visitors understand the technology, find guidance and take a first step towards making?'),
  approach:bi('通过共创工作坊重组陈列、引导与体验区，设计新的顾客动线；用 AR 导览、AI 助手与预约功能连接线上线下体验。','Co-design workshops inform displays, guidance, sandbox areas and a new customer journey. AR guidance, an AI assistant and booking features connect physical and digital experiences.'),
  output:bi('门店布局与顾客旅程方案、小程序界面、工作坊与打印服务预约流程。','A store layout and visitor journey proposal, mini program interfaces, workshop booking and 3D printing service reservation flows.'),
  chapters:[[11,bi('项目目标','Project goals')],[13,bi('共创与动线','Co-design & visitor journey')],[15,bi('数字服务体验','Digital service experience')]],
 },
 {
  id:'matrix',name:'Matrix',cover:'matrix',categories:['physical'],color:'#121b2a',pages:[36,41],
  subtitle:bi('简单的单元，涌现复杂的可能','Simple parts. Emergent possibilities.'),
  type:bi('互动装置 · 结构探索','Interactive installation · Structural exploration'),
  intro:bi('Matrix — Emergence Necessity 探索结构、交互与涌现之间的关系。以三角形模块构成可扩展的矩阵，让局部运动在整体中形成新的变化。','Matrix — Emergence Necessity explores the relationship between structure, interaction and emergence. Triangular modules form an expandable matrix where local movements create changing patterns across the whole.'),
  brief:bi('当简单单元通过特定规则连接，它们是否能呈现超越单个部件的行为与感知体验？','How can simple components, connected through a set of rules, produce behaviours and experiences beyond any single part?'),
  approach:bi('围绕矩阵与涌现概念进行结构实验，以三角模块、节点和张紧线构成装置，并探索接近与移动触发的交互。','Structural experiments around matrices and emergence lead to triangular modules, nodes and tensioned lines, with interaction responding to proximity and movement.'),
  output:bi('模块化互动装置、控制面板、结构细节与制作过程记录。','A modular interactive installation, control panel, structural details and documentation of the making process.'),
  chapters:[[36,bi('项目概念','Concept')],[37,bi('矩阵与涌现','Matrix & emergence')],[39,bi('结构与控制','Structure & control')],[41,bi('最终呈现','Final presentation')]],
 },
 {
  id:'just-a-2nd',name:'Just A 2nd',cover:'just-a-2nd-cover',categories:['digital'],color:'#f1e0cc',pages:[19,19],
  subtitle:bi('给耳朵，一点点进步的时间','Sharpen your ears in seconds.'),
  type:bi('移动应用 · 音乐学习','Mobile app · Music learning'),
  intro:bi('一个口袋里的听音训练工具。通过短小的音程练习、每日目标与学习反馈，让音乐听辨练习融入日常。','A pocket-sized ear-training tool. Short interval exercises, daily goals and learning feedback bring listening practice into everyday life.'),
  brief:bi('如何降低乐理练习的枯燥感，让学习乐器或希望理解音乐的人，更容易坚持听音训练？','How can ear training feel less repetitive and become easier to sustain for people learning an instrument or exploring the music they love?'),
  approach:bi('将练习拆成简短的听辨任务，配合目标、连续练习记录和错误回顾。','Focused listening tasks are paired with goals, daily streaks and opportunities to learn from mistakes.'),
  output:bi('听音训练应用界面，涵盖目标、音程练习与复习反馈。','App interfaces covering goals, interval practice and review feedback.'),
  chapters:[[19,bi('应用体验','App experience')]],
 },
 {
  id:'gocus',name:'Gocus',cover:'gocus-cover',categories:['digital'],color:'#121212',pages:[],
  subtitle:bi('让 Git 历史，留在视线里','Git history, beside your flow.'),
  type:bi('桌面工具 · AI 编程','Desktop tool · AI-native coding'),
  intro:bi('一个贴在编辑器旁边的紧凑 Git 面板，为 Codex、Claude Code、Antigravity 这类 AI 编程工具而做。','A compact Git panel that floats beside the editor, made for AI-native coding tools such as Codex, Claude Code and Antigravity.'),
  brief:bi('当 Agent 提交和开工作树的速度远快于人，怎样在不离开编程会话的情况下，看清仓库正在发生什么？','When agents commit and open worktrees faster than people do, how can you keep track of a repository without leaving the coding session?'),
  approach:bi('把高频的仓库状态压进一条窄面板：分支轨道、提交、工作树和当前改动，Git 操作都先确认。','Fold the high-frequency repository state into one narrow panel: branch rails, commits, worktrees and current changes, with every Git action confirmed first.'),
  output:bi('macOS 与 Windows 桌面应用、官网，以及 Codex 插件预览版。','Desktop app for macOS and Windows, an official site and a Codex plugin preview.'),
  chapters:[],
 },
 {
  id:'shokz',name:'OpenSwim Pro 2',cover:'shokz-cover',categories:['digital'],color:'#e9f0f5',pages:[],
  subtitle:bi('让耳机里的音乐，陪你游完每一程','Music and training, in the water.'),
  type:bi('App 体验设计 · 运动耳机','App experience design · Sports headphones'),
  intro:bi('为韶音 OpenSwim Pro 2 游泳耳机设计的配套 App，连接本地音乐管理、游泳训练和运动数据。','The companion app for the Shokz OpenSwim Pro 2 swimming headphones, bringing together on-board music, swim training and workout data.'),
  brief:bi('耳机能脱离手机播放音乐、记录游泳数据，App 怎样让导入音乐、设置训练和回看数据都足够简单？','When headphones play music and track swims without a phone, how can the app keep importing music, setting up training and reviewing data simple?'),
  approach:bi('把需要手机的事都放在下水前完成，水里只靠耳机；最容易失败的配网流程按条件前置、选择代替输入、按原因处理错误重新设计。','Everything that needs a phone happens before the swim, and the water belongs to the headphones. The failure-prone Wi-Fi setup was redesigned: requirements first, choosing instead of typing, errors handled by cause.'),
  output:bi('配套 App 界面设计，以及音频导入配网流程的交互优化。','Companion app interfaces and a reworked interaction flow for the Wi-Fi setup behind audio import.'),
  chapters:[],
 },
];
export const copy = {
 name:bi('陆俊荣','Jarvis Luk'),work:bi('项目','Work'),
 intro:bi('从真实情境出发，连接人与物、数字与实体。让设计成为可以被体验、使用与持续生长的解决方案。','Start with real contexts. Connect people, objects and systems. Turn possibilities into experiences that can be lived, used and built upon.'),
 explore:bi('探索我的作品','Explore my work'),now:bi('现在','Now'),drag:bi('拖动画布浏览','Drag to explore'),selected:bi('精选','Selected'),works:bi('作品','work'),
 closer:bi('让项目，继续讲述','Let the work speak.'),top:bi('回到顶部','Back to top'),
 back:bi('返回全部项目','All projects'),challenge:bi('设计问题','The question'),approach:bi('设计路径','The approach'),outcome:bi('项目产出','The output'),
 documentation:bi('过程与细节','Process & details'),sourceNote:bi('原始项目图 · 点击放大查看','Original project documentation · Select an image to enlarge'),
 next:bi('下一个项目','Next project'),close:bi('关闭大图','Close image'),previous:bi('上一页','Previous page'),nextPage:bi('下一页','Next page'),
 notfound:bi('未找到这个项目','Project not found'),
 lab:bi('小尝试','Lab'),labLabel:bi('作品集之外','Beyond the portfolio'),
 labTitle:bi('小项目与小尝试，','Small projects and experiments,'),labItalic:bi('都放在 GitHub','kept on GitHub.'),
 labText:bi('工具、插件、Agent Skills 和一些顺手做的实验。不一定完整，但都在持续生长。','Tools, plugins, agent skills and quick experiments. Not always finished, but always growing.'),
 labLink:bi('前往 GitHub','Visit GitHub'),labAll:bi('查看全部仓库','All repositories'),demo:bi('在线试用','Live demo'),contributions:bi('过去一年','in the last year'),contributionUnit:bi('次贡献','contributions'),less:bi('少','Less'),more:bi('多','More'),
};
const gh = repo => `https://github.com/jarvisluk/${repo}`;
// Side projects shown as cards in the Lab section; repos in the same series share one card.
export const labProjects = [
 {
  id:'codex-pets', series:bi('Codex 桌宠系列','Codex pets'), icons:['codex'], tags:['Codex','Sprite'],
  media:[{src:'remilia-pet',alt:bi('蕾米桌宠的待机动画','Remilia pet idle animation')},{src:'squid-pet',alt:bi('像素鱿鱼桌宠的待机动画','Pixel squid pet idle animation'),pixel:true}],
  items:[
   {name:'Remilia Codex Pet',repo:gh('remilia-codex-pet'),stars:12,text:bi('以《绝区零》周边里的蕾米为原型，平滑、非像素化的 Codex 自定义桌宠。','A smooth, non-pixelated Codex pet based on Remilia from Zenless Zone Zero merchandise.')},
   {name:'Splatoon Squid Codex Pet',repo:gh('splatoon-squid-codex-pet'),text:bi('黄色像素风鱿鱼桌宠，带完整动画和 16 个朝向。','A yellow pixel-art squid with complete animations and 16 look directions.')},
  ],
 },
 {
  id:'death-stranding', series:bi('死亡搁浅道具生成器','Death Stranding prop generators'), tags:['Web','SVG'],
  media:[{src:'do-not-tamper',alt:bi('“请勿篡改”贴纸生成器：贴纸预览和参数面板','Do Not Tamper generator: sticker preview and control panel'),cover:true},{src:'damage-sensor-tape',alt:bi('损伤感应胶带生成器：黄色胶带预览和参数面板','Damage Sensor Tape generator: yellow tape preview and control panel'),cover:true}],
  items:[
   {name:'Do Not Tamper',repo:gh('Do-Not-Temper'),demo:'https://do-not-tamper.pages.dev/',text:bi('“请勿篡改”贴纸生成器：调整标题、编号、追踪码、强调色和全息渐变，导出 PNG / SVG。','A “Do Not Tamper” sticker generator: tweak title, serial, tracking codes, accent and holographic gradient, then export PNG / SVG.')},
   {name:'Damage Sensor Tape',repo:gh('damage-sensor-tape'),demo:'https://damage-sensor-tape.pages.dev/',stars:6,text:bi('损伤感应胶带生成器：实时预览，含 PDF417 条码，导出 PNG / SVG / PDF。','A damage sensor tape generator with live preview and a PDF417 barcode, exporting PNG / SVG / PDF.')},
  ],
 },
 {
  id:'easyeda', series:bi('Agent Skill','Agent Skill'), icons:['easyeda'], tags:['EasyEDA Pro','PCB'],
  items:[
   {name:'EasyEDA PCB Design',repo:gh('easyeda-pcb-design'),text:bi('让 Agent 在 EasyEDA Pro 里创建、修改和审查原理图与 PCB。按需加载对应流程，覆盖阻抗控制、高速、射频、BGA/HDI 与制造审查。','Lets an agent create, modify and review schematics and PCBs in EasyEDA Pro, loading only the workflows it needs — from controlled impedance and high-speed to RF, BGA/HDI and manufacturing review.')},
  ],
 },
 {
  id:'fixes', series:bi('技术修复','Fixes & workarounds'), icons:['steamdeck','codex'], tags:['Shell','Steam Deck','macOS'],
  items:[
   {name:'ZZZ Proton 11 Fix',repo:gh('zzz-steam-deck-proton11-fix'),text:bi('Steam Deck 上《绝区零》HoYoPlay 版在 Proton 10 / 11 下约 85 秒必崩的一键修复与启动器。不替换游戏文件，也不改动官方 Proton。','A one-click fix and launcher for the HoYoPlay build of Zenless Zone Zero crashing ~85 seconds in under Proton 10 / 11 on Steam Deck — without replacing game files or the official Proton.')},
   {name:'Codex Project Order Reset',repo:gh('codex-project-order-reset'),text:bi('修复 macOS 版 ChatGPT / Codex 侧边栏项目顺序被锁住的问题：先备份状态文件，只删除两个排序字段，再重启应用。','Unlocks the stuck project order in the macOS ChatGPT / Codex sidebar: backs up the state file, removes only the two ordering keys, then relaunches the app.')},
  ],
 },
 {
  id:'dsh', series:bi('DeepSeek Harness 插件','DeepSeek Harness plugins'), icons:['deepseek'], tags:['DSH','Plugin'], wide:true,
  media:[{src:bi('dsh-projectless-zh','dsh-projectless-en'),alt:bi('工作区菜单里新增的“无工作区会话”选项','The new “Session without workspace” option in the Workspace picker'),cover:true}],
  items:[
   {name:'Projectless Session',repo:gh('dsh-projectless-session'),text:bi('不选工作区也能开会话，每个会话自动获得按日期整理的独立工作目录。','Start a session without a workspace; each one gets its own date-organised working directory.')},
   {name:'Session Index',repo:gh('dsh-session-index-plugin'),text:bi('为已有会话生成简短索引并复制路径，方便交给 Codex 等其他 Agent 接着做。','Writes a short index of an existing session and copies its path, so Codex or another agent can pick up the thread.')},
  ],
 },
];
export const githubUrl='https://github.com/jarvisluk?tab=repositories&q=&type=&language=&sort=stargazers';
