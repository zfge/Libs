import isDev from "./isDev.ts";

declare global {
  interface Window {
    GetParentResourceName?: () => string;
  }
}

export default function triggerNuiCallback(action: string, data?: any) {
    if (isDev) return console.log(`[NUI] ${action}`, data);
    fetch(`https://${(window as any).GetParentResourceName()}/${action}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}