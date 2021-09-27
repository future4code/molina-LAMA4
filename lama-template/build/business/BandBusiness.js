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
exports.BandBusiness = void 0;
const Band_1 = require("../model/Band");
const BandDatabase_1 = require("../data/BandDatabase");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
const User_1 = require("../model/User");
class BandBusiness {
    createBand(input, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = new Authenticator_1.Authenticator();
            const getTokenData = tokenData.getData(token);
            if (getTokenData.role !== User_1.UserRole.ADMIN) {
                throw new Error("404. Unauthorized");
            }
            if (!input.name || input.musicGenre || input.responsible) {
                throw new Error("Complete all fields please");
            }
            const idGenerator = new IdGenerator_1.IdGenerator();
            const id = idGenerator.generate();
            const bandDataBase = new BandDatabase_1.BandDatabase();
            yield bandDataBase.createBand(Band_1.Band.toBandModel(Object.assign(Object.assign({}, input), { id })));
        });
    }
}
exports.BandBusiness = BandBusiness;
//# sourceMappingURL=BandBusiness.js.map