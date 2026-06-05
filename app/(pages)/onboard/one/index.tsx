import { View, Image, Text } from "react-native";
import "../../../../global.css";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { Button } from "@react-navigation/elements";

export default function WelcomeTwo() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#0A0320] flex flex-col text-white">
      <View className="px-6 py-4">
        <View className="flex flex-row space-y-2 items-center space-x-3 mb-12">
          <ArrowLeft className="text-2xl" />
          <Text className="text-white text-[1.5rem]">
            Student - Step 1 of 5
          </Text>
          <View>{/* progress bar will exist in this space */}</View>
        </View>
        <View className="space-y-6">
          <View className="bg-purple-900 w-16 h-16 items-center justify-center rounded-2xl">
            <Phone className="bg-purple-800" />
          </View>
          <View>
            <Text className="text-bold text-white text-3xl mb-2 font-bold">
              Phone Number
            </Text>
            <p className="text-sm text-gray-500">
              We`&apos`ll send you a verification code
            </p>
          </View>
          <View className="flex flex-col">
            <Text className="text-[0.9rem] text-white font-bold text-background">
              Mobile Number
            </Text>
          </View>
        </View>
        <button className="rounded-lg bg-purple-600 py-4 items-center justify-center w-full mt-[70.5%]">
          <Text className="text-white text-[1rem] text-bold">Send OTP</Text>
        </button>
      </View>
    </div>
  );
}
