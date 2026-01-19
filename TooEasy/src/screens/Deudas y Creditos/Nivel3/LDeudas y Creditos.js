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
          onPress={() => navigation.navigate("PDeudasyCreditos3")}
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
