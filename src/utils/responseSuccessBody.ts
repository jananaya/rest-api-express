export const responseSuccessBody = (message: string): object => {
    return {
        status: 'SUCCESS',
        message: message
    }
}