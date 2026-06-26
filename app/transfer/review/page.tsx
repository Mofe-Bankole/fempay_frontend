import { ArrowLeft, Delete } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useTransferStore } from "../../../store/transfer";
import "../../../global.css";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

function NumpadButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      className="w-[30%] items-center justify-center py-4"
      activeOpacity={0.5}
      disabled={disabled}
      onPress={onPress}
    >
      <Text className="text-[24px] font-medium text-[#1c1c1e]">{label}</Text>
    </TouchableOpacity>
  );
}

function DigitBox({ filled }: { filled: boolean }) {
  return (
    <View
      className={`w-12 h-14 rounded-xl border-2 items-center justify-center ${
        filled ? "border-[#7C3AED] bg-[#7C3AED]/10" : "border-black/10"
      }`}
    >
      {filled && <View className="w-3 h-3 rounded-full bg-[#7C3AED]" />}
    </View>
  );
}

export default function ReviewPage() {
  const router = useRouter();
  const { selectedBank, accountNumber, amount, narration } = useTransferStore();
  const [showPinPad, setShowPinPad] = useState(false);
  const [pin, setPin] = useState("");
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (showPinPad) {
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
  }, [showPinPad, slideAnim]);

  const handleNumpadPress = (value: string) => {
    if (value === "backspace") {
      setPin((prev) => prev.slice(0, -1));
    } else if (pin.length < 4) {
      setPin((prev) => prev + value);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F2F7]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-4 pb-5">
          <TouchableOpacity
            className="flex-row items-center gap-2 mb-2"
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <ArrowLeft size={22} color="#1c1c1e" />
            <Text className="text-[22px] font-bold text-[#1c1c1e]">
              Review
            </Text>
          </TouchableOpacity>
        </View>

        {/* Review card */}
        <View className="mx-5 bg-white rounded-2xl px-4 py-6 border-[0.5px] border-black/6">
          <Text className="text-[12px] font-bold text-[#1c1c1e] text-center mb-3">
            Confirm Transfer Details
          </Text>
          <Text className="text-[28px] font-bold text-[#1c1c1e] text-center mb-3">
            ₦{amount || "0.00"}
          </Text>
          <View className="border-black/6 mb-4" />

          <View className="mb-3 flex flex-row justify-between">
            <Text className="text-[11px] font-semibold text-[#8e8e93] uppercase tracking-[0.5px] mb-1">
              Bank
            </Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-sm font-medium text-[#1c1c1e]">
                {selectedBank?.name || "Banks"}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-xs text-[#6c6c70]">Account Number</Text>
            <Text className="text-sm font-medium text-[#1c1c1e]">
              {accountNumber || "1234567890"}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-xs text-[#6c6c70]">Amount</Text>
            <Text className="text-sm font-medium text-[#1c1c1e]">
              ₦{amount || "0.00"}
            </Text>
          </View>

          {narration ? (
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-xs text-[#6c6c70]">Narration</Text>
              <Text className="text-sm font-medium text-[#1c1c1e]">
                {narration}
              </Text>
            </View>
          ) : null}

          <View className="border-b border-black/6 mb-3" />
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-xs text-[#6c6c70]">Fee</Text>
            <Text className="text-sm font-medium text-[#1c1c1e]">Free</Text>
          </View>
        </View>
      </ScrollView>

      {/* Confirm button */}
      <View className="px-5 pb-[34px] pt-3 bg-[#F2F2F7]">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setShowPinPad(true)}
        >
          <LinearGradient
            colors={["#7C3AED", "#A855F7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-2xl py-[18px] items-center justify-center"
          >
            <Text className="text-sm font-semibold text-white tracking-[0.1px]">
              Confirm Transfer
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* PIN Pad blur overlay */}
      {showPinPad && (
        <View className="absolute inset-0">
          <BlurView intensity={40} tint="dark" className="flex-1" />
          <TouchableOpacity
            className="absolute inset-0"
            activeOpacity={1}
            onPress={() => {
              setShowPinPad(false);
              setPin("");
            }}
          />
        </View>
      )}

      <Animated.View
        style={{ transform: [{ translateY: slideAnim }] }}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl px-6 pb-8 pt-4"
      >
        {/* Handle */}
        <View className="w-10 h-1 bg-black/20 rounded-full self-center mb-6" />

        {/* Title */}
        <Text className="text-[17px] font-semibold text-[#1c1c1e] text-center mb-6">
          Enter PIN
        </Text>

        {/* 4 digit boxes */}
        <View className="flex-row justify-center gap-4 mb-8">
          <DigitBox filled={pin.length >= 1} />
          <DigitBox filled={pin.length >= 2} />
          <DigitBox filled={pin.length >= 3} />
          <DigitBox filled={pin.length >= 4} />
        </View>

        {/* Numpad */}
        <View className="flex-row flex-wrap justify-center">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"].map(
            (label, i) => {
              if (label === "") {
                return (
                  <TouchableOpacity
                    key={i}
                    className="w-[30%] items-center justify-center py-4"
                    activeOpacity={0.5}
                    onPress={() => handleNumpadPress("backspace")}
                  >
                    <Delete size={24} color="#1c1c1e" />
                  </TouchableOpacity>
                );
              }
              return (
                <NumpadButton
                  key={i}
                  label={label}
                  onPress={() => handleNumpadPress(label)}
                />
              );
            },
          )}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
