import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticateClient(req: Request, res: Response, next: NextFunction){
    const authHeaders = req.headers.authorization

    if(!authHeaders) {
        return res.status(401).json({
            message: "Token missing from request"
        })
    }

    //authHeaders = Bearer token_string
    // get text after space(token string)
    const [, token] = authHeaders.split(" ")


    try {
        const { sub } = verify(token, "2457834f6555435d1ec0923d65925bf4") as IPayload

        console.log("sub", sub)

        req.id_client = sub

        return next()
    } catch (e) {
        return res.status(401).json({
            message: "Invalid token!"
        })
    }
       




}