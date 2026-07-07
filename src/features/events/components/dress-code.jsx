import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useConfig } from "@/features/invitation/hooks/use-config";

/** Person in a suit with tie (Font Awesome "user-tie", CC BY 4.0) */
const SuitIcon = ({ className }) => (
  <svg
    viewBox="0 0 448 512"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" />
  </svg>
);

export default function DressCode() {
  const config = useConfig();
  const dressCode = config?.dressCode;

  // Hide section if no dress code is configured
  if (!dressCode?.code) {
    return null;
  }

  return (
    <div id="dress-code" className="relative bg-transparent">
      <div className="mt-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="backdrop-blur-sm bg-white/70 px-8 py-10 rounded-3xl border border-emerald-100/50 shadow-lg space-y-5">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex items-center justify-center gap-4"
            >
              <div className="h-[1px] w-10 bg-emerald-200" />
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <SuitIcon className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="h-[1px] w-10 bg-emerald-200" />
            </motion.div>

            <span className="inline-block text-emerald-500 font-medium text-sm tracking-widest uppercase">
              Código de Vestimenta
            </span>

            <h3 className="text-3xl font-serif text-emerald-900">
              {dressCode.code}
            </h3>

            {dressCode.note && (
              <p className="text-gray-600 text-sm leading-relaxed flex items-start justify-center gap-2 max-w-xs mx-auto">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="italic">{dressCode.note}</span>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
