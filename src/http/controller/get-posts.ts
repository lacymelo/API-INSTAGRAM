import { env } from "@/env";
import { redis } from "@/lib/radis";
import { makeGetPostsUseCase } from "@/useCases/factories/make-get-posts-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
    let listPost
    let result
    let likes
    try {
        const posts = makeGetPostsUseCase()
        listPost = await posts.execute()

        if (listPost) {
            result = await Promise.all(listPost.map(async (post) => {
                likes = await redis.zrange(post.id, 0, -1, 'WITHSCORES')

                return {
                    ...post,
                    image: `${env.API_INSTAGRAM}/uploads/${post.image}`,
                    like: likes[1] ? Number(likes[1]) : 0
                }
            }))
        }

    } catch (err) {
        throw err
    }

    return await reply.status(200).send(result)
}