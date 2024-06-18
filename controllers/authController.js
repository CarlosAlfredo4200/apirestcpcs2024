const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const authController = {
  register: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    User.findByEmail(email, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor al verificar el correo' });
      }

      if (user) {
        return res.status(400).json({ message: 'El correo ya está registrado' });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: 'Error en el servidor al encriptar la contraseña' });
        }

        const newUser = { email, password: hashedPassword };

        User.create(newUser, (err, user) => {
          if (err) {
            return res.status(500).json({ message: 'Error en el servidor al crear el usuario' });
          }
          res.status(201).json({ message: 'Usuario registrado', user });
        });
      });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    User.findByEmail(email, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor al verificar el correo' });
      }

      if (!user) {
        return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: 'Error en el servidor al verificar la contraseña' });
        }

        if (!isMatch) {
          return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login exitoso', token });
      });
    });
  }
};

module.exports = authController;

