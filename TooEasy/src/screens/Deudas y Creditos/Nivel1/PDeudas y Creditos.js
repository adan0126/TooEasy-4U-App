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

// 🛑 Componente renombrado a PDeudasyCreditos1Screen
export default function PDeudasyCreditos1Screen({ navigation }) {
  // ----------------------------------------------------------
  // ARRAY DE PREGUNTAS (ACTUALIZADO CON INFO DE CRITERIOS DE CRÉDITO)
  // ----------------------------------------------------------
  // NOTA: Se ha adaptado la estructura de tus preguntas a la estructura del componente.
  const preguntas = [
    {
      id: "1",
      pregunta: "¿Qué analiza un banco antes de aprobar un préstamo?",
      opciones: [
        "Solo la edad del solicitante.",
        "El historial crediticio, ingresos y capacidad de pago.",
        "El tipo de tarjeta que usa."
      ],
      correcta: mapRespuestaCorrecta("B"), // 1
    },
    {
      id: "2",
      pregunta: "Un historial crediticio positivo aumenta las posibilidades de obtener un préstamo. Verdadero o falso:",
      opciones: [
        "Verdadero",
        "Falso"
      ],
      correcta: mapRespuestaCorrecta("A"), // 0
    },
    {
      id: "3",
      pregunta: "¿Qué documento suele pedirse al solicitar un crédito?",
      opciones: [
        "Comprobante de ingresos.",
        "Contrato de renta.",
        "Boleta escolar."
      ],
      correcta: mapRespuestaCorrecta("A"), // 0
    },
    {
      id: "4",
      pregunta: "¿Qué práctica puede hacer que te nieguen un préstamo?",
      opciones: [
        "Pagar siempre a tiempo.",
        "Tener demasiadas deudas activas.",
        "Tener un ahorro constante."
      ],
      correcta: mapRespuestaCorrecta("B"), // 1
    },
    {
      id: "5",
      pregunta: "¿Por qué es importante la relación con el banco?",
      opciones: [
        "Porque los clientes confiables pueden recibir mejores condiciones.",
        "Porque el banco regala dinero.",
        "Porque no influye en la aprobación."
      ],
      correcta: mapRespuestaCorrecta("A"), // 0
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
      // 🛑 Se ha cambiado la navegación a "DMenu"
      navigation.navigate("DMenu"); // Finaliza y regresa al menú principal de Deudas
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Preguntas de Repaso (1/4)</Text>

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