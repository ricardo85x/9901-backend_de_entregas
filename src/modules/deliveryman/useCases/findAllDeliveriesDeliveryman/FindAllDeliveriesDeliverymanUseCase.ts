import { prisma } from "../../../../database/prismaClient";


export class FindAllDeliveriesDeliverymanUseCase {

    async execute(id_deliveryman: string){

        const result = await prisma.deliveryman.findMany({
            where: {
                id: id_deliveryman
            },
            select: {
                deliveries: true,
                username: true,
                id: true
            }
        })

        return result
    }
}