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
      frente: "Clasificación de Tarjetas",
      atras:
        "Las tarjetas de crédito se clasifican en distintos tipos según los beneficios que ofrecen, el nivel de ingresos del cliente y los servicios adicionales que incluyen.\n\nEl tipo de tarjeta que una persona puede obtener depende de su capacidad de pago, su historial crediticio y la relación con el banco o institución financiera.",
    },
    {
      id: "2",
      frente: "Tarjeta de Crédito Básica",
      atras:
        "1. Tarjeta de crédito básica\nLas tarjetas básicas son las más comunes y accesibles. Están pensadas para personas que comienzan a usar crédito por primera vez o que desean mantener un control sencillo de sus gastos.\nCaracterísticas principales:\n• No exigen un ingreso muy alto para solicitarla.\n• Ofrecen un límite de crédito bajo o moderado.\n• No suelen tener programas de recompensas ni beneficios premium.\n• Cobran comisiones e intereses más simples y transparentes.\n• Son ideales para construir un historial crediticio responsable.\nVentajas:\n• Fácil aprobación.\n• Ideal para usuarios nuevos.\n• Permite aprender a manejar el crédito sin riesgo de endeudamiento excesivo.",
    },
    {
      id: "3",
      frente: "Tarjeta de Crédito Clásica",
      atras:
        "2. Tarjeta de crédito clásica\nLas tarjetas clásicas representan un nivel intermedio. Ofrecen más beneficios que las básicas y están dirigidas a personas con ingresos estables y cierto historial financiero.\nCaracterísticas:\n• Límite de crédito mayor.\n• Pueden incluir programas de puntos, cashback o seguros básicos.\n• Requieren comprobar ingresos y buen comportamiento crediticio.\n• Cobran una comisión anual moderada.\nVentajas:\n• Acceso a promociones y descuentos.\n• Posibilidad de mejorar el puntaje crediticio.\n• Más flexibilidad para compras y pagos a plazos.",
    },
    {
      id: "4",
      frente: "Tarjetas Departamentales",
      atras:
        "3. Tarjetas departamentales\nLas tarjetas departamentales son emitidas por tiendas o comercios específicos (por ejemplo, Liverpool, Sears, Coppel, etc.).\nPermiten comprar dentro de esa tienda y, en algunos casos, en comercios afiliados.\nCaracterísticas:\n• No siempre están respaldadas por un banco.\n• Solo pueden usarse en las tiendas de la marca o sus asociadas.\n• Suelen ofrecer descuentos, meses sin intereses o promociones exclusivas.\n• Los intereses pueden ser más altos si no se paga a tiempo.\nVentajas:\n• Facilitan el acceso al crédito sin necesidad de una cuenta bancaria.\n• Promociones frecuentes para clientes habituales.\n• Son una buena forma de iniciar el historial crediticio.",
    },
    {
      id: "5",
      frente: "Recomendaciones Generales",
      atras:
        "Recomendaciones generales:\n• Compara las opciones antes de solicitar una tarjeta. Analiza tasas, comisiones y beneficios.\n• Usa la tarjeta adecuada para tu situación. Si estás iniciando, comienza con una básica.\n• Evita tener muchas tarjetas a la vez. Demasiadas líneas de crédito pueden afectar tu historial.\n• Paga puntualmente. Retrasos o saldos altos afectan tu score crediticio.",
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
          onPress={() => navigation.navigate("PTarjetas4")}
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
