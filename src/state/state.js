import { getToken, setToken } from "@/utils/userProfile";


export const store = {
    userLoggedIn: false,
    userToken: '',
    pageView: '',
    activeMovie: '',
    logUserIn (token) {
      this.userLoggedIn = true
      this.userToken = token
      setToken(token)
    },
    logUserOut () {
        this.userLoggedIn = false
        this.userToken = ''
    },
    setPageView (page) {
        this.pageView = page
    },
    setActiveMovie (imdbID) {
        this.activeMovie = imdbID
    },
    retrieveToken() {
        return this.userToken
    },
    initializeSession() {
        const token = getToken()
        if (token) {
            this.userToken = token
            this.userLoggedIn = true
            setToken(token)
            this.pageView = "Feed"
        }
    },
    removeSession() {
        this.userToken = ''
        this.userLoggedIn = true
        setToken(null)
        this.pageView = "LoginView"
    }
}