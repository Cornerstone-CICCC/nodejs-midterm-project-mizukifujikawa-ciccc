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
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    constructor() {
        this.users = [];
    }
    findAll() {
        return this.users;
    }
    findById(id) {
        const user = this.users.find(u => u.id === id);
        if (!user)
            return null;
        return user;
    }
    findByUsername(username) {
        const user = this.users.find(u => u.username === username);
        if (!user)
            return null;
        console.log('findByUsername');
        console.log("user", user);
        return user;
    }
    create(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, firstname, lastname } = newUser;
            const foundIndex = this.users.findIndex(u => u.username === username);
            if (foundIndex !== -1)
                return false;
            const hashedPassword = yield bcrypt_1.default.hash(password, 12);
            const user = {
                id: (0, uuid_1.v4)(),
                username,
                password: hashedPassword,
                firstname: firstname,
                lastname: lastname
            };
            this.users.push(user);
            return user;
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find(u => u.username === username);
            if (!user)
                return false;
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch)
                return false;
            return user;
        });
    }
    editUserById(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const foundIndex = this.users.findIndex(u => u.id === id);
            if (foundIndex === -1)
                return false;
            let hashedPassword = undefined;
            if (updates.password) {
                hashedPassword = yield bcrypt_1.default.hash(updates.password, 12);
            }
            const updatedUser = Object.assign(Object.assign({}, this.users[foundIndex]), { username: (_a = updates.username) !== null && _a !== void 0 ? _a : this.users[foundIndex].username, password: hashedPassword ? hashedPassword : this.users[foundIndex].password, firstname: (_b = updates.firstname) !== null && _b !== void 0 ? _b : this.users[foundIndex].firstname, lastname: (_c = updates.lastname) !== null && _c !== void 0 ? _c : this.users[foundIndex].lastname });
            this.users[foundIndex] = updatedUser;
            return updatedUser;
        });
    }
    removeUserById(id) {
        const foundIndex = this.users.findIndex(u => u.id === id);
        if (foundIndex === -1)
            return false;
        this.users.splice(foundIndex, 1);
        return true;
    }
    checkUserPass(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("checkUserPass");
            const user = this.users.find(u => u.username === username);
            if (!user)
                return false;
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch)
                return false;
            console.log("user", user);
            return user;
        });
    }
}
exports.default = new UserModel;
