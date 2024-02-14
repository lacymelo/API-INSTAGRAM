import { createPost } from "@/http/controller/create-post";
import { FastifyInstance } from "fastify";
import multer from "fastify-multer"
import multerConfig from "../config/upload";
const upload = multer(multerConfig)

export async function appRoutes(app: FastifyInstance) {
    // cria a post
    app.post('/posts', { preHandler: upload.single('image') }, createPost)
}