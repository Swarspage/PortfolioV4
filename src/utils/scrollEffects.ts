import { gsap } from "./gsap";

// Shared, unpinned scroll motion. Only ever called from the no-reduced-motion branches.

type Targets = gsap.TweenTarget;

export function revealUp(targets: Targets, trigger: Element, start = "top 82%") {
  return gsap.from(targets, {
    y: 26,
    autoAlpha: 0,
    duration: 0.3,
    ease: "power3.out",
    stagger: 0.06,
    scrollTrigger: { trigger, start, once: true }
  });
}

export function maskWords(words: Targets, trigger: Element, start = "top 80%") {
  return gsap.from(words, {
    yPercent: 115,
    duration: 0.3,
    ease: "power3.out",
    stagger: 0.035,
    scrollTrigger: { trigger, start, once: true }
  });
}

export function clipReveal(el: Element, trigger: Element) {
  return gsap.fromTo(
    el,
    { clipPath: "inset(12% 12% 12% 12% round 28px)" },
    {
      clipPath: "inset(0% 0% 0% 0% round 20px)",
      ease: "none",
      scrollTrigger: { trigger, start: "top 92%", end: "top 38%", scrub: true }
    }
  );
}

export function parallax(el: Element, trigger: Element, amount = 8) {
  return gsap.fromTo(
    el,
    { yPercent: -amount },
    {
      yPercent: amount,
      ease: "none",
      scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true }
    }
  );
}

/** Counts the numeric part of strings like "500+" or "Top 8". Non-numeric values are left as-is. */
export function countUp(el: Element, duration = 1.1) {
  const raw = el.getAttribute("data-count") ?? el.textContent ?? "";
  const match = raw.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return gsap.timeline();
  const [, prefix, num, suffix] = match;
  const target = parseFloat(num);
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  const counter = { v: 0 };
  return gsap.to(counter, {
    v: target,
    duration,
    ease: "power2.out",
    onStart: () => {
      el.textContent = `${prefix}${0 .toFixed(decimals)}${suffix}`;
    },
    onUpdate: () => {
      el.textContent = `${prefix}${counter.v.toFixed(decimals)}${suffix}`;
    },
    onComplete: () => {
      el.textContent = raw;
    }
  });
}