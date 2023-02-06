'use strict';

/* tady bude tvůj kód */
console.log('JavaScript ve stránce funguje');

const movieList = document.querySelector('#movies');
let globalFetchedData;

const sortAscending = () => {
    globalFetchedData.sort((movieA, movieB) => (movieA.year - movieB.year));
    movieList.innerHTML = '';
    globalFetchedData.forEach((objectMovie) => 
        movieList.innerHTML += Movie(objectMovie)
    );
}

const sortDescending = () => {
    globalFetchedData.sort((movieA, movieB) => { 
        if (movieA.year > movieB.year) {
            return -1;
        }
        if (movieA.year < movieB.year) {
            return 1;
        }
        return 0;
    });
    movieList.innerHTML = '';
    globalFetchedData.forEach((objectMovie) => 
    movieList.innerHTML += Movie(objectMovie)
    );
}

document.querySelector('#buttonSortMoviesByYearAscending').addEventListener('click', sortAscending);
document.querySelector('#buttonSortMoviesByYearDescending').addEventListener('click', sortDescending);

const Movie = ({posterUrl, title, url, year, genres}) => {
    return `<div class="movie">
                <img class="movie__img" src="${posterUrl}" alt="${title}">
                <a href="${url}"><h2 class="movie__title">${title}</h2></a>
                <p class="movie__year">${year}</p>
                <p class="movie__genre">${genres.join(', ')}</p>
            </div>`;
}

const showMovies = (data) => {
    data.sort((a,b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    })
    data.forEach((objectMovie) => {
        movieList.innerHTML += Movie(objectMovie);
    })
}

fetch('https://apps.kodim.cz/daweb/trening-api/apis/movie-api/movies')
    .then((response) => response.json())
    .then((data) => {
        globalFetchedData = data;
        showMovies(data);
    });

