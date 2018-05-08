export default class AuthSevice {
    constructor(domain) {
        this.domain = domain || 'localhost:8080'
    }

    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) headers['Authorization'] = 'Bearer ' + this.getToken()

        return fetch(this.domain + url, {
            headers,
            ...options
        })
        .then(this._checkStatus)
        .then(response => response.json())
    }

    getToken() {
        return localStorage.getItem('auth_token')
    }

    setToken(token) {
        localStorage.setItem('auth_token', token)
    }

    loggedIn() {
        const token = this.getToken()

        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired() { }

    _checkStatus(response) {
        if (!response.status >= 200 && response.status < 300) {
            let error = new Error(response.statusText)
            
            error.response = response
            throw error
        }
        
        return response
    }
}