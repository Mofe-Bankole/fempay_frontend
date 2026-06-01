import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Saira-Medium": require("../assets/fonts/Saira-Medium.ttf"),
  });

  useEffect(() => {
    // Additional logic if you want to do something once fonts are loaded
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center"  }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
