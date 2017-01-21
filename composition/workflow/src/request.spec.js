import expect from 'expect';
import { Request } from "./request";

describe("Request", () => {
    it("should return error message when error provided", () => {
        // arrange
        const errorStub = "an error";
        const target = new Request(errorStub);

        // act
        const actual = target.getError();

        // assert
        expect(errorStub).toEqual(actual);
    })
});