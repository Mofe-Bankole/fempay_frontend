import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EyeOff } from "lucide-react";
import { useTransferStore } from "../../../store/transfer";
import { useBillsStore } from "../../../store/bills";
import { useAirtimeStore } from "../../../store/airtime";

// Figma Home, node 1883:48. Assets are local exports, not temporary Figma URLs.
const ICONS = {
  student: require("../../../assets/images/home/student.svg"),
  profile: require("../../../assets/images/home/profile.svg"),
  bell: require("../../../assets/images/home/bell.svg"),
  verified: require("../../../assets/images/home/verified.svg"),
  copy: require("../../../assets/images/home/copy.svg"),
  eye: require("../../../assets/images/home/eye.svg"),
  send: require("../../../assets/images/home/send.svg"),
  pay: require("../../../assets/images/home/qr-pay.svg"),
  airtime: require("../../../assets/images/home/airtime.svg"),
  bills: require("../../../assets/images/home/bills.svg"),
  transact: require("../../../assets/images/home/transact.svg"),
  savings: require("../../../assets/images/home/savings.svg"),
  merchants: require("../../../assets/images/home/merchants.svg"),
  insight: require("../../../assets/images/home/insight.svg"),
  xp: require("../../../assets/images/home/xp.svg"),
  xpWallet: require("../../../assets/images/home/xp-wallet.svg"),
  xpSavings: require("../../../assets/images/home/xp-savings.svg"),
  activity: require("../../../assets/images/home/empty-activity.svg"),
  arrow: require("../../../assets/images/home/arrow-right.svg"),
  home: require("../../../assets/images/home/tab-home.svg"),
  offers: require("../../../assets/images/home/tab-offers.svg"),
  saving: require("../../../assets/images/home/tab-savings.svg"),
  me: require("../../../assets/images/home/tab-profile.svg"),
};
type IconName = keyof typeof ICONS;

const C = {
  bg: "#F5F6F8",
  hero: "#0A0320",
  white: "#FFFFFF",
  black: "#000000",
  muted: "#808080",
  border: "rgba(0,0,0,0.2)",
  purple: "#A855F7",
  purpleMuted: "rgba(168,85,247,0.2)",
  greenMuted: "rgba(34,197,94,0.2)",
  blueMuted: "rgba(39,39,255,0.2)",
  goldMuted: "rgba(255,199,39,0.2)",
  translucentWhite: "rgba(255,255,255,0.1)",
};
const ACCOUNT_NUMBER = "123456789";

function HomeIcon({
  name,
  size,
  width = size,
}: {
  name: IconName;
  size: number;
  width?: number;
}) {
  return (
    <Image
      source={ICONS[name]}
      style={{ width, height: size }}
      contentFit="contain"
      accessible={false}
    />
  );
}

function QuickAction({
  icon,
  label,
  onPress,
  offset = 0,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
  offset?: number;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[styles.quickAction, { transform: [{ translateX: offset }] }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.quickActionIcon}>
        <HomeIcon name={icon} size={31} />
      </View>
      <Text
        style={[
          styles.quickActionLabel,
          icon === "send" && { transform: [{ translateX: -3 }] },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function ServiceButton({
  icon,
  label,
  backgroundColor,
  onPress,
  offset = 0,
}: {
  icon: IconName;
  label: string;
  backgroundColor: string;
  onPress: () => void;
  offset?: number;
}) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[styles.serviceButton, { transform: [{ translateX: offset }] }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[styles.serviceIcon, { backgroundColor }]}>
        <HomeIcon name={icon} size={30} />
      </View>
      <Text style={styles.serviceLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function XPCard({
  icon,
  backgroundColor,
}: {
  icon: IconName;
  backgroundColor: string;
}) {
  return (
    <View style={styles.xpCard}>
      <View style={[styles.xpIcon, { backgroundColor }]}>
        <HomeIcon name={icon} size={18} />
      </View>
      <Text style={styles.xpLabel}>XP Points</Text>
      <Text style={styles.xpValue}>0</Text>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const resetTransfer = useTransferStore((state) => state.reset);
  const resetBills = useBillsStore((state) => state.reset);
  const resetAirtime = useAirtimeStore((state) => state.reset);
  const [balanceHidden, setBalanceHidden] = useState(false);
  const [accountCopied, setAccountCopied] = useState(false);

  // The web preview reserves the design's status-bar space; native uses real insets.
  const topInset =
    Platform.OS === "web" ? Math.max(insets.top, 47) : insets.top;

  useEffect(() => {
    if (!accountCopied) return;
    const timer = setTimeout(() => setAccountCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [accountCopied]);

  const unavailable = (feature: string) =>
    Alert.alert(feature, "This feature is not available yet.");
  const openTransfer = () => {
    resetTransfer();
    router.push("/transfer/page");
  };
  const copyAccount = async () => {
    try {
      const copied = await Clipboard.setStringAsync(ACCOUNT_NUMBER);
      if (!copied) throw new Error("Clipboard unavailable");
      setAccountCopied(true);
    } catch {
      Alert.alert(
        "Unable to copy",
        "Please select and copy the account number instead.",
      );
    }
  };
  const tabs: {
    label: string;
    icon: IconName;
    offset: number;
    onPress: () => void;
  }[] = [
    { label: "Home", icon: "home", offset: -0.25, onPress: () => {} },
    {
      label: "Offers",
      icon: "offers",
      offset: -1.75,
      onPress: () => router.push("/rewards/page"),
    },
    {
      label: "Saving",
      icon: "saving",
      offset: -0.25,
      onPress: () => unavailable("Savings"),
    },
    {
      label: "Me",
      icon: "me",
      offset: 5.25,
      onPress: () => unavailable("My Profile"),
    },
  ];

  return (
    <View style={styles.page}>
      <StatusBar barStyle="light-content" backgroundColor={C.hero} />
      <View style={styles.screen}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={[styles.hero, { paddingTop: topInset + 16 }]}>
            <View style={styles.headerRow}>
              <View style={styles.avatar}>
                <HomeIcon name="student" size={32} />
              </View>
              <View style={styles.greetingBlock}>
                <Text style={styles.greetingSmall}>Welcome Back</Text>
                <View style={styles.greetingRow}>
                  <Text style={styles.greetingName}>Nifemi 👋</Text>
                  <View style={styles.verifiedBadge}>
                    <HomeIcon name="verified" size={11} width={10} />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                </View>
              </View>
              <View style={styles.headerIcons}>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel="Notifications, unread updates"
                  style={styles.headerButton}
                  onPress={() => unavailable("Notifications")}
                >
                  <HomeIcon name="bell" size={28} />
                  <View style={styles.notificationDot} />
                </TouchableOpacity>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityLabel="My Profile"
                  style={styles.headerButton}
                  onPress={() => unavailable("My Profile")}
                >
                  <HomeIcon name="profile" size={28} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.walletCard}>
              <Text style={styles.walletLabel}>Wallet Balance</Text>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Copy account number"
                accessibilityHint={ACCOUNT_NUMBER}
                onPress={copyAccount}
                style={styles.accountButton}
              >
                <HomeIcon name="copy" size={15} />
                <Text selectable style={styles.walletId}>
                  {ACCOUNT_NUMBER}
                </Text>
              </TouchableOpacity>
              <Text style={styles.balanceAmount}>
                {balanceHidden ? "*****" : "#100,000"}
              </Text>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={
                  balanceHidden ? "Show balance" : "Hide balance"
                }
                onPress={() => setBalanceHidden((hidden) => !hidden)}
                style={styles.eyeButton}
              >
                {balanceHidden ? (
                  <EyeOff size={12} color="white" />
                ) : (
                  <HomeIcon name="eye" size={12} />
                )}
              </TouchableOpacity>
              <View
                style={styles.progressTrack}
                accessibilityRole="progressbar"
                accessibilityLabel="Allowance spent"
                accessibilityValue={{ min: 0, max: 100, now: 0 }}
              />
              <Text style={styles.progressPercent}>0% Spent</Text>
              <Text style={styles.progressAllowance}>#100,000 allowance</Text>
            </View>

            <View style={styles.quickActions}>
              <QuickAction icon="send" label="Send" onPress={openTransfer} />
              <QuickAction
                icon="pay"
                label="Pay"
                offset={3}
                onPress={() => unavailable("QR Pay")}
              />
              <QuickAction
                icon="airtime"
                label="Airtime"
                offset={-1}
                onPress={() => {
                  resetAirtime();
                  router.push("/airtime/page");
                }}
              />
              <QuickAction
                icon="bills"
                label="Bills"
                offset={-2}
                onPress={() => {
                  resetBills();
                  router.push("/bills/page");
                }}
              />
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.serviceRow}>
              <ServiceButton
                icon="transact"
                label="Transact"
                backgroundColor={C.purpleMuted}
                onPress={openTransfer}
              />
              <ServiceButton
                icon="savings"
                label="Savings"
                offset={5}
                backgroundColor={C.greenMuted}
                onPress={() => unavailable("Savings")}
              />
              <ServiceButton
                icon="merchants"
                label="Merchants"
                offset={3}
                backgroundColor={C.blueMuted}
                onPress={() => unavailable("Campus Merchants")}
              />
              <ServiceButton
                icon="insight"
                label="Insight"
                backgroundColor={C.goldMuted}
                onPress={() => router.push("/insight/page")}
              />
            </View>

            <TouchableOpacity
              accessibilityRole="button"
              style={styles.nudgeCard}
              activeOpacity={0.8}
              onPress={() => router.push("/insight/page")}
            >
              <Text style={styles.nudgeTitle}>Set a weekly spending limit</Text>
              <Text style={styles.nudgeSubtitle}>
                Stay in control of your week, Tap to set yours
              </Text>
            </TouchableOpacity>

            <View style={styles.xpRow}>
              <XPCard icon="xp" backgroundColor={C.purpleMuted} />
              <XPCard icon="xpWallet" backgroundColor={C.greenMuted} />
              <XPCard icon="xpSavings" backgroundColor={C.blueMuted} />
            </View>

            <View style={styles.recentHeader}>
              <Text style={styles.recentTitle}>Recent Activities</Text>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="View all transactions"
                onPress={() => unavailable("Transaction history")}
                style={styles.viewAllButton}
              >
                <Text style={styles.viewAllText}>View All</Text>
                <HomeIcon name="arrow" size={22} />
              </TouchableOpacity>
            </View>
            <View style={styles.emptyCard}>
              <HomeIcon name="activity" size={30} />
              <Text style={styles.emptyTitle}>No transactions yet</Text>
              <Text style={styles.emptySubtitle}>
                Start by making a transaction
              </Text>
            </View>
          </View>
        </ScrollView>

        <View
          style={[
            styles.tabBar,
            { paddingBottom: Math.max(22, insets.bottom) },
          ]}
          accessibilityRole="tablist"
        >
          {tabs.map(({ label, icon, offset, onPress }) => (
            <TouchableOpacity
              key={label}
              accessibilityRole="tab"
              accessibilityLabel={label}
              accessibilityState={{ selected: label === "Home" }}
              style={[styles.tabItem, { transform: [{ translateX: offset }] }]}
              onPress={onPress}
              activeOpacity={0.75}
            >
              <HomeIcon name={icon} size={30} />
              <Text
                style={[
                  styles.tabLabel,
                  label === "Home" && styles.activeTabLabel,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {accountCopied && (
          <View
            pointerEvents="none"
            style={[styles.copyToast, { top: topInset + 4 }]}
          >
            <Text
              accessibilityRole="alert"
              accessibilityLiveRegion="polite"
              style={styles.copyToastText}
            >
              Account number copied
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

// Fixed card/icon dimensions come from the 390 × 983 Figma frame. Rows stretch
// horizontally and the body scrolls on shorter phones; native safe areas stay real.
// Small row offsets preserve the source frame's deliberately uneven icon alignment.
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: C.bg },
  screen: {
    flex: 1,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    backgroundColor: C.bg,
  },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  hero: {
    backgroundColor: C.hero,
    paddingHorizontal: 16,
    paddingBottom: 36,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 21,
  },
  avatar: {
    width: 50,
    height: 48,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  greetingBlock: { flex: 1, paddingTop: 6, alignSelf: "stretch" },
  greetingSmall: {
    fontFamily: "Inter_300Light",
    fontSize: 12,
    lineHeight: 15,
    color: C.white,
    marginBottom: 6,
  },
  greetingRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 5,
    rowGap: 2,
  },
  greetingName: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    lineHeight: 19,
    color: C.white,
  },
  verifiedBadge: {
    width: 64,
    height: 13,
    borderRadius: 30,
    backgroundColor: "rgba(34,197,94,0.4)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  verifiedText: {
    fontFamily: "Inter_300Light",
    fontSize: 10,
    lineHeight: 12,
    color: C.white,
  },
  headerIcons: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: -8,
    marginRight: -5,
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationDot: {
    position: "absolute",
    width: 13,
    height: 12,
    borderRadius: 100,
    backgroundColor: "#F00C0C",
    top: 6,
    right: 9,
  },
  walletCard: {
    height: 129,
    marginLeft: -1,
    backgroundColor: C.translucentWhite,
    borderRadius: 25,
    marginBottom: 19,
  },
  walletLabel: {
    position: "absolute",
    top: 15,
    left: 18,
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    lineHeight: 12,
    color: C.white,
    opacity: 0.6,
  },
  accountButton: {
    position: "absolute",
    top: 2.5,
    right: 18,
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  walletId: {
    width: 66,
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    lineHeight: 15,
    color: C.white,
  },
  balanceAmount: {
    position: "absolute",
    top: 37,
    left: 18,
    fontFamily: "Inter_800ExtraBold",
    fontSize: 25,
    lineHeight: 30,
    color: C.white,
  },
  eyeButton: {
    position: "absolute",
    top: 32,
    left: 132,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  progressTrack: {
    position: "absolute",
    top: 88,
    left: 17,
    right: 17,
    height: 9,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.2)",
    opacity: 0.45,
  },
  progressPercent: {
    position: "absolute",
    top: 103,
    left: 18,
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    lineHeight: 12,
    color: C.white,
    opacity: 0.6,
  },
  progressAllowance: {
    position: "absolute",
    top: 106,
    right: 18,
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    lineHeight: 12,
    color: C.white,
    opacity: 0.6,
  },
  quickActions: { flexDirection: "row", justifyContent: "space-between" },
  quickAction: { width: 69, alignItems: "center", gap: 5 },
  quickActionIcon: {
    width: 59,
    height: 53,
    borderRadius: 20,
    backgroundColor: C.translucentWhite,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    lineHeight: 15,
    color: C.white,
  },
  body: { paddingHorizontal: 16, paddingTop: 17, paddingBottom: 53 },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  serviceButton: { width: 58, alignItems: "center", gap: 3 },
  serviceIcon: {
    width: 58,
    height: 52,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceLabel: {
    fontFamily: "Inter_300Light",
    fontSize: 12,
    lineHeight: 15,
    color: C.black,
  },
  nudgeCard: {
    minHeight: 71,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.4)",
    borderStyle: "dashed",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: C.white,
    marginBottom: 12,
  },
  nudgeTitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    lineHeight: 16,
    color: C.black,
    marginBottom: 6,
  },
  nudgeSubtitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    lineHeight: 16,
    color: C.muted,
  },
  xpRow: { flexDirection: "row", gap: 9, marginBottom: 10 },
  xpCard: {
    flex: 1,
    height: 103,
    backgroundColor: C.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 11,
    paddingTop: 9,
  },
  xpIcon: {
    width: 31,
    height: 28,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },
  xpLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    lineHeight: 15,
    color: C.muted,
    marginBottom: 8,
  },
  xpValue: {
    fontFamily: "Inter_500Medium",
    fontSize: 18,
    lineHeight: 22,
    color: C.black,
  },
  recentHeader: {
    minHeight: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 9,
  },
  recentTitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    lineHeight: 18,
    color: C.black,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    minHeight: 40,
    marginVertical: -9,
    marginRight: 2,
  },
  viewAllText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    lineHeight: 17,
    color: C.purple,
  },
  emptyCard: {
    height: 124,
    backgroundColor: C.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    paddingTop: 28,
    alignItems: "center",
  },
  emptyTitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    lineHeight: 17,
    color: C.muted,
  },
  emptySubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 16,
    color: C.muted,
    marginTop: 3,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: C.white,
    paddingTop: 18,
    paddingHorizontal: 6,
  },
  tabItem: { flex: 1, alignItems: "center" },
  tabLabel: {
    fontFamily: "Inter_300Light",
    fontSize: 12,
    lineHeight: 17,
    color: C.black,
  },
  activeTabLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: C.purple,
  },
  copyToast: {
    position: "absolute",
    alignSelf: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: C.white,
  },
  copyToastText: { fontFamily: "Inter_500Medium", fontSize: 12, color: C.hero },
});
