import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function TarjetasLeccionScreen({ navigation }) {
  // -------------------------------------------
  // Aquí defines las tarjetas de la lección
  // (Información actualizada: Tarjetas de Débito)
  // -------------------------------------------
  const tarjetas = [
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
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setIndexActual(index);
        }}
        renderItem={({ item }) => (
          <FlashCard frente={item.frente} atras={item.atras} />
        )}
      />

      {/* 🌟 SOLO aparece al finalizar todas las tarjetas */}
      {/* 🛑 Se ha cambiado la navegación a "PTarjetas2" */}
      {indexActual === tarjetas.length - 1 && (
        <TouchableOpacity
          style={styles.btnRepaso}
          onPress={() => navigation.navigate("PTarjetas2")}
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
function FlashCard({ frente, atras }) {
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

  const estiloFrente = {
    transform: [{ rotateY: rotacionFrente }, { perspective: 1000 }],
    opacity: ladoFrente ? 1 : 0,
  };

  const estiloAtras = {
    transform: [{ rotateY: rotacionAtras }, { perspective: 1000 }],
    opacity: ladoFrente ? 0 : 1,
  };

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity activeOpacity={1} onPress={flipCard}>
        {/* Frente */}
        {ladoFrente && (
          <Animated.View
            style={[
              styles.card,
              styles.cardFrente,
              estiloFrente,
            ]}
          >
            <Text style={styles.cardText}>{frente}</Text>
          </Animated.View>
        )}

        {/* Reverso */}
        {!ladoFrente && (
          <Animated.View
            style={[
              styles.card,
              styles.cardAtras,
              estiloAtras,
              { position: 'absolute' },
            ]}
          >
            {/* Ajuste de estilo para texto largo en el reverso */}
            <Text style={styles.cardTextAtras}>{atras}</Text>
          </Animated.View>
        )}
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
    width: width * 0.85, // Un poco más ancho para que quepa bien el texto
    height: 450, // Un poco más alto para la info detallada
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backfaceVisibility: "hidden",
    position: "absolute",
  },

  cardFrente: { backgroundColor: "#415A77" },
  cardAtras: { backgroundColor: "#E0E1DD" },

  cardText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF"
  },

  cardTextAtras: {
    textAlign: "left", // Mejor lectura para listas
    fontSize: 16, // Letra un poco más pequeña para que quepa todo
    color: "#000",
    lineHeight: 22 // Espaciado para legibilidad
  },

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