import expect from 'expect';
import { Result } from "./result";
import { Result } from "./domainModel";
import { runAll } from "./pipeline";

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