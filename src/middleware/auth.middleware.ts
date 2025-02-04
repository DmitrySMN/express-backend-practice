import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { User } from '../types/user.types';

const prisma = new PrismaClient();

export interface ExpressRequest extends Request {
  user?: User;
}

export const verifyToken = async (
  req: ExpressRequest,
  res: Response,
  next: NextFunction,
):Promise<any> => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Unauthorized');
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new Error('Unauthorized');
    }

    //@ts-ignore
    const payload: any = verify(token, process.env.JWT_ACCESS_SECRET);
    console.log(payload);
    
    const user = await prisma.users.findUnique({
      where: {email: payload.payload},
    });

    req.user = user ?? undefined;
    res.locals.user = user;
    next();
  } catch (err: any) {
    console.log(err.message);
    return res.status(401).json({"Error": err.message});
  }
};
