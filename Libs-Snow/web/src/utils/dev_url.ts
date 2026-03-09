import isDev from "./isDev.ts";

declare global {
  interface Window {
    GetParentResourceName?: () => string;
  }
}

export default function(source: string) {
    return isDev ? source : `nui://${(window as any).GetParentResourceName()}/web/dist/${source}`;
}