import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "../index";
import { prisma } from "../__mocks__/db";


// mocking the db call whenever prisma.sum.create is 
// Problem with this approach is that as time goes by, the functional and object keeps on increasing and with that, you have to manually mock them out. In order to get rid of this, you have the concept of deep mocking present in src/__mocks__/db.ts
// vi.mock("../db", () => {
//     return {
//         prisma: {
//             sum: {
//                 create: vi.fn()
//             }
//         }
//     }
// });

vi.mock("../db");


describe("Post /sum", () => {
    it("Return sum of two +ve numbers", async () => {

        prisma.sum.create.mockResolvedValue({
            id: 1,
            a: 1,
            b: 2,
            result: 3,
        }); // returning a mocked value for prisma.sum.create's fake requests

        vi.spyOn(prisma.sum, "create"); // spying the prisma.sum.create() in order to ensure that the function is called with right set of arguments.

        const res = await request(app).post('/sum').send({
            a: 10,
            b: 20
        });

        expect(prisma.sum.create).toHaveBeenCalledWith({
            data: {
                a: 10,
                b: 20,
                result: 30,
            }
        });
        expect(prisma.sum.create).toHaveBeenCalledOnce();
        expect(prisma.sum.create).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(30);
        expect(res.body.id).toBe(1);
    });

    it("Return sum of two -ve numbers", async () => {
        const res = await request(app).post('/sum').send({
            a: -190,
            b: -20
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(-210);
    });

    it("Return Error Message if provided no inputs", async () => {
        const res = await request(app).post("/sum").send({})
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Invalid Inputs");
    });

    it("Return Error Message if provided wrong inputs", async () => {
        const res = await request(app).post("/sum").send({
            a: "String 01",
            b: "String 02"
        })
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Invalid Inputs");
    });
});


describe("GET /sum", () => {
    it("Setting headers as a and b for get: ", async () => {
        const res = await request(app).get('/sum').set({
            a: "1",
            b: "2"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(3);
    });

    it("Not setting any values in the header", async () => {
        const res = await request(app).get('/sum');
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Invalid Inputs");
    })
})