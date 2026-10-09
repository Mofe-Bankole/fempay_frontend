import { View, Text, Image, TouchableOpacity } from "react-native";
import "../../../global.css";
import { ArrowRight } from "lucide-react";
import { useRouter } from "expo-router";

export default function WelcomeSecurity() {
  const router = useRouter();
  return (
    <View className="min-h-screen bg-[#0A0320] flex flex-col items-center justify-center">
      <Image
        source={require("../../../public/images/rafiki.png")}
        className="mb-[1.2rem]"
      />
      <View className="mx-auto text-center items-center px-5">
        <Text className="text-white text-4xl text-center mb-4 font-bold">
          Your money is protected with bank-level security
        </Text>
        <Text className="text-white text-center text-[15px] mb-14">
          256-bit encryption, biometrics login and fraud protection
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(pages)/questionnaire")}
          className="mb-5 w-full py-6 rounded-2xl bg-purple-500 flex items-center justify-center"
        >
          <View className="flex-row items-center justify-center gap-2">
            <Text className="text-xl text-white">Create Account</Text>
            <ArrowRight color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
