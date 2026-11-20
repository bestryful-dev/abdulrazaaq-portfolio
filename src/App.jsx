import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowUpLeft,
  ArrowDown,
  Play,
  Briefcase,
  Storefront,
  ChartLineUp,
  MapPin,
  GraduationCap,
  Globe,
  YoutubeLogo,
  WhatsappLogo,
  FacebookLogo,
} from "@phosphor-icons/react";

import { CONTENT, CONTACT_CONFIG } from "./data/content";
import { MonogramLogo } from "./components/MonogramLogo";
import { VideoTheaterModal } from "./components/VideoTheaterModal";
import { ConsultationDrawer } from "./components/ConsultationDrawer";
import {
  ScrollProgressLine,
  BlurFade,
  SpotlightCard,
  BorderBeam,
  MagneticButton,
  NumberTicker,
} from "./components/motion/MotionPrimitives";

export default function App() {
  const [lang, setLang] = useState("ar"); // Default Arabic; 1-click toggle to English
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTopic, setDrawerTopic] = useState("");

  const isRtl = lang === "ar";
  const t = CONTENT[lang];
  const DirectionArrow = isRtl ? ArrowUpLeft : ArrowUpRight;

  // Smooth scrolling with Lenis
  const lenisRef = useRef(null);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Synchronize HTML dir & lang attributes cleanly
  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  // Hero portrait subtle scroll parallax
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(heroScroll, [0, 1], [0, shouldReduceMotion ? 0 : 48]);

  const filteredEpisodes =
    activeFilter === "all"
      ? t.media.episodes
      : t.media.episodes.filter((ep) => ep.category === activeFilter);

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function openConsultation(topic = "") {
    setDrawerTopic(topic);
    setDrawerOpen(true);
  }

  function renderIcon(name) {
    if (name === "briefcase") return <Briefcase size={22} weight="duotone" className="text-[#C9A24D]" />;
    if (name === "storefront") return <Storefront size={22} weight="duotone" className="text-[#C9A24D]" />;
    return <ChartLineUp size={22} weight="duotone" className="text-[#C9A24D]" />;
  }

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen bg-[#0A0B0D] text-[#F3EFE6] overflow-x-clip">
      <ScrollProgressLine />

      {/* 1. Floating Executive Navbar */}
      <header className="fixed top-0 inset-x-0 z-40 border-b border-[#C9A24D]/15 bg-[#0A0B0D]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("top");
            }}
          >
            <MonogramLogo isRtl={isRtl} />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {t.nav.links.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToId(item.id)}
                className="text-sm text-[#9CA3AF] transition hover:text-[#C9A24D]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLang((prev) => (prev === "ar" ? "en" : "ar"))}
              aria-label={t.nav.langAria}
              className="inline-flex items-center gap-1.5 border border-[#C9A24D]/25 bg-[#121418] px-3 py-2 text-xs font-medium text-[#F3EFE6] transition hover:border-[#C9A24D]"
            >
              <Globe size={15} className="text-[#C9A24D]" />
              <span>{t.nav.langToggle}</span>
            </button>

            <MagneticButton
              onClick={() => openConsultation()}
              className="inline-flex items-center gap-2 bg-[#C9A24D] px-4 py-2 text-xs sm:text-sm font-semibold text-[#0A0B0D] transition hover:bg-[#d8b461]"
            >
              <span>{t.nav.cta}</span>
              <DirectionArrow size={15} weight="bold" />
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section
        id="top"
        ref={heroRef}
        className="bg-ledger-grid relative pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-[#C9A24D]/15"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0B0D]/40 to-[#0A0B0D]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
          {/* Editorial Copy */}
          <div className="lg:col-span-7">
            <BlurFade delay={0.05}>
              <p className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-[#C9A24D]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A24D]" />
                {t.hero.eyebrow}
              </p>
            </BlurFade>

            <BlurFade delay={0.14}>
              <h1 className="font-editorial mt-5 text-4xl font-semibold leading-[1.15] text-[#F3EFE6] sm:text-6xl lg:text-[4.25rem]">
                {t.hero.titleLine1}
                <span className={`block text-[#C9A24D] ${!isRtl ? "italic font-medium" : "mt-1"}`}>
                  {t.hero.titleAccent}
                </span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.22}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#9CA3AF] sm:text-lg">
                {t.hero.subtitle}
              </p>
            </BlurFade>

            {/* Dual Audience Routing CTAs */}
            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton
                  onClick={() => openConsultation()}
                  className="inline-flex items-center gap-2.5 bg-[#C9A24D] px-6 py-3.5 text-sm font-semibold text-[#0A0B0D] transition hover:bg-[#d8b461]"
                >
                  <span>{t.hero.primaryCta}</span>
                  <DirectionArrow size={17} weight="bold" />
                </MagneticButton>

                <button
                  type="button"
                  onClick={() => scrollToId("media")}
                  className="inline-flex items-center gap-2.5 border border-[#C9A24D]/35 bg-[#121418] px-6 py-3.5 text-sm font-medium text-[#F3EFE6] transition hover:border-[#C9A24D] hover:bg-[#181B20]"
                >
                  <Play size={16} weight="fill" className="text-[#C9A24D]" />
                  <span>{t.hero.secondaryCta}</span>
                </button>
              </div>
            </BlurFade>

            {/* Credibility Micro-Badges */}
            <BlurFade delay={0.36}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#9CA3AF]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={15} className="text-[#C9A24D]" />
                  {t.hero.badges[0]}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap size={15} className="text-[#C9A24D]" />
                  {t.hero.badges[1]}
                </span>
              </div>
            </BlurFade>
          </div>

          {/* Editorial Portrait Frame with Parallax & BorderBeam */}
          <div className="lg:col-span-5">
            <motion.div style={{ y: portraitY }} className="relative mx-auto max-w-sm">
              {/* Outer Architectural Hairline Box */}
              <div className="relative border border-[#C9A24D]/25 bg-[#0F1115] p-3">
                <BorderBeam duration={10} />
                {/* Corner Gold Accents */}
                <span className="pointer-events-none absolute -top-1 -left-1 h-4 w-4 border-t-2 border-l-2 border-[#C9A24D]" />
                <span className="pointer-events-none absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-[#C9A24D]" />

                <div className="relative z-10 aspect-[4/4.6] w-full overflow-hidden border border-[#C9A24D]/15 bg-[#121418]">
                  {CONTACT_CONFIG.portraitImage ? (
                    <img
                      src={CONTACT_CONFIG.portraitImage}
                      alt={isRtl ? "عبدالرزاق ناصر" : "Abdulrazaaq Nasser"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-between p-6 text-center">
                      <span className="border border-[#C9A24D]/25 bg-[#163B2F]/40 px-3 py-1 text-[11px] text-[#C9A24D]">
                        {t.hero.portraitTag}
                      </span>
                      <span className="font-editorial text-5xl font-semibold tracking-wider text-[#C9A24D]/80">
                        {isRtl ? "ع ن" : "AN"}
                      </span>
                      <span className="text-[11px] tracking-wider text-[#9CA3AF]">
                        {t.hero.portraitComingSoon}
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative z-10 mt-3 flex items-center justify-between px-1 text-[11px] text-[#9CA3AF]">
                  <span>{t.hero.portraitFigure}</span>
                  <span className="h-[1px] w-12 bg-[#C9A24D]/30" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="relative mx-auto mt-12 flex max-w-6xl justify-center px-5 sm:justify-start sm:px-8">
          <button
            type="button"
            onClick={() => scrollToId("metrics")}
            className="inline-flex items-center gap-2 text-xs text-[#9CA3AF] transition hover:text-[#C9A24D]"
          >
            <span>{t.hero.scrollHint}</span>
            <ArrowDown size={14} className="animate-bounce text-[#C9A24D]" />
          </button>
        </div>
      </section>

      {/* 3. Credibility Ticker Strip */}
      <section id="metrics" className="border-b border-[#C9A24D]/15 bg-[#0D0F12]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-y sm:divide-y-0 sm:grid-cols-4 sm:divide-x divide-[#C9A24D]/15 rtl:sm:divide-x-reverse">
          {t.metrics.map((m, idx) => (
            <BlurFade key={idx} delay={idx * 0.06} className="px-6 py-8 text-center sm:text-start">
              <div className="font-editorial text-3xl font-semibold text-[#F3EFE6] sm:text-4xl">
                {m.isText ? (
                  <span className="text-[#C9A24D]">{m.display}</span>
                ) : (
                  <span className="text-[#C9A24D]">
                    <NumberTicker
                      value={m.value}
                      decimals={m.decimals}
                      prefix={m.prefix}
                      suffix={m.suffix}
                    />
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-[#9CA3AF]">{m.label}</p>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* 4. Consulting & Advisory Bento Grid */}
      <section id="expertise" className="py-20 sm:py-28 border-b border-[#C9A24D]/15">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <BlurFade>
                <p className="text-xs font-semibold tracking-wider text-[#C9A24D]">
                  {t.advisory.sectionTag}
                </p>
                <h2 className="font-editorial mt-3 text-3xl font-semibold leading-tight text-[#F3EFE6] sm:text-5xl">
                  {t.advisory.titleStart}{" "}
                  <span className={`text-[#C9A24D] ${!isRtl ? "italic font-medium" : ""}`}>
                    {t.advisory.titleAccent}
                  </span>
                </h2>
              </BlurFade>
            </div>
            <div className="lg:col-span-5">
              <BlurFade delay={0.1}>
                <p className="text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
                  {t.advisory.description}
                </p>
              </BlurFade>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {t.advisory.cards.map((card, idx) => (
              <BlurFade key={card.num} delay={idx * 0.08}>
                <SpotlightCard className="flex h-full flex-col justify-between p-7">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center border border-[#C9A24D]/25 bg-[#0A0B0D]">
                        {renderIcon(card.icon)}
                      </div>
                      <span className="text-xs text-[#C9A24D]/80">{card.num}</span>
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-[#F3EFE6]">{card.title}</h3>
                    <p className="mt-1 text-xs font-medium text-[#C9A24D]">{card.subtitle}</p>
                    <p className="mt-4 text-sm leading-relaxed text-[#9CA3AF]">{card.description}</p>
                  </div>

                  <div className="mt-8 border-t border-[#C9A24D]/15 pt-4 flex items-center justify-between">
                    <span className="text-[11px] text-[#F3EFE6]/70">{card.outcome}</span>
                    <button
                      type="button"
                      onClick={() => openConsultation(card.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C9A24D] transition hover:underline underline-offset-4"
                    >
                      <span>{card.cta}</span>
                      <DirectionArrow size={14} weight="bold" />
                    </button>
                  </div>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Al Mustathmer Trend Interactive Media Hub */}
      <section id="media" className="py-20 sm:py-28 border-b border-[#C9A24D]/15 bg-[#0D0F12]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <BlurFade>
                <p className="text-xs font-semibold tracking-wider text-[#C9A24D]">
                  {t.media.sectionTag}
                </p>
                <h2 className="font-editorial mt-3 text-3xl font-semibold text-[#F3EFE6] sm:text-5xl">
                  {t.media.titleStart}{" "}
                  <span className={`text-[#C9A24D] ${!isRtl ? "italic font-medium" : ""}`}>
                    {t.media.titleAccent}
                  </span>
                </h2>
                <p className="mt-3 max-w-xl text-sm text-[#9CA3AF] sm:text-base">
                  {t.media.subtitle}
                </p>
              </BlurFade>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {t.media.filters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`border px-3.5 py-1.5 text-xs transition ${
                      activeFilter === filter.id
                        ? "border-[#C9A24D] bg-[#C9A24D] font-semibold text-[#0A0B0D]"
                        : "border-[#C9A24D]/20 bg-[#121418] text-[#9CA3AF] hover:border-[#C9A24D]/50 hover:text-[#F3EFE6]"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <a
                href={CONTACT_CONFIG.youtubeChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C9A24D] transition hover:underline underline-offset-4"
              >
                <YoutubeLogo size={16} weight="fill" />
                <span>{t.media.channelLink}</span>
                <DirectionArrow size={13} />
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {filteredEpisodes.map((ep, idx) => (
              <BlurFade key={ep.id} delay={idx * 0.07}>
                <SpotlightCard
                  onClick={() => setSelectedEpisode(ep)}
                  className="cursor-pointer flex h-full flex-col justify-between"
                >
                  {/* Episode Cover (Auto-loads YouTube thumbnail when youtubeId is set) */}
                  <div className="bg-ledger-grid relative aspect-video w-full overflow-hidden border-b border-[#C9A24D]/15 bg-[#0A0B0D] flex flex-col items-center justify-center p-4">
                    {(ep.thumbnail || ep.youtubeId) && (
                      <>
                        <img
                          src={ep.thumbnail || `https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg`}
                          alt={ep.title}
                          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/35" />
                      </>
                    )}
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A24D]/60 bg-[#121418]/90 text-[#C9A24D] transition-transform duration-300 group-hover:scale-110">
                      <Play size={20} weight="fill" />
                    </div>
                    {!(ep.thumbnail || ep.youtubeId) && (
                      <span className="relative z-10 mt-3 text-[10px] tracking-wider text-[#9CA3AF]">
                        {t.media.coverComingSoon}
                      </span>
                    )}
                    <span className="absolute bottom-2.5 end-3 z-10 border border-[#C9A24D]/25 bg-[#121418]/90 px-2 py-0.5 text-[10px] text-[#C9A24D]">
                      {ep.duration}
                    </span>
                  </div>

                  {/* Episode Copy */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <p className="text-[11px] font-medium text-[#C9A24D]">{ep.code}</p>
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-[#F3EFE6]">
                        {ep.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#9CA3AF]">
                        {ep.englishSub}
                      </p>
                    </div>

                    <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#C9A24D]">
                      <span>{t.media.watchLabel}</span>
                      <DirectionArrow size={14} weight="bold" />
                    </div>
                  </div>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* 6. The Journey (Raymah <-> Jeddah) */}
      <section id="journey" className="py-20 sm:py-28 border-b border-[#C9A24D]/15">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
          {/* Left/Start Column: Headline & Visual Placeholder */}
          <div className="lg:col-span-5">
            <BlurFade>
              <p className="text-xs font-semibold tracking-wider text-[#C9A24D]">
                {t.journey.sectionTag}
              </p>
              <h2 className="font-editorial mt-3 text-3xl font-semibold text-[#F3EFE6] sm:text-5xl">
                {t.journey.titleStart}
                <span className={`block text-[#C9A24D] ${!isRtl ? "italic font-medium" : "mt-1"}`}>
                  {t.journey.titleAccent}
                </span>
              </h2>
            </BlurFade>

            <BlurFade delay={0.12}>
              <div className="mt-8 border border-[#C9A24D]/20 bg-[#121418] p-3">
                <div className="bg-ledger-grid aspect-[16/10] w-full border border-[#C9A24D]/15 bg-[#0A0B0D] flex flex-col items-center justify-center p-6 text-center">
                  {CONTACT_CONFIG.journeyImage ? (
                    <img
                      src={CONTACT_CONFIG.journeyImage}
                      alt={t.journey.titleStart}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <span className="font-editorial text-3xl font-semibold text-[#C9A24D]/80">
                        {isRtl ? "ع ن" : "AN"}
                      </span>
                      <span className="mt-3 text-[11px] text-[#9CA3AF]">
                        {t.journey.imageTag}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Right/End Column: Narrative & Milestones */}
          <div className="lg:col-span-7">
            <BlurFade delay={0.1}>
              <p className="text-xs font-medium text-[#C9A24D]">{t.journey.eyebrow}</p>
              <h3 className="font-editorial mt-3 text-2xl font-medium leading-relaxed text-[#F3EFE6] sm:text-3xl">
                “{t.journey.quote}”
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
                {t.journey.bio}
              </p>
            </BlurFade>

            <div className="mt-10 space-y-6 border-s border-[#C9A24D]/25 ps-6">
              {t.journey.milestones.map((step, idx) => (
                <BlurFade key={idx} delay={0.14 + idx * 0.08} className="relative">
                  <span className="absolute -start-[29px] top-1.5 h-2.5 w-2.5 rounded-full border border-[#C9A24D] bg-[#0A0B0D]" />
                  <p className="text-[11px] font-semibold text-[#C9A24D]">{step.tag}</p>
                  <h4 className="mt-1 text-base font-semibold text-[#F3EFE6]">{step.title}</h4>
                  <p className="mt-1 text-sm text-[#9CA3AF]">{step.desc}</p>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Conversion CTA & Footer */}
      <footer id="contact" className="py-20 sm:py-24 bg-[#08090B]">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <BlurFade>
            <p className="text-xs font-semibold tracking-wider text-[#C9A24D]">
              {t.ctaFooter.sectionTag}
            </p>
            <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#F3EFE6] sm:text-6xl">
              {t.ctaFooter.titleStart}
              <span className={`block text-[#C9A24D] ${!isRtl ? "italic font-medium" : "mt-1"}`}>
                {t.ctaFooter.titleAccent}
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm text-[#9CA3AF] sm:text-base">
              {t.ctaFooter.subtitle}
            </p>

            <div className="mt-8 flex justify-center">
              <MagneticButton
                onClick={() => openConsultation()}
                className="inline-flex items-center gap-2.5 bg-[#C9A24D] px-7 py-4 text-sm font-semibold text-[#0A0B0D] transition hover:bg-[#d8b461]"
              >
                <span>{t.ctaFooter.button}</span>
                <DirectionArrow size={17} weight="bold" />
              </MagneticButton>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs text-[#9CA3AF]">
              {t.ctaFooter.tags.map((tag) => (
                <span key={tag} className="border border-[#C9A24D]/15 bg-[#121418] px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </BlurFade>
        </div>

        <div className="mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-[#C9A24D]/15 px-5 pt-8 text-xs text-[#9CA3AF] sm:flex-row sm:px-8">
          <MonogramLogo isRtl={isRtl} />
          <div className="flex flex-wrap items-center gap-6">
            <span>{t.ctaFooter.location}</span>
            <span>{t.ctaFooter.copyright}</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={CONTACT_CONFIG.youtubeChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#C9A24D] transition hover:underline underline-offset-4"
            >
              {t.ctaFooter.youtube}
            </a>
            <a
              href={CONTACT_CONFIG.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#9CA3AF] transition hover:text-[#C9A24D]"
            >
              {t.ctaFooter.facebook}
            </a>
          </div>
        </div>

        {/* Bestryful Soft Agency Credit Bar */}
        <div className="mx-auto mt-6 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-[#C9A24D]/10 px-5 pt-6 text-xs text-[#9CA3AF] sm:flex-row sm:px-8">
          <div className="flex items-center gap-2.5">
            <span>{isRtl ? "تصميم وتطوير:" : "Crafted by"}</span>
            <a
              href={CONTACT_CONFIG.agency.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded border border-[#C9A24D]/25 bg-[#121418] px-3 py-1.5 text-[#F3EFE6] transition hover:border-[#C9A24D]/60"
            >
              <img
                src={CONTACT_CONFIG.agency.logo}
                alt={CONTACT_CONFIG.agency.name}
                className="h-5 w-5 rounded bg-white object-contain p-0.5"
              />
              <span className="font-semibold">{CONTACT_CONFIG.agency.name}</span>
              <DirectionArrow size={12} className="text-[#C9A24D]" />
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Clickable Facebook Icon */}
            <a
              href={CONTACT_CONFIG.agency.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Bestryful Soft Facebook"
              className="flex h-8 w-8 items-center justify-center border border-[#C9A24D]/25 bg-[#121418] text-[#9CA3AF] transition hover:border-[#C9A24D] hover:text-[#1877F2]"
            >
              <FacebookLogo size={18} weight="fill" />
            </a>

            {/* WhatsApp Button with Full Premade Arabic Message */}
            <a
              href={`https://wa.me/${CONTACT_CONFIG.agency.whatsappNumber}?text=${encodeURIComponent(
                CONTACT_CONFIG.agency.premadeMessage
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#163B2F] bg-[#163B2F]/45 px-3.5 py-1.5 text-xs font-medium text-[#F3EFE6] transition hover:border-[#C9A24D]/50 hover:bg-[#163B2F]/75"
            >
              <WhatsappLogo size={17} weight="fill" className="text-emerald-400" />
              <span>{isRtl ? "تواصل مع Bestryful Soft" : "Contact Bestryful Soft"}</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Modals & Drawers */}
      <VideoTheaterModal
        episode={selectedEpisode}
        onClose={() => setSelectedEpisode(null)}
        copy={t.modal}
        isRtl={isRtl}
      />

      <ConsultationDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        copy={t.drawer}
        isRtl={isRtl}
        initialTopic={drawerTopic}
      />
    </div>
  );
}