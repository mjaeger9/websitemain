const express = require("express");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-project-id.firebaseio.com" // Ersetzen Sie "your-project-id" durch Ihre Firebase-Projekt-ID
});

const db = admin.database();
const app = express();

app.use(express.json());