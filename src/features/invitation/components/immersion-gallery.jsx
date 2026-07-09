import { motion } from "framer-motion";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { useIsMobile } from "@/hooks/use-mobile-motion";
import Marquee from "@/components/ui/marquee";

// Static tilt per card position for a polaroid-strip feel
const TILTS = [-3, 2, -2, 3, -1.5];

const ImmersionGallery = () => {
  const config = useConfig();
  const isMobile = useIsMobile();
  const couplePhotos = config.couplePhotos || [];

  if (couplePhotos.length === 0) return null;

  return (
    <section className="py-20 bg-transparent overflow-hidden px-4">
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <motion.h2
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: isMobile ? 0 : 0.5 }}
          className="text-3xl md:text-4xl font-serif text-gray-800 mb-4"
        >
          Nuestra Historia en Fotos
        </motion.h2>
        <motion.p
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: isMobile ? 0 : 0.1,
            duration: isMobile ? 0 : 0.5,
          }}
          className="text-gray-600 max-w-2xl mx-auto italic"
        >
          Cada momento a tu lado ha sido una aventura. Aquí algunos de nuestros
          recuerdos favoritos mientras nos preparamos para el gran día.
        </motion.p>
      </div>

      {/* CSS-driven polaroid strip: compositor-only animation, always
          smooth on mobile (never pauses or jumps while scrolling) */}
      <Marquee repeat={3} className="[--duration:45s] [--gap:1.5rem] py-6">
        {couplePhotos.map((photo, index) => (
          <div
            key={photo.image}
            className="bg-white p-2 pb-7 rounded-lg shadow-lg shrink-0"
            style={{ transform: `rotate(${TILTS[index % TILTS.length]}deg)` }}
          >
            <img
              src={photo.image}
              alt={photo.alt}
              loading="lazy"
              className="w-52 h-64 object-cover rounded-md"
            />
            {photo.alt && (
              <p className="text-center text-gray-500 italic text-xs mt-2 font-serif">
                {photo.alt}
              </p>
            )}
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ImmersionGallery;
