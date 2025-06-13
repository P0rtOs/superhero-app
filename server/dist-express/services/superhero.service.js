"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const superhero_model_1 = require("../models/superhero.model");
const superheroService = {
    getAllSuperheroes() {
        return superhero_model_1.SuperheroModel.getAll();
    },
    getSuperheroById(id) {
        return superhero_model_1.SuperheroModel.getById(id);
    },
    createSuperhero(data) {
        // Тут можна додати бізнес-логіку, наприклад, перевірки
        return superhero_model_1.SuperheroModel.create(data);
    },
    updateSuperhero(id, data) {
        // Бізнес-логіка оновлення
        return superhero_model_1.SuperheroModel.update(id, data);
    },
    deleteSuperhero(id) {
        return superhero_model_1.SuperheroModel.delete(id);
    },
};
exports.default = superheroService;
