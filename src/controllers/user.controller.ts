import { Request, Response } from 'express';
import UserService from '../service/user.service';
import TokenService from '../service/token.service';

import { configDotenv } from 'dotenv';

configDotenv({ path: '../../.env' });

export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await UserService.create(req.body);
    const { accessToken, refreshToken } = TokenService.generateTokens(
      user.email,
    );
    const { token } = await TokenService.saveToken(user.id, refreshToken);
    return res
      .cookie('refreshToken', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: true,
      })
      .json({ accessToken, refreshToken, ...user });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const currentUser = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    return res.status(201);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const users = await UserService.findAll();
    return res.json(users);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const user = await UserService.findById(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await UserService.update(parseInt(req.params.id), req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await UserService.delete(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
