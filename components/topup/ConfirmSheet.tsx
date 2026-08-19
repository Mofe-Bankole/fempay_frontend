import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { X } from "lucide-react";
import { NetworkBadge } from "../NetworkBadge";
import type { NetworkId } from "../../constants/networks";
import "../../global.css";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export type ConfirmRow = {
  label: string;
  value: string;
  badge?: NetworkId;
};

export function ConfirmSheet({
  visible,
  title = "Confirm Purchase",
  amount,
  rows,
  walletBalance,
  confirmLabel,
  onClose,
  onConfirm,
}: {
  visible: boolean;
  title?: string;
  amount: string;
  rows: ConfirmRow[];
  walletBalance?: string;
  confirmLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

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

  return (
    <>
      {/* Blur overlay — tap to dismiss */}
      {visible && (
        <View className="absolute inset-0">
          <BlurView intensity={40} tint="dark" className="flex-1" />
          <TouchableOpacity
            className="absolute inset-0"
            activeOpacity={1}
            onPress={onClose}
          />
        </View>
      )}

      <Animated.View
        style={{ transform: [{ translateY: slideAnim }] }}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl px-6 pb-9 pt-5"
      >
        {/* Grabber */}
        <View className="items-center mb-4">
          <View className="w-10 h-1 rounded-full bg-black/10" />
        </View>

        {/* Header */}
        <View className="flex-row items-center justify-between mb-5">
          <Text className="text-[20px] font-bold text-[#1c1c1e]">{title}</Text>
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.7}
            className="w-8 h-8 rounded-full bg-[#F2F2F7] items-center justify-center"
          >
            <X size={18} color="#1c1c1e" />
          </TouchableOpacity>
        </View>

        {/* Amount */}
        <View className="items-center mb-6">
          <Text className="text-[13px] text-[#8e8e93] mb-1">Amount</Text>
          <Text className="text-[34px] font-extrabold text-[#1c1c1e]">
            {amount}
          </Text>
        </View>

        {/* Detail rows */}
        <View className="rounded-2xl bg-[#F7F7FA] px-4 mb-5">
          {rows.map((r, i) => (
            <View
              key={r.label}
              className={`flex-row items-center justify-between py-3.5 ${
                i < rows.length - 1 ? "border-b border-black/5" : ""
              }`}
            >
              <Text className="text-[14px] text-[#8e8e93]">{r.label}</Text>
              <View className="flex-row items-center gap-2">
                {r.badge ? <NetworkBadge id={r.badge} size={22} /> : null}
                <Text className="text-[14px] font-semibold text-[#1c1c1e]">
                  {r.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {walletBalance ? (
          <View className="flex-row items-center justify-between mb-5 px-1">
            <Text className="text-[13px] text-[#8e8e93]">Wallet balance</Text>
            <Text className="text-[13px] font-medium text-[#1c1c1e]">
              {walletBalance}
            </Text>
          </View>
        ) : null}

        {/* Confirm */}
        <TouchableOpacity activeOpacity={0.85} onPress={onConfirm}>
          <LinearGradient
            colors={["#7C3AED", "#A855F7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-2xl py-[18px] items-center justify-center"
          >
            <Text className="text-[16px] font-bold text-white">
              {confirmLabel}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}
