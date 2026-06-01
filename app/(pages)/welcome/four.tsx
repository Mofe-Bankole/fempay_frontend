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
          Your money is protected with bank-level security
        </h1>
        <p className="text-white text-center text-[15px] mb-14">
          256 - bits encryption , biometrics login and fraud protection
        </p>

        <button
          onClick={() => router.push("/(pages)/home/home")}
          className="mb-5 w-full py-6 rounded-2xl bg-purple-500 flex items-center justify-center"
        >
          <View className="flex-row items-center justify-center gap-2">
            <Text className="text-xl text-white">Create Account</Text>
            <ArrowRight color="white" />
          </View>
        </button>
        {/*<Link href={"/(pages)/welcome/two"} className="text-purple-300 text-">
          I already have an account | Login
        </Link>*/}
      </View>
    </div>
  );
}
