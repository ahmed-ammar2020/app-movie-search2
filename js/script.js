"use strict";
$(document).ready(function () {
    $("form").submit(function (e) {
        let value = $("input:text").val(); //the value of the input element
        let url = `http://www.omdbapi.com/?s=${value}&apikey=385ec08c`;
        $.ajax({
            url: url,
            success: function (films) {
                let output = "";
                let myFilms = films.Search;
                $.each(myFilms, function (index, film) {
                    output += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mt-3">
                                    <div class="card">
                                        <img src="${film.Poster}" class="card-img-top img-fluid" alt="Film Poster">
                                        <div class="card-body">
                                            <h5 class="card-title">${film.Title}</h5>
                                            <p class="card-text"><strong>Released At</strong> ${film.Year}</p>
                                            <a href="#" class="btn btn-primary" onclick="getID('${film.imdbID}')">View details</a>
                                        </div>
                                    </div>
                                </div>`;
                });
                $("#movies").html(output);
            },
            error: function (xhr) {
                console.log(xhr);
            },
        });
        e.preventDefault();
    });
});

function getID(id) {
    localStorage.setItem("filmID", id);
    window.location.href = "movie.html";
    return false;
}

function getMovieDetails() {
    let id = localStorage.getItem("filmID");
    let url = `http://www.omdbapi.com/?i=${id}&apikey=385ec08c`;
    $.ajax({
        url: url,
        success: function (movie) {
            $("#movie").html(`
            <div class="card text-center">
                <img src="${movie.Poster}" class="card-img-top w-50 mx-auto d-block" alt="Poster Img">
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    Genre: <span class="badge badge-primary">${movie.Genre}</span> <br />
                    Released: <span class="badge badge-primary">${movie.Released}</span> <br />
                    Rated: <span class="badge badge-primary">${movie.Rated}</span> <br />
                    Director: <span class="badge badge-primary">${movie.Director}</span> <br />
                    Writer: <span class="badge badge-primary">${movie.Writer}</span> <br />
                    Actors: <span class="badge badge-primary">${movie.Actors}</span> <br />
                    Language: <span class="badge badge-primary">${movie.Language}</span> <br />
                    Country: <span class="badge badge-primary">${movie.Country}</span> <br />
                    Awards: <span class="badge badge-primary">${movie.Awards}</span> <br />
                    <a href="index.html" class="btn btn-primary mt-2">Back to search</a>
                </div>
            </div>
            `)
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}