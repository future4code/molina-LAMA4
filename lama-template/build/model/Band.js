"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Band = void 0;
class Band {
    constructor(id, name, musicGenre, responsible) {
        this.id = id;
        this.name = name;
        this.musicGenre = musicGenre;
        this.responsible = responsible;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getMusicGenre() {
        return this.musicGenre;
    }
    getResponsible() {
        return this.responsible;
    }
    setName(name) {
        return this.name = name;
    }
    setMusicGenre(musicGenre) {
        return this.musicGenre = musicGenre;
    }
    setResponsabible(responsible) {
        return this.responsible = responsible;
    }
    static toBandModel(band) {
        return new Band(band.id, band.name, band.musicGenre, band.responsible);
    }
}
exports.Band = Band;
//# sourceMappingURL=Band.js.map