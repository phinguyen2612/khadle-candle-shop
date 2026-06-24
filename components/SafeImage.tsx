"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function SafeImage({
  src,
  alt,
  className
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  const [imageSrc, setImageSrc] = useState(
    src || "/images/z7963231937978_859c7a6eafbeec266f9969dea9a5e661.jpg"
  );

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={900}
      height={675}
      unoptimized
      className={cn("object-cover", className)}
      onError={() => setImageSrc("/images/z7963231937978_859c7a6eafbeec266f9969dea9a5e661.jpg")}
    />
  );
}
