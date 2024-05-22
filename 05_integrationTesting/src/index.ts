import express from "express";
import { prisma } from "./db";

export const app = express();
app.use(express.json());

app.post("/sum", async(req, res) => {
    const { a, b } = req.body;

    if(a > 1000000 || b > 1000000){
        return res.status(422).json({
            success: false,
            message: "Sorry, we don't support big numbers",
        });
    }

    const answer = a+b;
    const request = await prisma.request.create({
        data: {
            a,b,answer, type: 'ADD'
        }
    });

    res.status(200).json({
        answer, id: request.id
    });
});