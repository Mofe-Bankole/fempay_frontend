import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CheckCircle2, Share2, Copy } from "lucide-react";
import "../../global.css";

export type ReceiptRow = {
  label: string;
  value: string;
  highlight?: boolean;
};

export function ReceiptModal({
  visible,
  title,
  amount,
  rows,
  xpText,
  onDone,
}: {
  visible: boolean;
  title: string;
  amount: string;
  rows: ReceiptRow[];
  xpText?: string;
  onDone: () => void;
}) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onDone}
    >
      <SafeAreaView className="flex-1 bg-[#F2F2F7]">
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 48,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Success header */}
          <View className="items-center mb-7">
            <View className="w-20 h-20 rounded-full bg-[#d9f6e4] items-center justify-center mb-4">
              <CheckCircle2 size={44} color="#22a45d" strokeWidth={2} />
            </View>
            <Text className="text-[22px] font-bold text-[#1c1c1e] mb-1">
              {title}
            </Text>
            <Text className="text-[34px] font-extrabold text-[#1c1c1e]">
              {amount}
            </Text>
            {xpText ? (
              <View className="mt-3 rounded-full bg-[#F1EEF9] px-4 py-1.5">
                <Text className="text-[13px] font-semibold text-[#7C3AED]">
                  {xpText}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Detail rows */}
          <View className="rounded-2xl bg-white px-4 mb-6 border-[0.5px] border-black/6">
            {rows.map((r, i) => (
              <View
                key={r.label}
                className={`flex-row items-center justify-between py-3.5 ${
                  i < rows.length - 1 ? "border-b border-black/5" : ""
                }`}
              >
                <Text className="text-[14px] text-[#8e8e93]">{r.label}</Text>
                <Text
                  className={`text-[14px] font-semibold max-w-[60%] text-right ${
                    r.highlight ? "text-[#22a45d]" : "text-[#1c1c1e]"
                  }`}
                >
                  {r.value}
                </Text>
              </View>
            ))}
          </View>

          {/* Share / copy */}
          <View className="flex-row gap-3 mb-4">
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl py-3.5 border-[1px] border-black/10"
              activeOpacity={0.7}
            >
              <Share2 size={18} color="#1c1c1e" strokeWidth={1.8} />
              <Text className="text-[15px] font-medium text-[#1c1c1e]">
                Share
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl py-3.5 border-[1px] border-black/10"
              activeOpacity={0.7}
            >
              <Copy size={18} color="#1c1c1e" strokeWidth={1.8} />
              <Text className="text-[15px] font-medium text-[#1c1c1e]">
                Copy
              </Text>
            </TouchableOpacity>
          </View>

          {/* Done */}
          <TouchableOpacity activeOpacity={0.85} onPress={onDone}>
            <LinearGradient
              colors={["#7C3AED", "#A855F7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-2xl py-[18px] items-center justify-center"
            >
              <Text className="text-[16px] font-bold text-white">Done</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
