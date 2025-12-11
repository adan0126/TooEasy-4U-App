// Pantalla para iniciar sesión con Firebase

import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import { iniciarSesion } from "../services/authService";
import { useUser } from "../context/UserContext";

export default function IniciarSesion({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useUser();

  const handleLogin = async () => {
    // Validaciones básicas
    if (!username.trim() || !password) {
      Alert.alert("Campos vacíos", "Por favor ingresa tu usuario y contraseña.");
      return;
    }

    setLoading(true);

    try {
      // Intentar iniciar sesión      
      const resultado = await iniciarSesion(username, password);

      if (!resultado.exito) {
        Alert.alert("Error de Acceso", resultado.mensaje);
        setLoading(false);
        return;
      }

      // Login exitoso - guardar sesión
      await login(resultado.usuario, {
        id: resultado.usuario.id,
        username: resultado.usuario.username,
        monedas: resultado.usuario.monedas
      });

      // Navegar a Lecciones
      navigation.navigate("Lecciones");

    } catch (error) {
      console.error("Error en login:", error);
      Alert.alert(
        "Error",
        error.message || "Ocurrió un error al iniciar sesión. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INICIA SESIÓN</Text>

      <Image
        source={require("../../assets/ftp2.png")}
        style={styles.avatar}
        resizeMode="contain"
      />

      <TextInput 
        style={styles.input} 
        placeholder="Correo Electrónico"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        editable={!loading}
      />

      <View style={styles.passwordContainer}>
        <TextInput 
          style={[styles.input, { flex: 1, marginBottom: 0 }]} 
          placeholder="Contraseña" 
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeBtn}
          disabled={loading}
        >
          <Text style={{ fontSize: 16 }}>{showPassword ? "🙈" : "👁️"}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.btn, loading && styles.btnDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.btnTxt}>INICIAR SESIÓN</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => Alert.alert("Recuperar Contraseña", "Esta función estará disponible próximamente.")}
        disabled={loading}
      >
        <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("CrearAcc")}
        disabled={loading}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.linkCreate}>
          ¿No tienes cuenta? Regístrate
        </Text>
      </TouchableOpacity>
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
  avatar: {
    width: 150,
    height: 150,
    marginBottom: 35,
  },
  input: {
    backgroundColor: "white",
    width: 250,
    height: 45,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 250,
    backgroundColor: "white",
    borderRadius: 25,
    paddingRight: 10,
    marginBottom: 15,
  },
  eyeBtn: {
    paddingHorizontal: 8,
  },
  btn: {
    backgroundColor: "#B6823E",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
    width: 200,
    alignItems: "center",
  },
  btnDisabled: {
    opacity: 0.6,
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
  linkCreate: {
    color: "#B6823E",
    fontWeight: "700",
    fontSize: 15,
  },
});