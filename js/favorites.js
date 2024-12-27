// Fetch all favorite movies from localStorage
function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }
  
  // Display favorite movies in the container
  function displayFavorites() {
    const favorites = getFavorites();
    const favoritesContainer = document.getElementById("favoritesContainer");
    favoritesContainer.innerHTML = ""; // Clear existing favorites
  
    if (favorites.length === 0) {
      favoritesContainer.innerHTML = "<p>No favorite movies yet. Go back and add some!</p>";
      return;
    }
  
    favorites.forEach(movie => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");
      movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
        <p>Release Date: ${movie.release_date}</p>
        <p><strong>Rating:</strong> ${movie.vote_average}/10</p>
        <button onclick="removeFromFavorites(${movie.id})">Remove from Favorites</button>
      `;
      favoritesContainer.appendChild(movieElement);
    });
  }
  
  // Remove a movie from favorites
  function removeFromFavorites(movieId) {
    let favorites = getFavorites();
    favorites = favorites.filter(movie => movie.id !== movieId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites(); // Refresh the displayed favorites
  }
  
  // Initialize the page
  window.addEventListener("DOMContentLoaded", displayFavorites);
  