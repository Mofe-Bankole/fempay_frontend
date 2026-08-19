import {
  ChevronLeft,
  Zap,
  Wallet,
  ArrowDownToLine,
  Home,
  Tag,
  PiggyBank,
  User,
} from "lucide-react";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import "../../global.css";

type Reward = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  xp: number;
  available: boolean;
};

const REWARDS: Reward[] = [
  {
    id: "1",
    icon: "📊",
    title: "₦500 Data Bonus",
    subtitle: "Get Free 500MB data bundle",
    xp: 200,
    available: true,
  },
  {
    id: "2",
    icon: "💰",
    title: "₦200 Cashback",
    subtitle: "Direct cashback to your wallet",
    xp: 150,
    available: true,
  },
  {
    id: "3",
    icon: "🚗",
    title: "Transport credit",
    subtitle: "₦300 Transport voucher",
    xp: 250,
    available: true,
  },
  {
    id: "4",
    icon: "📚",
    title: "Study Pack",
    subtitle: "Free study material access",
    xp: 100,
    available: false,
  },
];

function RewardCard({ reward }: { reward: Reward }) {
  return (
    <View className="bg-white rounded-2xl px-4 py-4 mb-3 border-[0.5px] border-black/6">
      {/* Icon + copy */}
      <View className="flex-row items-start gap-3 mb-4">
        <View className="w-11 h-11 rounded-xl bg-[#eaeaee] items-center justify-center">
          <Text className="text-[20px]">{reward.icon}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-[16px] font-bold text-[#1c1c1e]">
            {reward.title}
          </Text>
          <Text className="text-[13px] text-[#8e8e93] mt-0.5">
            {reward.subtitle}
          </Text>
        </View>
      </View>

      {/* XP cost + redeem */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          <Zap size={16} color="#7C3AED" fill="#7C3AED" strokeWidth={1} />
          <Text className="text-[15px] font-semibold text-[#7C3AED]">
            {reward.xp} XP
          </Text>
        </View>

        {reward.available ? (
          <TouchableOpacity activeOpacity={0.85}>
            <LinearGradient
              colors={["#7C3AED", "#A855F7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-2xl px-7 py-3 items-center justify-center"
            >
              <Text className="text-[15px] font-bold text-white">Redeem</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View className="rounded-2xl px-7 py-3 items-center justify-center border-[1px] border-black/10">
            <Text className="text-[15px] font-semibold text-[#b0b0b5]">
              Redeem
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default function RewardsScreen() {
  const router = useRouter();

  const tabs: { label: string; icon: any; active?: boolean }[] = [
    { label: "Home", icon: Home },
    { label: "Offers", icon: Tag, active: true },
    { label: "Saving", icon: PiggyBank },
    { label: "Me", icon: User },
  ];

  const handleTabPress = (label: string) => {
    // Offers is the current screen; Saving/Me have no destination yet.
    if (label === "Home") {
      router.back();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F2F7]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-4">
          <TouchableOpacity
            className="flex-row items-center gap-1.5 mb-1"
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color="#1c1c1e" />
            <Text className="text-[24px] font-bold text-[#1c1c1e]">Rewards</Text>
          </TouchableOpacity>
          <Text className="text-[13px] text-[#8e8e93] ml-1">
            Earn XP from transactions and redeem rewards
          </Text>
        </View>

        {/* XP balance card */}
        <View className="mx-5 mb-4 rounded-3xl bg-[#140F23] px-5 py-6 flex-row items-center gap-4">
          <View className="w-14 h-14 rounded-2xl bg-white/10 items-center justify-center">
            <Zap size={26} color="#ffffff" strokeWidth={2} />
          </View>
          <View>
            <Text className="text-[15px] text-[#c9c4d6] mb-1">
              Your XP Balance
            </Text>
            <Text className="text-[28px] font-extrabold text-white">
              1,000 XP
            </Text>
          </View>
        </View>

        {/* Cashback balance card */}
        <View className="mx-5 mb-6 rounded-2xl bg-white px-4 py-4 border-[0.5px] border-black/6">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-xl bg-[#d9f6e4] items-center justify-center">
              <Wallet size={22} color="#22a45d" strokeWidth={1.8} />
            </View>
            <View className="flex-1">
              <Text className="text-[14px] text-[#8e8e93]">
                Cashback Balance
              </Text>
              <Text className="text-[20px] font-bold text-[#1c1c1e]">₦0</Text>
            </View>
            <TouchableOpacity
              className="flex-row items-center gap-1.5 rounded-xl px-3.5 py-2.5 border-[1px] border-black/10"
              activeOpacity={0.7}
            >
              <ArrowDownToLine size={16} color="#1c1c1e" strokeWidth={1.8} />
              <Text className="text-[14px] font-medium text-[#1c1c1e]">
                Cash Out
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-[13px] text-[#8e8e93] mt-3">
            Min ₦100 to withdraw earn 2% on even transaction
          </Text>
        </View>

        {/* Available rewards */}
        <Text className="text-[18px] font-bold text-[#1c1c1e] px-5 mb-3">
          Available Rewards
        </Text>

        <View className="px-5">
          {REWARDS.map((r) => (
            <RewardCard key={r.id} reward={r} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom tab bar */}
      <View className="absolute bottom-0 left-0 right-0 flex-row bg-white border-t border-black/5 pt-2.5 pb-8 px-2">
        {tabs.map(({ label, icon: Icon, active }) => (
          <TouchableOpacity
            key={label}
            className="flex-1 items-center gap-1"
            activeOpacity={0.75}
            onPress={() => handleTabPress(label)}
          >
            <Icon
              size={22}
              color={active ? "#7C3AED" : "#1c1c1e"}
              fill={active ? "#7C3AED" : "none"}
              strokeWidth={active ? 2 : 1.8}
            />
            <Text
              className={`text-[11px] ${
                active
                  ? "text-[#7C3AED] font-semibold"
                  : "text-[#1c1c1e] font-medium"
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
