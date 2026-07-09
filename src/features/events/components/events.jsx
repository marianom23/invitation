import EventCards from "@/features/events/components/events-card";
import DressCode from "@/features/events/components/dress-code";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { useIsMobile } from "@/hooks/use-mobile-motion";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Events() {
  const config = useConfig(); // Use hook to get config from API or fallback to static
  const isMobile = useIsMobile();
  const revealDuration = isMobile ? 0 : 0.8;
  const revealDelay = (delay) => (isMobile ? 0 : delay);

  return (
    <>
      {/* Event Section */}
      <section
        id="event"
        className="min-h-screen relative overflow-hidden bg-transparent"
      >
        <motion.div
          initial={isMobile ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: revealDuration }}
          className="relative z-10 container mx-auto px-4 py-20"
        >
          {/* Section Header */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: revealDuration }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={isMobile ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: revealDelay(0.2), duration: revealDuration }}
              className="inline-block text-emerald-500 font-medium mb-2"
            >
              Guarda esta Fecha Importante
            </motion.span>

            <motion.h2
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: revealDelay(0.3), duration: revealDuration }}
              className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight"
            >
              Eventos de la Boda
            </motion.h2>

            <motion.p
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: revealDelay(0.4), duration: revealDuration }}
              className="text-gray-500 max-w-md mx-auto"
            >
              Te invitamos a celebrar con nosotros este día tan especial y el
              inicio de nuestro viaje de amor.
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={isMobile ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: revealDelay(0.5), duration: revealDuration }}
              className="flex items-center justify-center gap-4 mt-6"
            >
              <div className="h-[1px] w-12 bg-emerald-200" />
              <div className="text-emerald-600">
                <Heart className="w-4 h-4" fill="currentColor" />
              </div>
              <div className="h-[1px] w-12 bg-emerald-200" />
            </motion.div>
          </motion.div>

          {/* Events Grid */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: revealDuration, delay: revealDelay(0.6) }}
            className="max-w-2xl mx-auto"
          >
            <EventCards events={config.agenda} />
          </motion.div>

          {/* Dress Code as part of the event details */}
          <DressCode />
        </motion.div>
      </section>
    </>
  );
}
