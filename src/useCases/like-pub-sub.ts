type Message = { likeOption: string, likes: number }
type Subscriber = (message: Message) => void

class LikePubSubUseCase {
    private channels: Record<string, Subscriber[]> = {}

    subscribe(postId: string, subscriber: Subscriber) {
        if (!this.channels[postId]) {
            this.channels[postId] = []
        }

        this.channels[postId].push(subscriber)
    }

    // publicando
    publish(postId: string, message: Message) {
        if (!this.channels[postId]) {
            return
        }

        for (const subscriber of this.channels[postId]) {
            subscriber(message)
        }
    }
}

export const liking = new LikePubSubUseCase()