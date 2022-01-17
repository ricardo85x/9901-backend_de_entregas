import { prisma } from "../../../../database/prismaClient"
import { hash } from "bcrypt"

interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {

    // para executar a regra de negocio
    async execute({ username, password}: ICreateClient ) {
        // validates user exists
        const clientExists = await prisma.clients.findFirst({ 
            where: { username: {
                mode: "insensitive",
                equals: username
            } }
        })

        if(clientExists){
            throw new Error("Client already exists")
        }
        // cryptograph password

        const hashPassword = await hash(password, 10)

        // save client

        const client = await prisma.clients.create({
            data: { username, password: hashPassword }
        })

        return client
    }

}