"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BandDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const Band_1 = require("../model/Band");
class BandDatabase extends BaseDatabase_1.BaseDatabase {
    createBand(band) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id: band.getId,
                    name: band.getName,
                    musicGenre: band.getMusicGenre,
                    responsible: band.getResponsible
                })
                    .into(BandDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getBandByIdOrName(id, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.getConnection()
                .select("*")
                .from(BandDatabase.TABLE_NAME)
                .where({ id })) || ({ email });
            return Band_1.Band.toBandModel(result[0]);
        });
    }
}
exports.BandDatabase = BandDatabase;
BandDatabase.TABLE_NAME = "LAMA_music_Bands";
//# sourceMappingURL=BandDatabase.js.map