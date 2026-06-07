import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator, View, Text } from "react-native";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

(Text as any).defaultProps = {
  ...((Text as any).defaultProps || {}),
  style: [{ fontFamily: "Inter_400Regular" }, (Text as any).defaultProps?.style].flat(),
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Saira-Medium": require("../assets/fonts/Saira-Medium.ttf"),
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
