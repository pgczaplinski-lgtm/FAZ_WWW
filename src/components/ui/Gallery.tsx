import { useEffect, useRef, useState } from "react";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpened = useRef(0);
  const total = images.length;
  const alt = (i: number) => `Zdjęcie ${i + 1} z ${total}: ${title}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (index !== null && dialog && !dialog.open) dialog.showModal();
  }, [index]);

  const open = (i: number) => {
    lastOpened.current = i;
    setIndex(i);
  };
  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + total) % total));
  const onClose = () => {
    setIndex(null);
    thumbRefs.current[lastOpened.current]?.focus();
  };

  const navBtn =
    "rounded-full bg-white/90 px-4 py-2 text-lg font-bold text-ink hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <section aria-label="Galeria zdjęć" className="mt-10">
      <h2 className="text-2xl font-bold tracking-tight text-ink">Galeria zdjęć</h2>
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {images.map((src, i) => (
          <li key={src + i}>
            <button
              type="button"
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              onClick={() => open(i)}
              aria-label={`Powiększ: ${alt(i)}`}
              className="block w-full overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <img
                src={src}
                alt={alt(i)}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialogRef}
        onClose={onClose}
        aria-label={`Galeria zdjęć: ${title}`}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1);
          else if (e.key === "ArrowRight") step(1);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/85"
      >
        {index !== null && (
          <div className="flex max-h-[95vh] w-[95vw] max-w-5xl flex-col items-center gap-4">
            <img
              src={images[index]}
              alt={alt(index)}
              className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
            />
            <div className="flex items-center gap-4">
              {total > 1 && (
                <button type="button" onClick={() => step(-1)} aria-label="Poprzednie zdjęcie" className={navBtn}>
                  ←
                </button>
              )}
              <p className="min-w-[4rem] text-center font-semibold text-white" aria-live="polite">
                {index + 1} / {total}
              </p>
              {total > 1 && (
                <button type="button" onClick={() => step(1)} aria-label="Następne zdjęcie" className={navBtn}>
                  →
                </button>
              )}
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Zamknij galerię"
                className={navBtn}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
