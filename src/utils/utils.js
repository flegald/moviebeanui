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

export const sortAlpha = (movies) => {
    return movies.sort((a, b) => {
        let fa = a.title.toLowerCase(),
            fb = b.title.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    })
}

export const sortHighLow = (movies) => {
    return movies.sort((a, b) => {
        return b.movieBeanRating - a.movieBeanRating;
    });
}

export const sortLowHigh = (movies) => {
    return movies.sort((a, b) => {
        return a.movieBeanRating - b.movieBeanRating;
    });
}

export const sortTotalReviews = (movies) => {
    return movies.sort((a, b) => {
        return b.numReviews - a.numReviews;
    });
}