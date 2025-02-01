import {Request, Response} from "express";
import UserService from "../service/user.service";
import TokenService from "../service/token.service";
import EmailService from "../service/email.service";
import {v4} from 'uuid';
import {configDotenv} from "dotenv";

configDotenv({path: '../../.env'});

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.create(req.body);
    const emailService = new EmailService();
    const activationLink = v4();
    await emailService.sendEmail(user.email, process.env.URL_API + "/api/activate/" + activationLink);
    const { refreshToken } = TokenService.generateTokens(user.email);
    const { token } = await TokenService.saveToken(user.id, refreshToken);
    res.cookie('refreshToken', token, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: true })
    res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.findAll();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserService.findById(parseInt(req.params.id));
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.update(parseInt(req.params.id), req.body);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.delete(parseInt(req.params.id));
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
