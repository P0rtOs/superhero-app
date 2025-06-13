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
exports.SuperheroModel = void 0;
const db_1 = require("../config/db");
exports.SuperheroModel = {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // Заглушка: повертаємо один хардкодний об’єкт супергероя для тесту
            return [
                {
                    id: 1,
                    nickname: 'Superman',
                    real_name: 'Clark Kent',
                    origin_description: 'Він народився Кал-Ел на планеті Криптон...',
                    superpowers: ['solar energy absorption', 'flight', 'heat vision'],
                    catch_phrase: "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
                    images: [],
                },
            ];
            // Пізніше замінимо на справжній запит до БД:
            // const result = await pool.query('SELECT * FROM superheroes');
            // return result.rows;
        });
    },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.pool.query('SELECT * FROM superheroes WHERE id = $1', [id]);
            return result.rows[0] || null;
        });
    },
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.pool.query(`INSERT INTO superheroes (nickname, real_name, origin_description, superpowers, catch_phrase)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`, [data.nickname, data.real_name, data.origin_description, data.superpowers, data.catch_phrase]);
            return result.rows[0];
        });
    },
    // @ts-ignore
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const fields = Object.keys(data).map((key, index) => `${key} = $${index + 2}`).join(', ');
        });
    },
    // @ts-ignore
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            const result = yield db_1.pool.query('DELETE FROM superheroes WHERE id = $1', [id]);
        });
    }
    // update, delete, etc...
};
