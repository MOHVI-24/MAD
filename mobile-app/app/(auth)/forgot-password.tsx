import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Mail, MailCheck } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { colors } from "../../theme";
import { useForgotPassword } from "../../features/auth/hooks";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordScreen() {
  const [sent, setSent] = useState(false);
  const mutation = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: "" } });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values.email, { onSuccess: () => setSent(true) });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <LinearGradient colors={["#F3F1FF", "#F8F9FC", "#EEF6FF"]} className="flex-1">
        <View className="px-5 pt-2">
          <Pressable onPress={() => router.back()} hitSlop={12} className="h-10 w-10 items-center justify-center rounded-full bg-white/80 border border-border">
            <ArrowLeft size={22} color={colors.ink} />
          </Pressable>
        </View>

        <View className="flex-1 justify-center gap-6 px-6">
          {sent ? (
            <Animated.View entering={FadeInDown.duration(400)} className="items-center gap-4 rounded-[30px] border border-border bg-white/80 p-6 shadow-sm" style={{ shadowColor: "#1C114A", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.08, shadowRadius: 20, elevation: 4 }}>
              <View className="h-18 w-18 items-center justify-center rounded-full bg-primary-50">
                <MailCheck size={28} color={colors.primary.DEFAULT} />
              </View>
              <Text className="text-2xl font-bold text-ink text-center">Check your email</Text>
              <Text className="text-sm text-muted text-center">
                If an account exists for that address, we've sent a link to reset your password.
              </Text>
              <Button label="Back to Sign In" onPress={() => router.replace("/(auth)/login")} className="mt-2" fullWidth />
            </Animated.View>
          ) : (
            <View className="gap-5 rounded-[30px] border border-border bg-white/80 p-5 shadow-sm" style={{ shadowColor: "#1C114A", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.08, shadowRadius: 20, elevation: 4 }}>
              <View className="gap-2">
                <Text className="text-3xl font-bold text-ink">Forgot password?</Text>
                <Text className="text-sm text-muted">
                  Enter the email linked to your account and we'll send you a reset link.
                </Text>
              </View>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Email"
                    placeholder="you@company.com"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                    leftIcon={<Mail size={18} color={colors.muted} />}
                  />
                )}
              />

              <Button
                label="Send reset link"
                onPress={handleSubmit(onSubmit)}
                loading={mutation.isPending}
                fullWidth
              />
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
