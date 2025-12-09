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
      pregunta: "La cuenta de nómina sirve principalmente para recibir el pago del salario de un trabajador",
      opciones: [
        "VERDADERO",
        "FALSO",
      ],
      correcta: 0,
    },
    {
      id: "2",
      pregunta: "Todas las cuentas de nómina cobran comisiones por manejo y apertura.",
      opciones: [
        "VERDADERO",
        "FALSO"
      ],
      correcta: 1,
    },
    {
      id: "3",
      pregunta: "¿Cuál de las siguientes es una característica principal de una cuenta de nómina?",
      opciones: [
        "Se usa para ahorrar a largo plazo.",
        "Se utiliza para recibir el sueldo y hacer pagos con tarjeta de débito. ",
        "Requiere un monto mínimo alto para abrirse.",
        "Solo se puede usar para retirar efectivo."
      ],
      correcta: 1,
    },
    {
      id: "4",
      pregunta: "¿Qué sucede si una cuenta de nómina deja de recibir depósitos del salario durante varios meses?",
      opciones: [
        "El banco la convierte en una cuenta de ahorro y puede empezar a cobrar comisiones.",
        "Se cierra automáticamente sin aviso",
        "El dinero se transfiere al patrón.",
        "No hay ningún cambio"
      ],
      correcta: 0,
    },
    {
      id: "5",
      pregunta: "La empresa para la que trabajas puede obligarte a tener tu nómina en el banco que ella elija. ",
      opciones: [
        "VERDADERO",
        "FALSO",
      ],
      correcta: 1,
    },
    {
      id: "6",
      pregunta: "¿Cuál de las siguientes afirmaciones es una ventaja de tener una cuenta de nómina?",
      opciones: [
        "No puedes usarla para compras.",
        "Evita cargar dinero en efectivo y facilita recibir tu salario.",
        "Cobra comisiones cada que te depositan.",
        "No te permite acceder a servicios financieros."
      ],
      correcta: 1,
    },
    {
      id: "7",
      pregunta: "Pedro recibe su sueldo en una cuenta de nómina BBVA y quiere cambiarlo a otro banco porque le ofrecen más beneficios. ¿Qué debe hacer? ",
      opciones: [
        "Pedir permiso a su jefe.",
        "Solicitar la portabilidad de nómina al nuevo banco.",
        "Cerrar su cuenta actual sin aviso.",
        "Esperar a que termine el año fiscal."
      ],
      correcta: 1,
    },
    {
      id: "8",
      pregunta: "Las cuentas de nómina suelen incluir una tarjeta de débito que permite retirar efectivo o hacer pagos. ",
      opciones: [
        "VERDADERO",
        "FALSO",
      ],
      correcta: 0,
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
