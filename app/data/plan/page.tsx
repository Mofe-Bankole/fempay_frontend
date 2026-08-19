import { ArrowLeft, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { useDataStore, DATA_PLANS, type DataPlan } from "../../../store/data";
import { NetworkBadge } from "../../../components/NetworkBadge";
import { ConfirmSheet } from "../../../components/topup/ConfirmSheet";
import { ReceiptModal } from "../../../components/topup/ReceiptModal";
import { AppTextInput } from "../../../components/FocusField";
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

const withCommas = (s: string | number) =>
  String(s).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const naira = (s: string | number) => `₦${withCommas(s)}`;

export default function DataPlanScreen() {
  const router = useRouter();
  const network = useDataStore((s) => s.network);
  const selectedPlan = useDataStore((s) => s.selectedPlan);
  const setSelectedPlan = useDataStore((s) => s.setSelectedPlan);
  const setPhoneNumber = useDataStore((s) => s.setPhoneNumber);
  const reset = useDataStore((s) => s.reset);

  const [phone, setPhone] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [receipt, setReceipt] = useState<{ ref: string; date: string } | null>(
    null
  );

  useEffect(() => {
    if (!network) router.replace("/data/page" as any);
  }, [network, router]);

  const phoneValid = phone.replace(/\D/g, "").length === 11;
  const canContinue = phoneValid && !!selectedPlan && !!network;

  const handleSelectPlan = (plan: DataPlan) => setSelectedPlan(plan);

  const handleContinue = () => {
    if (!canContinue) return;
    setPhoneNumber(phone);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    const now = new Date();
    const ref = `FP-DATA-${Math.floor(10000000 + Math.random() * 90000000)}`;
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
    <SafeAreaView className="flex-1 bg-[#F2F2F7]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-4">
          <TouchableOpacity
            className="flex-row items-center gap-2 mb-1"
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <ArrowLeft size={22} color="#1c1c1e" />
            <Text className="text-[22px] font-bold text-[#1c1c1e]">
              Buy Data
            </Text>
          </TouchableOpacity>
        </View>

        {/* Selected network */}
        {network ? (
          <View className="mx-5 mb-5 flex-row items-center gap-3 bg-white rounded-2xl px-4 py-3 border-[0.5px] border-black/6">
            <NetworkBadge id={network.id} size={40} />
            <View className="flex-1">
              <Text className="text-[12px] text-[#8e8e93]">Network</Text>
              <Text className="text-[16px] font-semibold text-[#1c1c1e]">
                {network.name}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
              <Text className="text-[14px] font-semibold text-[#7C3AED]">
                Change
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Phone number */}
        <View className="px-5 mb-5">
          <Text className="text-[13px] font-medium text-[#1c1c1e] mb-2">
            Phone Number
          </Text>
          <AppTextInput
            value={phone}
            onChangeText={(t) => setPhone(t.replace(/[^\d]/g, ""))}
            keyboardType="phone-pad"
            maxLength={11}
            placeholder="0803 000 0000"
            placeholderTextColor="#b0b0b5"
            fieldClassName="bg-white px-4 py-4"
            className="text-[16px] text-[#1c1c1e]"
          />
        </View>

        {/* Plan list */}
        <Text className="text-[13px] font-medium text-[#1c1c1e] px-5 mb-2">
          Choose a plan
        </Text>
        <View className="px-5">
          {DATA_PLANS.map((plan) => {
            const active = selectedPlan?.id === plan.id;
            return (
              <TouchableOpacity
                key={plan.id}
                className={`flex-row items-center justify-between rounded-2xl px-4 py-4 mb-3 border-[1.5px] ${
                  active
                    ? "bg-[#F1EEF9] border-[#7C3AED]"
                    : "bg-white border-black/6"
                }`}
                activeOpacity={0.7}
                onPress={() => handleSelectPlan(plan)}
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={`w-6 h-6 rounded-full items-center justify-center border-[1.5px] ${
                      active
                        ? "bg-[#7C3AED] border-[#7C3AED]"
                        : "border-black/20"
                    }`}
                  >
                    {active ? (
                      <Check size={14} color="#ffffff" strokeWidth={3} />
                    ) : null}
                  </View>
                  <View>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-[16px] font-bold text-[#1c1c1e]">
                        {plan.label}
                      </Text>
                      {plan.popular ? (
                        <View className="rounded-full bg-[#7C3AED] px-2 py-0.5">
                          <Text className="text-[10px] font-bold text-white">
                            POPULAR
                          </Text>
                        </View>
                      ) : null}
                    </View>
                    <Text className="text-[13px] text-[#8e8e93] mt-0.5">
                      {plan.validity}
                    </Text>
                  </View>
                </View>
                <Text className="text-[16px] font-bold text-[#1c1c1e]">
                  {naira(plan.price)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Continue */}
      <View className="px-5 pb-[34px] pt-3 bg-[#F2F2F7]">
        <TouchableOpacity
          activeOpacity={0.85}
          disabled={!canContinue}
          onPress={handleContinue}
        >
          <LinearGradient
            colors={["#7C3AED", "#A855F7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-2xl py-[18px] items-center justify-center"
            style={{ opacity: canContinue ? 1 : 0.5 }}
          >
            <Text className="text-[16px] font-bold text-white">Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Confirmation sheet */}
      {network && selectedPlan ? (
        <ConfirmSheet
          visible={showConfirm}
          amount={naira(selectedPlan.price)}
          confirmLabel={`Pay ${naira(selectedPlan.price)}`}
          walletBalance={naira(30000)}
          rows={[
            { label: "Network", value: network.name, badge: network.id },
            { label: "Phone number", value: phone },
            {
              label: "Plan",
              value: `${selectedPlan.label} • ${selectedPlan.validity}`,
            },
          ]}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleConfirm}
        />
      ) : null}

      {/* Success receipt */}
      {network && selectedPlan ? (
        <ReceiptModal
          visible={!!receipt}
          title="Data Successful"
          amount={naira(selectedPlan.price)}
          xpText="+50 XP earned 🎉"
          rows={[
            { label: "Phone number", value: phone },
            { label: "Network", value: network.name },
            {
              label: "Plan",
              value: `${selectedPlan.label} (${selectedPlan.validity})`,
            },
            { label: "Type", value: "Data bundle" },
            { label: "Reference", value: receipt?.ref ?? "" },
            { label: "Date", value: receipt?.date ?? "" },
            { label: "Status", value: "Successful", highlight: true },
          ]}
          onDone={handleDone}
        />
      ) : null}
    </SafeAreaView>
  );
}
