import { SITE_VERSION } from "../lib/version";

function onHomeClick(event: Event) {
  event.preventDefault();
  const url = window.location.pathname + window.location.search;
  window.history.replaceState(null, "", url);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function onAnchorClick(event: Event) {
  const target = event.currentTarget as HTMLAnchorElement;
  const hash = target.getAttribute("href");
  if (!hash || !hash.startsWith("#") || hash.length < 2) return;
  const el = document.querySelector(hash);
  if (!el) return;
  event.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", hash);
}

function initHomeLinks(root: ParentNode) {
  root.querySelectorAll<HTMLAnchorElement>('[data-home-link="true"]').forEach((link) => {
    link.addEventListener("click", onHomeClick);
  });
}

function initAnchorLinks(root: ParentNode) {
  root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    if (link.hasAttribute("data-home-link")) return;
    link.addEventListener("click", onAnchorClick);
  });
}

function initTabs(root: ParentNode) {
  root.querySelectorAll(".w-tabs").forEach((tabs) => {
    const links = [...tabs.querySelectorAll<HTMLAnchorElement>(".w-tab-link")];
    const panes = [...tabs.querySelectorAll<HTMLElement>(".w-tab-pane")];
    if (!links.length || !panes.length) return;

    const activate = (tabId: string | null) => {
      links.forEach((link) => {
        const active = link.getAttribute("data-w-tab") === tabId;
        link.classList.toggle("w--current", active);
      });
      panes.forEach((pane) => {
        const active = pane.getAttribute("data-w-tab") === tabId;
        pane.classList.toggle("w--tab-active", active);
      });
    };

    const initial =
      links.find((l) => l.classList.contains("w--current"))?.getAttribute("data-w-tab") ??
      links[0]?.getAttribute("data-w-tab") ??
      null;
    activate(initial);

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        activate(link.getAttribute("data-w-tab"));
      });
    });
  });
}

function initSliders(root: ParentNode) {
  root.querySelectorAll(".w-slider").forEach((slider) => {
    const mask = slider.querySelector<HTMLElement>(".w-slider-mask");
    const slides = [...slider.querySelectorAll<HTMLElement>(".w-slide")];
    const left = slider.querySelector(".w-slider-arrow-left");
    const right = slider.querySelector(".w-slider-arrow-right");
    if (!mask || slides.length < 2) return;

    let index = 0;
    const duration = Number(slider.getAttribute("data-duration")) || 500;

    const go = (next: number) => {
      index = (next + slides.length) % slides.length;
      const offset = slides[index].offsetLeft;
      mask.style.transition = `transform ${duration}ms ease`;
      mask.style.transform = `translateX(${-offset}px)`;
    };

    left?.addEventListener("click", () => go(index - 1));
    right?.addEventListener("click", () => go(index + 1));

    const resize = () => go(index);
    window.addEventListener("resize", resize);
    go(0);
  });
}

function initLoopMarquee(root: ParentNode) {
  root.querySelectorAll(".loop_component").forEach((component) => {
    const loop = component.querySelector(".loop");
    if (!loop || component.querySelector(".loop.is-duplicate")) return;
    const clone = loop.cloneNode(true) as HTMLElement;
    clone.classList.add("is-duplicate");
    clone.setAttribute("aria-hidden", "true");
    component.appendChild(clone);
  });
}

function initMobileNav(root: ParentNode) {
  root.querySelectorAll(".w-nav").forEach((nav) => {
    const button = nav.querySelector(".w-nav-button, .menu-button");
    const menu = nav.querySelector(".w-nav-menu");
    if (!button || !menu) return;

    const toggle = () => {
      const open = button.classList.toggle("w--open");
      menu.classList.toggle("w--nav-menu-open", open);
      button.setAttribute("aria-expanded", open ? "true" : "false");
    };

    button.addEventListener("click", (event) => {
      event.preventDefault();
      toggle();
    });

    menu.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
      link.addEventListener("click", () => {
        button.classList.remove("w--open");
        menu.classList.remove("w--nav-menu-open");
        button.setAttribute("aria-expanded", "false");
      });
    });
  });
}

function initForms(root: ParentNode) {
  root.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const success = form.parentElement?.querySelector(".w-form-done");
      const fail = form.parentElement?.querySelector(".w-form-fail");
      form.style.display = "none";
      if (success instanceof HTMLElement) success.style.display = "block";
      if (fail instanceof HTMLElement) fail.style.display = "none";
    });
  });
}

const NAV_OUTLINE_ON_HERO = "rgb(255, 255, 255)";
const NAV_OUTLINE_SCROLLED = "rgb(1, 58, 51)";
const NAV_BG_ON_HERO = "#f3eddf";

function setOutlineButtonTheme(button: HTMLElement, color: string) {
  button.style.color = color;
  button.style.borderColor = color;
  button.querySelectorAll<HTMLElement>(".button-text, .button-content").forEach((el) => {
    el.style.color = color;
  });
}

function initNavbarScroll(root: ParentNode) {
  const hero = root.querySelector<HTMLElement>(".section_hero");
  const navbar = root.querySelector<HTMLElement>(".navbar");
  const outlineBtn = root.querySelector<HTMLElement>(".button.is-outline.is-tablet");
  if (!hero || !navbar || !outlineBtn) return;

  const update = () => {
    const onHero = window.scrollY > 0;

    if (onHero) {
      navbar.style.backgroundColor = NAV_BG_ON_HERO;
      navbar.style.willChange = "background";
    } else {
      navbar.style.backgroundColor = "transparent";
      navbar.style.willChange = "";
    }

    setOutlineButtonTheme(
      outlineBtn,
      onHero ? NAV_OUTLINE_SCROLLED : NAV_OUTLINE_ON_HERO,
    );
  };

  update();
  requestAnimationFrame(update);
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function injectVersionBadge(root: ParentNode) {
  const navbar = root.querySelector(".navbar");
  if (!navbar || navbar.querySelector(".legally-version-badge")) return;
  const badge = document.createElement("span");
  badge.className = "legally-version-badge";
  badge.textContent = SITE_VERSION;
  badge.setAttribute("aria-label", `Site version ${SITE_VERSION}`);
  navbar.appendChild(badge);
}

const HEADER_TEXT_SELECTOR =
  ".text-tag, h1, h2, .hero_header .text-base, .header_top .text-base, .opacity-65 .text-base, .cta_description .text-base";

function resetWebflowAnimationStates(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[style]").forEach((el) => {
    if (
      el.classList.contains("image-bg") ||
      el.classList.contains("parallax-image") ||
      el.classList.contains("img-parallax") ||
      el.matches(HEADER_TEXT_SELECTOR)
    ) {
      return;
    }
    const style = el.getAttribute("style") ?? "";
    if (style.includes("opacity:0")) {
      el.style.opacity = "1";
    }
  });
}

type TextRevealGroup = {
  trigger: HTMLElement;
  inners: HTMLElement[];
  onLoad: boolean;
};

const TEXT_REVEAL_STAGGER_MS = 130;
const TEXT_REVEAL_LOAD_DELAY_MS = 250;

function wrapTextLine(el: HTMLElement): HTMLElement {
  const existing = el.parentElement;
  if (existing?.classList.contains("legally-text-reveal-inner")) {
    return existing;
  }

  const mask = document.createElement("div");
  mask.className = "legally-text-reveal";
  const inner = document.createElement("div");
  inner.className = "legally-text-reveal-inner";

  el.parentNode?.insertBefore(mask, el);
  inner.appendChild(el);
  mask.appendChild(inner);
  return inner;
}

function collectHeaderLines(container: HTMLElement, selectors: string[]) {
  const inners: HTMLElement[] = [];
  const seen = new Set<HTMLElement>();

  for (const selector of selectors) {
    container.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      if (seen.has(el)) return;
      seen.add(el);
      inners.push(wrapTextLine(el));
    });
  }

  return inners;
}

function playTextReveal(inners: HTMLElement[]) {
  inners.forEach((inner, index) => {
    window.setTimeout(() => {
      inner.classList.add("is-visible");
    }, index * TEXT_REVEAL_STAGGER_MS);
  });
}

function initHeaderTextReveal(root: ParentNode) {
  const groups: TextRevealGroup[] = [];

  const heroContent = root.querySelector<HTMLElement>(".hero_content");
  if (heroContent) {
    const inners = collectHeaderLines(heroContent, [
      ".text-tag",
      ".hero_header h1",
      ".hero_header .text-base",
    ]);
    if (inners.length) {
      groups.push({ trigger: heroContent, inners, onLoad: true });
    }
  }

  root.querySelectorAll<HTMLElement>(".header_top").forEach((headerTop) => {
    if (headerTop.closest(".team_head")) return;
    const inners = collectHeaderLines(headerTop, [
      ".text-tag",
      "h1",
      "h2",
      ".opacity-65 .text-base",
    ]);
    if (inners.length) {
      groups.push({ trigger: headerTop, inners, onLoad: false });
    }
  });

  root.querySelectorAll<HTMLElement>(".testimonial_header").forEach((header) => {
    const inners = collectHeaderLines(header, [".text-tag", "h2"]);
    if (inners.length) {
      groups.push({ trigger: header, inners, onLoad: false });
    }
  });

  root.querySelectorAll<HTMLElement>(".team_head").forEach((teamHead) => {
    const inners = collectHeaderLines(teamHead, [
      ".header_top .text-tag",
      ".header_top h2",
      ":scope > .opacity-65 .text-base",
    ]);
    if (inners.length) {
      groups.push({ trigger: teamHead, inners, onLoad: false });
    }
  });

  root.querySelectorAll<HTMLElement>(".location_top").forEach((locationTop) => {
    const inners = collectHeaderLines(locationTop, [
      ".text-tag",
      "h2",
      ".opacity-65 .text-base",
    ]);
    if (inners.length) {
      groups.push({ trigger: locationTop, inners, onLoad: false });
    }
  });

  root.querySelectorAll<HTMLElement>(".cta_title").forEach((ctaTitle) => {
    const inners = collectHeaderLines(ctaTitle, ["h2", ".cta_description .text-base"]);
    if (inners.length) {
      groups.push({ trigger: ctaTitle, inners, onLoad: false });
    }
  });

  const scrollGroups = groups.filter((group) => !group.onLoad);
  const loadGroups = groups.filter((group) => group.onLoad);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const group = scrollGroups.find((item) => item.trigger === entry.target);
        if (!group || group.trigger.dataset.textRevealed === "true") return;
        group.trigger.dataset.textRevealed = "true";
        playTextReveal(group.inners);
        observer.unobserve(group.trigger);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
  );

  for (const group of scrollGroups) {
    observer.observe(group.trigger);
  }

  for (const group of loadGroups) {
    window.setTimeout(() => playTextReveal(group.inners), TEXT_REVEAL_LOAD_DELAY_MS);
  }
}

type ImageRevealTarget = {
  container: HTMLElement;
  overlay: HTMLElement | null;
  image: HTMLElement;
  mode: "load" | "scroll" | "clip";
  maxProgress: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function getRevealProgress(container: HTMLElement) {
  const rect = container.getBoundingClientRect();
  const viewport = window.innerHeight;
  const start = viewport * 1.2;
  const end = viewport * -0.05;
  return clamp((start - rect.top) / (start - end), 0, 1);
}

function applyOverlayReveal(overlay: HTMLElement, progress: number) {
  overlay.style.display = "block";
  overlay.style.transform = `translate3d(0, ${progress * 100}%, 0)`;
}

function applyParallaxReveal(image: HTMLElement, progress: number) {
  const scale = 1.2 - progress * 0.2;
  image.style.transform = `translate3d(0, 0, 0) scale3d(${scale}, ${scale}, 1)`;
  image.style.transformOrigin = "50% 100%";
}

function applyClipReveal(image: HTMLElement, progress: number) {
  image.style.clipPath = `inset(0 0 ${(1 - progress) * 100}% 0)`;
}

function initImageReveal(root: ParentNode) {
  const targets: ImageRevealTarget[] = [];
  const seenImages = new Set<HTMLElement>();

  root.querySelectorAll<HTMLElement>(".image-bg").forEach((overlay) => {
    const container = overlay.parentElement;
    if (!container) return;
    const image = container.querySelector<HTMLElement>(".parallax-image, .img-parallax, img");
    if (!image) return;
    targets.push({
      container,
      overlay,
      image,
      mode: overlay.classList.contains("is-light") ? "load" : "scroll",
      maxProgress: 0,
    });
    seenImages.add(image);
  });

  root.querySelectorAll<HTMLElement>(".team_link > img.img").forEach((image) => {
    const container = image.parentElement;
    if (!container || seenImages.has(image)) return;
    targets.push({ container, overlay: null, image, mode: "clip", maxProgress: 0 });
    seenImages.add(image);
  });

  const scrollTargets = targets.filter((target) => target.mode === "scroll");
  const clipTargets = targets.filter((target) => target.mode === "clip");
  const loadTargets = targets.filter((target) => target.mode === "load");

  const applyTarget = (target: ImageRevealTarget, progress: number) => {
    if (target.overlay) applyOverlayReveal(target.overlay, progress);
    if (target.mode === "clip") {
      applyClipReveal(target.image, progress);
      return;
    }
    applyParallaxReveal(target.image, progress);
  };

  for (const target of [...scrollTargets, ...clipTargets]) {
    applyTarget(target, 0);
  }

  for (const target of loadTargets) {
    applyTarget(target, 0);
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const step = clamp((now - start) / duration, 0, 1);
      applyTarget(target, easeOutCubic(step));
      if (step < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  let ticking = false;
  const update = () => {
    ticking = false;
    for (const target of [...scrollTargets, ...clipTargets]) {
      if (target.maxProgress >= 1) continue;
      const progress = getRevealProgress(target.container);
      if (progress <= target.maxProgress) continue;
      target.maxProgress = progress;
      applyTarget(target, target.maxProgress);
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}

const LOCATION_MAPS = [
  {
    tab: "Tab 1",
    label: "New York City, NY",
    address: "111 Legal Avenue, Suite 456, New York, NY 10001",
  },
  {
    tab: "Tab 2",
    label: "Los Angeles, CA",
    address: "789 Justice Blvd, Floor 3, Los Angeles, CA 90001",
  },
  {
    tab: "Tab 3",
    label: "Chicago, IL",
    address: "456 Law Street, Suite 101, Chicago, IL 60601",
  },
] as const;

type LocationMapEntry = (typeof LOCATION_MAPS)[number];

function buildMapEmbedUrl(address: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&hl=en&z=15&ie=UTF8&t=k&output=embed`;
}

function createLocationMap(location: LocationMapEntry) {
  const stage = document.createElement("div");
  stage.className = "map-stage";

  const iframe = document.createElement("iframe");
  iframe.className = "map-iframe";
  iframe.title = `${location.label} office location`;
  iframe.src = buildMapEmbedUrl(location.address);
  iframe.setAttribute("loading", "lazy");
  iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
  iframe.setAttribute("allowfullscreen", "");

  stage.append(iframe);
  return stage;
}

function initLocationMaps(root: ParentNode) {
  root.querySelectorAll<HTMLElement>(".location_map.w-tab-pane").forEach((pane) => {
    const tab = pane.getAttribute("data-w-tab");
    const location = LOCATION_MAPS.find((entry) => entry.tab === tab);
    const target = pane.querySelector("img, iframe, gmp-map-3d, .location_map-tilt-wrap, .map-stage");
    if (!location || !target) return;
    target.replaceWith(createLocationMap(location));
  });
}

export function initWebflowInteractions(root: ParentNode) {
  resetWebflowAnimationStates(root);
  initHeaderTextReveal(root);
  initImageReveal(root);
  initNavbarScroll(root);
  initHomeLinks(root);
  initAnchorLinks(root);
  initTabs(root);
  initLocationMaps(root);
  initSliders(root);
  initLoopMarquee(root);
  initMobileNav(root);
  initForms(root);
  injectVersionBadge(root);
}
