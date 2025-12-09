import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PreguntasAdminDineroNivel1({ navigation }) {
  // AQUÍ VAS A PEGAR LAS PREGUNTAS DE ESTE TEMA Y NIVEL
 // Dentro de src/screens/AdminDinero/Nivel1/PAdminDinero.js
// Reemplaza SOLO el arreglo preguntas por esto:
  const preguntas = [
    {
      id: "1",
      pregunta:
        "Organizar tu sueldo significa decidir desde el principio cómo usarás tu ingreso para cubrir necesidades, deseos y ahorro.",
      opciones: ["VERDADERO", "FALSO"],
      correcta: 0,
    },
    {
      id: "2",
      pregunta: "¿Qué describe mejor el principio de dividir ingresos?",
      opciones: [
        "Guardar todo el dinero y no gastar nada.",
        "Separar el ingreso en categorías con un propósito definido.",
        "Gastar primero en deseos y después ver si alcanza para lo demás.",
        "Usar la tarjeta de crédito para completar los gastos.",
      ],
      correcta: 1,
    },
    {
      id: "3",
      pregunta:
        "¿Cuál de las siguientes opciones es un ejemplo de ‘deseo’ al organizar el sueldo?",
      opciones: [
        "Pago de renta",
        "Compra de medicamentos",
        "Ir al cine con amigos",
        "Pago de luz",
      ],
      correcta: 2,
    },
    {
      id: "4",
      pregunta:
        "Si ganas $10,000 al mes y decides destinar el 20 % a ahorro o pago de deudas, ¿cuánto corresponde a esa parte?",
      opciones: ["$1,000", "$1,500", "$2,000", "$3,000"],
      correcta: 2,
    },
    {
      id: "5",
      pregunta:
        "Revisar y ajustar tu organización de dinero cada mes sirve para:",
      opciones: [
        "Cambiar tus ingresos sin trabajar más.",
        "Ver si tus gastos siguen siendo acordes a tus metas y hacer correcciones.",
        "Evitar ahorrar para no complicarte.",
        "Gastar más en deseos cada mes.",
      ],
      correcta: 1,
    },
  ];


  const [preguntaIndex, setPreguntaIndex] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);

  // Si aún no hay preguntas, mostramos un mensaje y no rompemos nada
  if (preguntas.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Preguntas de Repaso</Text>
        <Text style={styles.pregunta}>
          Todavía no hay preguntas cargadas para este nivel.{"\n"}
          Cuando tengas el contenido, agrégalo en el arreglo "preguntas".
        </Text>

        <TouchableOpacity
          style={styles.btnContinuar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnContinuarTxt}>Regresar</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
      // Al terminar todas las preguntas regresas al menú del tema
      navigation.navigate("ADMenu");
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
        <TouchableOpacity style={styles.btnContinuar} onPress={siguientePregunta}>
          <Text style={styles.btnContinuarTxt}>
            {preguntaIndex + 1 < preguntas.length ? "Siguiente" : "Terminar"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ---------- ESTILOS (copiados del PFundamentos) ----------
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
