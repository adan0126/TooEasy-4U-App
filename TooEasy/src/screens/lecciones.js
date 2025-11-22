// Pantalla donde aparecen todas las lecciones

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export default function LeccionesScreen({ navigation }) {
  const temas = [
    { id: 1, titulo: "¿Qué es el dinero?" },
    { id: 2, titulo: "¿Cómo funcionan los bancos?" },
    { id: 3, titulo: "Ahorro vs Gasto" },
    { id: 4, titulo: "Intereses sencillos" },
    { id: 5, titulo: "Intereses compuestos" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LECCIONES – NIVEL 1</Text>

      <ScrollView style={styles.scroll}>
        {temas.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={styles.card}
            onPress={() => navigation.navigate("LeccionDetalle", { id: t.id })}
          >
            <Text style={styles.cardText}>{t.titulo}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 20,
    textAlign: "center",
  },
  scroll: {
    flex: 1,
  },
  card: {
    backgroundColor: "#8EA4C0",
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
});
