import { Link } from "react-router-dom";
import { business, services } from "../data/site";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-cta-block">
          <span className="eyebrow">Have a project in mind?</span>
          <Link to="/contact" className="footer-cta" data-cursor-hover>
            Let's Talk
            <span className="footer-cta-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <div className="footer-top">
          <div className="footer-brand">
            <img src="/images/logo-web-pro.png" alt="Web Pro Chicago" className="footer-logo-img" width="230" height="100" />
            <p className="footer-tagline">
              Chicago locals who build websites that actually work. Web design, development, SEO & digital
              marketing for local businesses.
            </p>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`}>
                {s.title}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h4>Navigate</h4>
            <Link to="/services">Services</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-col">
            <h4>Get in touch</h4>
            <a href={business.phoneHref}>{business.phone}</a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <span>{business.address}</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Web Pro Chicago. All rights reserved.</span>
          <span>Designed &amp; built in Chicago.</span>
        </div>
      </div>
    </footer>
  );
}
