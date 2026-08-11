import { Text, View } from "react-native";
import { TrendingDown, TrendingUp, ShieldAlert } from "lucide-react-native";
import { Card } from "../../components/ui/Card";
import { ScoreRing } from "../../components/ui/ScoreRing";
import { colors } from "../../theme";
import type { AnalyticsSummaryResponse } from "../../src/types/api";

export function DashboardSummary({ analytics }: { analytics: AnalyticsSummaryResponse }) {
  return (
    <View className="flex-row gap-3 px-5">
      <Card className="flex-1 items-center justify-center gap-2 rounded-[26px] bg-gradient-to-b from-white to-primary-50/30 border-primary-100">
        <ScoreRing score={analytics.avgSafetyScoreLast30Days} size={88} label="Safety" />
        <Text className="text-[11px] font-semibold uppercase tracking-[1.2px] text-muted">30-day average</Text>
      </Card>

      <View className="flex-1 gap-3">
        <Card className="flex-row items-center gap-3 rounded-[22px] border-danger/10 bg-red-50/60 py-3.5">
          <View className="h-11 w-11 items-center justify-center rounded-2xl bg-danger/10">
            <ShieldAlert size={18} color={colors.danger} />
          </View>
          <View className="flex-1">
            <Text className="text-[11px] font-semibold uppercase tracking-[1.1px] text-danger">Violations</Text>
            <Text className="text-xl font-bold text-ink">{analytics.totalViolationsLast30Days}</Text>
          </View>
        </Card>

        <Card className="flex-row items-center gap-3 rounded-[22px] border-primary-100 bg-primary-50/60 py-3.5">
          <View className="h-11 w-11 items-center justify-center rounded-2xl bg-primary-100">
            {analytics.totalUploadsLast30Days > 0 ? (
              <TrendingUp size={18} color={colors.primary.DEFAULT} />
            ) : (
              <TrendingDown size={18} color={colors.muted} />
            )}
          </View>
          <View className="flex-1">
            <Text className="text-[11px] font-semibold uppercase tracking-[1.1px] text-primary">Uploads</Text>
            <Text className="text-xl font-bold text-ink">{analytics.totalUploadsLast30Days}</Text>
          </View>
        </Card>
      </View>
    </View>
  );
}
