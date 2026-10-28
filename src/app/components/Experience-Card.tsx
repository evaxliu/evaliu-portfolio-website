type Props = {
  date: string;
  /** Highlight colour for current or upcoming entries. Past entries stay muted. */
  dateColor?: string;
  title: string;
  org: string;
  body?: string;
};

export default function ExperienceCard({ date, dateColor, title, org, body }: Props) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1.5 border-t border-[#1d1834] py-4">
      <span
        className="shrink-0 basis-[140px] text-[13.5px] font-medium leading-relaxed"
        style={{ color: dateColor ?? "#8f82b0" }}
      >
        {date}
      </span>
      <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-1">
        <span className="font-space-grotesk text-[18.5px] font-semibold leading-snug text-white">{title}</span>
        <span className="text-[15.5px] text-[#8f82b0]">{org}</span>
        {body && (
          <p className="mt-2 text-[16px] leading-[1.7] text-[#ddd6fe] [text-wrap:pretty]">{body}</p>
        )}
      </div>
    </div>
  );
}
