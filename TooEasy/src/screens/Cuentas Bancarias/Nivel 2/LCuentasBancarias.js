// Pantalla de flashcards para los fundamentos - Ingreso

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function FundamentosLeccionScreen({ navigation }) {
  // -------------------------------------------
  // Aquí defines las tarjetas de la lección
  // -------------------------------------------
 
    const tarjetas = [
  {
    id: "1",
    frente: "¿Qué es una cuenta de nómina?",
    atras: "Es una cuenta bancaria donde se deposita automáticamente el salario del trabajador."
  },
  {
    id: "2",
    frente: "¿Cuál es el uso principal de una cuenta de nómina?",
    atras: "Recibir el pago del sueldo de forma segura y automática."
  },
  {
    id: "3",
    frente: "¿La cuenta de nómina cobra comisiones?",
    atras: "Generalmente no, mientras reciba depósitos de nómina."
  },
  {
    id: "4",
    frente: "¿Qué tarjeta incluye una cuenta de nómina?",
    atras: "Una tarjeta de débito para compras, pagos y retiros."
  },
  {
    id: "5",
    frente: "¿Requiere monto mínimo para abrir?",
    atras: "No, normalmente no se pide una cantidad inicial."
  },
  {
    id: "6",    frente: "¿Qué beneficios adicionales ofrece una cuenta de nómina?",
    atras: "Acceso a préstamos, tarjetas de crédito y créditos hipotecarios."
  },
  {
    id: "7",
    frente: "¿Qué pasa si tu cuenta deja de recibir depósitos de nómina?",
    atras: "Puede convertirse en cuenta tradicional y empezar a cobrar comisiones."
  },
  {
    id: "8",
    frente: "¿En qué se diferencia una cuenta de ahorro?",
    atras: "La cuenta de ahorro es para guardar dinero y puede generar intereses."
  },
  {
    id: "9",
    frente: "¿Qué es la portabilidad de nómina?",
    atras: "El derecho a cambiar tu cuenta de nómina al banco que tú elijas."
  },
  {
    id: "10",
    frente: "¿Qué necesitas para solicitar la portabilidad?",
    atras: "Identificación oficial, comprobante de domicilio y acudir al nuevo banco."
  },
  {
    id: "11",
    frente: "¿El empleador puede obligarte a un banco específico?",
    atras: "No, tú decides dónde recibir tu salario."
  },
  {
    id: "12",
    frente: "¿Qué recomendación de seguridad es importante?",
    atras: "Nunca compartir tu NIP ni contraseñas."
  },
  {
    id: "13",
    frente: "¿Para qué sirven las notificaciones móviles?",
    atras: "Para saber cuándo te depositan o si hay movimientos sospechosos."
  },
  {
    id: "14",
    frente: "¿Qué hacer si cambias de empleo?",
    atras: "Preguntar si puedes seguir usando la misma cuenta."
  },
  {
    id: "15",
    frente: "¿Qué debes verificar si tu cuenta deja de tener actividad?",
    atras: "Que no empiece a generar comisiones por inactividad."
  }
];

  const [indexActual, setIndexActual] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={tarjetas}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setIndexActual(index);
        }}
        renderItem={({ item }) => (
          <FlashCard frente={item.frente} atras={item.atras} />
        )}
      />

      {/* 🌟 SOLO aparece al finalizar todas las tarjetas */}
      {indexActual === tarjetas.length - 1 && (
        <TouchableOpacity
          style={styles.btnRepaso}
          onPress={() => navigation.navigate("PCuentasBancarias1")}
        >
          <Text style={styles.btnRepasoTxt}>Preguntas de Repaso</Text>
        </TouchableOpacity>
      )}

      {/* Botón regresar */}
      <TouchableOpacity
        style={styles.btnRegresar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnRegresarTxt}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
}

// -------------------------------------------------------
// 🔥 COMPONENTE FLASHCARD con animación de FLIP
// -------------------------------------------------------
function FlashCard({ frente, atras }) {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [ladoFrente, setLadoFrente] = useState(true);

  const rotacionFrente = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const rotacionAtras = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: ladoFrente ? 180 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setLadoFrente(!ladoFrente);
    });
  };

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity activeOpacity={1} onPress={flipCard}>
        {/* Frente */}
        <Animated.View
          style={[
            styles.card,
            styles.cardFrente,
            { transform: [{ rotateY: rotacionFrente }], opacity: ladoFrente ? 1 : 0 },
          ]}
        >
          <Text style={styles.cardText}>{frente}</Text>
        </Animated.View>

        {/* Reverso */}
        <Animated.View
          style={[
            styles.card,
            styles.cardAtras,
            { transform: [{ rotateY: rotacionAtras }], opacity: ladoFrente ? 0 : 1 },
          ]}
        >
          <Text style={styles.cardTextAtras}>{atras}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

// --------------------- ESTILOS ---------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    justifyContent: "center",
    alignItems: "center",
  },

  cardWrapper: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: width * 0.8,
    height: 300,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backfaceVisibility: "hidden",
    position: "absolute",
  },

  cardFrente: { backgroundColor: "#415A77" },
  cardAtras: { backgroundColor: "#E0E1DD" },

  cardText: { textAlign: "center", fontSize: 22, color: "#FFF" },
  cardTextAtras: { textAlign: "center", fontSize: 20, color: "#000" },

  btnRepaso: {
    position: "absolute",
    bottom: 110,
    backgroundColor: "#1B263B",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
  },

  btnRepasoTxt: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  btnRegresar: {
    position: "absolute",
    bottom: 40,
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: "#778DA9",
    borderRadius: 10,
  },

  btnRegresarTxt: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
