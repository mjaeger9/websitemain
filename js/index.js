const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./api-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({origin: true}));

app.get("/test", (req, res) => {
  return res.status(200).send("Test");
});

app.post("/users/create", (req, res) => {
  (async () => {
    try {
      await db.collection("users").doc("/" + req.body.id + "/").create({
        name: req.body.name,
        identi: req.body.identi,
        banks: req.body.banks,
        region: req.body.region,
        age: req.body.age,
      });

      await db.collection("konto-anb").doc("/" + req.body.id + "/").create({
        name: req.body.name,
        identi: req.body.identi,
        money: 100,
      });

      await db.collection("kredit-anb").doc("/" + req.body.id + "/").create({
        name: req.body.name,
        identi: req.body.identi,
        kredit: 0,
      });

      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.get("/users/get/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("users").doc(req.params.id);
      const users = await document.get();
      const response = users.data();

      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.get("/konto-anb/get/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("konto-anb").doc(req.params.id);
      const users = await document.get();
      const response = users.data();

      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.get("/kredit-anb/get/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("kredit-anb").doc(req.params.id);
      const users = await document.get();
      const response = users.data();

      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.put("/users/update/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("users").doc(req.params.id);

      await document.update({
        name: req.body.name,
        identi: req.body.identi,
        banks: req.body.banks,
        region: req.body.region,
        age: req.body.age,
      });

      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.put("/konto-anb/update/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("konto-anb").doc(req.params.id);

      await document.update({
        name: req.body.name,
        identi: req.body.identi,
        money: req.body.money,
      });

      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.put("/kredit-anb/update/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("kredit-anb").doc(req.params.id);

      await document.update({
        name: req.body.name,
        identi: req.body.identi,
        kredit: req.body.kredit,
      });

      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.delete("/users/delete/:id", (req, res) => {
  (async () => {
    try {
      const userDocument = db.collection("users").doc(req.params.id);
      await userDocument.delete();

      const kreditDocument = db.collection("kredit-anb").doc(req.params.id);
      await kreditDocument.delete();

      const kontoDocument = db.collection("konto-anb").doc(req.params.id);
      await kontoDocument.delete();

      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);
