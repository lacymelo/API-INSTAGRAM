import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository";
import { RegisterPostUseCase } from "../register-post";

export function makePostUseCase() {
    const prismaRepository = new PrismaPostRepository()
    const postRegister = new RegisterPostUseCase(prismaRepository)
    return postRegister
}