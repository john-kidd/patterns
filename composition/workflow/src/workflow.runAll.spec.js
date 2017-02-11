import expect from 'expect';
import { Result } from "./result";
import { runAll } from "./workflow";

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

describe("runAll", () => {
    it("should return that we have no errors", () => {
        // arrange
        const data = { name: "John F Kidd", emailAddress: "john@test.com" };
        const expected = "";

        // act
        const result = runAll(data, [validateName, validateEmail]);
        const actual = result.getError();

        // assert
        expect(expected).toEqual(actual);
    });

    it("should return that we have an invalid name", () => {
        // arrange
        const data = { name: null, emailAddress: "john@test.com" };
        const expected = INVALID_NAME;

        // act
        const result = runAll(data, [validateName, validateEmail]);
        const actual = result.getError();

        // assert
        expect(expected).toEqual(actual);
    });

    it("should return that we have an invalid email address", () => {
        // arrange
        const data = { name: "John F Kidd", emailAddress: null };
        const expected = INVALID_EMAIL_ADDRESS;

        // act
        const result = runAll(data, [validateName, validateEmail]);
        const actual = result.getError();

        // assert
        expect(expected).toEqual(actual);
    });

    it("should return that we have an invalid name and an invalid aemail address", () => {
        // arrange
        const data = { name: null, emailAddress: null };
        const expected = `${INVALID_NAME}<br/>${INVALID_EMAIL_ADDRESS}`;

        // act
        const result = runAll(data, [validateName, validateEmail]);
        const actual = result.getError();

        // assert
        expect(expected).toEqual(actual);
    });

    it ("should return new data object with updated email address", () => {
        // arrange
        const data = { name: VALID_NAME, emailAddress: INVALID_EMAIL_ADDRESS };
        const expected = VALID_EMAIL_ADDRESS;

        // act
        const result = runAll(data, [validateName, validateEmail, updateEmailAddress]);
        const actual = result.getData().emailAddress;

        // assert
        expect(data).toNotEqual(result.getData());
        expect(expected).toEqual(actual);
    });
});