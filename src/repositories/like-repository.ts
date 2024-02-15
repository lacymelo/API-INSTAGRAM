import { type Like, type Prisma } from "@prisma/client"

export interface LikeRepository {
    create: (data: Prisma.LikeUncheckedCreateInput) => Promise<Like>
    userPreviousLikePost: (sessionId: string, postId: string) => Promise<Like | null>
    deleteLike: (likeId: string) => Promise<Like | null>
}