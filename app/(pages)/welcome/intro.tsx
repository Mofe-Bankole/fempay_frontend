import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import "../../../global.css";
import { ArrowRight } from "lucide-react";
import { useRouter } from "expo-router";

export default function WelcomeIntro() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 16 }}>
      <Image
        source={require("../../../public/images/rafiki.png")}
        accessibilityLabel="Welcome to FemPay"
        resizeMode="contain"
        style={{ width: "100%", height: 273, marginBottom: 32 }}
      />
      <View className="mx-auto text-center items-center">
        <Text className="text-black text-[26px] text-center mb-4 font-bold">
          Welcome to the future of smart finance
        </Text>
        <Text className="text-black text-center text-[15px]">
          FemPay - Your campus financial companion
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/(pages)/welcome/transfers")}
        accessibilityRole="button"
        className="mt-14 w-full"
      >
        <LinearGradient colors={["#7C3AED", "#A855F7"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: 60, borderRadius: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <Text className="text-[15px] font-bold text-white">Get Started</Text>
          <ArrowRight size={18} color="white" />
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" onPress={() => Alert.alert("Login unavailable", "Account login is not connected yet.")} className="min-h-11 items-center justify-center mt-1">
        <Text className="text-black text-xs">I already have an account - <Text className="text-[#7C3AED] font-bold">Login</Text></Text>
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
