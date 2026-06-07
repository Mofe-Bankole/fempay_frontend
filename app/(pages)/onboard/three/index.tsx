import { View, Text, TouchableOpacity } from "react-native";
import "../../../../global.css";
import { ArrowLeft, House, Phone, Shield } from "lucide-react";
import { useRouter } from "expo-router";
import { TextInput } from "react-native";

export default function OnboardOne() {
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
              Student - Step 3 of 5
            </Text>
            <View className="w-5/5 h-1.5 bg-white rounded-full mt-2">
              <View className="w-[60%] h-full bg-[#7C3AED] rounded-full" />
            </View>
          </View>
        </View>
        <View className="space-y-6">
          <View className="bg-[rgba(124,58,237,0.3)] w-16 h-16 items-center justify-center rounded-2xl">
            <Shield size={24} color="#FFC727" />
          </View>

          <View>
            <Text className="text-white text-3xl mb-2 font-bold">Address</Text>
            <Text className="text-sm text-gray-500">
              Identify your self to unlock higher limits
            </Text>
          </View>

          <View className="flex flex-col space-y-3">
            <Text className="text-[0.9rem] text-white font-bold">
              BVN (Bank verification number)
            </Text>
            <TextInput
              placeholder="No 9 ..."
              className="px-5 py-3 border border-purple-500 outline-none rounded-xl"
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="rounded-lg bg-purple-600 py-4 items-center justify-center w-full"
        onPress={() => router.push("/(pages)/onboard/four")}
      >
        <Text className="text-white text-[1rem] font-bold">Next</Text>
      </TouchableOpacity>
    </View>
  );
}
