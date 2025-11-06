import Header from "@/components/ui/Header";
import { Text, View } from "react-native";
import "../global.css";

export default function Index() {
  return (
    <View
    className="w-[95%] mx-auto items-center justify-center mt-5"
    >
      <Header/>
      <Text className="text-green-100">Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
