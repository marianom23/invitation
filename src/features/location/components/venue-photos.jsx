import { motion } from "framer-motion";
import { useConfig } from "@/features/invitation/hooks/use-config";
import Stack from "@/components/ui/Stack/Stack";

const VenuePhotos = () => {
  const config = useConfig();
  const photos = config.venuePhotos || [];

  if (photos.length === 0) return null;

  // Build cards array: each card is the photo JSX content
  const cards = photos.map((photo, i) => (
    <div key={i} className="relative w-full h-full">
      <img
        src={photo.image}
        alt={photo.title}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
        <h3 className="text-xl font-serif mb-1">{photo.title}</h3>
        <p className="text-white/75 italic text-sm">{photo.description}</p>
      </div>
    </div>
  ));

  return (
    <section id="venue" className="py-20 bg-rose-50/30">
      {/* Header */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-rose-500 font-medium mb-2"
        >
          Nuestros Espacios
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif text-gray-800"
        >
          El Lugar
        </motion.h2>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="h-1 w-20 bg-rose-200 mx-auto mt-4"
        />
      </div>

      {/* Stack card gallery — drag or tap to cycle photos */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto px-8"
        style={{ width: "100%", maxWidth: 360, height: 420 }}
      >
        <Stack
          cards={cards}
          randomRotation={true}
          sensitivity={150}
          sendToBackOnClick={true}
          mobileClickOnly={true}
          autoplay={true}
          autoplayDelay={2800}
          pauseOnHover={true}
          animationConfig={{ stiffness: 280, damping: 22 }}
        />
      </motion.div>

      {/* Hint text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-gray-400 mt-6 italic"
      >
        Toca para ver más →
      </motion.p>
    </section>
  );
};

export default VenuePhotos;
