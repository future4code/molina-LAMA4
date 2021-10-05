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
exports.BandController = void 0;
const BandBusiness_1 = require("../business/BandBusiness");
const BandDatabase_1 = require("../data/BandDatabase");
class BandController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    name: req.body.name,
                    musicGenre: req.body.musicGenre,
                    responsible: req.body.responsible
                };
                const bandBusiness = new BandBusiness_1.BandBusiness();
                const token = yield bandBusiness.createBand(input, req.headers.authorization);
                res.status(200).send({ token });
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
            finally {
                yield BandDatabase_1.BandDatabase.destroyConnection;
            }
        });
    }
}
exports.BandController = BandController;
//# sourceMappingURL=BandController.js.map