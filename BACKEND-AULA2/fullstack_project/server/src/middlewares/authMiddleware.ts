import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "";

export function checkRole(roles: string[]) { // ["USER", "ADMIN"]
    return function(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token);


        if(!token) {
           return res.status(401).json({error: "Unauthorized. No token provided."});
        }

        try {
            const decodedToken: any = jwt.verify(token, SECRET_KEY);

            if(!roles.includes(decodedToken.role)) {
                return res.status(403).json({error: "Acess forbiden. User doesn't have the required role."});   
            }

        } catch (error) {
            return res.status(403).json( {error: "Acess forbidden. Invalid or expired token."});
        }
         next();
    }
}

