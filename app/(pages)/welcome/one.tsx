import { View } from "react-native";
import "../../../global.css";
import { Image } from "react-native";

export default function WelcomeOne() {
  return (
    <div className="min-h-screen bg-[#0A0320] flex flex-col items-center justify-center">
      {/* Your page content */}
      <Image
        source={require("../../../public/images/rafiki.png")}
        className="mb-[1.2rem]"
      />
      <View className="mx-auto text-center items-center">
        <h1 className="text-white text-4xl text-center mb-4 font-bold">
          Welcome to the Future of Smart Finance{" "}
        </h1>
        <p className="text-white text-center text-lg">
          FemPay - Your campus financial companion
        </p>
      </View>
    </div>
  );
}
