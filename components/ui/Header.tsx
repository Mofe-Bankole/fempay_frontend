import { useAuth } from "@/context/AuthContext";
import { Bell, Settings } from "lucide-react";
import { Text, View } from "react-native";

export default function Header() {
  const { session } = useAuth();
  const username =
    session?.user?.name ||
    session?.user?.username ||
    session?.user?.email ||
    "User";

  return (

    <View className="mb-3 flex-row items-center justify-between flex-1">
      <Text className="text-2xl">Hi {username}</Text>
      <View className="flex-row space-x-4">
        <Bell />
        <Settings />
      </View>
    </View>
  );
}