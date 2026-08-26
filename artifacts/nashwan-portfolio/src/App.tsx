import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  Code2,
  ExternalLink,
  Globe2,
  Headphones,
  Mail,
  Menu,
  Palette,
  Quote,
  Sparkles,
  TrendingUp,
  UsersRound,
  X,
  type LucideIcon,
} from 'lucide-react';
import { SiFacebook, SiGithub, SiInstagram, SiWhatsapp } from 'react-icons/si';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

type Language = 'en' | 'ar';
type IconType = LucideIcon;

const queryClient = new QueryClient();

const copy = {
  en: {
    nav: { home: 'Home', about: 'About', services: 'Services', project: 'Project', contact: 'Contact', connect: "Let's connect" },
    eyebrow: 'Independent digital professional · 23',
    heroTitle: 'Nashwan Yousef',
    heroRole: 'Web Developer & Designer',
    heroLead: 'Building digital experiences that make an impact.',
    heroText: "I'm a multidisciplinary digital professional combining web development, design, communication, customer experience, and business skills to create modern digital experiences that connect ideas with people.",
    heroVisual: { site: 'nashwan.digital', scope: 'global / local', phrase: ['ideas', 'to people.'], code: '< create / connect / grow />' },
    work: 'View my work',
    connect: "Let's connect",
    available: 'Available for opportunities',
    scroll: 'Scroll to explore',
    aboutLabel: '01 / The person behind the work',
    aboutTitle: 'About me',
    aboutText: [
      "I'm Nashwan Yousef, a 23-year-old Web Developer and Designer with a multidisciplinary background spanning web development, design, public relations, customer service, and sales.",
      'I enjoy transforming ideas into meaningful digital experiences. My approach combines technical thinking, creativity, communication, and an understanding of people and business.',
      'This combination allows me to look at projects from multiple perspectives — technical, creative, commercial, and human.',
    ],
    stats: [['23', 'Years old'], ['5+', 'Professional areas'], ['1', 'Global platform']],
    servicesLabel: '02 / What I bring to the table',
    servicesTitle: 'What I do',
    servicesIntro: 'A flexible practice built around the full journey from first idea to lasting relationship.',
    services: [
      ['Web Development', 'Building modern, responsive, scalable websites and digital experiences.', Code2],
      ['Web Design', 'Creating elegant interfaces focused on usability, visual identity, and user experience.', Palette],
      ['Public Relations', 'Building professional relationships and creating meaningful communication with audiences and partners.', UsersRound],
      ['Customer Service', 'Understanding customer needs, solving problems, and delivering positive experiences.', Headphones],
      ['Sales', 'Understanding customer needs, communicating value, building trust, and creating business opportunities.', TrendingUp],
      ['Digital Solutions', 'Combining technology, creativity, and business thinking to create effective digital solutions.', Sparkles],
    ] as [string, string, IconType][],
    strengthsLabel: '03 / How I think',
    strengthsTitle: 'My strengths',
    strengthsIntro: 'The connective skills I bring to every brief, conversation, and digital experience.',
    strengths: ['Web Development', 'Web Design', 'UI/UX', 'Communication', 'Public Relations', 'Customer Service', 'Sales', 'Problem Solving', 'Creative Thinking', 'Business Awareness'],
    bringLabel: '03.5 / The complete picture',
    bringTitle: 'What I bring',
    bringIntro: 'Five perspectives that make the work more useful, human, and ready for the real world.',
    bring: [['Technology', 'Turning ideas into clear, responsive digital experiences.'], ['Design', 'Giving every interaction purpose, clarity, and a distinct point of view.'], ['Communication', 'Making ideas easier to understand, share, and remember.'], ['Customer Experience', 'Listening closely and shaping solutions around people.'], ['Business', 'Connecting creative decisions to useful, lasting outcomes.']] as [string, string][],
    projectLabel: '04 / A work in progress',
    projectTitle: 'Featured project',
    projectDescription: [
      'I am the developer of the global Travalorics Coffee platform, contributing to the development of a digital platform representing a modern global coffee concept.',
      'This project reflects my passion for combining technology, creativity, business, and digital experiences into one meaningful platform.',
    ],
    projectVisual: { kicker: 'Travalorics / Coffee', scope: 'Global', title: ['A world', 'worth tasting.'], platform: '01 — Platform' },
    projectLogoAlt: 'Travalorics Coffee logo',
    visit: 'Visit website',
    projectCaption: 'A global coffee concept, translated into a digital platform.',
    visionLabel: '05 / My point of view',
    visionTitle: 'My vision',
    visionText: 'My vision is to continue growing as a professional who combines technology, creativity, communication, and business.',
    visionTextTwo: 'I want to build digital experiences that connect people, businesses, and ideas.',
    visionTextThree: 'I believe a website is more than a collection of pages. It is an opportunity to tell a story, build trust, create an experience, and leave a lasting impression.',
    contactLabel: '06 / Start a conversation',
    contactTitle: "Let's connect",
    contactText: "Whether you are looking for a Web Developer, Web Designer, Public Relations professional, Customer Service specialist, or Sales Representative, I'm open to new opportunities, collaborations, and meaningful projects.",
    contactCta: "Let's build something great together.",
    emailLabel: 'Send an email',
    footerRole: 'Web Developer & Designer',
    rights: '© 2026 Nashwan Yousef. All rights reserved.',
    socials: { instagram: 'Instagram', facebook: 'Facebook', github: 'GitHub', whatsapp: 'WhatsApp', email: 'Email' },
  },
  ar: {
    nav: { home: 'الرئيسية', about: 'عني', services: 'الخدمات', project: 'المشروع', contact: 'تواصل', connect: 'تواصل معي' },
    eyebrow: 'متخصص رقمي مستقل · 23 عامًا',
    heroTitle: 'نشوان يوسف',
    heroRole: 'مطور ومصمم مواقع ويب',
    heroLead: 'أصنع تجارب رقمية تترك أثرًا.',
    heroText: 'أنا متخصص رقمي متعدد المهارات، أجمع بين تطوير وتصميم مواقع الويب والتواصل والعلاقات العامة وخدمة العملاء والمبيعات لصناعة تجارب رقمية حديثة تربط الأفكار بالناس.',
    heroVisual: { site: 'nashwan.digital', scope: 'عالمي / محلي', phrase: ['من الأفكار', 'إلى الناس.'], code: '< أنشئ / تواصل / تطوّر />' },
    work: 'شاهد أعمالي',
    connect: 'تواصل معي',
    available: 'متاح للفرص والتعاون',
    scroll: 'اكتشف المزيد',
    aboutLabel: '01 / الشخص وراء العمل',
    aboutTitle: 'نبذة عني',
    aboutText: [
      'أنا نشوان يوسف، أبلغ من العمر 23 عامًا، وأعمل في مجال تطوير وتصميم مواقع الويب، مع خلفية متعددة المهارات تشمل تطوير المواقع والتصميم والعلاقات العامة وخدمة العملاء والمبيعات.',
      'أستمتع بتحويل الأفكار إلى تجارب رقمية حقيقية ومميزة. أجمع في عملي بين التفكير التقني والإبداع والتواصل وفهم احتياجات الناس والأعمال.',
      'هذا التنوع يمنحني القدرة على النظر إلى المشاريع من عدة زوايا — تقنية وإبداعية وتجارية وإنسانية.',
    ],
    stats: [['23', 'عامًا'], ['5+', 'مجالات مهنية'], ['1', 'منصة عالمية']],
    servicesLabel: '02 / ما أقدمه',
    servicesTitle: 'ماذا أقدم',
    servicesIntro: 'ممارسة مرنة تهتم بالرحلة كاملة، من الفكرة الأولى إلى العلاقة المستمرة.',
    services: [
      ['تطوير مواقع الويب', 'تطوير مواقع حديثة ومتجاوبة وحلول رقمية مصممة لتقديم تجربة مميزة.', Code2],
      ['تصميم مواقع الويب', 'تصميم واجهات عصرية وجذابة مع التركيز على سهولة الاستخدام والهوية البصرية وتجربة المستخدم.', Palette],
      ['العلاقات العامة', 'بناء العلاقات المهنية وصناعة تواصل فعال مع الجمهور والعملاء والشركاء.', UsersRound],
      ['خدمة العملاء', 'فهم احتياجات العملاء وحل المشكلات وتقديم تجارب خدمة احترافية وإيجابية.', Headphones],
      ['المبيعات', 'فهم احتياجات العملاء وتقديم القيمة وبناء الثقة وتحويل الفرص إلى نتائج وعلاقات ناجحة.', TrendingUp],
      ['الحلول الرقمية', 'دمج التكنولوجيا والإبداع والتفكير التجاري لإنشاء حلول رقمية فعالة.', Sparkles],
    ] as [string, string, IconType][],
    strengthsLabel: '03 / كيف أفكر',
    strengthsTitle: 'نقاط قوتي',
    strengthsIntro: 'مهارات مترابطة أقدمها في كل فكرة ومحادثة وتجربة رقمية.',
    strengths: ['تطوير الويب', 'تصميم الويب', 'UI/UX', 'التواصل', 'العلاقات العامة', 'خدمة العملاء', 'المبيعات', 'حل المشكلات', 'التفكير الإبداعي', 'الوعي التجاري'],
    bringLabel: '03.5 / الصورة الكاملة',
    bringTitle: 'ما أقدمه',
    bringIntro: 'خمس زوايا متكاملة تجعل العمل أكثر فائدة وإنسانية واستعدادًا للعالم الحقيقي.',
    bring: [['التكنولوجيا', 'تحويل الأفكار إلى تجارب رقمية واضحة ومتجاوبة.'], ['التصميم', 'منح كل تفاعل هدفًا ووضوحًا ووجهة نظر مميزة.'], ['التواصل', 'تسهيل فهم الأفكار ومشاركتها وتذكرها.'], ['تجربة العملاء', 'الإنصات باهتمام وتصميم الحلول حول احتياجات الناس.'], ['الأعمال', 'ربط القرارات الإبداعية بنتائج مفيدة ومستدامة.']] as [string, string][],
    projectLabel: '04 / عمل يتطور باستمرار',
    projectTitle: 'المشروع المميز',
    projectDescription: [
      'أنا مطور منصة Travalorics Coffee العالمية، وقد ساهمت في تطوير منصة رقمية تمثل مفهومًا عالميًا حديثًا في مجال القهوة.',
      'يمثل هذا المشروع شغفي بدمج التكنولوجيا والإبداع والأعمال والتجربة الرقمية في منصة متكاملة.',
    ],
    projectVisual: { kicker: 'Travalorics / قهوة', scope: 'عالمي', title: ['عالم', 'يستحق التذوق.'], platform: '01 — المنصة' },
    projectLogoAlt: 'شعار منصة Travalorics Coffee',
    visit: 'زيارة الموقع',
    projectCaption: 'مفهوم قهوة عالمي، تُرجم إلى منصة رقمية.',
    visionLabel: '05 / وجهة نظري',
    visionTitle: 'رؤيتي',
    visionText: 'أطمح إلى مواصلة التطور كمتخصص يجمع بين التكنولوجيا والإبداع والتواصل والأعمال.',
    visionTextTwo: 'أسعى إلى بناء تجارب رقمية تربط بين الأشخاص والأعمال والأفكار.',
    visionTextThree: 'أؤمن بأن الموقع الإلكتروني ليس مجرد مجموعة من الصفحات، بل هو فرصة لسرد قصة وبناء الثقة وصناعة تجربة وترك انطباع لا يُنسى.',
    contactLabel: '06 / لنبدأ محادثة',
    contactTitle: 'لنتواصل',
    contactText: 'سواء كنت تبحث عن مطور مواقع أو مصمم مواقع أو متخصص علاقات عامة أو موظف خدمة عملاء أو مندوب مبيعات، فأنا منفتح على الفرص المهنية الجديدة والمشاريع والتعاونات التي تصنع قيمة حقيقية.',
    contactCta: 'لنصنع شيئًا رائعًا معًا.',
    emailLabel: 'أرسل بريدًا إلكترونيًا',
    footerRole: 'مطور ومصمم مواقع ويب',
    rights: '© 2026 نشوان يوسف. جميع الحقوق محفوظة.',
    socials: { instagram: 'إنستغرام', facebook: 'فيسبوك', github: 'جيت هب', whatsapp: 'واتساب', email: 'البريد الإلكتروني' },
  },
} as const;

const socialLinks = [
  { key: 'instagram', href: 'https://www.instagram.com/__ns00', icon: SiInstagram },
  { key: 'facebook', href: 'https://www.facebook.com/na00sh', icon: SiFacebook },
  { key: 'github', href: 'https://github.com/ns-00', icon: SiGithub },
  { key: 'whatsapp', href: 'https://wa.me/qr/AOOV5GACVS25I1', icon: SiWhatsapp },
  { key: 'email', href: 'mailto:nashwany91@gmail.com', icon: null },
] as const;

type PortfolioCopy = (typeof copy)[Language];
type SocialLabels = Record<(typeof socialLinks)[number]['key'], string>;

function SocialLinks({ labels }: { labels: SocialLabels }) {
  return (
    <div className="flex flex-wrap items-center gap-3" aria-label={labels.email === 'Email' ? 'Social links' : 'روابط التواصل'}>
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.key}
            href={social.href}
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels[social.key]}
            title={labels[social.key]}
            data-testid={`link-social-${social.key}`}
          >
            {Icon ? <Icon size={17} strokeWidth={1.8} /> : <Mail size={17} strokeWidth={1.8} />}
          </a>
        );
      })}
    </div>
  );
}

function LanguageToggle({ language, setLanguage }: { language: Language; setLanguage: (language: Language) => void }) {
  return (
    <div className="flex items-center gap-2 font-mono-custom text-[0.66rem] tracking-[0.08em]" role="group" aria-label={language === 'ar' ? 'مبدّل اللغة' : 'Language switcher'}>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
        aria-pressed={language === 'en'}
        data-testid="button-language-en"
      >
        EN
      </button>
      <span className="text-muted-foreground/50">/</span>
      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={language === 'ar' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
        aria-pressed={language === 'ar'}
        data-testid="button-language-ar"
      >
        AR
      </button>
    </div>
  );
}

function Navbar({ language, setLanguage, c }: { language: Language; setLanguage: (language: Language) => void; c: PortfolioCopy }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'about', 'services', 'project', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.35, 0.7] });
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const links = [
    ['home', c.nav.home],
    ['about', c.nav.about],
    ['services', c.nav.services],
    ['project', c.nav.project],
    ['contact', c.nav.contact],
  ];

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container-wide flex h-[4.75rem] items-center justify-between gap-6">
        <button type="button" onClick={() => go('home')} className="group flex items-center gap-3 text-start" data-testid="button-logo-home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-primary/60 font-display text-sm text-primary transition-transform group-hover:rotate-12">NY</span>
          <span className="hidden text-sm font-semibold tracking-[0.06em] text-foreground sm:block">Nashwan Yousef</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}>
            {links.map(([id, label]) => (
            <button key={id} type="button" className={`nav-link ${active === id ? 'is-active' : ''}`} onClick={() => go(id)} data-testid={`button-nav-${id}`}>{label}</button>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <LanguageToggle language={language} setLanguage={setLanguage} />
          <button type="button" onClick={() => go('contact')} className="button-primary min-h-0 px-4 py-2 text-[0.66rem]" data-testid="button-nav-connect">{c.nav.connect}</button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageToggle language={language} setLanguage={setLanguage} />
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground" onClick={() => setOpen((current) => !current)} aria-label={open ? (language === 'ar' ? 'إغلاق القائمة' : 'Close menu') : (language === 'ar' ? 'فتح القائمة' : 'Open menu')} aria-expanded={open} data-testid="button-mobile-menu">
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-menu container-wide flex flex-col gap-1 pb-5 pt-4 md:hidden" aria-label={language === 'ar' ? 'تنقل الهاتف' : 'Mobile navigation'}>
          {links.map(([id, label]) => (
            <button key={id} type="button" className="rounded-lg px-3 py-3 text-start text-sm text-muted-foreground hover:bg-secondary hover:text-foreground" onClick={() => go(id)} data-testid={`button-mobile-nav-${id}`}>{label}</button>
          ))}
          <button type="button" onClick={() => go('contact')} className="button-primary mt-3 w-full" data-testid="button-mobile-connect">{c.nav.connect}</button>
        </nav>
      )}
    </header>
  );
}

function SectionIntro({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-mono-custom text-[0.68rem] uppercase tracking-[0.16em] text-primary">{label}</p>
        <h2 className="mt-4 font-display text-4xl leading-none tracking-[-0.04em] text-foreground sm:text-5xl">{title}</h2>
      </div>
      {intro && <p className="max-w-sm text-sm leading-7 text-muted-foreground">{intro}</p>}
    </div>
  );
}

function Home() {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = window.localStorage.getItem('nashwan-language');
    return stored === 'ar' ? 'ar' : 'en';
  });
  const c = copy[language];

  useEffect(() => {
    window.localStorage.setItem('nashwan-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = language === 'ar' ? 'نشوان يوسف | مطور ومصمم مواقع ويب' : 'Nashwan Yousef | Web Developer & Designer';
    const description = language === 'ar'
      ? 'نشوان يوسف — مطور ومصمم مواقع ويب، مدير علاقات عامة، متخصص خدمة عملاء ومندوب مبيعات، ومطور منصة Travalorics Coffee العالمية.'
      : 'Nashwan Yousef — Web Developer, Web Designer, Public Relations Manager, Customer Service Specialist, Sales Representative, and Developer of the global Travalorics Coffee platform.';
    const title = language === 'ar' ? 'نشوان يوسف | مطور ومصمم مواقع ويب' : 'Nashwan Yousef | Web Developer & Designer';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);
    let og = document.querySelector('meta[property="og:description"]');
    if (!og) {
      og = document.createElement('meta');
      og.setAttribute('property', 'og:description');
      document.head.appendChild(og);
    }
    og.setAttribute('content', description);
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', title);
    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', description);
  }, [language]);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="portfolio-shell min-h-[100dvh]" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar language={language} setLanguage={setLanguage} c={c} />
      <main>
        <section id="home" className="relative flex min-h-[760px] items-center overflow-hidden pt-28 md:min-h-[850px] md:pt-32">
          <div className="hero-orb" aria-hidden="true" />
          <div className="hero-grid absolute right-[-10%] top-[22%] h-[32rem] w-[46rem] opacity-30" aria-hidden="true" />
          <div className="container-wide relative z-10 grid items-center gap-16 lg:grid-cols-[1.08fr_.92fr]">
            <div className="reveal max-w-3xl">
              <div className="mb-8 flex items-center gap-3 font-mono-custom text-[0.68rem] uppercase tracking-[0.14em] text-primary">
                <span className="h-px w-10 bg-primary" />
                <span>{c.eyebrow}</span>
              </div>
              <h1 className="font-display text-[clamp(3.75rem,10vw,8.6rem)] leading-[0.86] tracking-[-0.075em] text-balance">
                {c.heroTitle}
              </h1>
              <p className="mt-8 max-w-xl text-lg font-medium leading-8 text-accent sm:text-xl">{c.heroRole}</p>
              <p className="mt-2 max-w-2xl font-display text-3xl leading-tight tracking-[-0.04em] text-foreground sm:text-5xl">{c.heroLead}</p>
              <p className="mt-7 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">{c.heroText}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <button type="button" className="button-primary" onClick={() => scrollTo('project')} data-testid="button-hero-work">{c.work}<ArrowUpRight size={16} /></button>
                <button type="button" className="button-ghost" onClick={() => scrollTo('contact')} data-testid="button-hero-connect">{c.connect}<ChevronRight size={16} /></button>
              </div>
              <div className="mt-10 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" /></span>
                <span>{c.available}</span>
              </div>
            </div>

            <div className="reveal relative mx-auto h-[360px] w-full max-w-[470px] lg:h-[470px]" style={{ transitionDelay: '140ms' }}>
              <div className="absolute inset-[11%] rounded-full border border-accent/20" />
              <div className="absolute inset-[22%] rounded-full border border-primary/20" />
              <div className="absolute inset-[34%] rounded-full bg-primary/10 blur-3xl" />
              <div className="glass-card absolute left-[5%] top-[13%] w-[73%] rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center justify-between font-mono-custom text-[0.62rem] text-muted-foreground"><span>{c.heroVisual.site}</span><span>01</span></div>
                <div className="mt-10 space-y-3">
                  <div className="h-2 w-2/5 rounded-full bg-accent/60" />
                  <div className="h-2 w-4/5 rounded-full bg-foreground/15" />
                  <div className="h-2 w-3/5 rounded-full bg-foreground/10" />
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <div className="h-8 w-8 rounded-full border border-primary/60" />
                  <div className="flex gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-primary" /><span className="h-1.5 w-1.5 rounded-full bg-accent" /><span className="h-1.5 w-1.5 rounded-full bg-foreground/30" /></div>
                </div>
              </div>
              <div className="glass-card absolute bottom-[9%] right-[1%] w-[58%] rounded-2xl p-5" style={{ transform: 'rotate(5deg)' }}>
                <div className="flex items-center gap-2 text-xs text-primary"><Globe2 size={15} /><span className="font-mono-custom">{c.heroVisual.scope}</span></div>
                <p className="mt-5 font-display text-2xl leading-none">{c.heroVisual.phrase[0]}<br /><span className="text-accent">{c.heroVisual.phrase[1]}</span></p>
              </div>
              <div className="absolute bottom-[22%] left-[3%] rounded-full border border-primary/40 bg-background/70 px-3 py-2 font-mono-custom text-[0.6rem] text-primary backdrop-blur" dir="ltr">
                {c.heroVisual.code}
              </div>
              <div className="absolute right-[12%] top-[2%] h-3 w-3 rounded-full bg-primary shadow-[0_0_28px_rgba(214,255,95,.7)]" />
            </div>
          </div>
          <button type="button" onClick={() => scrollTo('about')} className="absolute bottom-9 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono-custom text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary md:flex" data-testid="button-scroll-about">
            {c.scroll}<ArrowDown size={14} className="animate-bounce" />
          </button>
        </section>

        <div className="container-wide section-rule" />

        <section id="about" className="reveal py-24 md:py-36">
          <div className="container-wide grid gap-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
            <SectionIntro label={c.aboutLabel} title={c.aboutTitle} />
            <div>
              <div className="space-y-5 text-base leading-8 text-muted-foreground">
                {c.aboutText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-12 grid grid-cols-3 border-y border-border/80 py-7">
                {c.stats.map(([value, label]) => (
                  <div key={label} className="border-s border-border/70 px-4 first:border-s-0 first:px-0">
                    <p className="font-display text-3xl tracking-[-0.05em] text-primary sm:text-4xl" data-testid={`text-stat-${label}`}>{value}</p>
                    <p className="mt-2 text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-[hsl(190_30%_9%)] py-24 md:py-32">
          <div className="container-wide reveal">
            <SectionIntro label={c.servicesLabel} title={c.servicesTitle} intro={c.servicesIntro} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.services.map(([title, description, Icon], index) => (
                <article key={title} className="service-card glass-card group min-h-[250px] rounded-2xl p-6" data-testid={`card-service-${index}`}>
                  <div className="flex items-start justify-between">
                    <div className="service-icon grid h-11 w-11 place-items-center rounded-xl border border-border bg-background/40 text-accent"><Icon size={20} strokeWidth={1.6} /></div>
                    <span className="font-mono-custom text-[0.65rem] text-muted-foreground/70">0{index + 1}</span>
                  </div>
                  <h3 className="mt-10 font-display text-2xl tracking-[-0.04em]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="bring" className="py-24 md:py-32">
          <div className="container-wide reveal">
            <SectionIntro label={c.bringLabel} title={c.bringTitle} intro={c.bringIntro} />
            <div className="bring-journey">
              {c.bring.map(([title, description], index) => (
                <article className="bring-step" key={title} data-testid={`card-bring-${index}`}>
                  <div className="bring-step-marker"><span>0{index + 1}</span></div>
                  <div className="bring-step-copy">
                    <p className="font-mono-custom text-[0.64rem] uppercase tracking-[0.14em] text-primary">{title}</p>
                    <p className="mt-3 max-w-xs text-sm leading-7 text-muted-foreground">{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="strengths" className="py-24 md:py-36">
          <div className="container-wide reveal grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
            <SectionIntro label={c.strengthsLabel} title={c.strengthsTitle} intro={c.strengthsIntro} />
            <div className="flex flex-wrap content-start gap-3">
              {c.strengths.map((strength, index) => (
                <div key={strength} className={`rounded-full border px-5 py-3 text-sm transition-colors hover:border-primary hover:text-primary ${index % 3 === 0 ? 'border-primary/40 text-foreground' : 'border-border text-muted-foreground'}`} data-testid={`tag-strength-${index}`}>
                  <span className="me-2 font-mono-custom text-[0.6rem] text-primary/70">0{index + 1}</span>{strength}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="project" className="py-10 pb-28 md:pb-40">
          <div className="container-wide reveal">
            <SectionIntro label={c.projectLabel} title={c.projectTitle} />
            <article className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-2xl lg:grid-cols-[1.12fr_.88fr]" data-testid="card-featured-project">
              <div className="project-visual relative min-h-[390px] p-7 sm:p-12">
                <div className="project-ring ring-one" aria-hidden="true" />
                <div className="project-ring ring-two" aria-hidden="true" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between font-mono-custom text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                    <span>{c.projectVisual.kicker}</span>
                    <img
                      src={`${import.meta.env.BASE_URL}travalorics-logo.png`}
                      alt={c.projectLogoAlt}
                      className="project-logo"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="mb-7 grid h-16 w-16 place-items-center rounded-full border border-primary/70 text-primary"><Globe2 size={28} strokeWidth={1.2} /></div>
                    <p className="max-w-md font-display text-5xl leading-[.9] tracking-[-0.06em] text-foreground sm:text-7xl">{c.projectVisual.title[0]}<br /><span className="text-primary">{c.projectVisual.title[1]}</span></p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="h-px w-8 bg-primary" />{c.projectCaption}</div>
                </div>
              </div>
              <div className="flex flex-col justify-between p-7 sm:p-12">
                <div>
                  <p className="font-mono-custom text-[0.68rem] uppercase tracking-[0.14em] text-primary">{c.projectVisual.platform}</p>
                  <h3 className="mt-7 font-display text-4xl leading-none tracking-[-0.05em] text-foreground sm:text-5xl">
                    <a href="https://travalorics.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary" data-testid="link-travalorics-title">Travalorics Coffee</a>
                  </h3>
                  <div className="mt-8 space-y-4 text-sm leading-7 text-muted-foreground">
                    {c.projectDescription.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
                <a href="https://travalorics.com" target="_blank" rel="noopener noreferrer" className="button-primary mt-12 w-fit" data-testid="link-travalorics-visit">{c.visit}<ExternalLink size={15} /></a>
              </div>
            </article>
          </div>
        </section>

        <section id="vision" className="relative overflow-hidden border-y border-border bg-[hsl(184_30%_11%)] py-28 md:py-40">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
          <div className="container-wide reveal relative grid gap-12 lg:grid-cols-[.5fr_1.5fr]">
            <div>
              <p className="font-mono-custom text-[0.68rem] uppercase tracking-[0.16em] text-primary">{c.visionLabel}</p>
              <div className="mt-8 text-primary"><Quote size={42} strokeWidth={1} /></div>
            </div>
            <div>
              <h2 className="font-display text-5xl leading-[.94] tracking-[-0.06em] text-balance sm:text-7xl">{c.visionTitle}</h2>
              <div className="mt-10 max-w-3xl space-y-5 text-lg leading-8 text-muted-foreground sm:text-xl">
                <p>{c.visionText}</p><p>{c.visionTextTwo}</p><p>{c.visionTextThree}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-28 md:py-40">
          <div className="container-wide reveal">
            <div className="grid gap-14 lg:grid-cols-[1fr_.68fr] lg:items-end">
              <div>
                <p className="font-mono-custom text-[0.68rem] uppercase tracking-[0.16em] text-primary">{c.contactLabel}</p>
                <h2 className="mt-5 max-w-3xl font-display text-6xl leading-[.88] tracking-[-0.07em] sm:text-8xl">{c.contactTitle}</h2>
                <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">{c.contactText}</p>
                <a href="mailto:nashwany91@gmail.com" className="button-primary mt-9" data-testid="link-contact-email">{c.contactCta}<ArrowUpRight size={16} /></a>
              </div>
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <p className="font-mono-custom text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{c.emailLabel}</p>
                <a href="mailto:nashwany91@gmail.com" className="mt-4 block break-all font-display text-2xl tracking-[-0.04em] text-accent transition-colors hover:text-primary sm:text-3xl" data-testid="link-contact-address">nashwany91@gmail.com</a>
                <div className="mt-7 section-rule" />
                <div className="mt-7"><SocialLinks labels={c.socials} /></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border/80 py-8">
        <div className="container-wide flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg tracking-[-0.04em]">Nashwan Yousef</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.footerRole}</p>
          </div>
          <SocialLinks labels={c.socials} />
          <div className="flex flex-wrap items-center gap-5 sm:justify-end">
            <LanguageToggle language={language} setLanguage={setLanguage} />
            <p className="text-xs text-muted-foreground">{c.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;