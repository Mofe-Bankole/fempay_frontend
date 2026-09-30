import { ChevronLeft } from "lucide-react";
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
import { useBillsStore, type CablePlan } from "../../../store/bills";
import { CableConfirmSheet } from "../../../components/bills/CableConfirmSheet";
import { ReceiptModal } from "../../../components/topup/ReceiptModal";
import "../../../global.css";

const CABLE_PLANS: Record<string, CablePlan[]> = {
  dstv: [
    {
      id: "padi",
      name: "DStv Padi",
      subtitle: "Basic channels",
      price: 2950,
    },
    {
      id: "yanga",
      name: "DStv Yanga",
      subtitle: "Popular Channels",
      price: 5100,
    },
    {
      id: "confam",
      name: "DStv Confam",
      subtitle: "Family Package",
      price: 9300,
    },
    {
      id: "compact",
      name: "DStv Compact",
      subtitle: "Sports & Movies",
      price: 15700,
    },
    {
      id: "premium",
      name: "DStv Premium",
      subtitle: "All Channels",
      price: 37000,
    },
  ],
  gotv: [
    {
      id: "smallie",
      name: "GOtv Smallie",
      subtitle: "Basic channels",
      price: 1575,
    },
    {
      id: "jinja",
      name: "GOtv Jinja",
      subtitle: "Entertainment channels",
      price: 3300,
    },
    {
      id: "jolli",
      name: "GOtv Jolli",
      subtitle: "Family Package",
      price: 4850,
    },
    {
      id: "max",
      name: "GOtv Max",
      subtitle: "Sports & Entertainment",
      price: 7200,
    },
    {
      id: "supa",
      name: "GOtv Supa",
      subtitle: "All Channels",
      price: 9600,
    },
  ],
  startimes: [
    {
      id: "nova",
      name: "StarTimes Nova",
      subtitle: "Starter Package",
      price: 1700,
    },
    {
      id: "basic",
      name: "StarTimes Basic",
      subtitle: "General Channels",
      price: 3000,
    },
    {
      id: "smart",
      name: "StarTimes Smart",
      subtitle: "Family Package",
      price: 4200,
    },
    {
      id: "classic",
      name: "StarTimes Classic",
      subtitle: "Sports & Movies",
      price: 5000,
    },
    {
      id: "super",
      name: "StarTimes Super",
      subtitle: "All Channels",
      price: 8000,
    },
  ],
};

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

export default function CablePlanScreen() {
  const router = useRouter();
  const {
    selectedProvider,
    smartcardNumber: storedSmartcard,
    selectedPlan: storedPlan,
    setSmartcardNumber,
    setSelectedPlan,
    reset,
  } = useBillsStore();

  const providerKey = selectedProvider?.id || "dstv";
  const providerName = selectedProvider?.name || "DStv";

  const plans = CABLE_PLANS[providerKey] ?? CABLE_PLANS.dstv;

  const [smartcard, setSmartcard] = useState(storedSmartcard || "08012345678");
  const [selectedPlan, setLocalPlan] = useState<CablePlan | null>(
    storedPlan || plans[1] // Default to DStv Yanga as shown in Image 4
  );
  const [isFocused, setIsFocused] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [receipt, setReceipt] = useState<{
    ref: string;
    date: string;
  } | null>(null);

  const canContinue = smartcard.trim().length >= 8 && !!selectedPlan;

  const handleContinue = () => {
    if (!canContinue || !selectedPlan) return;
    setSmartcardNumber(smartcard);
    setSelectedPlan(selectedPlan);
    setShowConfirm(true);
  };

  const handleConfirmPay = () => {
    const now = new Date();
    const ref = `FP-CABLE-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const date = `${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}, ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    setShowConfirm(false);
    setReceipt({ ref, date });
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
              Pay Utility bills & subscription
            </Text>
          </View>

          {/* Provider row */}
          <View className="flex-row items-center gap-2 px-5 mt-3 mb-5">
            <Text className="text-[20px]">📺</Text>
            <Text className="text-[16px] font-semibold text-[#1c1c1e]">
              {providerName}
            </Text>
          </View>

          {/* Input field */}
          <View className="px-5 mb-5">
            <Text className="text-[14px] font-medium text-[#4B5563] mb-2">
              Smartcard / IUC number
            </Text>
            <View
              className={`bg-white rounded-2xl px-4 py-3.5 ${
                isFocused
                  ? "border-2 border-[#8B5CF6]"
                  : "border border-[#D1D1D6]"
              }`}
            >
              <TextInput
                value={smartcard}
                onChangeText={(val) => setSmartcard(val.replace(/[^\d]/g, ""))}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="E.g 08012345678"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
                className="text-[16px] text-[#1c1c1e] p-0 font-medium"
              />
            </View>
          </View>

          {/* Plan selection */}
          <View className="px-5">
            <Text className="text-[14px] font-medium text-[#4B5563] mb-3">
              Select Plan
            </Text>

            {plans.map((p) => {
              const isSelected = selectedPlan?.id === p.id;
              return (
                <TouchableOpacity
                  key={p.id}
                  activeOpacity={0.75}
                  onPress={() => setLocalPlan(p)}
                  className={`flex-row items-center justify-between rounded-2xl px-4 py-3.5 mb-3 border ${
                    isSelected
                      ? "bg-[#EDE9FE] border-[#8B5CF6]"
                      : "bg-white border-[#E5E5EA]"
                  }`}
                >
                  <View>
                    <Text className="text-[15px] font-semibold text-[#1c1c1e]">
                      {p.name}
                    </Text>
                    <Text className="text-[13px] text-[#8e8e93] mt-0.5">
                      {p.subtitle}
                    </Text>
                  </View>
                  <Text className="text-[15px] font-bold text-[#7C3AED]">
                    ₦{p.price.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {/* Continue Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              disabled={!canContinue}
              onPress={handleContinue}
              className={`rounded-2xl py-4 items-center justify-center mt-3 mb-6 ${
                canContinue ? "bg-[#8B5CF6]" : "bg-[#D4C4E8]"
              }`}
            >
              <Text className="text-[16px] font-bold text-white">Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Confirmation Bottom Sheet (Image 5) */}
      {selectedPlan && (
        <CableConfirmSheet
          visible={showConfirm}
          amount={selectedPlan.price}
          providerName={providerName}
          smartcardNumber={smartcard}
          planName={selectedPlan.name}
          walletBalance="₦100,000"
          onClose={() => setShowConfirm(false)}
          onConfirm={handleConfirmPay}
        />
      )}

      {/* Success Receipt Modal */}
      <ReceiptModal
        visible={!!receipt}
        title="Cable TV Subscription Successful"
        amount={`₦${(selectedPlan?.price || 0).toLocaleString()}`}
        xpText="+5 XP earned 🎉"
        rows={[
          { label: "Provider", value: providerName },
          { label: "Smartcard / IUC", value: smartcard },
          { label: "Plan", value: selectedPlan?.name ?? "" },
          { label: "Reference", value: receipt?.ref ?? "" },
          { label: "Date", value: receipt?.date ?? "" },
          { label: "Status", value: "Successful", highlight: true },
        ]}
        onDone={handleDone}
      />
    </SafeAreaView>
  );
}
