type Props = { name: string; href: string; primary?: boolean };

export default function SocialButton({ name, href, primary = false }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        primary
          ? "inline-flex items-center rounded-full border border-[#ddd6fe] bg-[#ddd6fe] px-5 py-[11px] text-[15px] font-medium leading-none text-[#0c0a1d] transition-colors [text-shadow:none] hover:bg-white"
          : "inline-flex items-center rounded-full border border-[#2e2650] px-5 py-[11px] text-[15px] font-medium leading-none text-[#ddd6fe] transition-colors hover:border-[#c4b5fd] hover:text-white"
      }
    >
      {name}
    </a>
  );
}
