import { ChevronLeft } from "lucide-react";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { NETWORKS, type Network } from "../../constants/networks";
import { NetworkBadge } from "../../components/NetworkBadge";
import { useAirtimeStore } from "../../store/airtime";
import "../../global.css";

export default function BuyAirtimeScreen() {
  const router = useRouter();
  const setNetwork = useAirtimeStore((s) => s.setNetwork);

  const handleSelect = (network: Network) => {
    setNetwork(network);
    router.push("/airtime/amount/page" as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F2F2F7]">
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      {/* Header */}
      <View className="px-5 pt-4 pb-6">
        <View className="flex-row items-center gap-2 mb-1">
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
            <ChevronLeft size={26} color="#1c1c1e" />
          </TouchableOpacity>
          <Text className="text-[22px] font-bold text-[#1c1c1e]">
            Buy Airtime
          </Text>
        </View>
        <Text className="text-[13px] text-[#8e8e93] ml-[34px]">
          Select a network to top up
        </Text>
      </View>

      {/* Network grid */}
      <View className="px-5 flex-row flex-wrap justify-between">
        {NETWORKS.map((n) => (
          <TouchableOpacity
            key={n.id}
            className="w-[48%] bg-white rounded-2xl px-4 py-6 mb-4 border-[0.5px] border-black/6 items-center"
            activeOpacity={0.7}
            onPress={() => handleSelect(n)}
          >
            <NetworkBadge id={n.id} size={56} />
            <Text className="text-[15px] font-semibold text-[#1c1c1e] mt-3">
              {n.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
