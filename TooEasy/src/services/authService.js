// ==============================
// IMPORTS NECESARIOS
// ==============================
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp 
} from "firebase/firestore";

import { database } from "../config/fb";
import bcrypt from "bcryptjs";

// ==============================
// REGISTRO DE USUARIO
// ==============================
export const registrarUsuario = async ({ username, correo, password, edad, genero }) => {
  try {
    // Hash de contraseña
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const userRef = doc(database, "usuarios", correo.toLowerCase());

    // Estructura completa del usuario
    const nuevoUsuario = {
      username: username.trim(),
      correo: correo.trim().toLowerCase(),
      edad: parseInt(edad),
      genero: genero,
      password: passwordHash,
      monedas: 0,
      fechaRegistro: serverTimestamp(),
      ultimoAcceso: serverTimestamp(),

      // ==============================
      // DATOS FINANCIEROS
      // ==============================
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

    // Guardar usuario
    await setDoc(userRef, nuevoUsuario);

    console.log("✅ Usuario registrado");
    return nuevoUsuario;

  } catch (error) {
    console.error("❌ Error registrando usuario:", error);
    throw new Error("No se pudo registrar el usuario");
  }
};

// ==============================
// INICIAR SESIÓN
// ==============================
export const iniciarSesion = async (correo, password) => {
  try {
    const userRef = doc(database, "usuarios", correo.toLowerCase());
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("El usuario no existe");
    }

    const data = userDoc.data();

    const passwordCorrecta = bcrypt.compareSync(password, data.password);

    if (!passwordCorrecta) {
      throw new Error("Contraseña incorrecta");
    }

    // Actualizar fecha de acceso
    await updateDoc(userRef, {
      ultimoAcceso: serverTimestamp(),
    });

    return data;

  } catch (error) {
    console.error("❌ Error iniciando sesión:", error);
    throw error;
  }
};

// ==============================
// FUNCIONES DE FINANZAS
// ==============================

// Agregar transacción
export const agregarTransaccion = async (userId, tipo, datos) => {
  try {
    const { fecha, monto, descripcion, categoria } = datos;
    const mesAnio = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;

    const userRef = doc(database, "usuarios", userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    const transaccionesMes = userData.finanzas?.transacciones?.[mesAnio] || {
      ingresos: [],
      egresos: []
    };

    const nuevaTransaccion = {
      id: Date.now().toString(),
      fecha: fecha.toISOString(),
      monto: parseFloat(monto),
      descripcion: descripcion || "",
      categoria: categoria || "General",
      fechaCreacion: serverTimestamp()
    };

    if (tipo === "ingreso") {
      transaccionesMes.ingresos.push(nuevaTransaccion);
    } else {
      transaccionesMes.egresos.push(nuevaTransaccion);
    }

    const updateData = {};
    updateData[`finanzas.transacciones.${mesAnio}`] = transaccionesMes;

    await updateDoc(userRef, updateData);

    await recalcularAhorro(userId);

    return nuevaTransaccion;

  } catch (error) {
    console.error("❌ Error agregando transacción:", error);
    throw error;
  }
};

// Actualizar meta
export const actualizarMeta = async (userId, metaData) => {
  try {
    const userRef = doc(database, "usuarios", userId);

    await updateDoc(userRef, {
      "finanzas.meta.nombre": metaData.nombre,
      "finanzas.meta.cantidad": parseFloat(metaData.cantidad),
      "finanzas.meta.estado": "En Progreso"
    });

    return true;

  } catch (error) {
    console.error("❌ Error meta:", error);
    throw error;
  }
};

// Recalcular ahorro
export const recalcularAhorro = async (userId) => {
  try {
    const userRef = doc(database, "usuarios", userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    let totalIngresos = 0;
    let totalEgresos = 0;

    const transacciones = userData.finanzas?.transacciones || {};

    Object.values(transacciones).forEach(mes => {
      mes.ingresos?.forEach(i => totalIngresos += i.monto);
      mes.egresos?.forEach(e => totalEgresos += e.monto);
    });

    const ahorro = totalIngresos - totalEgresos;

    let progreso = 0;
    const meta = userData.finanzas?.meta;
    if (meta.cantidad > 0) {
      progreso = Math.min((ahorro / meta.cantidad) * 100, 100);
    }

    await updateDoc(userRef, {
      "finanzas.ahorroActual": ahorro,
      "finanzas.meta.progreso": progreso
    });

    return ahorro;

  } catch (error) {
    console.error("❌ Error ahorro:", error);
    throw error;
  }
};

// Obtener transacciones
export const obtenerTransaccionesMes = async (userId, mes, anio) => {
  try {
    const mesAnio = `${anio}-${String(mes).padStart(2, '0')}`;

    const userRef = doc(database, "usuarios", userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    return userData.finanzas?.transacciones?.[mesAnio] || {
      ingresos: [],
      egresos: []
    };

  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
};
