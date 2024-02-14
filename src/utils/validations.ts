import z from "zod";

export const postSchema = z.object({
    author: z.string({ required_error: 'Campo autor obrigatório.' }),
    place: z.string({ required_error: 'Campo lugar obrigatório.' }),
    description: z.string({ required_error: 'Campo descrição obrigatório.' }),
    hashtags: z.string({ required_error: 'Campo hashtags obrigatório.' }),
})

