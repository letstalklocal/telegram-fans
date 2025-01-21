declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            username: string;
            first_name: string;
          };
        };
        ready(): void;
        expand(): void;
        showConfirm(message: string): Promise<boolean>;
        showAlert(message: string): Promise<void>;
        MainButton: {
          text: string;
          show(): void;
          hide(): void;
          onClick(fn: () => void): void;
        };
      };
    };
  }
}

const isTelegramWebApp = typeof window !== 'undefined' && 'Telegram' in window;

export const telegram = isTelegramWebApp ? window.Telegram.WebApp : null;

export function initTelegram() {
  if (telegram) {
    telegram.ready();
    telegram.expand();
  }
}

export function getCurrentUser() {
  return telegram?.initDataUnsafe.user;
}

export async function showConfirm(message: string) {
  if (!telegram) return false;
  return await telegram.showConfirm(message);
}

export async function showAlert(message: string) {
  if (!telegram) {
    alert(message);
    return;
  }
  await telegram.showAlert(message);
}