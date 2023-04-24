# movierating-app

This site allows you to explore thousands of videos from the IMDB database, it gives you the possibility to bookmark videos by creating a list for your selection, storing them in your browser, you also have the possibility of rating videos and a classification of videos according to categories. The site also allows you to leave a review to videos.

The project is accessible here : https://ubiquitous-pithivier-2bfd68.netlify.app/

### Technologies used :
 - Javascript
 - Vue.JS 3
 - Vite.JS
 - Bootstrap
 - OMDBAPI (https://www.omdbapi.com/)


## Clone the project by running

```sh
git clone https://github.com/johnsantosDev/themovielovers-space.git
```

## Create your api key 

- Go to the https://www.omdbapi.com/ website and generate an idmb api key to be used with our requests
- The requests looks like this : http://www.omdbapi.com/?apikey=[yourkey]&...
- fill the form here : https://www.omdbapi.com/apikey.aspx, then copy the api key sent to your email.
- Create a .env and add this line

```sh
VITE_API_KEY=your_api_key
```

## Install project dependancies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
