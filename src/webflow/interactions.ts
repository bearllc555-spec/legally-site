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
const NAV_BG_SCROLLED = "rgba(74, 73, 68, 0.306)";

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
    const heroHeight = hero.offsetHeight;
    const threshold = Math.max(heroHeight - 96, 0);
    const overHero = window.scrollY < threshold;

    if (overHero) {
      navbar.style.backgroundColor = "transparent";
      navbar.style.willChange = "";
    } else {
      navbar.style.backgroundColor = NAV_BG_SCROLLED;
      navbar.style.willChange = "background";
    }

    setOutlineButtonTheme(
      outlineBtn,
      overHero ? NAV_OUTLINE_ON_HERO : NAV_OUTLINE_SCROLLED,
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

function clearInlineTransform(el: HTMLElement) {
  el.style.removeProperty("transform");
  el.style.removeProperty("-webkit-transform");
  el.style.removeProperty("-moz-transform");
  el.style.removeProperty("-ms-transform");
  el.style.removeProperty("will-change");
}

function resetWebflowAnimationStates(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[style]").forEach((el) => {
    const style = el.getAttribute("style") ?? "";
    if (style.includes("opacity:0")) {
      el.style.opacity = "1";
    }
    if (
      style.includes("transform") ||
      style.includes("scale3d") ||
      style.includes("translate3d")
    ) {
      clearInlineTransform(el);
    }
  });

  root.querySelectorAll<HTMLElement>("img.img, .hero_visual img").forEach((el) => {
    clearInlineTransform(el);
  });

  // Webflow reveals photos by fading out these white covers on scroll
  root.querySelectorAll<HTMLElement>(".image-bg").forEach((el) => {
    el.style.display = "none";
  });
}

export function initWebflowInteractions(root: ParentNode) {
  resetWebflowAnimationStates(root);
  initNavbarScroll(root);
  initHomeLinks(root);
  initAnchorLinks(root);
  initTabs(root);
  initSliders(root);
  initLoopMarquee(root);
  initMobileNav(root);
  initForms(root);
  injectVersionBadge(root);
}
