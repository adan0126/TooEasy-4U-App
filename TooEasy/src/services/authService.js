// ======================================================================
//  IMPORTS DE FIREBASE (solo Firestore)
// ======================================================================
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  query,
  collection,
  where,
  getDocs
} from "firebase/firestore";

import { database } from "../config/fb"; // ← Tu Firestore real


// ======================================================================
//  BCRYPT + EXPO-CRYPTO (necesario para RN)
// ======================================================================
import bcrypt from "bcryptjs";
import * as Crypto from "expo-crypto";

// Fix obligatorio: bcrypt usa WebCrypto en navegador, pero RN no lo tiene
bcrypt.setRandomFallback((len) => Crypto.getRandomBytes(len));



// ======================================================================
//  VERIFICAR SI USUARIO EXISTE (correo y username)
// ======================================================================
export const verificarUsuarioExistente = async (username, correo) => {
  try {
    // Buscar por correo (ID del documento)
    const correoRef = doc(database, "usuarios", correo.toLowerCase());
    const correoDoc = await getDoc(correoRef);

    if (correoDoc.exists()) {
      return { existe: true, mensaje: "Este correo ya está registrado" };
    }

    // Buscar por username en la colección
    const usersRef = collection(database, "usuarios");
    const q = query(usersRef, where("username", "==", username.trim()));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { existe: true, mensaje: "Este nombre de usuario ya está en uso" };
    }

    return { existe: false, mensaje: "Usuario disponible" };

  } catch (error) {
    console.error("Error verificando usuario:", error);
    throw new Error("Error al verificar disponibilidad del usuario");
  }
};



// ======================================================================
//  REGISTRO DE USUARIO NUEVO
// ======================================================================
export const registrarUsuario = async ({ username, correo, password, edad, genero }) => {
  try {
    // Hashear contraseña (bcrypt)
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    // Referencia del usuario (ID como el correo)
    const userRef = doc(database, "usuarios", correo.toLowerCase());

    // Datos completos iniciales del usuario
    const nuevoUsuario = {
      id: correo.toLowerCase(),
      username: username.trim(),
      correo: correo.trim().toLowerCase(),
      edad: parseInt(edad),
      genero,
      password: passwordHash,

      // Datos del juego
      monedas: 0,
      wood: 0,
      house_level: 1,
      beaver_level: 1,
      current_appearance: "skin_default",
      current_beaver: "castor_default",

      fechaRegistro: serverTimestamp(),
      ultimoAcceso: serverTimestamp(),

      // Finanzas principales del usuario
      finanzas: {
        ingresoMensual: 0,
        ahorroActual: 0,
        racha: 0,
        ultimaActualizacionRacha: null,

        meta: {
          nombre: "",
          cantidad: 0,
          progreso: 0,
          estado: "No iniciada"
        },

        transacciones: {}
      },

      // Progreso educativo
      progreso: {
        fundamentos: {
          nivel1: { completado: false, puntuacion: 0, intentos: 0 },
          nivel2: { completado: false, puntuacion: 0, intentos: 0 },
          nivel3: { completado: false, puntuacion: 0, intentos: 0 }
        },
        cuentasBancarias: {
          nivel1: { completado: false, puntuacion: 0, intentos: 0 },
          nivel2: { completado: false, puntuacion: 0, intentos: 0 },
          nivel3: { completado: false, puntuacion: 0, intentos: 0 }
        }
      }
    };

    await setDoc(userRef, nuevoUsuario);
    return nuevoUsuario;

  } catch (error) {
    console.error("Error registrando usuario:", error);
    throw new Error("No se pudo registrar el usuario");
  }
};



// ======================================================================
//  INICIAR SESIÓN
// ======================================================================
export const iniciarSesion = async (correo, password) => {
  try {
    const userRef = doc(database, "usuarios", correo.toLowerCase());
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return { exito: false, mensaje: "El usuario no existe" };
    }

    const data = userDoc.data();

    // Validar contraseña con bcrypt
    const passwordCorrecta = bcrypt.compareSync(password, data.password);
    if (!passwordCorrecta) {
      return { exito: false, mensaje: "Contraseña incorrecta" };
    }

    // Registrar acceso
    await updateDoc(userRef, { ultimoAcceso: serverTimestamp() });

    return { exito: true, usuario: data, mensaje: "Inicio de sesión exitoso" };

  } catch (error) {
    console.error("Error iniciando sesión:", error);
    return { exito: false, mensaje: "Error al iniciar sesión" };
  }
};



// ======================================================================
//  TRANSACCIONES POR MES (Se guardan en subcolección "finanzas")
// ======================================================================

// --------------------------------------------------------------
// Obtener transacciones del mes
// --------------------------------------------------------------
export const obtenerTransaccionesMes = async (userId, año, mes) => {
  try {
    const ref = doc(database, "usuarios", userId, "finanzas", `${año}-${mes}`);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      // Siempre regresar arrays → evita errores en reduce()
      return { ingresos: [], egresos: [], transacciones: [] };
    }

    const data = snap.data();

    return {
      ingresos: Array.isArray(data.ingresos) ? data.ingresos : [],
      egresos: Array.isArray(data.egresos) ? data.egresos : [],
      transacciones: Array.isArray(data.transacciones) ? data.transacciones : []
    };

  } catch (error) {
    console.error("Error obteniendo transacciones:", error);
    throw error;
  }
};

// --------------------------------------------------------------
// Actualizar meta de ahorro
// --------------------------------------------------------------
export const actualizarMeta = async (userId, meta) => {
  try {
    const ref = doc(database, "usuarios", userId);

    await updateDoc(ref, {
      "finanzas.meta.nombre": meta.nombre,
      "finanzas.meta.cantidad": meta.cantidad
    });

    return true;
  } catch (error) {
    console.error("Error actualizando meta:", error);
    throw error;
  }
};

// --------------------------------------------------------------
// Registrar INGRESO mensual
// --------------------------------------------------------------
export async function actualizarIngresoMensual(userId, monto) {
  try {
    const ref = doc(database, "usuarios", userId);

    await updateDoc(ref, {
      "finanzas.ingresoMensual": monto
    });

    return true;

  } catch (error) {
    console.error("Error actualizando ingreso fijo:", error);
    throw error;
  }
}

// --------------------------------------------------------------
// Agregar transacción (ingreso o egreso)
// --------------------------------------------------------------
export const agregarTransaccion = async (userId, tipo, datos) => {
  try {
    const { fecha, monto, descripcion, categoria } = datos;
    
    // Obtener año y mes de la fecha
    const fechaObj = new Date(fecha);
    const año = fechaObj.getFullYear();
    const mes = fechaObj.getMonth() + 1;
    
    // Referencia al documento del mes
    const refMes = doc(database, "usuarios", userId, "finanzas", `${año}-${mes}`);
    const snapMes = await getDoc(refMes);
    
    // Datos existentes o iniciales
    const dataExistente = snapMes.exists()
      ? snapMes.data()
      : { ingresos: [], egresos: [], transacciones: [] };
    
    // porque Firestore no permite serverTimestamp() dentro de arrays
    const ahora = new Date().toISOString();
    
    // Nueva transacción
    const nuevaTransaccion = {
      tipo,
      monto,
      descripcion,
      categoria,
      fecha: fecha.toISOString(),
      timestamp: ahora  // Usar ISO string en lugar de serverTimestamp()
    };
    
    // Actualizar arrays según el tipo
    const nuevaData = {
      ...dataExistente,
      transacciones: [...(dataExistente.transacciones || []), nuevaTransaccion]
    };
    
    if (tipo === "ingreso") {
      nuevaData.ingresos = [...(dataExistente.ingresos || []), nuevaTransaccion];
    } else {
      nuevaData.egresos = [...(dataExistente.egresos || []), nuevaTransaccion];
    }
    
    // Guardar en Firestore
    await setDoc(refMes, nuevaData);
    
    // Actualizar ahorro actual en el documento principal del usuario
    const userRef = doc(database, "usuarios", userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const ahorroActual = userData.finanzas?.ahorroActual || 0;
      const meta = userData.finanzas?.meta || { nombre: "", cantidad: 0 };
      
      // Calcular nuevo ahorro
      let nuevoAhorro = ahorroActual;
      if (tipo === "ingreso") {
        nuevoAhorro += monto;
      } else {
        nuevoAhorro -= monto;
      }
      
      // Calcular progreso de meta
      const progresoMeta = meta.cantidad > 0 
        ? Math.min(100, (nuevoAhorro / meta.cantidad) * 100)
        : 0;
      
      const estadoMeta = nuevoAhorro >= meta.cantidad 
        ? "Completada" 
        : nuevoAhorro > 0 
          ? "En progreso" 
          : "No iniciada";
      
      // Actualizar documento principal
      await updateDoc(userRef, {
        "finanzas.ahorroActual": nuevoAhorro,
        "finanzas.meta.progreso": progresoMeta,
        "finanzas.meta.estado": estadoMeta
      });
    }
    
    return true;
    
  } catch (error) {
    console.error("Error agregando transacción:", error);
    throw error;
  }
};

// --------------------------------------------------------------
// Registrar EGRESO mensual (DEPRECADO - usar agregarTransaccion)
// --------------------------------------------------------------
export const actualizarEgresoMensual = async (userId, año, mes, monto, descripcion) => {
  try {
    const ref = doc(database, "usuarios", userId, "finanzas", `${año}-${mes}`);
    const snap = await getDoc(ref);

    const dataExistente = snap.exists()
      ? snap.data()
      : { ingresos: [], egresos: [], transacciones: [] };

    const ahora = new Date().toISOString();

    const nuevaData = {
      ...dataExistente,
      egresos: [...dataExistente.egresos, monto],
      transacciones: [
        ...dataExistente.transacciones,
        { tipo: "egreso", monto, descripcion, fecha: ahora }
      ]
    };

    await setDoc(ref, nuevaData);
    return true;

  } catch (error) {
    console.error("Error actualizando egreso:", error);
    throw error;
  }
};

// ======================================================================
//  ACTUALIZAR PROGRESO DE LECCIONES
// ======================================================================
export const actualizarProgresoLeccion = async (userId, tema, nivel, aprobado) => {
  try {
    const userRef = doc(database, "usuarios", userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error("Usuario no encontrado");
    }

    const userData = userSnap.data();
    const progresoActual = userData.progreso || {};

    // Si no aprobó, no actualizamos nada
    if (!aprobado) {
      console.log("No se aprobó la lección, no se actualiza progreso");
      return { exito: false, mensaje: "Debes aprobar todas las preguntas" };
    }

    // Actualizar el nivel específico
    const nivelKey = `nivel${nivel}`;
    const temaProgreso = progresoActual[tema] || {};
    
    // Solo actualizar si no estaba completado previamente
    if (!temaProgreso[nivelKey]?.completado) {
      await updateDoc(userRef, {
        [`progreso.${tema}.${nivelKey}.completado`]: true,
        [`progreso.${tema}.${nivelKey}.fechaCompletado`]: new Date().toISOString(),
        [`progreso.${tema}.${nivelKey}.intentos`]: (temaProgreso[nivelKey]?.intentos || 0) + 1
      });

      return { 
        exito: true, 
        mensaje: "¡Nivel completado!",
        primerVez: true 
      };
    } else {
      // Ya estaba completado, solo incrementar intentos
      await updateDoc(userRef, {
        [`progreso.${tema}.${nivelKey}.intentos`]: (temaProgreso[nivelKey]?.intentos || 0) + 1
      });

      return { 
        exito: true, 
        mensaje: "Nivel ya completado anteriormente",
        primerVez: false 
      };
    }

  } catch (error) {
    console.error("Error actualizando progreso:", error);
    throw error;
  }
};

// ======================================================================
//  OBTENER PROGRESO DE UN TEMA
// ======================================================================
export const obtenerProgresoTema = async (userId, tema) => {
  try {
    const userRef = doc(database, "usuarios", userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return { nivel1: false, nivel2: false, nivel3: false };
    }

    const progreso = userSnap.data().progreso?.[tema] || {};
    
    return {
      nivel1: progreso.nivel1?.completado || false,
      nivel2: progreso.nivel2?.completado || false,
      nivel3: progreso.nivel3?.completado || false,
    };

  } catch (error) {
    console.error("Error obteniendo progreso:", error);
    return { nivel1: false, nivel2: false, nivel3: false };
  }
};

// ======================================================================
//  CALCULAR PORCENTAJE DE PROGRESO
// ======================================================================
export const calcularPorcentajeProgreso = (progresoTema) => {
  const niveles = Object.values(progresoTema);
  const completados = niveles.filter(nivel => nivel === true).length;
  const total = niveles.length;
  
  return Math.round((completados / total) * 100);
};

// ======================================================================
//  ACTUALIZAR RACHA DIARIA
// ======================================================================
export const actualizarRacha = async (userId) => {
  try {
    const userRef = doc(database, "usuarios", userId);
    const snap = await getDoc(userRef);

    if (!snap.exists()) return;

    const data = snap.data().finanzas;

    const hoy = new Date().toLocaleDateString("es-MX");
    const ultima = data.ultimaActualizacionRacha || "";
    const rachaActual = data.racha || 0;

    let nuevaRacha = rachaActual;

    // Si la fecha cambió → aumentar una racha
    if (ultima !== hoy) {
      nuevaRacha = rachaActual + 1;
    }

    await updateDoc(userRef, {
      "finanzas.racha": nuevaRacha,
      "finanzas.ultimaActualizacionRacha": hoy
    });

    return nuevaRacha;

  } catch (error) {
    console.error("Error al actualizar racha:", error);
    throw error;
  }
};