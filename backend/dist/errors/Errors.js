"use strict";
class ErrorX extends Error {
    constructor(message) {
        super(message);
        this.name = 'ErrorX';
    }
}
class ErrorY extends Error {
    constructor(message) {
        super(message);
        this.name = 'ErrorY';
    }
}
