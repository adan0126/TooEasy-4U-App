// Pantalla de flashcards para los fundamentos - Ingreso

import React, { useRef, useState, uneMemo
 } from "react";
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
      frente: "¿Qué es un ingreso?",
      atras:
        "Un ingreso es todo el dinero que entra a tu bolsillo o cuenta bancaria, proveniente de cualquier fuente. En otras palabras, representa el aumento en tus recursos económicos. Los ingresos pueden tener distintas procedencias: salario, propinas, rentas, comisiones, pensiones, premios o incluso regalos en efectivo.",
    },
    {
      id: "2",
      frente: "Tipos de ingresos",
      atras:
        "Existen dos tipos principales de ingresos: Ingresos fijos: Son los que recibes de manera regular y predecible, como un sueldo mensual, una pensión o una renta fija. Ingresos variables: Son los que no se repiten cada mes o cuyo monto cambia constantemente. Por ejemplo, una comisión por ventas, una propina o la ganancia por vender algo de segunda mano.",
    },
    {
      id: "3",
      frente: "¿Qué es un egereso o gasto?",
      atras:
        "Un egreso (también llamado gasto) es el dinero que sale de tu presupuesto para pagar bienes o servicios. Cada vez que compras algo o cubres una obligación, estás haciendo un egreso. BBVA explica que los egresos reducen tu patrimonio, ya que representan las salidas de recursos.",
    },
    {
      id: "4",
      frente: "Tipos de gastos",
      atras: "Se clasifican principalmente en dos tipos: Gastos fijos: Son los que se repiten con la misma cantidad o frecuencia. Por ejemplo, el pago de la renta, la luz, el transporte o la colegiatura. Estos gastos son previsibles y deben cubrirse cada mes. Gastos variables: Son los que cambian según tus decisiones o circunstancias. Por ejemplo, salir a comer fuera, comprar ropa o pagar un servicio extra. Aunque parecen pequeños, “si no se controlan, pueden afectar tus finanzas”."
    },
    {
      id: "5",
      frente: "Tip Financiero",
      atras: "La clave de una buena salud financiera está en mantener un equilibrio entre lo que ganas y lo que gastas. Si tus ingresos son mayores que tus gastos, tendrás un excedente, lo que te permite ahorrar o invertir. Si ocurre lo contrario, y gastas más de lo que ganas, generarás déficit y posiblemente deudas. Un presupuesto personal sirve precisamente para vigilar este equilibrio: registrar tus ingresos y tus egresos te ayuda a identificar en qué se va tu dinero y cómo puedes mejorar tu manejo financiero."
    }
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
          onPress={() => navigation.navigate("PFundamentos1")}
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
// 🔥 COMPONENTE FLASHCARD con animación de FLIP
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
    height: 300,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backfaceVisibility: "hidden",
    position: "absolute",
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
