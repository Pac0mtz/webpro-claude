import "./GeoMark.css";

/*
 * Six branded geometric marks used to badge deliverable cards.
 * Line-first, brand palette (emerald + Chicago blue), with a red
 * Chicago-star accent threaded through the set. Selected by index.
 */
const MARKS = [
  // 01 — concentric arcs (build / layers)
  (
    <g key="m1" fill="none" strokeWidth="3.5" strokeLinecap="round">
      <circle cx="34" cy="34" r="22" stroke="var(--gm-blue)" opacity=".4" />
      <path d="M34 12a22 22 0 0 1 22 22" stroke="var(--gm-emerald)" />
      <path d="M34 20a14 14 0 0 1 14 14" stroke="var(--gm-emerald)" opacity=".7" />
      <circle cx="34" cy="34" r="4" fill="var(--gm-red)" stroke="none" />
    </g>
  ),
  // 02 — nested rotated squares (structure / strategy)
  (
    <g key="m2" fill="none" strokeWidth="3.5" strokeLinejoin="round">
      <rect x="14" y="14" width="40" height="40" rx="4" stroke="var(--gm-blue)" opacity=".4" />
      <rect x="34" y="6" width="40" height="40" rx="4" transform="rotate(45 34 34)" stroke="var(--gm-emerald)" />
      <circle cx="34" cy="34" r="4" fill="var(--gm-red)" stroke="none" />
    </g>
  ),
  // 03 — upward bars (conversion / growth)
  (
    <g key="m3" strokeLinecap="round">
      <g fill="none" strokeWidth="3.5">
        <line x1="16" y1="52" x2="16" y2="40" stroke="var(--gm-blue)" opacity=".55" />
        <line x1="28" y1="52" x2="28" y2="32" stroke="var(--gm-blue)" />
        <line x1="40" y1="52" x2="40" y2="24" stroke="var(--gm-emerald)" />
        <line x1="52" y1="52" x2="52" y2="14" stroke="var(--gm-emerald)" />
        <path d="M14 34 26 26 38 20 54 10" stroke="var(--gm-emerald)" opacity=".65" strokeWidth="2.5" />
      </g>
      <circle cx="54" cy="10" r="4" fill="var(--gm-red)" />
    </g>
  ),
  // 04 — device frames (responsive)
  (
    <g key="m4" fill="none" strokeWidth="3.5" strokeLinejoin="round">
      <rect x="10" y="16" width="34" height="36" rx="4" stroke="var(--gm-blue)" opacity=".5" />
      <rect x="40" y="26" width="18" height="30" rx="4" stroke="var(--gm-emerald)" />
      <line x1="46" y1="50" x2="52" y2="50" stroke="var(--gm-emerald)" strokeWidth="2.5" />
      <circle cx="27" cy="34" r="4" fill="var(--gm-red)" stroke="none" />
    </g>
  ),
  // 05 — overlapping circles (brand / identity blend)
  (
    <g key="m5" fill="none" strokeWidth="3.5">
      <circle cx="26" cy="34" r="18" stroke="var(--gm-emerald)" />
      <circle cx="42" cy="34" r="18" stroke="var(--gm-blue)" opacity=".55" />
      <circle cx="34" cy="34" r="4" fill="var(--gm-red)" stroke="none" />
    </g>
  ),
  // 06 — modular grid (design systems)
  (
    <g key="m6" fill="none" strokeWidth="3.5" strokeLinejoin="round">
      <rect x="12" y="12" width="20" height="20" rx="3" stroke="var(--gm-emerald)" />
      <rect x="36" y="12" width="20" height="20" rx="3" stroke="var(--gm-blue)" opacity=".55" />
      <rect x="12" y="36" width="20" height="20" rx="3" stroke="var(--gm-blue)" opacity=".55" />
      <rect x="36" y="36" width="20" height="20" rx="3" stroke="var(--gm-emerald)" />
      <circle cx="46" cy="46" r="4" fill="var(--gm-red)" stroke="none" />
    </g>
  ),
];

export default function GeoMark({ index = 0, className = "" }) {
  return (
    <svg className={`geo-mark ${className}`} viewBox="0 0 68 68" width="56" height="56" aria-hidden="true" focusable="false">
      {MARKS[index % MARKS.length]}
    </svg>
  );
}
