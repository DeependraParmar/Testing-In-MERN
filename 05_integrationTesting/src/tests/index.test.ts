import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "..";
import resetDb from "./helpers/reset-db";

describe("Post /sum", () => {
    beforeAll(async() => {
        console.log("Clearing Database....");
        await resetDb();        
    })

    it("Sum of 1 & 2 should be: 3", async() => {
        const { status, body } = await request(app).post("/sum").send({
            a: 1,
            b: 2
        });

        expect(status).toBe(200);
        expect(body).toEqual({answer: 3, id: expect.any(Number)});
    });

    it("Sum of -10 & -20 should be: -30", async() => {
        const { status, body } = await request(app).post("/sum").send({
            a: -10,
            b: -20
        });

        expect(status).toBe(200);
        expect(body).toEqual({answer: -30, id: expect.any(Number)});
    });

})