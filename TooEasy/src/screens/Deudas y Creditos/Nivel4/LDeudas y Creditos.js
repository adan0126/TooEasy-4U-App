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
          onPress={() => navigation.navigate("PDeudasyCreditos4")}
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
