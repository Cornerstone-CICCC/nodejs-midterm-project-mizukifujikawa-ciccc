"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = __importDefault(require("../controllers/item.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const userRouter = (0, express_1.Router)();
userRouter.post('/signup', auth_middleware_1.checkLoggedOut, item_controller_1.default.addUser); // POST /users/signup
userRouter.post('/login', auth_middleware_1.checkLoggedOut, item_controller_1.default.loginUser); // POST /users/login
userRouter.get('/logout', item_controller_1.default.logoutUser); // GET /users/logout
userRouter.get('/check-auth', item_controller_1.default.checkCookie); // GET /users/check-auth
userRouter.get('/:username', item_controller_1.default.getUserByUsername); // GET /users
exports.default = userRouter;
