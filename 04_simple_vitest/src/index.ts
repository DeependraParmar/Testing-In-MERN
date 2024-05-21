import express from "express";
import { z } from "zod";
import { prisma } from "./db";

export const app = express();
app.use(express.json());

const sumSchema = z.object({
    a: z.number(),
    b: z.number(),
});

app.post("/sum", async (req, res) => {
    const parsedResponse = await sumSchema.safeParse(req.body);

    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Invalid Inputs"
        });
    }

    // mocking the database login here
    await prisma.sum.create({
        data: {
            a: parsedResponse.data.a,
            b: parsedResponse.data.b,
            result: parsedResponse.data.a + parsedResponse.data.b,
        }
    })

    res.status(200).json({
        answer: parsedResponse.data.a + parsedResponse.data.b,
    })
});

app.get("/sum", async (req, res) => {
    const parsedResponse = await sumSchema.safeParse({
        a: Number(req.headers["a"]),
        b: Number(req.headers["b"])
    });

    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Invalid Inputs"
        });
    }

    return res.status(200).json({
        answer: parsedResponse.data.a + parsedResponse.data.b
    })
})