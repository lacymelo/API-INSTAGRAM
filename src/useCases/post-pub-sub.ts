type Message = {
    id: string
    author: string
    place: string
    description: string
    hashtags: string
    image: string
    createdAt: Date
    updatedAt: Date
    like: number
}

type Subscriber = (message: Message) => void

class PostPubSubUseCase {
    private channels: Record<string, Subscriber[]> = {}

    subscribe(typeSocket: string, subscriber: Subscriber) {
        if (!this.channels[typeSocket]) {
            this.channels[typeSocket] = []
        }

        this.channels[typeSocket].push(subscriber)
    }

    publish(typeSocket: string, message: Message) {
        if (!this.channels[typeSocket]) {
            return
        }

        for (const subscriber of this.channels[typeSocket]) {
            subscriber(message)
        }
    }
}

export const posting = new PostPubSubUseCase()