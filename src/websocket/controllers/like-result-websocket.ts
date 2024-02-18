import { liking } from "@/useCases/like-pub-sub";
import { likeSchema } from "@/utils/validations";
import { SocketStream } from "@fastify/websocket";
import { FastifyRequest } from "fastify";

export async function likeResultWebSocket(connection: SocketStream, request: FastifyRequest) {
    liking.subscribe('like', (message) => {
        connection.socket.send(JSON.stringify(message))
    })
}