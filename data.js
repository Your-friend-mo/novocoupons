/**
 * Coupon & Brand Catalog for NovoCoupons Clone
 * Includes all 12 exact Page 1 items from novocoupons.com plus Pages 2 & 3
 * and the Popular Brands showcased in the footer.
 */
window.NovoData = (function () {
  const A = window.NovoArt;

  const brands = [
    {
      id: 33,
      name: "ChatGPT",
      description:
        "ChatGPT is an AI-powered assistant developed by OpenAI that helps users create, learn, and solve problems through natural conversation. It can answer questions, generate content, assist with coding, brainstorming, and productivity, and offers free and premium plans that unlock more advanced features, faster responses, and enhanced capabilities.",
      logo: A.logo({ bg1: "#ffffff", bg2: "#e9f3f0", fg: "#111827", monogram: "AI", shape: "swirl" }),
      rating: 4.8,
      ratingsCount: 974,
      tips: [
        "Apply promo codes directly inside your OpenAI billing settings before confirming checkout.",
        "Annual billing plans can stack with verified seasonal offers for maximum savings.",
        "Check back daily as newly tested ChatGPT Plus promo codes are refreshed every 24 hours."
      ]
    },
    {
      id: 34,
      name: "PLAYSTATION",
      description:
        "PlayStation Store is Sony's official digital marketplace for PS5 and PS4 games, DLC, subscriptions, and add-ons. Redeem digital gift cards instantly to fund your wallet without needing a credit card.",
      logo: A.logo({ bg1: "#003791", bg2: "#0070d1", fg: "#ffffff", monogram: "PS" }),
      rating: 4.9,
      ratingsCount: 1248,
      tips: [
        "Redeem your 12-digit voucher under PlayStation Store → Redeem Codes.",
        "Gift card funds never expire once added to your PlayStation Network wallet.",
        "Combine wallet funds with PlayStation Plus monthly discounts for extra savings."
      ]
    },
    {
      id: 35,
      name: "Grand Theft Auto VI",
      description:
        "Grand Theft Auto VI returns to the neon-soaked streets of Vice City and the state of Leonida with Rockstar Games' largest and most immersive open world ever crafted.",
      logo: A.logo({ bg1: "#ff4e8a", bg2: "#5e2ced", fg: "#ffffff", monogram: "VI" }),
      rating: 4.9,
      ratingsCount: 2130,
      tips: [
        "Verify your target platform (PS5, Xbox Series X|S, or PC) before redeeming your game code.",
        "Ultimate Edition codes include bonus story content and online starter packs."
      ]
    },
    {
      id: 36,
      name: "007 First Light",
      description:
        "007 First Light is an original James Bond espionage action-adventure by IO Interactive, following a young agent earning his 00 status across globe-trotting missions.",
      logo: A.logo({ bg1: "#1c1917", bg2: "#785a28", fg: "#f5d07a", monogram: "007" }),
      rating: 4.9,
      ratingsCount: 642,
      tips: [
        "Digital game keys can be redeemed via your console store or PC launcher.",
        "Codes are region-free unless specifically noted in the offer details."
      ]
    },
    {
      id: 37,
      name: "XBOX",
      description:
        "Xbox Game Pass Ultimate gives you unlimited access to hundreds of high-quality console, PC, and cloud games, plus day-one releases, EA Play, and online console multiplayer.",
      logo: A.logo({ bg1: "#0e1111", bg2: "#107c10", fg: "#ffffff", monogram: "X", shape: "xbox" }),
      rating: 4.8,
      ratingsCount: 1580,
      tips: [
        "Redeem 25-character codes at redeem.microsoft.com while signed into your Xbox account.",
        "You can stack up to 36 months of Game Pass Ultimate on a single account."
      ]
    },
    {
      id: 38,
      name: "SPOTIFY",
      description:
        "Spotify Premium delivers ad-free music streaming, offline downloads, high-definition audio, and unlimited skips across more than 100 million tracks and podcasts.",
      logo: A.logo({ bg1: "#111827", bg2: "#1db954", fg: "#1ed760", monogram: "SP", shape: "waves" }),
      rating: 4.9,
      ratingsCount: 1890,
      tips: [
        "Enter promo codes at spotify.com/redeem for instant Premium activation.",
        "Works on both new accounts and returning accounts eligible for promo renewals."
      ]
    },
    {
      id: 39,
      name: "EA SPORTS FC 27",
      description:
        "EA SPORTS FC 27 brings next-generation HyperMotion gameplay, updated global leagues, Ultimate Team, and Career Mode enhancements to football fans worldwide.",
      logo: A.logo({ bg1: "#0f172a", bg2: "#16a34a", fg: "#ffffff", monogram: "FC27" }),
      rating: 4.9,
      ratingsCount: 834,
      tips: [
        "Redeem directly inside the EA App, PlayStation Store, or Xbox Store.",
        "Includes bonus Ultimate Team draft tokens when redeemed during launch season."
      ]
    },
    {
      id: 40,
      name: "Call of Duty: Modern Warfare 4",
      description:
        "Call of Duty: Modern Warfare 4 delivers a cinematic single-player campaign, tactical multiplayer maps, and cooperative Spec Ops missions built for next-gen hardware.",
      logo: A.logo({ bg1: "#111827", bg2: "#334155", fg: "#38bdf8", monogram: "MW4" }),
      rating: 4.9,
      ratingsCount: 1120,
      tips: [
        "Redeem on Battle.net, Steam, PlayStation, or Xbox depending on your chosen platform.",
        "Keep your Activision ID linked to receive bonus double-XP tokens."
      ]
    },
    {
      id: 41,
      name: "GEMINI",
      description:
        "Google Gemini Pro unlocks Google's most capable AI models, massive context windows, deep Workspace integration across Docs and Gmail, and 2 TB of Google One cloud storage.",
      logo: A.logo({ bg1: "#1d4ed8", bg2: "#7c3aed", fg: "#ffffff", monogram: "G", shape: "spark" }),
      rating: 4.9,
      ratingsCount: 745,
      tips: [
        "Apply your promo code inside Google One subscription settings.",
        "Includes Gemini access inside Gmail, Docs, Sheets, and Slides."
      ]
    },
    {
      id: 42,
      name: "Marvel’s Wolverine",
      description:
        "Developed by Insomniac Games, Marvel's Wolverine is a mature, visceral standalone action adventure starring Logan across gritty global locales.",
      logo: A.logo({ bg1: "#facc15", bg2: "#ca8a04", fg: "#111827", monogram: "W" }),
      rating: 4.9,
      ratingsCount: 912,
      tips: [
        "Redeem on PlayStation Store to pre-load and unlock launch-day digital bonuses.",
        "Verified codes work across US, EU, and global PSN accounts."
      ]
    },
    {
      id: 43,
      name: "Claude",
      description:
        "Claude Pro by Anthropic provides priority access to frontier reasoning, coding, and writing models with higher usage limits and extended project workspaces.",
      logo: A.logo({ bg1: "#d97757", bg2: "#b45309", fg: "#fff7ed", monogram: "CL" }),
      rating: 4.9,
      ratingsCount: 688,
      tips: [
        "Apply your promo code on the Claude Pro upgrade checkout screen.",
        "Great for long-context document analysis and complex software engineering."
      ]
    },
    {
      id: 44,
      name: "NETFLIX",
      description:
        "Netflix Premium gives your household Ultra HD 4K streaming with HDR, spatial audio, ad-free viewing across 4 simultaneous devices, and offline downloads.",
      logo: A.logo({ bg1: "#141414", bg2: "#b91c1c", fg: "#e50914", monogram: "N" }),
      rating: 4.8,
      ratingsCount: 2340,
      tips: [
        "Enter your code at netflix.com/redeem to apply credit directly to your billing balance.",
        "Existing subscribers can stack promo credits without losing watch history."
      ]
    },
    {
      id: 45,
      name: "Screamer",
      description:
        "Screamer is a high-octane arcade racing revival featuring neon anime aesthetics, drift combat mechanics, and online multiplayer championships.",
      logo: A.logo({ bg1: "#6d28d9", bg2: "#ec4899", fg: "#ffffff", monogram: "SC" }),
      rating: 4.8,
      ratingsCount: 214,
      tips: ["Redeem on Steam or console stores to unlock the full base game."]
    },
    {
      id: 46,
      name: "EA SPORTS College Football 27",
      description:
        "Experience authentic Saturday gameday atmosphere across 134 FBS schools with Dynasty Mode, Road to Glory, and updated rosters.",
      logo: A.logo({ bg1: "#1e3a8a", bg2: "#dc2626", fg: "#ffffff", monogram: "CF27" }),
      rating: 4.9,
      ratingsCount: 530,
      tips: ["Available for PS5 and Xbox Series X|S with instant digital delivery."]
    },
    {
      id: 47,
      name: "Monster Hunter Stories 3: Twisted Reflection",
      description:
        "Embark on a turn-based RPG adventure raising iconic monsters, forging kinship bonds, and unraveling a dark mystery in Monster Hunter Stories 3.",
      logo: A.logo({ bg1: "#0f766e", bg2: "#1e40af", fg: "#fef08a", monogram: "MH3" }),
      rating: 4.9,
      ratingsCount: 319,
      tips: ["Includes bonus layered armor set when redeemed."]
    },
    {
      id: 48,
      name: "STEAM",
      description:
        "Steam Wallet Gift Cards let you purchase thousands of PC games, DLCs, in-game items, and hardware directly from the Steam Store.",
      logo: A.logo({ bg1: "#171a21", bg2: "#1b2838", fg: "#66c0f4", monogram: "ST" }),
      rating: 4.9,
      ratingsCount: 1920,
      tips: ["Redeem under Games → Redeem a Steam Wallet Code in the Steam client."]
    },
    {
      id: 49,
      name: "DISCORD",
      description:
        "Discord Nitro upgrades your chat experience with HD 4K streaming, custom emojis everywhere, 500MB uploads, and 2 Server Boosts.",
      logo: A.logo({ bg1: "#5865f2", bg2: "#4752c4", fg: "#ffffff", monogram: "DC" }),
      rating: 4.8,
      ratingsCount: 1105,
      tips: ["Redeem in User Settings → Gift Inventory inside Discord."]
    },
    {
      id: 50,
      name: "YOUTUBE",
      description:
        "YouTube Premium removes ads across all videos, enables background play and offline downloads, and includes full access to YouTube Music.",
      logo: A.logo({ bg1: "#991b1b", bg2: "#dc2626", fg: "#ffffff", monogram: "YT" }),
      rating: 4.8,
      ratingsCount: 1460,
      tips: ["Redeem at youtube.com/redeem while signed into your Google account."]
    },
    {
      id: 51,
      name: "NINTENDO",
      description:
        "Nintendo eShop Gift Cards fund your Nintendo Account to download Switch and Switch 2 games, DLC passes, and Nintendo Switch Online.",
      logo: A.logo({ bg1: "#e60012", bg2: "#b91c1c", fg: "#ffffff", monogram: "NIN" }),
      rating: 4.9,
      ratingsCount: 1380,
      tips: ["Redeem directly on your console via Nintendo eShop → Enter Code."]
    },
    {
      id: 52,
      name: "ADOBE",
      description:
        "Adobe Creative Cloud All Apps unlocks Photoshop, Illustrator, Premiere Pro, After Effects, and 20+ industry-standard creative tools.",
      logo: A.logo({ bg1: "#dc2626", bg2: "#7f1d1d", fg: "#ffffff", monogram: "CC" }),
      rating: 4.8,
      ratingsCount: 840,
      tips: ["Redeem at redeem.adobe.com to apply 12 months of Creative Cloud."]
    },
    {
      id: 53,
      name: "AMAZON",
      description:
        "Amazon Digital Gift Cards can be redeemed toward millions of items storewide with no fees and no expiration date.",
      logo: A.logo({ bg1: "#232f3e", bg2: "#f59e0b", fg: "#ffffff", monogram: "AZ" }),
      rating: 4.9,
      ratingsCount: 2510,
      tips: ["Apply your claim code in Account → Gift Cards → Redeem a Gift Card."]
    },
    {
      id: 54,
      name: "ROBLOX",
      description:
        "Roblox Digital Gift Cards unlock Robux and exclusive virtual avatar items across millions of player-created experiences.",
      logo: A.logo({ bg1: "#18181b", bg2: "#3f3f46", fg: "#ffffff", monogram: "RBX" }),
      rating: 4.8,
      ratingsCount: 1620,
      tips: ["Redeem at roblox.com/redeem to convert into Robux or Premium."]
    },
    {
      id: 55,
      name: "APPLE",
      description:
        "Apple Gift Cards work for everything Apple — apps, games, iCloud+, Apple Music, Apple TV+, and hardware on apple.com.",
      logo: A.logo({ bg1: "#111827", bg2: "#4b5563", fg: "#ffffff", monogram: "AP" }),
      rating: 4.9,
      ratingsCount: 1790,
      tips: ["Redeem directly in the App Store app under your profile icon."]
    },
    {
      id: 56,
      name: "CANVA",
      description:
        "Canva Pro gives teams and creators unlimited premium templates, Magic Studio AI tools, Brand Kits, and one-click background removal.",
      logo: A.logo({ bg1: "#00c4cc", bg2: "#7d2ae8", fg: "#ffffff", monogram: "CV" }),
      rating: 4.9,
      ratingsCount: 920,
      tips: ["Apply your promo code inside Canva Billing & Plans."]
    }
  ];

  const brandMap = Object.fromEntries(brands.map((b) => [b.id, b]));

  const coupons = [
    // ================= PAGE 1 (12 Exact Items from novocoupons.com) =================
    {
      id: 101,
      brandId: 33,
      title: "ChatGPT Plus",
      incentive: "Promo Code",
      shortDesc: "Get 12 Months Free ChatGPT Plus",
      rating: 4.8,
      ratingsCount: 974,
      remaining: 359,
      usesToday: 53,
      badge: null,
      code: "PROMO-N54PY-CD8AP",
      banner: A.banner({ bg1: "#0b6e56", bg2: "#16a37f", accent: "#34d399", label: "ChatGPT", sublabel: "Plus", pattern: "circles" }),
      featuresTitle: "ChatGPT Plus Features:",
      features: [
        "Access to GPT-4 for more accurate, creative, and reliable responses",
        "Faster response times even during peak usage",
        "Priority access to new features and improvements",
        "More consistent availability when demand is high",
        "Extended context handling for deeper conversations and longer inputs"
      ]
    },
    {
      id: 102,
      brandId: 34,
      title: "PlayStation Gift Card",
      incentive: "$100 Gift Card",
      shortDesc: "Get $100 Playstation Store Digital Gift Card",
      rating: 4.9,
      ratingsCount: 1248,
      remaining: 255,
      usesToday: 33,
      badge: null,
      code: "PSN100-K92QX-7M4LP",
      banner: A.banner({ bg1: "#002a72", bg2: "#0066cc", accent: "#38bdf8", label: "PlayStation", sublabel: "Store $100", pattern: "glow" }),
      featuresTitle: "PlayStation Gift Card Benefits:",
      features: [
        "Instant $100 digital balance for PlayStation Store",
        "Works on PS5, PS4, and PlayStation Web Store",
        "Use for full games, DLCs, in-game currency, or PS Plus",
        "No expiration date once redeemed to your PSN wallet"
      ]
    },
    {
      id: 103,
      brandId: 35,
      title: "GTA 6: Ultimate Edition",
      incentive: "Game Code",
      shortDesc: "Grand Theft Auto VI: Ultimate Edition Free Code",
      rating: 4.9,
      ratingsCount: 2130,
      remaining: 222,
      usesToday: 40,
      badge: null,
      code: "GTA6-ULTM-88VCE-91X",
      banner: A.banner({ bg1: "#4c1d95", bg2: "#ec4899", accent: "#fb923c", label: "GTA VI", sublabel: "ULTIMATE EDITION", pattern: "diagonal" }),
      featuresTitle: "Ultimate Edition Includes:",
      features: [
        "Full base game download for PS5, Xbox Series X|S, or PC",
        "Vice City Criminal Enterprise Starter Pack",
        "Exclusive Ultimate Edition vehicles and outfits",
        "Early access digital bonus soundtrack"
      ]
    },
    {
      id: 104,
      brandId: 36,
      title: "007 First Light",
      incentive: "Game Code",
      shortDesc: "007 First Light Free Code",
      rating: 4.9,
      ratingsCount: 642,
      remaining: 176,
      usesToday: 64,
      badge: null,
      code: "BOND007-FL92-Q4R8",
      banner: A.banner({ bg1: "#1c1917", bg2: "#713f12", accent: "#eab308", label: "007", sublabel: "FIRST LIGHT", pattern: "diagonal" }),
      featuresTitle: "007 First Light Highlights:",
      features: [
        "Full digital standard edition key",
        "Compatible with Steam, PlayStation, and Xbox",
        "Includes MI6 Classic Suit cosmetic pack",
        "Verified region-free activation"
      ]
    },
    {
      id: 105,
      brandId: 37,
      title: "Xbox Game Pass Ultimate",
      incentive: "Promo Code",
      shortDesc: "Get 12 Months Xbox Game Pass Ultimate Code",
      rating: 4.8,
      ratingsCount: 1580,
      remaining: 495,
      usesToday: 54,
      badge: "Coupon",
      code: "XGPU-12MO-H7T3-W9K2",
      banner: A.banner({ bg1: "#052e16", bg2: "#15803d", accent: "#4ade80", label: "GAME PASS", sublabel: "ULTIMATE", pattern: "grid" }),
      featuresTitle: "Game Pass Ultimate Features:",
      features: [
        "Play hundreds of high-quality games on console, PC, and cloud",
        "New Xbox Game Studios titles on day one",
        "EA Play membership included at no extra cost",
        "Online console multiplayer and member perks"
      ]
    },
    {
      id: 106,
      brandId: 38,
      title: "Spotify Premium",
      incentive: "Promo Code",
      shortDesc: "Get 12 Months Free Spotify Premium",
      rating: 4.9,
      ratingsCount: 1890,
      remaining: 150,
      usesToday: 25,
      badge: null,
      code: "SPOT-PREM-44J8-Z2M9",
      banner: A.banner({ bg1: "#064e3b", bg2: "#1db954", accent: "#86efac", label: "Spotify", sublabel: "Premium", pattern: "circles" }),
      featuresTitle: "Spotify Premium Benefits:",
      features: [
        "Ad-free music listening across all devices",
        "Download tracks and playlists for offline playback",
        "High-quality 320kbps audio streaming",
        "Unlimited skips and on-demand playback"
      ]
    },
    {
      id: 107,
      brandId: 39,
      title: "FC 27",
      incentive: "Game Code",
      shortDesc: "EA SPORTS FC 27 Free Code",
      rating: 4.9,
      ratingsCount: 834,
      remaining: 459,
      usesToday: 62,
      badge: null,
      code: "EAFC27-PRO-51L9-B6V",
      banner: A.banner({ bg1: "#0f172a", bg2: "#15803d", accent: "#22d3ee", label: "FC 27", sublabel: "EA SPORTS", pattern: "diagonal" }),
      featuresTitle: "EA SPORTS FC 27 Features:",
      features: [
        "Full digital download for console or PC",
        "Updated 2026/27 clubs, kits, and global competitions",
        "4,600 FC Points starter bonus included",
        "Cross-play enabled across Ultimate Team and Clubs"
      ]
    },
    {
      id: 108,
      brandId: 40,
      title: "COD Modern Warfare 4",
      incentive: "Game Code",
      shortDesc: "COD: Modern Warfare 4 Free Code",
      rating: 4.9,
      ratingsCount: 1120,
      remaining: 478,
      usesToday: 59,
      badge: null,
      code: "CODMW4-TF141-88K2",
      banner: A.banner({ bg1: "#090d16", bg2: "#1e293b", accent: "#38bdf8", label: "MW4", sublabel: "CALL OF DUTY", pattern: "grid" }),
      featuresTitle: "Modern Warfare 4 Includes:",
      features: [
        "Full Campaign, Multiplayer, and Co-Op Spec Ops",
        "Task Force 141 Operator Bundle included",
        "10 Hours of Double XP and Double Weapon XP",
        "Instant digital activation"
      ]
    },
    {
      id: 109,
      brandId: 41,
      title: "Gemini Pro",
      incentive: "Promo Code",
      shortDesc: "Get 12 Month Gemini Pro",
      rating: 4.9,
      ratingsCount: 745,
      remaining: 360,
      usesToday: 26,
      badge: "Coupon",
      code: "GEM-PRO12-X9A4-C7Q",
      banner: A.banner({ bg1: "#1e3a8a", bg2: "#6d28d9", accent: "#38bdf8", label: "Gemini", sublabel: "Pro 12 Months", pattern: "glow" }),
      featuresTitle: "Gemini Pro Includes:",
      features: [
        "Priority access to Google's most capable Gemini models",
        "2 TB Google One cloud storage included",
        "Gemini integrated across Gmail, Docs, and Sheets",
        "Deep Research and extended 1M+ token context window"
      ]
    },
    {
      id: 110,
      brandId: 42,
      title: "Marvel’s Wolverine",
      incentive: "Game Code",
      shortDesc: "Marvel’s Wolverine Free Code",
      rating: 4.9,
      ratingsCount: 912,
      remaining: 517,
      usesToday: 28,
      badge: null,
      code: "WOLV-ADAM-93X7-L1M",
      banner: A.banner({ bg1: "#713f12", bg2: "#eab308", accent: "#fef08a", label: "WOLVERINE", sublabel: "MARVEL", pattern: "diagonal" }),
      featuresTitle: "Marvel's Wolverine Highlights:",
      features: [
        "Full digital edition game voucher",
        "Includes Classic Yellow & Blue Suit unlock",
        "4K 60FPS performance mode ready",
        "Instant verified code delivery"
      ]
    },
    {
      id: 111,
      brandId: 43,
      title: "Claude Pro",
      incentive: "Promo Code",
      shortDesc: "Get Claude Pro",
      rating: 4.9,
      ratingsCount: 688,
      remaining: 257,
      usesToday: 26,
      badge: null,
      code: "CLAUDE-PRO-62W9-R5N",
      banner: A.banner({ bg1: "#7c2d12", bg2: "#d97757", accent: "#fdba74", label: "Claude", sublabel: "Pro Plan", pattern: "circles" }),
      featuresTitle: "Claude Pro Features:",
      features: [
        "5x more usage compared to the free tier",
        "Priority access during high-traffic periods",
        "Full access to Claude Projects, Artifacts, and extended thinking",
        "Ideal for coding, writing, and deep research workflows"
      ]
    },
    {
      id: 112,
      brandId: 44,
      title: "Netflix Premium",
      incentive: "Promo Code",
      shortDesc: "Get 12 Months Netflix Premium",
      rating: 4.8,
      ratingsCount: 2340,
      remaining: 524,
      usesToday: 30,
      badge: null,
      code: "NFLX-4K12-V8P3-T6Y",
      banner: A.banner({ bg1: "#18181b", bg2: "#991b1b", accent: "#ef4444", label: "NETFLIX", sublabel: "4K Premium", pattern: "glow" }),
      featuresTitle: "Netflix Premium Benefits:",
      features: [
        "Ultra HD 4K + HDR streaming quality",
        "Watch on up to 4 supported devices simultaneously",
        "100% ad-free movies, series, and documentaries",
        "Download titles on up to 6 devices for offline viewing"
      ]
    },

    // ================= PAGE 2 (12 Additional Items) =================
    {
      id: 201,
      brandId: 45,
      title: "Screamer Digital Edition",
      incentive: "Game Code",
      shortDesc: "Screamer Full Game Free Code",
      rating: 4.8,
      ratingsCount: 214,
      remaining: 312,
      usesToday: 19,
      badge: null,
      code: "SCRM-DRFT-29P4-K8J",
      banner: A.banner({ bg1: "#3b0764", bg2: "#db2777", accent: "#38bdf8", label: "SCREAMER", sublabel: "ARCADE RACER", pattern: "diagonal" }),
      featuresTitle: "Screamer Edition Includes:",
      features: [
        "Full digital game key for PC and consoles",
        "Neon Drift Car Pack included",
        "Online ranked tournaments unlocked"
      ]
    },
    {
      id: 202,
      brandId: 46,
      title: "EA SPORTS College Football 27",
      incentive: "Game Code",
      shortDesc: "College Football 27 Standard Edition Code",
      rating: 4.9,
      ratingsCount: 530,
      remaining: 288,
      usesToday: 44,
      badge: "Coupon",
      code: "CFB27-DYNA-74M1-Q2X",
      banner: A.banner({ bg1: "#1e3a8a", bg2: "#b91c1c", accent: "#facc15", label: "CFB 27", sublabel: "EA SPORTS", pattern: "grid" }),
      featuresTitle: "College Football 27 Includes:",
      features: [
        "All 134 FBS schools and authentic stadiums",
        "Expanded Dynasty and Road to Glory modes",
        "Bonus Alma Mater Ultimate Team pack"
      ]
    },
    {
      id: 203,
      brandId: 46,
      title: "College Football 27 Points",
      incentive: "Promo Code",
      shortDesc: "Get 5,850 College Football Ultimate Team Points",
      rating: 4.8,
      ratingsCount: 312,
      remaining: 410,
      usesToday: 27,
      badge: null,
      code: "CFB27-PTS-5850-W9Z",
      banner: A.banner({ bg1: "#172554", bg2: "#0284c7", accent: "#38bdf8", label: "5,850 PTS", sublabel: "ULTIMATE TEAM", pattern: "circles" }),
      featuresTitle: "Points Bundle Details:",
      features: [
        "Instant 5,850 CUT Points credit",
        "Compatible with PS5 and Xbox Series X|S"
      ]
    },
    {
      id: 204,
      brandId: 47,
      title: "Monster Hunter Stories 3",
      incentive: "Game Code",
      shortDesc: "Monster Hunter Stories 3: Twisted Reflection Code",
      rating: 4.9,
      ratingsCount: 319,
      remaining: 194,
      usesToday: 31,
      badge: null,
      code: "MHS3-TWST-66R2-N4V",
      banner: A.banner({ bg1: "#0f766e", bg2: "#1d4ed8", accent: "#fde047", label: "MHS 3", sublabel: "TWISTED REFLECTION", pattern: "glow" }),
      featuresTitle: "Edition Highlights:",
      features: [
        "Full digital download code",
        "Includes Rider Layered Armor DLC",
        "Works on Switch 2, PS5, and Steam"
      ]
    },
    {
      id: 205,
      brandId: 48,
      title: "Steam Wallet Gift Card",
      incentive: "$100 Gift Card",
      shortDesc: "Get $100 Steam Wallet Digital Code",
      rating: 4.9,
      ratingsCount: 1920,
      remaining: 265,
      usesToday: 71,
      badge: "Coupon",
      code: "STEAM-100W-M3K8-P2Q",
      banner: A.banner({ bg1: "#171a21", bg2: "#1b2838", accent: "#66c0f4", label: "STEAM", sublabel: "$100 WALLET", pattern: "grid" }),
      featuresTitle: "Steam Gift Card Benefits:",
      features: [
        "Adds $100 instantly to your Steam Wallet",
        "Purchase any PC game, DLC, or Steam Deck accessory",
        "No expiration date or redemption fees"
      ]
    },
    {
      id: 206,
      brandId: 49,
      title: "Discord Nitro",
      incentive: "Promo Code",
      shortDesc: "Get 12 Months Free Discord Nitro + 2 Boosts",
      rating: 4.8,
      ratingsCount: 1105,
      remaining: 382,
      usesToday: 49,
      badge: null,
      code: "NITRO-12M-D9X4-L7C",
      banner: A.banner({ bg1: "#312e81", bg2: "#5865f2", accent: "#a5b4fc", label: "Discord", sublabel: "Nitro 1 Year", pattern: "circles" }),
      featuresTitle: "Discord Nitro Perks:",
      features: [
        "HD 4K 60fps screen sharing and Go Live streaming",
        "Custom animated emojis and stickers anywhere",
        "500MB file uploads and 2 monthly Server Boosts"
      ]
    },
    {
      id: 207,
      brandId: 50,
      title: "YouTube Premium",
      incentive: "Promo Code",
      shortDesc: "Get 12 Months YouTube Premium + Music",
      rating: 4.8,
      ratingsCount: 1460,
      remaining: 429,
      usesToday: 38,
      badge: null,
      code: "YTPREM-12M-R8V5-K2N",
      banner: A.banner({ bg1: "#7f1d1d", bg2: "#dc2626", accent: "#fca5a5", label: "YouTube", sublabel: "Premium", pattern: "glow" }),
      featuresTitle: "YouTube Premium Features:",
      features: [
        "Zero ads across mobile, desktop, and smart TVs",
        "Background playback and offline video downloads",
        "Includes full YouTube Music Premium subscription"
      ]
    },
    {
      id: 208,
      brandId: 51,
      title: "Nintendo eShop Gift Card",
      incentive: "$50 Gift Card",
      shortDesc: "Get $50 Nintendo eShop Digital Card",
      rating: 4.9,
      ratingsCount: 1380,
      remaining: 304,
      usesToday: 42,
      badge: null,
      code: "NINT-ESHOP-50X-9H4M",
      banner: A.banner({ bg1: "#991b1b", bg2: "#e60012", accent: "#fecaca", label: "eShop", sublabel: "$50 Digital Card", pattern: "diagonal" }),
      featuresTitle: "Nintendo eShop Card Details:",
      features: [
        "Redeem on Nintendo Switch and Switch 2 eShop",
        "Valid for digital games, DLC, and Switch Online"
      ]
    },
    {
      id: 209,
      brandId: 52,
      title: "Adobe Creative Cloud",
      incentive: "Promo Code",
      shortDesc: "Get 12 Months Adobe Creative Cloud All Apps",
      rating: 4.8,
      ratingsCount: 840,
      remaining: 218,
      usesToday: 29,
      badge: "Coupon",
      code: "ADBE-CCALL-41T8-G9S",
      banner: A.banner({ bg1: "#450a0a", bg2: "#dc2626", accent: "#fb923c", label: "Creative Cloud", sublabel: "All Apps", pattern: "circles" }),
      featuresTitle: "Creative Cloud Includes:",
      features: [
        "Photoshop, Illustrator, Premiere Pro, After Effects & 20+ apps",
        "100GB cloud storage and Adobe Firefly generative credits",
        "Adobe Fonts and Portfolio included"
      ]
    },
    {
      id: 210,
      brandId: 53,
      title: "Amazon Gift Card",
      incentive: "$100 Gift Card",
      shortDesc: "Get $100 Amazon Digital Gift Card Code",
      rating: 4.9,
      ratingsCount: 2510,
      remaining: 185,
      usesToday: 83,
      badge: null,
      code: "AMZN-100G-Q7W2-E5R",
      banner: A.banner({ bg1: "#1e293b", bg2: "#d97706", accent: "#fde047", label: "amazon", sublabel: "$100 Gift Card", pattern: "glow" }),
      featuresTitle: "Amazon Gift Card Highlights:",
      features: [
        "Applies instantly to your Amazon account balance",
        "Use on electronics, groceries, books, and Prime",
        "Never expires"
      ]
    },
    {
      id: 211,
      brandId: 54,
      title: "Roblox Gift Card",
      incentive: "10,000 Robux",
      shortDesc: "Get 10,000 Robux Digital Gift Card Code",
      rating: 4.8,
      ratingsCount: 1620,
      remaining: 446,
      usesToday: 67,
      badge: null,
      code: "ROBX-10K-B4N9-J6K",
      banner: A.banner({ bg1: "#18181b", bg2: "#3f3f46", accent: "#38bdf8", label: "ROBLOX", sublabel: "10,000 Robux", pattern: "grid" }),
      featuresTitle: "Roblox Card Benefits:",
      features: [
        "Redeem for 10,000 Robux plus exclusive virtual item",
        "Works across PC, Mobile, Xbox, and PlayStation"
      ]
    },
    {
      id: 212,
      brandId: 55,
      title: "Apple Gift Card",
      incentive: "$100 Gift Card",
      shortDesc: "Get $100 Apple App Store & Services Card",
      rating: 4.9,
      ratingsCount: 1790,
      remaining: 334,
      usesToday: 46,
      badge: null,
      code: "APPL-100C-X2M8-V4P",
      banner: A.banner({ bg1: "#111827", bg2: "#4b5563", accent: "#e5e7eb", label: "Apple", sublabel: "$100 Gift Card", pattern: "circles" }),
      featuresTitle: "Apple Gift Card Uses:",
      features: [
        "Valid for App Store, Apple Music, iCloud+, and Apple TV+",
        "Can also be applied toward hardware at apple.com"
      ]
    },

    // ================= PAGE 3 (6 More Items so Pagination 1-3 is full & realistic) =================
    {
      id: 301,
      brandId: 56,
      title: "Canva Pro",
      incentive: "Promo Code",
      shortDesc: "Get 12 Months Free Canva Pro Subscription",
      rating: 4.9,
      ratingsCount: 920,
      remaining: 391,
      usesToday: 34,
      badge: "Coupon",
      code: "CNVA-PRO12-H5L2-M8T",
      banner: A.banner({ bg1: "#0284c7", bg2: "#7c3aed", accent: "#22d3ee", label: "Canva", sublabel: "Pro 12 Months", pattern: "circles" }),
      featuresTitle: "Canva Pro Features:",
      features: [
        "Unlimited premium templates, photos, and graphics",
        "One-click Background Remover and Magic Resize",
        "1 TB cloud storage and Brand Kits"
      ]
    },
    {
      id: 302,
      brandId: 34,
      title: "PlayStation Plus Extra",
      incentive: "Promo Code",
      shortDesc: "Get 12 Months PlayStation Plus Extra Code",
      rating: 4.9,
      ratingsCount: 870,
      remaining: 274,
      usesToday: 37,
      badge: null,
      code: "PSPL-EXTR-12M-8Q3N",
      banner: A.banner({ bg1: "#0c4a6e", bg2: "#ca8a04", accent: "#fde047", label: "PS PLUS", sublabel: "EXTRA 12M", pattern: "diagonal" }),
      featuresTitle: "PS Plus Extra Includes:",
      features: [
        "Game Catalog with 400+ PS5 and PS4 titles",
        "Monthly free games and online multiplayer",
        "Exclusive PlayStation Store discounts"
      ]
    },
    {
      id: 303,
      brandId: 38,
      title: "Spotify Duo Plan",
      incentive: "Promo Code",
      shortDesc: "Get 6 Months Free Spotify Premium Duo",
      rating: 4.8,
      ratingsCount: 412,
      remaining: 208,
      usesToday: 18,
      badge: null,
      code: "SPOT-DUO6-P9R4-K1Z",
      banner: A.banner({ bg1: "#065f46", bg2: "#10b981", accent: "#a7f3d0", label: "Spotify", sublabel: "Premium Duo", pattern: "glow" }),
      featuresTitle: "Spotify Duo Includes:",
      features: [
        "2 separate Premium accounts for couples under one roof",
        "Ad-free listening and Duo Mix playlist"
      ]
    },
    {
      id: 304,
      brandId: 48,
      title: "Steam Wallet $50 Card",
      incentive: "$50 Gift Card",
      shortDesc: "Get $50 Steam Wallet Digital Gift Card",
      rating: 4.9,
      ratingsCount: 1124,
      remaining: 348,
      usesToday: 52,
      badge: null,
      code: "STEAM-50W-N7C3-Y4B",
      banner: A.banner({ bg1: "#0f172a", bg2: "#1d4ed8", accent: "#60a5fa", label: "STEAM", sublabel: "$50 WALLET", pattern: "grid" }),
      featuresTitle: "Steam $50 Card Details:",
      features: [
        "Instant $50 Steam Wallet credit",
        "Works worldwide on Steam PC & Steam Deck"
      ]
    },
    {
      id: 305,
      brandId: 44,
      title: "Netflix Standard Ad-Free",
      incentive: "Promo Code",
      shortDesc: "Get 6 Months Netflix Standard Subscription",
      rating: 4.8,
      ratingsCount: 785,
      remaining: 415,
      usesToday: 23,
      badge: null,
      code: "NFLX-STD6-F2K8-D9L",
      banner: A.banner({ bg1: "#27272a", bg2: "#b91c1c", accent: "#f87171", label: "NETFLIX", sublabel: "Standard 6M", pattern: "circles" }),
      featuresTitle: "Netflix Standard Includes:",
      features: [
        "Full HD 1080p ad-free streaming",
        "Watch on 2 devices at the same time"
      ]
    },
    {
      id: 306,
      brandId: 37,
      title: "Xbox $50 Digital Gift Card",
      incentive: "$50 Gift Card",
      shortDesc: "Get $50 Xbox & Microsoft Store Gift Card",
      rating: 4.9,
      ratingsCount: 650,
      remaining: 290,
      usesToday: 31,
      badge: null,
      code: "XBOX-50GC-T6W1-M5V",
      banner: A.banner({ bg1: "#052e16", bg2: "#16a34a", accent: "#86efac", label: "XBOX", sublabel: "$50 Gift Card", pattern: "diagonal" }),
      featuresTitle: "Xbox Gift Card Uses:",
      features: [
        "Buy games, add-ons, movies, and devices at Microsoft Store",
        "Never expires once redeemed"
      ]
    }
  ];

  // Popular brands shown in the footer (matching the original site's footer)
  const popularBrandIds = [45, 46, 47];

  return { brands, brandMap, coupons, popularBrandIds };
})();
