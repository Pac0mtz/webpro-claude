import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./Navbar.css";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY && y > 220);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav-wrap ${scrolled ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""}`}>
      <div className="container nav-inner glass">
        <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
          <img src="/images/logo-web-pro.png" alt="Web Pro Chicago" className="nav-logo-img" width="230" height="100" />
        </Link>

        <nav className="nav-links">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="btn btn-primary btn-sm nav-cta">
          Get Started
        </Link>

        <button className={`nav-burger ${open ? "open" : ""}`} onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {LINKS.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
              >
                <NavLink to={l.to} end={l.to === "/"} onClick={() => setOpen(false)} className="nav-mobile-link">
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
            <Link to="/contact" className="btn btn-primary" onClick={() => setOpen(false)}>
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
