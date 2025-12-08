import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";

// 👇 importamos la validación
import { validarRegistro } from "../validaciones/valForm";

export default function CrearCuenta({ navigation }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [correo, setCorreo] = useState("");
  const [edad, setEdad] = useState("");
  const [genero, setGenero] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);

  const handleRegistro = () => {
    const error = validarRegistro({
      username,
      password,
      correo,
      edad,
      genero,
      terms
    });

    if (error) {
      Alert.alert("Error", error);
      return;
    }

    // Si no hubo errores:
    Alert.alert("Cuenta creada", "Tu cuenta se creó correctamente.");
    navigation.navigate("IniciarAcc");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require("../../assets/ftp2.png")}
          style={styles.mascota}
          resizeMode="contain"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Crear Cuenta</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeBtn}
          >
            <Text style={{ fontSize: 16 }}>{showPassword ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={correo}
          onChangeText={setCorreo}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.small]}
            placeholder="Edad"
            keyboardType="numeric"
            value={edad}
            onChangeText={(t) => /^\d*$/.test(t) && setEdad(t)}
          />

          <View style={[styles.input, styles.small, { justifyContent: "center" }]}>
            <Picker
              selectedValue={genero}
              onValueChange={(itemValue) => setGenero(itemValue)}
            >
              <Picker.Item label="Seleccione género" value="" />
              <Picker.Item label="Hombre" value="Hombre" />
              <Picker.Item label="Mujer" value="Mujer" />
              <Picker.Item label="Otro" value="Otro" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleRegistro}>
          <Text style={styles.btnTxt}>Crear</Text>
        </TouchableOpacity>

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
