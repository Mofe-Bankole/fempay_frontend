import { useRouter } from "expo-router";
import { useState } from "react";
import { ImageBackground, Text, View } from "react-native";

const slides = [
    {
      bgimg: require("@/assets/images/onboarding/onboarding_3.png"),
        title: "Welcome to FemPay! Your journey to financial empowerment begins here."
    },
    {
      bgimg: require("@/assets/images/onboarding/onboarding_4.png"),
        title: "Track your expenses and savings easily, all in one place."
    },
    {
      bgimg: require("@/assets/images/onboarding/onboarding_1.png"),
        title: "Set smart budgets, reach your financial goals faster."
    },
    {
        bgimg: require("@/assets/images/onboarding/onboarding_3.png"),
        title: "Stay secure with industry-leading privacy and safety."
    },
    {
        bgimg: require("@/assets/images/onboarding/onboarding_3.png"),
        title: "Ready? Let's get started and take charge together!"
    }
]

export default function Onboarding() {
    const [index, setIndex] = useState<number>(0);
    const router =  useRouter()

    return  (
      <View className="flex-1">
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-2xl font-bold">
            {slides[index].title}
          </Text>
        </View>

      </View>
    )
}