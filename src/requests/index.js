import axios from 'axios'
import _ from 'lodash'

const api_key = import.meta.env.VITE_API_KEY

const movieList = async function (page = 1) {
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${api_key}&type=movie&y=2023&s=movie&page=${page}&plot=full`
    )
    const { data } = response
    const { Search } = data
    return _.shuffle(Search)
  } catch (error) {
    throw new Error(error)
  }
}

const searchMovie = async function (page = 1, search = 'a', year = '') {
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${api_key}&type=movie&s=${
        search.length == 0 ? 'a' : search
      }&page=${page}&y=${year}&plot=full`
    )
    const { data } = response
    if (data.Response == 'False') {
      throw new Error(data.Error)
    }
    const { Search } = data
    return Search
  } catch (error) {
    throw new Error(error)
  }
}

const singleMovie = async function (imdbID) {
  if (!imdbID) {
    throw new Error('Please specify a correct imdbID')
  }
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${api_key}&type=movie&i=${imdbID}&plot=full`
    )
    const { data } = response
    if (typeof data === 'string') {
      if (data.indexOf('"Response":"False"') !== -1) {
        throw new Error('Invalid movie ID')
      }
    }
    if (typeof data === 'object') {
      if (data.Response == 'False') {
        throw new Error(data.Error)
      }
    }
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export { movieList, searchMovie, singleMovie }
