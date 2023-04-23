<script setup>
import { ref } from 'vue'
import { useBookmarksStore } from '../stores/bookmarks'

const bookmarkStore = useBookmarksStore()

const props = defineProps({
  imdbID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  buttonSize: {
    type: String,
    default: 'btn-sm'
  }
})

let user_option = ref('create')
let user_new_categ = ref('')
let message = ref('')
let error = ref(false)
let category_name = ref('')

const addToBookmark = () => {
  if ((user_new_categ.value.length < 4) & (user_option.value == 'create')) {
    message.value = 'Your list name is too short'
    error.value = true
    return
  }
  error.value = false
  message.value = ''
  if (user_option.value == 'create') {
    category_name.value = user_new_categ.value
    bookmarkStore.createCategory(user_new_categ.value)
    bookmarkStore.addToBookmarkList({
      category_name: user_new_categ.value,
      imdbID: props.imdbID,
      title: props.title
    })

    message.value = 'Successfully added the movie to your newly created list!'
    return
  }

  category_name.value = user_option.value
  bookmarkStore.addToBookmarkList({
    category_name: user_option.value,
    imdbID: props.imdbID,
    title: props.title
  })
  message.value = 'Successfully added the movie to the list'
}
</script>
<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-dark"
      :class="buttonSize == 'sm' ? 'btn-sm' : buttonSize"
      data-bs-toggle="modal"
      :data-bs-target="`#${imdbID}`"
    >
      <i class="bi bi-save"></i> Bookmark
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      data-bs-backdrop="static"
      :id="imdbID"
      tabindex="-1"
      aria-labelledby="bookmarkModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Add Movie to bookmark</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <input
                class="form-control"
                type="text"
                :value="title"
                aria-label="readonly input movieTitle"
                readonly
              />
              <div class="form-text">The movie's title</div>
            </div>
            <div class="mb-3">
              <select class="form-select" v-model="user_option">
                <option selected value="create">Need to create</option>
                <option
                  v-for="(category, index) in bookmarkStore.getAvailableCategories()"
                  :key="index"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
              <div class="form-text">Please select the category if exist</div>
            </div>
            <div v-show="user_option == 'create'" class="mb-3">
              <input
                class="form-control"
                type="text"
                v-model="user_new_categ"
                placeholder="list name"
              />
              <div class="form-text">
                The name of the list you would like to add the movie to eg. Actions...
              </div>
            </div>
            <div v-show="message">
              <div
                class="alert d-flex align-items-center"
                :class="error ? 'alert-danger' : 'alert-primary'"
                role="alert"
              >
                <div>
                  <i class="bi bi-exclamation-diamond"></i>
                  {{ message }}
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" @click="addToBookmark" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
