declare module 'download-chromium' {
    type Progress = {
        percent: number,
        transferred: number,
        total: number
    }
    export type OnProgress = (progress: Progress) => void;
    type DownloadOptions = {
        platform: string,
        revision: string,
        log: boolean,
        onProgress: OnProgress
        installPath: string
    }
    function download(options: Partial<DownloadOptions>): Promise<string>
    export default download
}