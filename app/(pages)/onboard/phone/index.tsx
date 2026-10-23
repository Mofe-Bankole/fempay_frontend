import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Phone } from "lucide-react";
import { useRouter } from "expo-router";
import "../../../../global.css";

export default function OnboardPhone() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const normalizedPhone = phone.replace(/^0/, "");
  const validPhone = /^[789]\d{9}$/.test(normalizedPhone);
  const canVerify = validPhone && /^\d{4}$/.test(otp);
  const unavailable = () => Alert.alert("Verification unavailable", "SMS verification is not connected yet. No code has been sent and your phone has not been verified.");

  return (
    <SafeAreaView className="flex-1 bg-[#0A0320]">
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
          <View className="flex-row items-center gap-3 mb-8">
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} className="w-11 h-11 items-center justify-center">
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-white text-base">Student - Step 1 of 5</Text>
              <View className="h-1.5 bg-white/20 rounded-full mt-3"><View className="w-[20%] h-full bg-[#7C3AED] rounded-full" /></View>
            </View>
          </View>
          <View className="bg-[#7C3AED]/30 w-16 h-16 items-center justify-center rounded-[20px] mb-5"><Phone size={40} color="#7C3AED" /></View>
          <Text className="text-white text-xl font-bold mb-2">Phone Number</Text>
          <Text className="text-white/60 text-sm mb-7">We&apos;ll send you a verification code</Text>
          <Text className="text-white text-sm font-bold mb-3">Mobile Number</Text>
          <View className="flex-row gap-3 mb-3">
            <View className="border border-[#7C3AED] rounded-2xl h-14 px-3 items-center justify-center"><Text className="text-white/60 text-sm">NG +234</Text></View>
            <TextInput accessibilityLabel="Mobile Number" value={phone} onChangeText={(value) => setPhone(value.replace(/\D/g, ""))} placeholder="801 000 0000" placeholderTextColor="#9993AB" keyboardType="phone-pad" autoComplete="tel-national" maxLength={11} className="flex-1 border border-[#7C3AED] rounded-2xl h-14 px-4 text-white text-sm" />
          </View>
          <Text className="text-white text-sm font-bold mb-3">Enter OTP</Text>
          <TextInput accessibilityLabel="Enter OTP" value={otp} onChangeText={(value) => setOtp(value.replace(/\D/g, ""))} placeholder="*  *  *  *" placeholderTextColor="#9993AB" keyboardType="number-pad" autoComplete="sms-otp" textContentType="oneTimeCode" maxLength={4} className="border border-[#7C3AED] rounded-2xl h-14 px-4 text-white text-center text-sm" />
          <TouchableOpacity accessibilityRole="button" disabled={!validPhone} onPress={unavailable} style={{ opacity: validPhone ? 1 : 0.5 }} className="min-h-11 justify-center self-start"><Text className="text-[#A855F7] text-[15px] font-bold">Resend OTP</Text></TouchableOpacity>
          <Text className="text-white/60 text-xs mt-3">Design preview: SMS verification is not connected.</Text>
          <View className="flex-1 min-h-12" />
          <TouchableOpacity accessibilityRole="button" disabled={!canVerify} onPress={unavailable} style={{ opacity: canVerify ? 1 : 0.5 }}>
            <LinearGradient colors={["#7C3AED", "#A855F7"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: 60, borderRadius: 20, alignItems: "center", justifyContent: "center" }}><Text className="text-white text-[15px] font-bold">Verify and continue</Text></LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button" onPress={() => router.push("/(pages)/onboard/identity-verification")} className="min-h-11 items-center justify-center"><Text className="text-white/60 text-xs">Preview next screen (without verification)</Text></TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
