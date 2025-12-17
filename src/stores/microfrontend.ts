import { defineStore } from 'pinia'

export const useMicrofrontendStore =
defineStore('microfrontend', {
    state: () => ({
        // currentUrl: null as string | null
        currentUrl: localStorage.getItem('mf-url')
    }),
    actions:{
        setExternal(url: string){
            this.currentUrl = url
            localStorage.setItem('mf-url', url)
        },
        clear(){
            this.currentUrl = null
            localStorage.removeItem('mf-url')
        }
    }
    
})