import { useState } from "react";
import { Text, View, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { colors } from "../../theme";
import { useLogin } from "../../features/auth/hooks";
import { ApiError } from "../../src/api/client";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: FormValues) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        router.replace("/(app)/dashboard");
      },
      onError: (error) => {
        const message =
          error instanceof ApiError && error.status === 401
            ? "Incorrect email or password."
            : "Couldn't sign in. Check your connection and try again.";
        Toast.show({ type: "error", text1: "Sign in failed", text2: message });
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <LinearGradient colors={["#F3F1FF", "#F8F9FC", "#EEF6FF"]} className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <View className="flex-1 justify-center gap-8 px-6 py-8">
            <Animated.View entering={FadeInDown.duration(500)} className="items-center gap-4">
              <View className="h-20 w-20 items-center justify-center rounded-[28px] bg-primary shadow-lg" style={{ shadowColor: "#6C4CF1", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.25, shadowRadius: 18, elevation: 6 }}>
                <ShieldCheck size={34} color="#fff" />
              </View>
              <View className="items-center gap-1">
                <Text className="text-3xl font-bold text-ink">AI Safety Audit</Text>
                <Text className="text-sm text-muted text-center">
                  Sign in to monitor your factory safety performance.
                </Text>
              </View>
            </Animated.View>

            <Animated.View entering={FadeInUp.duration(500).delay(100)} className="gap-4 rounded-[30px] border border-border bg-white/80 p-5 shadow-sm" style={{ shadowColor: "#1C114A", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.08, shadowRadius: 22, elevation: 4 }}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Email"
                    placeholder="you@company.com"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoComplete="email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                    leftIcon={<Mail size={18} color={colors.muted} />}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Password"
                    placeholder="••••••••"
                    secureTextEntry={!showPassword}
                    autoComplete="password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    leftIcon={<Lock size={18} color={colors.muted} />}
                    rightIcon={
                      <Pressable onPress={() => setShowPassword((s) => !s)} hitSlop={8}>
                        {showPassword ? (
                          <EyeOff size={18} color={colors.muted} />
                        ) : (
                          <Eye size={18} color={colors.muted} />
                        )}
                      </Pressable>
                    }
                  />
                )}
              />

              <Pressable onPress={() => router.push("/(auth)/forgot-password")} className="self-end">
                <Text className="text-sm font-semibold text-primary">Forgot password?</Text>
              </Pressable>

              <Button
                label="Sign In"
                onPress={handleSubmit(onSubmit)}
                loading={loginMutation.isPending}
                fullWidth
                className="mt-2"
              />
            </Animated.View>

            <Text className="text-center text-xs text-muted">
              Demo: admin@ai-safety-audit.dev / password123
            </Text>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}
