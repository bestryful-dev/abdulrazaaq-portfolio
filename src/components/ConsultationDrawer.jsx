import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, WhatsappLogo, Copy, Check, PaperPlaneTilt } from "@phosphor-icons/react";
import { CONTACT_CONFIG } from "../data/content";

export function ConsultationDrawer({ isOpen, onClose, copy, isRtl, initialTopic = "" }) {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(initialTopic || copy.topics[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTopic(initialTopic || copy.topics[0]);
  }, [initialTopic, copy.topics]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError(copy.validationError);
      return;
    }
    setError("");
    setSubmitted(true);
  }

  function handleCopyEmail() {
    navigator.clipboard.writeText(CONTACT_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  // Build prefilled WhatsApp message
  const whatsappHref = `${CONTACT_CONFIG.whatsappUrl}?text=${encodeURIComponent(
    `${name ? `${name} — ` : ""}[${topic}] ${message}`
  )}`;

  const slideOffset = isRtl ? "-100%" : "100%";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
        >
          <motion.aside
            initial={{ x: slideOffset }}
            animate={{ x: 0 }}
            exit={{ x: slideOffset }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            dir={isRtl ? "rtl" : "ltr"}
            className={`fixed top-0 bottom-0 ${
              isRtl ? "left-0 border-r" : "right-0 border-l"
            } w-full max-w-md overflow-y-auto border-[#C9A24D]/25 bg-[#121418] p-6 sm:p-8 shadow-2xl`}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#C9A24D]/15 pb-5">
              <div>
                <h3 className="text-xl font-semibold text-[#F3EFE6]">{copy.title}</h3>
                <p className="mt-1.5 text-sm text-[#9CA3AF]">{copy.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#C9A24D]/25 text-[#9CA3AF] transition hover:border-[#C9A24D] hover:text-[#F3EFE6]"
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="mt-8 border border-[#C9A24D]/35 bg-[#0A0B0D] p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#163B2F] text-[#C9A24D]">
                  <Check size={24} weight="bold" />
                </div>
                <h4 className="text-lg font-semibold text-[#F3EFE6]">{copy.successTitle}</h4>
                <p className="mt-2 text-sm text-[#9CA3AF]">{copy.successDesc}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                  }}
                  className="mt-4 text-xs text-[#C9A24D] underline underline-offset-4"
                >
                  {isRtl ? "إرسال رسالة أخرى" : "Send another inquiry"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-medium text-[#C9A24D]">
                    {copy.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder={copy.namePlaceholder}
                    className="w-full border border-[#C9A24D]/25 bg-[#0A0B0D] px-4 py-3 text-sm text-[#F3EFE6] placeholder:text-[#9CA3AF]/50 focus:border-[#C9A24D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-[#C9A24D]">
                    {copy.topicLabel}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {copy.topics.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTopic(item)}
                        className={`border px-3 py-1.5 text-xs transition ${
                          topic === item
                            ? "border-[#C9A24D] bg-[#C9A24D]/15 text-[#C9A24D]"
                            : "border-[#C9A24D]/20 bg-[#0A0B0D] text-[#9CA3AF] hover:border-[#C9A24D]/45"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-[#C9A24D]">
                    {copy.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder={copy.messagePlaceholder}
                    className="w-full resize-none border border-[#C9A24D]/25 bg-[#0A0B0D] px-4 py-3 text-sm text-[#F3EFE6] placeholder:text-[#9CA3AF]/50 focus:border-[#C9A24D] focus:outline-none"
                  />
                </div>

                {error && <p className="text-xs text-red-400">{error}</p>}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 bg-[#C9A24D] px-5 py-3.5 text-sm font-semibold text-[#0A0B0D] transition hover:bg-[#d8b461]"
                >
                  <PaperPlaneTilt size={18} weight="bold" />
                  <span>{copy.submit}</span>
                </button>
              </form>
            )}

            {/* Quick Direct Contact Options */}
            <div className="mt-8 border-t border-[#C9A24D]/15 pt-6">
              <p className="mb-3 text-xs text-[#9CA3AF]">{copy.quickContact}</p>
              <div className="space-y-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 border border-[#163B2F] bg-[#163B2F]/45 px-4 py-3 text-sm font-medium text-[#F3EFE6] transition hover:border-[#C9A24D]/50 hover:bg-[#163B2F]/70"
                >
                  <WhatsappLogo size={20} weight="fill" className="text-emerald-400" />
                  <span>{copy.whatsappBtn}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex w-full items-center justify-between border border-[#C9A24D]/20 bg-[#0A0B0D] px-4 py-3 text-xs text-[#F3EFE6] transition hover:border-[#C9A24D]/50"
                >
                  <span dir="ltr">{CONTACT_CONFIG.email}</span>
                  <span className="inline-flex items-center gap-1.5 text-[#C9A24D]">
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? copy.emailCopied : copy.copyEmail}
                  </span>
                </button>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}