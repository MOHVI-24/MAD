import { forwardRef } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { colors } from "../../theme";
import { cn } from "../../utils/cn";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, leftIcon, rightIcon, className, ...props }, ref) => {
    return (
      <View className="gap-2">
        {label ? <Text className="text-sm font-semibold text-ink">{label}</Text> : null}
        <View
          className={cn(
            "flex-row items-center gap-3 rounded-2xl border bg-white/80 px-4 h-14 shadow-sm",
            error ? "border-danger" : "border-border",
            className
          )}
          style={{ shadowColor: "#1C114A", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 2 }}
        >
          {leftIcon}
          <TextInput
            ref={ref}
            placeholderTextColor={colors.muted}
            className="flex-1 text-base text-ink"
            {...props}
          />
          {rightIcon}
        </View>
        {error ? <Text className="text-xs font-medium text-danger">{error}</Text> : null}
      </View>
    );
  }
);
Input.displayName = "Input";
