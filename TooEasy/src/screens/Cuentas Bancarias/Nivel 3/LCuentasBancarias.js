// Pantalla de flashcards para los fundamentos - Ingreso

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

export default function FundamentosLeccionScreen({ navigation }) {
  // -------------------------------------------
  // Aquí defines las tarjetas de la lección
  // -------------------------------------------
  const tarjetas = [
  {
    id: "1",
    frente: "¿Qué son los intereses?",
    atras: "Son el costo del dinero: puedes pagarlos si pides un préstamo, o recibirlos si ahorras.",
    imagenFrente: require("../../../../img/tarjetaFrente1.png"),
    imagenAtras: require("../../../../img/tarjetaDetras1.png"),
  },
  {
    id: "2",
    frente: "¿Cuándo pagas intereses?",
    atras: "Cuando el banco te presta dinero en un crédito o préstamo.",
    imagenFrente: require("../../../../img/tarjetaFrente2.png"),
    imagenAtras: require("../../../../img/tarjetaDetras2.png"),
  },
  {
    id: "3",
    frente: "¿Cuándo recibes intereses?",
    atras: "Cuando depositas o ahorras dinero en el banco.",
    imagenFrente: require("../../../../img/tarjetaFrente3.png"),
    imagenAtras: require("../../../../img/tarjetaDetras3.png"),
  },
  {
    id: "4",
    frente: "¿Qué es el interés activo?",
    atras: "Es el interés que el banco cobra cuando presta dinero a un cliente.",
    imagenFrente: require("../../../../img/tarjetaFrente4.png"),
    imagenAtras: require("../../../../img/tarjetaDetras4.png"),
  },
  {
    id: "5",
    frente: "¿Qué es el interés pasivo?",
    atras: "Es el interés que el banco paga a los clientes por ahorrar o invertir.",
    imagenFrente: require("../../../../img/tarjetaFrente5.png"),
    imagenAtras: require("../../../../img/tarjetaDetras5.png"),
  },
  {
    id: "6",
    frente: "¿Qué es el interés simple?",
    atras: "Se calcula solo sobre el capital inicial depositado o prestado.",
    imagenFrente: require("../../../../img/tarjetaFrente6.png"),
    imagenAtras: require("../../../../img/tarjetaDetras6.png"),
  },
  {
    id: "7",
    frente: "¿Qué es el interés compuesto?",
    atras: "Se calcula sobre el capital y los intereses acumulados previamente.",
    imagenFrente: require("../../../../img/tarjetaFrente7.png"),
    imagenAtras: require("../../../../img/tarjetaDetras7.png"),
  },
  {
    id: "8",
    frente: "¿Qué son las comisiones bancarias?",
    atras: "Son cobros por usar servicios o mantener una cuenta activa.",
    imagenFrente: require("../../../../img/tarjetaFrente8.png"),
    imagenAtras: require("../../../../img/tarjetaDetras1.png"),
  },
  {
    id: "9",
    frente: "¿Por qué los bancos cobran comisiones?",
    atras: "Para cubrir costos de operación, mantenimiento y servicio.",
    imagenFrente: require("../../../../img/tarjetaFrente9.png"),
    imagenAtras: require("../../../../img/tarjetaDetras2.png"),
  },
  {
    id: "10",
    frente: "¿Qué es una comisión por manejo de cuenta?",
    atras: "Cobro por mantener la cuenta activa sin importar si la usas o no.",
    imagenFrente: require("../../../../img/tarjetaFrente10.png"),
    imagenAtras: require("../../../../img/tarjetaDetras3.png"),
  },
  {
    id: "11",
    frente: "¿Qué es una comisión por inactividad?",
    atras: "Cobro cuando la cuenta no tiene movimientos por un periodo.",
    imagenFrente: require("../../../../img/tarjetaFrente11.png"),
    imagenAtras: require("../../../../img/tarjetaDetras4.png"),
  },
  {
    id: "12",
    frente: "¿Qué es una comisión por usar cajeros de otro banco?",
    atras: "Es un cobro por retirar dinero en un cajero que no pertenece a tu banco.",
    imagenFrente: require("../../../../img/tarjetaFrente1.png"),
    imagenAtras: require("../../../../img/tarjetaDetras5.png"),
  },
  {
    id: "13",
    frente: "¿Qué es una comisión por saldo mínimo?",
    atras: "Se cobra si el saldo baja de la cantidad mínima establecida.",
    imagenFrente: require("../../../../img/tarjetaFrente2.png"),
    imagenAtras: require("../../../../img/tarjetaDetras6.png"),
  },
  {
    id: "14",
    frente: "¿Cómo evitar comisiones?",
    atras: "Usa cajeros de tu banco, elige cuentas sin comisiones y mantén la cuenta activa.",
    imagenFrente: require("../../../../img/tarjetaFrente3.png"),
    imagenAtras: require("../../../../img/tarjetaDetras7.png"),
  },
  {
    id: "15",
    frente: "¿Por qué es importante conocer intereses y comisiones?",
    atras: "Para elegir productos financieros adecuados y evitar pagar de más.",
    imagenFrente: require("../../../../img/tarjetaFrente4.png"),
    imagenAtras: require("../../../../img/tarjetaDetras1.png"),
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
          onPress={() => navigation.navigate("PCuentasBancarias3")}
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