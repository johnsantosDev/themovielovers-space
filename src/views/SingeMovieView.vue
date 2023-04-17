<script setup>
import { onBeforeMount, ref, computed, watch, onUpdated } from 'vue'
import { singleMovie, searchMovie } from '../requests/'
import { useRoute, RouterLink } from 'vue-router'
import TheLoadingIcon from '../components/TheLoadingIcon.vue'
import TheBookmarkMovieModal from '../components/TheBookmarkMovieModal.vue'
import { useMoviesStore } from '../stores/movies'
import _ from 'lodash'
const moviesStore = useMoviesStore()
const route = useRoute()
const id = route.params.imdbID
const thisMovie = ref({})
const localCopy = ref({})
const loading = ref(false)
const error = ref(false)
const message = ref('')
const index = ref(0)
const topRated = ref([])

localCopy.value = moviesStore.local_movies_list[id]

index.value = Object.keys(moviesStore.local_movies_list).indexOf(id)

const movie_title_to_fetch = ref('')
const mayLikeMovies = ref([])

onBeforeMount(async () => {
  const filtered_movie__list = _.filter(moviesStore.movies, function (o) {
    return Object.prototype.hasOwnProperty.call(o, 'user_rating')
  })
  const sortie_movie__list = _.orderBy(filtered_movie__list, ['user_rating'], ['desc'])
  topRated.value = _.shuffle(_.take(sortie_movie__list, 10))

  loading.value = true
  try {
    const res = await singleMovie(id)
    thisMovie.value = res
    let str = res.Title.trim()
    str = str.replace(/movie|[.:]/gi, '')
    const keyword = _.orderBy(str.split(' '), [(o) => o.length], ['asc'])
    movie_title_to_fetch.value = _.last(keyword)
    fetchSimularMovie(movie_title_to_fetch.value)
  } catch (e) {
    error.value = true
    message.value = e.message
  }
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

watch(
  () => route.params.imdbID,
  async (newId) => {
    {
      const filtered_movie__list = _.filter(moviesStore.movies, function (o) {
        return Object.prototype.hasOwnProperty.call(o, 'user_rating')
      })
      const sortie_movie__list = _.orderBy(filtered_movie__list, ['user_rating'], ['desc'])
      topRated.value = _.shuffle(_.take(sortie_movie__list, 10))
      loading.value = true
      try {
        const res = await singleMovie(newId)
        thisMovie.value = res
        let str = res.Title.trim()
        str = str.replace(/movie|[.:]/gi, '')
        const keyword = _.orderBy(str.split(' '), [(o) => o.length], ['asc'])
        movie_title_to_fetch.value = _.last(keyword)
        fetchSimularMovie(movie_title_to_fetch.value)
        localCopy.value = moviesStore.local_movies_list[newId]
        index.value = Object.keys(moviesStore.local_movies_list).indexOf(newId)
        //window.scrollTo(0, 0)
      } catch (e) {
        error.value = true
        message.value = e.message
      }
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }
  }
)
const fetchSimularMovie = async (title) => {
  try {
    const res = await searchMovie(1, title)
    const wishlist = _.filter(res, function (o) {
      return o.imdbID !== id
    })
    mayLikeMovies.value = wishlist
    moviesStore.udapteMovieList(wishlist)
  } catch (e) {
    console.log(e.message)
  }
}

const getBackground = computed(() => {
  return thisMovie.value.Poster === 'N/A'
    ? 'https://png.pngtree.com/element_our/png/20181227/movie-icon-which-is-designed-for-all-application-purpose-new-png_287896.jpg'
    : thisMovie.value.Poster
})
const m_getBackground = (s) => {
  return s === 'N/A'
    ? 'https://png.pngtree.com/element_our/png/20181227/movie-icon-which-is-designed-for-all-application-purpose-new-png_287896.jpg'
    : s
}
</script>
<template>
  <div class="single__movie bg-dark text-white">
    <TheLoadingIcon v-show="loading" />
    <div class="mt-4 mb-2" v-show="error">
      <div class="alert alert-danger d-flex align-items-start" role="alert">
        <i class="bi bi-exclamation-diamond"></i>&nbsp;<span>{{ message }}</span>
      </div>
    </div>
    <div v-if="!loading & !error" class="single__card">
      <div
        class="movie__background"
        :style="{ 'background-image': 'url(' + getBackground + ')' }"
      ></div>
      <div class="row movie__data">
        <div class="col-md-4 d-none d-md-block mx-auto">
          <div
            style="
              display: flex;
              flex-direction: column;
              align-content: space-around;
              justify-content: space-evenly;
            "
          >
            <img :src="getBackground" style="width: 100%; border-radius: 15px" />
          </div>
        </div>
        <div
          class="col-md-8"
          style="
            display: flex;
            flex-direction: column;
            align-content: space-around;
            justify-content: space-evenly;
          "
        >
          <div><strong>Title :</strong> {{ thisMovie.Title }}</div>
          <div><strong>Country : </strong>{{ thisMovie.Country }}</div>
          <div><strong>Director : </strong>{{ thisMovie.Director }}</div>
          <div><strong>Genre : </strong>{{ thisMovie.Genre }}</div>
          <div><strong>Language : </strong>{{ thisMovie.Language }}</div>
          <p><strong>Plot : </strong>{{ thisMovie.Plot }}</p>
          <div><strong>Released : </strong>{{ thisMovie.Released }}</div>
          <div><strong>imdbRating : </strong>{{ thisMovie.imdbRating }}</div>
          <div><strong>Type : </strong> {{ thisMovie.Type }}</div>
          <div><strong>Writer : </strong>{{ thisMovie.Writer }}</div>
          <div><strong>Actors :</strong> {{ thisMovie.Actors }}</div>
          <div style="margin: 20px 0px; position: relative; font-size: 16px">
            Your Rating : {{ id }}
            <i
              class="bi"
              :class="localCopy.user_rating > 0 ? 'bi-star-fill icon-primary' : 'bi-star'"
            ></i>
            <i
              class="bi"
              :class="localCopy.user_rating > 1 ? 'bi-star-fill icon-primary' : 'bi-star'"
            ></i>
            <i
              class="bi"
              :class="localCopy.user_rating > 2 ? 'bi-star-fill icon-primary' : 'bi-star'"
            ></i>
            <i
              class="bi"
              :class="localCopy.user_rating > 3 ? 'bi-star-fill icon-primary' : 'bi-star'"
            ></i>
            <i
              class="bi"
              :class="localCopy.user_rating > 4 ? 'bi-star-fill icon-primary' : 'bi-star'"
            ></i>
          </div>
          <TheBookmarkMovieModal
            :title="thisMovie.Title"
            :imdbID="thisMovie.imdbID"
            buttonSize="btn-lg"
          />
        </div>
        <section>
          <div class="container my-5 py-5 text-dark rounded">
            <div class="row d-flex justify-content-center">
              <div class="col-md-12 col-lg-12 col-xl-8">
                <h1 class="text-light">Review:</h1>
                <div
                  class="card text-light"
                  style="background-color: rgba(255, 255, 255, 0.2)"
                  v-show="localCopy.user_review"
                >
                  <div class="card-body">
                    <div class="d-flex flex-start align-items-center">
                      <div style="font-size: 30px; margin-right: 10px">
                        <i class="bi bi-chat-dots-fill"></i>
                      </div>
                      <div>
                        <h6 class="fw-bold mb-1">You</h6>
                      </div>
                    </div>
                    <p class="mt-3 mb-4 pb-2">
                      {{ localCopy.user_review }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <h1 v-show="mayLikeMovies.length">You may also like</h1>
      <div
        id="alsolikeCarousel"
        class="carousel slide mb-5"
        data-bs-ride="carousel"
        v-show="mayLikeMovies.length"
      >
        <div class="carousel-inner">
          <div
            class="carousel-item"
            v-for="(movie, index) in mayLikeMovies"
            :key="movie.imdbID"
            :class="{ active: index == 0 }"
          >
            <div
              style="
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
              "
            >
              <RouterLink
                :to="`/single-movie/${movie.imdbID}`"
                class="single-movie__view-button d-block"
                :style="{ 'background-image': 'url(' + m_getBackground(movie.Poster) + ')' }"
              >
                <div class="othermovie__title text-center">
                  <span>{{ movie.Title }} &nbsp;<i class="bi bi-box-arrow-up-right"></i></span>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#alsolikeCarousel"
          data-bs-slide="prev"
        >
          <i class="bi bi-arrow-left-circle-fill"></i>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#alsolikeCarousel"
          data-bs-slide="next"
        >
          <i class="bi bi-arrow-right-circle-fill"></i>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <h1 v-show="topRated.length">Your top rated movie(s)</h1>
      <div
        id="topRatedCarousel"
        class="carousel slide"
        data-bs-ride="carousel"
        v-show="topRated.length"
      >
        <div class="carousel-inner">
          <div
            class="carousel-item"
            v-for="(movie, index) in topRated"
            :key="movie.imdbID"
            :class="{ active: index == 0 }"
          >
            <div
              style="
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
              "
            >
              <RouterLink
                :to="`/single-movie/${movie.imdbID}`"
                class="single-movie__view-button"
                :style="{ 'background-image': 'url(' + m_getBackground(movie.Poster) + ')' }"
              >
                <div class="othermovie__title text-center">
                  <span>{{ movie.Title }} &nbsp;<i class="bi bi-box-arrow-up-right"></i></span>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#topRatedCarousel"
          data-bs-slide="prev"
        >
          <i class="bi bi-arrow-left-circle-fill"></i>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#topRatedCarousel"
          data-bs-slide="next"
        >
          <i class="bi bi-arrow-right-circle-fill"></i>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <RouterLink to="/">Go home</RouterLink>
    </div>
  </div>
</template>

<style scoped>
strong {
  color: #dcd427;
}
.single__movie {
  display: grid;
  place-items: center;
  min-height: 100vh;
}
.single__card {
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 20px;
  width: 75vw;
}

.movie__background {
  width: 100%;
  background-color: rgba(255, 255, 255);
  position: sticky;
  height: 50vh;
  object-fit: contain;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 50px 50px 0px 0px;
}
.movie__data {
  position: relative;
  background-image: linear-gradient(
    to right bottom,
    #a81188,
    #a60099,
    #9f00ad,
    #9100c2,
    #7800da,
    #6410de,
    #4b1ae1,
    #2221e4,
    #2320d3,
    #231fc2,
    #231eb1,
    #231da1
  );
  top: -40px;
  border-radius: 30px;
  padding: 30px 0px;
  width: 70vw;
  margin: auto;
}
@media screen and (width < 600px) {
  .single__card {
    width: 90vw;
  }
  .movie__background {
    height: 40vh;
  }
  .movie__data {
    width: 95%;
  }
}
a {
  color: white;
}
.othermovie__title {
  background-color: white;
  color: black;
  font-weight: 900;
  padding: 10px;
  border-radius: 0px 10px;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 300px;
}
.single-movie__view-button {
  height: 400px;
  width: 300px;
  background-repeat: no-repeat;
  background-size: cover;
}

@media screen and (width < 350px) {
  .single-movie__view-button,
  .othermovie__title {
    width: 70vw;
  }
}
.carousel-control-prev,
.carousel-control-next {
  font-size: 30px;
  color: #2221e4;
  opacity: 1;
}
</style>
