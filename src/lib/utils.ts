import { type ClassValue, clsx } from "clsx";

export function formatPrice(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(amount);
}

export function getCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: number;
  }
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return publicId;

  const base = `https://res.cloudinary.com/${cloudName}/image/upload`;
  if (!options) return `${base}/${publicId}`;

  const transforms: string[] = [];
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.crop) transforms.push(`c_${options.crop}`);
  if (options.quality) transforms.push(`q_${options.quality}`);

  const transformStr = transforms.length > 0 ? transforms.join(",") + "/" : "";
  return `${base}/${transformStr}${publicId}`;
}

export function resolveImageUrl(src: string, cloudinaryOpts?: { width?: number }): string {
  if (!src) return "";
  if (src.startsWith("http") || src.startsWith("/")) return src;
  return getCloudinaryUrl(src, cloudinaryOpts ?? { width: 400 });
}

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
