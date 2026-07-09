import { motion } from "framer-motion";
import { useConfig } from "@/features/invitation/hooks/use-config";
import { useIsMobile } from "@/hooks/use-mobile-motion";
import CircularGallery from "@/components/ui/CircularGallery/CircularGallery";

const ImmersionGallery = () => {
  const config = useConfig();
  const isMobile = useIsMobile();
  const couplePhotos = config.couplePhotos || [];

  // CircularGallery expects items as { image, text } objects
  const items = couplePhotos.map((p) => ({ image: p.image, text: p.alt }));

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

      <div className="h-[400px] md:h-[500px] w-full relative overflow-visible">
        <CircularGallery
          items={items}
          bend={1.0}
          borderRadius={0.05}
          scrollSpeed={1.0}
          scrollEase={0.05}
        />
      </div>
    </section>
  );
};

export default ImmersionGallery;
