import { BandDatabase } from "../data/BandDatabase"
import { ShowDatabase } from "../data/ShowDatabase"
import { Show, ShowInputDTO, WeekDay } from "../model/Show"
import { UserRole } from "../model/User"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"


export class ShowBusiness {
    async createShow (input: ShowInputDTO, token: string) {

        const tokenData = new Authenticator()
        const getTokenData = tokenData.getData(token)
        if(getTokenData.role !== UserRole.ADMIN){
            throw new Error ("404. Unauthorized")
        }

        if(!input.bandId || !input.endTime || !input.startTime || !input.weekDay){
            throw new Error ("Complete all fields please")
        }

        if (input.startTime < 8 || input.endTime > 23 || input.startTime >= input.endTime){
            throw new Error ("Invalid informations")
        }

        if (!Number.isInteger(input.startTime) || (!Number.isInteger(input.endTime))){
            throw new Error ("Times should be integer to create show")
        }

        const bandData = new BandDatabase()
        const band = bandData.getBandByIdOrName(input.bandId)
        if(!band){
            throw new Error("Band not found")
        }
        
        const showDataBase = new ShowDatabase()
        const registerShow = await showDataBase.getShowByTimes(
            input.weekDay, input.endTime, input.startTime
        )

        if(registerShow.length === 0){
            throw new Error ("show  cant be registered at this time")
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generate()

        await showDataBase.createShow(
            Show.toShow({
                ...input,
                id: id
            })
        )

    }
}