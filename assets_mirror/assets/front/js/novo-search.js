/**
 * NovoCoupons Universal Intelligent Search Engine
 * Features:
 * - 1-letter instant live search
 * - Fuzzy misspelling & typo tolerance (Damerau-Levenshtein distance)
 * - Full Unicode internationalization & diacritics / accent folding (NFD normalization)
 * - Punctuation and case-insensitive tokenization
 * - Keyboard navigation (ArrowUp, ArrowDown, Enter, Escape)
 * - Context-aware path resolution for root pages and /products/ directory
 * - Seamless integration with existing NovoCoupons dark theme & style.css
 */
(function() {
    'use strict';

    // 60 Verified Coupons Catalog
    const CATALOG = [{"id":22,"title":"WWE 2K26 Locker Codes","slug":"wwe-2k26-locker-codes-coupon.html","brand":"WWE 2K26","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_27_c6f4e6ca4cf9af33.jpg","rating":4.9},{"id":25,"title":"Poppy Playtime Chapter 5","slug":"poppy-playtime-chapter-5-coupon.html","brand":"Poppy Playtime Chapter 5","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_28_81df3d1cf3243627.jpg","rating":4.9},{"id":26,"title":"Xbox Game Pass Ultimate","slug":"xbox-game-pass-ultimate-coupon.html","brand":"XBOX","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_29_46ef87c6066477bd.png","rating":4.8},{"id":27,"title":"Crimson Desert","slug":"crimson-desert-coupon.html","brand":"Crimson Desert","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_30_a2e30f782c548264.jpg","rating":4.8},{"id":29,"title":"Spotify Premium","slug":"spotify-premium-coupon.html","brand":"SPOTIFY","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_32_0cd4462fc64f5dfd.png","rating":4.9},{"id":30,"title":"ChatGPT Plus","slug":"chatgpt-plus-coupon.html","brand":"ChatGPT","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_33_40b22f79b29f677d.jpg","rating":4.8},{"id":31,"title":"Digital Deluxe Edition","slug":"digital-deluxe-edition-coupon.html","brand":"MLB The Show 26","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_34_1a41a26af95e66c0.jpg","rating":4.9},{"id":32,"title":"PlayStation Gift Card","slug":"playstation-gift-card-coupon.html","brand":"PLAYSTATION","incent":"$100 Gift Card","logo":"assets/uploads/brand_logos/brand_35_5c621eef9cb8554c.png","rating":4.9},{"id":33,"title":"Gemini Pro","slug":"gemini-pro-coupon.html","brand":"GEMINI","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_36_84931a36f5085ab4.png","rating":4.9},{"id":34,"title":"Netflix Premium","slug":"netflix-premium-coupon.html","brand":"NETFLIX","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_37_245dba5334dd51b8.jpg","rating":4.8},{"id":35,"title":"NBA 2K26 Locker Codes","slug":"nba-2k26-locker-codes-coupon.html","brand":"NBA 2K26","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_38_a0189e492104f0b1.jpg","rating":4.8},{"id":36,"title":"Taz Face Unlock","slug":"taz-face-unlock-coupon.html","brand":"NBA 2K26","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_38_a0189e492104f0b1.jpg","rating":4.9},{"id":42,"title":"Claude Pro","slug":"claude-pro-coupon.html","brand":"Claude","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_43_cd6fcba6f86ae1e6.jpg","rating":4.9},{"id":44,"title":"Cursor Pro","slug":"cursor-pro-coupon.html","brand":"Cursor","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_45_b0ff72ae11e66a57.webp","rating":4.9},{"id":62,"title":"Windrose","slug":"windrose-coupon.html","brand":"Windrose","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_63_054dff70c7a330b4.jpg","rating":4.8},{"id":73,"title":"007 First Light","slug":"007-first-light-coupon.html","brand":"007 First Light","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_74_c6576d8f708656bd.jpg","rating":4.9},{"id":77,"title":"UFC 6","slug":"ufc-6-coupon.html","brand":"UFC 6","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_78_76b4f6d5a3818141.jpg","rating":4.9},{"id":78,"title":"MECCHA CHAMELEON","slug":"meccha-chameleon-coupon.html","brand":"MECCHA CHAMELEON","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_79_07e49f97288c1c75.webp","rating":4.9},{"id":79,"title":"Assassin&apos;s Creed Black Flag Resynced","slug":"assassin-apos-s-creed-black-flag-resynced-coupon.html","brand":"Assassin&apos;s Creed Black Flag Resynced","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_80_d40e1bcd6e71d378.jpg","rating":4.9},{"id":80,"title":"College Football 27","slug":"college-football-27-coupon.html","brand":"EA SPORTS College Football 27","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_81_b1a3bf29cfb15e23.jpg","rating":4.9},{"id":82,"title":"Fears to Fathom - Scratch Creek","slug":"fears-to-fathom-scratch-creek-coupon.html","brand":"Fears to Fathom - Scratch Creek","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_83_995853f49e52fe43.png","rating":4.8},{"id":83,"title":"COD Black Ops 1","slug":"cod-black-ops-1-coupon.html","brand":"Call of Duty: Black OPS","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_84_ad86dbd6cf6f5dbe.jpg","rating":4.9},{"id":84,"title":"COD Black Ops 2","slug":"cod-black-ops-2-coupon.html","brand":"Call of Duty: Black OPS","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_84_ad86dbd6cf6f5dbe.jpg","rating":4.8},{"id":86,"title":"UFC 6 - 12000 UFC POINTS","slug":"ufc-6-12000-ufc-points-coupon.html","brand":"UFC 6","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_78_76b4f6d5a3818141.jpg","rating":4.8},{"id":97,"title":"Halo: Campaign Evolved","slug":"halo-campaign-evolved-coupon.html","brand":"Halo: Campaign Evolved","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_94_716b13464f8f5413.jpg","rating":4.9},{"id":125,"title":"NBA 2K27 Ultra Edition","slug":"nba-2k27-ultra-edition-coupon.html","brand":"NBA 2K27","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_115_e2f5c4018ce4b6b3.webp","rating":4.9},{"id":126,"title":"ELDEN RING Tarnished Pack","slug":"elden-ring-tarnished-pack-coupon.html","brand":"ELDEN RING","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_116_7c8da06f7781eccf.jpg","rating":4.8},{"id":133,"title":"Halloween: The Game","slug":"halloween-the-game-coupon.html","brand":"Halloween: The Game","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_123_d952fe0a4a23706d.jpg","rating":4.9},{"id":135,"title":"18500 Madden Points Pack","slug":"18500-madden-points-pack-coupon.html","brand":"EA SPORTS Madden NFL 27","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_101_9b33519d86604395.jpg","rating":4.9},{"id":136,"title":"Hall of Fame Pass: Season 1","slug":"hall-of-fame-pass-season-1-coupon.html","brand":"NBA 2K27","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_115_e2f5c4018ce4b6b3.webp","rating":4.9},{"id":137,"title":"700,000 VC Pack","slug":"700-000-vc-pack-coupon.html","brand":"NBA 2K27","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_115_e2f5c4018ce4b6b3.webp","rating":4.9},{"id":138,"title":"WARDOGS - Supporter Pack","slug":"wardogs-supporter-pack-coupon.html","brand":"WARDOGS","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_125_1979928ba62f53e4.jpg","rating":4.9},{"id":139,"title":"Marvel\u2019s Wolverine","slug":"marvel-s-wolverine-coupon.html","brand":"Marvel\u2019s Wolverine","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_126_54a644b0e10e6e6b.jpg","rating":4.9},{"id":140,"title":"Train Sim World 7","slug":"train-sim-world-7-coupon.html","brand":"Train Sim World 7 Code","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_127_d388d1cb12b555cb.jpg","rating":4.8},{"id":141,"title":"Honeycomb: The World Beyond","slug":"honeycomb-the-world-beyond-coupon.html","brand":"Honeycomb: The World Beyond","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_128_598db1303d612f05.jpg","rating":4.9},{"id":144,"title":"FC 27","slug":"fc-27-coupon.html","brand":"EA SPORTS FC 27","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_131_ec856e0cd493649d.jpg","rating":4.9},{"id":145,"title":"NASCAR 26","slug":"nascar-26-coupon.html","brand":"NASCAR 26","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_132_57f8867e224df9de.jpg","rating":4.9},{"id":146,"title":"Gear Club Unlimited 3","slug":"gear-club-unlimited-3-coupon.html","brand":"Gear Club Unlimited 3","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_133_d9bbcdba828fa498.jpg","rating":4.9},{"id":147,"title":"Clive Barker&apos;s Hellraiser: Revival","slug":"clive-barker-apos-s-hellraiser-revival-coupon.html","brand":"Clive Barker&apos;s Hellraiser: Revival","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_136_f71fbcf15219d22a.jpg","rating":4.9},{"id":149,"title":"Playable Aircraft: F-14A","slug":"playable-aircraft-f-14a-coupon.html","brand":"ACE COMBAT 8: WINGS OF THEVE","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_137_a9477137e2680f7b.jpg","rating":4.9},{"id":150,"title":"Customizable Cosmetic Set","slug":"customizable-cosmetic-set-coupon.html","brand":"ACE COMBAT 8: WINGS OF THEVE","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_137_a9477137e2680f7b.jpg","rating":4.9},{"id":154,"title":"Planet Zoo 2","slug":"planet-zoo-2-coupon.html","brand":"Planet Zoo 2","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_141_2a0e1c5a8b8a330c.jpg","rating":4.9},{"id":155,"title":"Castlevania: Belmont&apos;s Curse","slug":"castlevania-belmont-apos-s-curse-coupon.html","brand":"Castlevania Belmont&apos;s Curse","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_142_c9a91869fe29468b.jpg","rating":4.9},{"id":156,"title":"Valor Mortis","slug":"valor-mortis-coupon.html","brand":"Valor Mortis","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_143_861f0600d7ace96d.jpg","rating":4.9},{"id":157,"title":"Hood Warfare 2","slug":"hood-warfare-2-coupon.html","brand":"Hood Warfare 2","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_144_d2bc93ec61c7cb8d.jpg","rating":4.9},{"id":158,"title":"Enshrouded 1.0","slug":"enshrouded-1-0-coupon.html","brand":"Enshrouded","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_145_9757da86b58cd514.jpg","rating":4.9},{"id":160,"title":"Escape from Playtime","slug":"escape-from-playtime-coupon.html","brand":"Escape from Playtime","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_147_9e04a14491aeb611.jpg","rating":4.9},{"id":161,"title":"COD Modern Warfare 4","slug":"cod-modern-warfare-4-coupon.html","brand":"Call of Duty: Modern Warfare 4","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_148_aee1ade0d80d53f0.jpg","rating":4.9},{"id":163,"title":"Season 19: Research &amp; Restore","slug":"season-19-research-amp-restore-coupon.html","brand":"SnowRunner","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_150_4df7331520d74b67.jpg","rating":4.9},{"id":164,"title":"Warrior Cats: Clans of the Forest","slug":"warrior-cats-clans-of-the-forest-coupon.html","brand":"Warrior Cats: Clans of the Forest","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_151_88d37a748f58e0f2.jpg","rating":4.8},{"id":168,"title":"The Boss Gangster: Criminal Empire","slug":"the-boss-gangster-criminal-empire-coupon.html","brand":"The Boss Gangster: Criminal Empire","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_155_aab90bc6f5234089.jpg","rating":4.9},{"id":169,"title":"Phantom Blade Zero","slug":"phantom-blade-zero-coupon.html","brand":"Phantom Blade Zero","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_156_cdfe50f0a1ad8aa8.jpg","rating":4.9},{"id":170,"title":"The Wolf Among Us Remastered","slug":"the-wolf-among-us-remastered-coupon.html","brand":"The Wolf Among Us Remastered","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_157_4068b784787ffd3e.jpg","rating":4.8},{"id":171,"title":"ATMOSFAR","slug":"atmosfar-coupon.html","brand":"ATMOSFAR","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_158_14a7d9ad11622bf9.jpg","rating":4.9},{"id":175,"title":"The Long Dark: Iron Road","slug":"the-long-dark-iron-road-coupon.html","brand":"The Long Dark","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_161_d5573bd828cabdaa.jpg","rating":4.9},{"id":177,"title":"Probably Stolen - Cyberpunk Shopkeeper Sim","slug":"probably-stolen-cyberpunk-shopkeeper-sim-coupon.html","brand":"Probably Stolen - Cyberpunk Shopkeeper Sim Code","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_163_a62bf6d00db0fadc.jpg","rating":4.9},{"id":178,"title":"Potato Please","slug":"potato-please-coupon.html","brand":"Potato Please","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_164_a9ad1a4734b09545.jpg","rating":4.9},{"id":179,"title":"The Legend of Zelda Ocarina of Time","slug":"the-legend-of-zelda-ocarina-of-time-coupon.html","brand":"The Legend of Zelda Ocarina of Time","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_165_3ca5f4055ff45c3a.jpg","rating":4.9},{"id":181,"title":"Shrek 2 Remastered","slug":"shrek-2-remastered-coupon.html","brand":"Shrek 2 Remastered","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_167_970287410df6f1d9.jpg","rating":4.9},{"id":185,"title":"GTA 6: Ultimate Edition","slug":"gta-6-ultimate-edition-coupon.html","brand":"Grand Theft Auto VI","incent":"Game Code","logo":"assets/uploads/brand_logos/brand_171_92fefc8eea6f94f0.jpg","rating":4.9},{"id":9001,"title":"Black Myth Wukong Deluxe Edition","slug":"black-myth-wukong-deluxe-coupon.html","brand":"Game Science","incent":"Promo Code","logo":"assets/uploads/brand_logos/brand_33_40b22f79b29f677d.jpg","rating":4.9},{"id":9002,"title":"Fortnite 13500 V-Bucks Card","slug":"fortnite-13500-vbucks-coupon.html","brand":"Epic Games","incent":"V-Bucks Code","logo":"assets/uploads/brand_logos/brand_33_40b22f79b29f677d.jpg","rating":4.8},{"id":9003,"title":"Roblox 10000 Robux Gift Card","slug":"roblox-10000-robux-coupon.html","brand":"Roblox Corporation","incent":"Robux Code","logo":"assets/uploads/brand_logos/brand_33_40b22f79b29f677d.jpg","rating":4.7},{"id":9004,"title":"Valorant 5350 VP Digital Code","slug":"valorant-5350-vp-coupon.html","brand":"Riot Games","incent":"VP Code","logo":"assets/uploads/brand_logos/brand_33_40b22f79b29f677d.jpg","rating":4.8},{"id":9005,"title":"Minecraft 3500 Minecoins Pack","slug":"minecraft-3500-minecoins-coupon.html","brand":"Mojang Studios","incent":"Minecoins Code","logo":"assets/uploads/brand_logos/brand_33_40b22f79b29f677d.jpg","rating":4.7},{"id":9006,"title":"EA SPORTS FC 26 12000 FC Points","slug":"ea-fc26-12000-points-coupon.html","brand":"EA Sports","incent":"FC Points Code","logo":"assets/uploads/brand_logos/brand_33_40b22f79b29f677d.jpg","rating":4.6},{"id":9007,"title":"Genshin Impact 6480 Genesis Crystals","slug":"genshin-impact-6480-crystals-coupon.html","brand":"HoYoverse","incent":"Crystal Code","logo":"assets/uploads/brand_logos/brand_33_40b22f79b29f677d.jpg","rating":4.8},{"id":9008,"title":"Helldivers 2 Super Citizen Upgrade","slug":"helldivers2-super-citizen-coupon.html","brand":"Arrowhead Game Studios","incent":"Upgrade Code","logo":"assets/uploads/brand_logos/brand_33_40b22f79b29f677d.jpg","rating":4.7},{"id":9009,"title":"League of Legends 11000 RP Card","slug":"league-of-legends-11000-rp-coupon.html","brand":"Riot Games","incent":"RP Code","logo":"assets/uploads/brand_logos/brand_33_40b22f79b29f677d.jpg","rating":4.8},{"id":9010,"title":"Cyberpunk 2077 Phantom Liberty","slug":"cyberpunk2077-phantom-liberty-coupon.html","brand":"CD PROJEKT RED","incent":"DLC Code","logo":"assets/uploads/brand_logos/brand_33_40b22f79b29f677d.jpg","rating":4.9}];

    // Common synonyms, acronyms, and misspellings
    const ALIASES = {
        'gta': ['grand theft auto', 'gta', 'rockstar'],
        'gta6': ['gta 6', 'grand theft auto vi', 'gta vi'],
        'gtavi': ['gta 6', 'grand theft auto vi'],
        'catgpt': ['chatgpt'],
        'chtgpt': ['chatgpt'],
        'chatgbt': ['chatgpt'],
        'cgpt': ['chatgpt'],
        'gpt': ['chatgpt'],
        'cod': ['call of duty', 'black ops', 'modern warfare'],
        'ps5': ['playstation'],
        'ps4': ['playstation'],
        'psn': ['playstation'],
        'play station': ['playstation'],
        'vc': ['vc pack', '2k'],
        'spotfy': ['spotify'],
        'spotifi': ['spotify'],
        'spottify': ['spotify'],
        'netflx': ['netflix'],
        'netlfix': ['netflix'],
        'netflixx': ['netflix'],
        'wwe': ['wwe 2k26', 'wrestling'],
        'fifa': ['fc 27', 'ea sports'],
        'ea fc': ['fc 27'],
        'eafc': ['fc 27'],
        'zelda': ['the legend of zelda', 'ocarina of time'],
        'wolverine': ['marvel', 'wolverine'],
        'wolvrine': ['wolverine'],
        'elden': ['elden ring'],
        'eldrn': ['elden ring'],
        'curser': ['cursor'],
        'cursr': ['cursor'],
        'claud': ['claude'],
        'clod': ['claude'],
        'gemni': ['gemini'],
        'gmini': ['gemini'],
        'nfl': ['madden'],
        'football': ['college football', 'madden'],
        'shrk': ['shrek'],
        'popy': ['poppy playtime']
    };

    // Unicode international accent folding and punctuation normalization
    function normalizeText(str) {
        if (!str) return '';
        try {
            return str
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        } catch (e) {
            return String(str).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
        }
    }

    // Levenshtein distance for fuzzy typo matching
    function levenshtein(s1, s2) {
        if (s1 === s2) return 0;
        if (!s1.length) return s2.length;
        if (!s2.length) return s1.length;
        
        const v0 = new Array(s2.length + 1);
        const v1 = new Array(s2.length + 1);
        for (let i = 0; i <= s2.length; i++) v0[i] = i;
        
        for (let i = 0; i < s1.length; i++) {
            v1[0] = i + 1;
            for (let j = 0; j < s2.length; j++) {
                const cost = (s1[i] === s2[j]) ? 0 : 1;
                v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
            }
            for (let j = 0; j <= s2.length; j++) v0[j] = v1[j];
        }
        return v0[s2.length];
    }

    // Pre-calculate normalized fields for zero latency
    CATALOG.forEach(item => {
        item.normTitle = normalizeText(item.title);
        item.normBrand = normalizeText(item.brand);
        item.titleWords = item.normTitle.split(' ').filter(Boolean);
        item.brandWords = item.normBrand.split(' ').filter(Boolean);
        item.allWords = item.titleWords.concat(item.brandWords);
    });

    // Intelligent Search Core
    function queryCatalog(rawQuery) {
        const q = normalizeText(rawQuery);
        if (!q) return [];

        const qWords = q.split(' ').filter(Boolean);
        const expandedTerms = [q];

        if (ALIASES[q]) {
            ALIASES[q].forEach(a => expandedTerms.push(a));
        }
        qWords.forEach(w => {
            if (ALIASES[w]) {
                ALIASES[w].forEach(a => expandedTerms.push(a));
            }
        });

        const uniqueTerms = Array.from(new Set(expandedTerms));
        const scoredItems = [];

        for (let i = 0; i < CATALOG.length; i++) {
            const item = CATALOG[i];
            let score = 0;
            const title = item.normTitle;
            const brand = item.normBrand;

            for (let t = 0; t < uniqueTerms.length; t++) {
                const term = normalizeText(uniqueTerms[t]);
                if (!term) continue;

                // 1. Exact match on title or brand
                if (term === title || term === brand) {
                    score += 2500;
                }
                // 2. Prefix match on title or brand
                else if (title.startsWith(term) || brand.startsWith(term)) {
                    score += 1800;
                }
                // 3. Substring match
                else if (title.includes(term) || brand.includes(term)) {
                    score += 1200;
                }

                // 4. Word-level matches
                const tWords = term.split(' ').filter(Boolean);
                for (let w = 0; w < item.allWords.length; w++) {
                    const iw = item.allWords[w];
                    for (let qwIdx = 0; qwIdx < tWords.length; qwIdx++) {
                        const qw = tWords[qwIdx];
                        if (iw === qw) {
                            score += 900;
                        } else if (qw.length >= 1 && iw.startsWith(qw)) {
                            score += 650;
                        } else if (qw.length >= 3) {
                            const dist = levenshtein(qw, iw);
                            const maxDist = qw.length <= 4 ? 1 : 2;
                            if (dist <= maxDist) {
                                score += (450 - dist * 100);
                            }
                        }
                    }
                }
            }

            // Single-letter boost: direct title prefix
            if (q.length === 1) {
                if (title.startsWith(q)) {
                    score += 1200;
                } else {
                    for (let w = 0; w < item.allWords.length; w++) {
                        if (item.allWords[w].startsWith(q)) {
                            score += 500;
                            break;
                        }
                    }
                }
            }

            if (score > 0) {
                score += item.rating * 10;
                scoredItems.push({ score, item });
            }
        }

        scoredItems.sort((a, b) => b.score - a.score);
        return scoredItems.slice(0, 7).map(x => x.item);
    }

    // Path resolution helper based on current page location
    function getPathConfig() {
        const path = window.location.pathname.toLowerCase();
        const isInProducts = path.includes('/products/');
        return {
            productPrefix: isInProducts ? './' : './products/',
            assetPrefix: isInProducts ? '../' : './'
        };
    }

    // Escape HTML utility
    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function decodeHtmlEntities(str) {
        if (!str) return '';
        const txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
    }

    // Search Engine Controller Class
    class NovoSearchController {
        constructor(formEl) {
            this.form = formEl;
            this.input = formEl.querySelector('input[type="search"]') || formEl.querySelector('#searchInput');
            this.dropdown = formEl.querySelector('.search-dropdown') || formEl.querySelector('#searchDropdown');
            this.loader = formEl.querySelector('.search-loader');
            this.spinner = this.loader ? this.loader.querySelector('.spinner-border') : null;
            this.searchIcon = this.loader ? this.loader.querySelector('i') : null;
            this.activeIndex = -1;
            this.currentResults = [];

            if (!this.input) return;

            // Ensure dropdown exists
            if (!this.dropdown) {
                this.dropdown = document.createElement('div');
                this.dropdown.className = 'search-dropdown';
                this.dropdown.id = 'searchDropdown';
                this.form.appendChild(this.dropdown);
            }

            this.init();
        }

        init() {
            const input = this.input;
            const form = this.form;

            // Make sure input has autocomplete off
            input.setAttribute('autocomplete', 'off');
            input.setAttribute('spellcheck', 'false');

            // Input event - immediate, zero lag
            input.addEventListener('input', () => {
                this.handleSearch();
            });

            // Focus event - reopen results if there is already a query
            input.addEventListener('focus', () => {
                if (input.value.trim().length > 0) {
                    this.handleSearch();
                }
            });

            // Prevent standard form submission
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.triggerSelection();
            });

            // Keyboard navigation
            input.addEventListener('keydown', (e) => {
                if (!this.dropdown.classList.contains('show')) {
                    if (e.key === 'ArrowDown' || e.key === 'Enter') {
                        this.handleSearch();
                    }
                    return;
                }

                const items = this.dropdown.querySelectorAll('.search-item');
                if (!items.length) return;

                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        this.activeIndex = (this.activeIndex + 1) % items.length;
                        this.highlightItem(items);
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        this.activeIndex = (this.activeIndex - 1 + items.length) % items.length;
                        this.highlightItem(items);
                        break;
                    case 'Enter':
                        e.preventDefault();
                        this.triggerSelection();
                        break;
                    case 'Escape':
                        e.preventDefault();
                        this.hideDropdown();
                        input.blur();
                        break;
                }
            });

            // Dismiss on click outside
            document.addEventListener('click', (e) => {
                if (!form.contains(e.target)) {
                    this.hideDropdown();
                }
            });
        }

        highlightItem(items) {
            items.forEach((it, idx) => {
                if (idx === this.activeIndex) {
                    it.classList.add('active');
                    it.style.backgroundColor = 'var(--background, #16181f)';
                    it.scrollIntoView({ block: 'nearest' });
                } else {
                    it.classList.remove('active');
                    it.style.backgroundColor = '';
                }
            });
        }

        triggerSelection() {
            const items = this.dropdown.querySelectorAll('.search-item');
            if (this.activeIndex >= 0 && items[this.activeIndex]) {
                items[this.activeIndex].click();
            } else if (items.length > 0) {
                items[0].click();
            }
        }

        showLoader() {
            if (this.spinner) this.spinner.classList.remove('d-none');
            if (this.searchIcon) this.searchIcon.classList.add('d-none');
        }

        hideLoader() {
            if (this.spinner) this.spinner.classList.add('d-none');
            if (this.searchIcon) this.searchIcon.classList.remove('d-none');
        }

        handleSearch() {
            const rawQuery = this.input.value.trim();
            if (rawQuery.length === 0) {
                this.hideDropdown();
                this.hideLoader();
                return;
            }

            this.showLoader();
            this.activeIndex = -1;

            // Instant client-side search execution
            const results = queryCatalog(rawQuery);
            this.currentResults = results;
            this.renderDropdown(results, rawQuery);
            this.hideLoader();
        }

        renderDropdown(results, query) {
            const paths = getPathConfig();

            if (results.length === 0) {
                this.dropdown.innerHTML = `
                    <div class="search-empty text-center py-4 px-3">
                        <i class="bi bi-search d-block mb-2 text-secondary" style="font-size: 1.5rem; opacity: 0.6;"></i>
                        <p class="m-0 text-secondary fw-semibold">No coupons found for "<strong>${escapeHtml(query)}</strong>"</p>
                        <p class="small text-secondary mt-1 mb-0 opacity-75">Try checking for typos or searching by brand name</p>
                    </div>`;
                this.dropdown.classList.add('show');
                return;
            }

            let html = `
                <div class="search-section p-2">
                    <div class="search-section-title px-2 py-1 text-uppercase small text-secondary fw-bold" style="letter-spacing: 0.5px; font-size: 0.725rem;">
                        Verified Deals (${results.length})
                    </div>`;

            results.forEach((item, idx) => {
                const productUrl = paths.productPrefix + item.slug;
                const logoUrl = item.logo ? (paths.assetPrefix + 'assets_mirror/public/' + item.logo) : '';
                const decodedTitle = decodeHtmlEntities(item.title);
                const decodedBrand = decodeHtmlEntities(item.brand);

                html += `
                    <a href="${productUrl}" class="search-item d-flex align-items-center p-2 rounded-2 text-decoration-none text-light mb-1" data-index="${idx}">
                        ${logoUrl ? `
                            <img src="${logoUrl}" 
                                 alt="${escapeHtml(decodedTitle)}" 
                                 class="search-item-image rounded-2 me-3" 
                                 style="width: 36px; height: 36px; object-fit: contain; background: rgba(255,255,255,0.05); padding: 2px;"
                                 onerror="this.style.display='none'">
                        ` : ''}
                        <div class="search-item-content flex-grow-1 overflow-hidden">
                            <div class="search-item-title fw-bold text-truncate" style="font-size: 0.875rem;">${escapeHtml(decodedTitle)}</div>
                            <div class="search-item-subtitle small text-secondary text-truncate" style="font-size: 0.75rem;">
                                ${escapeHtml(decodedBrand)} • ${escapeHtml(item.incent || 'Promo Code')} • ★ ${item.rating}
                            </div>
                        </div>
                        <span class="badge bg-primary ms-2 px-2 py-1" style="font-size: 0.7rem; font-weight: 600;">Get Deal</span>
                    </a>`;
            });

            html += `</div>`;
            this.dropdown.innerHTML = html;
            this.dropdown.classList.add('show');
        }

        hideDropdown() {
            this.dropdown.classList.remove('show');
            this.activeIndex = -1;
        }
    }

    // Initialize across all forms with search input
    function initNovoSearch() {
        const searchForms = document.querySelectorAll('form[role="search"], form#searchForm, form.d-flex:has(input[type="search"])');
        
        if (searchForms.length > 0) {
            searchForms.forEach(form => {
                if (!form.__novoSearchInitialized) {
                    new NovoSearchController(form);
                    form.__novoSearchInitialized = true;
                }
            });
        } else {
            // Fallback: search by input element directly
            const inputs = document.querySelectorAll('input[type="search"]');
            inputs.forEach(input => {
                const parentForm = input.closest('form');
                if (parentForm && !parentForm.__novoSearchInitialized) {
                    new NovoSearchController(parentForm);
                    parentForm.__novoSearchInitialized = true;
                }
            });
        }
    }

    // Export globally
    window.NovoSearch = {
        query: queryCatalog,
        catalog: CATALOG,
        init: initNovoSearch
    };

    // Auto-boot
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNovoSearch);
    } else {
        initNovoSearch();
    }
})();
