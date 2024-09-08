import jwt, { JwtPayload } from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express';

declare global {
    namespace Express {
        interface Request {
        user: {
            userId: string,
            name: string
        };
        }
    }
}

interface CustomJwtPayload extends JwtPayload {
    userId: string,
    name: string
}


export default async function Auth (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json('not authenticated')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload: CustomJwtPayload  = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload
        req.user = { userId: payload.userId, name: payload.name}
        next()
    } catch (error) {
        return res.status(401).json('not authenticated')
    }
}