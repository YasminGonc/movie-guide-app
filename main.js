const searchBtn = document.querySelector('.container__search-btn');
const movie = document.querySelector('#search-movie');
const img = document.querySelector('.container__movie-poster');
const title = document.querySelector('.movie-infos__title');
const stars = document.querySelector('.movie-infos__stars');
const year = document.querySelector('.year');
const runTime = document.querySelector('.time');
const plot = document.querySelector('#plot');
const cast = document.querySelector('#cast');
const errorMessage = document.querySelector('.container__search-error');

async function movieSearch() {
    try {
        let searchMovie = await fetch(`http://www.omdbapi.com/?t=${movie.value.replace(/ /g, '+')}&apikey=97213fd1`);
        let searchMovieConverted = await searchMovie.json();

        img.setAttribute('src', searchMovieConverted.Poster);
        title.innerText = searchMovieConverted.Title;
        stars.innerHTML = `<p class="movie-infos__stars"><i class="fa-solid fa-star"></i> ${searchMovieConverted.imdbRating}</p>`
        year.innerText = searchMovieConverted.Year;
        runTime.innerText = searchMovieConverted.Runtime;
        //falta gênero
        plot.innerText = searchMovieConverted.Plot;
        cast.innerText = searchMovieConverted.Actors;

        if (searchMovieConverted.erro) {
            console.log('falso');
            throw Error('Movie not found');
            //preencher com filme não encontrado
        }
        console.log(searchMovieConverted);
    } catch (erro) {
        console.log('falso');
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
        movieSearch();
    }

    movie.value = '';

});
