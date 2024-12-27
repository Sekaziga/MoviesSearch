const apiKey = "995e2b24823e3bb7ac78158184d5a0e2";
const apiBaseUrl = "https://api.themoviedb.org/3";
const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("searchInput");
const loader = document.getElementById("loader");
const searchButton = document.getElementById("searchButton");
const loadMoreButton = document.getElementById("loadMore");
const genreDropdown = document.getElementById("genre-filter");

let allMovies = [];
let currentPage = 1;
let currentQuery = "";
let totalPages = 1;
let genres = []; // Array to store available genres
let selectedGenre = ""; // Currently selected genre ID

// Fetch genres from TMDB API
async function fetchGenres() {
  try {
    const response = await fetch(`${apiBaseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`);
    if (!response.ok) throw new Error("Failed to fetch genres");
    const data = await response.json();
    genres = data.genres;
    populateGenreDropdown(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
}

// Populate genre dropdown
function populateGenreDropdown(genres) {
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.name;
    genreDropdown.appendChild(option);
  });
}

// Fetch movies from TMDB API
async function fetchMovies(page = 1, query = "", genreId = "") {
  try {
    loader.style.display = "block";
    let endpoint = query
      ? `${apiBaseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`
      : `${apiBaseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

    if (genreId) {
      endpoint = `${apiBaseUrl}/discover/movie?api_key=${apiKey}&language=en-US&page=${page}&with_genres=${genreId}`;
    }

    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();

    totalPages = data.total_pages;
    if (page === 1) allMovies = [];
    allMovies = [...allMovies, ...data.results];
    displayMovies(allMovies);
    loader.style.display = "none";

    if (page >= totalPages) {
      loadMoreButton.style.display = "none";
    } else {
      loadMoreButton.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    loader.textContent = "Failed to fetch movies. Please try again later.";
  }
}

// Display movies in the container
function displayMovies(movies) {
  moviesContainer.innerHTML = "";
  if (movies.length === 0) {
    moviesContainer.innerHTML = "<p>No movies found. Try a different search term.</p>";
    return;
  }
  function showDetails(movie) {
    console.log("showDetails called for movie:", movie);
    const detailsContainer = document.getElementById("movieDetails");
    const detailsContent = document.getElementById("detailsContent");
  
    detailsContent.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h2>${movie.title}</h2>
      <p><strong>Release Date:</strong> ${movie.release_date}</p>
      <p><strong>Overview:</strong> ${movie.overview}</p>
      <p><strong>Rating:</strong> ${movie.vote_average}/10</p>
    `;
  
    detailsContainer.classList.remove("details");
    detailsContainer.classList.remove("hidden");
  }

  // Close the details view
  const closeDetailsButton = document.getElementById("closeDetails");
  closeDetailsButton.addEventListener("click", () => {
    const detailsContainer = document.getElementById("movieDetails");
    detailsContainer.classList.add("hidden");
    detailsContainer.classList.add("details");
  });
  

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Release Date: ${movie.release_date}</p>
      <button onclick='addToFavorites(${JSON.stringify(movie).replace(/'/g, "&apos;")})'>Add to Favorites</button>
    `;
    movieElement.addEventListener("click", () => showDetails(movie));
    moviesContainer.appendChild(movieElement);
  });
}

// Filter movies by genre
genreDropdown.addEventListener("change", (e) => {
  selectedGenre = e.target.value;
  currentPage = 1;
  fetchMovies(currentPage, currentQuery, selectedGenre);
});

// Search movies by title
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    currentQuery = query;
    currentPage = 1;
    fetchMovies(currentPage, currentQuery, selectedGenre);
  } else {
    alert("Please enter a movie title to search.");
  }
});

loadMoreButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchMovies(currentPage, currentQuery, selectedGenre);
  }
});

// Fetch initial data on page load
fetchGenres();
fetchMovies(currentPage);
// Add a movie to favorites
function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.some(fav => fav.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${movie.title} added to favorites!`);
    } else {
      alert(`${movie.title} is already in your favorites.`);
    }
  }
  
  // Remove a movie from favorites
  function removeFromFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(movie => movie.id !== movieId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Movie removed from favorites.");
  }
  
  // Fetch all favorite movies
  function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }
  