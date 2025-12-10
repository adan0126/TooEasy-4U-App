// Pantalla de flashcards para Cuentas Bancarias - Nivel 1

import React, { useRef, useState } from "react";
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

export default function CuentasBancariasLeccion1Screen({ navigation }) {
  const tarjetas = [
    {
      id: "1",
      frente: "¿Qué es una cuenta de ahorro?",
      atras: "Es un producto financiero que permite guardar dinero de forma segura y ganar intereses.",
    imagenFrente: require("../../../../img/tarjetaFrente1.png"),
    imagenAtras: require("../../../../img/tarjetaDetras1.png"),
    },
    {
      id: "2",
      frente: "¿Para qué sirve una cuenta de ahorro?",
      atras: "Para resguardar dinero, permitir retiros cuando los necesites y generar intereses.",
    imagenFrente: require("../../../../img/tarjetaFrente2.png"),
    imagenAtras: require("../../../../img/tarjetaDetras2.png"),
    },
    {
      id: "3",
      frente: "¿Qué significa que una cuenta tenga liquidez?",
      atras: "Que puedes usar o retirar tu dinero cuando lo necesites, aunque algunas cuentas pueden limitar retiros.",
    imagenFrente: require("../../../../img/tarjetaFrente3.png"),
    imagenAtras: require("../../../../img/tarjetaDetras3.png"),
    },
    {
      id: "4",
      frente: "Primer paso para abrir una cuenta de ahorro",
      atras: "Elegir una institución financiera confiable y revisar sus costos y servicios.",
    imagenFrente: require("../../../../img/tarjetaFrente4.png"),
    imagenAtras: require("../../../../img/tarjetaDetras4.png"),
    },
    {
      id: "5",
      frente: "Requisitos comunes para abrir una cuenta de ahorro",
      atras: "Identificación oficial, comprobante de domicilio, CURP/RFC, cumplir edad mínima y realizar depósito inicial.",
    imagenFrente: require("../../../../img/tarjetaFrente5.png"),
    imagenAtras: require("../../../../img/tarjetaDetras5.png"),
    },
    {
      id: "6",
      frente: "¿Qué debes revisar antes de firmar?",
      atras: "El contrato o documento de adhesión: comisiones, intereses, límites y condiciones.",
    imagenFrente: require("../../../../img/tarjetaFrente6.png"),
    imagenAtras: require("../../../../img/tarjetaDetras6.png"),
    },
    {
      id: "7",
      frente: "¿Qué pasa después de firmar el contrato?",
      atras: "El banco abre tu cuenta y puedes comenzar a depositar, retirar y usar los servicios.",
    imagenFrente: require("../../../../img/tarjetaFrente7.png"),
    imagenAtras: require("../../../../img/tarjetaDetras7.png"),
    },
    {
      id: "8",
      frente: "¿Qué son los límites de operación?",
      atras: "Restricciones en número de retiros u operaciones sin costo que puede tener una cuenta.",
    imagenFrente: require("../../../../img/tarjetaFrente8.png"),
    imagenAtras: require("../../../../img/tarjetaDetras1.png"),
    },
    {
      id: "9",
      frente: "¿Qué es una cuenta de ahorro sin chequera?",
      atras: "Una cuenta básica para ahorrar sin emitir cheques, ideal para uso simple.",
    imagenFrente: require("../../../../img/tarjetaFrente9.png"),
    imagenAtras: require("../../../../img/tarjetaDetras2.png"),
    },
    {
      id: "10",
      frente: "¿Qué es una cuenta de ahorro programada?",
      atras: "Una cuenta donde apartas automáticamente un monto mensual para una meta específica.",
    imagenFrente: require("../../../../img/tarjetaFrente10.png"),
    imagenAtras: require("../../../../img/tarjetaDetras3.png"),
    },
    {
      id: "11",
      frente: "¿Qué son los intereses variables?",
      atras: "Cuando la tasa de interés puede cambiar según las condiciones del mercado.",
    imagenFrente: require("../../../../img/tarjetaFrente11.png"),
    imagenAtras: require("../../../../img/tarjetaDetras4.png"),
    },
    {
      id: "12",
      frente: "¿Qué son las comisiones bancarias?",
      atras: "Cargos por servicios como mantenimiento, inactividad, transferencias o estados de cuenta.",
    imagenFrente: require("../../../../img/tarjetaFrente1.png"),
    imagenAtras: require("../../../../img/tarjetaDetras5.png"),
    },
    {
      id: "13",
      frente: "¿Qué es la comisión por inactividad?",
      atras: "Cargo que cobra el banco cuando tu cuenta no tiene movimientos por un tiempo.",
    imagenFrente: require("../../../../img/tarjetaFrente2.png"),
    imagenAtras: require("../../../../img/tarjetaDetras6.png"),
    },
    {
      id: "14",
      frente: "¿Qué es la comisión por saldo mínimo?",
      atras: "Penalización que se cobra si no mantienes un saldo promedio requerido.",
    imagenFrente: require("../../../../img/tarjetaFrente3.png"),
    imagenAtras: require("../../../../img/tarjetaDetras7.png"),
    },
    {
      id: "15",
      frente: "¿Qué es la tasa de interés?",
      atras: "Porcentaje que el banco paga por el dinero que mantienes depositado.",
    imagenFrente: require("../../../../img/tarjetaFrente4.png"),
    imagenAtras: require("../../../../img/tarjetaDetras1.png"),
    },
    {
      id: "16",
      frente: "¿Qué es el CAT (Costo Anual Total)?",
      atras: "Indicador que muestra el costo real de un producto financiero, incluyendo intereses y comisiones.",
    imagenFrente: require("../../../../img/tarjetaFrente5.png"),
    imagenAtras: require("../../../../img/tarjetaDetras2.png"),
    },
    {
      id: "17",
      frente: "¿El dinero en una cuenta está protegido?",
      atras: "Sí, si el banco está regulado por autoridades financieras del país.",
    imagenFrente: require("../../../../img/tarjetaFrente6.png"),
    imagenAtras: require("../../../../img/tarjetaDetras3.png"),
    },
    {
      id: "18",
      frente: "¿Qué es un estado de cuenta?",
      atras: "Es un documento que muestra tus depósitos, retiros y el saldo disponible.",
    imagenFrente: require("../../../../img/tarjetaFrente7.png"),
    imagenAtras: require("../../../../img/tarjetaDetras4.png"),
    },
    {
      id: "19",
      frente: "¿Qué es la liquidez?",
      atras: "La facilidad con la que puedes retirar tu dinero sin complicaciones.",
    imagenFrente: require("../../../../img/tarjetaFrente8.png"),
    imagenAtras: require("../../../../img/tarjetaDetras5.png"),
    },
    {
      id: "20",
      frente: "¿Qué es el CAT?",
      atras: "El Costo Anual Total, que muestra el costo real de un producto financiero.",
    imagenFrente: require("../../../../img/tarjetaFrente9.png"),
    imagenAtras: require("../../../../img/tarjetaDetras6.png"),
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
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndexActual(index);
        }}
        renderItem={({ item }) => (
          <FlashCard
            frente={item.frente}
            atras={item.atras}
            imagenFrente={item.imagenFrente}
            imagenAtras={item.imagenAtras}
          />
        )}
      />

      {/* Botón que aparece al final */}
      {indexActual === tarjetas.length - 1 && (
        <TouchableOpacity
          style={styles.btnRepaso}
          onPress={() => navigation.navigate("PCuentasBancarias1")}
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
// 🔥 COMPONENTE FLASHCARD con animación + imágenes
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
    }).start(() => setLadoFrente(!ladoFrente));
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
          {imagenFrente && (
            <Image source={imagenFrente} style={styles.img} resizeMode="contain" />
          )}
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
          {imagenAtras && (
            <Image source={imagenAtras} style={styles.img} resizeMode="contain" />
          )}
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
    minHeight: 300,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backfaceVisibility: "hidden",
    position: "absolute",
  },
  img: {
    width: "70%",
    height: 140,
    marginBottom: 15,
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