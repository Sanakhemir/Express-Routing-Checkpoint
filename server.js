
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Vérifier les heures de travail

const checkHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send("L'application n'est disponible que pendant les heures de travail (lundi au vendredi, de 9h à 17h).");
  }
};

// Appliquer le middleware à toutes les routes
app.use(checkHours);

// Routes
app.get('/', (req, res) => {
  res.send(`
        <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Accueil</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <nav>
            <a href="/">Accueil</a>
            <a href="/services">Nos services</a>
            <a href="/contact">Nous contacter</a>
        </nav>
        <h1>Page d'accueil</h1>
        <p>Bienvenue sur notre site !</p>
    </body>
    </html>
  `);
});

app.get('/services', (req, res) => {
  res.send(`
    <h1>Nos services</h1>
    <nav>
      <a href="/">Accueil</a>
      <a href="/services">Nos services</a>
      <a href="/contact">Nous contacter</a>
    </nav>
    <p>Voici la liste de nos services...</p>
  `);
});

app.get('/contact', (req, res) => {
  res.send(`
    <h1>Nous contacter</h1>
    <nav>
      <a href="/">Accueil</a>
      <a href="/services">Nos services</a>
      <a href="/contact">Nous contacter</a>
    </nav>
    <p>Contactez-nous à : contact@example.com</p>
  `);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

