// Importe os módulos necessários
import cookie from '@fastify/cookie'
import fastify from "fastify"
import websocket from "@fastify/websocket"
import { fastifyMultipart } from "@fastify/multipart"
import { appRoutes } from "@/routes"
import { env } from "@/env"

// Crie uma instância do aplicativo Fastify
const app = fastify()

// Registre o plugin de cookies
app.register(cookie, {
    secret: env.KEY_SECRET_COOKIE,
    hook: 'onRequest',
    parseOptions: {}
})

// Configure as permissões para upload de arquivos
app.register(fastifyMultipart, {
    limits: {
        fileSize: 1_048_576 * 25, // 25mb
    }
})

// Registre o protocolo WebSocket
app.register(websocket)

// Registre suas rotas
app.register(appRoutes)

// Inicie o servidor
app.listen({ port: env.PORT }).then(() => {
    console.log(`Servidor HTTP em execução! ${env.PORT}`)
})
