import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Switch,
} from "react-native";
import { BlurView } from "expo-blur";
import { ShieldCheck, Wallet, Zap } from "lucide-react";
import "../../global.css";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export function ElectricityConfirmSheet({
  visible,
  amount,
  providerName,
  meterNumber,
  walletBalance = "₦100,000",
  onClose,
  onConfirm,
}: {
  visible: boolean;
  amount: string;
  providerName: string;
  meterNumber: string;
  walletBalance?: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [redeemXP, setRedeemXP] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 150,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const cleanAmount = Number(amount.replace(/[^0-9.]/g, "") || "0");
  const formattedFull = `₦${cleanAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
  const formattedShort = `₦${cleanAmount.toLocaleString()}`;

  if (!visible) return null;

  return (
    <View className="absolute inset-0 z-50">
      {/* Dimmed backdrop */}
      <BlurView intensity={30} tint="dark" className="flex-1">
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={onClose}
        />
      </BlurView>

      {/* Sliding Sheet */}
      <Animated.View
        style={{ transform: [{ translateY: slideAnim }] }}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] px-5 pt-3 pb-8"
      >
        {/* Grabber handle */}
        <View className="items-center mb-4">
          <View className="w-12 h-1 rounded-full bg-black/15" />
        </View>

        {/* Large Amount */}
        <View className="items-center mb-5">
          <Text className="text-[34px] font-extrabold text-[#7C3AED]">
            {formattedFull}
          </Text>
        </View>

        {/* Summary Card */}
        <View className="bg-white rounded-2xl p-4 mb-3 border border-black/10 shadow-sm">
          {/* Amount */}
          <View className="flex-row items-center justify-between py-2 border-b border-black/5">
            <Text className="text-[14px] text-[#8e8e93]">Amount</Text>
            <Text className="text-[14px] font-bold text-[#1c1c1e]">
              {formattedShort}
            </Text>
          </View>

          {/* Provider */}
          <View className="flex-row items-center justify-between py-2 border-b border-black/5">
            <Text className="text-[14px] text-[#8e8e93]">Provider</Text>
            <View className="flex-row items-center gap-1.5">
              <Zap size={15} color="#F59E0B" fill="#F59E0B" strokeWidth={1.5} />
              <Text className="text-[14px] font-semibold text-[#1c1c1e]">
                {providerName}
              </Text>
            </View>
          </View>

          {/* Meter Number */}
          <View className="flex-row items-center justify-between pt-2">
            <Text className="text-[14px] text-[#8e8e93]">Meter Number</Text>
            <Text className="text-[14px] font-semibold text-[#1c1c1e]">
              {meterNumber}
            </Text>
          </View>
        </View>

        {/* XP Reward Banner */}
        <View className="bg-[#FFFDE7] rounded-2xl p-3.5 mb-3 border border-[#FDE047] flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl bg-[#FEF08A] items-center justify-center">
              <Zap size={18} color="#D97706" fill="#D97706" strokeWidth={1.5} />
            </View>
            <View>
              <Text className="text-[13px] font-medium text-[#4B5563]">
                Electricity Bill
              </Text>
              <Text className="text-[15px] font-extrabold text-[#D97706]">
                +15 XP
              </Text>
            </View>
          </View>
          <View className="bg-[#FEF3C7] px-3.5 py-1.5 rounded-xl">
            <Text className="text-[11px] font-bold text-[#B45309]">EARN</Text>
          </View>
        </View>

        {/* XP Redeem Toggle Card */}
        <View className="bg-white rounded-2xl p-4 mb-3 border border-black/10 shadow-sm">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-[14px] font-bold text-[#1c1c1e]">
                Redeem XP to save
              </Text>
              <Text className="text-[12px] text-[#8e8e93] mt-0.5">
                No XP to save
              </Text>
            </View>
            <Switch
              value={redeemXP}
              onValueChange={setRedeemXP}
              trackColor={{ false: "#E5E5EA", true: "#8B5CF6" }}
              thumbColor="#FFFFFF"
            />
          </View>
          <Text className="text-[11px] italic text-[#8e8e93] mt-2">
            Only one promotion can be used at a time
          </Text>
        </View>

        {/* Wallet Balance Card */}
        <View className="bg-white rounded-2xl p-3.5 mb-5 border border-black/10 flex-row items-center gap-3 shadow-sm">
          <View className="w-10 h-10 rounded-xl bg-[#F3E8FF] items-center justify-center">
            <Wallet size={18} color="#7C3AED" strokeWidth={2} />
          </View>
          <View>
            <Text className="text-[12px] text-[#8e8e93]">Wallet Balance</Text>
            <Text className="text-[14px] font-bold text-[#1c1c1e]">
              {walletBalance}
            </Text>
          </View>
        </View>

        {/* Confirm & Pay Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onConfirm}
          className="bg-[#8B5CF6] rounded-2xl py-4 flex-row items-center justify-center gap-2"
        >
          <ShieldCheck size={20} color="#FFFFFF" strokeWidth={2.2} />
          <Text className="text-[16px] font-bold text-white">
            Confirm & Pay {formattedFull}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
