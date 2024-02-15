import { createPost } from "@/http/controller/create-post";
import { FastifyInstance } from "fastify";
import multer from "fastify-multer"
import multerConfig from "../config/upload";
import { getPosts } from "@/http/controller/get-posts";
import { likePost } from "@/http/controller/like-post";
const upload = multer(multerConfig)

export async function appRoutes(app: FastifyInstance) {
    // cria a post
    app.post('/posts', { preHandler: upload.single('image') }, createPost)

    // lista de posts
    app.get('/posts', getPosts)

    app.get('/post/:postId', likePost)
}