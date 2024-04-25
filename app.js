const express = require(`express`);

const app = express();

app.use((req, res, next) => {
    console.log(`Requete reçue !`);
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res) => {
res.json({message: `Votre requete a bien ete recue !`});
next();
});

app.use((req, res, next) => {
    console.log(`reponse envoyée avec succes !`);
});

module.exports = app;