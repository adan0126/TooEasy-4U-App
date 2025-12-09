// Pantalla de preguntas de repaso para el nivel 1 de Fundamentos

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

export default function PreguntasRepasoScreen({ navigation }) {
  // ----------------------------------------------------------
  // ARRAY DE PREGUNTAS
  // ----------------------------------------------------------
 const preguntas = [
  {
    id: "1",
    pregunta: "Una cuenta de ahorro solo sirve para guardar dinero y no genera ningún tipo de rendimiento.",
    opciones: [
      "VERDADERO",
      "FALSO"
    ],
    correcta: 1, // Falso
  },
  {
    id: "2",
    pregunta: "Para abrir una cuenta de ahorro es necesario presentar una identificación oficial y un comprobante de domicilio.",
    opciones: [
      "VERDADERO",
      "FALSO"
    ],
    correcta: 0, // Verdadero
  },
  {
    id: "3",
    pregunta: "¿Cuál de las siguientes opciones describe mejor una cuenta de ahorro?",
    opciones: [
      "Una cuenta para pagar con cheques y recibir depósitos de nómina.",
      "Una cuenta que permite ahorrar dinero, obtener intereses y retirar cuando sea necesario.",
      "Una cuenta exclusiva para préstamos bancarios.",
      "Una cuenta sin acceso a tu dinero hasta los 5 años."
    ],
    correcta: 1, // opción B
  },
  {
    id: "4",
    pregunta: "¿Qué documento es importante leer antes de firmar al abrir tu primera cuenta bancaria?",
    opciones: [
      "El comprobante de domicilio.",
      "El contrato o documento de adhesión del banco.",
      "Tu historial crediticio.",
      "El estado de cuenta mensual."
    ],
    correcta: 1, // opción B
  },
  {
    id: "5",
    pregunta: "Todas las cuentas de ahorro permiten hacer retiros ilimitados sin costo.",
    opciones: [
      "VERDADERO",
      "FALSO"
    ],
    correcta: 1, // Falso
  },
  {
    id: "6",
    pregunta: "Según CONDUSEF, ¿qué significa comisión por inactividad?",
    opciones: [
      "El cobro por usar demasiado la cuenta.",
      "El cobro por no tener movimientos durante cierto tiempo.",
      "El interés que te paga el banco por ahorrar.",
      "Un beneficio que otorgan por no usar la cuenta."
    ],
    correcta: 1, // opción B
  },
  {
    id: "7",
    pregunta: "Laura abrió su primera cuenta de ahorro y el banco le cobra una comisión mensual de $15 por mantenimiento. Esto significa que:",
    opciones: [
      "Le descuentan $15 cada mes por tener activa su cuenta.",
      "Le pagan $15 mensuales como premio por ahorrar.",
      "Solo debe pagar si retira dinero.",
      "Es un error del sistema."
    ],
    correcta: 0, // opción A
  },
  {
    id: "8",
    pregunta: "El dinero depositado en una cuenta de ahorro está protegido si el banco está regulado por autoridades financieras.",
    opciones: [
      "VERDADERO",
      "FALSO"
    ],
    correcta: 0, // Verdadero
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
      navigation.navigate("CBMenu"); // Finaliza
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
