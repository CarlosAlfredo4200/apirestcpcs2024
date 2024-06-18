const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet'); // Agregar Helmet para configurar encabezados de seguridad
const rateLimit = require("express-rate-limit"); // Agregar limitador de velocidad para mitigar ataques de fuerza bruta
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');

require('dotenv').config(); // Cargar variables de entorno


const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Habilitar CORS
app.use(bodyParser.json());

// Implementar Helmet para configurar encabezados de seguridad
// app.use(helmet());

// Implementar limitador de velocidad para mitigar ataques de fuerza bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de peticiones por IP
});
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/student', studentRoutes);

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
