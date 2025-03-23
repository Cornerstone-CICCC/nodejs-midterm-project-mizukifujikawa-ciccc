"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = __importDefault(require("../controllers/item.controller"));
const itemRouter = (0, express_1.Router)();
itemRouter.get('/', item_controller_1.default.getItems); // GET /items
itemRouter.get('/:title', item_controller_1.default.getItemByTitle); // GET /items/title
itemRouter.get('/:id', item_controller_1.default.getItemById); // GET /items/id
itemRouter.post('/register', item_controller_1.default.addItem); // POST /items
itemRouter.post('/update/:id', item_controller_1.default.updateItemById); // POST /items/update/id
itemRouter.get('/delete/:id', item_controller_1.default.deleteItemById); // GET /items/delete/id
exports.default = itemRouter;
// Editのスマホ対応
// (モーダルをコンポーネント化したい
// 削除機能
// 個別の表示対応
// 画像の入力欄
// デザイン修正
