import { posting } from "@/useCases/post-pub-sub";
import { SocketStream } from "@fastify/websocket";
import { FastifyRequest } from "fastify";

export async function postResultWebsocket(connection: SocketStream, request: FastifyRequest) {
    posting.subscribe('post', (message) => {
        connection.socket.send(JSON.stringify(message))
    })
}