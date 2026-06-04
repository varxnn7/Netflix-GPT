import { createSlice } from "@reduxjs/toolkit";

const myListSlice = createSlice({
  name: "myList",
  initialState: {
    movies: [],
  },
  reducers: {
    addToMyList: (state, action) => {
      // Prevent duplicates
      const exists = state.movies.find((m) => m.id === action.payload.id);
      if (!exists) {
        state.movies.push(action.payload);
      }
    },
    removeFromMyList: (state, action) => {
      // action.payload is the movie id
      state.movies = state.movies.filter((m) => m.id !== action.payload);
    },
  },
});

export const { addToMyList, removeFromMyList } = myListSlice.actions;
export default myListSlice.reducer;
