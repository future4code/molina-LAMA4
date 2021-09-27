import { ShowBusiness } from "../business/ShowBusiness";
import { Show, ShowOutPutDTO, WeekDay } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase{

    private static TABLE_NAME = "LAMA_shows"

    public async createShow (show: Show): Promise <void>{
        try{
            await this.getConnection()
            .insert({
                id:show.getId(),
                band_id: show.getBandId(),
                start_time: show.getStartTime(),
                end_time: show.getEndTime(),
                week_day: show.getWeekDay()
            })
            .into(ShowDatabase.TABLE_NAME)
        } catch (error){
            throw new Error (error.sqlMessage || error.message)
        } 
    }

    public async getShowByTimes (weekDay: WeekDay ,startTime: number, endTime: number): Promise <ShowOutPutDTO[]> {
        const shows = await this.getConnection()
        .select("*")
        .where("end_time", ">", `${startTime}`)
        .andWhere("start_time", "<", `${endTime}`)
        .from(ShowDatabase.TABLE_NAME)

        return shows.map((show:any) => {
            return {
                id: show.id,
                bandId: show.bandId,
                startTime: show.startTime,
                endTime: show.endTime,
                weekDay: show.weekDay
        }
        })
    }
}