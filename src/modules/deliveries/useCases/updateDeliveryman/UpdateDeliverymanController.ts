import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./updateDeliverymanUseCase";

export class UpdateDeliverymanController {
  async handle(req: Request, res: Response) {
    const { id_deliveryman } = req;

    const { id: id_delivery } = req.params;

    const updateDeliverymanUseCase = new UpdateDeliverymanUseCase();

    const result = await updateDeliverymanUseCase.execute({
      id_delivery,
      id_deliveryman,
    });

    return res.json(result);
  }
}
