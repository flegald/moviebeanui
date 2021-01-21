
import { clearToken } from "@/utils/userProfile";

// export const API_BASE = "http://127.0.0.1:8000"
export const API_BASE = "http://10.0.0.172:8000"
// export const API_BASE = "https://moviebeanapi.herokuapp.com"


export const serviceCall = (
    url,
    method,
    token= null,
    body= null,
    formData = null
) => {
    const config = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    }
    if (body) {
        config.body = JSON.stringify(body)
    }
    if (formData) {
        delete config["headers"]["Content-Type"]
        config.body = formData
    }
    if (token) {
        config.headers["Authorization"] = `Token ${token}`
    }
    const fullURL = `${API_BASE}${url}`
    return fetch(fullURL, config)
        .then(resp => {
            if (resp.status === 401) {
                console.log(fullURL)
                clearToken()
                window.location.reload()
            }
            return resp.json()
        })
        .then(respJson => respJson)
        .catch((e) => {
            console.log(e)
        })
}

export const login = (formData) => {
    const endpoint = '/login/'
    const method = "POST"
    return serviceCall(endpoint, method, null, formData)
}

export const getUserProfile = (token) => {
    const endpoint = "/profile/self/"
    const method = "GET"
    return serviceCall(endpoint, method, token)
}

export const createAccount = (payload) => {
    const endpoint = "/createaccount/"
    const method = "POST"
    return serviceCall(endpoint, method, null, payload)
}

export const movieSearch = (query, token) => {
    const endpoint = `/search/${query}/`
    const method = "GET"
    return serviceCall(endpoint, method, token)
}

export const addMovie = (imdbID, token) => {
    const endpoint = "/movie/"
    const method = "POST"
    return serviceCall(endpoint, method, token, {"imdb_id": imdbID})
}

export const getMovieDetails = (imdbID, token) => {
    const endpoint = `/movie/${imdbID}/`
    const method = "GET"
    return serviceCall(endpoint, method, token)
}

export const createMovieRating = (imdbID, rating, comment, token) => {
    const endpoint = "/rating/"
    const method = "POST"
    const data = {
        "rating": rating,
        "movie": imdbID,
        "comment": comment
    }
    return serviceCall(endpoint, method, token, data)
}

export const getUserMovieRating = (imdbID, token) => {
    const endpoint = `/rating/?user=true&imdb_id=${imdbID}`
    const method = "GET"
    return serviceCall(endpoint, method, token)
}

export const getAllMovieRatings = (imdbID, token) => {
    const endpoint = `/rating/?imdb_id=${imdbID}`
    const method = "GET"
    return serviceCall(endpoint, method, token)
}

export const getAllUserReviews = (token) => {
    const endpoint = `/rating/?user=true`
    const method = "GET"
    return serviceCall(endpoint, method, token)
}

export const getAllMovies = (token, filter= "") => {
    let endpoint = "/movie/" + filter
    const method = "GET"
    return serviceCall(endpoint, method, token)
}

export const getWatchlist = (token) => {
    const endpoint = "/watchlist/"
    const method = "GET"
    return serviceCall(endpoint, method, token)
}

export const addToWatchList = (imdbID, token) => {
    const endpoint = "/watchlist/"
    const method = "POST"
    const data = {"imdb_id": imdbID}
    return serviceCall(endpoint, method, token, data)
}

export const removeFromWatchList = (imdbID, token) => {
    const endpoint = "/watchlist/"
    const method = "DELETE"
    const data = {"imdb_id": imdbID}
    return serviceCall(endpoint, method, token, data)
}

export const getFeed = (token) => {
    const endpoint = "/feed/"
    const method = "GET"
    return serviceCall(endpoint, method, token)
}

export const uploadUserImg = (formData, token) => {
    const endpoint = "/profile/image/"
    const method = "POST"
    console.log(formData)
    console.log(formData.get("image"))
    return serviceCall(endpoint, method, token, null, formData)
}


