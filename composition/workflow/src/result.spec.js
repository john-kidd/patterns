import expect from 'expect';
import { Result } from "./result";

const NAME_STUB = "John Kidd";
const EMAIL_ADDRESS_STUB = "jk@test.com";

function updateNameWithEmail(person) {
    const email = { email: EMAIL_ADDRESS_STUB };
    const merge = Object.assign(email, person);
    return new Result(null, merge);
}

describe("Request", () => {
    it("should return error message when error provided", () => {
        // arrange
        const errorStub = "an error";
        const target = new Result(errorStub);

        // act
        const actual = target.getError();

        // assert
        expect(errorStub).toEqual(actual);
    });

    it("should return the data", () => {
        // arrange
        const personStub = {
            name: NAME_STUB
        };

        // act
        const target = new Result(null, personStub);
        const actual = target.getData();

        // assert
        expect(personStub).toEqual(actual);
    });

    it("should return an updated clone of the data", () => {
        // arrange
        const personStub = {
            name: NAME_STUB
        };

        // act
        const actual = updateNameWithEmail(personStub);

        // assert
        expect(personStub).toNotEqual(actual.getData());
    });

    it("should return an clone of the data with additonal field", () => {
        // arrange
        const personStub = {
            name: NAME_STUB
        };
        const expected = EMAIL_ADDRESS_STUB;

        // act
        const actual = updateNameWithEmail(personStub).getData().email;

        // assert
        expect(expected).toEqual(actual);
    });});