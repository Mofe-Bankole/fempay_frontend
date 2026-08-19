import { ChevronLeft } from "lucide-react";
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
  { emoji: string; items: BillProvider[] }
> = {
  electricity: {
    emoji: "⚡",
    items: [
      { id: "ei", name: "Ikeja Electricity (EI)" },
      { id: "ekedc", name: "Eko Electricity (EKEDC)" },
      { id: "aedc", name: "Abuja Electricity (AEDC)" },
      { id: "phed", name: "Port Harcourt (PHED)" },
      { id: "ibedc", name: "Ibadan Electricity (IBEDC)" },
    ],
  },
  cable: {
    emoji: "📺",
    items: [
      { id: "dstv", name: "DStv" },
      { id: "gotv", name: "GOtv" },
      { id: "startimes", name: "StarTimes" },
      { id: "showmax", name: "Showmax" },
    ],
  },
  internet: {
    emoji: "📶",
    items: [
      { id: "spectranet", name: "Spectranet" },
      { id: "smile", name: "Smile" },
      { id: "swift", name: "Swift Networks" },
      { id: "ipnx", name: "ipNX" },
      { id: "mtn", name: "MTN Broadband" },
    ],
  },
  water: {
    emoji: "💧",
    items: [
      { id: "lwc", name: "Lagos Water Corporation" },
      { id: "fctwb", name: "FCT Water Board" },
      { id: "rswsc", name: "Rivers State Water" },
      { id: "knswb", name: "Kano State Water Board" },
    ],
  },
};

export default function SelectProviderScreen() {
  const router = useRouter();
  const category = useBillsStore((s) => s.category);
  const selectedProvider = useBillsStore((s) => s.selectedProvider);
  const setSelectedProvider = useBillsStore((s) => s.setSelectedProvider);

  const group = PROVIDERS[category ?? "electricity"];

  return (
    <SafeAreaView className="flex-1 bg-[#F2F2F7]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      {/* Header */}
      <View className="px-5 pt-4 pb-6">
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
      <Text className="text-[14px] font-medium text-[#1c1c1e] px-5 mb-3">
        Select Provider
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
              className={`flex-row items-center gap-3 bg-white rounded-2xl px-4 py-[18px] mb-3 border-[0.5px] ${
                isSelected ? "border-[#B39DDB]" : "border-black/6"
              }`}
              activeOpacity={0.7}
              onPress={() => setSelectedProvider(item)}
            >
              <Text className="text-[20px]">{group.emoji}</Text>
              <Text className="flex-1 text-[15px] font-medium text-[#1c1c1e]">
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
