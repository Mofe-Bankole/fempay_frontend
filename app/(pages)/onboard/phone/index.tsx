import { View, Text, TouchableOpacity } from "react-native";
import "../../../../global.css";
import { ArrowLeft, Phone } from "lucide-react";
import { useRouter } from "expo-router";
import { LabelText } from "../identity-verification";
import { AppTextInput } from "../../../../components/FocusField";

export default function OnboardPhone() {
  const router = useRouter();
  return (
    <View className="min-h-screen justify-between bg-[#0A0320] flex flex-col text-white px-8 py-4">
      <View className="flex flex-col">
        <View className="flex flex-row items-start space-x-3 mb-12">
          <TouchableOpacity onPress={() => router.back()} className="mt-1">
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-white text-[1.5rem]">
              Student - Step 1 of 5
            </Text>
            <View className="w-5/5 h-1.5 bg-white rounded-full mt-2">
              <View className="w-[20%] h-full bg-[#7C3AED] rounded-full" />
            </View>
          </View>
        </View>
        <View className="space-y-6">
          <View className="bg-[rgba(124,58,237,0.3)] w-16 h-16 items-center justify-center rounded-2xl">
            <Phone size={24} color="#7C3AED" />
          </View>

          <View>
            <Text className="text-white text-3xl mb-2 font-bold">
              Phone Number
            </Text>
            <Text className="text-sm text-gray-500">
              We&apos;ll send you a verification code
            </Text>
          </View>

          <View className="flex flex-col">
            <Text className="text-[0.9rem] text-white font-bold mb-4">
              Mobile Number
            </Text>
            <View className="flex flex-col space-y-2">
              <AppTextInput
                placeholder="James Gray"
                fieldClassName="px-5 py-3" radius={12}
              />
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/(pages)/onboard/identity-verification")}
        className="rounded-lg bg-purple-600 py-4 items-center justify-center w-full"
      >
        <Text className="text-white text-[1rem] font-bold">Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
}
