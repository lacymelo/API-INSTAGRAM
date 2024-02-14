import { PrismaPostRepository } from "@/repositories/prisma/prisma-post-repository";
import { GetPostsUseCase } from "../get-posts";

export function makeGetPostsUseCase() {
    const prismaRepository = new PrismaPostRepository()
    const posts = new GetPostsUseCase(prismaRepository)
    return posts
}