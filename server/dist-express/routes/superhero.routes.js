"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const superhero_controller_1 = __importDefault(require("../controllers/superhero.controller"));
const superhero_validation_1 = require("../dtos/superhero.validation");
const router = (0, express_1.Router)();
router.post('/', superhero_validation_1.validateCreateSuperhero, superhero_controller_1.default.createSuperhero);
router.get('/', superhero_controller_1.default.getSuperheroes);
router.get('/:id', superhero_controller_1.default.getSuperheroById);
router.patch('/:id', superhero_validation_1.validateUpdateSuperhero, superhero_controller_1.default.updateSuperhero);
router.delete('/:id', superhero_controller_1.default.deleteSuperhero);
exports.default = router;
