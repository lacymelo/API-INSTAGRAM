import { PrismaLikeRepository } from "@/repositories/prisma/prisma-like-repository"
import { DeletelikeUseCase } from "../delete-like"

export function makeDeleteLikeUseCase() {
    const prismaRepository = new PrismaLikeRepository()
    const deleteRegister = new DeletelikeUseCase(prismaRepository)
    return deleteRegister
}