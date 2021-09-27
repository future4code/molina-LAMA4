import { Band, BandInputDTO } from "../model/Band"
import { BandDatabase } from "../data/BandDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { UserRole } from "../model/User";

export class BandBusiness {
    static getBandDetail(input: string) {
        throw new Error("Method not implemented.");
    }

    async createBand(input: BandInputDTO, token:string){

        const tokenData = new Authenticator()
        const getTokenData = tokenData.getData(token)

        if(getTokenData.role !== UserRole.ADMIN){
            throw new Error ("404. Unauthorized")
        }
        
        if(!input.name || input.musicGenre || input.responsible){
            throw new Error ("Complete all fields please")
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generate();

        const bandDataBase = new BandDatabase()
        await bandDataBase.createBand(Band.toBandModel({...input, id})) 
    }

    async getBandDetail(input: string): Promise <Band> {
        if(!input){
            throw new Error ("404. Unauthorized")
        }
        
        const bandDataBase = new BandDatabase()
        return bandDataBase.getBandByIdOrName(input)

    }

}