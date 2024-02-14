import { type Post, type Prisma } from "@prisma/client";

export interface PostRepository {
    create: (data: Prisma.PostCreateInput) => Promise<Post>
    getPosts: (postId: string) => Promise<Post[] | null>
}