import { View, Image, Text } from "react-native";
import "../../global.css";
import { ArrowRight } from "lucide-react";
import { Link, useRouter } from "expo-router";

export default function WelcomeOne() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0A0320] flex flex-col items-center justify-center">
      {/* Your page content */}
      <Image
        source={require("../../public/images/rafiki.png")}
        className="mb-[1.2rem]"
      />
      <View className="mx-auto text-center items-center px-5">
        <h1 className="text-white text-4xl text-center mb-4 font-bold">
          Welcome to the Future of Smart Finance{" "}
        </h1>
        <p className="text-white text-center text-[15px] mb-14">
          FemPay - Your campus financial companion
        </p>

        <button
          onClick={() => router.push("/(pages)/welcome/two")}
          className="mb-5 w-full py-6 rounded-2xl text-xl bg-purple-500 text-white"
        >
          <View className="flex flex-row w-1/2 mx-auto">
            <p>Get Started</p>
            <ArrowRight />
          </View>
        </button>
      </View>
      <Link href={"/(pages)/welcome/two"} className="text-purple-300 text-">
        I already have an account | Login
      </Link>
    </div>
  );
}
