export class Show {
    constructor(
        private id: string,
        public weekDay: WeekDay,
        public startTime: number,
        public endTime: number,
        private bandId: string
    ) { }
    getId() {
        return this.id
    }

    getWeekDay() {
        return this.weekDay
    }

    getStartTime() {
        return this.startTime
    }

    getEndTime() {
        return this.endTime
    }

    getBandId() {
        return this.bandId
    }

    setId(id: string) {
        this.id = id
    }

    setWeekDay(weekDay: WeekDay) {
        this.weekDay = weekDay
    }

    setStartTime(startTime: number) {
        return this.startTime = startTime
    }

    setEndTime(endTime: number) {
        return this.endTime = endTime
    }

    setBandId(bandId: string) {
        return this.bandId = bandId
    }

    static toWeekDayEnum(data?: any): WeekDay {
        switch (data) {
            case "FRIDAY":
                return WeekDay.FRIDAY
            case "SATURDAY":
                return WeekDay.SATURDAY
            case "SUNDAY":
                return WeekDay.SUNDAY
            default:
                throw new Error ("Invalid day")
        }
    }

    static toShow (data?: any){
        return new Show(
            data.id,
            Show.toWeekDayEnum(data.weekDay),
            data.bandId || data.band_id,
            data.startTime || data.start_time,
            data.endTime || data.end_time
        )
    }
}

export enum WeekDay {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}

export interface ShowInputDTO{
    bandId: string
    weekDay: WeekDay
    startTime: number
    endTime: number
}

export interface ShowOutPutDTO {
    id: string
    bandId: string
    weekDay: WeekDay
    startTime: number
    endTime: number
}