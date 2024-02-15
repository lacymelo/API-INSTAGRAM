import { LikeRepository } from "@/repositories/like-repository"

interface UserPreviousLikePostRequestUseCase {
    sessionId: string
    postId: string
}

export class UserPreviousLikePostUseCase {
    constructor(private readonly prismaRepository: LikeRepository) { }

    async execute({ sessionId, postId }: UserPreviousLikePostRequestUseCase) {
        const like = await this.prismaRepository.userPreviousLikePost(sessionId, postId)

        return like
    }
}