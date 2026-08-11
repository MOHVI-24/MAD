import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Bell } from "lucide-react-native";
import { colors } from "../../theme";
import { Avatar } from "../ui/Avatar";
import { useUnreadCount } from "../../features/notifications/hooks";
import { useAuthStore } from "../../src/store/authStore";

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { data } = useUnreadCount();
  const fullName = useAuthStore((s) => s.fullName) ?? "User";
  const unread = data?.count ?? 0;

  return (
    <View className="px-5 pb-4 pt-3">
      <View className="flex-row items-center justify-between rounded-[28px] bg-surface border border-border px-4 py-3 shadow-sm" style={{ shadowColor: "#1C114A", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.07, shadowRadius: 16, elevation: 3 }}>
        <View className="flex-1 pr-3">
          <Text className="text-[11px] font-semibold uppercase tracking-[1.2px] text-primary">Safety Overview</Text>
          <Text className="mt-1 text-2xl font-bold text-ink">{title}</Text>
          {subtitle ? <Text className="mt-1 text-sm text-muted">{subtitle}</Text> : null}
        </View>

        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => router.push("/(app)/notifications")}
            className="relative h-11 w-11 items-center justify-center rounded-full bg-primary-50 border border-primary-100"
          >
            <Bell size={18} color={colors.primary.DEFAULT} />
            {unread > 0 ? (
              <View className="absolute -right-1 -top-1 min-w-[18px] h-[18px] rounded-full bg-danger items-center justify-center px-1">
                <Text className="text-[10px] font-bold text-white">{unread > 9 ? "9+" : unread}</Text>
              </View>
            ) : null}
          </Pressable>

          <Pressable onPress={() => router.push("/(app)/profile")}>
            <Avatar name={fullName} size={40} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
