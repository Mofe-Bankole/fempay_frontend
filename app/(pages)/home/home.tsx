import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import {
  Send,
  QrCode,
  Phone,
  FileText,
  ArrowLeftRight,
  PiggyBank,
  MapPin,
  TrendingUp,
  Zap,
  Bell,
  User,
  ArrowUpRight,
  ChevronRight,
  BadgeCheck,
  Home,
  Tag,
  Wallet,
  Eye,
  Wifi,
} from "lucide-react";
import { useRouter } from "expo-router";
import { useTransferStore } from "../../../store/transfer";
import { useBillsStore } from "../../../store/bills";
import { useAirtimeStore } from "../../../store/airtime";
import { useDataStore } from "../../../store/data";

const { width } = Dimensions.get("window");

// ─── Colour tokens ───────────────────────────────────────────────
const C = {
  bg: "#F5F6F8",
  card: "#16161F",
  cardBorder: "#2A2A38",
  purple: "#7C5CFC",
  purpleLight: "#9B7FFF",
  purpleMuted: "rgba(124,92,252,0.15)",
  green: "#4ADE80",
  greenMuted: "rgba(74,222,128,0.15)",
  gold: "#F59E0B",
  goldMuted: "rgba(245,158,11,0.15)",
  contrast_text: "#000000",
  text: "#FFFFFF",
  textSub: "#9090A8",
  textDim: "#5A5A72",
  progressBg: "#2A2A38",
  verified: "#22C55E",
  tabActive: "#7C5CFC",
  tabInactive: "#5A5A72",
  surface: "#1C1C28",
};

// ─── Reusable atoms ──────────────────────────────────────────────

function VerifiedBadge() {
  return (
    <View style={styles.verifiedBadge}>
      <BadgeCheck size={11} color={C.verified} strokeWidth={2.5} />
      <Text style={styles.verifiedText}>Verified</Text>
    </View>
  );
}

function QuickActionButton({
  icon: Icon,
  label,
  onPress,
}: {
  icon: React.ElementType;
  label: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.quickAction}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.quickActionIcon}>
        <Icon size={20} color={C.text} strokeWidth={1.8} />
      </View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function ServiceButton({
  icon: Icon,
  label,
  iconColor,
  bgColor,
}: {
  icon: React.ElementType;
  label: string;
  iconColor: string;
  bgColor: string;
}) {
  return (
    <TouchableOpacity style={styles.serviceBtn} activeOpacity={0.75}>
      <View style={[styles.serviceBtnIcon, { backgroundColor: bgColor }]}>
        <Icon size={22} color={iconColor} strokeWidth={1.8} />
      </View>
      <Text style={styles.serviceBtnLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function XPCard({
  icon: Icon,
  iconColor,
  bgColor,
}: {
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
}) {
  return (
    <View style={styles.xpCard}>
      <View style={[styles.xpIcon, { backgroundColor: bgColor }]}>
        <Icon size={16} color={iconColor} strokeWidth={2} />
      </View>
      <Text style={styles.xpLabel}>XP Points</Text>
      <Text style={styles.xpValue}>0</Text>
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────

export default function HomeScreen() {
  const router = useRouter();
  const resetTransfer = useTransferStore((s) => s.reset);
  const resetBills = useBillsStore((s) => s.reset);
  const resetAirtime = useAirtimeStore((s) => s.reset);
  const resetData = useDataStore((s) => s.reset);
  const [activeTab, setActiveTab] = useState("Home");
  const [hiddenbalance, sethiddenBalance] = useState(false);
  const hideBalance = function () {
    sethiddenBalance(!hiddenbalance);
  };
  const tabs: { label: string; icon: any; route?: string }[] = [
    { label: "Home", icon: Home },
    { label: "Offers", icon: Tag, route: "/rewards/page" },
    { label: "Saving", icon: PiggyBank },
    { label: "Me", icon: User },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero card ── */}
        <View style={styles.hero} className="bg-[#0A0320]">
          {/* Header row */}
          <View style={styles.headerRow}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <User size={20} color={C.purpleLight} strokeWidth={1.8} />
              </View>
            </View>

            <View style={styles.greetingBlock}>
              <Text style={styles.greetingSmall}>Welcome Back</Text>
              <View style={styles.greetingRow}>
                <Text style={styles.greetingName}>Nifemi 👋</Text>
                <VerifiedBadge />
              </View>
            </View>

            <View style={styles.headerIcons}>
              <TouchableOpacity
                style={styles.headerIconBtn}
                activeOpacity={0.7}
              >
                <Bell size={20} color={C.text} strokeWidth={1.8} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerIconBtn}
                activeOpacity={0.7}
              >
                <User size={20} color={C.text} strokeWidth={1.8} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Wallet balance card */}
          <View style={styles.walletCard}>
            <View style={styles.walletCardTop}>
              <Text style={styles.walletLabel}>Wallet Balance</Text>
              <Text style={styles.walletId}>123456789</Text>
            </View>

            <View style={styles.balanceRow}>
              <Text style={styles.balanceAmount}>
                {hiddenbalance ? "*****" : "#30000"}
              </Text>
              <TouchableOpacity style={styles.eyeBtn} activeOpacity={0.7}>
                <Eye
                  size={16}
                  color={C.textSub}
                  strokeWidth={1.8}
                  onClick={() => hideBalance()}
                />
              </TouchableOpacity>
            </View>

            {/* Progress bar */}
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: "30%" }]} />
            </View>

            <View style={styles.progressMeta}>
              <Text style={styles.progressPct}>30% Spent</Text>
              <Text style={styles.progressAllowance}>#100,000 allowance</Text>
            </View>
          </View>

          {/* Quick actions */}
          <View style={styles.quickActions}>
            <QuickActionButton
              icon={Send}
              label="Send"
              onPress={() => {
                resetTransfer();
                router.push("/transfer/page" as any);
              }}
            />
            <QuickActionButton icon={QrCode} label="Pay" />
            <QuickActionButton
              icon={Phone}
              label="Airtime"
              onPress={() => {
                resetAirtime();
                router.push("/airtime/page" as any);
              }}
            />
            <QuickActionButton
              icon={Wifi}
              label="Data"
              onPress={() => {
                resetData();
                router.push("/data/page" as any);
              }}
            />
            <QuickActionButton
              icon={FileText}
              label="Bills"
              onPress={() => {
                resetBills();
                router.push("/bills/page" as any);
              }}
            />
          </View>
        </View>

        {/* ── Body ── */}
        <View style={styles.body}>
          {/* Service grid */}
          <View style={styles.serviceRow}>
            <ServiceButton
              icon={ArrowLeftRight}
              label="Transact"
              iconColor={C.purple}
              bgColor={C.purpleMuted}
            />
            <ServiceButton
              icon={PiggyBank}
              label="Savings"
              iconColor={C.green}
              bgColor={C.greenMuted}
            />
            <ServiceButton
              icon={MapPin}
              label="Merchants"
              iconColor={C.purpleLight}
              bgColor={C.purpleMuted}
            />
            <ServiceButton
              icon={TrendingUp}
              label="Insight"
              iconColor={C.gold}
              bgColor={C.goldMuted}
            />
          </View>

          {/* Spending limit nudge */}
          <TouchableOpacity style={styles.nudgeCard} activeOpacity={0.8}>
            <View style={styles.nudgeContent}>
              <Text style={styles.nudgeTitle}>Set a weekly spending limit</Text>
              <Text style={styles.nudgeSub}>
                Stay in control of your week, Tap to set yours
              </Text>
            </View>
          </TouchableOpacity>

          {/* XP cards */}
          <View style={styles.xpRow}>
            <XPCard icon={Zap} iconColor={C.purple} bgColor={C.purpleMuted} />
            <XPCard
              icon={PiggyBank}
              iconColor={C.green}
              bgColor={C.greenMuted}
            />
            <XPCard
              icon={PiggyBank}
              iconColor={C.purpleLight}
              bgColor={C.purpleMuted}
            />
          </View>

          {/* Recent activities */}
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent Activities</Text>
            <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.7}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={14} color={C.purple} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          <View style={styles.emptyCard}>
            <ArrowUpRight size={28} color={C.textDim} strokeWidth={1.5} />
            <Text style={styles.emptyTitle}>No transactions yet</Text>
            <Text style={styles.emptySub}>Start by making a transaction</Text>
          </View>
        </View>
      </ScrollView>

      {/* ── Bottom tab bar ── */}
      <View style={styles.tabBar}>
        {tabs.map(({ label, icon: Icon, route }) => {
          const active = activeTab === label;
          return (
            <TouchableOpacity
              key={label}
              style={styles.tabItem}
              onPress={() => {
                if (route) {
                  router.push(route as any);
                } else {
                  setActiveTab(label);
                }
              }}
              activeOpacity={0.75}
            >
              <Icon
                size={22}
                color={active ? C.tabActive : C.tabInactive}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: active ? C.tabActive : C.tabInactive },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },

  // ── Hero ──
  hero: {
    backgroundColor: C.bg,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarWrap: {
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: C.purpleMuted,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  greetingBlock: {
    flex: 1,
  },
  greetingSmall: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: C.textSub,
    fontWeight: "400",
    marginBottom: 2,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  greetingName: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    fontWeight: "700",
    color: C.text,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(34,197,94,0.12)",
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.25)",
  },
  verifiedText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: C.verified,
    fontWeight: "600",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 8,
  },
  headerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: C.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: C.cardBorder,
  },

  // Wallet card
  walletCard: {
    backgroundColor: C.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  walletCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  walletLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: C.textSub,
    fontWeight: "500",
  },
  walletId: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: C.textSub,
    fontWeight: "400",
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  balanceAmount: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 30,
    fontWeight: "800",
    color: C.text,
    letterSpacing: -0.5,
  },
  eyeBtn: {
    padding: 4,
  },
  progressBarBg: {
    height: 5,
    backgroundColor: C.progressBg,
    borderRadius: 99,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: C.purple,
    borderRadius: 99,
  },
  progressMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressPct: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: C.textSub,
  },
  progressAllowance: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: C.textSub,
  },

  // Quick actions
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickAction: {
    alignItems: "center",
    gap: 8,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: C.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  quickActionLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: C.textSub,
    fontWeight: "500",
  },

  // ── Body ──
  body: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 16,
  },

  // Service grid
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  serviceBtn: {
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  serviceBtnIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceBtnLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: C.textSub,
    fontWeight: "500",
  },

  // Nudge card
  nudgeCard: {
    borderWidth: 1.5,
    borderColor: C.cardBorder,
    borderStyle: "dashed",
    borderRadius: 16,
    padding: 16,
    backgroundColor: "transparent",
  },
  nudgeContent: {
    gap: 4,
  },
  nudgeTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    fontWeight: "700",
    color: C.contrast_text,
  },
  nudgeSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: C.textSub,
    lineHeight: 18,
  },

  // XP cards
  xpRow: {
    flexDirection: "row",
    gap: 10,
  },
  xpCard: {
    flex: 1,
    backgroundColor: C.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: C.cardBorder,
    gap: 6,
  },
  xpIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  xpLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: C.textSub,
    fontWeight: "500",
  },
  xpValue: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 20,
    fontWeight: "800",
    color: C.text,
  },

  // Recent activities
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  recentTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    fontWeight: "700",
    color: C.contrast_text,
  },
  viewAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  viewAllText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: C.purple,
    fontWeight: "600",
  },

  // Empty state
  emptyCard: {
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 36,
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  emptyTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
    color: C.textSub,
  },
  emptySub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: C.textDim,
  },

  // ── Tab bar ──
  tabBar: {
    flexDirection: "row",
    backgroundColor: C.card,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: C.cardBorder,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
  },
  tabLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    fontWeight: "600",
  },
});
