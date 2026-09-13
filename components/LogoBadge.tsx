import Image from "next/image";

export default function LogoBadge({
  src,
  alt,
  url,
  size = "md",
}: {
  src: string;
  alt: string;
  url?: string;
  size?: "sm" | "md";
}) {
  const box =
    size === "sm"
      ? "h-14 w-32 sm:h-16 sm:w-36 p-3"
      : "h-20 w-44 sm:h-24 sm:w-52 p-4.5";

  const content = (
    <div
      className={`${box} bg-[#f7f4ec] flex items-center justify-center shrink-0 transition-transform duration-300`}
    >
      <div className="relative w-full h-full">
        <Image src={src} alt={alt} fill className="object-contain" sizes="220px" />
      </div>
    </div>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block hover:opacity-90 transition-opacity"
        aria-label={alt}
      >
        {content}
      </a>
    );
  }

  return content;
}
