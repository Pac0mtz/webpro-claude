import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import useSEO from "../hooks/useSEO";
import Reveal from "../components/Reveal";
import Counter from "../components/Counter";
import Marquee from "../components/Marquee";
import MarqueeText from "../components/MarqueeText";
import SplitText from "../components/SplitText";
import RotatingWord from "../components/RotatingWord";
import HorizontalWork from "../components/HorizontalWork";
import TestimonialCarousel from "../components/TestimonialCarousel";
import MeshBackground from "../components/MeshBackground";
import Magnetic from "../components/Magnetic";
import { stats, industries, services, portfolio, testimonials, process, whyUs } from "../data/site";
import "./Home.css";

const lineReveal = {
  hidden: { y: "112%" },
  show: (i) => ({
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Home() {
  useSEO({
    title: "Chicago Web Design, Development & SEO Agency",
    description:
      "Web Pro Chicago builds fast, modern, high-converting websites for Chicago businesses. Web design, development, SEO, and digital marketing from a local team.",
    path: "/",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const featured = [
    ...portfolio.filter((p) => p.featured),
    ...portfolio.filter((p) => !p.featured && p.image).slice(0, 5),
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <MeshBackground variant="hero" />
        <motion.div className="container hero-inner" style={{ y: heroY, opacity: heroOpacity }}>
          <Reveal variant="fade" className="eyebrow hero-eyebrow" as="span">
            Chicago Web Agency — Est. 2015
          </Reveal>

          <h1 className="hero-title">
            <span className="mask-line">
              <motion.span custom={0} variants={lineReveal} initial="hidden" animate="show">
                Web Design
              </motion.span>
            </span>
            <span className="mask-line">
              <motion.span custom={1} variants={lineReveal} initial="hidden" animate="show" className="hero-line-2">
                in <em className="accent-serif text-gradient">Chicago</em>
              </motion.span>
            </span>
          </h1>

          <Reveal as="div" delay={0.5} className="hero-rotator" aria-label="Websites that actually convert, rank, sell, win">
            Websites that actually&nbsp;
            <RotatingWord words={["convert.", "rank.", "sell.", "win."]} />
          </Reveal>

          <Reveal as="p" delay={0.6} className="hero-sub">
            Chicago locals who build websites that actually work. No BS, just results your neighbors already trust.
          </Reveal>

          <Reveal as="div" delay={0.7} className="hero-actions">
            <Magnetic>
              <Link to="/contact" className="btn btn-primary" data-cursor-hover>
                Get Started
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/portfolio" className="btn btn-ghost" data-cursor-hover>
                View Our Work
              </Link>
            </Magnetic>
          </Reveal>
        </motion.div>

        <Reveal variant="fade" delay={1.1} className="hero-scroll" aria-hidden="true">
          <span className="hero-scroll-text">Scroll</span>
          <span className="hero-scroll-line" />
        </Reveal>

        <Reveal variant="fade" delay={0.9} className="hero-marquee">
          <Marquee items={industries} />
        </Reveal>
      </section>

      {/* STATS */}
      <section className="stats-strip">
        <div className="container stats-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="stat-item">
              <span className="stat-value">
                {typeof s.value === "number" && s.suffix !== "–4wk" ? <Counter value={s.value} suffix={s.suffix} /> : `${s.value}${s.suffix}`}
              </span>
              <span className="stat-label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <Reveal className="eyebrow" as="span">
              01 — Services
            </Reveal>
            <div className="section-head-row">
              <SplitText as="h2" className="section-title">
                What We Do
              </SplitText>
              <Reveal delay={0.1}>
                <Link to="/services" className="btn btn-ghost btn-sm" data-cursor-hover>
                  All Services
                </Link>
              </Reveal>
            </div>
          </div>

          <div className="services-grid">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <Link to={`/services/${s.slug}`} className="service-card glass" data-cursor-hover>
                  <span className="service-tag">{s.tag}</span>
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                  <span className="service-card-foot">
                    <span className="service-category">{s.category}</span>
                    <span className="service-arrow" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO — horizontal scroll showcase */}
      <HorizontalWork projects={featured} eyebrow="02 — Portfolio" title="Featured Work" />

      <MarqueeText text="DESIGN — DEVELOP — LAUNCH — GROW" />

      {/* WHY US */}
      <section className="section">
        <div className="container why-grid">
          <div className="why-copy">
            <Reveal className="eyebrow" as="span">
              03 — Why Us
            </Reveal>
            <SplitText as="h2" className="section-title">
              Built for Chicago Business
            </SplitText>
            <Reveal as="p" delay={0.1} className="why-sub">
              We're not some outsourced agency halfway across the country. We're your Chicago neighbors who know
              exactly what it takes to compete in this city.
            </Reveal>
            <Reveal delay={0.2}>
              <Magnetic>
                <Link to="/contact" className="btn btn-primary" data-cursor-hover>
                  Work With Us
                </Link>
              </Magnetic>
            </Reveal>
          </div>

          <div className="why-list">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06} className="why-item">
                <span className="why-index">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{w.title}</h4>
                  <p>{w.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal variant="fade" delay={0.2} className="why-skyline" aria-hidden="true">
          <img src="/images/sections/chicago-skyline.svg" alt="" width="1200" height="420" loading="lazy" />
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <Reveal className="eyebrow" as="span">
              04 — Testimonials
            </Reveal>
            <SplitText as="h2" className="section-title">
              What Clients Say
            </SplitText>
          </div>
          <Reveal variant="scale">
            <TestimonialCarousel items={testimonials} />
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <Reveal className="eyebrow" as="span">
              05 — Process
            </Reveal>
            <SplitText as="h2" className="section-title">
              How We Work
            </SplitText>
          </div>

          <div className="process-grid">
            {process.map((p, i) => (
              <Reveal key={p.tag} delay={i * 0.1} className="process-item">
                <span className="process-tag">{p.tag}</span>
                <h4>{p.title}</h4>
                <p>{p.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MarqueeText text="LET'S BUILD SOMETHING GREAT" reverse />

      {/* CTA */}
      <section className="section cta">
        <div className="container cta-inner glass">
          <Reveal className="eyebrow" as="span">
            Ready to Grow?
          </Reveal>
          <Reveal as="h2" className="cta-title">
            Let's Build <em className="accent-serif text-gradient">Something Great</em>
          </Reveal>
          <Reveal as="p" delay={0.1} className="cta-sub">
            Stop watching your competition take the top spots. Let's put your business where it belongs.
          </Reveal>
          <Reveal delay={0.2} className="hero-actions">
            <Magnetic>
              <Link to="/contact" className="btn btn-primary" data-cursor-hover>
                Get a Free Consultation
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/portfolio" className="btn btn-ghost" data-cursor-hover>
                See Our Work
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
