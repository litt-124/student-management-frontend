export const ACCESS_TOKEN = 'token'
export const LANGUAGE_KEY = 'language-key'

export default class StorageService {

    static setToStorage(key, value) {
        localStorage.setItem(key, value)
    }

    static getFromStorage(key) {
        return localStorage.getItem(key)
    }

    static removeFromStorage(key) {
        localStorage.removeItem(key)
    }

    static clearAll() {
        localStorage.clear()
        sessionStorage.clear()
    }


}
