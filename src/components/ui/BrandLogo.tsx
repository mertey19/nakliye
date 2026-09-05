import Image from "next/image";
import { business } from "@/config/business";
import { brand } from "@/config/brand";

export function BrandLogo({
  size = 48,
  className = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={brand.logo}
      alt={`${business.alternateName} logosu`}
      width={size}
      height={size}
      className={className}
      priority={priority}
    />
  );
}
