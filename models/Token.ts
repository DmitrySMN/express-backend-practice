import jwt from 'jsonwebtoken';


interface IToken {
    id: number;
    user_id: number;
    token: string;
}

type User = {
    id: number;
    email: string;
}

class Token {
    static generateAccessToken(user: User) {
        return jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
    }
}