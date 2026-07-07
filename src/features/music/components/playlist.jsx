import { useConfig } from "@/features/invitation/hooks/use-config";
import { motion } from "framer-motion";
import { Music2, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Extracts the playlist id from a Spotify playlist URL and builds the
 * corresponding embed URL, so users only need to paste the normal share link.
 */
function getSpotifyEmbedUrl(playlistUrl) {
  const match = playlistUrl?.match(/playlist\/([a-zA-Z0-9]+)/);
  return match
    ? `https://open.spotify.com/embed/playlist/${match[1]}?utm_source=generator&theme=0`
    : null;
}

export default function Playlist() {
  const config = useConfig();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  const playlistUrl = config?.spotify?.playlistUrl;

  // Hide section if no playlist link is configured
  if (!playlistUrl) {
    return null;
  }

  const embedUrl = getSpotifyEmbedUrl(playlistUrl);

  return (
    <section
      id="playlist"
      className="min-h-screen relative overflow-hidden bg-transparent"
    >
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block text-emerald-500 font-medium"
          >
            Ayudanos a armar la fiesta
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-serif text-gray-800"
          >
            Recomendá una Canción
          </motion.h2>

          {/* Decorative Divider */}
          <motion.div
            initial={{ scale: 0 }}
            animate={hasAnimated ? { scale: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <div className="h-[1px] w-12 bg-emerald-200" />
            <Music2 className="w-5 h-5 text-emerald-600" />
            <div className="h-[1px] w-12 bg-emerald-200" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={hasAnimated ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-gray-600 leading-relaxed font-medium max-w-md mx-auto"
          >
            Sumate a nuestra playlist y agregá esa canción que no puede faltar
            en la pista de baile.
          </motion.p>
        </motion.div>

        {/* Playlist Embed + Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="max-w-md mx-auto space-y-6"
        >
          {embedUrl && (
            <div className="rounded-2xl overflow-hidden shadow-lg border border-emerald-50/50">
              <iframe
                title="Playlist de la boda"
                src={embedUrl}
                width="100%"
                height="352"
                style={{ borderRadius: "12px" }}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          )}

          <motion.a
            href={playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium bg-emerald-500 hover:bg-emerald-800 transition-all duration-200"
          >
            <Music2 className="w-4 h-4" />
            <span>Sugerir una canción en Spotify</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
