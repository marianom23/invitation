import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useConfig } from "@/features/invitation/hooks/use-config";

export default function StoryTimeline() {
  const config = useConfig();
  const story = config?.story;

  // Hide section if no story milestones are configured
  if (!story || story.length === 0) {
    return null;
  }

  return (
    <section id="story" className="relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-14"
        >
          <span className="inline-block text-emerald-500 font-medium">
            Un amor que creció con los años
          </span>

          <h2 className="text-4xl md:text-5xl font-serif text-gray-800">
            Nuestra Historia
          </h2>

          {/* Decorative Divider */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <div className="h-[1px] w-12 bg-emerald-200" />
            <Heart className="w-5 h-5 text-emerald-600" fill="currentColor" />
            <div className="h-[1px] w-12 bg-emerald-200" />
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-md mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-emerald-100 via-emerald-200 to-emerald-100" />

          <div className="space-y-10">
            {story.map((milestone, index) => (
              <motion.div
                key={`${milestone.year}-${index}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative pl-14"
              >
                {/* Year dot */}
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-2 border-emerald-300 shadow-sm flex items-center justify-center">
                  <Heart
                    className="w-4 h-4 text-emerald-500"
                    fill="currentColor"
                  />
                </div>

                <div className="backdrop-blur-sm bg-white/70 rounded-2xl border border-emerald-50/60 shadow-md overflow-hidden">
                  {milestone.image && (
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      loading="lazy"
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-5 space-y-1.5">
                    <span className="inline-block px-3 py-0.5 text-xs font-semibold tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-serif text-gray-800">
                      {milestone.title}
                    </h3>
                    {milestone.description && (
                      <p className="text-gray-600 text-sm leading-relaxed italic">
                        {milestone.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
