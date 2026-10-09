import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { Check, Copy, Share2 } from "lucide-react";
import "../../global.css";

export function BillReceiptModal({
  visible,
  amount,
  serviceType = "Bill Payment",
  to,
  cardOrMeterNumber,
  description,
  date,
  reference,
  status = "Successful",
  xpText = "+50 XP earned 🎉",
  onShare,
  onCopy,
  onDone,
}: {
  visible: boolean;
  amount: string;
  serviceType?: string;
  to: string;
  cardOrMeterNumber: string;
  description: string;
  date: string;
  reference: string;
  status?: string;
  xpText?: string;
  onShare?: () => void;
  onCopy?: () => void;
  onDone: () => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDone}
    >
      <View className="flex-1 bg-black/60 items-center justify-center px-4">
        <SafeAreaView className="w-full max-w-sm">
          <View className="bg-white rounded-[32px] p-6 shadow-2xl">
            {/* Title */}
            <Text className="text-[17px] font-bold text-[#1c1c1e] mb-4">
              Transaction Receipt
            </Text>

            {/* Success Icon */}
            <View className="items-center mb-1">
              <View className="w-[72px] h-[72px] rounded-full bg-[#EDE9FE] items-center justify-center">
                <View className="w-12 h-12 rounded-full bg-[#8B5CF6] items-center justify-center">
                  <Check size={28} color="#FFFFFF" strokeWidth={3} />
                </View>
              </View>
            </View>

            {/* Service & Amount */}
            <View className="items-center mb-5">
              <Text className="text-[13px] text-[#8e8e93] font-medium">
                {serviceType}
              </Text>
              <Text className="text-[34px] font-extrabold text-[#7C3AED] tracking-tight mt-0.5">
                {amount}
              </Text>
            </View>

            {/* Details Box */}
            <View className="bg-[#F2F2F7] rounded-2xl p-4 mb-4 gap-2.5">
              {/* To */}
              <View className="flex-row items-center justify-between">
                <Text className="text-[13px] text-[#8e8e93] font-medium">To</Text>
                <Text className="text-[13px] font-semibold text-[#1c1c1e]">
                  {to}
                </Text>
              </View>

              {/* Bank / Meter/Card */}
              <View className="flex-row items-center justify-between">
                <Text className="text-[13px] text-[#8e8e93] font-medium">Bank</Text>
                <Text className="text-[13px] font-semibold text-[#1c1c1e]">
                  Meter/Card: {cardOrMeterNumber}
                </Text>
              </View>

              {/* Description */}
              <View className="flex-row items-center justify-between">
                <Text className="text-[13px] text-[#8e8e93] font-medium">
                  Description
                </Text>
                <Text className="text-[13px] font-semibold text-[#1c1c1e]">
                  {description}
                </Text>
              </View>

              {/* Date */}
              <View className="flex-row items-center justify-between">
                <Text className="text-[13px] text-[#8e8e93] font-medium">Date</Text>
                <Text className="text-[13px] font-medium text-[#1c1c1e]">
                  {date}
                </Text>
              </View>

              {/* Reference */}
              <View className="flex-row items-center justify-between">
                <Text className="text-[13px] text-[#8e8e93] font-medium">
                  Reference
                </Text>
                <Text className="text-[13px] font-medium text-[#1c1c1e]">
                  {reference}
                </Text>
              </View>

              {/* Status */}
              <View className="flex-row items-center justify-between">
                <Text className="text-[13px] text-[#8e8e93] font-medium">
                  Status
                </Text>
                <Text className="text-[13px] font-semibold text-[#8B5CF6]">
                  {status}
                </Text>
              </View>
            </View>

            {/* XP Earned Banner */}
            {xpText ? (
              <View className="bg-[#DCFCE7] rounded-2xl py-3.5 items-center justify-center mb-4">
                <Text className="text-[13px] font-bold text-[#16A34A]">
                  {xpText}
                </Text>
              </View>
            ) : null}

            {/* Actions: Share, Copy, Done */}
            <View className="flex-row items-center gap-2.5">
              {/* Share */}
              <TouchableOpacity
                onPress={onShare}
                activeOpacity={0.7}
                className="flex-1 flex-row items-center justify-center gap-2 border border-[#D1D1D6] rounded-2xl py-3.5"
              >
                <Share2 size={16} color="#1c1c1e" strokeWidth={2} />
                <Text className="text-[14px] font-semibold text-[#1c1c1e]">
                  Share
                </Text>
              </TouchableOpacity>

              {/* Copy */}
              <TouchableOpacity
                onPress={onCopy}
                activeOpacity={0.7}
                className="w-12 items-center justify-center border border-[#D1D1D6] rounded-2xl py-3.5"
              >
                <Copy size={16} color="#1c1c1e" strokeWidth={2} />
              </TouchableOpacity>

              {/* Done */}
              <TouchableOpacity
                onPress={onDone}
                activeOpacity={0.85}
                className="flex-1 bg-[#8B5CF6] rounded-2xl py-3.5 items-center justify-center shadow-sm"
              >
                <Text className="text-[14px] font-bold text-white">Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}
