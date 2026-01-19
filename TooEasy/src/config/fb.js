// src/config/fb.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import Constants from "expo-constants";

// Verificar que las variables de entorno existen
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId
};

// Validar configuración
console.log("Inicializando Firebase");
console.log("Project ID:", firebaseConfig.projectId);

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("ERROR: Configuración de Firebase incompleta");
  console.error("Variables disponibles:", firebaseConfig);
  throw new Error("Firebase no está configurado correctamente. Verifica tu archivo .env y app.config.js");
}

// Inicializar Firebase
let app;
let database;
let analytics = null;

try {
  app = initializeApp(firebaseConfig);
  database = getFirestore(app);
  
  console.log("Firebase inicializado correctamente");
  
  // Analytics (solo en web)
  if (typeof window !== 'undefined') {
    try {
      analytics = getAnalytics(app);
      console.log("Analytics inicializado");
    } catch (error) {
      console.log("Analytics no disponible en esta plataforma");
    }
  }
} catch (error) {
  console.error("Error inicializando Firebase:", error);
  throw error;
}

export { database, analytics };