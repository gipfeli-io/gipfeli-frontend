export default class LocalStorageService {
  public getItem (key: string): string | null {
    return localStorage.getItem(key)
  }

  public addItem (key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  public removeItem (key: string): void {
    localStorage.removeItem(key)
  }
}
