import { View, Text, TouchableOpacity } from "react-native";
import "../../../../global.css";
import { ArrowLeft, House, Phone } from "lucide-react";
import { useRouter } from "expo-router";
import { TextInput } from "react-native";

export default function OnboardFour() {
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
              Student - Step 4 of 5
            </Text>
            <View className="w-5/5 h-1.5 bg-white rounded-full mt-2">
              <View className="w-[80%] h-full bg-[#7C3AED] rounded-full" />
            </View>
          </View>
        </View>
        <View className="space-y-6">
          <View className="bg-[rgba(124,58,237,0.3)] w-16 h-16 items-center justify-center rounded-2xl">
            <House size={24} color="#7C3AED" />
          </View>

          <View>
            <Text className="text-white text-3xl mb-2 font-bold">Income</Text>
            <Text className="text-sm text-gray-500">
              Whats your annual monthly allowance?
            </Text>
          </View>

          <View className="flex flex-col space-y-3">
            <Text className="text-[0.9rem] text-white font-bold">
              Avg Monthly Allowance
            </Text>
            <TextInput
              placeholder="#"
              className="px-5 py-3 border border-purple-500 outline-none rounded-xl"
            />
          </View>
          <View className="flex flex-col space-y-3">
            <Text className="text-[0.9rem] text-white font-bold">Street</Text>
            <TextInput
              placeholder="Odegbayi Close"
              className="px-5 py-3 border border-purple-500 outline-none rounded-xl"
            />
          </View>
          {/*<View className="flex flex-row space-x-6">
            <View className="flex flex-col space-y-3">
              <Text className="text-[0.9rem] text-white font-bold">State</Text>
              <TextInput
                placeholder="Lagos State"
                className="px-5 py-3 border border-purple-500 outline-none rounded-xl"
              />
            </View>
            <View className="flex flex-col space-y-3">
              <Text className="text-[0.9rem] text-white font-bold">
                Postal Code
              </Text>
              <TextInput
                placeholder="200130"
                className="px-5 py-3 border border-purple-500 outline-none rounded-xl"
              />
            </View>
          </View>*/}
        </View>
      </View>

      <TouchableOpacity
        className="rounded-lg bg-purple-600 py-4 items-center justify-center w-full"
        onPress={() => router.push("/(pages)/onboard/five")}
      >
        <Text className="text-white text-[1rem] font-bold">Next</Text>
      </TouchableOpacity>
    </View>
  );
}
