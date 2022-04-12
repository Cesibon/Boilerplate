export type Partial<T> = {
    [P in keyof T]?: T[P];
};

export interface INotification {
    message: string
    severity: "error" | "warning" | "info" | "success"
}

export interface IDictionary<TValue> {
    [id: string]: TValue;
}
