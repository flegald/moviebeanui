// const API_BASE = "http://127.0.0.1:8000"
// const API_BASE = "http://10.0.0.172:8000"
const API_BASE = "https://moviebeanapi.herokuapp.com"


export const serviceCall = (url, method, data= null, token= null) => {
    const config = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    }
    if (data) {
        config.body = JSON.stringify(data)
    }
    if (token) {
        config.headers["Authorization"] = `Token ${token}`
    }
    const fullURL = `${API_BASE}${url}`
    return fetch(fullURL, config)
        .then(resp => resp.json())
        .then(respJson => respJson)
        .catch((e) => {
            console.log(e)
        })
}

export const login = (formData) => {
    const endpoint = '/api-token-auth/'
    const method = "POST"
    return serviceCall(endpoint, method, formData)
}

export const createAccount = (payload) => {
    const endpoint = "/createaccount/"
    const method = "POST"
    return serviceCall(endpoint, method, payload)
}

export const movieSearch = (query, token) => {
    const endpoint = `/search/${query}/`
    const method = "GET"
    return serviceCall(endpoint, method, null, token)
}

export const addMovie = (imdbID, token) => {
    const endpoint = "/movie/"
    const method = "POST"
    return serviceCall(endpoint, method, {"imdb_id": imdbID}, token)
}

export const getMovieDetails = (imdbID, token) => {
    const endpoint = `/movie/${imdbID}/`
    const method = "GET"
    return serviceCall(endpoint, method, null, token)
}

export const createMovieRating = (imdbID, rating, token) => {
    const endpoint = "/rating/"
    const method = "POST"
    const data = {
        "rating": rating,
        "movie": imdbID
    }
    return serviceCall(endpoint, method, data, token)
}

export const getUserMovieRating = (imdbID, token) => {
    const endpoint = `/rating/?user=true&imdb_id=${imdbID}`
    const method = "GET"
    return serviceCall(endpoint, method,null,  token)
}

export const getAllMovieRatings = (imdbID, token) => {
    const endpoint = `/rating/?imdb_id=${imdbID}`
    const method = "GET"
    return serviceCall(endpoint, method,null,  token)
}

export const getAllUserReviews = (token) => {
    const endpoint = `/rating/?user=true`
    const method = "GET"
    return serviceCall(endpoint, method,null,  token)
}

export const getAllMovies = (token, filter= "") => {
    let endpoint = "/movie/" + filter
    const method = "GET"
    return serviceCall(endpoint, method,null,  token)
}

export const getWatchlist = (token) => {
    const endpoint = "/watchlist/"
    const method = "GET"
    return serviceCall(endpoint, method, null, token)
}

export const addToWatchList = (imdbID, token) => {
    const endpoint = "/watchlist/"
    const method = "POST"
    const data = {"imdb_id": imdbID}
    return serviceCall(endpoint, method, data, token)
}

export const removeFromWatchList = (imdbID, token) => {
    const endpoint = "/watchlist/"
    const method = "DELETE"
    const data = {"imdb_id": imdbID}
    return serviceCall(endpoint, method, data, token)
}


