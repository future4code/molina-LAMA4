export class Band{
    constructor(
    private id: string,
    private name: string,
    public musicGenre: string,
    private responsible: string
    ){}

    getId(){
        return this.id
    }

    getName(){
        return this.name
    }

    getMusicGenre(){
        return this.musicGenre
    }

    getResponsible(){
        return this.responsible
    }

    setName (name: string){
        return this.name = name
    }

    setMusicGenre (musicGenre: string){
        return this.musicGenre = musicGenre
    }

    setResponsabible(responsible){
        return this.responsible = responsible
    }

    static toBandModel (band?: any): Band | undefined{
        return new Band(
            band.id,
            band.name,
            band.musicGenre,
            band.responsible
        )
    } 

}

export interface BandInputDTO{
    name: string
    musicGenre: string
    responsible: string
}