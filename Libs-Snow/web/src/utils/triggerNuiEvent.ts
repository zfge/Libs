export default function triggerNuiEvent<T>(action: string, data?: T) {
    window.dispatchEvent(
        new MessageEvent('message', {
            data: { action, data },
        })
    );
}