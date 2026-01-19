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
      frente: "¿Qué es una tarjeta de débito?",
      atras:
        "Una tarjeta de débito es un medio de pago vinculado directamente a una cuenta bancaria.\n\nPermite realizar compras en comercios físicos y en línea, así como retirar efectivo en cajeros automáticos.\n\nEl importe de cada operación se descuenta de forma inmediata del saldo disponible en la cuenta asociada.\n\nSi no hay suficiente saldo, la operación no se puede realizar. (Fuente: BBVA)",
    },
    {
      id: "2",
      frente: "Características principales",
      atras:
        "Características principales:\n• Acceso directo a tu dinero: Solo puedes gastar lo que tienes disponible en tu cuenta.\n• Seguridad: Requiere el uso de un PIN para autorizar transacciones, protegiendo tus fondos.\n• Control de gastos: Facilita el seguimiento de tus compras y retiros, ayudando a mantener un presupuesto equilibrado.\n• Uso nacional e internacional: Puedes utilizarla en cualquier lugar que acepte tarjetas de débito, tanto en tu país como en el extranjero.",
    },
    {
      id: "3",
      frente: "Ventajas de la tarjeta de débito",
      atras:
        "Ventajas de la tarjeta de débito:\n• Sin deudas: Al no permitir gastar más de lo disponible, evita la acumulación de deudas.\n• Comodidad: Elimina la necesidad de llevar efectivo, ofreciendo una forma rápida y segura de pagar.\n• Accesibilidad: Disponible para la mayoría de las personas, incluso sin historial crediticio.\n• Control financiero: Ayuda a mantener un control estricto sobre los gastos, favoreciendo una mejor salud financiera.",
    },
    {
      id: "4",
      frente: "¿Cómo usar una tarjeta de débito?",
      atras:
        "¿Cómo usar una tarjeta de débito?\n1. Compras en comercios: Al pagar, selecciona la opción 'pago con tarjeta' y sigue las instrucciones en el terminal punto de venta (TPV).\n2. Compras en línea: Introduce los datos de tu tarjeta en el sitio web del comercio, asegurándote de que sea un sitio seguro.\n3. Retiros en cajeros automáticos: Introduce tu tarjeta, ingresa tu PIN y selecciona la opción de retiro de efectivo.",
    },
    {
      id: "5",
      frente: "Recomendaciones de uso",
      atras:
        "Recomendaciones de uso:\n• Mantén tu tarjeta segura: No compartas tu PIN ni los datos de tu tarjeta con nadie.\n• Revisa tus estados de cuenta: Monitorea regularmente tus transacciones para detectar cualquier actividad sospechosa.\n• Evita compartir tu información bancaria: No envíes datos de tu tarjeta por correo electrónico o mensajes no seguros.\n• Utiliza cajeros automáticos seguros: Prefiere aquellos ubicados en lugares bien iluminados y con vigilancia.",
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
          onPress={() => navigation.navigate("PTarjetas2")}
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
