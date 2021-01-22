export const getRatingAverage = (ratings) => {
  if (!ratings.length) return 0
  return ((ratings.map((r) => {
    let individual = r
    if (r.rating) {
      individual = r.rating
    }
    return parseInt(individual)
  }).reduce((a, b) => a + b)) / ratings.length).toFixed(2)
}

export const sortArrayAlpha = (movies) => {
  return movies.sort((a, b) => {
    const fa = a.toLowerCase()
    const fb = b.toLowerCase()

    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  })
}

export const sortMoviesAlpha = (movies) => {
  return movies.sort((a, b) => {
    const fa = a.title.toLowerCase()
    const fb = b.title.toLowerCase()

    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  })
}

export const sortHighLow = (movies) => {
  return movies.sort((a, b) => {
    return b.movieBeanRating - a.movieBeanRating
  })
}

export const sortLowHigh = (movies) => {
  return movies.sort((a, b) => {
    return a.movieBeanRating - b.movieBeanRating
  })
}

export const sortTotalReviews = (movies) => {
  return movies.sort((a, b) => {
    return b.numReviews - a.numReviews
  })
}

export const filterGenre = (genres, movieList) => {
  if (!genres.length) return movieList
  const filtered = []
  movieList.forEach((m) => {
    if (m.genreArray.filter(g => genres.includes(g)).length) {
      filtered.push(m)
    }
  })
  return filtered
}
