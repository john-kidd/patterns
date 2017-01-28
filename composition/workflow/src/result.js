export class Result {
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