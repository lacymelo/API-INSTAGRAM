import { PrismaLikeRepository } from "@/repositories/prisma/prisma-like-repository"
import { UserPreviousLikePostUseCase } from "../user-previous-like-post"

export function makeUserPreviousLikePost() {
    const prismaRepository = new PrismaLikeRepository()
    const register = new UserPreviousLikePostUseCase(prismaRepository)
    return register
}