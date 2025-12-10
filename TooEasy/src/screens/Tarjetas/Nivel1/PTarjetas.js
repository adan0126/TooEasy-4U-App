import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function PreguntasRepasoScreen({ navigation }) {
  // ----------------------------------------------------------
  // ARRAY DE PREGUNTAS (ACTUALIZADO CON INFO DE TARJETAS DE CRÉDITO)
  // ----------------------------------------------------------
  const preguntas = [
    {
      id: "1",
      pregunta: "¿Qué es una tarjeta de crédito?",
      opciones: [
        "Una tarjeta que permite gastar solo el dinero disponible en tu cuenta.",
        "Una tarjeta que permite usar dinero prestado por el banco para hacer compras y pagarlo después.",
        "Una tarjeta exclusiva para retirar efectivo."
      ],
      correcta: 1, // Equivale a la opción B
    },
    {
      id: "2",
      pregunta: "¿Qué ocurre si pagas el total de tu tarjeta de crédito antes de la fecha límite?",
      opciones: [
        "Se te cobran intereses.",
        "No se generan intereses.",
        "El banco te cobra una comisión extra."
      ],
      correcta: 1, // Equivale a la opción B
    },
    {
      id: "3",
      pregunta: "Las compras con tarjeta de crédito se descuentan inmediatamente del saldo de tu cuenta bancaria. Verdadero o falso:",
      opciones: [
        "Verdadero",
        "Falso"
      ],
      correcta: 1, // Equivale a la opción B (Falso)
    },
    {
      id: "4",
      pregunta: "¿Cuál de las siguientes opciones describe mejor la diferencia entre una tarjeta de crédito y una de débito?",
      opciones: [
        "La tarjeta de crédito usa dinero prestado y la de débito usa dinero propio.",
        "Ambas funcionan igual, pero la de crédito tiene más comisiones.",
        "La de crédito sirve solo para compras en línea."
      ],
      correcta: 0, // Equivale a la opción A
    },
    {
      id: "5",
      pregunta: "¿Qué práctica ayuda a mantener una buena salud financiera con una tarjeta de crédito?",
      opciones: [
        "Pagar únicamente el mínimo cada mes.",
        "Retirar efectivo con frecuencia.",
        "Pagar el total del estado de cuenta antes de la fecha límite."
      ],
      correcta: 2, // Equivale a la opción C
    },
  ];

  const [preguntaIndex, setPreguntaIndex] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);

  const preguntaActual = preguntas[preguntaIndex];

  const seleccionarRespuesta = (idx) => {
    if (respuestaSeleccionada !== null) return;

    setRespuestaSeleccionada(idx);
    setRespuestaCorrecta(preguntaActual.correcta);
  };

  const siguientePregunta = () => {
    if (preguntaIndex + 1 < preguntas.length) {
      setPreguntaIndex(preguntaIndex + 1);
      setRespuestaSeleccionada(null);
      setRespuestaCorrecta(null);
    } else {
      navigation.navigate("TMenu"); // Finaliza
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Preguntas de Repaso</Text>

      <Text style={styles.pregunta}>{preguntaActual.pregunta}</Text>

      {preguntaActual.opciones.map((opcion, idx) => {
        const esSeleccionada = idx === respuestaSeleccionada;
        const esCorrecta = idx === respuestaCorrecta;

        let estiloOpcion = styles.opcion;

        if (respuestaSeleccionada !== null) {
          if (esCorrecta) estiloOpcion = styles.correcta;
          else if (esSeleccionada) estiloOpcion = styles.incorrecta;
        }

        return (
          <TouchableOpacity
            key={idx}
            style={estiloOpcion}
            onPress={() => seleccionarRespuesta(idx)}
          >
            <Text style={styles.opcionTxt}>{opcion}</Text>
          </TouchableOpacity>
        );
      })}

      {respuestaSeleccionada !== null && (
        <TouchableOpacity
          style={styles.btnContinuar}
          onPress={siguientePregunta}
        >
          <Text style={styles.btnContinuarTxt}>
            {preguntaIndex + 1 < preguntas.length
              ? "Siguiente"
              : "Terminar"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ---------------------- ESTILOS ----------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    padding: 20,
    justifyContent: "center", // Centra el contenido verticalmente si es poco texto
  },

  titulo: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },

  pregunta: {
    color: "#E0E1DD",
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },

  opcion: {
    backgroundColor: "#415A77",
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
  },

  correcta: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
  },

  incorrecta: {
    backgroundColor: "#E63946",
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
  },

  opcionTxt: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
  },

  btnContinuar: {
    marginTop: 20,
    backgroundColor: "#1B263B",
    padding: 14,
    borderRadius: 10,
  },

  btnContinuarTxt: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});