import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase{

    private static TABLE_NAME = "LAMA_music_Bands";

    public async createBand(band:Band): Promise<void>{
        try {
            await this.getConnection()
            .insert({
                id: band.getId,
                name: band.getName,
                musicGenre: band.getMusicGenre,
                responsible: band.getResponsible
            })
            .into(BandDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error (error.sqlMessage || error.message)
        }
    }

    public async getBandByIdOrName (input: string): Promise <Band> {
        const band = await this.getConnection()
        .select("*")
        .from(BandDatabase.TABLE_NAME)
        .where({id:input}).orWhere({name:input})

        return Band.toBandModel(band[0])
    }
}