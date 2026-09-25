import Image from "next/image";

type Item = { name: string; logo: string; url?: string };

export default function LogoMarquee({ items }: { items: Item[] }) {
  const track = [...items, ...items];

  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max items-center gap-10 animate-[marquee_70s_linear_infinite] group-hover:[animation-play-state:paused]">
        {track.map((item, i) => {
          const badge = (
            <div className="h-16 w-40 bg-[#f4f1ea] flex items-center justify-center shrink-0 px-5">
              <div className="relative h-10 w-full">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
            </div>
          );
          return item.url ? (
            <a
              key={item.name + i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="hover:opacity-90 transition-opacity"
            >
              {badge}
            </a>
          ) : (
            <div key={item.name + i}>{badge}</div>
          );
        })}
      </div>
    </div>
  );
}
