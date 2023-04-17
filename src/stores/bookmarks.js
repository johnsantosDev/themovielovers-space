import { defineStore } from 'pinia'
import useLocalStorageEngine from '../composables/useLocalStorageEngine'

const { remove_entrie, get_full_list, add_to_category, create_category } = useLocalStorageEngine(
  'bookmarks',
  {}
)

const get_initial_state = () => {
  return {
    local_bookmarks_list: get_full_list()
  }
}

export const useBookmarksStore = defineStore({
  id: 'bookmarksStore',
  state: get_initial_state,
  actions: {
    createCategory(category_name) {
      create_category(category_name)
      this.local_bookmarks_list = get_full_list()
    },
    addToBookmarkList(movie) {
      add_to_category(movie)
      this.local_bookmarks_list = get_full_list()
    },
    removeBookmark(category_name, id) {
      remove_entrie(category_name, id)
      this.local_bookmarks_list = get_full_list()
    },
    getAvailableCategories() {
      return Object.keys(this.local_bookmarks_list)
    }
  }
})
