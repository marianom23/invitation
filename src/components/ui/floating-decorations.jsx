import { useState } from "react";
import { Heart } from "lucide-react";

const HEART_COLORS = ["text-emerald-200", "text-pink-200", "text-emerald-100"];
const PETAL_COLORS = [
  "text-amber-200",
  "text-orange-200",
  "text-yellow-200",
  "text-rose-200",
];

/** Simple petal shape */
const Petal = ({ className, style }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <path d="M12 2C17.5 7 18.5 14.5 12 22C5.5 14.5 6.5 7 12 2Z" />
  </svg>
);

/**
 * Full-card floating decoration layer: hearts and petals falling over
 * the content (pointer-events: none). Rendered once in Layout.
 *
 * Performance: items are animated with a pure CSS keyframe animation
 * (decoration-fall in index.css) that only touches transform/opacity,
 * so the falling runs on the GPU compositor thread and stays smooth
 * while scrolling on mobile — no per-frame JavaScript involved.
 */
const FloatingDecorations = ({ hearts = 10, petals = 10 }) => {
  const [items] = useState(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return [];

    const heartItems = [...Array(hearts)].map((_, i) => ({
      type: "heart",
      size: Math.floor(Math.random() * 16) + 14,
      color: HEART_COLORS[i % HEART_COLORS.length],
      initialX: Math.random() * 100,
      duration: Math.random() * 8 + 10,
      rotation: Math.random() * 360,
      sway: Math.random() * 50 + 20,
    }));

    const petalItems = [...Array(petals)].map((_, i) => ({
      type: "petal",
      size: Math.floor(Math.random() * 12) + 12,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      initialX: Math.random() * 100,
      duration: Math.random() * 8 + 11,
      rotation: Math.random() * 360,
      sway: Math.random() * 60 + 30,
    }));

    // Negative delays start every item mid-fall, spread across the cycle
    return [...heartItems, ...petalItems].map((item) => ({
      ...item,
      delay: -Math.random() * item.duration,
    }));
  });

  if (items.length === 0) return null;

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-full z-20 pointer-events-none overflow-hidden">
      {items.map((item, i) => {
        const Shape = item.type === "heart" ? Heart : Petal;
        return (
          <div
            key={`${item.type}-${i}`}
            className="absolute top-0"
            style={{
              left: `${item.initialX}%`,
              opacity: 0,
              willChange: "transform, opacity",
              animation: `decoration-fall ${item.duration}s linear ${item.delay}s infinite`,
              "--fall-sway": `${item.sway}px`,
              "--fall-rot-start": `${item.rotation}deg`,
              "--fall-rot-mid": `${item.rotation + 270}deg`,
              "--fall-rot-end": `${item.rotation + 540}deg`,
              "--fall-opacity": item.type === "heart" ? 0.7 : 0.8,
            }}
          >
            <Shape
              className={item.color}
              style={{ width: item.size, height: item.size }}
              {...(item.type === "heart" ? { fill: "currentColor" } : {})}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FloatingDecorations;
