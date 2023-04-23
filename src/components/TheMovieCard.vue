<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useMoviesStore } from '../stores/movies'
import TheBookmarkMovieModal from './TheBookmarkMovieModal.vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  imdbId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  user_review: {
    type: String,
    default: ''
  },
  index: {
    type: Number,
    required: true
  }
})

const moviesStore = useMoviesStore()
// eslint-disable-next-line vue/no-setup-props-destructure
let user_review_form = props.user_review
let editing = ref(false)

const review = (imdbID, index) => {
  moviesStore.reviewMovie(imdbID, user_review_form, index)
  editing.value = false
}
</script>
<template>
  <div class="card mb-3">
    <div class="row g-0 cc" style="min-height: 200px">
      <div class="col-md-4">
        <div class="img-container">
          <img
            :src="
              poster === 'N/A'
                ? 'https://resourcecentre.savethechildren.net/static/video_placeholder-74d554a5f2855a914ee3879bd04c55c3.png'
                : poster
            "
            class="img-fluid rounded-start"
            style="object-fit: cover; height: 100%; width: 100%"
            alt="..."
          />
        </div>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          
          <RouterLink :to="`/single-movie/${imdbId}`" class="card-title"
            ><strong>{{ title }}</strong></RouterLink>
          <p class="card-text pt-3">
            <i class="bi bi-info-circle-fill"></i> IMDBID : <strong>{{ imdbId }}</strong>
          </p>
          
          <slot></slot>

          <div>
            <h6><i class="bi bi-person-circle"></i>&nbsp;Write a small review:</h6>
            <div>
              <p>
                {{ user_review }}
                <i
                  @click="
                    () => {
                      editing = !editing
                    }
                  "
                  style="cursor: pointer"
                  v-show="!editing"
                  class="bi bi-pencil text-primary"
                ></i>
              </p>
              <div v-show="editing">
                <div class="mb-3">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    v-model="user_review_form"
                    placeholder="What you think about this movie..."
                    rows="3"
                  ></textarea>
                </div>
                <button class="btn btn-info mb-3" @click="review(imdbId, index)">Save review</button>
              </div>
            </div>

            <TheBookmarkMovieModal :title="title" :imdbID="imdbId" />
          </div>

          <p class="card-text end">
            <small><i class="bi bi-calendar"></i> {{ year }}</small>
            <small><i class="bi bi-tag"></i>{{ type }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { 

  position: relative;
  background-color: var(--primary-color);
  min-width: 300px;
  color:white;
}
.card-title{
  color:white;
}
@media screen and (width < 300px) {
  .card {
    min-width: 100%;
  }
}
@-webkit-keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }
  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }
  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.card:hover {
  -webkit-animation-name: pulse;
  animation-name: pulse;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-duration: 0.4s;
  animation-duration: 0.4s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.card-text small {
  background-color: aqua;
  padding: 5px 10px;
  color: black;
  border-radius: 10px;
  margin-right: 2px;
  font-weight: bolder;
}
.end {
  padding-top: 20px;
}
.img-container {
  height: 100%;
  width: 100%;
}
@media screen and (max-width: 780px) {
  .end {
    position: static !important;
    margin-top: 30px;
  }
  .img-container {
    max-height: 200px;
    width: 100%;
  }
}
.single-movie__view-button {
  position: absolute;
  top: -40px;
  right: -10px;
  font-size: 30px;
  background-color: black;
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 100%;
  color: #a81188;
}
</style>
