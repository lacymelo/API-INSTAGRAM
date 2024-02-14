import z from "zod";

export const postSchema = z.object({
    author: z.string({ required_error: 'Campo autor obrigatório.' }),
    place: z.string({ required_error: 'Campo lugar obrigatório.' }),
    description: z.string({ required_error: 'Campo descrição obrigatório.' }),
    hashtags: z.string({ required_error: 'Campo hashtags obrigatório.' }),
})

export const postImageSchema = z.object({
    filename: z.string(),
})
export const likeSchema = z.object({
    postId: z.string(),
})

