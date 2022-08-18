const searchBtn = document.querySelector('.container__search-btn');
const movie = document.querySelector('#search-movie');
const img = document.querySelector('.container__movie-poster');
const title = document.querySelector('.movie-infos__title');
const stars = document.querySelector('.movie-infos__stars');
const year = document.querySelector('.year');
const runTime = document.querySelector('.time');
const plot = document.querySelector('#plot');
const cast = document.querySelector('#cast');
const genreOne = document.querySelector('#genre-one');
const genreTwo = document.querySelector('#genre-two');
const genreThree = document.querySelector('#genre-three');
const errorMessage = document.querySelector('.container__search-error');

const movieContainer = document.querySelector('.container__movie');
const infosContainer = document.querySelector('.container__infos');
const messageContainer = document.querySelector('.container__messages');

function showLoadingMessage() {
    movieContainer.classList.add('ocultar');
    infosContainer.classList.add('ocultar');
    messageContainer.classList.remove('ocultar');
}

function showContainers() {
    movieContainer.classList.remove('ocultar');
    infosContainer.classList.remove('ocultar');
    messageContainer.classList.add('ocultar');
}

async function movieSearch() {
    showContainers();

    let searchMovie = await fetch(`http://www.omdbapi.com/?t=${movie.value.replace(/ /g, '+')}&apikey=97213fd1`);
    let searchMovieConverted = await searchMovie.json();

    if (searchMovieConverted.Error) {
        showLoadingMessage();
        messageContainer.innerText = searchMovieConverted.Error;
    }
    else {
        img.setAttribute('src', searchMovieConverted.Poster);
        title.innerText = searchMovieConverted.Title;
        stars.innerHTML = `<p class="movie-infos__stars"><i class="fa-solid fa-star"></i> ${searchMovieConverted.imdbRating}</p>`
        year.innerText = searchMovieConverted.Year;
        runTime.innerText = searchMovieConverted.Runtime;
        plot.innerText = searchMovieConverted.Plot;
        cast.innerText = searchMovieConverted.Actors;

        if(searchMovieConverted.Genre.split(', ').length == 1) {
            genreOne.innerText = searchMovieConverted.Genre.split(', ')[0];
            genreTwo.classList.add('ocultar');
            genreThree.classList.add('ocultar');
        }
        else if(searchMovieConverted.Genre.split(', ').length == 2) {
            genreOne.innerText = searchMovieConverted.Genre.split(', ')[0];
            genreTwo.innerText = searchMovieConverted.Genre.split(', ')[1];
            genreThree.classList.add('ocultar');
        }
        else {
            genreOne.innerText = searchMovieConverted.Genre.split(', ')[0];
            genreTwo.innerText = searchMovieConverted.Genre.split(', ')[1];
            genreThree.innerText = searchMovieConverted.Genre.split(', ')[2];
        }
        
    }
}

searchBtn.addEventListener('click', () => {
    if (movie.value == 0) {
        errorMessage.style.display = 'block';
        movie.style.borderColor = 'red';
    }
    else {
        errorMessage.style.display = 'none';
        movie.style.borderColor = 'var(--text-title)';

        showLoadingMessage();
        movieSearch();
    }

    movie.value = '';

});
