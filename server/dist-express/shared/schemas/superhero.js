"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSuperheroSchema = exports.createSuperheroSchema = void 0;
const zod_1 = require("zod");
exports.createSuperheroSchema = zod_1.z.object({
    nickname: zod_1.z.string().min(1, 'Nickname is required'),
    real_name: zod_1.z.string().min(1, 'Real name is required'),
    origin_description: zod_1.z.string().min(1, 'Description is required'),
    superpowers: zod_1.z.array(zod_1.z.string()).min(1, 'At least one superpower is required'),
    catch_phrase: zod_1.z.string().min(1, 'Catch phrase is required'),
    images: zod_1.z.array(zod_1.z.string()),
});
exports.updateSuperheroSchema = exports.createSuperheroSchema.partial(); // всі поля необов'язкові
