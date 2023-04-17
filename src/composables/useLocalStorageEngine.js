// useLocalStorage.js

export default function useLocalStorageEngine(key, initialValue) {
  // ... implementation of browser storage logic ...
  return {
    flush_local_store: (value) => {
      localStorage.setItem(key, JSON.stringify(value))
    },
    get_full_list: () => {
      return JSON.parse(localStorage.getItem(key)) ?? initialValue
    },
    get_meta: () => {
      return Object.values(JSON.parse(localStorage.getItem(key)) ?? [])
    },
    add_movies_to_local_list: (list) => {
      const to_save = JSON.parse(localStorage.getItem(key)) ?? initialValue
      for (let i = 0; i < list.length; i++) {
        const existing = list[i]
        if (to_save[list[i]['imdbID']]) {
          if ('user_rating' in to_save[list[i]['imdbID']]) {
            //preserve the user rating
            existing['user_rating'] = to_save[list[i]['imdbID']]['user_rating']
          }
          if ('user_review' in to_save[list[i]['imdbID']]) {
            //preserve the user review
            existing['user_review'] = to_save[list[i]['imdbID']]['user_review']
          }
        }
        to_save[list[i]['imdbID']] = existing
      }
      return to_save
    },
    create_category: (name) => {
      const existing = JSON.parse(localStorage.getItem(key)) ?? initialValue
      existing[name] = []
      localStorage.setItem(key, JSON.stringify(existing))
    },
    add_to_category: (obj) => {
      const existing = JSON.parse(localStorage.getItem(key)) ?? initialValue
      existing[obj.category_name].push(obj)
      localStorage.setItem(key, JSON.stringify(existing))
    },
    remove_entrie: (category_name, id) => {
      const existing = JSON.parse(localStorage.getItem(key)) ?? initialValue
      if (existing[category_name].length > 1) {
        const fl = existing[category_name].filter((val, index) => index != id)
        existing[category_name] = fl
      } else {
        delete existing[category_name]
      }
      localStorage.setItem(key, JSON.stringify(existing))
    }
  }
}
