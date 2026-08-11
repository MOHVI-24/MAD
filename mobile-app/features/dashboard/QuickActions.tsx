import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Upload, FileText, BarChart3 } from "lucide-react-native";
import { colors } from "../../theme";

const actions = [
  { label: "Upload Video", icon: Upload, href: "/(app)/upload" },
  { label: "Reports", icon: FileText, href: "/(app)/reports" },
  { label: "Analytics", icon: BarChart3, href: "/(app)/analytics" },
] as const;

export function QuickActions() {
  return (
    <View className="px-5">
      <Text className="mb-3 text-base font-bold text-ink">Quick actions</Text>
      <View className="flex-row gap-3">
        {actions.map((action) => (
          <Pressable
            key={action.label}
            onPress={() => router.push(action.href as never)}
            className="flex-1 items-center gap-2 rounded-[22px] border border-border bg-surface px-3 py-4 shadow-sm"
            style={{ shadowColor: "#1C114A", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 2 }}
          >
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary-50">
              <action.icon size={18} color={colors.primary.DEFAULT} />
            </View>
            <Text className="text-center text-xs font-semibold text-ink">{action.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
