"use strict";
class Success {
    constructor(value) {
        this.value = value;
    }
    isSuccess() {
        return true;
    }
    isFailure() {
        return false;
    }
}
class Failure {
    constructor(error) {
        this.error = error;
    }
    isSuccess() {
        return false;
    }
    isFailure() {
        return true;
    }
}
