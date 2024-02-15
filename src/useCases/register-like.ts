import { LikeRepository } from "@/repositories/like-repository"


interface RegisterLikeRequestUseCase {
    sessionId: string
    postId: string
}

export class RegisterLikeUseCase {
    constructor(private readonly prismaRepository: LikeRepository) { }

    async execute({ sessionId, postId }: RegisterLikeRequestUseCase) {
        const like = await this.prismaRepository.create({ sessionId, postId })

        return like
    }
}