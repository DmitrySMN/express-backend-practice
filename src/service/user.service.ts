import { PrismaClient, Users } from "@prisma/client";
import { User } from '../types/user.types';

const prisma = new PrismaClient();

class UserService {
  static async create(user: User): Promise<Users> {
    
    // const values = [user.username, user.email, user.password, user.isActivate];
    // const { rows } = await pool.query(query, values);
    // return rows[0];
  
    return prisma.users.create({
      data: user,
    })
  }

  // static async findAll(): Promise<UserData[]>{
  //   const query = 'SELECT * FROM users;';
  //   const { rows } = await pool.query(query);
  //   return rows;
  // }

  // static async findById(id: number): Promise<UserData> {
  //   const query = 'SELECT * FROM users WHERE id = $1;';
  //   const { rows } = await pool.query(query, [id]);
  //   return rows[0];
  // }

  // static async update(id: number, user: UserData): Promise<UserData> {
  //   const query = `
  //         UPDATE users
  //         SET username = $1, email = $2, password = $3, isActivate = $4
  //         WHERE id = $4
  //         RETURNING *;
  //       `;
  //   const values = [user.username, user.email, user.password, id, user.isActivate];
  //   const { rows } = await pool.query(query, values);
  //   return rows[0];
  // }

  // static async delete(id:number): Promise<UserData> {
  //   const query = 'DELETE FROM users WHERE id = $1 RETURNING *;';
  //   const { rows } = await pool.query(query, [id]);
  //   return rows[0];
  // }
}

export default UserService;
