import { defineStore } from 'pinia'
import useLocalStorageEngine from '../composables/useLocalStorageEngine'

const { flush_local_store, get_meta, get_full_list, add_movies_to_local_list } =
  useLocalStorageEngine('movies', {})

const get_initial_state = () => {
  return {
    movies: get_meta(),
    local_movies_list: get_full_list()
  }
}

export const useMoviesStore = defineStore({
  id: 'moviesStore',
  state: get_initial_state,
  actions: {
    udapteMovieList(list, update_with_fulldb = false) {
      const to_save = add_movies_to_local_list(list)
      flush_local_store(to_save)
      this.local_movies_list = to_save //update the local state
      if (update_with_fulldb) {
        this.movies = get_meta()
        return
      }
      this.movies = list
    },
    rateMovie(imdbID, rating, index) {
      this.local_movies_list[imdbID]['user_rating'] = rating
      flush_local_store(this.local_movies_list)
      if (index != '-1') {
        try {
          this.movies[index].user_rating = rating
        } catch (e) {
          console.log(
            'no need to update the movie list as this action come from somewhere not using movies state'
          )
        }
      }
    },
    reviewMovie(imdbID, user_review, index) {
      this.local_movies_list[imdbID]['user_review'] = user_review
      flush_local_store(this.local_movies_list)
      if (index != '-1') {
        try {
          this.movies[index].user_review = user_review
        } catch (e) {
          console.log(
            'no need to update the movie list as this action come from somewhere not using movies state'
          )
        }
      }
    }
  }
})
