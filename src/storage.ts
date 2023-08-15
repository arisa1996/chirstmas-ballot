import { LocalStorage } from 'power-helper'

export const useStorage = () => {
    const storage = new LocalStorage('ouo', {
        defaultColumns: {}
    })
    return storage
}
