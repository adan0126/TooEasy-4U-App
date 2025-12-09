// Pantalla de inicio

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.title}>TOO EASY</Text>
      </View>

      <Image
        source={require("../../assets/mascota.png")} // Ajusta la ruta de la imagen
        style={styles.mascota}
        resizeMode="contain"
      />

      <Text style={styles.slogan}>JUEGA HOY, TRIUNFA MAÑANA</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("TestFirebase")}
      >
        <Text style={styles.btnTxt}>CREAR CUENTA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("IniciarAcc")}
      >
        <Text style={styles.btnTxt}>INICIAR SESIÓN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8EA4C0",
    alignItems: "center",
    paddingTop: 60,
  },
  banner: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
    transform: [{ rotate: "-5deg" }],
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: 2,
  },
  mascota: {
    width: 220,
    height: 260,
    marginTop: 10,
  },
  slogan: {
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingVertical: 10,
    width: "100%",
    textAlign: "center",
    marginVertical: 25,
    fontWeight: "600",
  },
  btn: {
    backgroundColor: "#D1D1D1",
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: 150,
    marginBottom: 15,
    borderRadius: 5,
  },
  btnTxt: {
    textAlign: "center",
    fontWeight: "700",
  },
});
