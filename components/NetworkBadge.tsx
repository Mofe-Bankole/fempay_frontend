import React from "react";
import { View, Text } from "react-native";
import type { NetworkId } from "../constants/networks";

// Brand palette. No official SVG assets are bundled, so each network is
// represented by a consistent colored disc + wordmark that reads clearly at
// any size (grid cards, confirm sheet rows, receipts).
const BRAND: Record<NetworkId, { bg: string; fg: string }> = {
  mtn: { bg: "#FFC403", fg: "#0A0A0A" },
  airtel: { bg: "#ED1C24", fg: "#FFFFFF" },
  glo: { bg: "#00A651", fg: "#FFFFFF" },
  "9mobile": { bg: "#006F45", fg: "#FFFFFF" },
};

export function NetworkBadge({
  id,
  size = 56,
}: {
  id: NetworkId;
  size?: number;
}) {
  const brand = BRAND[id];

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        backgroundColor: brand.bg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {id === "9mobile" ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              color: brand.fg,
              fontWeight: "900",
              fontSize: size * 0.42,
              lineHeight: size * 0.44,
            }}
          >
            9
          </Text>
          <Text
            style={{
              color: brand.fg,
              fontWeight: "700",
              fontSize: size * 0.16,
              marginTop: -size * 0.02,
            }}
          >
            mobile
          </Text>
        </View>
      ) : (
        <Text
          style={{
            color: brand.fg,
            fontWeight: "800",
            fontSize: id === "airtel" ? size * 0.24 : size * 0.3,
            letterSpacing: 0.3,
          }}
        >
          {id === "mtn" ? "MTN" : id === "glo" ? "glo" : "airtel"}
        </Text>
      )}
    </View>
  );
}
