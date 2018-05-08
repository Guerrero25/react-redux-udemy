import AuthService from './AuthService'

export default class AuthSpotifyService extends AuthService {
    constructor(domain, clientSettings) {
        super(domain)

        this.clientSettings = clientSettings
        this.authorize_uri = 'https://accounts.spotify.com/authorize?'
        this.params = this.getHashParams()

        this.fetch = this.fetch.bind(this)
        this.authorize = this.authorize.bind(this)
    }

    authorize() {
        if (this.params.access_token) {
            const { access_token, expires_in } = this.params

            this.setToken(access_token)
            this.setExpires(expires_in)

            window.location = this.clientSettings.redirect_uri
        }

        if (!this.loggedIn()) {
            window.location = this.authorize_uri + this.stringify(this.clientSettings)
        }
    }

    loggedIn() {
        const token = this.getToken()

        return !!token && !this.isTokenExpired()
    }

    isTokenExpired() {
        const exp = this.getExpires()

        return exp > Date.now() / 1000
    }

    getExpires() {
        return localStorage.getItem('expires_in')
    }

    setExpires(expires_in) {
        localStorage.setItem('expires_in', (Date.now() / 1000) + expires_in)
    }

    stringify(object) {
        return Object.keys(object).map(k => encodeURIComponent(k) + "=" + encodeURIComponent(object[k])).join('&')
    }

    getHashParams() {
        let hashParams = {};
        let e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1)

        e = r.exec(q)

        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }

        return hashParams;
    }
}