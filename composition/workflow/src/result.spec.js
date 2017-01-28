import expect from 'expect';
import { Result } from "./result";

describe("Request", () => {
    it("should return error message when error provided", () => {
        // arrange
        const errorStub = "an error";
        const target = new Result(errorStub);

        // act
        const actual = target.getError();

        // assert
        expect(errorStub).toEqual(actual);
    })
});