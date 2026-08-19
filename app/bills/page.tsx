import { ChevronLeft, Droplet, Tv, Wifi, Zap } from "lucide-react";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { useBillsStore, type BillCategory } from "../../store/bills";
import "../../global.css";

type Category = {
  key: BillCategory;
  icon: React.ElementType;
  iconColor: string;
  title: string;
  subtitle: string;
};

const CATEGORIES: Category[] = [
  {
    key: "electricity",
    icon: Zap,
    iconColor: "#2FBF71",
    title: "Electricity",
    subtitle: "Pay power bills",
  },
  {
    key: "cable",
    icon: Tv,
    iconColor: "#7C3AED",
    title: "Cable TV",
    subtitle: "DStv, GOtv, Startimes",
  },
  {
    key: "internet",
    icon: Wifi,
    iconColor: "#1FB6A6",
    title: "Internet",
    subtitle: "Broadband & Fibre",
  },
  {
    key: "water",
    icon: Droplet,
    iconColor: "#7C3AED",
    title: "Water",
    subtitle: "Water utility bills",
  },
];

export default function BillPaymentScreen() {
  const router = useRouter();
  const setCategory = useBillsStore((s) => s.setCategory);
  const setSelectedProvider = useBillsStore((s) => s.setSelectedProvider);

  const handleSelect = (key: BillCategory) => {
    setSelectedProvider(null);
    setCategory(key);
    router.push("/bills/provider/page" as any);
  };

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

      {/* Category grid */}
      <View className="px-5 flex-row flex-wrap justify-between">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <TouchableOpacity
              key={cat.key}
              className="w-[48%] bg-white rounded-2xl px-4 pt-4 pb-5 mb-4 border-[0.5px] border-black/6"
              activeOpacity={0.7}
              onPress={() => handleSelect(cat.key)}
            >
              <View
                className="w-11 h-11 rounded-xl items-center justify-center mb-8"
                style={{ backgroundColor: "#F1EEF9" }}
              >
                <Icon size={22} color={cat.iconColor} strokeWidth={2} />
              </View>
              <Text className="text-[15px] font-semibold text-[#1c1c1e] mb-1">
                {cat.title}
              </Text>
              <Text className="text-[12px] text-[#8e8e93]">{cat.subtitle}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
