import z from 'zod'
import { config } from 'dotenv'

// altera o arquivo de configuração das variáveis de ambiente
if (process.env.NODE_ENV === 'test') {
    config({ path: 'env.test' })
} else {
    config()
}

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string(),
    KEY_SECRET_COOKIE: z.string()
})

// validação das variáveis de ambiente
const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error('🛑 Invalid environment variables', _env.error.format())
    throw new Error('Invalid environment variables')
}

export const env = _env.data
