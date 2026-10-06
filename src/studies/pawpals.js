// PawPals, rebuilt from the laid-out deck (Figma 毕设开题汇报 Page 2, exported as PawPals.pdf) and the NAS originals.
// Media come from scripts/build_pawpals.py; every caption describes what the image shows.
const b=(zh,en)=>({zh,en});
const img=(id,zh,en,kind='photo')=>({id,caption:b(zh,en),kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,...extra});
const board=(id,zh,en,layout='board')=>({type:'media',layout,items:[img(id,zh,en,'diagram')]});

export default {
 tone:{h:42,s:26,accent:'#f6d878',ink:'#9c7a1c'},
 accent:'#fff3cf',hero:'pp-hero',heroStyle:'photo',
 heroCaption:b('毕业展现场：站点模块拼成一组装置，地上的毛线球和爪印把观众引向各个站点','At the graduation show, station modules form one installation; yarn balls and paw prints lead visitors between the stations.'),
 oneLiner:b('一套基于 TNR 的流浪猫管理系统：定位项圈、校园站点和协作平台，让照护持续发生。','A TNR-based stray cat care system: tracking collars, campus stations and a shared platform that keep care going.'),
 credit:b('作者：陆俊荣、张露桐','Authors: Lu Junrong, Zhang Lutong'),
 // Finished results first; the process follows in the chapters below.
 showcase:[
  img('pp-station-cluster','展厅里的一组站点：猫有塔、六边形台面和毛线球','A cluster of stations in the hall: cat towers, hexagonal tops and yarn balls.'),
  img('pp-real-collar','一只橘猫戴着柔性定位项圈','A ginger cat wearing the flexible tracking collar.'),
  img('pp-cat-collar','低多边形猫雕塑戴着柔性项圈，脚边放着两块定位电路板','A low-poly cat sculpture wearing the flexible collar, with two tracking boards at its feet.'),
  img('pp-pcbs','两版定位电路板：带 GNSS 天线和 TF 卡槽','Two versions of the tracking board, with GNSS antennas and TF card slots.'),
  img('pp-table-graphics','六边形台面印着站点里的猫和它们的故事','Hexagonal table tops printed with the station cats and their stories.'),
  img('pp-logo-panel','站点侧板上的猫友迹标识','The PawPals mark on a station side panel.'),
  img('pp-app-mock','猫友迹 App：校园地图、站点详情和任务','The PawPals app: campus map, station details and tasks.','screen'),
  img('pp-collar-close','柔性项圈特写：电路直接做在 FPC 上，背面用魔术贴固定','Close-up of the flexible collar: the circuit is built into the FPC and fastened with Velcro.')],
 sections:[
  sec('exhibition',b('把整个系统搬进展厅','The whole system, in one room.'),b('毕业展上，站点模块拼成一组可以走进去的装置：低多边形猫雕塑戴着柔性项圈，六边形台面印着站点里的猫，屏幕播放演示视频，地上的毛线球和爪印把观众引向各个站点。','At the graduation show the station modules formed a walk-in installation: a low-poly cat sculpture wore the flexible collar, hexagonal tops showed the station cats, a screen played the demo, and yarn balls and paw prints led visitors around.'),[
   {type:'media',layout:'wide',items:[img('pp-ex-wide','展陈全景：两座猫有塔之间连着六边形平台，四周散落毛线球和爪印','The full installation: hexagonal platforms between two cat towers, with yarn balls and paw prints around.')]},
   {type:'media',layout:'gallery',items:[
    img('pp-ex-side','从侧面看展陈，屏幕和猫雕塑在中间','The installation from the side, with the screen and cat sculpture in the middle.'),
    img('pp-ex-cat','猫雕塑旁的屏幕正在播放演示视频','Beside the cat sculpture, a screen plays the demo.'),
    img('pp-ex-table','六边形台面上的猫档案：名字、性格和二维码','Cat profiles on the hexagonal tops: names, personalities and QR codes.'),
    img('pp-ex-stamps','可以盖章的猫贴纸和印台，观众带走一张','Cat stickers and ink pads for visitors to stamp and take home.'),
    img('pp-ex-lid','掀开站点顶盖，里面是窝','Lifting a station lid to reveal the bed inside.'),
    img('pp-ex-paws','平台上的毛毡爪印','Felt paw prints on a platform.')]},
  ]),
  sec('films',b('先看它怎么运作','See it at work.'),b('演示视频走完一次完整流程：给猫戴上项圈、记录轨迹、推测站点位置，再到站点部署和日常照护。制作视频记录了站点在工坊里搭建的过程。','The demo walks through the full loop: collaring a cat, recording its route, inferring where a station should go, then deploying and caring for it. The making-of shows the stations being built in the workshop.'),[
   {type:'video',title:b('猫友迹演示','PawPals demo'),src:'/assets/video/pawpals-demo.mp4',poster:'pp-poster-demo'},
   {type:'video',title:b('站点制作过程','Building the stations'),src:'/assets/video/pawpals-making.mp4',poster:'pp-poster-making'},
  ]),
  sec('context',b('流浪猫需要的，不只是一次喂养','Stray cats need more than a meal.'),b('截至 2021 年，中国约有 5300 万只流浪猫，资源匮乏、恶劣天气、虐待和无人看管威胁着它们。学生社群主导的 TNR（捕捉、绝育、放归）能控制数量，却缺少「发现」这一环：没有人知道新的流浪猫会在哪里出现。','China had about 53 million stray cats in 2021, threatened by scarce food, bad weather, abuse and neglect. Student-led TNR (trap, neuter, return) keeps numbers down, but it lacks a discovery step: nobody knows where new strays will turn up.'),[
   board('pp-board-origin','选题由来：流浪猫的种群特点、领地意识，以及它们面临的四种危险','Why stray cats: their population traits, territorial habits and the four dangers they face.'),
   board('pp-board-intervention','以「有良犬」为例的现有干预流程：发现、喂养、医治、TNR，再靠周边和活动筹款。右侧是 TNR 为什么有效，以及如何补上发现环节。','The current intervention process, using the Youliangquan group as an example: find, feed, treat and TNR, funded by merchandise and events. On the right: why TNR works and how to add a discovery step.'),
  ]),
  sec('system',b('一张星座图，连接猫、人和设备','A constellation of cats, people and devices.'),b('以「星座」为隐喻梳理利益相关者：工作人员、志愿者、宠物医生和保护组织围绕流浪猫形成主星座，穿戴设备和站点各自构成次星座。服务蓝图把前期准备、站点部署、流浪猫管控和日常维护串成一条流程。','A constellation metaphor maps the stakeholders: staff, volunteers, vets and welfare groups orbit the cats, while the wearables and stations form sub-constellations. The service blueprint links preparation, station deployment, cat management and daily care into one flow.'),[
   board('pp-board-stakeholders','利益相关者地图：猫友迹星座、穿戴设备次星座和站点次星座，以及与 MTHD、OOO、ANT 理论的对应','Stakeholder map: the PawPals constellation, the wearable and station sub-constellations, and how they map to MTHD, OOO and ANT.'),
   board('pp-board-blueprint','服务蓝图：流浪猫行为、工作人员、后台、技术和支持五条泳道，跨越四个阶段','Service blueprint: five lanes (cat behaviour, staff, back office, technology and support) across four phases.'),
  ]),
  sec('platform',b('让每个人都能找到参与的方式','A way in for everyone.'),b('想了解猫的近况、想摸猫、愿意认领站点，或只是路过，四类人各有一条旅程。平台围绕校园地图、站点、任务、等级和社区组织信息，用持续激励、日常激励和惩罚机制让参与延续下去。','People who want news of the cats, want to pet them, will adopt a station or are just passing by each get their own journey. The platform is organised around a campus map, stations, tasks, levels and a community, with ongoing rewards, daily rewards and penalties to keep people involved.'),[
   {type:'media',layout:'ui-pair',items:[
    img('pp-ui-desktop','网页端：等距视角的校园地图，标出有猫和无猫的站点，右侧是认领站点的任务和监控画面','Web: an isometric campus map marking stations with and without cats, with tasks and the live camera for an adopted station on the right.','screen'),
    img('pp-ui-phones','手机端：地图、成长中心、社区和站点任务','Mobile: map, progress centre, community and station tasks.','screen')]},
   board('pp-board-journey','用户旅程：四类用户从打开 App 到分享，认领站点的人完成任务后获得奖励','User journeys: four kinds of user from opening the app to sharing; station adopters earn rewards for completed tasks.'),
   board('pp-board-ia','平台信息架构与激励措施：持续完成激励、日常激励，以及未完成任务的惩罚','Information architecture and incentives: rewards for streaks and daily tasks, and penalties for unfinished ones.'),
  ]),
  sec('wearable',b('把定位装进一条项圈','Tracking, in a collar.'),b('定位设备基于 ESP32-C3 和多模 GNSS 模块，用定时唤醒的睡眠机制降低功耗，把解析后的 NMEA 数据写入 TF 卡，再在地图上画出轨迹。形态从背包式 PCB 迭代到 FPC 柔性项圈：在四只流浪猫上测试，柔性版本戴得更快，猫也更少抗拒。','The tracker pairs an ESP32-C3 with a multi-mode GNSS module and sleeps between timed wake-ups to save power. It parses NMEA data to a TF card and plots the route on a map. The form moved from a backpack PCB to a flexible FPC collar: tested on four stray cats, the flexible version went on faster and met less resistance.'),[
   {type:'heading',text:b('硬件','Hardware')},
   {type:'media',layout:'gallery',items:[
    img('pp-hw-devboard','第一版：ESP32 开发板接 GNSS 天线，验证定位读数','First build: an ESP32 dev board with a GNSS antenna, checking position readings.'),
    img('pp-hw-pcb','自绘 PCB：主控、GNSS 模块和 TF 卡集成在一块板上','Custom PCB: controller, GNSS module and TF card on one board.'),
    img('pp-hw-battery','另一版定位板连着锂电池','Another tracking board connected to a lithium battery.')]},
   board('pp-board-gps','技术测试：GPS 测试代码、原型实物、NMEA 数据解析，以及在校园地图上可视化的轨迹','Technical tests: GPS test code, the prototype, NMEA parsing and the route plotted on a campus map.'),
   board('pp-board-hardware','硬件选型与算法：ESP32-C3、ATGM336H GNSS 模块、锂电管理和 TF 卡；右侧是唤醒、定位、写卡、睡眠的循环流程','Hardware and algorithm: ESP32-C3, ATGM336H GNSS, battery management and TF storage; on the right, the wake, locate, write and sleep cycle.'),
   {type:'heading',text:b('佩戴测试','Fitting tests')},
   {type:'media',layout:'gallery',items:[
    img('pp-test-grey','背包式原型戴在一只灰猫背上','The backpack prototype on a grey cat.'),
    img('pp-test-backpack','在桌面上给橘猫系上背包式原型','Fastening the backpack prototype on a ginger cat at a table.'),
    img('pp-test-walk','橘猫戴着柔性项圈走动','A ginger cat walking in the flexible collar.'),
    img('pp-test-fpc','FPC 柔性项圈：电路做在柔性板上，末端是魔术贴','The FPC collar: circuitry on a flexible board, with Velcro at the end.'),
    img('pp-test-logo','项圈外侧印着猫友迹标识和说明文字','The outside of the collar carries the PawPals mark and a short note.'),
    img('pp-test-calico','一只花猫戴着柔性项圈','A calico cat wearing the flexible collar.')]},
   board('pp-board-research','用户测试：背包式版本让猫反抗、被绑住或翻到胸前；柔性项圈版本在四只猫身上都没有明显异常','User tests: the backpack version made cats resist, get tangled or slip to the chest; the flexible collar showed no clear problems on all four cats.'),
  ]),
  sec('station',b('给猫一个固定的落脚点','A steady place to come back to.'),b('流浪猫的活动路径围绕食物来源，偏好安静、隐蔽的角落。站点以「猫有塔」为主体，提供窝和食物，可以扩展「猫有架」和「猫有藏」。红外感应和摄像头记录猫的出入，再通过 ESP-NOW 远程通讯把状态同步到平台。','Stray cats move around food sources and prefer quiet, hidden corners. Each station centres on a cat tower with a bed and food, and can grow with shelves and hideaways. An infrared sensor and camera log comings and goings, and ESP-NOW links send the status to the platform.'),[
   board('pp-board-behaviour','行为学与功能分析：觅食、捕猎、休憩、领地巡逻和社交对应的需求，以及主体和扩展模块','Behaviour and function: the needs behind foraging, hunting, resting, patrolling and socialising, and the core and extension modules.'),
   {type:'media',layout:'editorial',items:[
    img('pp-station-field','在河边草地上测试站点，用手机查看站点状态','Testing a station on the riverside lawn and checking its status on a phone.'),
    img('pp-station-espnow','站点上的 ESP-NOW 通讯盒，指示灯显示连接状态','The ESP-NOW box on a station; its lights show the link status.'),
    img('pp-station-sensor','站点内的红外传感器和屏幕','The infrared sensor and screen inside a station.')]},
   {type:'media',layout:'gallery',items:[
    img('pp-render-cluster','渲染：猫有塔、六边形平台和屏幕组成的完整站点','Render: a full station of towers, hexagonal platforms and a screen.','object'),
    img('pp-render-tower','渲染：猫有塔上的三角形标记和窝','Render: triangle markers and a bed on the cat tower.','object'),
    img('pp-render-hex','渲染：六边形平台下可以藏身的空间和毛线球','Render: hiding space and yarn balls under the hexagonal platforms.','object')]},
  ]),
 ],
};
