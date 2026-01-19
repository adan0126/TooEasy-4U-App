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
      frente: "El ahorro",
      atras:
        "El ahorro es uno de los hábitos más importantes dentro de la educación financiera. Aprender a ahorrar no solo implica guardar dinero, sino saber planificar el uso de tus ingresos para que puedas alcanzar metas y tener tranquilidad ante imprevistos.",
    },
    {
      id: "2",
      frente: "¿Qué es el ahorro?",
      atras:
        "Según BBVA (2024), el ahorro es la parte de tus ingresos que decides no gastar en el presente y que reservas para un uso futuro. Es una forma de priorizar tu bienestar de mañana sobre el placer o consumo inmediato de hoy.Ahorrar no significa dejar de disfrutar, sino gastar de manera consciente y con propósito, evitando compras impulsivas o innecesarias. En otras palabras: ahorrar es pagarle al “yo del futuro”.",
    },
    {
      id: "3",
      frente: "¿Por qué es importante ahorrar?",
      atras:
        "Tener un fondo de dinero reservado te permite: Hacer frente a imprevistos, Cumplir metas personales (comprar un celular, estudiar, viajar o invertir), Evitar deudas, ya que reduces la necesidad de pedir prestado cuando surge un gasto inesperado, Ahorrar también fomenta la disciplina financiera",
    },
    {
      id: "4",
      frente: "Tipos de ahorro",
      atras: "El ahorro puede clasificarse de distintas formas según su propósito: Ahorro a corto, mediano y largo plazo. De pendiendo la meta final se establecen estos horizontes de tiempo. También se puede distinguir entre ahorro formal (en instituciones financieras, con seguridad y generación de intereses) y ahorro informal (guardar dinero en casa o en tandas, sin protección ni rendimiento)."
    },
    {
      id: "5",
      frente: "Como empezar a ahorrar",
      atras: "Primero se define un objetivo de ahorro, registra tus ingresos y gastos para identificar cuanto puedes ahorrar regularmente, puedes automatizar el proceso de ahorro para evitar gastarlo en otras cosas, puedes programar en tu cuenta bancaria una transferencia automática hacia una cuenta de ahorro al recibir tu ingreso. Tip Financiero: Considera el ahorro como un gasto fijo más, no como dinero “sobrante”. De esta forma, lo conviertes en parte de tu rutina financiera."
    }
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
          onPress={() => navigation.navigate("PFundamentos2")}
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
