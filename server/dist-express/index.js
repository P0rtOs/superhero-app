"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const superhero_routes_1 = __importDefault(require("./routes/superhero.routes"));
require("./config/db");
const error_middleware_1 = require("./middlewares/error.middleware");
const notFound_middleware_1 = require("./middlewares/notFound.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/superheroes', superhero_routes_1.default);
app.use(notFound_middleware_1.notFoundHandler);
app.use(error_middleware_1.errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
