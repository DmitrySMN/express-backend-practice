import {PrismaClient} from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

class AuthService {

    static async login(data: {email: string, password: string}) {

        const user = await prisma.users.findUnique({
            //@ts-ignore
            where: {
                email: data.email
            }
        });

        console.log(user);

        if (!user)
            throw new Error('Пользователь с таким адресом почты не найден');

        const verifyPassword = await bcrypt.compare(data.password, user.password);

        if (!verifyPassword)
            throw new Error('Неверный пароль');

        return user;
    }

    static async logout(refreshToken: string) {

        const token = await prisma.tokens.delete({
            // @ts-ignore
           where: {
               token: refreshToken
           }
        });

        return token;
    }
}

export default AuthService;