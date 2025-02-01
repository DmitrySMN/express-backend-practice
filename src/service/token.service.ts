import jwt, {Secret} from 'jsonwebtoken';
import {configDotenv} from "dotenv";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

configDotenv({path: '../../.env'});

class TokenService {

    static generateTokens(payload: string) {
        // @ts-ignore
        const accessToken: string = jwt.sign({payload: payload}, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        // @ts-ignore
        const refreshToken: string = jwt.sign({payload: payload}, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    }

    static async saveToken(userId: number, refreshToken: string) {
        return prisma.tokens.create({
            data: {
                user_id: userId,
                token: refreshToken
            }
        });
    }
}

export default TokenService;