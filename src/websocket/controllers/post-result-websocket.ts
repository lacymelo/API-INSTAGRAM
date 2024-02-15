import { liking } from "@/useCases/like-pub-sub";
import { likeSchema } from "@/utils/validations";
import { SocketStream } from "@fastify/websocket";
import { FastifyRequest } from "fastify";

export async function postResultWebSocket(connection: SocketStream, request: FastifyRequest) {
    const { postId } = likeSchema.parse(request.params)

    liking.subscribe(postId, (message) => {
        connection.socket.send(JSON.stringify(message))
    })
}