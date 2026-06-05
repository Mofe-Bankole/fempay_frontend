import { View, Image, Text } from "react-native";
import "../../../global.css";
import { ArrowRight, GraduationCap, Store } from "lucide-react";
import { Link } from "expo-router";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <div className="min-h-screen text-white bg-[#0A0320] flex flex-col items-center justify-center">
      {/* Your page content */}
      <Text className="text-2xl mb-6 text-white">How will you use Fempay?</Text>
      <View className="px-3 py-3 flex flex-row border-purple-600 border-[5px] rounded-lg items-center space-x-[15px] mb-5">
        <GraduationCap width={50} height={50} />
        <View>
          <Text className="text-2xl text-white font-bold">Student</Text>
          <p>
            Track spending, save smarter, earn XP and pay merchant on
            campus{" "}
          </p>
        </View>
        <ArrowRight
          className="cursor-pointer"
          onClick={() => router.push("/(pages)/onboard/one")}
        />
      </View>
      <View className="px-3 py-3 flex flex-row border-purple-600 border-[5px] rounded-lg items-center space-x-[15px]">
        <Store width={50} height={50} />
        <View>
          <Text className="text-2xl text-white font-bold">Merchant</Text>
          <p className="line-clamp-1">
            Accept payments, create offers, manage your shop and attract student
            on campus
          </p>
        </View>
        <ArrowRight className="cursor-pointer" />
      </View>
    </div>
  );
}
