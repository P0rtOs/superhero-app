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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superhero_service_1 = __importDefault(require("../services/superhero.service"));
exports.default = {
    createSuperhero(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newHero = yield superhero_service_1.default.createSuperhero(req.body);
                res.status(201).json(newHero);
            }
            catch (error) {
                next(error);
            }
        });
    },
    // _req заглушка
    getSuperheroes(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const heroes = yield superhero_service_1.default.getAllSuperheroes();
                res.json(heroes);
            }
            catch (error) {
                next(error);
            }
        });
    },
    getSuperheroById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hero = yield superhero_service_1.default.getSuperheroById(req.params.id);
                if (!hero) {
                    res.status(404).json({ error: 'Superhero not found' });
                    return; // просто вийти з функції, нічого не повертати
                }
                res.json(hero);
            }
            catch (error) {
                next(error);
            }
        });
    },
    updateSuperhero(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedHero = yield superhero_service_1.default.updateSuperhero(req.params.id, req.body);
                if (!updatedHero) {
                    res.status(404).json({ error: 'Superhero not found' });
                    return;
                }
                res.json(updatedHero);
            }
            catch (error) {
                next(error);
            }
        });
    },
    deleteSuperhero(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield superhero_service_1.default.deleteSuperhero(req.params.id);
                if (!deleted) {
                    res.status(404).json({ error: 'Superhero not found' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    },
};
