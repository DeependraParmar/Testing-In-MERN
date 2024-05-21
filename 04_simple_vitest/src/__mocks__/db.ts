import { PrismaClient } from "@prisma/client";
import { mockDeep } from "vitest-mock-extended";

console.log('Picked deep mock');
export const prisma = mockDeep<PrismaClient>();