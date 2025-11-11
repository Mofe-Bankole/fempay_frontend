import Header from "@/components/ui/Header";
import { View } from "react-native";
import "../global.css";


export default function Index() {
  return (
    <View
      style={{ flex: 1, marginTop: 40, paddingHorizontal: 20 }}
    >
      <Header/>
    </View>
  );
}
