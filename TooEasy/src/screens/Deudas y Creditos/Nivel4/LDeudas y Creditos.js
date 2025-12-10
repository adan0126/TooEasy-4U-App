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
  // (Información actualizada: Deudas Buenas vs. Malas)
  // -------------------------------------------
  const tarjetas = [
    {
      id: "1",
      frente: "Deudas Buenas: Generando Valor",
      atras:
        " Deudas buenas\n\nLas deudas buenas son aquellas que te ayudan a mejorar tu situación financiera, aumentar tu patrimonio o generar ingresos a futuro.\n\nEn otras palabras, son compromisos financieros que aportan un beneficio real y te acercan a tus metas.\n\nEjemplos comunes:\n• Crédito educativo: te permite invertir en tu formación profesional y aumentar tus oportunidades laborales.\n• Crédito hipotecario: te ayuda a adquirir un bien que con el tiempo puede aumentar su valor.\n• Crédito para negocio: sirve para invertir en un proyecto que puede generar ganancias a largo plazo.\n\nEn resumen: una deuda buena debe generar valor, no solo gastos.",
    },
    {
      id: "2",
      frente: "Deudas Malas: Consumo Impulsivo",
      atras:
        " Deudas malas\n\nSon aquellas que se adquieren para cubrir gustos momentáneos o gastos que no generan ningún beneficio económico o personal duradero.\n\nGeneralmente se relacionan con el consumo impulsivo y con el uso excesivo de las tarjetas de crédito.\n\nEjemplos frecuentes:\n• Comprar ropa o tecnología solo por moda.\n• Viajes o fiestas pagados con crédito sin plan de pago.\n• Endeudarse por caprichos o compras no planificadas.\n\nEstas deudas suelen tener intereses altos y pueden llevarte a un círculo de endeudamiento si no se controlan.",
    },
    {
      id: "3",
      frente: "¿Cómo identificar una Deuda Buena?",
      atras:
        "Cómo identificar una deuda buena:\n\n• Tiene una tasa de interés razonable y acorde a tu capacidad de pago.\n• Aumenta tu patrimonio, conocimientos o calidad de vida.\n• Tiene un propósito planificado y medido (no se toma por impulso).\n• Su pago no afecta tus necesidades básicas ni tu estabilidad financiera.\n\nSi la deuda te deja algo valioso o te acerca a tus metas, probablemente sea buena.",
    },
    {
      id: "4",
      frente: "Cómo evitar las Deudas Malas",
      atras:
        "Cómo evitar las deudas malas:\n• Evita las compras impulsivas: antes de comprar, pregúntate si realmente lo necesitas.\n• No gastes más de lo que ganas: mantén tus deudas por debajo del 30% de tus ingresos.\n• Compara opciones de crédito: revisa tasas de interés, plazos y comisiones.\n• Crea un presupuesto mensual: así sabrás cuánto puedes destinar al pago de deudas.\n• Ahorra antes de endeudarte: si puedes cubrir una parte en efectivo, el crédito será menor y más fácil de pagar.\n\nRecuerda: las deudas no son malas por sí mismas; el problema es cómo y para qué se usan.",
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
      {/* 🛑 Navegación cambiada a "PDeudasyCreditos4" */}
      {indexActual === tarjetas.length - 1 && (
        <TouchableOpacity
          style={styles.btnRepaso}
          onPress={() => navigation.navigate("PDeudasyCreditos4")}
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