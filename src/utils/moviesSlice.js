import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    trendingMovies: null,
    upcomingMovies: null,
    horrorMovies: null,
    actionMovies: null,
    comedyMovies: null,
    documentaryMovies: null,
    animationMovies: null,
    sciFiMovies: null,
    romanceMovies: null,
    thrillerMovies: null,
    crimeMovies: null,
    topRatedMovies: null,
    awardWinnersMovies: null,
    trailorVideo: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addHorrorMovies: (state, action) => {
      state.horrorMovies = action.payload;
    },
    addActionMovies: (state, action) => {
      state.actionMovies = action.payload;
    },
    addComedyMovies: (state, action) => {
      state.comedyMovies = action.payload;
    },
    addDocumentaryMovies: (state, action) => {
      state.documentaryMovies = action.payload;
    },
    addAnimationMovies: (state, action) => {
      state.animationMovies = action.payload;
    },
    addSciFiMovies: (state, action) => {
      state.sciFiMovies = action.payload;
    },
    addRomanceMovies: (state, action) => {
      state.romanceMovies = action.payload;
    },
    addThrillerMovies: (state, action) => {
      state.thrillerMovies = action.payload;
    },
    addCrimeMovies: (state, action) => {
      state.crimeMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addAwardWinnersMovies: (state, action) => {
      state.awardWinnersMovies = action.payload;
    },
    addTrailorVideo: (state, action) => {
      state.trailorVideo = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailorVideo,
  addPopularMovies,
  addTrendingMovies,
  addUpcomingMovies,
  addHorrorMovies,
  addActionMovies,
  addComedyMovies,
  addDocumentaryMovies,
  addAnimationMovies,
  addSciFiMovies,
  addRomanceMovies,
  addThrillerMovies,
  addCrimeMovies,
  addTopRatedMovies,
  addAwardWinnersMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;