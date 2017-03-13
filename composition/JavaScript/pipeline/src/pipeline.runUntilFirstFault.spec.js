import expect from 'expect';
import { Result } from "./result";
import { Result } from "./domainModel";
import { runUntilFirstFault } from "./pipeline";

describe("runUntilFirstFault", () => {
    it("should return that we have no errors", () => {
        // arrange
        const data = { name: "John F Kidd", emailAddress: "john@test.com" };
        const expected = "";

        // act
        const result = runUntilFirstFault(data, [validateName, validateEmail]);
        const actual = result.getError();

        // assert
        expect(expected).toEqual(actual);
    });

    it("should return that we have an invalid name", () => {
        // arrange
        const data = { name: null, emailAddress: "john@test.com" };
        const expected = INVALID_NAME;

        // act
        const result = runUntilFirstFault(data, [validateName, validateEmail]);
        const actual = result.getError();

        // assert
        expect(expected).toEqual(actual);
    });

    it("should return that we have an invalid email address", () => {
        // arrange
        const data = { name: "John F Kidd", emailAddress: null };
        const expected = INVALID_EMAIL_ADDRESS;

        // act
        const result = runUntilFirstFault(data, [validateName, validateEmail]);
        const actual = result.getError();

        // assert
        expect(expected).toEqual(actual);
    });

    it("should return that we have an invalid name", () => {
        // arrange
        const data = { name: null, emailAddress: null };
        const expected = INVALID_NAME;

        // act
        const result = runUntilFirstFault(data, [validateName, validateEmail]);
        const actual = result.getError();

        // assert
        expect(expected).toEqual(actual);
    });
});