import {Request, Response} from "express";
import AuthService from "../service/auth.service";
import {User} from "../types/user.types";
import TokenService from "../service/token.service";


export const login = async (req: Request, res: Response): Promise<any>  => {
    try {
        const user: User = await AuthService.login(req.body);
        const { accessToken, refreshToken } = TokenService.generateTokens(user.email);
        const { token } = await TokenService.saveToken(user.id, refreshToken);
        res.cookie('refreshToken', token, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: true });
        return res.status(200).json({accessToken, refreshToken,...user});
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}

export const logout = async (req: Request, res: Response): Promise<any> => {
    try {
        //const refreshToken = req.cookies["refreshToken"];
        res.clearCookie('refreshToken');
        //await AuthService.logout(refreshToken);
        return res.status(200).json({message: "logout"});
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}