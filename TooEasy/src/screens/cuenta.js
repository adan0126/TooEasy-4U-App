// pantalla de registro del usuario

import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";

export default function CrearCuenta({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);

  return (
    <View style={styles.container}>

      {/* Parte superior café */}
      <View style={styles.topSection}>
        <Image
          source={require("../../assets/ftp2.png")}
          style={styles.mascota}
          resizeMode="contain"
        />
      </View>
      {/* Tarjeta blanca */}
      <View style={styles.card}>
        <Text style={styles.title}>Crear Cuenta</Text>

        {/* Inputs */}
        <TextInput style={styles.input} placeholder="Nombre de usuario" />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeBtn}
          >
            <Text style={{ fontSize: 16 }}>👁️</Text>
          </TouchableOpacity>
        </View>

        <TextInput style={styles.input} placeholder="Correo Electrónico" />

        {/* Selects simples */}
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.small]} placeholder="Edad" />
          <TextInput style={[styles.input, styles.small]} placeholder="Género" />
        </View>

        {/* Botón Crear */}
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("IniciarAcc")}>
          <Text style={styles.btnTxt}>Crear</Text>
        </TouchableOpacity>

        {/* Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox value={terms} onValueChange={setTerms} color="#4D341F" />
          <Text style={styles.checkboxText}>Términos y condiciones</Text>
        </View>
      </View>
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topSection: {
    backgroundColor: "#4D341F",
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  mascota: {
    width: 180,
    height: 180,
    marginBottom: -40,
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: -40,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 40,
    paddingHorizontal: 25,
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#4D341F",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#E3E3E3",
    width: "100%",
    paddingHorizontal: 15,
    height: 42,
    borderRadius: 25,
    marginBottom: 15,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#E3E3E3",
    borderRadius: 25,
    paddingRight: 15,
    marginBottom: 15,
  },

  eyeBtn: {
    paddingHorizontal: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  small: {
    width: "48%",
  },

  btn: {
    backgroundColor: "#D2A676",
    width: "100%",
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  btnTxt: {
    color: "#4D341F",
    fontWeight: "800",
    fontSize: 16,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  checkboxText: {
    marginLeft: 5,
    fontSize: 13,
  },
});
