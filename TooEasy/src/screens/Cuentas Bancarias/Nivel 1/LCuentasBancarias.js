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
        frente: "¿Qué es una cuenta bancaria?",
        atras: "Es un servicio que ofrece el banco para guardar tu dinero de forma segura.",
    },
    {
      id: "2",
      frente: "¿Qué es un depósito?",
      atras:
        "Es cuando agregas dinero a tu cuenta bancaria.",
    },
    {
      id: "3",
      frente: "¿Qué es un retiro?",
      atras:
        "Es cuando sacas dinero de tu cuenta.",
    },
    {
      id: "4",
      frente: "¿Qué es un estado de cuenta?",
      atras: "Es un documento que muestra tus movimientos: depósitos, retiros y saldo."
    },
    {
      id: "5",
      frente: "¿Qué es el saldo?",
      atras: "Es la cantidad de dinero disponible en tu cuenta."
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
          onPress={() => navigation.navigate("LCuentasBancarias1")}
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
