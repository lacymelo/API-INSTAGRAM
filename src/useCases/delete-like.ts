import { LikeRepository } from "@/repositories/like-repository"

interface DeleteLikeRequestUseCase {
    likeId: string
}

export class DeletelikeUseCase {
    constructor(private readonly prismaRepository: LikeRepository) { }

    async execute({ likeId }: DeleteLikeRequestUseCase) {
        const like = await this.prismaRepository.deleteLike(likeId)

        return like
    }
}