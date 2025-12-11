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
    console.error("❌ Error registrando usuario:", error);
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
    console.error("❌ Error iniciando sesión:", error);
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
    console.error("❌ Error obteniendo transacciones:", error);
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
      "finanzas.meta": {
        nombre: meta.nombre,
        cantidad: meta.cantidad
      }
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
// Registrar EGRESO mensual
// --------------------------------------------------------------
export const actualizarEgresoMensual = async (userId, año, mes, monto, descripcion) => {
  try {
    const ref = doc(database, "usuarios", userId, "finanzas", `${año}-${mes}`);
    const snap = await getDoc(ref);

    const dataExistente = snap.exists()
      ? snap.data()
      : { ingresos: [], egresos: [], transacciones: [] };

    const nuevaData = {
      ...dataExistente,
      egresos: [...dataExistente.egresos, monto],
      transacciones: [
        ...dataExistente.transacciones,
        { tipo: "egreso", monto, descripcion, fecha: serverTimestamp() }
      ]
    };

    await setDoc(ref, nuevaData);
    return true;

  } catch (error) {
    console.error("❌ Error actualizando egreso:", error);
    throw error;
  }
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
    console.error("❌ Error al actualizar racha:", error);
    throw error;
  }
};
