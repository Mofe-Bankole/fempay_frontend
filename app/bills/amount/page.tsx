import { ChevronLeft, Zap } from "lucide-react";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useBillsStore } from "../../../store/bills";
import { ElectricityConfirmSheet } from "../../../components/bills/ElectricityConfirmSheet";
import { BillReceiptModal } from "../../../components/bills/BillReceiptModal";
import "../../../global.css";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ElectricityAmountScreen() {
  const router = useRouter();
  const {
    selectedProvider,
    meterNumber: storedMeter,
    phoneNumber: storedPhone,
    amount: storedAmount,
    setMeterNumber,
    setPhoneNumber,
    setAmount,
    reset,
  } = useBillsStore();

  const [phone, setPhone] = useState(storedPhone || "08012345678");
  const [amount, setLocalAmount] = useState(storedAmount || "1000");
  const [showConfirm, setShowConfirm] = useState(false);
  const [receipt, setReceipt] = useState<{
    ref: string;
    date: string;
    token: string;
  } | null>(null);

  const providerName = selectedProvider?.name
    ? selectedProvider.name.replace(/\s*\([A-Z]+\)$/, "")
    : "Ikeja Electricity";

  const cleanAmount = Number(amount.replace(/[^0-9]/g, "") || "0");
  const canContinue = phone.trim().length >= 8 && cleanAmount > 0;

  const handleNext = () => {
    if (!canContinue) return;
    setPhoneNumber(phone);
    setMeterNumber(phone);
    setAmount(amount);
    setShowConfirm(true);
  };

  const handleConfirmPay = () => {
    const now = new Date();
    const ref = `FP-BILL-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const date = `${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}, ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const token = `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
      1000 + Math.random() * 9000
    )}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    setShowConfirm(false);
    setReceipt({ ref, date, token });
  };

  const handleDone = () => {
    setReceipt(null);
    reset();
    router.push("/(pages)/home/home" as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="px-5 pt-4 pb-3">
            <View className="flex-row items-center gap-2 mb-1">
              <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
                <ChevronLeft size={26} color="#1c1c1e" />
              </TouchableOpacity>
              <Text className="text-[22px] font-bold text-[#1c1c1e]">
                Bill Payment
              </Text>
            </View>
            <Text className="text-[13px] text-[#8e8e93] ml-[34px]">
              Pay Utility bills & Subscription
            </Text>
          </View>

          {/* Provider pill indicator */}
          <View className="flex-row items-center gap-2 px-5 mt-4 mb-6">
            <Zap size={20} color="#F59E0B" fill="#F59E0B" strokeWidth={1.5} />
            <Text className="text-[16px] font-semibold text-[#1c1c1e]">
              {providerName}
            </Text>
          </View>

          {/* Form Fields */}
          <View className="px-5">
            {/* Phone / Meter Number */}
            <View className="mb-5">
              <Text className="text-[14px] font-medium text-[#4B5563] mb-2">
                Phone Number
              </Text>
              <View className="bg-white rounded-2xl border border-[#D1D1D6] px-4 py-3.5">
                <TextInput
                  value={phone}
                  onChangeText={(val) => setPhone(val.replace(/[^\d]/g, ""))}
                  placeholder="08012345678"
                  placeholderTextColor="#9ca3af"
                  keyboardType="phone-pad"
                  className="text-[16px] text-[#1c1c1e] p-0 font-medium"
                />
              </View>
            </View>

            {/* Amount (₦) */}
            <View className="mb-7">
              <Text className="text-[14px] font-medium text-[#4B5563] mb-2">
                Amount (₦)
              </Text>
              <View className="bg-white rounded-2xl border-2 border-[#8B5CF6] px-4 py-3.5 flex-row items-center">
                <Text className="text-[16px] text-[#1c1c1e] font-medium mr-1.5">
                  ₦
                </Text>
                <TextInput
                  value={amount}
                  onChangeText={(val) =>
                    setLocalAmount(val.replace(/[^\d]/g, ""))
                  }
                  placeholder="1000"
                  placeholderTextColor="#9ca3af"
                  keyboardType="number-pad"
                  className="flex-1 text-[16px] text-[#1c1c1e] p-0 font-medium"
                />
              </View>
            </View>

            {/* Next Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              disabled={!canContinue}
              onPress={handleNext}
              className="bg-[#8B5CF6] rounded-2xl py-4 items-center justify-center shadow-sm"
              style={{ opacity: canContinue ? 1 : 0.6 }}
            >
              <Text className="text-[16px] font-bold text-white">Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Confirmation Sheet (Image 5) */}
      <ElectricityConfirmSheet
        visible={showConfirm}
        amount={amount}
        providerName={providerName}
        meterNumber={phone}
        walletBalance="₦100,000"
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmPay}
      />

      {/* Transaction Receipt Modal */}
      {receipt && (
        <BillReceiptModal
          visible={!!receipt}
          amount={`₦${cleanAmount.toLocaleString()}`}
          serviceType="Bill Payment"
          to={phone}
          cardOrMeterNumber={phone}
          description={providerName}
          date={receipt.date}
          reference={receipt.ref}
          status="Successful"
          xpText="+50 XP earned 🎉"
          onDone={handleDone}
        />
      )}
    </SafeAreaView>
  );
}
