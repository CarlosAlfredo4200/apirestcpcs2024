const db = require('../config/db');

const Student = {
  findByCodigo: (codigo, callback) => {
    const sql = 'SELECT * FROM informe_Academico_estudiantes WHERE codigo = ?';
    db.query(sql, [codigo], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      return callback(null, results[0]);
    });
  },

  findById: (id, callback) => {
    const sql = 'SELECT * FROM informe_Academico_estudiantes WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      return callback(null, results[0]);
    });
  },

  create: (estudianteData, callback) => {
    const sql = 'INSERT INTO informe_Academico_estudiantes SET ?';
    db.query(sql, estudianteData, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, { id: results.insertId, ...estudianteData });
    });
  },

  update: (id, estudianteData, callback) => {
    const sql = 'UPDATE informe_Academico_estudiantes SET ? WHERE id = ?';
    db.query(sql, [estudianteData, id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM informe_Academico_estudiantes WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  },

  findAll: (callback) => {
    const sql = 'SELECT * FROM informe_Academico_estudiantes';
    db.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  }
};

module.exports = Student;
