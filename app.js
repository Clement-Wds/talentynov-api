import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import sequelize from './src/sequelize.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware d'erreur global
app.use((err, req, res, next) => {
  res.status(404).send('Demande non trouvée');
  res.status(500).send('Erreur : ' + err.message);
});

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  console.error("La clé secrète JWT n'est pas définie dans le fichier .env");
  process.exit(1);
}

// Configuration de la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Connexion à la base de données
db.connect(err => {
  if (err) {
    console.log(err);
    //return next(err);
  } else {
    // Si la connexion réussit, poursuivre le code
    console.log('Connecté à la base de données MySQL');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
