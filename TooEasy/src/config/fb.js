import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import constants from "constants";

const firebaseConfig = {
  apiKey: constants.manifest.extra.firebaseApiKey,
  authDomain: constants.manifest.extra.firebaseAuthDomain,
  projectId: constants.manifest.extra.firebaseProjectId,
  storageBucket: constants.manifest.extra.firebaseStorageBucket,
  messagingSenderId: constants.manifest.extra.firebaseMessagingSenderId,
  appId: constants.manifest.extra.firebaseAppId,
  measurementId: constants.manifest.extra.firebaseMeasurementId
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore();
const analytics = getAnalytics(app);