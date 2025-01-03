# MoviesSearch App


A web application to explore popular movies, search by title, filter by genre, and manage your favorite movies.

---

## Features

1. **Browse Popular Movies**: Explore the most popular movies from TMDB.  
2. **Search by Title**: Use the search bar to find movies by their title.  
3. **Filter by Genre**: Filter movies using the genre dropdown menu.  
4. **Detailed Movie View**: Click on a movie to view its detailed information, including overview, release date, and ratings.  
5. **Favorites Management**:  
   - Add movies to your favorites list.  
   - Remove movies from favorites.  
   - Favorites are stored using `localStorage` for persistence.  
6. **Load More Movies**: Fetch additional results with the "Load More" button.  
7. **Responsive Design**: User-friendly interface optimized for various devices.  

---

## API Integration

The application fetches data from [The Movie Database (TMDB)](https://www.themoviedb.org/) API, utilizing the following endpoints:  
- **Genres**:  
  `GET /genre/movie/list?api_key={API_KEY}&language=en-US`  
  Retrieves the list of available movie genres.  
- **Popular Movies**:  
  `GET /movie/popular?api_key={API_KEY}&language=en-US&page={page}`  
  Fetches a list of popular movies.  
- **Search Movies**:  
  `GET /search/movie?api_key={API_KEY}&language=en-US&query={query}&page={page}`  
  Searches for movies matching a given title.  
- **Filter by Genre**:  
  `GET /discover/movie?api_key={API_KEY}&language=en-US&page={page}&with_genres={genre_id}`  
  Retrieves movies based on a specific genre.

### Example API Call
```bash
GET https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=en-US&page=1

### How to Run Locally
git clone https://github.com/Sekaziga/MoviesSearch.git
cd MoviesSearch

Open index.html in your browser.
git add
### Figma Design link

https://www.figma.com/design/FuWOODMjqDhrEyCZhnqSaN/Untitled?node-id=0-1&p=f&t=T7WnJf9K607jClGM-0

## How to Use

1. **Home Page**: Displays popular movies.  
2. **Search**: Enter a title in the search box and press "Search."  
3. **Filter by Genre**: Select a genre from the dropdown to refine results.  
4. **View Movie Details**: Click on a movie card to see detailed information, including its poster, overview, release date, and rating.  
5. **Favorites**:  
   - **Add**: Click "Add to Favorites" on any movie card.  
   - **View**: Access your favorites through local storage.  
   - **Remove**: Use the `removeFromFavorites` function in your browser console.  
6. **Load More**: Click the "Load More" button at the bottom of the page to fetch additional movies.  
