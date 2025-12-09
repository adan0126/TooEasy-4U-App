// src/screens/RegistrarTransaccion.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { useUser } from "../context/UserContext";
import { agregarTransaccion } from "../services/authService";

export default function RegistrarTransaccion({ navigation, route }) {
  const { user } = useUser();
  const fechaInicial = route.params?.fecha || new Date();
  
  const [tipo, setTipo] = useState("ingreso"); // "ingreso" o "egreso"
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("General");
  const [fecha, setFecha] = useState(fechaInicial);
  const [loading, setLoading] = useState(false);

  const categoriasIngresos = [
    "Salario",
    "Venta",
    "Propina",
    "Regalo",
    "Inversión",
    "Otro"
  ];

  const categoriasEgresos = [
    "Comida",
    "Transporte",
    "Servicios",
    "Entretenimiento",
    "Ropa",
    "Salud",
    "Educación",
    "Otro"
  ];

  const categorias = tipo === "ingreso" ? categoriasIngresos : categoriasEgresos;

  const handleGuardar = async () => {
    // Validaciones
    if (!monto || parseFloat(monto) <= 0) {
      Alert.alert("Error", "Ingresa un monto válido");
      return;
    }

    if (!descripcion.trim()) {
      Alert.alert("Error", "Agrega una descripción");
      return;
    }

    setLoading(true);

    try {
      await agregarTransaccion(user.id, tipo, {
        fecha,
        monto: parseFloat(monto),
        descripcion: descripcion.trim(),
        categoria
      });

      Alert.alert(
        "¡Éxito!",
        `${tipo === "ingreso" ? "Ingreso" : "Egreso"} registrado correctamente`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack()
          }
        ]
      );

    } catch (error) {
      console.error("Error guardando transacción:", error);
      Alert.alert("Error", "No se pudo guardar la transacción");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registrar Transacción</Text>
      </View>

      {/* TIPO DE TRANSACCIÓN */}
      <View style={styles.tipoContainer}>
        <TouchableOpacity
          style={[
            styles.tipoBtn,
            tipo === "ingreso" && styles.tipoBtnActive,
            tipo === "ingreso" && styles.tipoBtnIngreso
          ]}
          onPress={() => {
            setTipo("ingreso");
            setCategoria("General");
          }}
        >
          <Text style={[
            styles.tipoBtnText,
            tipo === "ingreso" && styles.tipoBtnTextActive
          ]}>
            💰 Ingreso
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tipoBtn,
            tipo === "egreso" && styles.tipoBtnActive,
            tipo === "egreso" && styles.tipoBtnEgreso
          ]}
          onPress={() => {
            setTipo("egreso");
            setCategoria("General");
          }}
        >
          <Text style={[
            styles.tipoBtnText,
            tipo === "egreso" && styles.tipoBtnTextActive
          ]}>
            💸 Egreso
          </Text>
        </TouchableOpacity>
      </View>

      {/* FORMULARIO */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Monto</Text>
        <View style={styles.montoInputContainer}>
          <Text style={styles.montoSymbol}>$</Text>
          <TextInput
            style={styles.montoInput}
            placeholder="0.00"
            keyboardType="decimal-pad"
            value={monto}
            onChangeText={(text) => {
              // Solo permitir números y punto decimal
              if (/^\d*\.?\d{0,2}$/.test(text)) {
                setMonto(text);
              }
            }}
          />
        </View>

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          placeholder={`¿De dónde viene este ${tipo}?`}
          value={descripcion}
          onChangeText={setDescripcion}
          maxLength={50}
        />

        <Text style={styles.label}>Categoría</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriasContainer}>
            {categorias.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoriaBtn,
                  categoria === cat && styles.categoriaBtnActive,
                  categoria === cat && tipo === "ingreso" && styles.categoriaBtnIngresoActive,
                  categoria === cat && tipo === "egreso" && styles.categoriaBtnEgresoActive
                ]}
                onPress={() => setCategoria(cat)}
              >
                <Text style={[
                  styles.categoriaBtnText,
                  categoria === cat && styles.categoriaBtnTextActive
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Text style={styles.label}>Fecha</Text>
        <View style={styles.fechaContainer}>
          <Text style={styles.fechaText}>
            {fecha.toLocaleDateString('es-MX', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>

        {/* BOTÓN GUARDAR */}
        <TouchableOpacity
          style={[
            styles.btnGuardar,
            loading && styles.btnGuardarDisabled
          ]}
          onPress={handleGuardar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.btnGuardarText}>
              Guardar {tipo === "ingreso" ? "Ingreso" : "Egreso"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  tipoContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 10,
  },
  tipoBtn: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFF",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#DDD",
  },
  tipoBtnActive: {
    borderWidth: 3,
  },
  tipoBtnIngreso: {
    borderColor: "#27AE60",
    backgroundColor: "#E8F8F5",
  },
  tipoBtnEgreso: {
    borderColor: "#E74C3C",
    backgroundColor: "#FADBD8",
  },
  tipoBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  tipoBtnTextActive: {
    color: "#333",
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
    color: "#333",
  },
  montoInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  montoSymbol: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
    marginRight: 5,
  },
  montoInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: "bold",
    padding: 15,
    color: "#333",
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  categoriasContainer: {
    flexDirection: "row",
    gap: 10,
  },
  categoriaBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  categoriaBtnActive: {
    borderWidth: 2,
  },
  categoriaBtnIngresoActive: {
    backgroundColor: "#27AE60",
    borderColor: "#27AE60",
  },
  categoriaBtnEgresoActive: {
    backgroundColor: "#E74C3C",
    borderColor: "#E74C3C",
  },
  categoriaBtnText: {
    fontSize: 14,
    color: "#666",
  },
  categoriaBtnTextActive: {
    color: "#FFF",
    fontWeight: "bold",
  },
  fechaContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  fechaText: {
    fontSize: 16,
    color: "#333",
    textTransform: "capitalize",
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
  btnGuardarText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});