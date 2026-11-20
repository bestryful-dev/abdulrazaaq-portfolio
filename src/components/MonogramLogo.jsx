export function MonogramLogo({ isRtl }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden border border-[#C9A24D]/45 bg-[#121418]">
        <span className="pointer-events-none absolute top-0 left-0 z-10 h-1.5 w-1.5 border-t border-l border-[#C9A24D]" />
        <span className="pointer-events-none absolute bottom-0 right-0 z-10 h-1.5 w-1.5 border-b border-r border-[#C9A24D]" />
        <img
          src="/y-logo.jpg"
          alt={isRtl ? "المستثمر ترند" : "Al Mustathmer Trend"}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="hidden sm:flex flex-col leading-tight">
        <span className="text-sm font-semibold text-[#F3EFE6]">
          {isRtl ? "عبدالرزاق ناصر" : "Abdulrazaaq Nasser"}
        </span>
        <span className="text-[11px] text-[#9CA3AF]">
          {isRtl ? "المستثمر ترند" : "Al Mustathmer Trend"}
        </span>
      </div>
    </div>
  );
}