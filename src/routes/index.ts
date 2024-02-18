import { createPost } from "@/http/controller/create-post";
import { FastifyInstance } from "fastify";
import multer from "fastify-multer"
import multerConfig from "../config/upload";
import { getPosts } from "@/http/controller/get-posts";
import { likePost } from "@/http/controller/like-post";
import { fileFilter } from "@/utils/file-filter";
import { likeResultWebSocket } from "@/websocket/controllers/like-result-websocket";
import { postResultWebsocket } from "@/websocket/controllers/post-result-websocket";

const upload = multer({
    ...multerConfig,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10, // Limite de 10MB (tamanho em bytes)
    }
})

export async function appRoutes(app: FastifyInstance) {
    // cria a post
    app.post('/post', { preHandler: upload.single('image') }, createPost)

    // lista de posts
    app.get('/posts', getPosts)

    // like em um post
    app.get('/post/:postId', likePost)

    // mostra a contagem dos likes em tempo real
    app.get('/like/result', { websocket: true }, likeResultWebSocket)

    app.get('/post/result', { websocket: true }, postResultWebsocket)
}