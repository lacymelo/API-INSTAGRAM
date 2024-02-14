import { makeGetPostsUseCase } from "@/useCases/factories/make-get-posts-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
    let listPost
    try {
        const posts = makeGetPostsUseCase()
        listPost = await posts.execute()
    } catch (err) {
        throw err
    }

    return await reply.status(200).send(listPost)
}