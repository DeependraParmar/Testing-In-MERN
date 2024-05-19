import { describe, it, expect } from "@jest/globals";
import { sum } from "../src";

describe('Testing sum function: ', () => {
    it("Sum of 1+2 is equal to 3", () => {
        expect(sum(1,2)).toBe(3);
    });

    it("Sum of -3 and -4 is equal to -7", () => {
        expect(sum(-3,-4)).toBe(-7);
    });

    it("Sum of 10+221 is equal to 231", () => {
        expect(sum(10,221)).toBe(231);
    });
})