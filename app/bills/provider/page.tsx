import { ChevronLeft, Zap } from "lucide-react";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import {
  useBillsStore,
  type BillCategory,
  type BillProvider,
} from "../../../store/bills";
import "../../../global.css";

const PROVIDERS: Record<
  BillCategory,
  { emoji?: string; icon?: string; items: BillProvider[] }
> = {
  cable: {
    emoji: "📺",
    items: [
      { id: "dstv", name: "DStv" },
      { id: "gotv", name: "GOtv" },
      { id: "startimes", name: "StarTimes" },
    ],
  },
  electricity: {
    icon: "zap",
    items: [
      { id: "ei", name: "Ikeja Electricity (EI)" },
      { id: "ekedc", name: "Eko Electricity (EKEDC)" },
      { id: "aedc", name: "Abuja Electricity (AEDC)" },
      { id: "phed", name: "Port Harcourt (PHED)" },
      { id: "ibedc", name: "Ibadan Electricity (IBEDC)" },
    ],
  },
  internet: {
    emoji: "🌐",
    items: [
      { id: "spectranet", name: "Spectranet" },
      { id: "smile", name: "Smile communication" },
      { id: "swift", name: "Swift Network" },
      { id: "ipnx", name: "ipNX" },
    ],
  },
  water: {
    emoji: "💧",
    items: [
      { id: "lwc", name: "Lagos Water Corporation" },
      { id: "fctwb", name: "FCT Water Board" },
    ],
  },
};

export default function SelectProviderScreen() {
  const router = useRouter();
  const category = useBillsStore((s) => s.category) ?? "electricity";
  const selectedProvider = useBillsStore((s) => s.selectedProvider);
  const setSelectedProvider = useBillsStore((s) => s.setSelectedProvider);
  const setSelectedPlan = useBillsStore((s) => s.setSelectedPlan);

  const group = PROVIDERS[category] ?? PROVIDERS.electricity;

  const handleSelectProvider = (item: BillProvider) => {
    setSelectedProvider(item);
    setSelectedPlan(null);
    if (category === "cable") {
      router.push("/bills/cable/page" as any);
    } else if (category === "internet") {
      router.push("/bills/internet/page" as any);
    } else {
      router.push("/bills/amount/page" as any);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Header */}
      <View className="px-5 pt-4 pb-5">
        <View className="flex-row items-center gap-2 mb-1">
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
            <ChevronLeft size={26} color="#1c1c1e" />
          </TouchableOpacity>
          <Text className="text-[22px] font-bold text-[#1c1c1e]">
            Bill Payment
          </Text>
        </View>
        <Text className="text-[13px] text-[#8e8e93] ml-[34px]">
          Pay Utility bills & subscription
        </Text>
      </View>

      {/* Section label */}
      <Text className="text-[15px] font-medium text-[#1c1c1e] px-5 mb-4">
        Select  Provider
      </Text>

      {/* Provider list */}
      <FlatList
        data={group.items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = selectedProvider?.id === item.id;
          return (
            <TouchableOpacity
              className={`flex-row items-center gap-3.5 bg-white rounded-2xl px-5 py-[22px] mb-3.5 border ${
                isSelected ? "border-[#8B5CF6]" : "border-[#E5E5EA]"
              }`}
              activeOpacity={0.75}
              onPress={() => handleSelectProvider(item)}
            >
              {group.emoji ? (
                <Text className="text-[22px]">{group.emoji}</Text>
              ) : (
                <Zap
                  size={22}
                  color="#F59E0B"
                  fill="#F59E0B"
                  strokeWidth={1.5}
                />
              )}
              <Text className="flex-1 text-[16px] font-semibold text-[#1c1c1e]">
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
