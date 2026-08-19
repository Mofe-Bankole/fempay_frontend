import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  House,
  Search,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useTransferStore } from "../../store/transfer";
import { FocusField, AppTextInput } from "../../components/FocusField";
import "../../global.css";

const BANKS = [
  { id: "1", code: "AC", name: "Access Bank", bg: "#fff0e6", color: "#d45f00" },
  { id: "2", code: "ZB", name: "Zenith Bank", bg: "#e6f0ff", color: "#1a5fb4" },
  {
    id: "3",
    code: "GT",
    name: "GTBank (Guaranty Trust)",
    bg: "#fff3e0",
    color: "#e65100",
  },
  {
    id: "4",
    code: "FB",
    name: "First Bank of Nigeria",
    bg: "#e8f5e9",
    color: "#2e7d32",
  },
  {
    id: "5",
    code: "FD",
    name: "Fidelity Bank",
    bg: "#e8eaf6",
    color: "#3949ab",
  },
  { id: "6", code: "MP", name: "Moniepoint", bg: "#f3e5f5", color: "#7b1fa2" },
  { id: "7", code: "OP", name: "Opay", bg: "#e0f7fa", color: "#00838f" },
];

type Tab = "bank" | "fempay";

export default function SendMoneyScreen() {
  const router = useRouter();
  const { selectedBank, accountNumber, setSelectedBank, setAccountNumber } =
    useTransferStore();

  const [activeTab, setActiveTab] = useState<Tab>("bank");
  const [search, setSearch] = useState("");

  const canContinue = selectedBank && accountNumber.length === 10;

  const filtered = BANKS.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F2F2F7]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      {/* Header */}
      <View className="px-5 pt-4 pb-5">
        <TouchableOpacity
          className="flex-row items-center gap-2 mb-2"
          activeOpacity={0.7}
        >
          <ArrowLeft size={22} color="#1c1c1e" />
          <Text className="text-[22px] font-bold text-[#1c1c1e]">
            Send Money
          </Text>
        </TouchableOpacity>
        <Text className="text-xs text-[#6c6c70] mt-0.5">
          Balance: <Text className="text-[#1c1c1e] font-medium">₦100,000</Text>
        </Text>
      </View>

      {/* Tabs */}
      <View className="flex-row bg-[#e2e2e8] rounded-2xl mx-5 mb-5 p-[3px]">
        <TouchableOpacity
          className={`flex-1 py-3 items-center rounded-xl ${activeTab === "bank" ? "bg-white shadow-sm" : ""}`}
          onPress={() => setActiveTab("bank")}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center gap-1.5">
            <House
              size={15}
              color={activeTab === "bank" ? "#1c1c1e" : "#6c6c70"}
            />
            <Text
              className={`text-xs font-medium ${activeTab === "bank" ? "text-[#1c1c1e]" : "text-[#6c6c70]"}`}
            >
              To Bank
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-3 items-center rounded-xl ${activeTab === "fempay" ? "bg-white shadow-sm" : ""}`}
          onPress={() => setActiveTab("fempay")}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center gap-1.5">
            <Users
              size={15}
              color={activeTab === "fempay" ? "#1c1c1e" : "#6c6c70"}
            />
            <Text
              className={`text-xs font-medium ${activeTab === "fempay" ? "text-[#1c1c1e]" : "text-[#6c6c70]"}`}
            >
              To FemPay
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Section label */}
      <Text className="text-[11px] font-semibold text-[#8e8e93] uppercase tracking-[0.5px] px-5 mb-2">
        Select Bank
      </Text>

      {/* Search */}
      <View className="px-5 mb-3">
        <FocusField className="flex-row items-center gap-2 bg-white px-3.5 py-3">
          {(fp) => (
            <>
              <Search size={16} color="#aeaeb2" />
              <TextInput
                className="flex-1 text-sm text-[#1c1c1e] p-0"
                placeholder="Search Bank…"
                placeholderTextColor="#aeaeb2"
                value={search}
                onChangeText={setSearch}
                {...fp}
              />
            </>
          )}
        </FocusField>
      </View>

      {/* Bank list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = selectedBank?.id === item.id;
          const bank = BANKS.find((b) => b.id === item.id)!;
          return (
            <View className="mb-2">
              <TouchableOpacity
                className={`flex-row items-center gap-3 bg-white rounded-2xl px-4 py-4 border-[0.5px] ${isSelected ? "border-[#B39DDB]" : "border-black/6"}`}
                activeOpacity={0.7}
                onPress={() => setSelectedBank(isSelected ? null : bank)}
              >
                <View
                  className="w-9 h-9 rounded-lg items-center justify-center"
                  style={{ backgroundColor: item.bg }}
                >
                  <Text
                    className="text-[11px] font-bold"
                    style={{ color: item.color }}
                  >
                    {item.code}
                  </Text>
                </View>
                <Text className="flex-1 text-sm font-medium text-[#1c1c1e]">
                  {item.name}
                </Text>
                <ChevronRight
                  size={20}
                  color={isSelected ? "#B39DDB" : "#c7c7cc"}
                />
              </TouchableOpacity>

              {isSelected && (
                <View className="bg-white rounded-2xl px-4 py-4 mt-1 border-[0.5px] border-black/6">
                  <Text className="text-[11px] font-semibold text-[#8e8e93] uppercase tracking-[0.5px] mb-2">
                    Account Number
                  </Text>
                  <AppTextInput
                    fieldClassName="px-3 py-2.5"
                    className="text-sm text-[#1c1c1e]"
                    radius={12}
                    placeholder="Enter account number"
                    placeholderTextColor="#aeaeb2"
                    keyboardType="number-pad"
                    maxLength={10}
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                  />
                </View>
              )}
            </View>
          );
        }}
      />

      {/* CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pb-[34px] pt-3 bg-[#F2F2F7]">
        {canContinue ? (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/transfer/amount/page" as any)}
          >
            <LinearGradient
              colors={["#7C3AED", "#A855F7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-2xl py-[18px] items-center justify-center"
            >
              <View className="flex-row items-center gap-2">
                <Text className="text-sm font-semibold text-white tracking-[0.1px]">
                  Continue
                </Text>
                <ArrowRight size={16} color="#ffffff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="bg-[#D4C4E8] rounded-2xl py-[18px] items-center justify-center"
            activeOpacity={0.85}
            disabled
          >
            <View className="flex-row items-center gap-2">
              <Text className="text-sm font-semibold text-white tracking-[0.1px]">
                Continue
              </Text>
              <ArrowRight size={16} color="#ffffff" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
