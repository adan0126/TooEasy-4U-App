import 'dotenv/config';

export default {
  expo: {
    name: "TooEasy",
    slug: "tooeasy",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,

    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },

    ios: {
      supportsTablet: true
    },

    android: {
      package: "com.adan0126.tooeasy",
      versionCode: 1,

      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },

      edgeToEdgeEnabled: true
    },

    web: {
      favicon: "./assets/favicon.png"
    },

    extra: {
      "eas": {
        "projectId": process.env.PROYECT_ID_EAS
      },
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID
    },

    cli: {
      appVersionSource: "remote"
    }
  }
};
