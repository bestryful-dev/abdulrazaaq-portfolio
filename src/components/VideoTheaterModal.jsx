import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, YoutubeLogo, Play, CheckCircle } from "@phosphor-icons/react";
import { CONTACT_CONFIG } from "../data/content";

export function VideoTheaterModal({ episode, onClose, copy, isRtl }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (episode) {
      window.addEventListener("keydown", handleKey);
    }
    return () => window.removeEventListener("keydown", handleKey);
  }, [episode, onClose]);

  return (
    <AnimatePresence>
      {episode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            dir={isRtl ? "rtl" : "ltr"}
            className="relative w-full max-w-3xl overflow-hidden border border-[#C9A24D]/30 bg-[#121418] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#C9A24D]/15 px-6 py-4">
              <div>
                <p className="text-xs tracking-wider text-[#C9A24D]">{episode.code}</p>
                <h3 className="mt-1 text-lg font-semibold text-[#F3EFE6]">{episode.title}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={copy.close}
                className="flex h-9 w-9 items-center justify-center border border-[#C9A24D]/20 text-[#9CA3AF] transition hover:border-[#C9A24D] hover:text-[#F3EFE6]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Player or Styled Placeholder */}
            <div className="relative aspect-video w-full bg-[#0A0B0D]">
              {episode.youtubeId ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${episode.youtubeId}?autoplay=1`}
                  title={episode.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="bg-ledger-grid flex h-full w-full flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A24D]/45 bg-[#121418] text-[#C9A24D]">
                    <Play size={28} weight="fill" />
                  </div>
                  <h4 className="text-base font-semibold text-[#F3EFE6]">
                    {copy.videoPlaceholderTitle}
                  </h4>
                  <p className="mt-2 max-w-md text-sm text-[#9CA3AF]">
                    {copy.videoPlaceholderDesc}
                  </p>
                  <a
                    href={CONTACT_CONFIG.youtubeChannelUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 bg-[#C9A24D] px-5 py-2.5 text-sm font-semibold text-[#0A0B0D] transition hover:bg-[#d8b461]"
                  >
                    <YoutubeLogo size={20} weight="fill" />
                    <span>{copy.watchOnYoutube}</span>
                  </a>
                </div>
              )}
            </div>

            {/* Takeaways */}
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#C9A24D]">
                {copy.keyTakeaways}
              </p>
              <ul className="mt-3 space-y-2.5">
                {episode.takeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#F3EFE6]/90">
                    <CheckCircle
                      size={18}
                      weight="duotone"
                      className="mt-0.5 shrink-0 text-[#C9A24D]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}