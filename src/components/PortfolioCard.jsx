import { Link } from "react-router-dom";
import "./PortfolioCard.css";

const domainOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

export default function PortfolioCard({ project, index = 0 }) {
  const domain = project.liveUrl ? domainOf(project.liveUrl) : null;
  const smallImage = project.image ? project.image.replace(/\.jpg$/, "-sm.jpg") : null;

  const openLive = (e) => {
    // the whole card links to the case study; this chip opens the live site instead
    e.preventDefault();
    e.stopPropagation();
    window.open(project.liveUrl, "_blank", "noopener");
  };

  return (
    <Link to={`/portfolio/${project.slug}`} className="pf-card glass" data-cursor-hover>
      <span className="pf-card-chrome" aria-hidden="true">
        <i />
        <i />
        <i />
        <b>{domain ?? "private build"}</b>
      </span>
      <div className="pf-card-art" data-index={(index % 6) + 1}>
        {project.image ? (
          <img
            src={project.image}
            srcSet={smallImage ? `${smallImage} 800w, ${project.image} 1600w` : undefined}
            sizes="(max-width: 620px) 92vw, (max-width: 960px) 46vw, 30vw"
            alt={`${project.title} website preview`}
            width="1600"
            height="1000"
            loading="lazy"
            decoding="async"
            className="pf-card-img"
          />
        ) : null}
        <span className="pf-card-tag">{project.tag}</span>
        {project.liveUrl && (
          <button type="button" className="pf-card-live" onClick={openLive} data-cursor-hover aria-label={`Open ${project.title} live site in a new tab`}>
            Live ↗
          </button>
        )}
      </div>
      <div className="pf-card-body">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="pf-card-cats">
          {project.categories.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        <span className="pf-card-link">
          View Details <i>→</i>
        </span>
      </div>
    </Link>
  );
}
