import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, PauseCircle, PlayCircle } from "lucide-react";
import { useConfig } from "@/features/invitation/hooks/use-config";
import BottomBar from "@/components/layout/bottom-bar";
import FloatingDecorations from "@/components/ui/floating-decorations";

/**
 * Layout component that wraps the main invitation content.
 * Handles music playback controls and navigation.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {Object} props.audioControls - Audio controls from useAudio hook
 * @param {boolean} props.audioControls.isPlaying - Whether audio is playing
 * @param {Function} props.audioControls.toggle - Toggle audio play/pause
 */
const Layout = ({ children, audioControls }) => {
  const config = useConfig();
  const [showToast, setShowToast] = useState(false);

  const { isPlaying, toggle } = audioControls || {};

  // Show toast when audio starts playing
  useEffect(() => {
    if (isPlaying) {
      setShowToast(true);
      const timer = setTimeout(
        () => setShowToast(false),
        config.audio?.toastDuration || 3000,
      );
      return () => clearTimeout(timer);
    } else {
      setShowToast(false);
    }
  }, [isPlaying, config.audio?.toastDuration]);

  return (
    <div className="relative min-h-screen w-full bg-slate-50 flex items-center justify-center">
      <motion.div
        className="mx-auto w-full max-w-[430px] min-h-screen bg-transparent relative overflow-hidden border border-gray-100 shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Globally Fixed & Rotated Watercolor Background.
            Sized with lvh/lvw (see index.css) so it doesn't shift when the
            mobile URL bar collapses while scrolling. */}
        <div className="card-fixed-bg">
          <div className="card-fixed-bg-image" />
        </div>

        {/* Hearts + petals floating over the whole card */}
        <FloatingDecorations hearts={5} petals={8} />

        <div className="relative z-10 w-full">
          {/* Music Control Button with Status Indicator */}
          {toggle && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggle}
              className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-emerald-100/50"
            >
              {isPlaying ? (
                <div className="relative">
                  <PauseCircle className="w-6 h-6 text-emerald-700" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </div>
              ) : (
                <PlayCircle className="w-6 h-6 text-emerald-700" />
              )}
            </motion.button>
          )}

          <main className="relative h-full w-full pb-[100px]">{children}</main>
          <BottomBar />

          {/* Music Info Toast */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50"
              >
                <div className="bg-black/80 text-white transform -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-sm flex items-center space-x-2">
                  <Music className="w-4 h-4 animate-pulse" />
                  <span className="text-sm whitespace-nowrap">
                    {config.audio?.title || "Música de fondo"}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Layout;
