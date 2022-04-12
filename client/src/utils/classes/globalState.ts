type subscriber = (state: any) => void
type unsubscriber = () => void

interface IglobalState {
    subscribers: subscriber[],
    getState: () => any,
    setState: (state: any) => void,
    subscribe: (callback: subscriber) => unsubscriber
}

export default class globalState <T> implements IglobalState {
    private state: T
    subscribers: subscriber[] = []

    constructor(state: T){
        this.state = state
    }

    getState = () => {
        return this.state
    }

    setState  = (state: any) => {
        this.state = state
        console.log(this.getState())
        this.subscribers.map(subscriber => subscriber(this.state))
    }

    subscribe = (callback: subscriber) => {
        this.subscribers.push(callback);

        return () => {
            const index = this.subscribers.indexOf(callback);
            if (index > -1) {
                this.subscribers.splice(index, 1);
            }
        }
    }
}