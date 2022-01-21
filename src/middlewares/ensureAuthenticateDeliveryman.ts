import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface IHeader {
    sub: string;
}

export function ensureAuthenticateDeliveryman(
    req: Request, res: Response, next: NextFunction
){

    const authHeaders = req.headers.authorization

    if(!authHeaders){        
        return res.status(401).json({
            message: "Authorization is required"
        })
    }

    try {

        const [, token] = authHeaders.split(" ")

        const { sub } =  verify(token, "2457834f6555435d1ec0923d65925bf5" ) as IHeader

        req.id_deliveryman = sub


        return next()


    } catch (err) {

        return res.status(401).json({
            message: "Invalid Token"
        })
    }

}