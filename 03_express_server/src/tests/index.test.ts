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

    it("Return Error Message if provided no inputs", async() => {
        const res = await request(app).post("/sum").send({})
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Invalid Inputs");
    });

    it("Return Error Message if provided wrong inputs", async() => {
        const res = await request(app).post("/sum").send({
            a: "String 01",
            b: "String 02"
        })
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Invalid Inputs");
    });
});


describe("GET /sum", () => {
    it("Setting headers as a and b for get: ", async() => {
        const res = await request(app).get('/sum').set({
            a: "1",
            b: "2"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(3);
    });

    it("Not setting any values in the header", async() => {
        const res = await request(app).get('/sum');
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Invalid Inputs");
    })
})