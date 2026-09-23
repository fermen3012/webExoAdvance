import React from "react";
import Image from "next/image";

interface ExoLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ExoLogo({ className = "", size = "md" }: ExoLogoProps) {
  // Sizing dimensions for the full official logo composition
  const dimensions = {
    sm: { width: 170, height: 52, container: "h-9" },
    md: { width: 230, height: 70, container: "h-12" },
    lg: { width: 340, height: 104, container: "h-20" },
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Official Exo Advance Logo Composition (Emblem + Official Typography) */}
      <div className={`relative flex items-center ${dimensions.container}`}>
        <Image
          src="/exo-logo-full-darkbg.png"
          alt="Exo Advance LLC Official Brand Logo"
          width={dimensions.width}
          height={dimensions.height}
          className="h-full w-auto object-contain filter drop-shadow-[0_0_15px_rgba(0,229,255,0.35)]"
          priority
        />
      </div>
    </div>
  );
}
