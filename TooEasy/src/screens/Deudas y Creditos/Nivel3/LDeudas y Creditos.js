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

// Componente renombrado
export default function DeudasyCreditosLeccionScreen({ navigation }) {
  // -------------------------------------------
  // Aquí defines las tarjetas de la lección
  // (Información actualizada: Deudas y Tipos)
  // -------------------------------------------
  const tarjetas = [
    {
      id: "1",
      frente: "¿Qué es una Deuda?",
      atras:
        "¿Qué es una deuda?\n\nUna deuda es un compromiso financiero que se adquiere al recibir dinero, bienes o servicios con la obligación de devolver su valor en el futuro.\n\nLas deudas pueden provenir de préstamos, tarjetas de crédito, hipotecas o compras a plazos.\n\nLas deudas son útiles cuando se utilizan para alcanzar metas financieras importantes, como estudiar, comprar una vivienda o invertir en un negocio.\n\nSin embargo, si no se administran bien, pueden convertirse en un problema para la salud económica personal.",
    },
    {
      id: "2",
      frente: "¿Para qué sirve la deuda?",
      atras:
        "¿Para qué sirve la deuda?\n• Permite acceder a bienes o servicios sin pagar el total de inmediato.\n• Facilita invertir en educación, vivienda o negocio.\n• Ayuda a construir un historial crediticio si se paga puntualmente.",
    },
    {
      id: "3",
      frente: "Tipos de deuda (Buena y Mala)",
      atras:
        "Tipos de deuda:\n• Buena deuda: Se usa para generar valor o mejorar la situación financiera (por ejemplo, un crédito educativo o hipotecario).\n• Mala deuda: Se usa para gastos innecesarios o de consumo excesivo que no generan beneficios futuros.",
    },
    {
      id: "4",
      frente: "Consecuencias y Recomendaciones",
      atras:
        "Consecuencias del endeudamiento excesivo:\n• Afecta la capacidad de pago mensual.\n• Reduce el ahorro disponible.\n• Daña el historial crediticio.\n\nRecomendaciones:\n• No adquieras más deuda de la que puedes pagar.\n• Prioriza las deudas con intereses altos.\n• Paga a tiempo para evitar cargos adicionales.",
    },
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
      {/* 🛑 Navegación cambiada a "PDeudasyCreditos3" */}
      {indexActual === tarjetas.length - 1 && (
        <TouchableOpacity
          style={styles.btnRepaso}
          onPress={() => navigation.navigate("PDeudasyCreditos3")}
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
// 🔥 COMPONENTE FLASHCARD con animación de FLIP (Sin cambios)
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

  const estiloFrente = {
    transform: [{ rotateY: rotacionFrente }, { perspective: 1000 }],
    opacity: ladoFrente ? 1 : 0,
  };

  const estiloAtras = {
    transform: [{ rotateY: rotacionAtras }, { perspective: 1000 }],
    opacity: ladoFrente ? 0 : 1,
  };

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity activeOpacity={1} onPress={flipCard}>
        {/* Frente */}
        {ladoFrente && (
          <Animated.View
            style={[
              styles.card,
              styles.cardFrente,
              estiloFrente,
            ]}
          >
            <Text style={styles.cardText}>{frente}</Text>
          </Animated.View>
        )}

        {/* Reverso */}
        {!ladoFrente && (
          <Animated.View
            style={[
              styles.card,
              styles.cardAtras,
              estiloAtras,
              { position: 'absolute' },
            ]}
          >
            {/* Ajuste de estilo para texto largo en el reverso */}
            <Text style={styles.cardTextAtras}>{atras}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    </View>
  );
}

// --------------------- ESTILOS --------------------- (Sin cambios)
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
    width: width * 0.85, // Un poco más ancho para que quepa bien el texto
    height: 450, // Un poco más alto para la info detallada
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backfaceVisibility: "hidden",
    position: "absolute",
  },

  cardFrente: { backgroundColor: "#415A77" },
  cardAtras: { backgroundColor: "#E0E1DD" },

  cardText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF"
  },

  cardTextAtras: {
    textAlign: "left", // Mejor lectura para listas
    fontSize: 16, // Letra un poco más pequeña para que quepa todo
    color: "#000",
    lineHeight: 22 // Espaciado para legibilidad
  },

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