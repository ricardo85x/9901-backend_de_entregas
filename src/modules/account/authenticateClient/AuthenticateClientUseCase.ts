import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({ username, password } : IAuthenticateClient) {
        // get username and password



        // check user exists

        const client = await prisma.clients.findUnique({
            where: { username }
        })

        if (!client) {
            throw new Error("User or password is invalid");
        }

        // check if password matches

        const passwordMatch = await compare(password, client.password)

        if(!passwordMatch) {
            throw new Error("User or password is invalid");
        }

        // generate the token
        const payload = { username } // public data when token is decoded
        const hash = "2457834f6555435d1ec0923d65925bf4" // find some site that generate a md5
        const token = sign(payload, hash, {
            subject: client.id,
            expiresIn: "1d"
        })

        return token
    }
}