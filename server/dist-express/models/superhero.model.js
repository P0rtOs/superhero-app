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
            const result = yield db_1.pool.query('SELECT * FROM superheroes');
            return result.rows;
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
            const result = yield db_1.pool.query(`INSERT INTO superheroes 
     (nickname, real_name, origin_description, superpowers, catch_phrase, images)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`, [
                data.nickname,
                data.real_name,
                data.origin_description,
                data.superpowers,
                data.catch_phrase,
                data.images
            ]);
            return result.rows[0];
        });
    },
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            Number(id);
            const fields = [];
            const values = [];
            let idx = 1;
            for (const [key, value] of Object.entries(data)) {
                fields.push(`${key} = $${idx++}`);
                values.push(value);
            }
            if (fields.length === 0)
                return null;
            values.push(id);
            const query = `
      UPDATE superheroes
      SET ${fields.join(', ')}
      WHERE id = $${idx}
      RETURNING *
    `;
            const result = yield db_1.pool.query(query, values);
            return result.rows[0] || null;
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            Number(id);
            const result = yield db_1.pool.query('DELETE FROM superheroes WHERE id = $1', [id]);
            return ((_a = result.rowCount) !== null && _a !== void 0 ? _a : 0) > 0;
        });
    }
};
