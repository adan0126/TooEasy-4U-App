// Esta sera la pantalla para el menu de lecciones

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function FMenu({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Lecciones")}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cuentas Bancarias</Text>
      </View>

      {/* ---------- IMAGEN ---------- */}
      <Image
        source={require("../../../assets/fundamentos-img.png")} 
        style={styles.image}
        resizeMode="contain"
      />

      {/* ---------- TEXTO DESCRIPTIVO ---------- */}
      <Text style={styles.description}>
        Aprende los conceptos básicos sobre las cuentas bancarias: qué es una cuenta de ahorro, una cuenta de nomina,
        aparte de lo que cobra el banco lo cual son los intereses  y comisiones que pueden tener.
      </Text>

      {/* ---------- CONTENEDOR DE LECCIONES ---------- */}
      <View style={styles.lessonsContainer}>
        
        {/* 🔸 BOTÓN 1: ¿Qué es un ingreso? */}
        <TouchableOpacity
          style={styles.lessonBtn}
          onPress={() => {
            // 👇 Aquí cambias la navegación para que lleve a la lección correcta
            navigation.navigate("LCuentasBancarias1");
          }}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>▶</Text>
          </View>
          <Text style={styles.lessonText}>Tu primer cuenta, ¿Qué es una cuenta de ahorro?</Text>
        </TouchableOpacity>

        {/* 🔸 BOTÓN 2: ¿Qué es un gasto? */}
        <TouchableOpacity
          style={styles.lessonBtn}
          onPress={() => {
            // 👇 Aquí cambias la navegación hacia la lección de gastos
            navigation.navigate("LCuentasBancarias2");
          }}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>▶</Text>
          </View>
          <Text style={styles.lessonText}>La cuenta del trabajo, ¿Qué es una cuenta de nomina?</Text>
        </TouchableOpacity>

        {/* 🔸 BOTÓN 3: Fondos de emergencia */}
        <TouchableOpacity
          style={styles.lessonBtn}
          onPress={() => {
            // 👇 Aquí cambias la navegación hacia la lección de fondos
            navigation.navigate("LCuentasBancarias3");
          }}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>▶</Text>
          </View>
          <Text style={styles.lessonText}>o que el banco cobra, Intereses y Comisiones</Text>
        </TouchableOpacity>

        {/* 🔸 Puedes agregar más botones repitiendo este bloque */}
      </View>
    </ScrollView>
  );
}

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

  image: {
    width: "100%",
    height: 180,
    marginTop: 10,
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
    fontSize: 20,
    fontWeight: "bold",
  },

  lessonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
