// Bambu Lab, rebuilt from the group's final presentation (SD5412 "Untitled Fridays"), which the portfolio reuses on pp. 11-18.
// Boards and store stills come from scripts/build_bambu.py; every caption describes what the image shows.
// Interviewees and workshop participants stay anonymous: their photos and the workshop recap video are left out.
const b=(zh,en)=>({zh,en});
const img=(id,zh,en,kind='photo')=>({id,caption:b(zh,en),kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,...extra});
const board=(id,zh,en,layout='board')=>({type:'media',layout,items:[img(id,zh,en,'diagram')]});

export default {
 tone:{h:138,s:24,accent:'#b8e6c0',ink:'#1f9a4b'},
 accent:'#dce7cd',surface:'#fefaf4',hero:'bb-board-concept',heroStyle:'board',
 heroCaption:b('小程序设计概念：首页和 AR 导览界面','Mini program concept: the home and AR tour screens.'),
 oneLiner:b('为拓竹首家旗舰店重新设计顾客体验：新的店内动线，加上带 AR 导览、AI 助手和预约功能的小程序，让第一次来的人也能开始打印。','A redesigned customer experience for Bambu Lab’s first flagship store: a new route through the store and a mini program with AR guidance, an AI assistant and bookings, so first-time visitors can start printing.'),
 credit:b('作者：Lu Junrong、Tsang Hiu Ching、Liu Yinghong、Zhang Kaiying、Zhu Zhengming','Authors: Lu Junrong, Tsang Hiu Ching, Liu Yinghong, Zhang Kaiying, Zhu Zhengming'),
 sections:[
  sec('films',b('在店里走一遍','A walk through the store.'),b('演示视频沿着新的顾客动线走过门店：进店、看沙盘和模型墙、报名工作坊、预约免费打印，每一步都对应小程序里的一项功能。','The demo follows the new route through the store, from entering and seeing the sandbox and model wall to signing up for a workshop and booking a free print, each step matched to a feature in the mini program.'),[
   {type:'video',title:b('小程序体验演示','Mini program demonstration'),src:'/assets/video/bambu-demo.mp4',poster:'bb-board-floor-after'},
  ]),
  sec('digital',b('把门店体验，延伸到手中','The store, in your hands.'),b('重新设计的拓竹小程序承接店内探索：AR 导览讲解展品，商城连接兴趣和购买，工作坊和打印服务预约给出下一步。','The redesigned Bambu Lab mini program carries on from the visit: AR guidance explains the exhibits, the store links interest to purchase, and workshop and printing bookings offer a next step.'),[
   board('bb-board-features','四项主要功能：AR 导览、商城、工作坊预约、3D 打印服务预约','Four main features: AR guided tour, product store, workshop booking and 3D printing service booking.'),
  ]),
  sec('assistant',b('一个更容易开口的向导','An approachable guide.'),b('小竹是一个角色化的 AI 助手，回答关于机器、耗材和打印的问题，让第一次接触 3D 打印的人用聊天的方式继续了解。','Little Bambu is a character-based AI assistant that answers questions about printers, filament and printing, so newcomers can keep exploring through conversation.'),[
   board('bb-board-chatbot','Little Bambu 小竹 AI 助手：三段对话界面','Little Bambu AI chatbot: three conversation screens.'),
  ]),
  sec('journey',b('每一步，都通向下一次探索','One discovery leads to another.'),b('原来的门店没有清晰的路线，顾客看完展品不知道下一步。新的动线依次经过沙盘、模型墙、照片墙、竹子集市、耗材墙、打印机区和工作坊，从看见、试玩到学习。','The original store had no clear route, and visitors didn’t know what to do after the displays. The new route runs through the sandbox, model wall, photo wall, Bambu Market, filament wall, printer area and workshop, from seeing to trying to learning.'),[
   board('bb-board-floor-after','改造后的平面图与新的顾客动线，七个节点依次编号','The redesigned floorplan and new customer route, with seven numbered stops.'),
   board('bb-board-floor-before','改造前的平面图：各区域之间没有清晰的路线','The floorplan before: no clear route between the areas.'),
  ]),
  sec('co-design',b('和参与者一起，重新看见空间','Reimagine the space, together.'),b('我们邀请 6 位受访者和 1 位相关方参加共创工作坊，分三个环节：把痛点写在便利贴上，分享启发案例，再用门店模型重新布置空间和动线。','We invited six interviewees and one stakeholder to a co-design workshop in three parts: writing pain points on sticky notes, sharing inspiring cases, then rearranging the store and its route on a model.'),[
   board('bb-board-codesign','共创工作坊的三个环节：从痛点到机会、启发案例分享、共同设计，右侧是工作坊现场','The workshop’s three parts: from pain points to opportunities, inspirational case sharing, and co-creation, with photos from the session.'),
   board('bb-board-insights','工作坊洞察：空间动线混乱、过度强调技术、信息缺乏层次、互动不足、希望成为创客社区','Workshop insights: a confusing layout, too much technical display, no information hierarchy, too little hands-on engagement, and a wish for a maker community.'),
  ],{steps:[b('发现问题','Find the friction'),b('分享启发','Share inspiration'),b('共同设计','Co-create the journey')]}),
  sec('research',b('先看见，好奇之后的困惑','Understand what follows curiosity.'),b('拓竹首家旗舰店 2025 年 9 月 30 日在深圳湾万象城开业，约 244 平方米。我们观察门店，做了 18 次到店前后的访谈：展品很吸引人，但顾客看到的是成品，看不到机器能做什么；没有人引导，也不知道怎么开始打印。','Bambu Lab’s first flagship store opened at MixC Shenzhen Bay on 30 September 2025, about 244 m². We observed the store and ran 18 interviews before and after visits: the displays attract attention, but visitors see finished objects rather than what the printers can do, and with no guidance they don’t know how to start printing.'),[
   board('bb-board-goals','项目目标：把好奇变成能力、串起完整的顾客旅程、带来线索与销售、推广品牌和生态','Project goals: turn curiosity into capability, create a cohesive journey, generate leads and sales, and promote the brand and its ecosystem.'),
   board('bb-board-stakeholders','利益相关者地图：核心、主要和次要三层','Stakeholder map in core, primary and secondary rings.'),
   board('bb-board-painpoints','观察到的五个痛点：体验不完整、展品与打印脱节、引导无效、缺少线上线下互动、分区不清','Five observed pain points: an incomplete experience, displays disconnected from printing, ineffective guidance, no digital–physical interaction, and unclear zones.'),
  ],{points:[b('把好奇转化为创作能力','Turn curiosity into capability.'),b('串联完整的顾客旅程','Create a connected visitor journey.'),b('让学习、体验与购买形成连续关系','Connect learning, trying and buying.')]}),
  sec('service',b('把前台体验，与后台支持连接','Connect the experience and its support.'),b('新的顾客旅程从线上发现延伸到进店、观察、参加工作坊、咨询、试打印和离店后的跟进；两段蓝图列出每个阶段的触点、前台、后台和预期感受。','The new journey runs from online discovery through entering, observing, joining a workshop, asking about products, trying a print and following up afterwards; two blueprint panels list the touchpoints, front stage, backstage and expected feelings at each stage.'),[
   board('bb-board-blueprint-1','重新设计的顾客旅程（一）：线上发现、进店、观察、发现','Redesigned journey, part one: explore online, enter, observe, discover.'),
   board('bb-board-blueprint-2','重新设计的顾客旅程（二）：参加工作坊、咨询产品、试打印、离店与跟进','Redesigned journey, part two: join a workshop, product inquiry, printing trial, exit and follow-up.'),
   board('bb-board-process','数字方案的创作过程：发现、定义、构思、原型、迭代','How the digital solution was made: discover, define, ideate, prototype, refine.'),
   board('bb-board-outcomes','预期成果：AR 降低理解门槛，工作坊培养社区，一站式体验带来忠诚度，教育用户带动耗材销售','Expected outcomes: AR makes the technology accessible, workshops build a community, an all-in-one experience earns loyalty, and educating users drives consumables sales.'),
  ]),
 ],
};
