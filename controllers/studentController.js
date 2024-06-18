const Estudiante = require('../models/studentModel');

const studentsController = {
  getAllEstudiantes: (req, res) => {
    Estudiante.findAll((err, estudiantes) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor al obtener estudiantes' });
      }
      res.status(200).json(estudiantes);
    });
  },

  getEstudianteById: (req, res) => {
    const estudianteId = req.params.id;

    Estudiante.findById(estudianteId, (err, estudiante) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor al obtener el estudiante' });
      }

      if (!estudiante) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }

      res.status(200).json(estudiante);
    });
  },

  updateEstudiante: (req, res) => {
    const estudianteId = req.params.id;
    const estudianteData = req.body;

    Estudiante.update(estudianteId, estudianteData, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor al actualizar el estudiante' });
      }

      res.status(200).json({ message: 'Estudiante actualizado con éxito' });
    });
  },

  deleteEstudiante: (req, res) => {
    const estudianteId = req.params.id;

    Estudiante.delete(estudianteId, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor al eliminar el estudiante' });
      }

      res.status(200).json({ message: 'Estudiante eliminado con éxito' });
    });
  },

  createEstudiante: (req, res) => {
    const estudianteData = req.body;

    Estudiante.create(estudianteData, (err, estudiante) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor al crear el estudiante' });
      }
      res.status(201).json({ message: 'Estudiante creado con éxito', estudiante });
    });
  }
};

module.exports = studentsController;
