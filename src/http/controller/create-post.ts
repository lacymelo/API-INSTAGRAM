import { fileUpload } from "@/config/upload";
import { makePostUseCase } from "@/useCases/factories/make-post-use-case";
import { postSchema } from "@/utils/validations";
import { FastifyReply, FastifyRequest } from "fastify";

interface RegisterPostRequestUseCase {
    author: string
    place: string
    description: string
    hashtags: string
}

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
    const { description } = request.body as RegisterPostRequestUseCase
    // let postId

    // const data = await request.file()

    // if (!data) {
    //     return reply.status(400).send({ error: 'Missing file input' })
    // }

    // return reply.status(201).send({ message: data })

    // try {
    //     const pathDestination = await fileUpload(request, reply)

    //     try {
    //         const createPost = makePostUseCase()
    //         postId = await createPost.execute({ author, place, description, hashtags, image: pathDestination })
    //     } catch (error) {
    //         return await reply.status(400).send({ error: 'Missing file input' })
    //     }
    // } catch (err) {
    //     throw err
    // }

    // return await reply.status(201).send(postId)
    try {
        const data = await request.file()
        // const { description } = postSchema.parse(request.body)

        if (!data || !data.file) {
            return reply.status(400).send({ error: 'Arquivo não encontrado' })
        }

        const fileData = {
            filename: data.filename,
            mimetype: data.mimetype,
            // Outros dados que você deseja acessar do arquivo
        }

        console.log(data)

        return reply.status(201).send({ message: fileData, description: description })
    } catch (error) {
        console.error('Erro ao processar o arquivo:', error)
        return reply.status(500).send({ error: 'Erro interno do servidor' })
    }
}