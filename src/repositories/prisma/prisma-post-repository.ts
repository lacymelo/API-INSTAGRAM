import { Prisma } from "@prisma/client";
import { PostRepository } from "../post-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPostRepository implements PostRepository {
    async create(data: Prisma.PostCreateInput) {
        const post = await prisma.post.create({
            data
        })

        return post
    }

    async getPosts(postId: string) {
        const posts = await prisma.post.findMany({
            where: {
                id: postId
            }
        })

        return posts
    }
}