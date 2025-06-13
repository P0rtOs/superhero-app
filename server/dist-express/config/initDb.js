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
exports.initDb = initDb;
const db_1 = require("./db");
function initDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield db_1.pool.query(`
      SELECT to_regclass('public.superheroes') as table_exists;
    `);
            if (!res.rows[0].table_exists) {
                console.log('Table "superheroes" does not exist. Creating...');
                yield db_1.pool.query('DROP TABLE IF EXISTS superheroes CASCADE');
                yield db_1.pool.query(`CREATE TABLE superheroes (
      id SERIAL PRIMARY KEY,
      nickname VARCHAR(100) NOT NULL,
      real_name VARCHAR(100) NOT NULL,
      origin_description TEXT NOT NULL,
      superpowers TEXT[] NOT NULL,
      catch_phrase TEXT NOT NULL,
      images TEXT[] NOT NULL
      );`);
                console.log('Table "superheroes" created successfully');
            }
            else {
                console.log('Table "superheroes" already exists');
            }
        }
        catch (error) {
            console.error('Error during DB initialization:', error);
        }
    });
}
