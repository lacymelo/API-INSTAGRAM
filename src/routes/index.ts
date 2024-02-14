import { createPost } from "@/http/controller/create-post";
import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
    // cria a post
    app.post('/posts', createPost)
}