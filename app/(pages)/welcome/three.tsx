import { View, Image, Text } from "react-native";
import "../../../global.css";
import { ArrowRight } from "lucide-react";
import { Link } from "expo-router";
import { useRouter } from "expo-router";

export default function WelcomeTwo() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#0A0320] flex flex-col items-center justify-center">
      {/* Your page content */}
      <Image
        source={require("../../../public/images/rafiki.png")}
        className="mb-[1.2rem]"
      />
      <View className="mx-auto text-center items-center px-5">
        <h1 className="text-white text-4xl text-center mb-4 font-bold">
          Track your spending and stay in control of your finances
        </h1>
        <p className="text-white text-center text-[15px] mb-14">
          AI-Powered insights to build better money saving habits
        </p>

        <button
          onClick={() => router.push("/(pages)/welcome/four")}
          className="mb-5 flex w-[100%] mx-auto py-6 rounded-2xl text-xl relative bg-purple-500 text-white"
        >
          <View className="text-center flex flex-row">
            <p>Next</p>
            <ArrowRight />
          </View>
        </button>
        {/*<Link href={"/(pages)/welcome/two"} className="text-purple-300 text-">
          I already have an account | Login
        </Link>*/}
      </View>
    </div>
  );
}
