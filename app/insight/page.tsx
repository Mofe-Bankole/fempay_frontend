import {
  ArrowLeft,
  Gauge,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useInsightStore } from "../../store/insight";
import "../../global.css";

const PRESET_LIMITS = ["₦5,000", "₦10,000", "₦20,000", "₦35,000"];

export default function InsightPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ title?: string }>();

  const {
    balance,
    dailyLimit,
    weeklyBudget,
    totalSpent,
    savings,
    setDailyLimit,
  } = useInsightStore();

  const [inputVal, setInputVal] = useState(dailyLimit);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Calculate percentage used and remaining budget
  const percentUsed =
    weeklyBudget > 0
      ? Math.min(100, Math.round((totalSpent / weeklyBudget) * 100))
      : 0;
  const remainingBudget = Math.max(0, weeklyBudget - totalSpent);
  const dailySuggested = Math.round(weeklyBudget / 7);

  const handleSelectPreset = (preset: string) => {
    setSelectedPreset(preset);
    const numericStr = preset.replace(/[^0-9]/g, "");
    setInputVal(Number(numericStr).toLocaleString());
    setIsSaved(false);
  };

  const handleSetLimit = () => {
    if (!inputVal.trim()) return;
    const cleanNum = inputVal.replace(/[^0-9]/g, "");
    const formatted = Number(cleanNum).toLocaleString();
    setInputVal(formatted);
    setDailyLimit(formatted);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const title = params.title || "Send Money";

  return (
    <SafeAreaView className="flex-1 bg-[#F2F2F7]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="px-5 pt-4 pb-4">
            <TouchableOpacity
              className="flex-row items-center gap-2 mb-2"
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <ArrowLeft size={22} color="#1c1c1e" />
              <Text className="text-[22px] font-bold text-[#1c1c1e]">
                {title}
              </Text>
            </TouchableOpacity>
            <Text className="text-xs text-[#6c6c70] mt-0.5">
              Balance:{" "}
              <Text className="text-[#1c1c1e] font-semibold">
                ₦{balance.toLocaleString()}
              </Text>
            </Text>
          </View>

          <View className="px-5 gap-3.5">
            {/* Card 1: Daily spending limit */}
            <View className="bg-white rounded-3xl p-5 border-[0.5px] border-black/5 shadow-sm">
              <View className="flex-row items-center gap-2 mb-3.5">
                <Gauge size={20} color="#8B5CF6" strokeWidth={2.2} />
                <Text className="text-[15px] font-bold text-[#1c1c1e]">
                  Daily spending limit
                </Text>
              </View>

              {/* Input + Set Button */}
              <View className="flex-row items-center gap-2.5 mb-3.5">
                <View className="flex-1 flex-row items-center bg-[#F4F4F6] rounded-xl px-3.5 py-3 border-[0.5px] border-black/10">
                  <TextInput
                    className="flex-1 text-[14px] text-[#1c1c1e] p-0 font-medium"
                    placeholder="e.g 15,000"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                    value={inputVal}
                    onChangeText={(val) => {
                      setInputVal(val);
                      setSelectedPreset(null);
                      setIsSaved(false);
                    }}
                  />
                </View>
                <TouchableOpacity
                  className={`px-6 py-3 rounded-xl items-center justify-center ${
                    isSaved ? "bg-[#10B981]" : "bg-[#8B5CF6]"
                  }`}
                  activeOpacity={0.8}
                  onPress={handleSetLimit}
                >
                  <Text className="text-white font-semibold text-[15px]">
                    {isSaved ? "Set ✓" : "Set"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Quick select pills */}
              <View className="flex-row justify-between gap-2">
                {PRESET_LIMITS.map((preset) => {
                  const isSelected = selectedPreset === preset;
                  return (
                    <TouchableOpacity
                      key={preset}
                      onPress={() => handleSelectPreset(preset)}
                      className={`flex-1 items-center justify-center py-2 px-1 rounded-xl border ${
                        isSelected
                          ? "bg-[#EDE9FE] border-[#8B5CF6]"
                          : "bg-white border-[#D1D1D6]"
                      }`}
                      activeOpacity={0.7}
                    >
                      <Text
                        className={`text-[12px] font-semibold ${
                          isSelected ? "text-[#7C3AED]" : "text-[#1c1c1e]"
                        }`}
                      >
                        {preset}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Row of 3 Metric Cards */}
            <View className="flex-row justify-between gap-2.5">
              {/* Total Spent */}
              <View className="flex-1 bg-white rounded-2xl p-3.5 border-[0.5px] border-black/5 shadow-sm">
                <TrendingDown size={18} color="#EF4444" strokeWidth={2.2} />
                <Text className="text-[11px] text-[#6c6c70] font-medium mt-1.5">
                  Total Spent
                </Text>
                <Text className="text-[15px] font-bold text-[#1c1c1e] mt-1">
                  ₦{totalSpent.toLocaleString()}
                </Text>
              </View>

              {/* Weekly Budget */}
              <View className="flex-1 bg-white rounded-2xl p-3.5 border-[0.5px] border-black/5 shadow-sm">
                <Target size={18} color="#8B5CF6" strokeWidth={2.2} />
                <Text className="text-[11px] text-[#6c6c70] font-medium mt-1.5">
                  Weekly Budget
                </Text>
                <Text className="text-[15px] font-bold text-[#1c1c1e] mt-1">
                  ₦{weeklyBudget.toLocaleString()}
                </Text>
              </View>

              {/* Savings */}
              <View className="flex-1 bg-white rounded-2xl p-3.5 border-[0.5px] border-black/5 shadow-sm">
                <TrendingUp size={18} color="#22C55E" strokeWidth={2.2} />
                <Text className="text-[11px] text-[#6c6c70] font-medium mt-1.5">
                  Savings
                </Text>
                <Text className="text-[15px] font-bold text-[#1c1c1e] mt-1">
                  ₦{savings.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Card 3: This week's spending (Dark Navy Card) */}
            <View className="bg-[#0B051E] rounded-3xl p-5 shadow-md">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-[14px] font-medium text-white">
                  This week’s spending
                </Text>
                <Text className="text-[13px] text-[#A1A1AA] font-normal">
                  {percentUsed}% used
                </Text>
              </View>

              <Text className="text-[30px] font-bold text-white tracking-tight">
                ₦{totalSpent.toLocaleString()}
              </Text>
              <Text className="text-[12px] text-[#A1A1AA] mt-0.5 mb-4">
                of ₦{weeklyBudget.toLocaleString()} budget
              </Text>

              {/* Progress bar */}
              <View className="h-2 bg-[#2D2846] rounded-full overflow-hidden mb-3">
                <View
                  className="h-full bg-[#8B5CF6] rounded-full"
                  style={{ width: `${percentUsed}%` }}
                />
              </View>

              {/* Suggested & Left */}
              <View className="flex-row items-center justify-between">
                <Text className="text-[12px] text-[#A1A1AA] font-normal">
                  ₦{dailySuggested.toLocaleString()}/day suggested
                </Text>
                <Text className="text-[12px] text-[#A1A1AA] font-normal">
                  ₦{remainingBudget.toLocaleString()} left
                </Text>
              </View>
            </View>

            {/* Card 4: Empty State Card */}
            <View className="bg-white rounded-3xl p-8 items-center justify-center border-[0.5px] border-black/5 min-h-[140px] shadow-sm">
              <TrendingUp size={28} color="#9CA3AF" strokeWidth={1.8} />
              <Text className="text-[15px] font-semibold text-[#4B5563] mt-2.5">
                No spending data yet
              </Text>
              <Text className="text-[13px] text-[#9CA3AF] mt-1">
                Make transaction to see insight
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
