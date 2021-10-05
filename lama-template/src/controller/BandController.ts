import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandDatabase } from "../data/BandDatabase";
import { BandInputDTO } from "../model/Band";

export class BandController {
    async register(req: Request, res: Response){
        try{
            const input: BandInputDTO = {
                name: req.body.name,
                musicGenre: req.body.musicGenre,
                responsible: req.body.responsible
            }

            const bandBusiness = new BandBusiness()
        
            const token = await bandBusiness.createBand(input, req.headers.authorization as string)

            res.status(200).send({token})

        } catch (error){
            res.status(400).send({error: error.message})
        } finally {
            await BandDatabase.destroyConnection
        }
    }

    async getDetail(req: Request, res:Response){
        try{ 

            const input = (req.query.id ?? req.query.name) as string

            const band = await BandBusiness.getBandDetail(input)

            res.status(200).send(band)
        } catch (error){
            res.status(400).send({error: error.message})
        } finally {
            await BandDatabase.destroyConnection
        }
    }
}