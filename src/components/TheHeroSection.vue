<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="/logo.png" alt="Logo" height="50" class="d-inline-block align-text-top">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav ms-auto">
    <li class="nav-item">
      <RouterLink class="nav-link fw-bold" to="/">Home</RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink class="nav-link fw-bold" to="/allmovies">Explore Movies</RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink class="nav-link fw-bold" to="/saved-list">Saved movies</RouterLink>
    </li>
    <li class="nav-item">
      <a class="nav-link fw-bold" target="_blank" href="https://vuejs.org/guide/introduction.html">Documentation</a>
    </li>
  </ul>
</div>

  </div>
</nav>

  <section class="hero bg-primary text-white justify-content-center d-flex">
    <div class="container col-xxl-8 px-4 py-5">
      <div class="row flex-lg-row align-items-center g-5 py-5 h-100">
        <div class="col-lg-6 shake">
          <h1 class="display-5 fw-bold lh-1 mb-3">Looking for the ultimate destination for movie lovers?</h1>
          <p class="lead">
            Look no further than our movie rating website! Whether you're searching for the latest releases or your favorite classics, we have it all. With an extensive collection of titles spanning a variety of genres, you're sure to find something that suits your taste.
          </p>
          <div class="div-separator"></div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <RouterLink
              type="button"
              class="btn btn-dark btn-lg px-4 me-md-2"
              to="/allmovies"
            >
              Getting started
            </RouterLink>
            <RouterLink type="button" class="btn btn-dark btn-lg px-4 me-md-2" to="/saved-list">
              My space
            </RouterLink>
          </div>
        </div>
        <div class="col-6 col-sm-8 col-lg-6 mx-auto">
  <div class="row">
    <div class="col-6 col-md-6">
      <img src="https://th.bing.com/th/id/R.73edef008a944da2cdde068f77c0cdd5?rik=jJv%2bGdeOrbT5Ww&pid=ImgRaw&r=0" class="d-block mx-auto img-fluid movieimage" alt="description of the movie" loading="lazy">
    </div>
    <div class="col-6 col-md-6">
      <img src="https://th.bing.com/th/id/R.6b9d0940180ec2fb5d98ad6e54158905?rik=ON88gPzK28sSiw&riu=http%3a%2f%2fwww.aceshowbiz.com%2fimages%2fstill%2fdragonball_poster03.jpg&ehk=jrFksZltuubiUPb1dTpCe4i7G6lg84VWA9L%2bVVT422w%3d&risl=&pid=ImgRaw&r=0" class="d-block mx-auto img-fluid movieimage-transform" alt="description of the movie" loading="lazy">
    </div>
  </div>
  <div class="row">
    <div class="col-6 col-md-6">
      <img src="https://th.bing.com/th/id/OIP.JfFXSTh1UiR2cZjCCvKgCwHaLk?pid=ImgDet&w=600&h=937&rs=1" class="d-block mx-auto img-fluid movieimage" alt="description of the movie" loading="lazy">
    </div>
    <div class="col-6 col-md-6">
      <img src="https://1.bp.blogspot.com/-Toi5ZVVRnmc/X6lWxWXL0pI/AAAAAAAAAX0/PAFBqGJPFR4rXdoWhBR2YHG2WYnL8iP8QCLcBGAsYHQ/w410-h640/MV5BODg5ZjA1NTgtZTQ0MS00ZjQ1LTk4MmUtMjdkNzE4ZmVhMzQ1XkEyXkFqcGdeQXVyNTgxODY5ODI%2540._V1_.jpg" class="d-block mx-auto img-fluid movieimage-transform" alt="description of the movie" loading="lazy">
    </div>
  </div>
</div>

      </div>
    </div>
  </section>
</template>
