"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = __importDefault(require("../controllers/item.controller"));
const userRouter = (0, express_1.Router)();
userRouter.get('/', item_controller_1.default.getItems); // GET /items
userRouter.get('/:title', item_controller_1.default.getItemByTitle); // GET /items/title
userRouter.get('/:id', item_controller_1.default.getItemById); // GET /items/id
userRouter.post('/register', item_controller_1.default.addItem); // POST /items
userRouter.post('/update/:id', item_controller_1.default.updateItemById); // POST /items/update/id
userRouter.get('/delete/:id', item_controller_1.default.deleteItemById); // GET /items/delete/id
exports.default = userRouter;
