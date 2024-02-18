import { redis } from "@/lib/radis";
import { makeDeleteLikeUseCase } from "@/useCases/factories/make-delete-like-use-case";
import { makeLikeUseCase } from "@/useCases/factories/make-like-use-case";
import { makeUserPreviousLikePost } from "@/useCases/factories/make-user-previous-like-post";
import { liking } from "@/useCases/like-pub-sub";
import { likeSchema } from "@/utils/validations";
import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";

export async function likePost(request: FastifyRequest, reply: FastifyReply) {
    const { postId } = likeSchema.parse(request.params)
    let previousLike
    let likeOption = 'like'
    let like

    let { sessionId } = request.cookies

    if (!sessionId) {
        sessionId = randomUUID()

        reply.setCookie('sessionId', sessionId, {
            path: '/', // acessível em todas as rotas
            maxAge: 60 * 60 * 24 * 30, // dias
            signed: true, // cookie assinado
            httpOnly: true, // acessível somente pelo backend
        })
    }

    if (sessionId) {
        const getPreviousLike = makeUserPreviousLikePost()
        previousLike = await getPreviousLike.execute({ sessionId, postId })

        if (previousLike) {
            const deleteLike = makeDeleteLikeUseCase()
            like = await deleteLike.execute({ likeId: previousLike.id })

            if (like) {
                const likes = await redis.zincrby(postId, -1, likeOption)

                liking.publish(likeOption, {
                    postId,
                    likes: Number(likes)
                })
            }
        } else {
            try {
                const createLike = makeLikeUseCase()
                like = await createLike.execute({ sessionId, postId })

                const likes = await redis.zincrby(postId, 1, likeOption)

                liking.publish(likeOption, {
                    postId,
                    likes: Number(likes)
                })
            } catch (err) {
                return await reply.status(400).send('A failure, please try again later!')
            }
        }

    }

    return await reply.status(200).send(like)
}