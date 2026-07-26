import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import "./HorizontalWork.css";

const domainOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

// Sticky section: vertical scroll drives the track horizontally (desktop).
// On touch/small screens it degrades to a native horizontal scroller.
export default function HorizontalWork({ projects, eyebrow, title }) {
  const wrapRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-58%"]);

  return (
    <section ref={wrapRef} className={`hwork ${isDesktop ? "is-pinned" : ""}`}>
      <div className="hwork-sticky">
        <div className="container hwork-head">
          <Reveal className="eyebrow" as="span">
            {eyebrow}
          </Reveal>
          <div className="hwork-head-row">
            <Reveal as="h2" className="section-title">
              {title}
            </Reveal>
            <Reveal delay={0.1}>
              <Link to="/portfolio" className="btn btn-ghost btn-sm" data-cursor-hover>
                All Projects
              </Link>
            </Reveal>
          </div>
        </div>

        <motion.div className="hwork-track" style={isDesktop ? { x } : undefined}>
          {projects.map((p, i) => (
            <Link to={`/portfolio/${p.slug}`} className="hwork-card" key={p.slug} data-cursor-hover>
              <span className="hwork-index">{String(i + 1).padStart(2, "0")}</span>
              <div className="hwork-browser">
                <span className="hwork-chrome" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <b>{domainOf(p.liveUrl) ?? "private build"}</b>
                </span>
                <div className="hwork-media">
                  {p.image ? (
                    <img src={p.image} alt={`${p.title} website preview`} loading="lazy" />
                  ) : (
                    <div className="hwork-media-fallback">{p.tag}</div>
                  )}
                </div>
              </div>
              <div className="hwork-meta">
                <h3>{p.title}</h3>
                <div className="hwork-tags">
                  {p.categories.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
          <Link to="/portfolio" className="hwork-card hwork-card-more" data-cursor-hover>
            <span className="hwork-more-arrow">→</span>
            <span className="hwork-more-label">See all 24 projects</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
