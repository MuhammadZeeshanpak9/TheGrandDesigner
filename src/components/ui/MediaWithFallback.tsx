"use client";

// Ported from NTWGC's src/components/ui/MediaWithFallback.tsx — pure
// presentation, no backend dependency. Trimmed to the pieces the wellness
// offering blocks actually use (image + gradient placeholder).

import Image from "next/image";
import { useState } from "react";

type BaseProps = {
  src?: string;
  alt: string;
  className?: string;
  watermark?: string;
  rounded?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
};

const DEFAULT_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiM0YTNiNmIiIGZpbGwtb3BhY2l0eT0iMC4xOCIvPjwvc3ZnPg==";

/** Renders a real asset if `src` is provided, otherwise a gold/plum gradient placeholder. */
export function ImageWithFallback({
  src,
  alt,
  className = "",
  watermark,
  rounded = "rounded-2xl",
  priority = false,
  placeholder = "blur",
  blurDataURL = DEFAULT_BLUR_DATA_URL,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: BaseProps) {
  if (src) {
    const objectFit = /\bobject-(cover|contain|fill|none|scale-down)\b/.test(className)
      ? ""
      : "object-cover";
    return (
      <FadeInImage
        src={src}
        alt={alt}
        objectFit={objectFit}
        rounded={rounded}
        className={className}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes}
      />
    );
  }
  return <GradientPlaceholder watermark={watermark} className={`${rounded} ${className}`} />;
}

function FadeInImage({
  src,
  alt,
  objectFit,
  rounded,
  className,
  priority,
  placeholder,
  blurDataURL,
  sizes,
}: {
  src: string;
  alt: string;
  objectFit: string;
  rounded: string;
  className: string;
  priority: boolean;
  placeholder: "blur" | "empty";
  blurDataURL: string;
  sizes: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      loading={priority ? undefined : "lazy"}
      placeholder={placeholder}
      blurDataURL={placeholder === "blur" ? blurDataURL : undefined}
      sizes={sizes}
      onLoad={() => setLoaded(true)}
      className={`${objectFit} ${rounded} ${className} transition-[filter] duration-500 ${loaded ? "" : "blur-[2px]"}`}
    />
  );
}

export function GradientPlaceholder({
  watermark,
  className = "rounded-2xl",
}: {
  watermark?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(74,59,107,0.18) 0%, rgba(13,79,79,0.12) 100%)",
      }}
    >
      {watermark && (
        <span className="select-none font-sans text-[10px] font-medium uppercase tracking-[0.35em] text-plum/50">
          {watermark}
        </span>
      )}
    </div>
  );
}
