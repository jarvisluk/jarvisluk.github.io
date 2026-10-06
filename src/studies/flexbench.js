// FlexBench, rebuilt from the Figma portfolio boards and the original NAS camera files.
// Media come from scripts/build_flexbench.py; every caption describes what the image shows.
const b=(zh,en)=>({zh,en});
const img=(id,zh,en,kind='photo')=>({id,caption:b(zh,en),kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,...extra});
const low=b('低','Low'),high=b('高','High'),medium=b('中','Medium');

export default {
 tone:{h:34,s:22,accent:'#ecd3a8',ink:'#9a7036'},
 accent:'#e8dfd1',hero:'fb-hero',heroStyle:'photo',
 heroCaption:b('使用折叠延伸板钻孔：桌面在需要时向外扩展，夹具固定木料','Drilling on the folding extension: the work surface extends when needed and clamps hold the timber.'),
 oneLiner:b('一套可拆装的移动工作台和配套的预约借用服务，把工坊推到设计学生身边。','A modular mobile workbench and booking service that brings the workshop to where design students are.'),
 credit:b('个人项目','Individual project'),
 // Finished results first; the process follows in the chapters below.
 showcase:[
  img('fb-final-front','FlexBench 完整原型：抽屉模块和箱体模块挂在框架内，带万向轮，可推到任何位置','The complete FlexBench: drawer and box modules hang in the frame, on casters that roll anywhere.'),
  img('fb-final-pegboard-side','另一侧：洞洞板挂着插线板和夹具，下方是空的卡扣框架','The other side: a pegboard holds a power strip and clamps above the empty snap-fit frame.'),
  img('fb-story-setup','工作台已推到中庭，模块就位','The bench rolled into the hall with its modules in place.'),
  img('fb-final-drawer-tools','抽屉里按格收纳的锉刀、尺子、剪刀和笔','Files, rulers, scissors and pens stored in a drawer grid.'),
  img('fb-final-box-tools','从箱体模块中取出电钻','Taking a drill out of the box module.'),
  img('fb-final-snap-hand','手把一个卡扣挂到框架横杆上','A hand hooking a clip onto a frame rail.'),
  img('fb-final-fold-2','把延伸板抬平到与桌面齐平','Raising the extension level with the top.'),
  img('fb-story-use','使用钉枪时，手机就放在桌面一旁','Using a nail gun with the phone close at hand on the bench.')],
 sections:[
  sec('modules',b('一套结构，四种模块','One frame, four modules.'),b('铝型材框架加卡扣系统，让每个模块都能按项目需要拆装、换位。','An aluminium frame with a snap-fit system lets every module be removed and repositioned for each project.'),[
   {type:'media',layout:'editorial',items:[
    img('fb-final-front','FlexBench 完整原型：抽屉模块和箱体模块挂在框架内，带万向轮，可推到任何位置','The complete FlexBench: drawer and box modules hang in the frame, on casters that roll anywhere.'),
    img('fb-final-pegboard-side','另一侧：洞洞板挂着插线板和夹具，下方是空的卡扣框架','The other side: a pegboard holds a power strip and clamps above the empty snap-fit frame.'),
    img('fb-final-frame','卸下全部模块后的框架，可以看到一排排卡扣位','The frame with all modules removed, showing rows of snap-fit mounts.'),
   ]},
   {type:'modules',items:[
    {name:b('卡扣系统','Snap-fit system'),body:b('模块背后的卡扣直接挂在框架横杆上，不用工具就能装卸。','Clips on each module hang directly on the frame rails and come off without tools.'),specs:[['160 mm',b('水平与竖直中心距','Centre spacing, both ways')]],images:[
     img('fb-final-snap-hand','手把一个卡扣挂到框架横杆上','A hand hooking a clip onto a frame rail.'),
     img('fb-final-snap-detail','白色 3D 打印卡扣与抽屉导轨的特写','Close-up of white 3D-printed clips and a drawer slide.')]},
    {name:b('抽屉模块 · 网格收纳','Drawer module · grid storage'),body:b('三种高度的抽屉可以互换；抽屉内的网格按 Gridfinity 思路设计，工具位可以 3D 打印定制。','Drawers in three heights are interchangeable; inside, a Gridfinity-style grid takes 3D-printed holders made for each tool.'),specs:[['80 mm',b('一个抽屉单元高度','One drawer unit height')],['35 mm',b('网格单元','Grid unit')]],images:[
     img('fb-final-drawers','两层抽屉模块，单独放在桌面上','A two-drawer module standing on its own.'),
     img('fb-final-drawer-tools','抽屉里按格收纳的锉刀、尺子、剪刀和笔','Files, rulers, scissors and pens stored in a drawer grid.'),
     img('fb-final-grid','空网格内胆，中间放着一个笔托','The empty grid insert with a single pen holder.')]},
    {name:b('箱体模块','Box module'),body:b('最大的模块，用来放圆锯、吸尘器等大型电动工具，打开就能拿取。','The largest module holds big power tools such as saws and dust extractors, ready to grab.'),images:[
     img('fb-final-box-tools','从箱体模块中取出电钻','Taking a drill out of the box module.'),
     img('fb-final-box-back','箱体模块背面的四个卡扣','The four clips on the back of a box module.')]},
    {name:b('洞洞板与折叠延伸板','Pegboard and folding extension'),body:b('洞洞板主要用来接电源、挂正在用的工具；侧边的延伸板可以翻下收起，也可以展平辅助钻孔和切割。','The pegboard mainly connects power and holds tools in use; the side extension folds down or lies flat to help with drilling and cutting.'),specs:[['15 / 80 mm',b('洞洞板孔径 / 孔距','Pegboard hole / spacing')]],images:[
     img('fb-final-pegboard-power','把插线板挂到洞洞板上','Hanging a power strip on the pegboard.'),
     img('fb-final-fold-1','延伸板处于翻下状态','The extension folded down.'),
     img('fb-final-fold-2','把延伸板抬平到与桌面齐平','Raising the extension level with the top.'),
     img('fb-final-fold-use','在展开的延伸板上夹住木料钻孔','Drilling clamped timber on the opened extension.')]},
   ]},
  ]),
  sec('films',b('制作与演示','Making and demo.'),b('前半段在展厅里一步步做出原型：裁板、切割铝型材、拼装框架、做抽屉和工具箱；后半段演示各项功能：洞洞板和电源、抽屉收纳、工具箱和可展开的台面。','The first half builds the prototype in the exhibition hall: cutting boards and aluminium profiles, assembling the frame, making drawers and tool boxes. The second half demonstrates each function: the pegboard and power strip, drawer storage, tool boxes and the extendable worktop.'),[
   {type:'video',title:b('FlexBench 移动工坊制作 & 演示视频','The Made of FlexBench'),youtube:'v_wOtFdhkD8',bilibili:'BV1a9VYzaE7Q',poster:'fb-make-saw'},
   {type:'media',layout:'pair',items:[
    img('fb-make-frame','在展厅地面上拼装铝型材底框','Assembling the aluminium base frame on the floor.'),
    img('fb-make-drill','在铝型材上钻孔固定桌板','Drilling to fix the board onto the aluminium frame.'),
   ]},
  ]),
  sec('context',b('想法很多，能动手的地方很少','Plenty of ideas, few places to make them.'),b('中国美术学院良渚校区是一座刚投入使用的设计校区。设计与创新学院的课程常以实物或装置作为成果，但工坊的软硬件仍不完善，学生不得不先解决「在哪里做、用什么做」。','The Liangzhu campus of the China Academy of Art opened recently. Courses at the School of Design and Innovation often end in physical products or installations, yet the workshop’s facilities and management are still incomplete, so students must first work out where and with what to make.'),[
   {type:'media',layout:'board narrow',items:[img('fb-campus','良渚校区卫星图：设计学院集中在校区西侧，周边仍是农田','Satellite view of the Liangzhu campus: the design schools sit on the western edge, surrounded by farmland.')]},
   {type:'problems',items:[
    {title:b('空间使用冲突','Conflicts over space'),body:b('大型作品体量大，制作时还会产生噪声和气味，许多学生只好在教室外的走廊或 8 号楼大厅里做。','Large projects take up room and making them creates noise and odours, so many students work in corridors outside classrooms or in the lobby of Building 8.'),image:img('fb-hall-clutter','中庭里堆放的泡沫块、未完成的作品和包装材料','Foam blocks, unfinished work and packaging piled in the central hall.')},
    {title:b('被保安请走','Asked to leave'),body:b('这些公共空间另有用途，学生在那里做东西时，常被保安要求离开。','These public spaces serve other purposes, and security often asks students working there to leave.'),image:img('fb-corridor-boxes','教室走廊里摊开的纸箱和木材，制作只能临时占用通道','Cardboard boxes and timber spread along a classroom corridor, where making temporarily occupies the passage.')},
    {title:b('工具室长期不开放','A closed tool room'),body:b('由于管理问题，学校的工具室已经很久没有向学生开放。','Because of management issues, the school’s tool room has not been open to students for a long time.'),image:img('fb-toolroom','工具室内部：电动工具和工具箱杂乱堆叠，无人整理','Inside the tool room: power tools and cases piled up with no one organising them.')},
   ]},
  ]),
  sec('voices',b('学生需要的不只是一间教室','Students need more than a classroom.'),b('访谈了 4 位学生和 1 位工坊导师。学生在意隐私、氛围和便利；导师看到的是人手和管理的缺口。受访者均已匿名。','Interviews with four students and one workshop tutor. Students care about privacy, atmosphere and convenience; the tutor sees gaps in staffing and management. All participants are anonymised.'),[
   {type:'quotes',items:[
    {who:b('学生 A','Student A'),tag:b('空间的潜规则','Unwritten rules'),text:b('「教室虽然是公共空间，但一旦有人占了，你就待不下去。」','“Although classrooms are public spaces, once someone occupies them, you can’t stay there.”')},
    {who:b('学生 A','Student A'),tag:b('先到先得','First come, first served'),text:b('「每学期没排课的空教室会被其他同学占用，谁先到谁用。」','“Empty classrooms not scheduled each semester may be occupied by other students—first come, first served.”')},
    {who:b('学生 B','Student B'),tag:b('隐私','Privacy'),text:b('「我更喜欢在宿舍做，有私人空间感觉更好。」','“I prefer working in my dorm room; a private workspace feels better.”')},
    {who:b('学生 B','Student B'),tag:b('拥挤','Crowding'),text:b('「学校现在指定的活动空间太小，也太挤。」','“The current designated activity spaces at the school are too small and overcrowded.”')},
    {who:b('学生 C','Student C'),tag:b('工作氛围','Atmosphere'),text:b('「工具多的工坊更容易长时间待下去，氛围也更好。」','“Workshops with more tools make it easier to work for long periods and create a better atmosphere.”')},
    {who:b('学生 D','Student D'),tag:b('便利','Convenience'),text:b('「我现在主要在教室做，偶尔去工坊，其实更想在工坊。在教室做装置又吵又乱，很不方便。」','“I mainly work in classrooms and occasionally use the workshop, though I’d prefer the workshop. Building installations in a classroom is noisy, messy and inconvenient.”')},
    {who:b('工坊导师','Workshop tutor'),tag:b('现有系统失效','Current system failed'),tutor:true,text:b('「学校的工坊导师不多，也不是每个学生都会用设备。学生需要加工材料时，我只能建议他们去校外工厂。」','“There aren’t many workshop instructors, and not all students know how to use the equipment. When students need to process materials, I can only suggest external factories.”')},
   ]},
   {type:'persona',label:b('匿名用户画像','Anonymised persona'),name:b('设计与创新学院学生','A design and innovation student'),
    facts:[[b('年龄','Age'),b('22 岁','22')],[b('学院','School'),b('设计与创新学院','School of Design and Innovation')],[b('课程成果','Course outcome'),b('装置或实体产品','Installations or physical products')]],
    pains:[b('没有可以自由使用工具的地方','No space to use tools freely'),b('教室拥挤，工作空间不够','Crowded classrooms and too little room'),b('在教室制作会影响他人','Making in classrooms disturbs others'),b('教室每学期变化，公共空间不允许使用','Classrooms change each term; public space is off-limits'),b('工坊太远，工具借不到','The workshop is far away and tools can’t be borrowed')],
    needs:[b('一个可以使用特定工具的空间','A space for using specific tools'),b('不打扰别人','Not disturbing others'),b('方便地拿到工具','Convenient access to tools')]},
  ]),
  sec('process',b('沿着制作流程，找到真正需要工坊的环节','Follow the making process to see where a workshop matters.'),b('一个实体项目通常经历 6 个阶段。比较每个阶段对空间和工具的需求，就能看出移动工坊该服务哪些环节。','A physical project usually passes through six stages. Comparing their spatial and tool demands shows which ones a mobile workshop should serve.'),[
   {type:'stages',items:[
    {name:b('低保真原型','Low-fi prototyping'),detail:b('纸板、塑料快速成型','Cardboard and plastic models'),space:low,tools:low,need:b('视尺寸而定','Depends on size'),place:b('小件在教室，大件在工坊','Classroom if small, workshop if large'),image:img('fb-wf-lofi','开了窗洞的纸板体块模型，用于快速推敲形态','A cardboard massing model with a cut-out window, used to test form quickly.')},
    {name:b('电子原型','Electronic prototyping'),detail:b('编程、焊接与接线','Coding, soldering and wiring'),space:low,tools:low,need:b('不需要','No'),place:b('教室','Classroom'),image:img('fb-wf-electronics','在面包板上给 Arduino 接线调试','Wiring and testing an Arduino on a breadboard.')},
    {name:b('数字原型','Digital prototyping'),detail:b('建模与仿真','Modelling and simulation'),space:low,tools:low,need:b('不需要','No'),place:b('教室','Classroom'),image:img('fb-wf-digital','在 Rhino 中建立工作台的三维模型','Modelling the workbench in Rhino.','screen')},
    {name:b('外协加工','Outside processing'),detail:b('校外工厂加工、数控制造','Factory processing and digital fabrication'),space:b('—','—'),tools:b('—','—'),need:b('校外完成','Done off campus'),place:b('校外','Outside'),image:img('fb-wf-outside','数控车床加工金属零件','A CNC lathe machining a metal part.')},
    {name:b('自主加工与高保真原型','Self-processing & hi-fi prototyping'),detail:b('木材、金属零件制作与组装','Making and assembling wood and metal parts'),space:high,tools:high,need:b('需要','Yes'),place:b('工坊','Workshop'),workshop:true,image:img('fb-wf-making','地面上摊开的板材、铝型材和圆锯，大件加工需要大面积场地','Boards, aluminium profiles and a circular saw spread on the floor: large parts need a large area.')},
    {name:b('表面处理','Final finishing'),detail:b('打磨与喷涂','Sanding and painting'),space:high,tools:high,need:b('需要','Yes'),place:b('工坊','Workshop'),workshop:true,image:img('fb-wf-finishing','喷涂完成的白色拱形装置模型','A white arched installation model after painting.')},
   ],note:b('第 2、3 步多在教室进行，空间和工具上没有明显冲突；大型低保真模型以及第 5、6 步需要更多空间和工具，在现状下必须在工坊完成——这正是移动工坊要补上的部分。','Steps 2 and 3 mostly happen in classrooms without real conflict. Large low-fi models and steps 5 and 6 need more space and tools and, under current conditions, must be done in a workshop—the gap a mobile workshop fills.')},
  ]),
  sec('space',b('把工坊放到离学生最近的地方','Put the workshop where students already are.'),b('校园大致可分为五类空间。以设计与创新学院为例，比较空间大小、人流和使用特征，找出适合部署工坊的位置。','The campus divides into five types of space. Using the School of Design and Innovation as an example, size, traffic and character identify where a workshop can be deployed.'),[
   {type:'spaces',layout:'stack',diagram:img('fb-board-axo','空间分析：一层人流、可部署位置（绿色教室走廊、蓝色中庭、红色屋檐下）和建筑分层','Spatial analysis: ground-floor flows, deployable spots (green classroom corridors, blue central hall, red eaves) and the building stack.','diagram'),map:img('fb-board-map','设计与创新学院在校区中的位置。多数楼栋结构相似，这套布局可以推广到其他学院。','The School of Design and Innovation on campus. Most buildings share this structure, so the layout extends to other schools.','diagram'),items:[
    {color:'#8fb0d6',name:b('中庭','Central hall'),space:b('室内 / 大','Indoor / large'),traffic:low,suitable:true,note:b('室内空间大，但举办展览或活动时无法使用。','A large indoor space, unavailable when exhibitions or events are held.'),works:[b('低保真原型','Low-fi prototyping'),b('大件制作','Large parts making'),b('大件组装','Large parts assembling')],image:img('fb-space-hall','空旷的中庭，中央摆放着一件金色装置','The open central hall with a golden installation at its centre.')},
    {color:'#e8e8e8',name:b('教室','Classroom'),space:b('室内 / 小','Indoor / small'),traffic:low,suitable:true,note:b('上课和项目汇报的地方，空间较小。','Small rooms for teaching and project presentations.'),works:[b('低保真原型','Low-fi prototyping'),b('电子原型','Electronic prototyping'),b('数字原型','Digital prototyping'),b('小件制作与组装','Small parts making & assembling')],image:img('fb-space-classroom','服装设计教室：人台、工作台和散落的面料','A fashion design classroom with dress forms, worktables and fabric.')},
    {color:'#f2c450',name:b('中庭走廊','Central hall corridor'),space:b('室内 / 大','Indoor / large'),traffic:high,suitable:false,note:b('校园的重要通道，目前堆放着杂物，已经影响通行。','A vital campus passage, already partly blocked by stored clutter.'),works:[],image:img('fb-space-hall-corridor','中庭走廊：沿墙放着工作台、储物柜和设备箱','The central hall corridor, lined with worktables, lockers and equipment cases.')},
    {color:'#a8dba0',name:b('教室走廊','Classroom corridor'),space:b('室内 / 中','Indoor / medium'),traffic:medium,suitable:true,note:b('离教室最近，室内能为大多数制作提供遮蔽。','Closest to classrooms; indoors, it shelters most kinds of making.'),works:[b('低保真原型','Low-fi prototyping'),b('大件制作','Large parts making'),b('大件组装','Large parts assembling')],image:img('fb-space-corridor','教室外的长走廊，彩色坐凳沿通道摆放','The long corridor outside classrooms, with coloured benches along the way.')},
    {color:'#ee6f5a',name:b('屋檐下','Under the eaves'),space:b('室外 / 大','Outdoor / large'),traffic:medium,suitable:true,note:b('宽大的屋檐能遮挡一般天气，并且靠近教室。','A deep overhang shelters from ordinary weather and is close to classrooms.'),works:[b('大件制作','Large parts making'),b('大件组装','Large parts assembling'),b('表面处理','Final finishing')],image:img('fb-space-eaves','教学楼外的深屋檐和石板路','A deep building overhang above a paved walkway.')},
   ],conclusion:b('综合空间大小、人流和特点，设计与创新学院有三处适合部署工坊：中庭、教室走廊和屋檐下。校园大多数楼栋结构相似，这套布局可以推广到其他学院。','Considering size, traffic and character, three locations suit a workshop at the School of Design and Innovation: the central hall, classroom corridors and the eaves. Most campus buildings share this structure, so the layout can extend to other schools.')},
  ],{dark:true}),
  sec('system',b('一张工作台，背后是一套服务','Behind one bench, a whole service.'),b('学生想要一个专属、高效的制作空间；而校园固定空间有限。于是把公共区域按课程节奏改造成移动工坊，用线上应用串起学校、教师、学生和工坊员工。','Students want a dedicated, efficient place to make, but fixed space is scarce. Public areas are adapted into mobile workshops that follow the course schedule, with an app connecting the school, teachers, students and workshop staff.'),[
   {type:'actors',items:[
    {name:b('学校','School'),role:b('调整现有的工坊管理方式','Changes how workshops are managed.')},
    {name:b('教师','Teacher'),role:b('预约工坊、安排课程','Books workshops and runs courses.'),app:b('App：预约工坊、查看工坊状态','App: book workshops and check their status')},
    {name:b('学生','Student'),role:b('使用工坊，专注于项目','Uses the workshop and focuses on the project.'),app:b('App：查看工坊位置、发起求助','App: find workshops and ask for help')},
    {name:b('工坊员工','Workshop staff'),role:b('维护工坊，提供使用指导，协助搭建与管理订单','Maintains workshops, gives guidance and helps with setup and orders.'),app:b('App：查看工坊状态、了解用户需求','App: check status and see user needs')},
   ]},
   {type:'blueprint',caption:b('移动工坊服务蓝图：从开学前的预约，到课程中的使用，再到课后的归还检查','Service blueprint for the mobile workshop: from booking before term, through use in class, to return checks afterwards.'),
    phases:[{label:b('开学前','Before the semester'),span:4},{label:b('课程中','During the class'),span:3},{label:b('课程结束','Class ended'),span:1}],
    lanes:[
     {label:b('有形证据','Evidence'),kind:'evidence',cells:[null,{text:b('移动应用','Mobile app'),span:2},b('工坊储存区、移动工作台','Storage area, mobile workbench'),null,b('移动工作台、工具','Mobile workbench, tools'),b('移动工作台、线上说明二维码、面对面指导','Workbench, QR code for online instructions, face-to-face guidance'),b('工坊储存区、移动工作台','Storage area, mobile workbench')]},
     {label:b('教师旅程','Teacher journey'),kind:'journey',cells:[b('制定教学计划','Make the teaching plan'),b('用 App 查看可用的工坊类型','Check available workshops in the app'),b('预约移动工坊','Reserve a mobile workshop'),null,b('课程开始','Class starts'),null,null,b('确认工坊结束','Confirm the workshop has ended')]},
     {label:b('学生旅程','Student journey'),kind:'journey',cells:[b('选课','Select the course'),null,b('查看工坊位置','Check the workshop location'),b('搭建工坊','Set up the workshop'),b('课程开始','Class starts'),b('确定并登记要用的工具和工作台','Decide and register tools and workbench'),b('使用工坊完成设计项目','Use the workshop for the project'),b('归还工坊','Return the workshop')]},
     {line:b('互动线','Line of interaction'),label:b('前台员工行为','Frontstage staff'),kind:'front',cells:[null,null,b('为每个班级分配工作台','Allocate workbenches to each class'),b('协助学生搭建','Help students set up'),null,b('为每组分配工具和工作台','Allocate tools and benches to each team'),b('需要时提供视频指导或维修工具','Provide video guidance or repair tools when needed'),null]},
     {label:b('技术支持','Technology'),kind:'front',cells:[null,b('线上申请平台','Online booking platform'),null,null,null,null,b('电动工具','Power tools'),null]},
     {line:b('可视线','Line of visibility'),label:b('后台行为','Backstage'),kind:'back',cells:[null,b('检查可用工具','Check available tools'),b('库存管理系统','Storage management system'),null,b('确认已使用的工具','Confirm tools in use'),b('登记工具借用人','Register who uses which tools'),b('员工接受工具使用培训','Staff trained on the tools'),b('检查工具状态','Check tool condition')]},
     {line:b('内部互动线','Line of internal interaction'),label:b('支持流程','Support'),kind:'support',cells:[b('估算所需工具','Estimate the tools needed'),null,b('申请流程','Application process'),b('客户与员工协作','Customer–staff cooperation'),b('库存盘点','Inventory check'),null,b('员工培训、安全检查','Staff training, safety inspection'),b('耗材采购、损坏赔偿','Consumables procurement, damage compensation')]},
    ]},
  ]),
  sec('organize',b('先整理工具，再决定模块','Organise the tools, then the modules.'),b('把不同制作阶段需要的工具归为 8 类，再按尺寸放进三种模块：小件进抽屉，常用和需要供电的挂上洞洞板，大型电动工具放进箱体。','Tools needed across the making stages fall into eight groups, sorted by size into three modules: small items in drawers, frequently used and powered items on the pegboard, large power tools in boxes.'),[
   {type:'media',layout:'board',items:[img('fb-board-tools','8 类工具：电源、小型手工具、轻型紧固、测量、电动工具充电、木工与金工、喷涂、打磨','Eight tool groups: power supply, small hand tools, light fastening, measuring, power-tool charging, wood and metal working, spray painting and polishing.','diagram')]},
   {type:'media',layout:'board narrow',items:[img('fb-board-mapping','从制作阶段到工具，再按「需要供电 / 小 / 中 / 大」归入洞洞板、抽屉和箱体三种模块','From making stages to tools, then by power need and size into the pegboard, drawer and box modules.','diagram')]},
   {type:'heading',text:b('工作台设计','Workbench design')},
   {type:'media',layout:'board narrow',items:[img('fb-board-bench','工作台设计：160mm 卡扣系统、三种尺寸的抽屉、箱体模块、折叠延伸板、可移动洞洞板（孔径 15mm、间距 80mm）和 35mm 网格收纳','Workbench design: the 160mm snap-fit system, three drawer sizes, box modules, a folding extension, a movable pegboard (15mm holes at 80mm) and a 35mm grid organiser.','diagram')]},
  ],{dark:true}),
  sec('journey',b('从预约，到归还','From booking to return.'),b('一次完整的使用分为四步。每一步都有对应的场景和 App 界面。','A complete use takes four steps, each with its own scene and app screens.'),[
   {type:'story',steps:[
    {title:b('课前准备','Prepare for class'),roles:[[b('所有人','Everyone'),b('以学生、教师或员工身份注册登录','Register and log in as student, teacher or staff.')],[b('教师','Teacher'),b('上传课程信息并预约工坊','Upload class information and reserve a workshop.')],[b('员工','Staff'),b('核对工具状态，确认预约','Check tool status and confirm the booking.')]],
     scene:img('fb-story-login','在工作台上用手机登录 FlexBench','Logging in to FlexBench on a phone at the bench.'),
     screens:[img('fb-app-login','登录页：选择学生、教师或员工身份','Login: choose student, teacher or staff.','screen'),img('fb-app-reserve','选位页：在楼栋平面上选择工坊位置','Booking: pick a workshop spot on the building plan.','screen')]},
    {title:b('搭建工坊','Set up the workshop'),roles:[[b('学生与员工','Students & staff'),b('查看工坊位置并完成搭建','Find the workshop location and set it up.')],[b('学生','Student'),b('领取工具，查看使用指导','Claim tools and read the guidance.')]],
     scene:img('fb-story-setup','工作台已推到中庭，模块就位','The bench rolled into the hall with its modules in place.'),
     screens:[img('fb-app-map','我的工坊：地图上标出 7 号楼的工坊和使用日期','My workshop: the Building 7 workshop and its dates on the map.','screen'),img('fb-app-workshop','工坊列表：每处工坊的位置和预约时段','Workshop list: each location and its booking period.','screen')]},
    {title:b('使用与求助','Use and get help'),roles:[[b('学生 / 教师','Student / teacher'),b('在「服务工单」页面发起求助','Ask for help on the service tickets page.')],[b('员工','Staff'),b('提供信息或上门维修','Provide information or come to repair.')]],
     scene:img('fb-story-use','使用钉枪时，手机就放在桌面一旁','Using a nail gun with the phone close at hand on the bench.'),
     screens:[img('fb-app-tickets','服务工单：「工具故障」「需要更多工具」等请求及处理状态','Service tickets: requests such as “tool not working” or “need more tools” with their status.','screen')]},
    {title:b('归还工坊','Return the workshop'),roles:[[b('员工','Staff'),b('检查工坊状态，清点工具','Check the workshop and count the tools.')]],
     scene:img('fb-story-return','课程结束后把工作台推回储存区','Rolling the bench back to storage after class.'),
     screens:[img('fb-app-overview','总览页：工具可用率 70%、工作台可用率 65%','Overview: 70% of tools and 65% of workbenches available.','screen')]},
   ]},
  ]),
 ],
};
