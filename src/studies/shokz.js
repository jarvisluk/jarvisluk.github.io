// Shokz OpenSwim Pro 2 companion app, from the Figma presentation boards (file Jf4N724rkfcY67QNLaTnC7, Section 12)
// and the audio-import interaction specs (7.2.3.1 Wi-Fi connection, 7.2 audio import final).
// Media come from scripts/build_shokz.py; the Wi-Fi flow comparison is public/embeds/shokz/wifi.
// Copy explains decisions; the boards already show the screens.
const b=(zh,en)=>({zh,en});
const img=(id,zh,en,kind='diagram')=>({id,caption:b(zh,en),kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,...extra});
const board=(id,zh,en)=>({type:'media',layout:'board',items:[img(id,zh,en)]});

export default {
 tone:{h:210,s:30,accent:'#cfe1f5',ink:'#2f6ebf'},
 accent:'#e9f0f5',surface:'#ffffff',hero:'sk-home',heroStyle:'board',
 heroCaption:b('首页：蓝牙模式与本地模式','Home in Bluetooth and local mode.'),
 oneLiner:b('OpenSwim Pro 2 是一副能在水下用的骨传导耳机，既能连手机，也能脱离手机播放自带的音乐。配套 App 要解决的，是在下水之前把音乐、训练和网络都准备好。','OpenSwim Pro 2 are bone-conduction headphones made for the water: they play from a phone or, without one, from their own storage. The companion app’s job is to get music, training and the network ready before you get in the pool.'),
 credit:b('韶音 Shokz · App 界面设计','Shokz · App interface design'),
 sections:[
  sec('homepage',b('先分清，耳机在用哪种方式工作','First, which mode are the headphones in?'),b('同一副耳机有两种完全不同的用法：连着手机听，和在泳池里脱离手机听本地音乐。很多操作只在其中一种模式下成立，所以首页先把模式讲清楚，再把两种场景里最常用的入口放在第一屏，减少来回找的步骤。','The same headphones are used in two very different ways: streaming from a phone, or playing their own music in the pool with no phone nearby. Many actions only make sense in one of them, so the home screen settles the mode first, then puts the most-used entry points for both on the first screen.'),[
  ]),
  sec('training',b('训练在岸上设好，水里只用按键','Set up on land, control by button in the water.'),b('游泳时手机不在身边，屏幕也没法操作。所以训练的选择和参数都放在下水前完成，水里长按耳机的模式键就能结束训练，不必再碰手机。','There is no phone, and no usable screen, in the pool. Training is chosen and configured before getting in; in the water, a long press on the headphones’ mode button ends the workout without touching the phone.'),[
   board('sk-training','自由训练与课程训练','Free and course training.'),
  ]),
  sec('player',b('按场景选音效，而不是调频段','Sound by situation, not by frequency.'),b('用户不会在泳池边研究均衡器。音效按“在哪里、听什么”来命名：日常听歌、听课和有声书、戴耳塞游泳，选一个就好。播放页把切歌、列表和音效放在一起，因为它们常常在同一个时刻被用到。','Nobody tunes an equaliser at the poolside. Sound modes are named by situation (everyday music, lectures and audiobooks, swimming with earplugs) so choosing is one tap. The player keeps track list, skipping and sound mode together because they tend to be needed at the same moment.'),[
   board('sk-player','播放页与音效模式','The player and sound modes.'),
  ]),
  sec('data',b('进步要靠对比才看得出','Progress shows up in comparison.'),b('单次游泳的数字意义有限，配速和 SWOLF 的变化要放在多次训练之间看。数据因此分成三层：最近一次和个人最佳给即时反馈，单次详情按分组拆开，长期汇总按日、周、月、年对比。','A single swim says little on its own; pace and SWOLF only mean something across sessions. So the data has three layers: the latest swim and personal bests for instant feedback, per-set detail for a single session, and day-to-year totals for the long view.'),[
   board('sk-data','运动数据的三个层级','Three layers of workout data.'),
  ]),
  sec('import',b('本地模式的前提：先把歌放进耳机','Local mode starts with getting music on board.'),b('脱离手机播放，意味着歌必须提前存进耳机。音乐可能来自 QQ 音乐、手机文件或电脑，每种来源的限制都不同，所以三种方式并列给出，导入时直接选好放进哪个文件夹。其中 QQ 音乐导入要求耳机自己联网，条件最多、最容易出错，也是下一节优化的对象。','Playing without a phone means the music must already be on the headphones. It can come from QQ Music, phone files or a computer, each with different limits, so all three are offered side by side and the target folder is chosen during import. Importing from QQ Music needs the headphones to get online by themselves; it has the most conditions and the most ways to fail, and it is what the next section reworks.'),[
   board('sk-import','三种导入方式','Three ways to import.'),
  ]),
  sec('wifi',b('优化：让耳机顺利连上网','Reworked: getting the headphones online.'),b('第一版配网照搬了常见的物联网做法：手动输入网络名称和密码，热点另走一套页面，连接失败时只有一句“连接失败”。问题在于，5GHz 网络、公共 Wi-Fi、电量不足这些条件，要等连接失败后才会暴露，失败页也不说明原因。终版把判断前移，并让每一种失败都能给出下一步。','The first version followed the usual IoT pattern: type the network name and password, a separate set of screens for the hotspot, and a bare “Connection failed” whenever something went wrong. Conditions such as 5GHz or public Wi-Fi or a low battery only surfaced after a failed attempt, and the failure screens didn’t say why. The final version moves those checks up front and gives every failure a next step.'),[
   {type:'embed',src:'/embeds/shokz/wifi/index.html',height:800,title:b('配网流程优化前后对比','Wi-Fi setup flow, before and after')},
  ],{points:[b('条件前置：开始前就讲清网络和电量要求，不满足的直接拦下','Requirements first: network and battery limits are stated up front, and unmet ones stop the flow early.'),b('选择代替输入：只列耳机连得上的网络，已保存的自动填密码；热点并入同一页','Choose instead of type: only joinable networks are listed, saved ones fill their password, and the hotspot joins the same page.'),b('按原因归类错误：同类原因用同一条提示，并说明该做什么','Errors grouped by cause: one message per cause, each saying what to do.')]}),
  sec('courses',b('官方课程降低门槛，自定义留给老手','Official courses to start, custom ones for regulars.'),b('不知道怎么练的人，可以直接跟一节官方课程；有固定计划的人，可以自己编排热身、主项和重复次数。两者最后都发送到耳机，由耳机在水里提示，游的时候不需要看手机。','People without a plan can follow an official course; swimmers with their own routine can build warm-ups, main sets and repetitions. Either way the session is sent to the headphones, which guide the swim, so the phone stays out of the water.'),[
   board('sk-courses','课程库与课程编辑','The course library and course editing.'),
  ]),
  sec('tracks',b('保留来源，也照顾听的顺序','Keep the source, shape the listening order.'),b('导进来的歌来源不一，按文件夹浏览能保留它们从哪里来；但运动时更关心接下来听什么，所以另有歌单负责顺序。存储空间和过期曲目直接标出，避免在泳池边才发现歌放不了。','Imported songs come from different places, and folders keep that origin visible. During a workout what matters is what plays next, so playlists handle the order. Storage space and expired tracks are flagged up front, so nobody finds out at the poolside that a song won’t play.'),[
   board('sk-library','全部、文件夹与歌单','All songs, folders and playlists.'),
  ]),
 ],
};
