import { createPost } from "@/http/controller/create-post";
import { FastifyInstance } from "fastify";
import multer from "fastify-multer"
import multerConfig from "../config/upload";
import { getPosts } from "@/http/controller/get-posts";
import { likePost } from "@/http/controller/like-post";
import { postResultWebSocket } from "@/websocket/controllers/post-result-websocket";
const upload = multer(multerConfig)

export async function appRoutes(app: FastifyInstance) {
    // cria a post
    app.post('/posts', { preHandler: upload.single('image') }, createPost)

    // lista de posts
    app.get('/posts', getPosts)

    // like em um post
    app.get('/post/:postId', likePost)

    // mostra a contagem dos likes em tempo real
    app.get('/post/:postId/results', { websocket: true }, postResultWebSocket)
}