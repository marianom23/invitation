import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useConfig } from "../hooks/use-config";
import { getGuestName } from "@/lib/invitation-storage";

/**
 * Reveals text letter by letter with a soft rise + blur effect.
 * Each character animates independently with a staggered delay.
 */
const AnimatedLetters = ({ text, delay = 0, stagger = 0.06, className }) => (
  <span className={className} aria-label={text}>
    {[...text].map((char, i) => (
      <motion.span
        key={`${char}-${i}`}
        aria-hidden="true"
        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          delay: delay + i * stagger,
          duration: 0.5,
          ease: "easeOut",
        }}
        className="inline-block"
      >
        {char === " " ? " " : char}
      </motion.span>
    ))}
  </span>
);

/**
 * Reveals text with a left-to-right "handwriting" sweep.
 * Uses clip-path so cursive ligatures stay intact.
 */
const WriteOnText = ({ text, delay = 0, duration = 1.4, className }) => (
  <motion.span
    initial={{ opacity: 0, clipPath: "inset(-15% 100% -25% 0)" }}
    animate={{ opacity: 1, clipPath: "inset(-15% -5% -25% 0)" }}
    transition={{ delay, duration, ease: "easeInOut" }}
    className={`inline-block ${className || ""}`}
  >
    {text}
  </motion.span>
);

export default function Hero() {
  const config = useConfig();
  const [guestName, setGuestName] = useState("");
  const [timeTogether, setTimeTogether] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateCountdown = useCallback(() => {
    if (!config || !config.date) return;

    const timeStr = config.time || "18:00";
    const targetDate = new Date(`${config.date}T${timeStr}`);
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      setTimeTogether({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Using months calculation for better readability
    const months = Math.floor(days / 30);
    const actualDays = days % 30;

    setTimeTogether({
      years: 0,
      months,
      days: actualDays,
      hours,
      minutes,
      seconds,
    });
  }, [config]);

  useEffect(() => {
    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, [calculateCountdown]);

  useEffect(() => {
    const storedGuestName = getGuestName();
    if (storedGuestName) {
      setGuestName(storedGuestName);
    }
  }, []);

  return (
    <>
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12 text-center relative overflow-hidden bg-transparent"
      >
        {/* Flipped Flower Decoration at Top */}
        <div className="absolute top-0 left-0 w-full h-40 sm:h-56 z-0 pointer-events-none opacity-90 overflow-hidden flex items-start justify-center">
          <img
            src="/images/flower-top.webp"
            alt=""
            className="w-full h-full object-cover object-top transform scale-y-[-1] scale-110"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6 sm:space-y-10 relative z-10 w-full max-w-lg mx-auto"
        >
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="px-6 py-2 text-xs sm:text-sm tracking-widest uppercase bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 shadow-sm">
              Guarda esta Fecha Importante
            </span>
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <div className="text-gray-500 font-serif italic text-lg sm:text-xl tracking-wide max-w-md mx-auto leading-relaxed">
                {(() => {
                  const { months, days, hours, minutes } = timeTogether;

                  // Big day arrived
                  if (months + days + hours + minutes === 0) {
                    return (
                      <span className="text-emerald-800 font-medium">
                        ¡Llegó el gran día!
                      </span>
                    );
                  }

                  // Only show units with a value (no "0 días" / "0 hr")
                  const parts = [];
                  if (months > 0)
                    parts.push(`${months} ${months === 1 ? "mes" : "meses"}`);
                  if (days > 0)
                    parts.push(`${days} ${days === 1 ? "día" : "días"}`);
                  if (hours > 0) parts.push(`${hours} hr`);
                  if (minutes > 0 || parts.length === 0)
                    parts.push(`${minutes} min`);

                  const last = parts[parts.length - 1];
                  const rest = parts.slice(0, -1).join(", ");
                  const verb =
                    parts.length === 1 && last.startsWith("1 ")
                      ? "Falta"
                      : "Faltan";

                  return (
                    <>
                      <span>{verb} </span>
                      {rest && (
                        <>
                          <span>{rest}</span>
                          <span className="text-gray-400 mx-1"> y </span>
                        </>
                      )}
                      <span className="inline-block text-emerald-800 font-medium">
                        {last}
                      </span>
                    </>
                  );
                })()}
              </div>
              <p className="text-emerald-800 font-serif italic text-2xl sm:text-3xl tracking-widest uppercase">
                <AnimatedLetters text="¡Nos Casamos!" delay={0.7} />
              </p>
              <div className="w-16 h-px bg-emerald-200/50 mx-auto mt-4" />
            </motion.div>

            <div className="relative py-12 flex items-center justify-center">
              {/* Circular Frame Enveloping the Names */}
              <div
                className="absolute inset-x-0 inset-y-0 z-0 opacity-80 pointer-events-none bg-contain bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url('/images/circular-frame.webp')`,
                  scale: "1.4",
                }}
              />

              <motion.h2
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-5xl sm:text-7xl font-cursive text-emerald-900 drop-shadow-sm flex flex-wrap items-center justify-center gap-x-2 py-4 relative z-10"
              >
                <WriteOnText
                  text={config.groomName}
                  delay={1.1}
                  duration={1.3}
                  className="px-1"
                />
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.4, duration: 0.5, type: "spring" }}
                  className="text-emerald-700 font-script text-4xl sm:text-5xl mx-2"
                >
                  &
                </motion.span>
                <WriteOnText
                  text={config.brideName}
                  delay={2.7}
                  duration={1.3}
                  className="px-1"
                />
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="space-y-6"
          >
            {/* Structured Date Layout */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="text-emerald-900 font-serif uppercase tracking-[0.4em] text-sm sm:text-base font-bold"
              >
                {new Date(config.date + "T12:00:00")
                  .toLocaleDateString("es-ES", { month: "long" })
                  .toUpperCase()}
              </motion.div>

              <div className="flex items-center justify-center gap-6 sm:gap-12">
                {/* Day of week with lines */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-full h-[1px] bg-emerald-200/50" />
                  <span className="py-2 text-gray-600 font-serif uppercase tracking-[0.2em] text-[10px] sm:text-xs min-w-[80px] sm:min-w-[100px]">
                    {new Date(config.date + "T12:00:00")
                      .toLocaleDateString("es-ES", { weekday: "long" })
                      .toUpperCase()}
                  </span>
                  <div className="w-full h-[1px] bg-emerald-200/50" />
                </motion.div>

                {/* Day of month */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, type: "spring" }}
                  className="text-5xl sm:text-7xl font-serif text-gray-800 px-2"
                >
                  {new Date(config.date + "T12:00:00").getDate()}
                </motion.div>

                {/* Time with lines */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="flex flex-col items-center"
                >
                  <div className="h-px w-20 bg-emerald-200/50 mb-4" />
                  <span className="text-gray-500 font-serif tracking-widest uppercase text-[10px] sm:text-sm whitespace-nowrap px-2">
                    A LAS {config.time}
                  </span>
                  <div className="h-px w-20 bg-emerald-200/50 mt-4" />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="text-emerald-500 font-serif tracking-[0.6em] text-base sm:text-xl"
              >
                {new Date(config.date + "T12:00:00").getFullYear()}
              </motion.div>
            </div>

            {/* Guest Welcome Area */}
            <div className="pt-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
                className="inline-block px-10 py-8 rounded-3xl bg-emerald-50/50 border border-emerald-100 shadow-sm"
              >
                <p className="text-gray-500 font-serif italic text-sm mb-3">
                  Estimado/a
                </p>
                <p className="text-3xl sm:text-4xl font-serif text-emerald-800 font-bold">
                  {guestName || "Invitado Especial"}
                </p>
              </motion.div>
            </div>
          </motion.div>

          <div className="pt-8 relative">
            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart
                className="w-12 h-12 text-emerald-600 mx-auto"
                fill="currentColor"
              />
            </motion.div>

            <motion.img
              src="/images/pajaris.png"
              alt=""
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="w-72 sm:w-96 mx-auto -mt-2 pointer-events-none select-none"
              style={{
                // Tint the brown artwork to a muted emerald, keeping inner shading
                filter:
                  "sepia(100%) saturate(115%) hue-rotate(110deg) brightness(72%) opacity(75%)",
              }}
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}
