import { prisma } from "../../../../database/prismaClient";

interface IUpdateEndDate {
    id_deliveryman: string;
    id_delivery: string;
}

export class UpdateEndDateUseCase {

    async execute({ id_deliveryman, id_delivery }: IUpdateEndDate ){

        const validDelivery = await prisma.deliveries.findFirst({
            where: {
                id: id_delivery,
                id_deliveryman,
                end_at: null
            }
        })

        if(!validDelivery) {
            throw new Error("Invalid delivery")
        }

        const result = await prisma.deliveries.update({
            where: {
                id: id_delivery,
            },
            data: {
                end_at: new Date()
            }
        })


        return result
    }
}