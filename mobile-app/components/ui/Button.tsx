import { ActivityIndicator, Pressable, PressableProps, Text } from "react-native";
import { cn } from "../../utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends Omit<PressableProps, "children"> {
  label: string;
  variant?: Variant;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, { container: string; text: string }> = {
  primary: { container: "bg-primary", text: "text-white" },
  secondary: { container: "bg-primary-50", text: "text-primary-700" },
  ghost: { container: "bg-white/60 border border-border", text: "text-ink" },
  danger: { container: "bg-danger", text: "text-white" },
};

export function Button({
  label,
  variant = "primary",
  loading,
  icon,
  fullWidth,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const style = variantStyles[variant];

  return (
    <Pressable
      disabled={disabled || loading}
      className={cn(
        "flex-row items-center justify-center rounded-pill px-5 py-3.5 gap-2 shadow-sm",
        style.container,
        (disabled || loading) && "opacity-55",
        fullWidth && "w-full",
        className
      )}
      style={{ elevation: 3 }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" || variant === "danger" ? "#fff" : "#6C4CF1"} />
      ) : (
        <>
          {icon}
          <Text className={cn("text-base font-semibold", style.text)}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}
