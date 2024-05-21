import { PrismaClient } from "@prisma/client";

// exports the original prisma client in dev and production
export const prisma = new PrismaClient();

// but return something like this when the test runs in order to mock the original db call
// export const prismaClientForTest = {
//     sum: {
//         create: () => {

//         }
//     }
// }