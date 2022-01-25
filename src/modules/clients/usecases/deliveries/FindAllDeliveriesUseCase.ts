import { prisma } from "../../../../database/prismaClient";


export class FindAllDeliveriesUseCase {
    
    async execute(id_client: string){

        const result = await prisma.clients.findMany({
            where: {
                id: id_client
            },
            // include: {
            //     deliveries: true,
            // },
            select: {
                deliveries: true,
                username: true,
                id: true,
            }
        })

        return result
    }
}