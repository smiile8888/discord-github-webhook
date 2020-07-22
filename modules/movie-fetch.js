const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

function formatInfo(info) {
    function getRating(name, data) {
        const rating = data.filter((rating) => { 
            return rating.Source === name; 
        });

        return rating.length > 0 ? rating[0].Value: `N/A`;
    }

    let template = `
        Title: ${info.Title}
        Imdb: ${info.imdbRating}
        Rotten_Tomatoes: ${getRating('Rotten Tomatoes', info.Ratings)}
        Year: ${info.Year}
        Runtime: ${info.Runtime}
        Genre: ${info.Genre}
        Director: ${info.Director}`

    return template;
}


async function fetchMoviesInfo(name) {
    const url = `http://www.omdbapi.com/?t=${name}&apikey=${process.env.MOVIE_API_KEY}`

    let response = await fetch(url);
    let content;
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        content = await response.json();
    }

    return formatInfo(content);
}

module.exports.fetchMoviesInfo = fetchMoviesInfo;