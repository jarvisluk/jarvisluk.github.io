// Just A 2nd, rebuilt from the App Store listing (id6756837888, v1.2), portfolio p. 19 and the app's source
// (github.com/jarvisluk/pitchlab-swift). Media come from scripts/build_just_a_2nd.py; every caption describes what the image shows.
const b=(zh,en)=>({zh,en});
const img=(id,zh,en,kind='photo')=>({id,caption:b(zh,en),kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,...extra});
const phones=(...items)=>({type:'media',layout:'phones',items:items.map(([id,zh,en])=>img(id,zh,en,'screen'))});
const tile=(id,zh,en,layout='board')=>({type:'media',layout,items:[img(id,zh,en,'diagram')]});

export default {
 tone:{h:22,s:30,accent:'#ffc7a3',ink:'#de6f2e'},
 accent:'#ffe1cc',surface:'#ffffff',hero:'j2-board',heroStyle:'board',
 heroCaption:b('作品集中的 Just A 2nd：首页、听辨练习和错题本三个界面','Just A 2nd in the portfolio: the home, listening exercise and mistakes screens.'),
 oneLiner:b('一个口袋里的音程听辨训练 App：每天花几秒钟听两个音、选出音程，告别枯燥的乐理练习。已在 App Store 上架。','A pocket-sized ear trainer: spend a few seconds a day hearing two notes and naming the interval, instead of dull music-theory drills. Available on the App Store.'),
 credit:b('个人项目','Individual project'),
 showcase:[
  img('j2-show-trio','App Store 截图：首页、听辨练习和错题本','App Store screenshots: home, listening exercise and mistakes.'),
  img('j2-show-feedback','答对显示“稳。”，答错会告诉你正确的音程。','A right answer gets “Solid.”; a wrong one shows the correct interval.'),
  img('j2-show-dark','深色模式下的练习界面','The exercise screen in dark mode.'),
  img('j2-show-ipad','iPad 上的练习和错题本','The exercise and mistakes on iPad.'),
  img('j2-show-mac','在 Mac 上运行的练习界面','The exercise running on a Mac.'),
  img('j2-show-settings','设置页的浅色与深色版本','The settings screen in light and dark.')],
 sections:[
  sec('practice',b('听两个音，说出它们的距离','Hear two notes, name the gap.'),b('点一下播放，App 依次弹出两个音，你从几个音程里选一个。答对它会说“稳。”“基本操作。”，答错会告诉你“手滑了吧？应该是纯五度”，再给出这两个音的音名。一题只要几秒，所以随手就能来几题。','Tap play, hear two notes in turn and pick the interval from a few options. Get it right and the app says “Solid.” or “Basic stuff.”; get it wrong and it says “Slipped? It was a Perfect 5th”, with the two note names. Each question takes seconds, so a few fit anywhere.'),[
   phones(['j2-ui-listen','听：点播放键，仔细听','Listen: tap play and listen closely.'],['j2-ui-correct','答对：“稳。”，正确选项变绿。','Right: “Solid.”, and the answer turns green.'],['j2-ui-wrong','答错：标出你的选择和正确答案，并显示两个音的音名','Wrong: your choice and the right answer are marked, with both note names.']),
  ],{steps:[b('聆听','Listen'),b('判断','Choose'),b('反馈','Feedback')]}),
  sec('sound',b('音准，按纯律来','Tuned in just intonation.'),b('每题的根音在 C3 到 C5 之间随机，第二个音按纯律的频率比生成（纯五度 3:2、大三度 5:4），所以听到的是干净、不打架的音程。音色是带起音和释音包络的正弦波，避免爆音。除了音程，还有大三和弦与小三和弦的听辨模式。','Each root note is random between C3 and C5, and the second note follows just-intonation ratios (3:2 for a perfect fifth, 5:4 for a major third), so intervals sound clean rather than beating. The tone is a sine wave with an attack and release envelope to avoid clicks. Besides intervals there is a mode for major and minor chords.'),[
  ],{points:[b('简单：大三度、纯五度、八度','Easy: major 3rd, perfect 5th, octave.'),b('中等：再加上小三度、纯四度、大六度','Medium: adds minor 3rd, perfect 4th and major 6th.'),b('困难：全部 12 个音程','Hard: all twelve intervals.')]}),
  sec('habit',b('每天几秒钟，养成习惯','A few seconds, every day.'),b('首页只问一句“有空吗？”：每日目标默认 10 题，下面是连续打卡和累计题数，再往下是活跃度方格。每日提醒的文案也很轻：“来都来了，听两个？”“也就是个二度的事儿。”','The home screen just asks “Got a second?”: a daily goal of ten questions by default, your streak and total below it, then an activity grid. Daily reminders keep it light: “You’re here anyway, listen to a couple?” “Just a second.”'),[
   phones(['j2-ui-home','首页：每日目标、连续打卡、累计题数和活跃度','Home: daily goal, streak, total and activity.'],['j2-ui-progress','完成第一题后，目标进度和打卡数更新','After the first question, goal progress and the streak update.'],['j2-ui-stats','统计：每天的正确率和答对题数','Statistics: daily accuracy and correct answers.']),
  ]),
  sec('mistakes',b('让错题，成为下一次练习','Learn from mistakes.'),b('每道答错的题都会记下音程、日期和两个音，在错题本里点一下喇叭就能重新听一遍，把容易混的音程多听几次。','Every miss is saved with the interval, the date and both notes; tap the speaker in Mistakes to hear it again and replay the intervals you tend to confuse.'),[
   phones(['j2-ui-mistakes','错题本：每条记录音程、日期和两个音，可以重听','Mistakes: each entry has the interval, date and notes, with replay.'],['j2-ui-settings','设置：每日目标、提醒和 iCloud 同步','Settings: daily target, reminders and iCloud sync.']),
  ]),
  sec('platforms',b('iPhone、iPad、Mac，浅色与深色','iPhone, iPad, Mac, light and dark.'),b('同一套 SwiftUI 界面适配 iPhone 和 iPad，也能在 Mac 上运行；深色模式下，橙色的光晕仍然是视觉中心。练习记录通过 iCloud 在设备之间同步。','One SwiftUI interface adapts to iPhone and iPad and also runs on the Mac; in dark mode the orange glow stays at the centre. Practice history syncs across devices through iCloud.'),[
   {type:'media',layout:'pair',items:[img('j2-show-ipad','iPad 上的练习和错题本','The exercise and mistakes on iPad.'),img('j2-show-mac','在 Mac 上运行的练习界面','The exercise running on a Mac.')]},
   phones(['j2-ui-dark-home','深色首页','Home in dark mode.'],['j2-ui-dark-listen','深色练习界面','The exercise in dark mode.'],['j2-ui-dark-wrong','深色模式下答错的反馈','Wrong-answer feedback in dark mode.']),
  ]),
  sec('build',b('从原型，到上架','From prototype to the App Store.'),b('我先用网页做了听辨练习的原型，再用 SwiftUI 重写成原生 App：AVAudioEngine 实时合成音频，StoreKit 提供一次性的 Pro 解锁（中等、困难难度和自定义目标），界面支持中文和英文。App 于 2026 年 1 月在 App Store 上架，目前是 1.2 版。','I first prototyped the listening exercise on the web, then rebuilt it as a native SwiftUI app: AVAudioEngine synthesises the audio in real time, StoreKit offers a one-time Pro unlock (medium and hard levels plus custom goals), and the interface is in Chinese and English. It launched on the App Store in January 2026 and is now at version 1.2.'),[
  ],{points:[b('SwiftUI · AVAudioEngine 实时合成','SwiftUI · real-time AVAudioEngine synthesis'),b('StoreKit Pro 解锁 · iCloud 同步 · 每日提醒','StoreKit Pro unlock · iCloud sync · daily reminders'),b('中英双语 · App Store 1.2 版','Chinese and English · App Store v1.2')]}),
 ],
};
