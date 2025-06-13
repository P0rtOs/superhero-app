"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
// @ts-ignore
function notFoundHandler(req, res, next) {
    res.status(404).json({ error: 'Route not found' });
}
