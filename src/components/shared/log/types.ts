export enum Levels {
    Error, Warn, Info
}

export type LogEntry = {
    level: Levels
    message: string
}
