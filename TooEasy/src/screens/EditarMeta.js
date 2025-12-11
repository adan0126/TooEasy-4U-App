import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";

import { useUser } from "../context/UserContext";
import { actualizarMeta } from "../services/authService";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../config/fb";

export default function EditarMeta({ navigation }) {
  const { user, updateUserFinanzas } = useUser();

  const [nombreMeta, setNombreMeta] = useState("");
  const [montoMeta, setMontoMeta] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const ref = doc(database, "usuarios", user.id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const datos = snap.data();

        if (datos.finanzas?.meta) {
          setNombreMeta(datos.finanzas.meta.nombre || "");
          setMontoMeta(
            datos.finanzas.meta.cantidad
              ? datos.finanzas.meta.cantidad.toString()
              : ""
          );
        }
      }
    } catch (err) {
      console.error("Error cargando meta:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleGuardar = async () => {
    if (!nombreMeta.trim()) {
      Alert.alert("Error", "Ingresa un nombre para tu meta");
      return;
    }

    if (!montoMeta || parseFloat(montoMeta) <= 0) {
      Alert.alert("Error", "Ingresa un monto válido");
      return;
    }

    setLoading(true);

    try {
      const nuevaMeta = {
        nombre: nombreMeta.trim(),
        cantidad: parseFloat(montoMeta)
      };

      await actualizarMeta(user.id, nuevaMeta);

      updateUserFinanzas({
        meta: nuevaMeta
      });

      Alert.alert("Listo", "Meta actualizada correctamente", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error("Error guardando meta:", error);
      Alert.alert("Error", "No se pudo guardar la meta");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5B7C99" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meta de Ahorro</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Define una meta que te motive a ahorrar.
        </Text>

        <Text style={styles.label}>Nombre de la Meta</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Ejemplo: Nueva laptop"
          value={nombreMeta}
          onChangeText={setNombreMeta}
        />

        <Text style={styles.label}>Monto de la Meta</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.moneySymbol}>$</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            keyboardType="numeric"
            value={montoMeta}
            onChangeText={(text) => {
              if (/^\d*\.?\d{0,2}$/.test(text)) {
                setMontoMeta(text);
              }
            }}
          />
        </View>

        <TouchableOpacity
          style={[styles.btnGuardar, loading && { opacity: 0.5 }]}
          disabled={loading}
          onPress={handleGuardar}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.btnText}>Guardar Meta</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    backgroundColor: "#5B4636",
    padding: 20,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center"
  },
  backBtn: {
    fontSize: 28,
    color: "#FFF",
    marginRight: 15
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF"
  },
  content: { padding: 20 },
  description: { fontSize: 16, color: "#666", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  inputText: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DDD"
  },
  moneySymbol: { fontSize: 24, fontWeight: "bold", marginRight: 5 },
  input: { flex: 1, fontSize: 26, padding: 10 },
  btnGuardar: {
    backgroundColor: "#5B7C99",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center"
  },
  btnText: { color: "#FFF", fontSize: 18, fontWeight: "bold" }
});
