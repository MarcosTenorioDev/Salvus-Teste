import {z} from 'zod'

const envSchema = z.object({
    PORT: z.string().default('3000'),
    DATABASE_URL: z.string().url(),
    WEBHOOK_SECRET: z.string()
})

export const env = envSchema.parse(process.env); 