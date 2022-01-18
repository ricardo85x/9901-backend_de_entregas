import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";


interface IAuthenticateDeliveryman {
    username: string;
    password: string;
}

export class AuthenticateDeliverymanUseCase {
    
    async execute({ username, password} : IAuthenticateDeliveryman ){

        const deliveryman = await prisma.deliveryman.findUnique({
            where: {
                username
            }
        })

        if(!deliveryman){
            throw new Error("Username or password is invalid")
        }

        const passwordMatch = await compare(password, deliveryman.password)

        if(!passwordMatch){
            throw new Error("Username or password is invalid")
        }

        const payload = { username }
        const hash = "2457834f6555435d1ec0923d65925bf5" // find some site that generate a md5
        const token = sign(payload, hash, {
            subject: deliveryman.id,
            expiresIn: "1d"
        })

        return token 
    }
}