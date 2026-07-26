import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import Reveal from "../components/Reveal";
import PageHero from "../components/PageHero";
import GeoMark from "../components/GeoMark";
import { aboutStats, values, team } from "../data/site";
import "./About.css";

export default function About() {
  useSEO({
    title: "About Us — Your Friendly Neighborhood Web Team",
    description: "Started in 2015, Web Pro Chicago has helped 150+ Chicago businesses go digital. Local team, honest pricing, real support.",
    path: "/about",
  });

  const person = team[0];

  return (
    <>
      <PageHero eyebrow="Nice to Meet You" title="We're Web Pro Chicago" subtitle="A small team that loves helping Chicago businesses win online.">
        <Reveal delay={0.24}>
          <Link to="/contact" className="btn btn-primary" data-cursor-hover>
            Let's Work Together
          </Link>
        </Reveal>
      </PageHero>

      <section className="about-stats-strip">
        <div className="container about-stats-grid">
          {aboutStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container about-story">
          <Reveal variant="left">
            <span className="eyebrow">Our Story</span>
            <h2 className="section-title">Est. 2015, still hungry.</h2>
          </Reveal>
          <Reveal variant="right" delay={0.1}>
            <p>
              We're a tight-knit crew that's helped 150+ Chicago businesses go digital — from startups to law firms
              to pizza shops. We still treat every client like they're our only one.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">What We're About</span>
            <h2 className="section-title">What we care about — and you should too.</h2>
          </Reveal>
          <div className="values-grid">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.08} className="value-card glass">
                <GeoMark index={i} />
                <h4>{v.title}</h4>
                <p>{v.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head center">
            <span className="eyebrow">Meet the Team</span>
            <h2 className="section-title">The Person Behind the Pixels</h2>
          </Reveal>
          <Reveal variant="scale" className="team-card glass">
            <div className="team-avatar">{person.name.split(" ").map((n) => n[0]).join("")}</div>
            <div className="team-info">
              <h3>{person.name}</h3>
              <span className="team-role">{person.role}</span>
              <p>{person.bio}</p>
              <div className="team-skills">
                {person.skills.map((sk) => (
                  <div className="skill-row" key={sk.label}>
                    <div className="skill-row-head">
                      <span>{sk.label}</span>
                      <span>{sk.value}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-bar-fill" style={{ width: `${sk.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section cta">
        <div className="container cta-inner glass">
          <span className="eyebrow">Want to Say Hi?</span>
          <h2 className="cta-title">
            Let's <span className="text-gradient">Talk</span>
          </h2>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary" data-cursor-hover>
              Get In Touch
            </Link>
            <Link to="/portfolio" className="btn btn-ghost" data-cursor-hover>
              See Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
