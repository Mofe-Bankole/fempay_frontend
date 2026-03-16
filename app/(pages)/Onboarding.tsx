import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
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
    <LinearGradient
      className="relative"
      colors={[
        "#66BFB2",
        "#64BFB3",
        "#74BFA7",
        "#8BBE96",
        "#9ABF8D",
        "#B0BF7E",
        "#C7BF6E",
        "#E3BE5A",
      ]}
      locations={[0, 0.1, 0.22, 0.36, 0.48, 0.64, 0.79, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className="flex-1 w-full h-full px-2 py-3 relative items-center flex flex-col min-h-full">
        <View className="flex flex-row justify-between items-center w-[93%] mt-4">
          <span className="rounded-full bg-black text-white px-4 py-3 glass-card">
            Previous
          </span>
          <span className="rounded-full bg-black text-white px-4 py-3 glass-card">
            Next
          </span>
        </View>
        <View className="flex items-center justify-center mt-10 mb-1">
          <Image
            source={require("../../assets/images/fempay/wallet/cuate.png")}
            style={{ width: 320, height: 320, resizeMode: "contain" }}
            accessibilityLabel="Wallet"
          />
        </View>
        <View className="absolute bottom-32 text-white space-y-4 text-center px-14 w-[60%]">
          <h1 className="text-sm text-foreground">You can</h1>
          <h1 className="text-2xl">Control your Spending</h1>
          <h1>
            Track every expense automatically and see where your income goes
          </h1>
        </View>
        <View className="absolute bottom-8 ml-auto w-[85%] mr-auto left-0 right-0 get_started_btn rounded-full px-2 text-xl py-3 text-white cursor-pointer stroke-black">
          <div
            className="w-14 h-14 text-right ml-auto bg-yellow-300 rounded-full flex items-center justify-center"
            onClick={() => {
              setCurrentStep((c) => c + 1);
            }}
          >
            <p>Next</p>
          </div>
        </View>
      </View>
    </LinearGradient>
  ) : currentstep === 2 ? (
    <LinearGradient
      className="relative"
      colors={[
        "#66BFB2",
        "#64BFB3",
        "#74BFA7",
        "#8BBE96",
        "#9ABF8D",
        "#B0BF7E",
        "#C7BF6E",
        "#E3BE5A",
      ]}
      locations={[0, 0.1, 0.22, 0.36, 0.48, 0.64, 0.79, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className="flex-1 w-full h-full px-2 py-3 relative items-center flex flex-col min-h-full">
        <View className="flex flex-row justify-between items-center w-[93%] mt-4">
          <span className="rounded-full bg-black text-white px-4 py-3 glass-card">
            Previous
          </span>
          <span className="rounded-full bg-black text-white px-4 py-3 glass-card">
            Next
          </span>
        </View>
        <View className="flex items-center justify-center mt-10 mb-1">
          <Image
            source={require("../../assets/images/fempay/gift/amico.png")}
            style={{ width: 320, height: 320, resizeMode: "contain" }}
            accessibilityLabel="Wallet"
          />
        </View>
        <View className="absolute bottom-32 text-white space-y-4 text-center px-14 w-[60%]">
          <h1 className="text-sm text-foreground">You can</h1>
          <h1 className="text-2xl">Earn Rewards Instantly</h1>
        </View>
        <View className="absolute bottom-8 ml-auto w-[85%] mr-auto left-0 right-0 get_started_btn rounded-full px-2 text-xl py-3 text-white cursor-pointer stroke-black">
          <div
            className="w-14 h-14 text-right ml-auto bg-yellow-300 rounded-full flex items-center justify-center"
            onClick={() => {
              setCurrentStep(2);
            }}
          >
            <p>Next</p>
          </div>
        </View>
      </View>
    </LinearGradient>
  ) : currentstep === 3 ? (
    ""
  ) : currentstep === 4 ? () : ("");
}
