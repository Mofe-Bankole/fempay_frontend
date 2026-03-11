import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import "../global.css";


export default function Index() {
  const [currentstep, setCurrentStep] = useState(1);
  const router = useRouter();
  function increateStep() {
    setCurrentStep((c) => c + 1);
  }
  return currentstep === 1 ? (
    <View className="px-2 py-3 relative items-center flex flex-col min-h-full">
      <View className="text-center mt-16">
        <h1 className="text-2xl bold text-foreground z-20">
          Welcome to Fempay
        </h1>
      </View>
      <View style={{ position: "absolute", left: -40, top: 10 }}>
        <div className="absolute bg-[#ECC850] w-56 h-56 rounded-full content-none opacity-100 z-10"></div>
      </View>
      <View style={{ position: "absolute", left: -40, top: 550 }}>
        <div className="absolute bg-[#D163CC] w-80 h-80 rounded-full content-none opacity-90 stroke-slate-50"></div>
      </View>
      <View style={{ position: "absolute", right: 90, top: 160 }}>
        <div className="absolute bg-[#c031c0] w-8 h-8 rounded-full content-none opacity-90 stroke-slate-50"></div>
      </View>
      <View style={{ position: "absolute", right: 90, top: 690 }}>
        <div className="absolute bg-[#55BFBD] w-36 h-36 rounded-full content-none opacity-90 stroke-slate-50"></div>
      </View>
      <View className="flex items-center justify-center mt-20 mb-6">
        <Image
          source={require("../assets/images/fempay/wallet/cuate.png")}
          alt="Wallet"
          className="w-80 h-80 object-contain"
        />
      </View>
      <View className="absolute bottom-36 text-center px-24 space-y-5">
        <h3 className="text-xl font-bold">"Smart Money , Smart Life"</h3>
        <p className="">
          "Fempay helps to manage spending , earn rewards and make every naira
          count"
        </p>
      </View>
      <View className="absolute bottom-8 ml-auto mr-auto w-[85%] text-center left-0 right-0 get_started_btn rounded-lg bg-[#7065DF] px-28 text-xl py-3 text-white cursor-pointer stroke-black">
        <span
          onClick={() => {
            router.push("/(pages)/Onboarding");
          }}
        >
          Get Started
        </span>
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
