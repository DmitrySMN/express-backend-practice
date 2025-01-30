import pool from "../config/db";


interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
  isActivate: boolean;
}

class User {
  static async create(user: UserData): Promise<UserData> {
    const query = `
          INSERT INTO users (username, email, password, isActivate)
          VALUES ($1, $2, $3, $4)
          RETURNING *;
        `;
    const values = [user.username, user.email, user.password, user.isActivate];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findAll(): Promise<UserData[]>{
    const query = 'SELECT * FROM users;';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async findById(id: number): Promise<UserData> {
    const query = 'SELECT * FROM users WHERE id = $1;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async update(id: number, user: UserData): Promise<UserData> {
    const query = `
          UPDATE users
          SET username = $1, email = $2, password = $3, isActivate = $4
          WHERE id = $4
          RETURNING *;
        `;
    const values = [user.username, user.email, user.password, id, user.isActivate];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async delete(id:number): Promise<UserData> {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

export default User;
