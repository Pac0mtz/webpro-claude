import { Link, Navigate, useParams } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import useJsonLd from "../hooks/useJsonLd";
import Reveal from "../components/Reveal";
import SplitText from "../components/SplitText";
import MeshBackground from "../components/MeshBackground";
import Magnetic from "../components/Magnetic";
import FAQ from "../components/FAQ";
import GeoMark from "../components/GeoMark";
import PortfolioCard from "../components/PortfolioCard";
import MarqueeText from "../components/MarqueeText";
import { services, portfolio, process, business } from "../data/site";
import "./ServiceDetail.css";

export default function ServiceDetail() {
  const { slug } = useParams();
  const index = services.findIndex((s) => s.slug === slug);
  const service = services[index];

  useSEO({
    title: service ? service.seoTitle : "Service Not Found",
    description: service?.seoDescription ?? "Service not found.",
    path: `/services/${slug}`,
  });

  useJsonLd(
    service
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.seoTitle,
            description: service.seoDescription,
            serviceType: service.title,
            areaServed: { "@type": "City", name: "Chicago" },
            provider: {
              "@type": "ProfessionalService",
              name: business.name,
              telephone: "+1-773-302-1100",
              address: {
                "@type": "PostalAddress",
                streetAddress: "5100 W Fullerton Ave",
                addressLocality: "Chicago",
                addressRegion: "IL",
                postalCode: "60639",
              },
            },
            url: `https://webprochicago.com/services/${service.slug}`,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: service.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://webprochicago.com/" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://webprochicago.com/services" },
              { "@type": "ListItem", position: 3, name: service.title, item: `https://webprochicago.com/services/${service.slug}` },
            ],
          },
        ]
      : null
  );

  if (!service) return <Navigate to="/services" replace />;

  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];
  const relatedProjects = service.related.map((s) => portfolio.find((p) => p.slug === s)).filter(Boolean);

  return (
    <>
      {/* HERO */}
      <section className="sd-hero">
        <MeshBackground variant="page" />
        <div className="container">
          <Reveal as="nav" className="sd-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.title}</span>
          </Reveal>

          <span className="sd-ghost-tag" aria-hidden="true">
            {service.tag}
          </span>

          <SplitText as="h1" delay={0.1} className="sd-title">
            {service.title}
          </SplitText>
          <Reveal delay={0.25}>
            <p className="sd-accent">
              <em className="accent-serif text-gradient">{service.accent}</em>
            </p>
          </Reveal>

          <Reveal as="p" delay={0.35} className="sd-intro">
            {service.intro}
          </Reveal>

          <Reveal variant="right" delay={0.35} className="sd-hero-art">
            <img src={`/images/services/${service.slug}.svg`} alt={`${service.title} illustration`} width="800" height="560" />
          </Reveal>

          <Reveal delay={0.45} className="sd-hero-actions">
            <Magnetic>
              <Link to="/contact" className="btn btn-primary" data-cursor-hover>
                Get a Free Quote
              </Link>
            </Magnetic>
            <a href={business.phoneHref} className="btn btn-ghost" data-cursor-hover>
              {business.phone}
            </a>
          </Reveal>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <Reveal className="eyebrow" as="span">
              What's Included
            </Reveal>
            <SplitText as="h2" className="section-title">
              Everything You Get
            </SplitText>
          </div>
          <div className="sd-deliverables">
            {service.deliverables.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 0.08} className="sd-deliverable glass">
                <div className="sd-deliverable-head">
                  <GeoMark index={i} />
                  <span className="sd-deliverable-index">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3>{d.title}</h3>
                <p>{d.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <Reveal className="eyebrow" as="span">
              How It Works
            </Reveal>
            <SplitText as="h2" className="section-title">
              From Hello to Launch
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

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head center">
            <Reveal className="eyebrow" as="span">
              Common Questions
            </Reveal>
            <SplitText as="h2" className="section-title">
              {`${service.title} FAQs`}
            </SplitText>
          </div>
          <FAQ items={service.faqs} />
        </div>
      </section>

      {/* RELATED WORK */}
      {relatedProjects.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <Reveal className="eyebrow" as="span">
                Proof, Not Promises
              </Reveal>
              <div className="section-head-row">
                <SplitText as="h2" className="section-title">
                  Related Work
                </SplitText>
                <Reveal delay={0.1}>
                  <Link to="/portfolio" className="btn btn-ghost btn-sm" data-cursor-hover>
                    All Projects
                  </Link>
                </Reveal>
              </div>
            </div>
            <div className="portfolio-grid">
              {relatedProjects.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06} variant="scale">
                  <PortfolioCard project={p} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <MarqueeText text={`${service.title.toUpperCase()} — CHICAGO`} />

      {/* PREV / NEXT */}
      <nav className="sd-pn" aria-label="More services">
        <Link to={`/services/${prev.slug}`} className="sd-pn-link" data-cursor-hover>
          <span className="sd-pn-label">← Previous</span>
          <span className="sd-pn-title">{prev.title}</span>
        </Link>
        <Link to="/services" className="sd-pn-all" data-cursor-hover aria-label="All services">
          <span />
          <span />
          <span />
          <span />
        </Link>
        <Link to={`/services/${next.slug}`} className="sd-pn-link right" data-cursor-hover>
          <span className="sd-pn-label">Next →</span>
          <span className="sd-pn-title">{next.title}</span>
        </Link>
      </nav>

      {/* CTA */}
      <section className="section cta">
        <div className="container cta-inner glass">
          <Reveal className="eyebrow" as="span">
            Ready When You Are
          </Reveal>
          <Reveal as="h2" className="cta-title">
            Let's Talk <em className="accent-serif text-gradient">{service.title}</em>
          </Reveal>
          <Reveal as="p" delay={0.1} className="cta-sub">
            Free consultation, honest pricing, and a fixed quote before we start. No pressure, no jargon.
          </Reveal>
          <Reveal delay={0.2} className="hero-actions">
            <Magnetic>
              <Link to="/contact" className="btn btn-primary" data-cursor-hover>
                Start Your Project
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
