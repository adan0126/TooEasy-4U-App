import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Función auxiliar para mapear la letra de la respuesta correcta al índice numérico
const mapRespuestaCorrecta = (letra) => {
  switch (letra) {
    case "A":
      return 0;
    case "B":
      return 1;
    case "C":
      return 2;
    default:
      return 0;
  }
};

// 🛑 Componente renombrado a PDeudasyCreditos2Screen
export default function PDeudasyCreditos2Screen({ navigation }) {
  // ----------------------------------------------------------
  // ARRAY DE PREGUNTAS (ACTUALIZADO CON INFO DE HISTORIAL CREDITICIO)
  // ----------------------------------------------------------
  const preguntas = [
    {
      id: "1",
      pregunta: "¿Qué es el historial crediticio?",
      opciones: [
        "Un documento de tus ingresos mensuales.",
        "Un registro de cómo pagas tus deudas y créditos.",
        "Un resumen de tus gastos diarios."
      ],
      correcta: mapRespuestaCorrecta("B"), // 1
    },
    {
      id: "2",
      pregunta: "Un buen historial crediticio te permite acceder a mejores condiciones en préstamos. Verdadero o falso:",
      opciones: [
        "Verdadero",
        "Falso"
      ],
      correcta: mapRespuestaCorrecta("A"), // 0
    },
    {
      id: "3",
      pregunta: "¿Qué hábito ayuda a mantener un historial positivo?",
      opciones: [
        "Pagar solo el mínimo.",
        "Pagar siempre a tiempo.",
        "No revisar tus estados de cuenta."
      ],
      correcta: mapRespuestaCorrecta("B"), // 1
    },
    {
      id: "4",
      pregunta: "¿Qué porcentaje del ingreso mensual se recomienda no exceder en deudas?",
      opciones: [
        "30%",
        "60%",
        "90%"
      ],
      correcta: mapRespuestaCorrecta("A"), // 0
    },
    {
      id: "5",
      pregunta: "¿Qué ocurre si no pagas tus deudas puntualmente?",
      opciones: [
        "Mejora tu score crediticio.",
        "No afecta tu historial.",
        "Se daña tu historial y puede impedir futuros préstamos."
      ],
      correcta: mapRespuestaCorrecta("C"), // 2
    }
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
      // 🛑 Navegación a "DMenu"
      navigation.navigate("DMenu"); // Finaliza y regresa al menú principal de Deudas
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Preguntas de Repaso (2/4)</Text>

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

// ---------------------- ESTILOS ---------------------- (Sin cambios)
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