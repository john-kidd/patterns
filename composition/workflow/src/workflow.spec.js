import expect from 'expect';
import { Result } from "./result";
import { runAll } from "./workflow";

function validateName(data) {
    if (data === null || data.name === null)
        return new Result("invalid name");
    return new Result();
}

describe("runAll", () => {
    it("should return error message when error provided", () => {
        // arrange
        const errorStub = { error: 'invalid name' };
        const data = { name: null };

        // act
        const actual = runAll(data, [validateName]);
        const expected = actual.getError();

        // assert
        expect(errorStub).toEqual(actual);
    })
});