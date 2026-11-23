/**
 * NovoCoupons Clone — Core Application Logic
 * Handles homepage pagination, live search dropdown, theme toggle,
 * dynamic availability counters, 3-stage coupon reveal modal, and brand detail views.
 */
(function () {
  const { brands, brandMap, coupons, popularBrandIds } = window.NovoData;

  const PAGE_SIZE = 12;
  const AVAIL_MIN = 120;

  const state = {
    page: 1,
    activeBrandId: null,
    activeModalCouponId: null,
    modalStage: 1, // 1 = details, 2 = validating, 3 = ready/locked
    codeUnlocked: false,
    modalVote: null, // 'up' | 'down' | null
    userBrandRatings: {} // brandId -> 1..5
  };

  // DOM References
  const htmlEl = document.documentElement;
  const homeView = document.getElementById("homeView");
  const brandView = document.getElementById("brandView");
  const couponsGrid = document.getElementById("couponsGrid");
  const paginationNav = document.getElementById("paginationNav");
  const popularBrandsList = document.getElementById("popularBrandsList");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchDropdown = document.getElementById("searchDropdown");
  const searchWrapper = document.getElementById("searchWrapper");
  const themeToggle = document.getElementById("themeToggle");
  const themeIconSun = document.getElementById("themeIconSun");
  const themeIconMoon = document.getElementById("themeIconMoon");
  const modalOverlay = document.getElementById("couponModalOverlay");
  const modalContent = document.getElementById("couponModalContent");

  // Reusable inline SVG icons
  const ICONS = {
    starFilled: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    starOutline: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    ticket: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M9 15 15 9"/><circle cx="9.5" cy="9.5" r=".6" fill="currentColor"/><circle cx="14.5" cy="14.5" r=".6" fill="currentColor"/></svg>`,
    scissors: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`,
    infinity: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z"/></svg>`,
    users: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    verified: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.39 1.85 3.01-.22 1.09 2.81 2.57 1.59-.55 2.97L22 13.72l-1.99 2.28.14 3.02-2.84 1.02-1.66 2.52-2.95-.63L10 23.3l-2.39-1.85-3.01.22-1.09-2.81-2.57-1.59.55-2.97L2 10.28 3.99 8l-.14-3.02 2.84-1.02L8.35 1.44l2.95.63L12 2zm-1.1 13.4l5.2-5.2-1.4-1.4-3.8 3.8-1.7-1.7-1.4 1.4 3.1 3.1z"/></svg>`,
    shieldCheck: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>`,
    close: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    lock: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    unlock: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
    thumbUp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>`,
    thumbDown: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"/></svg>`,
    copy: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    arrowLeft: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // =========================================================================
  // Theme Handling
  // =========================================================================
  function applyTheme(theme) {
    htmlEl.setAttribute("data-bs-theme", theme);
    if (theme === "light") {
      themeIconSun.classList.add("hidden");
      themeIconMoon.classList.remove("hidden");
    } else {
      themeIconSun.classList.remove("hidden");
      themeIconMoon.classList.add("hidden");
    }
    try {
      localStorage.setItem("novocoupons-theme", theme);
    } catch (_) {}
  }

  function initTheme() {
    let saved = "dark";
    try {
      saved = localStorage.getItem("novocoupons-theme") || "dark";
    } catch (_) {}
    applyTheme(saved);

    themeToggle.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-bs-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  // =========================================================================
  // Homepage Grid & Pagination
  // =========================================================================
  function renderCouponCard(coupon) {
    const brand = brandMap[coupon.brandId];
    return `
      <article class="coupon-card" data-coupon-id="${coupon.id}">
        <div class="card-banner">
          <img class="card-banner-img" src="${coupon.banner}" alt="${escapeHtml(coupon.title)}" loading="lazy" />
          <div class="rating-badge" aria-label="Rating ${coupon.rating}">
            ${ICONS.starFilled}
            <span>${coupon.rating.toFixed(1)}</span>
          </div>
          ${coupon.badge ? `<div class="coupon-type-badge">${escapeHtml(coupon.badge)}</div>` : ""}
          <a href="#brand/${brand.id}" class="brand-logo-wrapper" title="${escapeHtml(brand.name)}">
            <img src="${brand.logo}" alt="${escapeHtml(brand.name)} logo" loading="lazy" />
          </a>
        </div>

        <div class="card-body">
          <h3 class="card-title">${escapeHtml(coupon.title)}</h3>
          <a href="#brand/${brand.id}" class="card-brand-link">${escapeHtml(brand.name)}</a>

          <div class="coupon-incentive-inner">
            <span class="incentive-circle start" aria-hidden="true"></span>
            <span class="incentive-circle end" aria-hidden="true"></span>
            <div class="incentive-text">${escapeHtml(coupon.incentive)}</div>
            <div class="short-description-text">${escapeHtml(coupon.shortDesc)}</div>
          </div>

          <div class="coupons-remaining-wrapper" data-remaining-coupon="${coupon.id}">
            ${ICONS.ticket}
            <span><strong class="remaining-num">${coupon.remaining}</strong> coupons left</span>
          </div>

          <button type="button" class="btn-get-code" data-open-coupon="${coupon.id}">
            ${ICONS.scissors}
            <span>Get Code</span>
          </button>
        </div>

        <div class="card-footer-strip">
          <span class="card-footer-item">
            ${ICONS.infinity}
            <span>No expiration</span>
          </span>
          <span class="card-footer-item">
            ${ICONS.users}
            <span>${coupon.usesToday} uses today</span>
          </span>
        </div>
      </article>
    `;
  }

  function renderHome() {
    const totalPages = Math.ceil(coupons.length / PAGE_SIZE);
    if (state.page < 1) state.page = 1;
    if (state.page > totalPages) state.page = totalPages;

    const start = (state.page - 1) * PAGE_SIZE;
    const pageItems = coupons.slice(start, start + PAGE_SIZE);

    couponsGrid.innerHTML = pageItems.map(renderCouponCard).join("");

    // Render circular pagination
    let pagesHtml = `
      <li>
        <button type="button" class="page-btn" data-page="${state.page - 1}" ${state.page === 1 ? "disabled" : ""} aria-label="Previous page">«</button>
      </li>
    `;

    for (let p = 1; p <= totalPages; p++) {
      pagesHtml += `
        <li>
          <button type="button" class="page-btn ${p === state.page ? "active" : ""}" data-page="${p}" aria-current="${p === state.page ? "page" : "false"}">${p}</button>
        </li>
      `;
    }

    pagesHtml += `
      <li>
        <button type="button" class="page-btn" data-page="${state.page + 1}" ${state.page === totalPages ? "disabled" : ""} aria-label="Next page">»</button>
      </li>
    `;

    paginationNav.innerHTML = `<ul class="pagination-list">${pagesHtml}</ul>`;
  }

  // =========================================================================
  // Footer Popular Brands
  // =========================================================================
  function renderFooterBrands() {
    popularBrandsList.innerHTML = popularBrandIds
      .map((id) => {
        const brand = brandMap[id];
        if (!brand) return "";
        const count = coupons.filter((c) => c.brandId === id).length;
        return `
          <a href="#brand/${brand.id}" class="popular-brand-card">
            <img class="popular-brand-thumb" src="${brand.logo}" alt="${escapeHtml(brand.name)}" />
            <div>
              <div class="popular-brand-name">${escapeHtml(brand.name)}</div>
              <div class="popular-brand-count">${count} ${count === 1 ? "coupon" : "coupons"}</div>
            </div>
          </a>
        `;
      })
      .join("");
  }

  // =========================================================================
  // Brand Detail Page (#brand/<id>)
  // =========================================================================
  function renderBrandPage(brandId) {
    const brand = brandMap[brandId];
    if (!brand) {
      navigateHome();
      return;
    }

    const brandCoupons = coupons.filter((c) => c.brandId === brandId);
    const totalUsesToday = brandCoupons.reduce((acc, c) => acc + c.usesToday, 0);
    const userRating = state.userBrandRatings[brandId] || 0;

    document.title = `${brand.name} Coupons & Promo Codes | NovoCoupons`;

    const starsHtml = [1, 2, 3, 4, 5]
      .map(
        (num) => `
          <button type="button" class="star-btn ${num <= userRating ? "filled" : ""}" data-brand-star="${num}" data-brand-id="${brand.id}" aria-label="Rate ${num} stars">
            ${num <= userRating ? ICONS.starFilled.replace('width="13" height="13"', 'width="20" height="20"') : ICONS.starOutline}
          </button>
        `
      )
      .join("");

    const rowsHtml = brandCoupons
      .map(
        (c) => `
          <div class="coupon-row" data-coupon-id="${c.id}">
            <div class="coupon-row-ticket">
              <span class="incentive-circle start" aria-hidden="true"></span>
              <span class="incentive-circle end" aria-hidden="true"></span>
              ${escapeHtml(c.incentive)}
            </div>

            <div class="coupon-row-info">
              <h3 class="coupon-row-title">${escapeHtml(c.title)}</h3>
              <p class="coupon-row-desc">${escapeHtml(c.shortDesc)}</p>
            </div>

            <div class="coupon-row-meta">
              <div class="coupon-row-meta-item">
                <span class="rating-badge" style="position:static;box-shadow:none;">
                  ${ICONS.starFilled}
                  <span>${c.rating.toFixed(1)}</span>
                </span>
                <span>(${c.ratingsCount} ratings)</span>
              </div>
              <div class="coupon-row-meta-item">
                ${ICONS.infinity}
                <span>No expiration</span>
              </div>
              <div class="coupon-row-meta-item">
                ${ICONS.users}
                <span>${c.usesToday} uses today</span>
              </div>
              <div class="coupon-row-meta-item" data-remaining-coupon="${c.id}">
                ${ICONS.ticket}
                <span><strong class="remaining-num">${c.remaining}</strong> coupons left</span>
              </div>
            </div>

            <div class="coupon-row-cta">
              <button type="button" class="btn-get-code" style="width:auto;padding:0.65rem 1.35rem;" data-open-coupon="${c.id}">
                ${ICONS.scissors}
                <span>Get Code</span>
              </button>
            </div>
          </div>
        `
      )
      .join("");

    brandView.innerHTML = `
      <a href="#home" class="back-home-link">
        ${ICONS.arrowLeft}
        <span>Back to All Coupons</span>
      </a>

      <div class="brand-page-layout">
        <aside class="brand-sidebar">
          <div class="brand-info-card">
            <div class="brand-detail-logo">
              <img src="${brand.logo}" alt="${escapeHtml(brand.name)}" />
            </div>
            <h1 class="brand-detail-title">${escapeHtml(brand.name)}</h1>
            <p class="brand-detail-desc">${escapeHtml(brand.description)}</p>
          </div>

          <div class="brand-stats-grid">
            <div class="brand-stat-card">
              ${ICONS.ticket.replace('width="14" height="14"', 'width="22" height="22"')}
              <div class="brand-stat-value">${brandCoupons.length}</div>
              <div class="brand-stat-label">total coupons</div>
            </div>
            <div class="brand-stat-card">
              ${ICONS.shieldCheck}
              <div class="brand-stat-value">${brandCoupons.length}</div>
              <div class="brand-stat-label">verified coupons</div>
            </div>
            <div class="brand-stat-card">
              ${ICONS.users.replace('width="15" height="15"', 'width="22" height="22"')}
              <div class="brand-stat-value">${totalUsesToday}</div>
              <div class="brand-stat-label">uses today</div>
            </div>
          </div>

          <div class="brand-rating-card">
            <div class="star-rating-row">${starsHtml}</div>
            <div class="rating-summary-text">
              ${brand.rating.toFixed(1)} <span>• ${brand.ratingsCount + (userRating ? 1 : 0)} ratings</span>
            </div>
          </div>

          <div class="brand-tips-card">
            <h3>Shopping Tips</h3>
            <ul class="brand-tips-list">
              ${brand.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}
            </ul>
          </div>
        </aside>

        <div>
          <div class="brand-coupons-header">
            <h2>Available Coupons</h2>
            <span class="results-count">Showing ${brandCoupons.length} ${brandCoupons.length === 1 ? "result" : "results"}</span>
          </div>
          <div class="coupon-rows-list">${rowsHtml}</div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // Routing (#home / #brand/<id>)
  // =========================================================================
  function navigateHome() {
    state.activeBrandId = null;
    homeView.classList.remove("hidden");
    brandView.classList.add("hidden");
    document.title = "Home | NovoCoupons";
    renderHome();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function syncRoute() {
    const hash = window.location.hash || "#home";
    const brandMatch = hash.match(/^#brand\/(\d+)$/);
    if (brandMatch) {
      const id = Number(brandMatch[1]);
      if (brandMap[id]) {
        state.activeBrandId = id;
        homeView.classList.add("hidden");
        brandView.classList.remove("hidden");
        renderBrandPage(id);
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
    }
    state.activeBrandId = null;
    homeView.classList.remove("hidden");
    brandView.classList.add("hidden");
    document.title = "Home | NovoCoupons";
    renderHome();
  }

  // =========================================================================
  // Live Search Dropdown
  // =========================================================================
  function renderSearchDropdown(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      searchDropdown.classList.add("hidden");
      searchDropdown.innerHTML = "";
      return;
    }

    const matchedBrands = brands.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 5);
    const matchedCoupons = coupons
      .filter((c) => {
        const b = brandMap[c.brandId];
        return (
          c.title.toLowerCase().includes(q) ||
          c.shortDesc.toLowerCase().includes(q) ||
          c.incentive.toLowerCase().includes(q) ||
          b.name.toLowerCase().includes(q)
        );
      })
      .slice(0, 6);

    if (matchedBrands.length === 0 && matchedCoupons.length === 0) {
      searchDropdown.innerHTML = `<div class="search-empty">No matching brands or coupons found for "${escapeHtml(query)}"</div>`;
      searchDropdown.classList.remove("hidden");
      return;
    }

    let html = "";
    if (matchedBrands.length > 0) {
      html += `
        <div class="search-section">
          <div class="search-section-label">Brands</div>
          ${matchedBrands
            .map((b) => {
              const count = coupons.filter((c) => c.brandId === b.id).length;
              return `
                <a href="#brand/${b.id}" class="search-item" data-search-close="true">
                  <img class="search-brand-logo" src="${b.logo}" alt="${escapeHtml(b.name)}" />
                  <div>
                    <div class="search-item-title">${escapeHtml(b.name)}</div>
                    <div class="search-item-sub">${count} ${count === 1 ? "Coupon" : "Coupons"}</div>
                  </div>
                </a>
              `;
            })
            .join("")}
        </div>
      `;
    }

    if (matchedCoupons.length > 0) {
      html += `
        <div class="search-section">
          <div class="search-section-label">Coupons</div>
          ${matchedCoupons
            .map((c) => {
              const b = brandMap[c.brandId];
              return `
                <div class="search-item" role="option" data-open-coupon="${c.id}" data-search-close="true">
                  <div>
                    <div class="search-item-title">${escapeHtml(c.title)}</div>
                    <div class="search-item-sub">${escapeHtml(b.name)} • ${escapeHtml(c.incentive)}</div>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      `;
    }

    searchDropdown.innerHTML = html;
    searchDropdown.classList.remove("hidden");
  }

  // =========================================================================
  // 3-Stage Coupon Reveal Modal
  // =========================================================================
  function getCouponById(id) {
    return coupons.find((c) => c.id === Number(id));
  }

  function renderModalHeader(coupon, brand) {
    return `
      <div class="modal-header-banner">
        <div class="modal-header-bg" style="background-image:url('${coupon.banner}')"></div>
        <div class="modal-header-gradient"></div>
        <div class="modal-header-content">
          <img class="modal-brand-logo" src="${brand.logo}" alt="${escapeHtml(brand.name)}" />
          <div>
            <div class="modal-brand-name">${escapeHtml(brand.name)}</div>
            <h3 class="modal-coupon-title">${escapeHtml(coupon.title)}</h3>
            <div class="modal-header-pills">
              <span class="modal-pill" data-remaining-coupon="${coupon.id}">
                ${ICONS.ticket}
                <span><strong class="remaining-num">${coupon.remaining}</strong> coupons left</span>
              </span>
              <span class="modal-pill">
                ${ICONS.verified}
                <span>Verified</span>
              </span>
            </div>
          </div>
        </div>
        <button type="button" class="modal-close-btn" id="closeModalBtn" aria-label="Close modal">
          ${ICONS.close}
        </button>
      </div>
    `;
  }

  function renderModalStage1(coupon, brand) {
    const tail = coupon.code.slice(-4);
    modalContent.innerHTML = `
      ${renderModalHeader(coupon, brand)}
      <div class="modal-body-scroll">
        <div class="modal-incentive-banner">
          <span class="incentive-circle start" aria-hidden="true"></span>
          <span class="incentive-circle end" aria-hidden="true"></span>
          <div class="modal-incentive-title">${escapeHtml(coupon.incentive)}</div>
          <div class="modal-incentive-sub">${escapeHtml(coupon.shortDesc)}</div>
        </div>

        <div class="modal-stats-row">
          <div>
            <div class="modal-stat-top">
              ${ICONS.starOutline}
              <span>${coupon.rating.toFixed(1)}</span>
            </div>
            <div class="modal-stat-sub">${coupon.ratingsCount} Ratings</div>
          </div>
          <div>
            <div class="modal-stat-top">
              ${ICONS.users.replace('width="15" height="15"', 'width="18" height="18"')}
              <span>${coupon.usesToday}</span>
            </div>
            <div class="modal-stat-sub">Used today</div>
          </div>
        </div>

        <h4 class="modal-details-heading">Details</h4>
        <p class="modal-details-lead">${escapeHtml(coupon.shortDesc)}</p>
        <h5 class="modal-features-title">${escapeHtml(coupon.featuresTitle)}</h5>
        <ul class="modal-features-list">
          ${coupon.features.map((f) => `<li>${escapeHtml(f)}</li>`).join("")}
        </ul>
      </div>

      <div class="modal-footer-bar">
        <div class="peel-code-wrapper" id="triggerRevealBtn" role="button" tabindex="0">
          <span class="peel-code-hint">••••${escapeHtml(tail)}</span>
          <span class="modal-btn-reveal">Show Coupon Code</span>
        </div>
      </div>
    `;
  }

  function startModalValidation(coupon, brand) {
    state.modalStage = 2;
    const radius = 46;
    const circumference = 2 * Math.PI * radius;

    modalContent.innerHTML = `
      ${renderModalHeader(coupon, brand)}
      <div class="modal-stage-validating">
        <div class="progress-ring-wrap">
          <svg class="progress-ring-svg" width="112" height="112" viewBox="0 0 112 112">
            <circle class="progress-ring-track" cx="56" cy="56" r="${radius}"></circle>
            <circle
              id="progressRingBar"
              class="progress-ring-bar"
              cx="56"
              cy="56"
              r="${radius}"
              stroke-dasharray="${circumference}"
              stroke-dashoffset="${circumference}"
            ></circle>
          </svg>
          <div id="progressRingText" class="progress-ring-text">0%</div>
        </div>
        <p id="validatingStatus" class="validating-status">Checking coupon code validity...</p>
        <p class="validating-sub">Verifying active promo availability for ${escapeHtml(brand.name)}</p>
      </div>
    `;

    let progress = 0;
    const bar = document.getElementById("progressRingBar");
    const txt = document.getElementById("progressRingText");
    const statusEl = document.getElementById("validatingStatus");

    const timer = setInterval(() => {
      if (state.activeModalCouponId !== coupon.id) {
        clearInterval(timer);
        return;
      }
      progress = Math.min(100, progress + Math.floor(Math.random() * 14) + 10);
      const offset = circumference - (progress / 100) * circumference;
      if (bar) bar.style.strokeDashoffset = offset;
      if (txt) txt.textContent = `${progress}%`;

      if (progress >= 100) {
        clearInterval(timer);
        if (bar) bar.classList.add("valid");
        if (statusEl) statusEl.textContent = "Coupon is valid!";
        setTimeout(() => {
          if (state.activeModalCouponId === coupon.id) {
            state.modalStage = 3;
            renderModalStage3(coupon, brand);
          }
        }, 420);
      }
    }, 95);
  }

  function renderModalStage3(coupon, brand, feedbackMsg = "") {
    const maskedCode = coupon.code.slice(0, -3) + "•••";
    const displayedCode = state.codeUnlocked ? coupon.code : maskedCode;

    modalContent.innerHTML = `
      ${renderModalHeader(coupon, brand)}
      <div class="modal-stage-ready">
        <h3 class="ready-title">Your Coupon Code is Ready!</h3>
        <p class="ready-sub">
          ${
            state.codeUnlocked
              ? "Copy your verified code below and apply it at checkout."
              : "The code will be revealed in the box below after verification"
          }
        </p>

        <div class="locked-code-box">
          <div class="locked-code-header">
            <span>COUPON CODE</span>
            <span class="lock-status-pill ${state.codeUnlocked ? "unlocked" : ""}">
              ${state.codeUnlocked ? ICONS.unlock : ICONS.lock}
              <span>${state.codeUnlocked ? "UNLOCKED" : "LOCKED"}</span>
            </span>
          </div>
          <div class="code-display-value ${state.codeUnlocked ? "" : "blurred"}" id="modalCodeValue">
            ${escapeHtml(displayedCode)}
          </div>
        </div>

        ${
          state.codeUnlocked
            ? `<button type="button" class="ready-action-btn" id="copyCodeBtn">${ICONS.copy}<span>Copy Full Code</span></button>`
            : `<button type="button" class="ready-action-btn" id="unlockCodeBtn">Get Full Code</button>`
        }
      </div>

      <div class="modal-rate-footer">
        <div class="rate-label">Rate this coupon</div>
        <div class="rate-buttons">
          <button type="button" class="rate-thumb-btn ${state.modalVote === "up" ? "active-up" : ""}" data-rate-vote="up" aria-label="Thumbs up">
            ${ICONS.thumbUp}
          </button>
          <button type="button" class="rate-thumb-btn ${state.modalVote === "down" ? "active-down" : ""}" data-rate-vote="down" aria-label="Thumbs down">
            ${ICONS.thumbDown}
          </button>
        </div>
        <div class="rate-feedback-msg" id="rateFeedbackMsg">${escapeHtml(feedbackMsg)}</div>
      </div>
    `;
  }

  function openCouponModal(couponId) {
    const coupon = getCouponById(couponId);
    if (!coupon) return;
    const brand = brandMap[coupon.brandId];

    state.activeModalCouponId = coupon.id;
    state.modalStage = 1;
    state.codeUnlocked = false;
    state.modalVote = null;

    renderModalStage1(coupon, brand);
    modalOverlay.classList.add("open");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeCouponModal() {
    state.activeModalCouponId = null;
    modalOverlay.classList.remove("open");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // =========================================================================
  // Dynamic Availability Counter (mirrors CouponAvailability on live site)
  // =========================================================================
  function startAvailabilityTicker() {
    setInterval(() => {
      const idx = Math.floor(Math.random() * coupons.length);
      const coupon = coupons[idx];
      if (coupon.remaining > AVAIL_MIN) {
        coupon.remaining -= 1;
        document
          .querySelectorAll(`[data-remaining-coupon="${coupon.id}"] .remaining-num`)
          .forEach((el) => {
            el.textContent = coupon.remaining;
          });
      }
    }, 3500);
  }

  // =========================================================================
  // Event Listeners
  // =========================================================================
  function bindEvents() {
    // Prevent form submit reload on search
    searchForm.addEventListener("submit", (e) => e.preventDefault());

    searchInput.addEventListener("input", () => {
      renderSearchDropdown(searchInput.value);
    });

    searchInput.addEventListener("focus", () => {
      if (searchInput.value.trim()) {
        renderSearchDropdown(searchInput.value);
      }
    });

    document.addEventListener("click", (e) => {
      if (!searchWrapper.contains(e.target)) {
        searchDropdown.classList.add("hidden");
      }

      // Close search dropdown when clicking an item inside it
      if (e.target.closest("[data-search-close]")) {
        searchDropdown.classList.add("hidden");
        searchInput.value = "";
      }

      // Open Coupon Modal
      const openBtn = e.target.closest("[data-open-coupon]");
      if (openBtn) {
        openCouponModal(openBtn.getAttribute("data-open-coupon"));
        return;
      }

      // Pagination click
      const pageBtn = e.target.closest("[data-page]");
      if (pageBtn && !pageBtn.disabled) {
        state.page = Number(pageBtn.getAttribute("data-page"));
        renderHome();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Brand star rating click
      const starBtn = e.target.closest("[data-brand-star]");
      if (starBtn) {
        const bId = Number(starBtn.getAttribute("data-brand-id"));
        const val = Number(starBtn.getAttribute("data-brand-star"));
        state.userBrandRatings[bId] = val;
        renderBrandPage(bId);
        return;
      }

      // Close modal button
      if (e.target.closest("#closeModalBtn") || e.target === modalOverlay) {
        closeCouponModal();
        return;
      }

      // Stage 1 -> Stage 2 reveal
      if (e.target.closest("#triggerRevealBtn")) {
        const coupon = getCouponById(state.activeModalCouponId);
        if (coupon) startModalValidation(coupon, brandMap[coupon.brandId]);
        return;
      }

      // Stage 3: Unlock full code
      if (e.target.closest("#unlockCodeBtn")) {
        const coupon = getCouponById(state.activeModalCouponId);
        if (coupon) {
          state.codeUnlocked = true;
          coupon.usesToday += 1;
          renderModalStage3(coupon, brandMap[coupon.brandId]);
          if (state.activeBrandId) renderBrandPage(state.activeBrandId);
          else renderHome();
        }
        return;
      }

      // Stage 3: Copy full code
      const copyBtn = e.target.closest("#copyCodeBtn");
      if (copyBtn) {
        const coupon = getCouponById(state.activeModalCouponId);
        if (coupon) {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(coupon.code).catch(() => {});
          }
          copyBtn.classList.add("copied");
          copyBtn.innerHTML = `${ICONS.check}<span>Copied!</span>`;
          setTimeout(() => {
            if (copyBtn) {
              copyBtn.classList.remove("copied");
              copyBtn.innerHTML = `${ICONS.copy}<span>Copy Full Code</span>`;
            }
          }, 1800);
        }
        return;
      }

      // Stage 3: Rate thumbs up/down
      const voteBtn = e.target.closest("[data-rate-vote]");
      if (voteBtn) {
        const coupon = getCouponById(state.activeModalCouponId);
        if (!coupon) return;
        const msgEl = document.getElementById("rateFeedbackMsg");
        if (!state.codeUnlocked) {
          if (msgEl) msgEl.textContent = "You need to reveal the code first";
          return;
        }
        state.modalVote = voteBtn.getAttribute("data-rate-vote");
        renderModalStage3(
          coupon,
          brandMap[coupon.brandId],
          state.modalVote === "up"
            ? "Thanks! Glad this coupon worked for you."
            : "Thanks for your feedback — our team will re-verify this code."
        );
      }
    });

    // Keyboard support (Esc closes modal & dropdown)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeCouponModal();
        searchDropdown.classList.add("hidden");
      }
    });

    window.addEventListener("hashchange", syncRoute);
  }

  // =========================================================================
  // Initialize
  // =========================================================================
  initTheme();
  renderFooterBrands();
  bindEvents();
  syncRoute();
  startAvailabilityTicker();
})();
