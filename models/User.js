const dotenv = require('dotenv').configDotenv();
const pool = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  static async create({ username, email, password }) {
    const hashPassword = await bcrypt.hash(password, 3);
    const query = `
          INSERT INTO users (username, email, password)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
    const values = [username, email, password];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findAll() {
    const query = 'SELECT * FROM users;';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async update(id, { username, email, password }) {
    const query = `
          UPDATE users
          SET username = $1, email = $2, password = $3
          WHERE id = $4
          RETURNING *;
        `;
    const values = [username, email, password, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = User;
