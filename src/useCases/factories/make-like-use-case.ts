import { PrismaLikeRepository } from "@/repositories/prisma/prisma-like-repository";
import { RegisterLikeUseCase } from "../register-like";

export function makeLikeUseCase() {
    const prismaRepository = new PrismaLikeRepository()
    const register = new RegisterLikeUseCase(prismaRepository)
    return register
}