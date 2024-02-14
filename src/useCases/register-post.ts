import { PostRepository } from "@/repositories/post-repository";

interface RegisterPostRequestUseCase {
    author: string
    place: string
    description: string
    hashtags: string
    image: string
}

export class RegisterPostUseCase {
    constructor(private readonly prismaRepository: PostRepository) { }

    async execute({ author, place, description, hashtags, image }: RegisterPostRequestUseCase) {
        const post = await this.prismaRepository.create({ author, place, description, hashtags, image })

        return post
    }
}