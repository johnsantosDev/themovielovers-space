<script>
import { defineProps } from 'vue'
import { useMoviesStore } from '../stores/movies'

defineProps({
  imdbID: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  user_rating: {
    type: Number
  }
})
const moviesStore = useMoviesStore()
const rate = (imdbID, rating, index) => {
  moviesStore.rateMovie(imdbID, rating, index)
}
</script>
<template>
  <div
    style="margin-bottom: 40px; position: relative; font-size: 12px; cursor: pointer"
    v-if="user_rating"
  >
    Your Rating :
    <i
      @click="rate(imdbID, 1, index)"
      class="bi"
      :class="user_rating > 0 ? 'bi-star-fill icon-primary' : 'bi-star'"
    ></i>
    <i
      @click="rate(imdbID, 2, index)"
      class="bi"
      :class="user_rating > 1 ? 'bi-star-fill icon-primary' : 'bi-star'"
    ></i>
    <i
      @click="rate(imdbID, 3, index)"
      class="bi"
      :class="user_rating > 2 ? 'bi-star-fill icon-primary' : 'bi-star'"
    ></i>
    <i
      @click="rate(imdbID, 4, index)"
      class="bi"
      :class="user_rating > 3 ? 'bi-star-fill icon-primary' : 'bi-star'"
    ></i>
    <i
      @click="rate(imdbID, 5, index)"
      class="bi"
      :class="user_rating > 4 ? 'bi-star-fill icon-primary' : 'bi-star'"
    ></i>
  </div>
</template>
