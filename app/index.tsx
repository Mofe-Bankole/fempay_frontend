import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { View } from "react-native";
import "../global.css";

export default function Index() {
  const {session} = useAuth();
  const router = useRouter();

  return (
    <View
      style={{ flex: 1, marginTop: 40, paddingHorizontal: 20 }}
    >
      { 
        (() => {
          if (session) {
            router.push("/(pages)/login");
          } else {
            router.push("/(pages)/Onboarding");
          }
          return null;
        })()
      }
    </View>
  );
}
