<script setup>
import { ref } from 'vue'
import TheLoadingIcon from '../components/TheLoadingIcon.vue'
import TheMovieCard from '../components/TheMovieCard.vue'
import { useMoviesStore } from '../stores/movies'
import { useBookmarksStore } from '../stores/bookmarks'

const bookmarkStore = useBookmarksStore()

const moviesStore = useMoviesStore()

let listLen = ref(0)

listLen.value = Object.keys(bookmarkStore.local_bookmarks_list).length

let error_message = ref('')
let loading = ref(false)

const rate = (imdbID, rating, index) => {
  console.log(listLen.value)
  moviesStore.rateMovie(imdbID, rating, index)
}
const del = function (l, i) {
  bookmarkStore.removeBookmark(l, i)
  listLen.value = Object.keys(bookmarkStore.local_bookmarks_list).length
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col cards-container">
        <TheLoadingIcon v-show="loading" />
        <div class="mt-4 mb-2" v-show="error_message.length > 0">
          <div class="alert alert-danger d-flex align-items-start" role="alert">
            <i class="bi bi-exclamation-diamond"></i>&nbsp;<span>{{ error_message }}</span>
          </div>
        </div>

        <div class="mt-4 mb-2" v-show="listLen == 0">
          <div class="alert alert-danger d-flex align-items-start" role="alert">
            <i class="bi bi-exclamation-diamond"></i>&nbsp;<span
              >You currently don't have any saved playlist</span
            >
          </div>
        </div>
        <div
          class="mt-5"
          v-for="(playlist, list_name, index) in bookmarkStore.local_bookmarks_list"
          :key="index"
        >
          <hr />
          <h1><i class="bi bi-journal-bookmark-fill"></i>{{ list_name }}</h1>
          <div
            v-show="!loading"
            class="mt-1 row row-cols-1 row-cols-md-2 row-cols-lg-3 cols-xl-4 g-5"
          >
            <div
              v-for="(movie, index) in playlist"
              :key="movie.imdbID"
              class="col movie-single-card"
            >
              <TheMovieCard
                :title="moviesStore.local_movies_list[movie.imdbID].Title"
                :year="moviesStore.local_movies_list[movie.imdbID].Year"
                :imdbId="moviesStore.local_movies_list[movie.imdbID].imdbID"
                :poster="moviesStore.local_movies_list[movie.imdbID].Poster"
                :type="moviesStore.local_movies_list[movie.imdbID].Type"
                :user_review="moviesStore.local_movies_list[movie.imdbID].user_review"
                :index="-1"
              >
                <div
                  style="margin-bottom: 20px; position: relative; font-size: 12px; cursor: pointer"
                >
                  Your Rating :
                  <i
                    @click="rate(movie.imdbID, 1, -1)"
                    class="bi"
                    :class="
                      moviesStore.local_movies_list[movie.imdbID].user_rating > 0
                        ? 'bi-star-fill icon-primary'
                        : 'bi-star'
                    "
                  ></i>
                  <i
                    @click="rate(movie.imdbID, 2, -1)"
                    class="bi"
                    :class="
                      moviesStore.local_movies_list[movie.imdbID].user_rating > 1
                        ? 'bi-star-fill icon-primary'
                        : 'bi-star'
                    "
                  ></i>
                  <i
                    @click="rate(movie.imdbID, 3, -1)"
                    class="bi"
                    :class="
                      moviesStore.local_movies_list[movie.imdbID].user_rating > 2
                        ? 'bi-star-fill icon-primary'
                        : 'bi-star'
                    "
                  ></i>
                  <i
                    @click="rate(movie.imdbID, 4, -1)"
                    class="bi"
                    :class="
                      moviesStore.local_movies_list[movie.imdbID].user_rating > 3
                        ? 'bi-star-fill icon-primary'
                        : 'bi-star'
                    "
                  ></i>
                  <i
                    @click="rate(movie.imdbID, 5, -1)"
                    class="bi"
                    :class="
                      moviesStore.local_movies_list[movie.imdbID].user_rating > 4
                        ? 'bi-star-fill icon-primary'
                        : 'bi-star'
                    "
                  ></i>
                </div>
                <button class="btn btn-sm btn-danger mb-3" @click="del(list_name, index)">
                  <i class="bi bi-trash-fill"></i>&nbsp;Remove from list
                </button>
              </TheMovieCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards-container {
  min-height: 100vh;
  display: grid;
  place-items: center;
  max-width: 100vw;
  word-wrap: break-word;
  overflow-x: hidden;
}
.container__search-bar {
  width: 40%;
}
.icon-primary {
  color: #a81188;
}
@media screen and (max-width: 770px) {
  .movie-single-card {
    display: flex;
    justify-content: center;
  }
  .container__search-bar {
    width: 80%;
  }
}
</style>
