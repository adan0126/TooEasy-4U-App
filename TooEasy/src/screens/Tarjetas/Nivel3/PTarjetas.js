import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function PreguntasRepasoScreen({ navigation }) {
  // ----------------------------------------------------------
  // ARRAY DE PREGUNTAS (ACTUALIZADO: ORO Y PLATINO)
  // ----------------------------------------------------------
  const preguntas = [
    {
      id: "1",
      pregunta: "¿Qué caracteriza principalmente a las tarjetas de crédito Oro?",
      opciones: [
        "Tienen un límite bajo y no generan recompensas.",
        "Ofrecen beneficios adicionales y un límite de crédito más alto.",
        "Solo se pueden usar en tiendas departamentales."
      ],
      correcta: 1, // Equivale a la opción B
    },
    {
      id: "2",
      pregunta: "Las tarjetas Platino están dirigidas a personas con ingresos altos y excelente historial crediticio. Verdadero o falso:",
      opciones: [
        "Verdadero",
        "Falso"
      ],
      correcta: 0, // Equivale a la opción A (Verdadero)
    },
    {
      id: "3",
      pregunta: "¿Cuál de las siguientes afirmaciones sobre las tarjetas Platino es correcta?",
      opciones: [
        "Tienen comisiones anuales más bajas que las tarjetas básicas.",
        "Ofrecen acceso a servicios premium como salas VIP o seguros de viaje.",
        "No se pueden usar en el extranjero."
      ],
      correcta: 1, // Equivale a la opción B
    },
    {
      id: "4",
      pregunta: "¿Qué diferencia importante existe entre las tarjetas Oro y Platino?",
      opciones: [
        "Las Oro tienen límites y beneficios moderados; las Platino, límites y servicios más altos.",
        "Las Oro son emitidas solo por tiendas, mientras que las Platino no.",
        "Las Platino no generan historial crediticio."
      ],
      correcta: 0, // Equivale a la opción A
    },
    {
      id: "5",
      pregunta: "Las tarjetas Oro y Platino son adecuadas para cualquier persona, incluso si no tiene ingresos estables. Verdadero o falso:",
      opciones: [
        "Verdadero",
        "Falso"
      ],
      correcta: 1, // Equivale a la opción B (Falso)
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
      navigation.navigate("TMenu"); // Finaliza y vuelve al menú
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Repaso: Tarjetas Oro y Platino</Text>

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
    justifyContent: "center",
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