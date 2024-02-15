import { redis } from "@/lib/radis";
import { makeGetPostsUseCase } from "@/useCases/factories/make-get-posts-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
    let listPost
    let result
    try {
        const posts = makeGetPostsUseCase()
        listPost = await posts.execute()

        result = await redis.zrange('cee3e47d-2839-4002-89a1-2568e3eaa56c', 0, -1, 'WITHSCORES')
    } catch (err) {
        throw err
    }

    return await reply.status(200).send(result)
}