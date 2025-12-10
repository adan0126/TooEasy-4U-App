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
  Alert,
  ActivityIndicator
} from "react-native";

// Importaciones necesarias
import { validarRegistro } from "../validaciones/valForm";
import { verificarUsuarioExistente, registrarUsuario } from "../services/authService";
import { useUser } from "../context/UserContext";

export default function CrearCuenta({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [correo, setCorreo] = useState("");
  const [edad, setEdad] = useState("");
  const [genero, setGenero] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useUser();

  const handleRegistro = async () => {
    console.log("🚀 Iniciando proceso de registro...");
    
    // Validación local del formulario
    const errorValidacion = validarRegistro({
      username,
      password,
      correo,
      edad,
      genero,
      terms
    });

    if (errorValidacion) {
      console.log("❌ Error de validación:", errorValidacion);
      Alert.alert("Error de Validación", errorValidacion);
      return;
    }

    console.log("✅ Validación local pasada");
    setLoading(true);

    try {
      console.log("🔍 Verificando si el usuario existe...");
      
      // Verificar si el usuario ya existe en Firebase
      const verificacion = await verificarUsuarioExistente(username, correo);
      
      console.log("Resultado de verificación:", verificacion);
      
      if (verificacion.existe) {
        console.log("❌ Usuario ya existe:", verificacion.mensaje);
        Alert.alert("Usuario Existente", verificacion.mensaje);
        setLoading(false);
        return;
      }

      // Registrar usuario en Firebase
      const nuevoUsuario = await registrarUsuario({
        username,
        password,
        correo,
        edad,
        genero
      });

      console.log("✅ Usuario registrado exitosamente:", nuevoUsuario.id);

      // 4️⃣ Guardar sesión en el contexto
      await login(nuevoUsuario, {
        id: nuevoUsuario.id,
        username: nuevoUsuario.username,
        monedas: nuevoUsuario.monedas
      });

      console.log("✅ Sesión guardada en contexto");

      // 5️⃣ Mostrar mensaje de éxito
      Alert.alert(
        "¡Cuenta Creada! 🎉",
        `Bienvenido ${username}. Tu cuenta se creó correctamente.`,
        [
          {
            text: "Comenzar",
            onPress: () => {
              console.log("📍 Navegando a Lecciones...");
              navigation.navigate("Lecciones");
            }
          }
        ]
      );

    } catch (error) {
      console.error("❌ Error en el registro:", error);
      console.error("Tipo de error:", error.name);
      console.error("Mensaje:", error.message);
      console.error("Stack:", error.stack);
      
      Alert.alert(
        "Error",
        `${error.message}\n\nRevisa la consola para más detalles.`
      );
    } finally {
      setLoading(false);
      console.log("🏁 Proceso de registro finalizado");
    }
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
          editable={!loading}
          autoCapitalize="none"
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

        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.small]}
            placeholder="Edad"
            keyboardType="numeric"
            value={edad}
            onChangeText={(t) => /^\d*$/.test(t) && setEdad(t)}
            editable={!loading}
          />

          <View style={[styles.input, styles.small, { justifyContent: "center" }]}>
            <Picker
              selectedValue={genero}
              onValueChange={(itemValue) => setGenero(itemValue)}
              enabled={!loading}
            >
              <Picker.Item label="Seleccione género" value="" />
              <Picker.Item label="Hombre" value="Hombre" />
              <Picker.Item label="Mujer" value="Mujer" />
              <Picker.Item label="Otro" value="Otro" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.btn, loading && styles.btnDisabled]} 
          onPress={handleRegistro}
          disabled={loading}
        >
          {loading ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ActivityIndicator color="#4D341F" />
              <Text style={[styles.btnTxt, { marginLeft: 10 }]}>Creando...</Text>
            </View>
          ) : (
            <Text style={styles.btnTxt}>Crear</Text>
          )}
        </TouchableOpacity>

        <View style={styles.checkboxContainer}>
          <Checkbox 
            value={terms} 
            onValueChange={setTerms} 
            color="#4D341F"
            disabled={loading}
          />
          <Text style={styles.checkboxText}>Términos y condiciones</Text>
        </View>

        <TouchableOpacity 
          onPress={() => navigation.navigate("IniciarAcc")}
          disabled={loading}
        >
          <Text style={styles.linkText}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>
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
  btnDisabled: {
    opacity: 0.6,
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
  linkText: {
    color: "#4D341F",
    marginTop: 15,
    fontSize: 14,
    textDecorationLine: "underline",
  },
});