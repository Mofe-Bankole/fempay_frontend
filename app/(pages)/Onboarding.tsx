import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import "../../global.css";

export default function Index() {
  const [currentstep, setCurrentStep] = useState(1);
  const router = useRouter();
  function increateStep() {
    setCurrentStep((c) => c + 1);
  }
  return currentstep === 1 ? (
    <View className="px-2 py-3 relative items-center flex flex-col min-h-full">
      <View className="absolute bottom-8 ml-auto mr-auto w-[85%] text-center left-0 right-0 get_started_btn rounded-lg bg-[#2518b8] px-28 text-xl py-3 text-white cursor-pointer stroke-black">
        <span
          onClick={() => {
            router.push("/(pages)/Onboarding");
          }}
        >
          Previous
        </span>
      </View>
      <View className="text-center mt-16">
        <h1 className="text-2xl bold z-20">Welcome to Fempay</h1>
      </View>
    </View>
  ) : currentstep === 2 ? (
    <View className="px-2 py-3 relative items-center flex flex-col min-h-full">
      <View className="text-center mt-16">
        <h1 className="text-2xl bold text-foreground">Welcome to Fempa</h1>
      </View>
      <View style={{ position: "absolute", left: -40, top: 190 }}>
        <div className="absolute bg-[#ECC850] w-56 h-56 rounded-full content-none"></div>
      </View>
      <View className="absolute bottom-8 ml-auto mr-auto w-fit left-0 right-0 get_started_btn rounded-sm bg-purple-500 px-28 text-xl py-3 text-white cursor-pointer">
        Get Started 222
      </View>
    </View>
  ) : (
    ""
  );
}
