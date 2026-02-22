import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] disabled:active:scale-100",
        variant === "primary" &&
          "bg-gradient-to-r from-[#3D9AC3] to-[#2d7a9a] text-white shadow-sm hover:shadow-md hover:from-[#3489ad] hover:to-[#2d7a9a]",
        variant === "secondary" &&
          "bg-zinc-100 text-zinc-800 hover:bg-zinc-200",
        variant === "ghost" &&
          "text-zinc-600 hover:bg-zinc-100",
        variant === "outline" &&
          "border-2 border-zinc-200 text-zinc-700 hover:border-[#3D9AC3] hover:bg-[#3D9AC3]/5",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-5 py-2.5 text-base",
        size === "lg" && "px-8 py-3.5 text-lg",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
