import { useState } from "react";
import { motion } from "framer-motion";
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
 * Full-card floating decoration layer: hearts and petals
 * falling down over the content (pointer-events: none).
 * Rendered once in Layout so it covers the whole invitation.
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
      duration: Math.random() * 8 + 9,
      delay: Math.random() * 14,
      rotation: Math.random() * 360,
    }));

    const petalItems = [...Array(petals)].map((_, i) => ({
      type: "petal",
      size: Math.floor(Math.random() * 12) + 12,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      initialX: Math.random() * 100,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 14,
      rotation: Math.random() * 360,
      sway: Math.random() * 60 + 30,
    }));

    return [...heartItems, ...petalItems];
  });

  if (items.length === 0) return null;

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-full z-20 pointer-events-none overflow-hidden">
      {items.map((item, i) =>
        item.type === "heart" ? (
          <motion.div
            key={`heart-${i}`}
            initial={{
              opacity: 0,
              scale: 0,
              left: `${item.initialX}%`,
              top: "-8%",
            }}
            animate={{
              opacity: [0, 0.7, 0.7, 0],
              scale: [0.5, 1, 1, 0.5],
              top: ["-8%", "108%"],
              x: [0, 40, -40, 0],
              rotate: [item.rotation, item.rotation + 360],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "linear",
            }}
            className="absolute"
          >
            <Heart
              className={item.color}
              style={{ width: item.size, height: item.size }}
              fill="currentColor"
            />
          </motion.div>
        ) : (
          <motion.div
            key={`petal-${i}`}
            initial={{
              opacity: 0,
              left: `${item.initialX}%`,
              top: "-8%",
            }}
            animate={{
              opacity: [0, 0.8, 0.8, 0],
              top: ["-8%", "108%"],
              x: [0, item.sway, -item.sway, 0],
              rotate: [item.rotation, item.rotation + 540],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "linear",
            }}
            className="absolute"
          >
            <Petal
              className={item.color}
              style={{ width: item.size, height: item.size }}
            />
          </motion.div>
        ),
      )}
    </div>
  );
};

export default FloatingDecorations;
