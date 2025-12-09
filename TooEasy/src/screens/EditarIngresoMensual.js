// ===================================================
// src/screens/EditarIngresoMensual.js
// ===================================================
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
import { actualizarIngresoMensual } from "../services/authService";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../config/fb";

export default function EditarIngresoMensual({ navigation }) {
  const { user } = useUser();
  const [ingresoMensual, setIngresoMensual] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const userRef = doc(database, "usuarios", user.id);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      
      if (userData.finanzas?.ingresoMensual) {
        setIngresoMensual(userData.finanzas.ingresoMensual.toString());
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleGuardar = async () => {
    if (!ingresoMensual || parseFloat(ingresoMensual) <= 0) {
      Alert.alert("Error", "Ingresa un monto válido");
      return;
    }

    setLoading(true);

    try {
      await actualizarIngresoMensual(user.id, parseFloat(ingresoMensual));
      
      Alert.alert(
        "¡Éxito!",
        "Ingreso mensual actualizado correctamente",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      console.error("Error actualizando ingreso:", error);
      Alert.alert("Error", "No se pudo actualizar el ingreso mensual");
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
        <Text style={styles.headerTitle}>Ingreso Mensual Fijo</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Define tu ingreso mensual fijo (sueldo, pensión, etc.) para un mejor control de tus finanzas.
        </Text>

        <Text style={styles.label}>Monto Mensual</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.moneySymbol}>$</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            keyboardType="decimal-pad"
            value={ingresoMensual}
            onChangeText={(text) => {
              if (/^\d*\.?\d{0,2}$/.test(text)) {
                setIngresoMensual(text);
              }
            }}
          />
        </View>

        <TouchableOpacity
          style={[styles.btnGuardar, loading && styles.btnGuardarDisabled]}
          onPress={handleGuardar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.btnText}>Guardar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ===================================================
// src/screens/EditarMeta.js
// ===================================================
export function EditarMeta({ navigation }) {
  const { user } = useUser();
  const [nombreMeta, setNombreMeta] = useState("");
  const [montoMeta, setMontoMeta] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const userRef = doc(database, "usuarios", user.id);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      
      if (userData.finanzas?.meta) {
        setNombreMeta(userData.finanzas.meta.nombre || "");
        if (userData.finanzas.meta.cantidad > 0) {
          setMontoMeta(userData.finanzas.meta.cantidad.toString());
        }
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
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
      Alert.alert("Error", "Ingresa un monto válido para tu meta");
      return;
    }

    setLoading(true);

    try {
      await actualizarMeta(user.id, {
        nombre: nombreMeta.trim(),
        cantidad: parseFloat(montoMeta)
      });
      
      Alert.alert(
        "¡Éxito!",
        "Meta de ahorro actualizada correctamente",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      console.error("Error actualizando meta:", error);
      Alert.alert("Error", "No se pudo actualizar la meta");
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
          Define una meta de ahorro que te motive a cuidar tus finanzas. Puede ser para un viaje, un gadget, o cualquier objetivo personal.
        </Text>

        <Text style={styles.label}>Nombre de la Meta</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Ej: Viaje a la playa, Nueva laptop"
          value={nombreMeta}
          onChangeText={setNombreMeta}
          maxLength={30}
        />

        <Text style={styles.label}>Monto de la Meta</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.moneySymbol}>$</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            keyboardType="decimal-pad"
            value={montoMeta}
            onChangeText={(text) => {
              if (/^\d*\.?\d{0,2}$/.test(text)) {
                setMontoMeta(text);
              }
            }}
          />
        </View>

        <TouchableOpacity
          style={[styles.btnGuardar, loading && styles.btnGuardarDisabled]}
          onPress={handleGuardar}
          disabled={loading}
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

// ESTILOS COMPARTIDOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#5B4636",
    padding: 20,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    fontSize: 28,
    color: "#FFF",
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    lineHeight: 22,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  moneySymbol: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 28,
    fontWeight: "bold",
    padding: 15,
    color: "#333",
  },
  inputText: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    marginBottom: 20,
  },
  btnGuardar: {
    backgroundColor: "#5B7C99",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  btnGuardarDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});