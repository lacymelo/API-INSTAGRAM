import { Prisma } from "@prisma/client";
import { LikeRepository } from "../like-repository";
import { prisma } from "@/lib/prisma";

export class PrismaLikeRepository implements LikeRepository {
    async create(data: Prisma.LikeUncheckedCreateInput) {
        const like = await prisma.like.create({
            data
        })

        return like
    }

    async userPreviousLikePost(sessionId: string, postId: string) {
        const like = await prisma.like.findUnique({
            where: {
                postId_sessionId: {
                    sessionId,
                    postId
                }
            }
        })

        return like
    }

    async deleteLike(likeId: string) {
        const like = await prisma.like.delete({
            where: {
                id: likeId
            }
        })

        return like
    }
}