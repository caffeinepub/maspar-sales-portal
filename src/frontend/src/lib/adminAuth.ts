const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'maspar2026';
const AUTH_STORAGE_KEY = 'maspar_admin_auth';

export function checkCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function setAdminUnlocked(unlocked: boolean): void {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, unlocked ? 'true' : 'false');
  } catch (error) {
    console.error('Failed to save auth state:', error);
  }
}

export function isAdminUnlocked(): boolean {
  try {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  } catch (error) {
    return false;
  }
}

export function clearAdminAuth(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear auth state:', error);
  }
}
