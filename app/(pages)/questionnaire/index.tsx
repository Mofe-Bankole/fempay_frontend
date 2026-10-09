import { View, Text, TouchableOpacity } from "react-native";
import "../../../global.css";
import { ArrowRight, GraduationCap, Store } from "lucide-react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View className="min-h-screen bg-[#0A0320] flex flex-col items-center justify-center px-5">
      <Text className="text-2xl mb-6 text-white">How will you use Fempay?</Text>

      <TouchableOpacity
        onPress={() => router.push("/(pages)/onboard/phone")}
        className="w-full px-3 py-3 flex flex-row border-purple-600 border-[5px] rounded-lg items-center mb-5"
      >
        <View className="mr-4">
          <GraduationCap size={50} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-2xl text-white font-bold">Student</Text>
          <Text className="text-white text-sm">
            Track spending, save smarter, earn XP and pay merchant on campus
          </Text>
        </View>
        <ArrowRight size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity className="w-full px-3 py-3 flex flex-row border-purple-600 border-[5px] rounded-lg items-center">
        <View className="mr-4">
          <Store size={50} color="white" />
        </View>
        <View className="flex-1">
          <Text className="text-2xl text-white font-bold">Merchant</Text>
          <Text className="text-white text-sm">
            Accept payments, create offers, manage your shop and attract student on campus
          </Text>
        </View>
        <ArrowRight size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
