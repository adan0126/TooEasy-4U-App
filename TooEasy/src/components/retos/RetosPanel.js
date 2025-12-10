import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ChallengeCard from "./ChallengeCard";

export default function RetosPanel({ challenges, onClose }) {
  const totalTrunks = challenges.reduce(
    (acc, c) => acc + (c.reward_granted ? c.reward_trunks : 0),
    0
  );

  return (
    <View style={styles.overlay}>
      <View style={styles.panel}>
        <View style={styles.header}>
          <Text style={styles.title}>RETOS SEMANALES</Text>
          <View style={styles.trunksBadge}>
            <Text style={styles.trunkIcon}>🪵</Text>
            <Text style={styles.trunkText}>{totalTrunks}</Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>X</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={challenges}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ChallengeCard challenge={item} />}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  panel: {
    width: "88%",
    maxHeight: "80%",
    backgroundColor: "#415A77",
    borderRadius: 24,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: { color: "#FFF", fontWeight: "bold", fontSize: 18 },
  trunksBadge: { flexDirection: "row", alignItems: "center" },
  trunkIcon: { fontSize: 18, marginRight: 4 },
  trunkText: { color: "#FFF", fontWeight: "bold" },
  close: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});
