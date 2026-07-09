import { useConfig } from "@/features/invitation/hooks/use-config";
import { Clock, MapPin, CalendarCheck, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { formatEventDate } from "@/lib/format-event-date";
import { useIsMobile } from "@/hooks/use-mobile-motion";

export default function Location() {
  const config = useConfig(); // Use hook to get config from API or fallback to static
  const isMobile = useIsMobile();

  return (
    <>
      {/* Location section */}
      <section
        id="location"
        className="min-h-screen relative overflow-hidden bg-transparent"
      >
        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={isMobile ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0 : 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={isMobile ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: isMobile ? 0 : 0.2,
                duration: isMobile ? 0 : 0.5,
              }}
              viewport={{ once: true }}
              className="inline-block text-emerald-500 font-medium"
            >
              Ubicación del Evento
            </motion.span>

            <motion.h2
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: isMobile ? 0 : 0.3,
                duration: isMobile ? 0 : 0.5,
              }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-gray-800"
            >
              Ubicación
            </motion.h2>

            {/* Decorative Divider */}
            <motion.div
              initial={isMobile ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{
                delay: isMobile ? 0 : 0.4,
                duration: isMobile ? 0 : 0.4,
              }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-emerald-200" />
              <MapPin className="w-5 h-5 text-emerald-600" />
              <div className="h-[1px] w-12 bg-emerald-200" />
            </motion.div>
          </motion.div>

          {/* Location Content */}
          <div className="space-y-24 max-w-3xl mx-auto">
            {config.venues.map((venue, index) => (
              <div key={index} className="flex flex-col gap-8">
                {/* Venue Details */}
                <motion.div
                  initial={isMobile ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: isMobile ? 0 : 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-sm border border-emerald-50/50">
                    <span className="text-emerald-500 font-medium text-sm mb-2 block uppercase tracking-wider">
                      {venue.name}
                    </span>
                    <h3 className="text-2xl font-serif text-gray-800 mb-6">
                      {venue.location}
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <MapPin className="w-5 h-5 text-emerald-500 mt-1" />
                        <p className="text-gray-600 flex-1">{venue.address}</p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <CalendarCheck className="w-5 h-5 text-emerald-500" />
                        <p className="text-gray-600">
                          {formatEventDate(config.date)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Clock className="w-5 h-5 text-emerald-500" />
                        <p className="text-gray-600">{venue.time}</p>
                      </div>

                      {/* Action Button - Full Width */}
                      <div className="pt-4">
                        <motion.a
                          href={venue.maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          viewport={{ once: true }}
                          className="w-full flex items-center justify-center gap-1.5 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="font-semibold">Ver Mapa</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Map Container */}
                <motion.div
                  initial={isMobile ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: isMobile ? 0 : 0.8,
                    delay: isMobile ? 0 : 0.2,
                  }}
                  viewport={{ once: true }}
                  className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg border-8 border-white"
                >
                  <iframe
                    src={venue.maps_embed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
