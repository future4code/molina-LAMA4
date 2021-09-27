import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { BandDatabase } from "../data/BandDatabase";
import { ShowDatabase } from "../data/ShowDatabase";
import { Show, ShowInputDTO } from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


export class ShowController {
    async addShow (req: Request, res: Response){
        try {

            const weekDay = Show.toWeekDayEnum(req.body.weekDay)

            const input: ShowInputDTO = {
                bandId: req.body.bandId,
                weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime
            }

            const showBusiness = new ShowBusiness()
            await showBusiness.createShow(input, req.headers.authorization as string)

            res.status(200).send("Sucess")
        } catch (error){
            res.status(400).send({error: error.message})
        } finally {
            await ShowDatabase.destroyConnection
        }
    }
}