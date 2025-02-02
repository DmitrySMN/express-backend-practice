import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken";
import {PrismaClient} from "@prisma/client";
import {User} from "../types/user.types";

const prisma = new PrismaClient();

export interface ExpressRequest extends Request {
    user?: User,
}

export const verifyToken = async (req: ExpressRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            throw new Error("Unauthorized");
        }

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            throw new Error("Token not found");
        }

        //@ts-ignore
        const payload: any = verify(token, process.env.JWT_REFRESH_SECRET);

        const user = await prisma.users.findUnique({
            where: payload.email
        })

        req.user = user ?? undefined;

        next();
    } catch (err: any) {
        throw new Error(err.message);
    }
}