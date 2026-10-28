/** A small ringed planet. With orbit=true it anchors a homepage orbit line. */
export function Planet({
  color,
  size = 30,
  orbit = false,
}: {
  color: string;
  size?: number;
  orbit?: boolean;
}) {
  const inset = size * 0.14;
  return (
    <span
      aria-hidden="true"
      data-orbit={orbit ? color : undefined}
      className="relative inline-block shrink-0"
      style={{ width: size, height: size }}
    >
      <span className="absolute rounded-full" style={{ inset, background: color }} />
      <span
        className="absolute rounded-full border-[1.5px] border-white opacity-45"
        style={{
          left: -size * 0.1,
          right: -size * 0.1,
          top: size * 0.37,
          height: size * 0.27,
          transform: "rotate(-18deg)",
        }}
      />
    </span>
  );
}

export default function SectionHeader({ title, color }: { title: string; color: string }) {
  return (
    <>
      <Planet color={color} orbit />
      <h2 className="mb-6 mt-3 font-space-grotesk text-[22px] font-semibold leading-none tracking-[-0.01em] text-white">
        {title}
      </h2>
    </>
  );
}
