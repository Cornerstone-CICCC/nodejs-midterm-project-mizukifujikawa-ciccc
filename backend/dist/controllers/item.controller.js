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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const item_model_1 = __importDefault(require("../models/item.model"));
/**
 * Get all items
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Returns list of items.
 */
const getItems = (req, res) => {
    const items = item_model_1.default.findAll();
    res.status(200).json(items);
};
/**
 * Get item by ID
 *
 * @param {Request<{ id: string}>} req
 * @param {Response} res
 * @returns {void} Returns one item.
 */
const getItemById = (req, res) => {
    const { id } = req.params;
    const item = item_model_1.default.findById(id);
    if (!item) {
        res.status(404).send('Item not found!');
        return;
    }
    res.status(200).json(item);
};
/**
 * Get item by title
 *
 * @param {Request<{ title: string}>} req
 * @param {Response} res
 * @returns {void} Returns one item.
 */
const getItemByTitle = (req, res) => {
    const { title } = req.params;
    const item = item_model_1.default.findByTitle(title);
    if (!item) {
        res.status(404).send('Item not found!');
        return;
    }
    res.status(200).json(item);
};
/**
 * Add new item
 *
 * @param {Request<{}, {}, Omit<Item, 'id'>>} req
 * @param {Response} res
 * @returns {void} Returns newly created item.
 */
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, publish_year, evaluation, img_url } = req.body;
    if (!title) {
        res.status(500).json({ error: 'Title is empty!' });
        return;
    }
    const item = yield item_model_1.default.create({ title, author, publish_year, evaluation, img_url });
    if (!item) {
        res.status(409).json({ error: 'Title is duplicate!' });
        return;
    }
    res.status(201).json(item);
});
/**
 * Edit item by ID
 *
 * @param {Request<{ id: string }, {}, Partial<Item>>} req
 * @param {Response} res
 * @returns {void} Returns updated item.
 */
const updateItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, author, publish_year, evaluation, img_url } = req.body;
    const item = yield item_model_1.default.editItemById(id, { title, author, publish_year, evaluation, img_url });
    if (!item) {
        res.status(404).json({ error: "Item does not exist!" });
        return;
    }
    res.status(200).json(item);
});
/**
 * Delete item by ID
 *
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void} Returns success or fail message.
 */
const deleteItemById = (req, res) => {
    const { id } = req.params;
    const result = item_model_1.default.removeItemById(id);
    if (!result) {
        res.status(404).json({ message: "Item not found!" });
        return;
    }
    res.status(200).json({ message: "Deleted item!" });
};
exports.default = {
    getItems,
    getItemById,
    getItemByTitle,
    addItem,
    updateItemById,
    deleteItemById
};
