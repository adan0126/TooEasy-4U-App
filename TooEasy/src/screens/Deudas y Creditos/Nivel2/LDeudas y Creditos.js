import React, { useRef, useState, useMemo} from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  FlatList,
  Dimensions, 
  Image,
} from "react-native";

const { width } = Dimensions.get("window");

// Componente renombrado
export default function DeudasyCreditosLeccionScreen({ navigation }) {
  // -------------------------------------------
  // Aquí defines las tarjetas de la lección
  // (Información actualizada: Historial Crediticio)
  // -------------------------------------------
   // -------------------------------------------
  // IMÁGENES DISPONIBLES
  // -------------------------------------------
  const frontImages = [
  require("../../../../assets/tarjetaFrente1.png"),
  require("../../../../assets/tarjetaFrente2.png"),
  require("../../../../assets/tarjetaFrente3.png"),
  require("../../../../assets/tarjetaFrente4.png"),
  require("../../../../assets/tarjetaFrente5.png"),
  require("../../../../assets/tarjetaFrente6.png"),
  require("../../../../assets/tarjetaFrente7.png"),
  require("../../../../assets/tarjetaFrente8.png"),
  require("../../../../assets/tarjetaFrente9.png"),
  require("../../../../assets/tarjetaFrente10.png"),
  require("../../../../assets/tarjetaFrente11.png"),
];

const backImages = [
  require("../../../../assets/tarjetaDetras1.png"),
  require("../../../../assets/tarjetaDetras2.png"),
  require("../../../../assets/tarjetaDetras3.png"),
  require("../../../../assets/tarjetaDetras4.png"),
  require("../../../../assets/tarjetaDetras5.png"),
  require("../../../../assets/tarjetaDetras6.png"),
  require("../../../../assets/tarjetaDetras7.png"),
];

  // -------------------------------------------
  // TARJETAS BASE
  // -------------------------------------------
  const tarjetasBase = [
    {
      id: "1",
      frente: "¿Qué es el historial crediticio?",
      atras:
        "¿Qué es el historial crediticio?\n\nEs el registro de cómo una persona ha manejado sus créditos y deudas a lo largo del tiempo.\n\nIncluye información sobre préstamos, tarjetas, pagos puntuales o atrasos, y se utiliza para determinar la confianza financiera de una persona.",
    },
    {
      id: "2",
      frente: "Importancia del historial",
      atras:
        "Importancia del historial crediticio:\n• Permite acceder a créditos, préstamos o hipotecas con mejores condiciones.\n• Refleja el comportamiento financiero del usuario.\n• Facilita la aprobación de rentas, servicios o empleos relacionados con finanzas.",
    },
    {
      id: "3",
      frente: "Consejos para un buen historial",
      atras:
        "Consejos para construir un buen historial crediticio:\n• Usa el crédito de manera responsable.\n• Paga siempre a tiempo.\n• No pidas más créditos de los necesarios.\n• Revisa tu historial periódicamente.\n• Mantén tus deudas bajo control (no excedas el 30% de tu ingreso mensual).",
    },
    {
      id: "4",
      frente: "Errores Comunes",
      atras:
        "Errores comunes:\n• No pagar a tiempo.\n• Usar todo el límite de crédito disponible.\n• Ignorar los estados de cuenta.",
    },
  ];

  // -------------------------------------------
    // COMBINAR TARJETAS + IMÁGENES AUTOMÁTICAMENTE
    // -------------------------------------------
    const tarjetas = useMemo(() => {
      return tarjetasBase.map((t, i) => ({
        ...t,
        imagenFrente: frontImages[i % frontImages.length], // 11 imágenes → se repiten
        imagenAtras: backImages[i % backImages.length],     // 7 imágenes → se repiten
      }));
    }, []);
  
    const [indexActual, setIndexActual] = useState(0);
  
    const handleScroll = (e) => {
      const nuevoIndex = Math.round(e.nativeEvent.contentOffset.x / width);
      setIndexActual(nuevoIndex);
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          data={tarjetas}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          renderItem={({ item }) => (
            <FlashCard
              frente={item.frente}
              atras={item.atras}
              imagenFrente={item.imagenFrente}
              imagenAtras={item.imagenAtras}
            />
          )}
        />
  
        {indexActual === tarjetas.length - 1 && (
          <TouchableOpacity
            style={styles.btnRepaso}
            onPress={() => navigation.navigate("PDeudasyCreditos2")}
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
function FlashCard({ frente, atras, imagenFrente, imagenAtras }) {
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
        {/* FRENTE */}
        <Animated.View
          style={[
            styles.card,
            styles.cardFrente,
            { transform: [{ rotateY: rotacionFrente }], opacity: ladoFrente ? 1 : 0 },
          ]}
        >
          <Image source={imagenFrente} style={styles.img} resizeMode="contain" />
          <Text style={styles.cardText}>{frente}</Text>
        </Animated.View>

        {/* ATRÁS */}
        <Animated.View
          style={[
            styles.card,
            styles.cardAtras,
            { transform: [{ rotateY: rotacionAtras }], opacity: ladoFrente ? 0 : 1 },
          ]}
        >
          <Image source={imagenAtras} style={styles.img} resizeMode="contain" />
          <Text style={styles.cardTextAtras}>{atras}</Text>
        </Animated.View>
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