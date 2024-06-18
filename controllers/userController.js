const User = require('../models/userModel');

const userController = {
  getAllUsers: (req, res) => {
    User.findAll((err, users) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor al obtener usuarios' });
      }
      res.status(200).json(users);
    });
  },

  getUserById: (req, res) => {
    const userId = req.params.id;

    User.findById(userId, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor al obtener el usuario' });
      }

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json(user);
    });
  },

  updateUser: (req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    User.update(userId, userData, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor al actualizar el usuario' });
      }

      res.status(200).json({ message: 'Usuario actualizado con éxito' });
    });
  },

  deleteUser: (req, res) => {
    const userId = req.params.id;

    User.delete(userId, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor al eliminar el usuario' });
      }

      res.status(200).json({ message: 'Usuario eliminado con éxito' });
    });
  },

  createUser: (req, res) => {
    const userData = req.body;

    User.create(userData, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor al crear el usuario' });
      }
      res.status(201).json({ message: 'Usuario creado con éxito', user });
    });
  }
};

module.exports = userController;
