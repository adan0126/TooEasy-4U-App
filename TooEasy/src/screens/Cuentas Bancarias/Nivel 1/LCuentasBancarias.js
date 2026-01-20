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
    frente: "¿Qué es una cuenta de ahorro?",
    atras: "Es un producto financiero que permite guardar dinero de forma segura y ganar intereses.",
    },
  {
    id: "2",
    frente: "¿Para qué sirve una cuenta de ahorro?",
    atras: "Para resguardar dinero, permitir retiros cuando los necesites y generar intereses.",
    },
  {
    id: "3",
    frente: "¿Qué significa que una cuenta tenga liquidez?",
    atras: "Que puedes usar o retirar tu dinero cuando lo necesites, aunque algunas cuentas pueden limitar retiros.",
    },
  {
    id: "4",
    frente: "Primer paso para abrir una cuenta de ahorro",
    atras: "Elegir una institución financiera confiable y revisar sus costos y servicios.",
    },
  {
    id: "5",
    frente: "Requisitos comunes para abrir una cuenta de ahorro",
    atras: "Identificación oficial, comprobante de domicilio, CURP/RFC, cumplir edad mínima y realizar depósito inicial.",
    },
  {
    id: "6",
    frente: "¿Qué debes revisar antes de firmar?",
    atras: "El contrato o documento de adhesión: comisiones, intereses, límites y condiciones.",
    },
  {
    id: "7",
    frente: "¿Qué pasa después de firmar el contrato?",
    atras: "El banco abre tu cuenta y puedes comenzar a depositar, retirar y usar los servicios.",
    },
  {
    id: "8",
    frente: "¿Qué son los límites de operación?",
    atras: "Restricciones en número de retiros u operaciones sin costo que puede tener una cuenta.",
    },
  {
    id: "9",
    frente: "¿Qué es una cuenta de ahorro sin chequera?",
    atras: "Una cuenta básica para ahorrar sin emitir cheques, ideal para uso simple.",
    },
  {
    id: "10",
    frente: "¿Qué es una cuenta de ahorro programada?",
    atras: "Una cuenta donde apartas automáticamente un monto mensual para una meta específica.",
   },
  {
    id: "11",
    frente: "¿Qué son los intereses variables?",
    atras: "Cuando la tasa de interés puede cambiar según las condiciones del mercado.",
    },
  {
    id: "12",
    frente: "¿Qué son las comisiones bancarias?",
    atras: "Cargos por servicios como mantenimiento, inactividad, transferencias o estados de cuenta.",
    },
  {
    id: "13",
    frente: "¿Qué es la comisión por inactividad?",
    atras: "Cargo que cobra el banco cuando tu cuenta no tiene movimientos por un tiempo.",
    },
  {
    id: "14",
    frente: "¿Qué es la comisión por saldo mínimo?",
    atras: "Penalización que se cobra si no mantienes un saldo promedio requerido.",
    },
  {
    id: "15",
    frente: "¿Qué es la tasa de interés?",
    atras: "Porcentaje que el banco paga por el dinero que mantienes depositado.",
     },
  {
    id: "16",
    frente: "¿Qué es el CAT (Costo Anual Total)?",
    atras: "Indicador que muestra el costo real de un producto financiero, incluyendo intereses y comisiones.",
   },
  {
    id: "17",
    frente: "¿El dinero en una cuenta está protegido?",
    atras: "Sí, si el banco está regulado por autoridades financieras del país.",
    },
  {
    id: "18",
    frente: "¿Qué es un estado de cuenta?",
    atras: "Es un documento que muestra tus depósitos, retiros y el saldo disponible.",
    },
  {
    id: "19",
    frente: "¿Qué es la liquidez?",
    atras: "La facilidad con la que puedes retirar tu dinero sin complicaciones.",
    },
  {
    id: "20",
    frente: "¿Qué es el CAT?",
    atras: "El Costo Anual Total, que muestra el costo real de un producto financiero.",
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
          onPress={() => navigation.navigate("PCuentasBancarias1")}
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
