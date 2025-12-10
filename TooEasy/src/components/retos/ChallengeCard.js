import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ChallengeCard({ challenge }) {
  const progress = Math.round(challenge.progress || 0);
  const tierColor = {
    BRONCE: "#CD7F32",
    PLATA: "#C0C0C0",
    ORO: "#FFD700",
    LEGENDARIO: "#B19CD9",
  }[challenge.tier || "BRONCE"];

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{challenge.name}</Text>
        <View style={[styles.tierBadge, { backgroundColor: tierColor }]}>
          <Text style={styles.tierText}>{challenge.tier}</Text>
        </View>
      </View>

      <Text style={styles.desc}>{challenge.description}</Text>

      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.progressLabel}>{progress}%</Text>
        <View style={styles.rewardBadge}>
          <Text style={styles.trunkIcon}>
            {challenge.reward_type === "TRONCOS" ? "🪵" : "🎨"}
          </Text>
          <Text style={styles.rewardText}>
            {challenge.reward_type === "TRONCOS"
              ? challenge.reward_trunks
              : "Skin"}
          </Text>
        </View>
        <Text style={styles.state}>
          {challenge.state === "COMPLETED"
            ? challenge.reward_granted
              ? "Recompensa aplicada"
              : "Completado"
            : "En progreso"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E0E1DD",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontWeight: "bold", fontSize: 14 },
  tierBadge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tierText: { fontSize: 10, fontWeight: "bold", color: "#1B263B" },
  desc: { fontSize: 12, marginVertical: 4 },
  progressBg: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    backgroundColor: "#B0B5C2",
    overflow: "hidden",
    marginTop: 4,
  },
  progressFill: { height: "100%", backgroundColor: "#1B263B" },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    justifyContent: "space-between",
  },
  progressLabel: { fontSize: 12, fontWeight: "700", color: "#4A4A4A" },
  rewardBadge: { flexDirection: "row", alignItems: "center" },
  trunkIcon: { fontSize: 16, marginRight: 4 },
  rewardText: { fontSize: 12 },
  state: { fontSize: 11, fontStyle: "italic", color: "#4A4A4A" },
});
