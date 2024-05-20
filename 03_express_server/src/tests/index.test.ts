import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import { app } from "../index";

describe("Post /sum", () => {
    it("Return sum of two +ve numbers", async () => {
        const res = await request(app).post('/sum').send({
            a:10,
            b:20
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(30); 
    });
    it("Return sum of two -ve numbers", async () => {
        const res = await request(app).post('/sum').send({
            a:-190,
            b:-20
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(-210); 
    });
});