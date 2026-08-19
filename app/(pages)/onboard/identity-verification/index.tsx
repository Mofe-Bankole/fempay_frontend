import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import "../../../../global.css";
import { ArrowLeft, Phone, User } from "lucide-react";
import { useRouter } from "expo-router";
import { AppTextInput } from "../../../../components/FocusField";

export function LabelText({ text }: { text: string }) {
  return <Text className="text-[0.9rem] text-gray-500 font-bold">{text}</Text>;
}

export default function OnboardOne() {
  const router = useRouter();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="min-h-screen flex-1 justify-between bg-[#0A0320] flex flex-col text-white px-8 py-4"
    >
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
          <View className="w-16 h-16 items-center justify-center rounded-2xl bg-[#22C55E]/20">
            <User size={24} color="#22C55E" />
          </View>

          <View>
            <Text className="text-white text-3xl mb-2 font-bold">
              Identity Verification
            </Text>
            <Text className="text-[1rem] font-bold text-gray-500">
              Identify yourself to unlock higher limits
            </Text>
          </View>

          <View className="flex flex-col space-y-2">
            <LabelText text="Full Name" />
            <AppTextInput
              placeholder="James Gray"
              fieldClassName="px-5 py-3" radius={12}
            />
          </View>
          <View className="flex flex-col space-y-2">
            <LabelText text="Nickname" />
            <AppTextInput
              placeholder="Jray"
              fieldClassName="px-5 py-3" radius={12}
            />
          </View>
          <View className="flex flex-col space-y-2">
            <LabelText text="Email Address" />
            <AppTextInput
              placeholder="jamesgray122@gmail.com"
              fieldClassName="px-5 py-3" radius={12}
            />
          </View>
          <View className="flex flex-row justify-between space-x-[5%]">
            <View className="flex flex-col space-y-2 w-[45%]">
              <LabelText text="Date Of Birth" />
              <AppTextInput
                placeholder="DD/MM/YYYY"
                fieldClassName="px-5 py-3" radius={12}
              />
            </View>
            <View className="flex flex-col space-y-2 w-[45%]">
              <LabelText text="Gender" />
              <AppTextInput
                placeholder="#"
                fieldClassName="px-5 py-3" radius={12}
              />
            </View>
          </View>
          <View className="flex flex-col space-y-2">
            <LabelText text="University" />
            <AppTextInput
              placeholder="Enter your University"
              fieldClassName="px-5 py-3" radius={12}
            />
          </View>
          <View className="flex flex-col space-y-2">
            <LabelText text="Monthly Income" />
            <AppTextInput
              placeholder="₦30,000"
              fieldClassName="px-5 py-3" radius={12}
            />
          </View>
          <View className="flex flex-row income_buttons grid grid-cols-2 gap-y-4 gap-x-4">
            <View className="border border-purple-500 py-3 px-4 rounded-lg text-center">
              <Text className="text-white text-center">30,000</Text>
            </View>
            <View className="border border-purple-500 py-3 px-4 rounded-lg text-center">
              <Text className="text-white text-center">30,000</Text>
            </View>
            <View className="border border-purple-500 py-3 px-4 rounded-lg text-center">
              <Text className="text-white text-center">30,000</Text>
            </View>
            <View className="border border-purple-500 py-3 px-4 rounded-lg text-center">
              <Text className="text-white text-center">30,000</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/(pages)/onboard/four")}
        className="rounded-lg bg-purple-600 py-4 mt-4 items-center justify-center w-full"
      >
        <Text className="text-white text-[1rem] font-bold">Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
