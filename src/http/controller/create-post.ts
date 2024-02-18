import { env } from "@/env";
import { makePostUseCase } from "@/useCases/factories/make-post-use-case";
import { posting } from "@/useCases/post-pub-sub";
import { postImageSchema, postSchema } from "@/utils/validations";
import { FastifyReply, FastifyRequest } from "fastify";

interface CustomFastifyRequest extends FastifyRequest {
    file?: {
        buffer: Buffer
        encoding: string
        fieldname: string
        mimetype: string
        originalname: string
        size: number
        filename?: string
    }
}

export async function createPost(request: CustomFastifyRequest, reply: FastifyReply) {
    const { description, author, place, hashtags } = postSchema.parse(request.body)
    const { filename } = postImageSchema.parse(request.file)
    let post
    let postOption = 'post'

    try {
        const createPost = makePostUseCase()
        post = await createPost.execute({ author, place, description, hashtags, image: filename })

        posting.publish(postOption, {
            id: post.id,
            author: post.author,
            place: post.place,
            description: post.description,
            hashtags: post.hashtags,
            image: `${env.API_INSTAGRAM}/uploads/${post.image}`,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            like: Number(0)
        })

    } catch (error) {
        return reply.code(401).send({ error: 'Erro interno do servidor' })
    }

    return await reply.status(201).send(post)
}