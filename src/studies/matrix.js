// Matrix — Emergence Necessity, rebuilt from its laid-out portfolio PDF (six dark pages) and the installation video.
// Boards and stills come from scripts/build_matrix.py; every caption describes what the image shows.
const b=(zh,en)=>({zh,en});
const img=(id,zh,en,kind='photo')=>({id,caption:b(zh,en),kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,dark:true,...extra});
const board=(id,zh,en,layout='board')=>({type:'media',layout,items:[img(id,zh,en,'diagram')]});

export default {
 tone:{h:205,s:30,accent:'#9fd1f2',ink:'#5aaee6'},
 accent:'#d9e8f1',surface:'#000000',theme:'dark',hero:'mx-hero',heroStyle:'board',
 heroCaption:b('四个三角单元拼成的 Matrix 装置，在暗处亮起蓝光','The Matrix installation, four triangular units glowing blue in the dark.'),
 oneLiner:b('一组由三角单元拼成的交互装置：每个节点只会简单地前后移动，连在一起后，整体却能呈现单个部分没有的动作与光。','An interactive installation of linked triangular units: each node only moves back and forth, yet together they produce movement and light no single part has.'),
 credit:b('个人项目','Individual project'),
 showcase:[
  img('mx-still-blue','四个单元同时亮起蓝光','All four units lit in blue.'),
  img('mx-still-white','白天的装置：白色框架、连杆和张紧线','The installation by day: white frames, rods and tensioned lines.'),
  img('mx-still-hand','手靠近时，节点向远离的方向退避','As a hand approaches, the nodes retreat from it.'),
  img('mx-still-colour','每个单元可以显示不同颜色','Each unit can show a different colour.'),
  img('mx-still-violet','切换到紫色灯光','Switched to violet light.'),
  img('mx-detail','单元内部：灯带、伺服机构和交错的线','Inside a unit: LED strips, servos and crossing lines.')],
 sections:[
  sec('films',b('看它动起来','See it move.'),b('演示视频依次展示四种运动模式（循环、退避、靠近、随机）、三种灯光效果，以及灯光与舵机一起运动的混合演示。','The demo runs through four movement modes (loop, retreat, approach, random), three lighting effects, and a hybrid of light and servo motion.'),[
   {type:'video',title:b('矩阵与涌现必然 - 交互装置演示视频','Matrix - Emergence Necessity Demo Video'),youtube:'t3h_mF45gQY',bilibili:'BV1iyVYzBE4a',poster:'mx-still-blue'},
  ]),
  sec('experience',b('单元之间，出现新的关系','New relationships between the parts.'),b('我做了一个由 4 个单元组成的演示，每个单元完全模块化，可以继续往任意方向拼接。单个节点只是简单的往复运动，交互模式下却能形成整体的动态，而且这种涌现会在矩阵扩展时被复制。','I built a four-unit demo; each unit is fully modular and can be extended in any direction. A single node only moves back and forth, but in the interactive modes the whole forms a dynamic of its own, and that emergence repeats as the matrix grows.'),[
   board('mx-board-final','最终呈现：装置与控制端、张紧线细节和蓝光下的单元内部','Final presentation: the installation with its controller, tensioned-line details and the unit interior under blue light.'),
  ]),
  sec('structure',b('从一个三角形，开始延展','Begin with a triangle.'),b('三个节点构成一个三角单元。每个节点由框架、连杆和伺服电机组成，电机通过连杆做直线往复运动，拉动节点之间的线。四种运动：展开、收缩、靠近、退避。','Three nodes form a triangular unit. Each node has a frame, a connecting rod and a servo that drives the rod back and forth, pulling the lines between nodes. Four movements: expand, contract, approach and retreat.'),[
   board('mx-board-structure','概念与结构细节：三角单元的拼接、四种运动方式、节点和单元的构造，以及侧视与顶视图','Concept and structure: how triangles tile, the four movements, node and unit construction, and side and top views.'),
  ],{steps:[b('展开','Expand'),b('收缩','Contract'),b('靠近','Approach'),b('退避','Retreat')]}),
  sec('control',b('让光与动作，共享一套语言','Connect light and movement.'),b('后台控制面板用 Unity 搭建，在 PC 或 iPad 上通过 OSC 把指令发给树莓派，再由它驱动红外传感器、PCA9685 舵机板和 WS2812 灯带。面板可以选颜色、调亮度、切换灯光效果和交互模式；结构用 3D 打印反复迭代，测试不同线材的效果。','The backstage control panel is built in Unity; on a PC or iPad it sends OSC commands to a Raspberry Pi, which drives the IR sensors, a PCA9685 servo board and WS2812 LEDs. The panel selects colour, brightness, lighting effects and interaction modes; the structure was iterated through 3D printing, testing different lines.'),[
   board('mx-board-control','控制面板：控制层级、设置流程、颜色与灯光效果、交互模式，以及 Unity 开发与制作过程','Control panel: control hierarchy, setup flow, colour and lighting effects, interaction modes, plus Unity development and the making process.'),
  ],{steps:[b('Unity 控制端','Unity controller'),b('OSC 通信','OSC communication'),b('树莓派','Raspberry Pi'),b('舵机与灯光','Servos & light')]}),
  sec('question',b('整体，如何超出单个部分？','When does a whole become more?'),b('矩阵既是数学里的数组，也是一种结构和组织方式。从《九章算术》的方程术到 Sylvester 命名“matrix”，再到 Holland 的《涌现》：简单的局部互动，会生成整体才有的新特征。装置想让这种“涌现”被看见。','A matrix is an array in mathematics, but also a way of structuring and organising. From array methods in The Nine Chapters to Sylvester naming the “matrix”, and on to Holland’s Emergence: simple local interactions generate features only the whole has. The installation sets out to make that emergence visible.'),[
   board('mx-board-origin','矩阵的起源：从中国古代的方程术、日本的行列式，到 1850 年 Sylvester 提出 matrix 一词；矩阵作为结构、组织和形式','The origin of the matrix: from ancient Chinese array methods and Japanese determinants to Sylvester coining “matrix” in 1850; the matrix as structure, organisation and form.'),
   board('mx-board-emergence','矩阵中的涌现：多层系统模型、涌现的条件，以及从单元互动到整体的构思','Emergence in the matrix: a multi-layer system model, the conditions for emergence, and the idea from unit interaction to the whole.'),
  ]),
 ],
};
