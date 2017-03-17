import { Result } from "./result";

const INVALID_NAME = "invalid name";
const INVALID_EMAIL_ADDRESS = "invalid email address";
const VALID_NAME = "John";
const VALID_EMAIL_ADDRESS = "jk@test.com";

function validateName(data) {
    if (data === null || !data.name || data.name === null)
        return new Result(INVALID_NAME, data);
    return new Result("", data);
}

function validateEmail(data) {
    if (data === null || !data.emailAddress || data.emailAddress === null)
        return new Result(INVALID_EMAIL_ADDRESS, data);
    return new Result("", data);
}

function updateEmailAddress(data) {
    const newInstanceWithDifferentEmailAddress = Object.assign({}, data, { emailAddress: VALID_EMAIL_ADDRESS });
    return new Result("", newInstanceWithDifferentEmailAddress);
}