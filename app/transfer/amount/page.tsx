import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useTransferStore } from "../../../store/transfer";
import { FocusField, AppTextInput } from "../../../components/FocusField";
import "../../../global.css";

export default function AmountScreen() {
  const router = useRouter();
  const { selectedBank, accountNumber, amount, narration, setAmount, setNarration } =
    useTransferStore();
  const [localAmount, setLocalAmount] = useState(amount);

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
              Send Money
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bank info card */}
        <View className="mx-5 bg-white rounded-2xl px-4 py-4 border-[0.5px] border-black/6 mb-5">
          <View className="flex-row items-center gap-3">
            <View
              className="w-9 h-9 rounded-lg items-center justify-center"
              style={{ backgroundColor: selectedBank?.bg || "#e2e2e8" }}
            >
              <Text
                className="text-[11px] font-bold"
                style={{ color: selectedBank?.color || "#6c6c70" }}
              >
                {selectedBank?.code || "--"}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-medium text-[#1c1c1e]">
                {accountNumber}
              </Text>
              <Text className="text-xs text-[#6c6c70] mt-0.5">
                {selectedBank?.name || ""}
              </Text>
            </View>
          </View>
        </View>

        {/* Amount input */}
        <Text className="text-[11px] font-semibold text-[#8e8e93] uppercase tracking-[0.5px] mb-2 mx-5">
          Amount
        </Text>
        <FocusField
          containerClassName="mx-5 mb-3"
          className="flex-row items-center bg-white px-4 py-4"
        >
          {(fp) => (
            <>
              <Text className="text-lg font-bold text-[#1c1c1e] mr-1">₦</Text>
              <TextInput
                className="flex-1 text-lg font-bold text-[#1c1c1e] p-0"
                placeholder="0.00"
                placeholderTextColor="#aeaeb2"
                keyboardType="decimal-pad"
                value={localAmount}
                onChangeText={(val) => {
                  setLocalAmount(val);
                  setAmount(val);
                }}
                {...fp}
              />
            </>
          )}
        </FocusField>

        {/* Narration input */}
        <Text className="text-[14px] font-semibold text-[#8e8e93] uppercase tracking-[0.5px] mb-2 mx-5">
          Narration (optional)
        </Text>
        <AppTextInput
          containerClassName="mx-5 mb-5"
          fieldClassName="bg-white px-3 py-3"
          className="text-sm text-[#1c1c1e]"
          placeholder="E.g Food"
          placeholderTextColor="#aeaeb2"
          value={narration}
          onChangeText={setNarration}
        />
      </ScrollView>

      {/* Review Transfer button */}
      <View className="px-5 pb-[34px] pt-3 bg-[#F2F2F7]">
        <TouchableOpacity activeOpacity={0.85} onPress={() => router.push("/transfer/review/page" as any)}>
          <LinearGradient
            colors={["#7C3AED", "#A855F7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-2xl py-[18px] items-center justify-center"
          >
            <Text className="text-sm font-semibold text-white tracking-[0.1px]">
              Review Transfer
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
