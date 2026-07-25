import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import useSEO from "../hooks/useSEO";
import useJsonLd from "../hooks/useJsonLd";
import Reveal from "../components/Reveal";
import SplitText from "../components/SplitText";
import MeshBackground from "../components/MeshBackground";
import MarqueeText from "../components/MarqueeText";
import Counter from "../components/Counter";
import PortfolioCard from "../components/PortfolioCard";
import { portfolio, portfolioGroups, stats } from "../data/site";
import "./Portfolio.css";

const FEATURED_SLUGS = ["ab-environmental-consulting", "the-bakehouse-chicago", "the-fence-solutions", "marquez-construction-co"];

const domainOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

function CaseRow({ project, index }) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const domain = domainOf(project.liveUrl);

  return (
    <article ref={ref} className={`case-row ${index % 2 ? "flip" : ""}`}>
      <Link to={`/portfolio/${project.slug}`} className="case-art" data-cursor-hover aria-label={`${project.title} case study`}>
        <span className="case-chrome" aria-hidden="true">
          <i />
          <i />
          <i />
          {domain && <b>{domain}</b>}
        </span>
        <span className="case-img-wrap">
          <motion.img
            src={project.image}
            alt={`${project.title} website`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            style={prefersReduced ? undefined : { y, scale: 1.16 }}
          />
        </span>
      </Link>

      <div className="case-info">
        <span className="case-num text-stroke" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <SplitText as="h3" className="case-title">
          {project.title}
        </SplitText>
        <Reveal as="p" delay={0.08} className="case-summary">
          {project.summary}
        </Reveal>
        <Reveal delay={0.14} className="case-cats">
          {project.categories.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </Reveal>
        <Reveal delay={0.2} className="case-actions">
          <Link to={`/portfolio/${project.slug}`} className="btn btn-primary btn-sm" data-cursor-hover>
            Case Study
          </Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" data-cursor-hover>
              Visit Live ↗
            </a>
          )}
        </Reveal>
      </div>
    </article>
  );
}

export default function Portfolio() {
  useSEO({
    title: "Portfolio — Real Projects for Chicago Businesses",
    description:
      "Browse 24 real projects Web Pro Chicago has built — construction companies, restaurants, healthcare, salons, and creative brands across Chicago and beyond.",
    path: "/portfolio",
  });

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Web Pro Chicago Portfolio",
    url: "https://webprochicago.com/portfolio",
    description: "Websites designed and built by Web Pro Chicago.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: portfolio.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        url: p.liveUrl || `https://webprochicago.com/portfolio/${p.slug}`,
      })),
    },
  });

  const featured = FEATURED_SLUGS.map((slug) => portfolio.find((p) => p.slug === slug)).filter(Boolean);

  const groups = useMemo(
    () => [
      { label: "All Projects", count: portfolio.length },
      ...portfolioGroups.map((g) => ({ label: g, count: portfolio.filter((p) => p.group === g).length })),
    ],
    []
  );

  const [active, setActive] = useState("All Projects");
  const filtered = active === "All Projects" ? portfolio : portfolio.filter((p) => p.group === active);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="pf-hero">
        <MeshBackground variant="page" />
        <div className="container pf-hero-inner">
          <Reveal as="span" className="eyebrow">
            Our Work Speaks Loud
          </Reveal>
          <h1 className="pf-hero-title">
            <SplitText as="span" className="pf-hero-line">
              Real projects.
            </SplitText>
            <span className="pf-hero-line mask-line">
              <motion.em
                className="accent-serif text-gradient"
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                Real results.
              </motion.em>
            </span>
          </h1>
          <Reveal as="p" delay={0.35} className="pf-hero-sub">
            Every site below is live, in the wild, earning its keep for a business like yours — designed, built, and ranked
            by our Chicago team.
          </Reveal>

          <div className="pf-hero-stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.45 + i * 0.08} className="pf-stat">
                <Counter value={s.value} suffix={s.suffix} className="pf-stat-num" />
                <span className="pf-stat-label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Featured case studies ---------- */}
      <section className="section pf-featured">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Featured Case Studies</span>
            <h2 className="section-title">
              The work that <span className="accent-serif text-gradient">moves the needle</span>
            </h2>
          </Reveal>

          <div className="case-list">
            {featured.map((p, i) => (
              <CaseRow key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <MarqueeText text="SELECTED WORK — 24 PROJECTS" />

      {/* ---------- Full grid ---------- */}
      <section className="section portfolio-page">
        <div className="container">
          <Reveal className="filter-row">
            {groups.map((g) => (
              <button
                key={g.label}
                className={`filter-pill ${active === g.label ? "active" : ""}`}
                onClick={() => setActive(g.label)}
                data-cursor-hover
              >
                {g.label} <sup>{g.count}</sup>
              </button>
            ))}
          </Reveal>

          <motion.div layout className="portfolio-grid portfolio-grid-full">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <PortfolioCard project={p} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section cta">
        <div className="container cta-inner glass">
          <span className="eyebrow">Ready to Join Our Portfolio?</span>
          <h2 className="cta-title">
            Let's Build <span className="text-gradient">Something Together</span>
          </h2>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary" data-cursor-hover>
              Start Your Project
            </Link>
            <Link to="/services" className="btn btn-ghost" data-cursor-hover>
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
