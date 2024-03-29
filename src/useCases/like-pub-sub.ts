type Message = { postId: string, likes: number }
type Subscriber = (message: Message) => void

class LikePubSubUseCase {
    private channels: Record<string, Subscriber[]> = {}

    subscribe(typeSocket: string, subscriber: Subscriber) {
        if (!this.channels[typeSocket]) {
            this.channels[typeSocket] = []
        }

        this.channels[typeSocket].push(subscriber)
    }

    // publicando
    publish(typeSocket: string, message: Message) {
        if (!this.channels[typeSocket]) {
            return
        }

        for (const subscriber of this.channels[typeSocket]) {
            subscriber(message)
        }
    }
}

export const liking = new LikePubSubUseCase()