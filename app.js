const express = require(`express`);
const mongoose = require('mongoose');
const stuffRoutes = require(`./routes/stuff`);

mongoose.connect('mongodb+srv://jouinidamien:Madiana24072669@cluster0.amlnzbo.mongodb.net/',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post(`/api/stuff`, (req, res, next) => {
 delete req.body._id;
 const thing = new Thing({
    ...req.body
 });
 thing.save()
 .then(() => res.status(201).json({ message: `Objet enregistré ! `}))
 .catch(error => res.status(400).json({ error }));
});

//modifier un objet//
app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });
//suppression d'un objet//
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });


app.get(`/api/stuff/:id`, (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error })); 
});

app.get('/api/stuff', (req, res, next) => {
  Thing.find()
  .then(things => res.status(200).json(things))
  .catch(error => res.status(400).json({ error }));
  });

app.use(`/api/stuff`, stuffRoutes);

module.exports = app;



/////verifier que tous est bien conecter////

// app.use((req, res, next) => {
//     console.log(`Requete reçue !`);
//     next();
// });

// app.use((req, res, next) => {
//     res.status(201);
//     next();
// });

// app.use((req, res, next) => {
//     res.json({ message: `Votre requete a bien ete recue !` });
//     next();
// });

// app.use((req, res, next) => {
//     console.log(`reponse envoyée avec succes !`);
// });