// Importe os módulos necessários
import cookie from '@fastify/cookie'
import fastify from "fastify"
import websocket from "@fastify/websocket"
import { appRoutes } from "@/routes"
import { env } from "@/env"
import multer from "fastify-multer"

// Crie uma instância do aplicativo Fastify
const app = fastify()

app.register(cookie, {
    secret: env.KEY_SECRET_COOKIE,
    hook: 'onRequest',
    parseOptions: {}
})

app.register(multer.contentParser)

// Registre o protocolo WebSocket
app.register(websocket)

// Registre suas rotas
app.register(appRoutes)

// Inicie o servidor
app.listen({ port: env.PORT }).then(() => {
    console.log(`Servidor HTTP em execução! ${env.PORT}`)
})
