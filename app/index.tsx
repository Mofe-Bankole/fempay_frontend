import Header from "@/components/ui/Header";
import { Text, View } from "react-native";
import "../global.css";

export default function Index() {
  return (
    <View
    className="mt-10 px-5"
    >
      <Header/>
      <Text className="text-black">Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
