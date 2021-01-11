export const store = {
    userLoggedIn: false,
    userToken: '',
    pageView: '',
    activeMovie: '',
    logUserIn (token) {
      this.userLoggedIn = true
      this.userToken = token
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
    }
}