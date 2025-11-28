// Pantalla para iniciar sesión

import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function LoginScreen({ navigation }) {   // ← AGREGADO
  return (
    <View style={styles.container}>
      <Text style={styles.title}>INICIA SESIÓN</Text>

      <View style={styles.avatarCircle}></View>

      <TextInput style={styles.input} placeholder="Nombre de usuario" />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Lecciones")}  // ← AGREGADO
      >
        <Text style={styles.btnTxt}>INICIAR SESIÓN</Text>
      </TouchableOpacity>

      <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 30,
  },
  avatarCircle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#8EA4C0",
    marginBottom: 35,
  },
  input: {
    backgroundColor: "white",
    width: 250,
    height: 35,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: "#B6823E",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  btnTxt: {
    fontWeight: "700",
    color: "white",
  },
  link: {
    color: "#203A53",
    marginTop: 20,
    fontWeight: "600",
  },
});
