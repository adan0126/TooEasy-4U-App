import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function ADMenu({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Administración de Dinero</Text>
      </View>

      {/* ---------- IMAGEN / PLACEHOLDER ---------- */}
      {/* Cuando tengas la imagen, cambia este bloque por un <Image /> */}
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imagePlaceholderText}>
          Aquí va la imagen del tema "Administración de Dinero"
        </Text>
      </View>

      {/* ---------- TEXTO DESCRIPTIVO ---------- */}
      <Text style={styles.description}>
        Aquí irá la descripción general del tema "Administración de Dinero"
        (texto introductorio). Solo es un placeholder.
      </Text>

      {/* ---------- CONTENEDOR DE LECCIONES ---------- */}
      <View style={styles.lessonsContainer}>
        {/* NIVEL 1 */}
        <TouchableOpacity
          style={styles.lessonBtn}
          onPress={() => navigation.navigate("LAdminDinero1")}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>1</Text>
          </View>
          <Text style={styles.lessonText}>Bases para administrar tu dinero</Text>
        </TouchableOpacity>

        {/* NIVEL 2 */}
        <TouchableOpacity
          style={styles.lessonBtn}
          onPress={() => navigation.navigate("LAdminDinero2")}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>2</Text>
          </View>
          <Text style={styles.lessonText}>Cómo aplicar la regla 50/30/20</Text>
        </TouchableOpacity>

        {/* NIVEL 3 */}
        <TouchableOpacity
          style={styles.lessonBtn}
          onPress={() => navigation.navigate("LAdminDinero3")}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>3</Text>
          </View>
          <Text style={styles.lessonText}>Crear y ajustar tu presupuesto mensual</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ---------- ESTILOS (copiados de FMenu y adaptados) ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1B2A49",
  },
  backArrow: {
    color: "#FFF",
    fontSize: 28,
    marginRight: 10,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  imagePlaceholder: {
    width: "100%",
    height: 180,
    marginTop: 10,
    backgroundColor: "#D9E2EC",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    color: "#444",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  description: {
    paddingHorizontal: 20,
    paddingTop: 15,
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
  },
  lessonsContainer: {
    marginTop: 25,
    backgroundColor: "#A8B6CF",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lessonBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 18,
  },
  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#E8A87C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  lessonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
