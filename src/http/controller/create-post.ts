import { makePostUseCase } from "@/useCases/factories/make-post-use-case";
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
    let postId

    try {
        const createPost = makePostUseCase()
        postId = await createPost.execute({ author, place, description, hashtags, image: filename })
    } catch (error) {
        return reply.code(401).send({ error: 'Erro interno do servidor' })
    }

    return await reply.status(201).send(postId)
}