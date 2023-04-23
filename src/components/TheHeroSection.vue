<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="logo.png" alt="Logo" height="50" class="d-inline-block align-text-top">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav ms-auto">
    <li class="nav-item">
      <RouterLink class="nav-link" to="/">Home</RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink class="nav-link" to="/all-movies-sample">Movies</RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink class="nav-link" to="/saved-list">TV Shows</RouterLink>
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
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <RouterLink
              type="button"
              class="btn btn-dark btn-lg px-4 me-md-2"
              to="/all-movies-sample"
            >
              Start exploring
            </RouterLink>
            <RouterLink type="button" class="btn btn-dark btn-lg px-4 me-md-2" to="/saved-list">
              View my saved lists
            </RouterLink>
          </div>
        </div>
        <div class="col-10 col-sm-8 col-lg-6 mx-auto" style="perspective: 108px">
          <img
            src="https://lumiere-a.akamaihd.net/v1/images/p_aladdin2019_17638_d53b09e6.jpeg"
            class="d-block mx-auto img-fluid hero__image"
            alt="movie caption"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>
