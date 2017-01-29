import expect from 'expect';
import { Result } from "./result";
import { runAll } from "./workflow";

const INVALID_NAME = "invalid name";
const INVALID_EMAIL_ADDRESS = "invalid email address";

function validateName(data) {
    if (data === null || !data.name || data.name === null)
        return new Result(INVALID_NAME);
    return new Result();
}

function validateEmail(data) {
    if (data === null || !data.emailAddress || data.emailAddress === null)
        return new Result(INVALID_EMAIL_ADDRESS);
    return new Result();
}

describe("runAll", () => {
    it("should return that we have no errors", () => {
        // arrange
        const data = { name: "John F Kidd", emailAddress: "john@test.com" };
        const expected = "";

        // act
        const result = runAll(data, [validateName]);
        const actual = result.getError();

        // assert
        expect(expected).toEqual(actual);
    })

    it("should return that we have an invalid name", () => {
        // arrange
        const data = { name: null };
        const expected = INVALID_NAME;

        // act
        const result = runAll(data, [validateName]);
        const actual = result.getError();

        // assert
        expect(expected).toEqual(actual);
    })

    it("should return that we have an invalid email address", () => {
        // arrange
        const data = { name: "John F Kidd", emailAddress: null };
        const expected = INVALID_EMAIL_ADDRESS;

        // act
        const result = runAll(data, [validateName, validateEmail]);
        const actual = result.getError();

        // assert
        expect(expected).toEqual(actual);
    })

    it("should return that we have an invalid name and an invalid aemail address", () => {
        // arrange
        const data = { name: null, emailAddress: null };
        const expected = `${INVALID_NAME}<br/>${INVALID_EMAIL_ADDRESS}`;

        // act
        const result = runAll(data, [validateName, validateEmail]);
        const actual = result.getError();

        // assert
        expect(expected).toEqual(actual);
    })
});