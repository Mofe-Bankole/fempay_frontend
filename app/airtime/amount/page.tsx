import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useAirtimeStore } from "../../../store/airtime";
import { NetworkBadge } from "../../../components/NetworkBadge";
import { ConfirmSheet } from "../../../components/topup/ConfirmSheet";
import { ReceiptModal } from "../../../components/topup/ReceiptModal";
import "../../../global.css";

const QUICK_AMOUNTS = [50, 100, 200, 500, 1000, 2000];
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

export default function AirtimeAmountScreen() {
  const router = useRouter();
  const network = useAirtimeStore((s) => s.network);
  const setPhoneNumber = useAirtimeStore((s) => s.setPhoneNumber);
  const setAmount = useAirtimeStore((s) => s.setAmount);
  const reset = useAirtimeStore((s) => s.reset);

  const [phone, setPhone] = useState("");
  const [amount, setLocalAmount] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [receipt, setReceipt] = useState<{ ref: string; date: string } | null>(
    null
  );

  // Guard against landing here without a selected network (e.g. deep-link).
  useEffect(() => {
    if (!network) router.replace("/airtime/page" as any);
  }, [network, router]);

  const phoneValid = phone.replace(/\D/g, "").length === 11;
  const amountValid = Number(amount) > 0;
  const canContinue = phoneValid && amountValid && !!network;

  const handleContinue = () => {
    if (!canContinue) return;
    setPhoneNumber(phone);
    setAmount(amount);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    const now = new Date();
    const ref = `FP-AIRTIME-${Math.floor(10000000 + Math.random() * 90000000)}`;
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
              Buy Airtime
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
          <TextInput
            value={phone}
            onChangeText={(t) => setPhone(t.replace(/[^\d]/g, ""))}
            keyboardType="phone-pad"
            maxLength={11}
            placeholder="0803 000 0000"
            placeholderTextColor="#b0b0b5"
            className="bg-white rounded-2xl px-4 py-4 text-[16px] text-[#1c1c1e] border-[0.5px] border-black/6"
          />
        </View>

        {/* Amount */}
        <View className="px-5 mb-5">
          <Text className="text-[13px] font-medium text-[#1c1c1e] mb-2">
            Amount
          </Text>
          <View className="flex-row items-center bg-white rounded-2xl px-4 border-[0.5px] border-black/6">
            <Text className="text-[24px] font-bold text-[#1c1c1e] mr-1">₦</Text>
            <TextInput
              value={amount}
              onChangeText={(t) => setLocalAmount(t.replace(/[^\d]/g, ""))}
              keyboardType="number-pad"
              placeholder="0"
              placeholderTextColor="#b0b0b5"
              className="flex-1 py-4 text-[24px] font-bold text-[#1c1c1e]"
            />
          </View>
        </View>

        {/* Quick amount chips */}
        <View className="px-5 flex-row flex-wrap justify-between">
          {QUICK_AMOUNTS.map((val) => {
            const active = amount === String(val);
            return (
              <TouchableOpacity
                key={val}
                className={`w-[31%] rounded-xl py-3 mb-3 items-center border-[1px] ${
                  active
                    ? "bg-[#F1EEF9] border-[#7C3AED]"
                    : "bg-white border-black/6"
                }`}
                activeOpacity={0.7}
                onPress={() => setLocalAmount(String(val))}
              >
                <Text
                  className={`text-[15px] font-semibold ${
                    active ? "text-[#7C3AED]" : "text-[#1c1c1e]"
                  }`}
                >
                  {naira(val)}
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
      {network ? (
        <ConfirmSheet
          visible={showConfirm}
          amount={naira(amount || 0)}
          confirmLabel={`Pay ${naira(amount || 0)}`}
          walletBalance={naira(30000)}
          rows={[
            { label: "Network", value: network.name, badge: network.id },
            { label: "Phone number", value: phone },
            { label: "Product", value: "Airtime" },
          ]}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleConfirm}
        />
      ) : null}

      {/* Success receipt */}
      {network ? (
        <ReceiptModal
          visible={!!receipt}
          title="Airtime Successful"
          amount={naira(amount || 0)}
          xpText="+50 XP earned 🎉"
          rows={[
            { label: "Phone number", value: phone },
            { label: "Network", value: network.name },
            { label: "Type", value: "Airtime top-up" },
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
