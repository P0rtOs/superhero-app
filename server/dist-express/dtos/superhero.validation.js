"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateSuperhero = validateCreateSuperhero;
exports.validateUpdateSuperhero = validateUpdateSuperhero;
const superhero_1 = require("../shared/schemas/superhero");
function validateCreateSuperhero(req, res, next) {
    const result = superhero_1.createSuperheroSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ error: 'Validation failed' });
        return;
    }
    req.body = result.data;
    next();
}
function validateUpdateSuperhero(req, res, next) {
    const result = superhero_1.updateSuperheroSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ error: 'Validation failed' });
        return;
    }
    req.body = result.data;
    next();
}
