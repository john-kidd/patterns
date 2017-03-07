export class Result {
    constructor(error = "", data = null) {
        this.error = error;
        this.data = data;
    }

    success() {
        return this.error === "";
    }

    getError() {
        return this.error;
    }

    getData() {
        return this.data;
    }
}