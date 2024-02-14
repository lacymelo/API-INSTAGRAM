import { PostRepository } from "@/repositories/post-repository";

export class GetPostsUseCase {
    constructor(private readonly prismaRepository: PostRepository) { }

    async execute() {
        const posts = await this.prismaRepository.getPosts()

        return posts
    }
}