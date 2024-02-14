import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import { randomUUID } from "node:crypto"

export async function fileUpload(request: FastifyRequest, reply: FastifyReply) {
    const data = await request.file()

    if (!data) {
        return reply.status(400).send({ error: 'Missing file input' })
    }

    //recupera a extensão do arquivo
    const extension = path.extname(data.filename)

    // nome original do arquivo
    const fileBaseName = path.basename(data.filename, extension)

    // gerando um novo nome para o arquivo
    const fileUploadName = `${fileBaseName}-${randomUUID()}-${extension}`

    // diretório onde o arquivo será salvo
    const uploadDestination = path.resolve(__dirname, '../../uploads', fileUploadName)

    return uploadDestination
}