/**
 * Procedural SVG Artwork Generator for NovoCoupons Clone
 * Produces crisp, self-contained data-URI banners and square brand logos
 * with zero broken external image dependencies.
 */
window.NovoArt = (function () {
  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function toUri(svg) {
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg.trim());
  }

  function banner({ bg1, bg2, accent, label, sublabel = "", pattern = "circles" }) {
    let deco = "";
    if (pattern === "circles") {
      deco = `
        <circle cx="70" cy="40" r="85" fill="${accent}" opacity="0.16"/>
        <circle cx="350" cy="130" r="95" fill="${accent}" opacity="0.22"/>
        <circle cx="290" cy="20" r="45" fill="#ffffff" opacity="0.08"/>
      `;
    } else if (pattern === "diagonal") {
      deco = `
        <polygon points="0,160 180,0 260,0 80,160" fill="${accent}" opacity="0.18"/>
        <polygon points="220,160 390,0 440,0 270,160" fill="#ffffff" opacity="0.09"/>
      `;
    } else if (pattern === "grid") {
      deco = `
        <path d="M0 40 H420 M0 80 H420 M0 120 H420 M70 0 V160 M140 0 V160 M210 0 V160 M280 0 V160 M350 0 V160" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>
        <circle cx="310" cy="80" r="75" fill="${accent}" opacity="0.24"/>
      `;
    } else {
      deco = `
        <ellipse cx="210" cy="150" rx="220" ry="70" fill="${accent}" opacity="0.24"/>
        <circle cx="95" cy="48" r="52" fill="#ffffff" opacity="0.1"/>
      `;
    }

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 160">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${bg1}"/>
            <stop offset="100%" stop-color="${bg2}"/>
          </linearGradient>
        </defs>
        <rect width="420" height="160" fill="url(#g)"/>
        ${deco}
        <text x="275" y="${sublabel ? 78 : 90}" text-anchor="middle" fill="#ffffff" font-family="Lexend, Segoe UI, sans-serif" font-size="30" font-weight="800" letter-spacing="-0.5" opacity="0.95">${esc(label)}</text>
        ${
          sublabel
            ? `<text x="275" y="108" text-anchor="middle" fill="#ffffff" font-family="Lexend, Segoe UI, sans-serif" font-size="18" font-weight="600" opacity="0.82">${esc(sublabel)}</text>`
            : ""
        }
      </svg>
    `;
    return toUri(svg);
  }

  function logo({ bg1, bg2, fg = "#ffffff", monogram, shape = "text" }) {
    let center = `<text x="50" y="62" text-anchor="middle" fill="${fg}" font-family="Lexend, Segoe UI, sans-serif" font-size="${monogram.length > 3 ? 22 : monogram.length === 3 ? 28 : 38}" font-weight="800" letter-spacing="-1">${esc(monogram)}</text>`;

    if (shape === "swirl") {
      center = `
        <g transform="translate(50 50)" fill="none" stroke="${fg}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="0" cy="0" r="10"/>
          <path d="M-10 -2 C-20 -16, 4 -30, 12 -14"/>
          <path d="M10 -2 C24 -12, 24 14, 8 16"/>
          <path d="M6 10 C12 26, -14 28, -14 12"/>
          <path d="M-8 8 C-26 12, -26 -14, -8 -16"/>
          <path d="M0 -10 C6 -28, 28 -18, 16 -4"/>
          <path d="M-2 10 C-10 28, -28 14, -14 2"/>
        </g>
      `;
    } else if (shape === "spark") {
      center = `
        <path d="M50 18 C54 38, 62 46, 82 50 C62 54, 54 62, 50 82 C46 62, 38 54, 18 50 C38 46, 46 38, 50 18 Z" fill="${fg}"/>
      `;
    } else if (shape === "waves") {
      center = `
        <g fill="none" stroke="${fg}" stroke-width="7" stroke-linecap="round">
          <path d="M26 38 Q50 28 74 40"/>
          <path d="M30 53 Q50 45 70 55"/>
          <path d="M35 67 Q50 61 65 69"/>
        </g>
      `;
    } else if (shape === "xbox") {
      center = `
        <circle cx="50" cy="50" r="32" fill="${fg}"/>
        <path d="M30 30 Q50 48 70 70 M70 30 Q50 48 30 70" stroke="${bg1}" stroke-width="8" stroke-linecap="round" fill="none"/>
      `;
    }

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${bg1}"/>
            <stop offset="100%" stop-color="${bg2}"/>
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="18" fill="url(#lg)"/>
        ${center}
      </svg>
    `;
    return toUri(svg);
  }

  return { banner, logo };
})();
