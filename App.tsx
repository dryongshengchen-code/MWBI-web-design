
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { ZenChat } from './components/ZenChat';
import { EventCalendar } from './components/EventCalendar';
import { SharingSection } from './components/SharingSection';
import { UserDashboard } from './components/UserDashboard';
import { DonationMarketplace } from './components/DonationMarketplace';
import { DonationCart } from './components/DonationCart';
import { DonationCheckout } from './components/DonationCheckout';
import { VolunteerForum } from './components/VolunteerForum';
import { Section, User, DonationItem, EventItem, SharingItem, CartItem, ForumPost } from './types';

// Mock Data for Donations
const donationItems: DonationItem[] = [
  {
    id: 'light',
    title: '全年光明灯 (Light Offering)',
    description: '燃灯供佛，破除黑暗，增长智慧。祈愿阁下及阖家福慧增长，前途光明，事事顺遂。($100/年)',
    minAmount: 100,
    image: 'https://manjuwisdom.org/wp-content/uploads/2025/01/kongmengteng.jpg',
    category: 'dharma'
  },
  {
    id: 'buddha',
    title: '供养琉璃佛像 (Crystal Buddha)',
    description: '庄严道场，供养万尊琉璃佛像。功德主芳名将永久留存于佛像座下，千秋万代，福泽绵长。',
    minAmount: 500,
    image: 'https://manjuwisdom.org/wp-content/uploads/2025/01/%E4%BD%9B%E5%83%8F1%E5%B0%8A-scaled.jpg',
    category: 'construction',
    allowInstallment: true,
    imagePosition: 'top'
  },
  {
    id: 'academy',
    title: '佛学教育助学金',
    description: '支持寺院课程开发、经典翻译与贫困学生学费减免，培育僧才与弘法人才。',
    minAmount: 50,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    category: 'academy'
  },
  {
    id: 'general',
    title: '建寺安僧与弘法基金',
    description: '护持道场日常运作，安顿僧众生活，举办弘法利生之活动，维护道场庄严。',
    minAmount: 20,
    image: 'https://images.unsplash.com/photo-1598555235282-53603d6f1473?auto=format&fit=crop&q=80&w=800', // Updated to reliable image
    category: 'charity'
  },
  {
     id: 'flower',
     title: '佛前供花 (Flower Offering)',
     description: '愿此香花云，遍满十方界。供养佛前花，以此功德庄严身相，人见欢喜。',
     minAmount: 30,
     image: 'https://manjuwisdom.org/wp-content/uploads/2024/05/%E8%8A%B1-300x300.jpg?auto=format&fit=crop&q=80&w=800',
     category: 'dharma'
  },
  {
     id: 'brick',
     title: '建寺功德砖',
     description: '添砖加瓦，共建如来之家。每一块砖都是您护持正法的见证。',
     minAmount: 100,
     image: 'https://pei.gebis.org/wp-content/uploads/2022/08/%E5%82%B3%E7%87%88%E7%93%A6icon.jpg?auto=format&fit=crop&q=80&w=800',
     category: 'construction'
  }
];

// Helper to generate events for current month for demo purposes
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const pad = (n: number) => String(n).padStart(2, '0');

const mockEvents: EventItem[] = [
  {
    id: 'e1',
    title: '周日共修法会',
    date: `${year}-${pad(month)}-03`,
    time: '09:30 AM - 11:30 AM',
    location: '大雄宝殿',
    description: '讽诵《金刚经》，佛前大供，开示。欢迎大众参加，同沾法喜。',
    category: 'ceremony'
  },
  {
    id: 'e2',
    title: '初级禅修班',
    date: `${year}-${pad(month)}-05`,
    time: '07:00 PM - 09:00 PM',
    location: '禅堂',
    description: '教授基础坐禅方法（数息观），调身调息，放松身心。',
    category: 'meditation'
  },
  {
    id: 'e3',
    title: '佛学基础讲座',
    date: `${year}-${pad(month)}-08`,
    time: '02:00 PM - 04:00 PM',
    location: '般若讲堂',
    description: '讲题：缘起法与现代生活。主讲：慧明法师。',
    category: 'class'
  },
  {
    id: 'e4',
    title: '周日共修法会',
    date: `${year}-${pad(month)}-10`,
    time: '09:30 AM - 11:30 AM',
    location: '大雄宝殿',
    description: '讽诵《药师经》，祈愿众生身心康泰。',
    category: 'ceremony'
  },
  {
    id: 'e5',
    title: '观音菩萨圣诞法会',
    date: `${year}-${pad(month)}-19`,
    time: '09:00 AM - 02:00 PM',
    location: '大雄宝殿',
    description: '恭祝观世音菩萨圣诞，举行大悲忏法会，以此功德回向世界和平。',
    category: 'festival'
  },
  {
    id: 'e6',
    title: '八关斋戒',
    date: `${year}-${pad(month)}-25`,
    time: '08:00 AM - 08:00 PM',
    location: '大觉寺全区',
    description: '一日一夜，受持八条戒律，体验出家生活，积集出世资粮。需提前报名。',
    category: 'ceremony'
  }
];

const initialSharingItems: SharingItem[] = [
  {
    id: 's1',
    title: '在忙碌都市中找到内心的宁静',
    author: '王慧心',
    date: '2024-03-15',
    tag: '禅修心得',
    image: 'https://picx.zhimg.com/70/v2-34c331d278c42ee3f8babad87000c160_1440w.avis?source=172ae18b&biz_tag=Post?auto=format&fit=crop&q=80&w=800',
    content: '以前总觉得工作压力大，透不过气。自从参加了大觉寺的初级禅修班，学会了每天花十分钟观照呼吸。虽然时间不长，但这短暂的宁静让我学会了抽离，不再被情绪牵着走。感恩师父的慈悲开示，让我明白了"活在当下"不仅仅是一句口号，而是一种可以实践的生活方式。',
    reactions: { sadhu: 12, rejoice: 5, zen: 3 }
  },
  {
    id: 's2',
    title: '《广论》学习改变了我的家庭关系',
    author: '李志强',
    date: '2024-02-28',
    tag: '课程感悟',
    image: 'https://p5.itc.cn/q_70/images03/20231214/80ee620c99e540fcac8066f10f6d475b.jpeg?auto=format&fit=crop&q=80&w=800',
    content: '在学习《菩提道次第广论》关于"念死无常"和"业果"的章节后，我开始反思自己对待家人的态度。以前总是理所当然地觉得父母应该理解我，妻子应该支持我。现在我明白，因缘和合才能成为一家人，应该倍加珍惜。现在的我，更愿意倾听，更愿意付出，家里的笑声也变多了。',
    reactions: { sadhu: 20, rejoice: 8, zen: 10 }
  },
  {
    id: 's3',
    title: '义工初体验：在大寮洗碗的修行',
    author: '张明',
    date: '2024-01-20',
    tag: '义工日志',
    image: 'https://image.presslogic.com/girls.presslogic.com/wp-content/uploads/2022/08/dc46fd6a-e1660214518888.jpg?auto=format&fit=crop&q=80&w=800',
    content: '第一次来大觉寺做义工，被分配到大寮（厨房）洗碗。刚开始觉得只是体力活，但师兄告诉我，"洗碗也是洗心"。每一次擦拭碗盘，都是在擦拭自己内心的尘垢。在那个下午，虽然身体疲惫，但看着几百个碗盘变得光亮如新，内心充满了前所未有的清净与喜悦。',
    reactions: { sadhu: 33, rejoice: 2, zen: 5 }
  },
  {
    id: 's4',
    title: '点一盏心灯，照亮前程',
    author: '陈美玲',
    date: '2024-01-01',
    tag: '法会随笔',
    image: 'https://contributions.gwbi.org/wp-content/uploads/2025/10/landingpage_2026%E5%85%89%E6%98%8E%E7%87%88.jpg?auto=format&fit=crop&q=80&w=800',
    content: '每年的新年，我都会来大觉寺点一盏光明灯。看着大殿里万灯齐明的壮观景象，内心无比震撼。那一刻，我祈愿的不仅仅是自己的一年顺遂，更希望这盏灯能照亮所有在黑暗中迷茫的众生。这一份善念，让我觉得今年的开始特别有意义。',
    reactions: { sadhu: 45, rejoice: 12, zen: 8 }
  },
  {
    id: 's5',
    title: '抄经的静定力量',
    author: '刘伟',
    date: '2023-12-10',
    tag: '修学日记',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800',
    content: '周末参加了抄经活动。当笔尖触碰到宣纸的那一刻，世界仿佛静止了。一笔一划地书写《心经》，"照见五蕴皆空"，慢慢地，脑海中的杂念随着墨迹沉淀下来。这种专注的力量，甚至延续到了我的工作中，让我处理事情更加从容不迫。',
    reactions: { sadhu: 15, rejoice: 4, zen: 2 }
  }
];

const initialForumPosts: ForumPost[] = [
  {
    id: 'f1',
    title: '【招募】观音诞法会需要现场引导义工',
    author: '弘法组',
    date: '2024-03-01',
    category: 'RECRUIT',
    content: '阿弥陀佛！下周日观音诞法会，预计人流较多，现急需5名师兄协助现场秩序引导及签到工作。时间：上午8:30-12:30。随喜发心！',
    replies: 5
  },
  {
    id: 'f2',
    title: '请问初级禅修班报名还有名额吗？',
    author: '慧心',
    date: '2024-03-05',
    category: 'QNA',
    content: '想带朋友一起参加下个月的禅修班，不知道是否还能报名？感恩。',
    replies: 2
  },
  {
    id: 'f3',
    title: '大寮清理积水，感恩几位师兄的付出',
    author: '后勤组',
    date: '2024-02-28',
    category: 'SHARING',
    content: '昨日暴雨，厨房后门有些积水。感恩张师兄、李师兄冒雨清理疏通，保证了道场的整洁。',
    replies: 12
  }
];

// Hero Background Images
const heroImages = [
  "https://pei.gebis.org/wp-content/uploads/2022/07/about-sec-pic-3.jpg?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1600609842388-3e449195d2c4?q=80&w=1920&auto=format&fit=crop", // Serene temple vibes
  "https://images.unsplash.com/photo-1592348529249-165f14844331?q=80&w=1920&auto=format&fit=crop"  // Another temple view
];

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.HOME);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<User>({ name: '', email: '', isLoggedIn: false });

  // Donation Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [donationStep, setDonationStep] = useState<'MARKETPLACE' | 'CART' | 'CHECKOUT'>('MARKETPLACE');

  // Sharing State
  const [sharingItems, setSharingItems] = useState<SharingItem[]>(initialSharingItems);

  // Forum State
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(initialForumPosts);

  // Hero Image Slider State
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogin = (name: string, email: string) => {
    setUser({ name, email, isLoggedIn: true });
    // If user was trying to access volunteer forum, they can stay there, otherwise go to dashboard
    if (currentSection !== Section.VOLUNTEER) {
      setCurrentSection(Section.USER_DASHBOARD); 
    }
  };

  const handleLogout = () => {
    setUser({ name: '', email: '', isLoggedIn: false });
    setCurrentSection(Section.HOME);
  };

  // Cart Functions
  const addToCart = (item: DonationItem, amount: number, quantity: number, isInstallment: boolean = false) => {
    setCart(prev => {
      const newItem: CartItem = {
        ...item,
        selectedAmount: amount,
        quantity: quantity,
        uniqueId: Date.now().toString() + Math.random().toString(),
        isInstallment
      };
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.uniqueId !== id));
  };

  const updateCartQuantity = (id: string, newQuantity: number) => {
    setCart(prev => prev.map(item => item.uniqueId === id ? { ...item, quantity: newQuantity } : item));
  };

  const clearCart = () => {
    setCart([]);
    setDonationStep('MARKETPLACE');
  };

  // Sharing Reaction Handler
  const handleReaction = (id: string, type: 'sadhu' | 'rejoice' | 'zen') => {
    setSharingItems(prev => prev.map(item => {
      if (item.id === id) {
        const currentReactions = item.reactions || { sadhu: 0, rejoice: 0, zen: 0 };
        return {
          ...item,
          reactions: {
            ...currentReactions,
            [type]: currentReactions[type] + 1
          }
        };
      }
      return item;
    }));
  };

  // Forum Post Handler
  const handleForumPost = (post: Omit<ForumPost, 'id' | 'date' | 'replies'>) => {
    const newPost: ForumPost = {
      ...post,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      replies: 0
    };
    setForumPosts(prev => [newPost, ...prev]);
  };

  const renderHome = () => (
    <div className="animate-fade-in">
      {/* Hero Section with Slider */}
      <div className="relative h-[85vh] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 z-10 bg-black/30" />
        
        {heroImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
             <img 
              src={img} 
              alt="Temple Architecture" 
              className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-in-out ${
                index === currentHeroIndex ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        ))}
        
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <div className="mb-6 animate-fade-in-up">
             <div className="inline-block p-4 border-2 border-white/30 rounded-full mb-4">
                <span className="text-white font-serif text-2xl tracking-[0.5em] ml-2">觉悟人生</span>
             </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 shadow-sm tracking-wide">
            多伦多大觉寺
          </h1>
          <p className="text-xl md:text-2xl text-monk-100 font-light mb-10 max-w-2xl leading-relaxed">
            Manju Wisdom Buddhist Institute<br/>
            <span className="text-base mt-2 block opacity-80">弘扬清净圆满佛教 · 建设快乐心灵家园</span>
          </p>
          <button 
            onClick={() => {
              setCurrentSection(Section.DONATE);
              setDonationStep('MARKETPLACE');
            }}
            className="px-8 py-3 bg-monk-600 hover:bg-monk-700 text-white rounded-full transition-all duration-300 text-lg tracking-wider shadow-lg hover:shadow-gold-500/20 border border-monk-500"
          >
            护持道场
          </button>
        </div>
        
        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentHeroIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-monk-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-monk-700 cursor-pointer" onClick={() => setCurrentSection(Section.ABOUT)}>
              <div className="text-4xl mb-4 text-monk-700">🏯</div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">寺院巡礼</h3>
              <p className="text-gray-600 leading-relaxed">了解大觉寺的历史传承与建筑风格，感受清净庄严的修行环境。</p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-monk-700 cursor-pointer" onClick={() => setCurrentSection(Section.ACADEMY)}>
              <div className="text-4xl mb-4 text-monk-700">📖</div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">佛学课程</h3>
              <p className="text-gray-600 leading-relaxed">深入经藏，智慧如海。提供系统的佛学课程与禅修指导。</p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-monk-700 cursor-pointer" onClick={() => setCurrentSection(Section.EVENTS)}>
              <div className="text-4xl mb-4 text-monk-700">🗓️</div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">法务行事</h3>
              <p className="text-gray-600 leading-relaxed">关注最新的法会、禅修及课程安排，共沾法益，同证菩提。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="bg-white min-h-screen animate-fade-in">
      <div className="bg-monk-100 py-16 text-center">
        <h2 className="text-4xl font-serif font-bold text-monk-900 mb-4">关于大觉</h2>
        <div className="w-20 h-1 bg-monk-600 mx-auto"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <img src="https://pei.gebis.org/wp-content/uploads/2022/04/%E6%8B%89%E7%AB%A0-1.jpg?auto=format&fit=crop&q=80&w=800" alt="Temple" className="w-full md:w-1/2 rounded-lg shadow-lg object-cover h-80" />
          <div className="md:w-1/2">
            <h3 className="text-2xl font-serif font-bold text-monk-800 mb-4">缘起与愿景</h3>
            <p className="text-gray-600 leading-loose mb-4">
              多伦多大觉寺（Manju Wisdom Buddhist Institute）成立于2015年，以弘扬《菩提道次第广论》为核心，致力于在现代生活中实践佛陀的悲智精神，同时是传承中华文化和净化心灵的重要平台。
            </p>
            <p className="text-gray-600 leading-loose">
              我们定期举办共修法会、传统节日庆典以及社区慈善活动，愿每一位走进大觉寺的人，都能在此找回内心的宁静与觉性。
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAcademy = () => (
    <div className="bg-white min-h-screen animate-fade-in">
      <div className="bg-slate-100 py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] opacity-50"></div>
        <h2 className="text-4xl font-serif font-bold text-slate-800 mb-4 relative z-10">佛学课程</h2>
        <p className="text-slate-600 relative z-10">开启智慧之门 · 探索生命真谛</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
           <div className="space-y-8">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-monk-600 pl-4">初级佛学班</h3>
                <p className="text-gray-600 mb-4">适合零基础学员，系统介绍佛教历史、基本教义（四圣谛、八正道）及基础礼仪。</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">招生中</span>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-monk-600 pl-4">经典导读班</h3>
                <p className="text-gray-600 mb-4">深入研读《金刚经》、《心经》、《法华经》等大乘经典，探究般若智慧。</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">每周六上课</span>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-monk-600 pl-4">禅修实修营</h3>
                <p className="text-gray-600 mb-4">通过坐禅、行香，学习调身、调息、调心，在动静之间体悟当下的力量。</p>
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">每月举办</span>
              </div>
           </div>
           
           <div className="relative h-full min-h-[400px]">
              <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover rounded-2xl shadow-xl" alt="Library" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 rounded-b-2xl text-white">
                <p className="font-serif text-lg">"深入经藏，智慧如海"</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-monk-50/30 font-sans text-gray-800">
      <Navbar 
        currentSection={currentSection} 
        onNavigate={(s) => {
          setCurrentSection(s);
          setDonationStep('MARKETPLACE');
          window.scrollTo(0,0);
        }}
        user={user}
        onAuthClick={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      <main>
        {currentSection === Section.HOME && renderHome()}
        {currentSection === Section.ABOUT && renderAbout()}
        {currentSection === Section.ACADEMY && renderAcademy()}
        {currentSection === Section.EVENTS && <EventCalendar events={mockEvents} />}
        {currentSection === Section.SHARING && (
          <SharingSection 
            items={sharingItems} 
            onReact={handleReaction} 
          />
        )}
        {currentSection === Section.VOLUNTEER && (
          <VolunteerForum 
            user={user} 
            onLoginClick={() => setIsAuthOpen(true)}
            posts={forumPosts}
            onPostCreate={handleForumPost}
          />
        )}
        {currentSection === Section.USER_DASHBOARD && <UserDashboard user={user} />}
        
        {/* Donation Flow Logic */}
        {currentSection === Section.DONATE && (
          <>
            {donationStep === 'MARKETPLACE' && (
              <DonationMarketplace 
                items={donationItems}
                onAddToCart={(item, amount, quantity, isInstallment) => {
                  addToCart(item, amount, quantity, isInstallment);
                }}
                onViewCart={() => setDonationStep('CART')}
                cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
              />
            )}
            
            {donationStep === 'CART' && (
               <DonationCart 
                  items={cart}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateCartQuantity}
                  onContinueShopping={() => setDonationStep('MARKETPLACE')}
                  onCheckout={() => setDonationStep('CHECKOUT')}
               />
            )}

            {donationStep === 'CHECKOUT' && (
               <DonationCheckout 
                  cartItems={cart}
                  onBack={() => setDonationStep('CART')}
                  onSuccess={() => clearCart()}
               />
            )}
          </>
        )}
      </main>

      <footer className="bg-monk-900 text-monk-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
          <div>
             <h4 className="text-white font-serif text-lg mb-4">多伦多大觉寺</h4>
             <p>Manju Wisdom Buddhist Institute</p>
             <p className="mt-4">123 Buddhist Way, Toronto, ON, Canada</p>
             <p>Tel: (416) 123-4567</p>
          </div>
          <div>
             <h4 className="text-white font-serif text-lg mb-4">开放时间</h4>
             <p>每日: 9:00 AM - 5:00 PM</p>
             <p>法会期间: 8:00 AM - 6:00 PM</p>
          </div>
          <div className="md:text-right">
             <p>© 2024 多伦多大觉寺 版权所有</p>
             <p className="mt-2 opacity-60">Web Design for Merit</p>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
      />

      <ZenChat />
    </div>
  );
};

export default App;
