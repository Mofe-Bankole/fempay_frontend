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
import "../../../global.css";

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
  const [activeTab, setActiveTab] = useState<Tab>("bank");
  const [search, setSearch] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState("");

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

      {/* Section label */}
      <View className="flex flex-row space-x-3 border"></View>
      {/* CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pb-[34px] pt-3 bg-[#F2F2F7]">
        <TouchableOpacity
          className="bg-[#B39DDB] rounded-2xl py-[18px] items-center justify-center"
          activeOpacity={0.85}
        >
          <View className="flex-row items-center gap-2">
            <Text className="text-sm font-semibold text-white tracking-[0.1px]">
              Continue
            </Text>
            <ArrowRight size={16} color="#ffffff" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
