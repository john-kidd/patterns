export class Request {
    constructor(error = "") {
        this.error = error;
    }

    success() {
        return this.error === "";
    }

    getError() {
        return this.error;
    }
}