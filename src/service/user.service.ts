import { favorites_movies, PrismaClient, users } from '@prisma/client';
import { User } from '../types/user.types';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

class UserService {
  static async create(user: User): Promise<users> {
    user.password = await bcrypt.hash(user.password, 3);

    return prisma.users.create({
      data: user,
    });
  }

  static async getFavorites(userId: number): Promise<favorites_movies | null> {
    return prisma.favorites_movies.findUnique({
      where: {
        user_id: userId,
      },
    });
  }

  static async updateFavorites(userId: number, movieId: number) {
    return prisma.favorites_movies.update({
      where: {
        user_id: userId
      }, 
      data: {
        movies: {
          push: movieId
        }
      }
    }
    );
  }

  static async findAll(): Promise<users[]> {
    return prisma.users.findMany();
  }

  static async findById(id: number): Promise<users> {
    // @ts-ignore
    return prisma.users.findUnique({
      where: { id },
    });
  }

  static async update(id: number, user: User): Promise<users> {
    return prisma.users.update({
      where: { id },
      data: user,
    });
  }

  static async delete(id: number): Promise<users> {
    return prisma.users.delete({
      where: { id },
    });
  }
}

export default UserService;
