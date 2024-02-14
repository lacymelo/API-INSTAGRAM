import { redis } from "@/lib/radis";
import { liking } from "@/useCases/like-pub-sub";
import { likeSchema } from "@/utils/validations";
import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";

export async function LikePost(request: FastifyRequest, reply: FastifyReply) {
    const { postId } = likeSchema.parse(request.params)
    let { sessionId } = request.cookies
    let likeOption = 1 // definindo like como 1

    if (sessionId) {
        const likes = await redis.zincrby(postId, -1, likeOption)

        liking.publish(postId, {
            likeOption,
            votes: Number(likes)
        })
    }

    if (!sessionId) {
        sessionId = randomUUID()

        reply.setCookie('sessionId', sessionId, {
            path: '/', // acessível em todas as rotas
            maxAge: 60 * 60 * 24 * 30, // dias
            signed: true, // cookie assinado
            httpOnly: true, // acessível somente pelo backend
        })
    }

    try {
        const votes = await redis.zincrby(postId, 1, likeOption)

        liking.publish(postId, {
            likeOption,
            votes: Number(votes)
        })

        return await reply.status(200).send()
    } catch (error) {
        return await reply.status(400).send('A failure, please try again later!')
    }
}