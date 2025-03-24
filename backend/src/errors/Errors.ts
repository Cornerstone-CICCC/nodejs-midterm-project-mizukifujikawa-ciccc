class ErrorX extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ErrorX';
    }
  }

class ErrorY extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ErrorY';
    }
}