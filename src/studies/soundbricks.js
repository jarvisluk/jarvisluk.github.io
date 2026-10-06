// SoundBricks, rebuilt from the laid-out portfolio pages (Lu_Junrong_Portfolio.pdf, pp. 20–27) and the NAS originals.
// Media come from scripts/build_soundbricks.py; every caption describes what the image shows.
// Children and teachers at the centre stay anonymous: no faces, names or institution marks.
const b=(zh,en)=>({zh,en});
const img=(id,zh,en,kind='photo')=>({id,caption:b(zh,en),kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,...extra});
const board=(id,zh,en,layout='board')=>({type:'media',layout,items:[img(id,zh,en,'diagram')]});

export default {
 tone:{h:18,s:22,accent:'#f8c3a6',ink:'#c4613d'},
 accent:'#e3eedd',surface:'#fffcf9',hero:'sb-hero',heroStyle:'photo',
 heroCaption:b('SoundBricks：彩色亚克力积木插在带磁吸触点的底座上，每放上一块就响起一个声音','SoundBricks: coloured acrylic bricks on a base with magnetic contacts; each brick placed plays a sound.'),
 oneLiner:b('一套给自闭症儿童的声音积木：放上一块积木就响起一个声音，用刺激配对的方法干预重复刻板行为。','Sound bricks for autistic children: each brick placed plays a sound, using stimulus pairing to ease repetitive behaviours.'),
 credit:b('个人项目','Individual project'),
 showcase:[
  img('sb-towers','几组积木在底座上叠成高塔','Bricks stacked into towers on the base.'),
  img('sb-play-469','试玩中，孩子把三角屋顶放到搭好的房子上','During a play session, a child sets a triangle roof on the house they built.'),
  img('sb-houses','方块、长条和三角屋顶积木搭成的小房子','Little houses built from cubes, bars and triangular roofs.'),
  img('sb-glow','光线穿过透明亚克力，在桌面投下彩色的影子','Light through the clear acrylic casts coloured shadows on the table.'),
  img('sb-play-149','孩子伸手把积木放上底座，旁边的大人拿着图案卡片','A child reaches to place a brick on the base while an adult holds a pattern card.'),
  img('sb-five','五块颜色不同的方形积木，顶面是磁吸触点','Five bricks in different colours, with magnetic contacts on top.'),
  img('sb-hand','一块黄色积木刚好握在手里','A yellow brick that fits in one hand.'),
  img('sb-app-bricks','配套 App 和散放的积木','The companion app beside a spread of bricks.')],
 sections:[
  sec('outcome',b('一组会发声的积木','Bricks that make sound.'),b('积木有方块、长条和三角三种形状，透明彩色亚克力作为视觉刺激。底座通过磁吸触点读取每一块积木，放上就触发声音；配套 App 让家长挑选声音、生成搭建图案，也能一起参与。下面几张是孩子们在发展中心试玩时的画面。','The bricks come as cubes, bars and triangles, with clear coloured acrylic as a visual cue. The base reads each brick through magnetic contacts and plays a sound when it lands; the companion app lets parents choose sounds, generate building patterns and join in. The photos below come from play sessions at the development centre.'),[
   {type:'media',layout:'editorial',items:[
    img('sb-set','完整的一套：底座上插满各种形状的积木','The full set: bricks of every shape plugged into the base.'),
    img('sb-types','三种积木：方块、长条和三角','Three brick types: cubes, bars and triangles.'),
    img('sb-base','底座和四组叠起的积木','The base with four stacks of bricks.')]},
   {type:'media',layout:'gallery',items:[
    img('sb-play-213','孩子把彩色积木一块块插到底座上','A child plugs coloured bricks into the base one by one.'),
    img('sb-play-197','孩子低头比对手里的图案卡片','A child checks the pattern card in their hands.'),
    img('sb-play-293','老师拿着图案卡片，引导孩子照着搭','A teacher holds up a pattern card to guide the build.'),
    img('sb-play-245','几只小手拿着积木，准备放上底座','Small hands holding bricks, about to place them on the base.')]},
   board('sb-board-phones','SoundBricks App：创建图案、自定义声音、录制声音、社区分享和练习日历','The SoundBricks app: create patterns, customise and record sounds, share with the community and track practice on a calendar.'),
   {type:'media',layout:'pair',items:[
    img('sb-patterns','印着积木图案的透明卡片，每张对应一种搭法','Clear cards printed with brick patterns, one build per card.'),
    img('sb-pattern-book','图案手册和积木','The pattern book and bricks.')]},
  ]),
  sec('films',b('从原型到试玩','From prototype to play.'),b('视频从电路和程序调试开始，经过建模、切片、3D 打印、亚克力激光切割和焊接组装，然后在底板上演示拼搭与发声，最后是孩子们在教室里试玩。','The film starts with circuit and code testing, moves through modelling, slicing, 3D printing, laser-cut acrylic and soldering, then demonstrates building and sound on the base board, and ends with children playing in a classroom.'),[
   {type:'video',title:b('SoundBricks 演示视频','The Made of SoundBricks'),youtube:'G_39gM8YMLA',bilibili:'BV1QdVYzcEyg',poster:'sb-poster-making'},
  ]),
  sec('research',b('先理解孩子，再设计玩具','Understand the children before the toy.'),b('自闭症谱系障碍在 6 到 12 岁儿童中的患病率约 0.7%，重复刻板行为是主要特征之一。应用行为分析（ABA）和刺激—刺激配对（SSP）的研究显示，感官刺激的强化或消退能有效干预这些行为。我在杭州一家服务过 300 多名特殊儿童的发展中心观察课堂、访谈老师，发现现有训练大多只调动一种感官。','Autism affects about 0.7% of children aged 6 to 12, and restricted, repetitive behaviours are a core trait. Studies in applied behaviour analysis (ABA) and stimulus–stimulus pairing (SSP) show that reinforcing or extinguishing sensory stimuli can reduce them. At a Hangzhou development centre that has served over 300 children, I observed classes and interviewed teachers, and found most training engages only one sense.'),[
   board('sb-board-background','背景研究：自闭症的特征、ABA 的 ABC 行为模型、SSP 原理，以及 SSP 干预重复刻板行为的个案和实验流程','Background research: autism traits, the ABA behaviour chain, how SSP works, and case studies and procedure for SSP reducing repetitive behaviours.'),
   board('sb-board-field','发展中心的五类课堂：感统、个训、亲子、小组和社交课','The centre’s five class types: sensory integration, one-to-one, parent–child, group and social.'),
   {type:'quotes',items:[
    {text:b('越早越好。6 岁之前我们叫抢救性干预。现在诊断提前了，机构里最小的孩子只有一岁半。','The sooner the better. Before six we call it rescue intervention. Diagnosis comes earlier now; our youngest is only eighteen months.'),who:b('老师 B','Teacher B'),tag:b('感统训练','Sensory integration')},
    {text:b('家长先有感知，到医院咨询、机构咨询，做评估、入学、制定个别化教育计划，然后坚持持续、有效的干预，家校配合。','Parents notice, consult a hospital and the centre, then come assessment, enrolment and an individual education plan, followed by steady intervention with home and school working together.'),who:b('老师 A','Teacher A'),tag:b('机构负责人','Centre lead')},
    {text:b('如果孩子有认知落后，比如分不清蛋糕和水、理解差、表达不清，就要留意了。','If a child lags in cognition, can’t tell cake from water, understands little or can’t express themselves, you should pay attention.'),who:b('老师 B','Teacher B'),tag:b('早期迹象','Early signs')},
   ]},
   board('sb-board-toys','常用玩具与训练分析：一个玩具常在不同课堂里练多种能力，但训练大多是单一或弱多感官刺激。结论指向多感官、家长参与、6 岁前和重复行为四个方向。','Toys and training: one toy often trains several skills across classes, yet most training is single- or weakly multi-sensory. The conclusions point to multi-sensory play, parent involvement, before age six and repetitive behaviours.'),
  ]),
  sec('interaction',b('把动作和声音配成一对','Pair an action with a sound.'),b('积木要开放、色彩鲜艳、能叠放，适合 6 岁以下的孩子。放上一块积木就响起声音；如果孩子一直朝同一方向堆叠（重复行为出现），声音就停下。中性的声音与搭建动作配对，逐渐形成条件反射，让重复行为得以消退。','The bricks are open-ended, brightly coloured and stackable for under-sixes. Placing a brick triggers a sound; if a child keeps stacking the same way (a repetitive behaviour), the sound stops. Pairing a neutral sound with building builds a conditioned response that helps the behaviour fade.'),[
   board('sb-board-concept','积木上的 SSP：外观概念（开放、多刺激、可叠放、鲜艳）和交互逻辑','SSP on bricks: the appearance concept (open, multi-stimulus, stackable, bright) and the interaction logic.','board narrow'),
  ]),
  sec('prototype',b('让一个 ADC 引脚认出十块积木','One ADC pin, ten bricks.'),b('每块积木里有一个电阻，叠放时串联，底座用一个 ADC 引脚读出电压变化，就能知道放了几块。快拆磁吸触点让积木连接稳定又容易分开，这是读数稳定的关键。外壳 3D 打印，亚克力在打印中途嵌入。','Each brick holds a resistor; stacked bricks join in series, so one ADC pin on the base reads how many are placed. Quick-release magnetic contacts keep the joint firm yet easy to separate, which is what makes the reading stable. The shells are 3D printed, with the acrylic inserted mid-print.'),[
   board('sb-board-prototype','电路设计、磁吸触点、叠放三块积木时的 ADC 读数曲线，以及爆炸图','Circuit design, magnetic contacts, ADC readings as three bricks are stacked, and the exploded view.'),
   {type:'media',layout:'gallery',items:[
    img('sb-proc-acrylic','彩色亚克力片、磁铁和热熔胶枪','Coloured acrylic sheets, magnets and a glue gun.'),
    img('sb-proc-shell','早期外壳：橙色亚克力嵌在白色打印件里','An early shell: orange acrylic set into a white print.'),
    img('sb-proc-circuit','积木内部的电阻和导线','The resistor and wiring inside a brick.'),
    img('sb-proc-base','底座背面的接线','Wiring on the underside of the base.'),
    img('sb-proc-wiring','底座接上开发板测试读数','The base wired to a dev board to test readings.'),
    img('sb-proc-reading','焊接电路，电脑上看实时读数','Soldering, with live readings on the laptop.')]},
  ]),
  sec('digital',b('游戏的另一半，在屏幕上','The other half of play.'),b('App 串起选择声音、生成图案、搭建和分享：先为孩子找到最合适的声音，再生成二维图案，孩子可以搭成不同高度，但正面图案保持一致。定期提醒帮助家长坚持配对练习。','The app links choosing a sound, generating a pattern, building and sharing. It first finds the sound that suits the child, then generates a 2D pattern the child can build at any height while keeping the same front. Reminders help parents keep up the pairing practice.'),[
   board('sb-board-app','App 控制流程、信息架构、配色字体和线框图','App control flow, information architecture, colours, type and wireframes.'),
  ]),
  sec('testing',b('让测试改变设计','Let testing change the design.'),b('第一轮让 9 个 4 到 20 岁的孩子照图案搭建：他们喜欢这个玩具，但图案太难，重复行为没有出现，声音也被忽略。第二轮去掉图案，只用一种积木测试五种声音：孩子开始注意声音，很多人提到钢琴声，因为他们都学过钢琴。于是加入自定义声音，并让三角积木挡住竖直叠放，打断重复行为。','In round one, nine children aged 4 to 20 built from patterns: they liked the toy, but the patterns were too hard, no repetitive behaviour appeared and the sound went unnoticed. Round two dropped the patterns and tested five sounds with one brick type: the children noticed the sound, and many named the piano, which they had all learned. So custom sounds were added, and triangle bricks now block vertical stacking to interrupt repetition.'),[
   board('sb-board-test-1','第一次测试：孩子照图案搭建；结论是有吸引力、适合多种课堂，但太难、重复行为没出现、声音被忽略','First test: building from patterns. It was attractive and fit many classes, but too hard; no repetitive behaviour appeared and the sound was ignored.'),
   board('sb-board-test-2','第二次测试：去掉图案、专注声音；结论是声音被注意到，钢琴声最常被提到，需要自定义声音，三角积木可以打断重复行为','Second test: no patterns, just sound. The sound was noticed, piano came up most, custom sounds are needed, and triangles can interrupt repetition.'),
  ]),
 ],
};
