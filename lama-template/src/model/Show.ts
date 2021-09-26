export class Show{
    constructor(
    private id: string,
    public weekDay: string,
    public startTime: number,
    public endTime: number,
    private bandId: string
    ){}
    getId(){
        return this.id
    }

    getWeekDay(){
        return this.weekDay
    }

    getStartTime(){
        return this.startTime
    }

    getEndTime(){
        return this.endTime
    }

    getBandId(){
        return this.bandId
    }

    setId(id: string){
        this.id = id
    }

    setWeekDay(weekDay: string){
        this.weekDay = weekDay
    }

    setStartTime(startTime: number){
        return this.startTime = startTime
    }

    setEndTime(endTime: number){
        return this.endTime = endTime
    }

    setBandId(bandId: string){
        return this.bandId = bandId
    }
}