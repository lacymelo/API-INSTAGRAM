// Importe os módulos necessários
import cookie from '@fastify/cookie'
import fastify from "fastify"
import cors from '@fastify/cors'
import websocket from "@fastify/websocket"
import { appRoutes } from "@/routes"
import { env } from "@/env"
import multer from "fastify-multer"
import staticFolder from "@fastify/static"
import path from 'path'

// Crie uma instância do aplicativo Fastify
const app = fastify()

app.register(cors)

// Rota para servir arquivos estáticos do diretório de uploads
app.register(staticFolder, {
    root: path.join(__dirname, '..', '..', 'uploads'),
    prefix: '/uploads/',
})

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
