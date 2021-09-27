"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Show = void 0;
class Show {
    constructor(id, weekDay, startTime, endTime, bandId) {
        this.id = id;
        this.weekDay = weekDay;
        this.startTime = startTime;
        this.endTime = endTime;
        this.bandId = bandId;
    }
    getId() {
        return this.id;
    }
    getWeekDay() {
        return this.weekDay;
    }
    getStartTime() {
        return this.startTime;
    }
    getEndTime() {
        return this.endTime;
    }
    getBandId() {
        return this.bandId;
    }
    setId(id) {
        this.id = id;
    }
    setWeekDay(weekDay) {
        this.weekDay = weekDay;
    }
    setStartTime(startTime) {
        return this.startTime = startTime;
    }
    setEndTime(endTime) {
        return this.endTime = endTime;
    }
    setBandId(bandId) {
        return this.bandId = bandId;
    }
}
exports.Show = Show;
//# sourceMappingURL=Show.js.map