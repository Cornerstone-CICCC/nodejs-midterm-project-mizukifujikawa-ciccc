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
const uuid_1 = require("uuid");
class ItemModel {
    constructor() {
        this.items = [
            {
                id: '001',
                title: 'Harry Potter and the Sorcerer’s Stone',
                author: 'J. K. Rowling',
                publish_year: 1997,
                evaluation: 5,
                img_url: 'https://covers.openlibrary.org/b/id/14815558-L.jpg'
            },
            {
                id: '002',
                title: 'Harry Potter and the Chamber of Secrets',
                author: 'J. K. Rowling',
                publish_year: 1998,
                evaluation: 5,
                img_url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474169725i/15881.jpg'
            },
            {
                id: '003',
                title: 'Harry Potter and the Prisoner of Azkaban',
                author: 'J. K. Rowling',
                publish_year: 1999,
                evaluation: 5,
                img_url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630547330i/5.jpg'
            },
            {
                id: '004',
                title: 'Harry Potter and the Goblet of Fire',
                author: 'J. K. Rowling',
                publish_year: 2000,
                evaluation: 5,
                img_url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1627044952i/58613424.jpg'
            },
            {
                id: '005',
                title: 'Harry Potter and the Order of the Phoenix',
                author: 'J. K. Rowling',
                publish_year: 2003,
                evaluation: 5,
                img_url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1627045351i/58613451.jpg'
            },
            {
                id: '006',
                title: 'Harry Potter and the Half-Blood Prince',
                author: 'J. K. Rowling',
                publish_year: 2005,
                evaluation: 5,
                img_url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1627043894i/58613345.jpg'
            },
            {
                id: '007',
                title: 'Harry Potter and the Deathly Hallows',
                author: 'J. K. Rowling',
                publish_year: 2007,
                evaluation: 5,
                img_url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1627042661i/58613224.jpg'
            }
        ];
    }
    findAll() {
        return this.items;
    }
    findById(id) {
        const item = this.items.find(u => u.id === id);
        if (!item)
            return null;
        return item;
    }
    findByTitle(title) {
        const item = this.items.find(u => u.title === title);
        if (!item)
            return null;
        return item;
    }
    create(newItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, author, publish_year, evaluation, img_url } = newItem;
            const foundIndex = this.items.findIndex(u => u.title === title);
            if (foundIndex !== -1)
                return false;
            const item = {
                id: (0, uuid_1.v4)(),
                title,
                author: author,
                publish_year: publish_year,
                evaluation: evaluation,
                img_url: img_url
            };
            this.items.push(item);
            return item;
        });
    }
    editItemById(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const foundIndex = this.items.findIndex(u => u.id === id);
            if (foundIndex === -1)
                return false;
            const updatedItem = Object.assign(Object.assign({}, this.items[foundIndex]), { title: (_a = updates.title) !== null && _a !== void 0 ? _a : this.items[foundIndex].title, author: (_b = updates.author) !== null && _b !== void 0 ? _b : this.items[foundIndex].author, publish_year: (_c = updates.publish_year) !== null && _c !== void 0 ? _c : this.items[foundIndex].publish_year, img_url: (_d = updates.img_url) !== null && _d !== void 0 ? _d : this.items[foundIndex].img_url, evaluation: (_e = updates.evaluation) !== null && _e !== void 0 ? _e : this.items[foundIndex].evaluation });
            this.items[foundIndex] = updatedItem;
            return updatedItem;
        });
    }
    removeItemById(id) {
        const foundIndex = this.items.findIndex(u => u.id === id);
        if (foundIndex === -1)
            return false;
        this.items.splice(foundIndex, 1);
        return true;
    }
}
exports.default = new ItemModel;
