import { useState } from "react";
import { Modal, Pressable, Text, View, FlatList } from "react-native";
import { ChevronDown, Check, Building2 } from "lucide-react-native";
import { colors } from "../../theme";
import { useFactoryStore } from "../../src/store/factoryStore";
import type { FactoryResponse } from "../../src/types/api";

export function FactorySelector() {
  const [open, setOpen] = useState(false);
  const { selected, factories, select } = useFactoryStore();

  if (factories.length === 0) return null;

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        className="mx-5 mb-2 flex-row items-center gap-3 rounded-[22px] border border-border bg-surface px-4 py-3 shadow-sm"
        style={{ shadowColor: "#1C114A", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 2 }}
      >
        <View className="h-10 w-10 items-center justify-center rounded-2xl bg-primary-50">
          <Building2 size={16} color={colors.primary.DEFAULT} />
        </View>
        <View className="flex-1">
          <Text className="text-[10px] font-semibold uppercase tracking-[1.2px] text-muted">Active site</Text>
          <Text className="text-sm font-semibold text-ink" numberOfLines={1}>
            {selected?.name ?? "Select factory"}
          </Text>
        </View>
        <ChevronDown size={16} color={colors.muted} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 bg-black/35 justify-end" onPress={() => setOpen(false)}>
          <Pressable className="max-h-[72%] rounded-t-[30px] bg-surface px-5 pb-8 pt-4">
            <View className="mb-4 h-1.5 w-12 self-center rounded-full bg-border" />
            <Text className="mb-3 text-lg font-bold text-ink">Select Factory</Text>
            <FlatList
              data={factories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <FactoryRow
                  factory={item}
                  active={item.id === selected?.id}
                  onPress={() => {
                    select(item);
                    setOpen(false);
                  }}
                />
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

function FactoryRow({
  factory,
  active,
  onPress,
}: {
  factory: FactoryResponse;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between border-b border-border py-3.5"
    >
      <View className="flex-1 pr-3">
        <Text className="text-base font-semibold text-ink">{factory.name}</Text>
        {factory.location ? <Text className="mt-0.5 text-xs text-muted">{factory.location}</Text> : null}
      </View>
      {active ? <Check size={18} color={colors.primary.DEFAULT} /> : null}
    </Pressable>
  );
}
