import { type Post, type Prisma } from "@prisma/client";

export interface PostRepository {
    create: (data: Prisma.PostCreateInput) => Promise<Post>
    getPosts: () => Promise<Post[] | null>
}