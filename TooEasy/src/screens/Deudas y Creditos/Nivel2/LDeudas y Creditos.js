import React, { useRef, useState, useMemo } from "react";
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

// Imagenes disponibles
export default function FundamentosLeccionScreen({ navigation }) {
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

  const tarjetas = useMemo(() => {
    return tarjetasBase.map((t, i) => ({
      ...t,
      imagenFrente: frontImages[i % frontImages.length],
      imagenAtras: backImages[i % backImages.length],
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
          <FlashCard {...item} />
        )}
      />

      {indexActual === tarjetasBase.length - 1 && (
        <TouchableOpacity
          style={styles.btnRepaso}
          onPress={() => navigation.navigate("PDeudasyCreditos2")}
        >
          <Text style={styles.btnRepasoTxt}>Preguntas de Repaso</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.btnRegresar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnTxt}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
}

function FlashCard({ frente, atras, imagenFrente, imagenAtras }) {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

  const frontRotate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backRotate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const flip = () => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 0 : 180,
      duration: 400,
      useNativeDriver: true,
    }).start(() => setIsFlipped(!isFlipped));
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={flip}
        style={styles.touch}
      >
        {/* FRENTE */}
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ perspective: 1000 }, { rotateY: frontRotate }],
            },
          ]}
        >
          <Image source={imagenFrente} style={styles.img} />
          <Text style={styles.textFront}>{frente}</Text>
        </Animated.View>

        {/* ATRÁS */}
        <Animated.View
          style={[
            styles.card,
            styles.back,
            {
              transform: [{ perspective: 1000 }, { rotateY: backRotate }],
            },
          ]}
        >
          <Image source={imagenAtras} style={styles.img} />
          <Text style={styles.textBack}>{atras}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

// ========================== ESTILOS ==========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
  },

  item: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  touch: {
    width: width * 0.8,
    height: 420,
  },

  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backfaceVisibility: "hidden",
    backgroundColor: "#415A77",
  },

  back: {
    backgroundColor: "#E0E1DD",
  },

  img: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
    marginBottom: 16,
  },

  textFront: {
    color: "#FFF",
    fontSize: 22,
    textAlign: "center",
  },

  textBack: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
  },

  btnRegresar: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#778DA9",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },

  btnTxt: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  btnRepaso: {
    position: "absolute",
    bottom: 110,
    alignSelf: "center",
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

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
