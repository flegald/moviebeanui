import { clearToken, getToken, setToken } from '@/utils/userProfile'
import router from '@/router'

export const store = {
  userLoggedIn: false,
  userToken: '',
  pageView: '',
  activeMovie: '',
  profile: {},
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
    router.push({ path: page.toLowerCase() })
  },
  setActiveMovie (imdbID) {
    this.activeMovie = imdbID
  },
  retrieveToken () {
    return this.userToken
  },
  initializeSession () {
    const token = getToken()
    if (token) {
      this.userToken = token
      this.userLoggedIn = true
      setToken(token)
    }
    return token
  },
  removeSession () {
    clearToken()
    this.userToken = ''
    this.userLoggedIn = true
    this.profile = {}
    window.location.reload()
  },
  setUserSession (userSession) {
    this.profile = userSession
  }
}
