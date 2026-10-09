import { View, Text, Image, TouchableOpacity } from "react-native";
import "../../../global.css";
import { ArrowRight } from "lucide-react";
import { useRouter } from "expo-router";

export default function WelcomeIntro() {
  const router = useRouter();
  return (
    <View className="min-h-screen bg-[#0A0320] flex flex-col items-center justify-center px-5">
      <Image
        source={require("../../../public/images/rafiki.png")}
        className="mb-[1.2rem]"
      />
      <View className="mx-auto text-center items-center">
        <Text className="text-white text-4xl text-center mb-4 font-bold">
          Welcome to the Future of Smart Finance
        </Text>
        <Text className="text-white text-center text-lg">
          FemPay - Your campus financial companion
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/(pages)/welcome/transfers")}
        className="mt-14 w-full py-6 rounded-2xl bg-purple-500 flex items-center justify-center"
      >
        <View className="flex-row items-center justify-center gap-2">
          <Text className="text-xl text-white">Get Started</Text>
          <ArrowRight color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
