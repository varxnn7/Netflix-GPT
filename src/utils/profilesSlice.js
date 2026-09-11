import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "netflix_gpt_profiles";

const loadProfilesFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveProfilesToStorage = (profiles) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  } catch {
    // ignore storage errors
  }
};

const profilesSlice = createSlice({
  name: "profiles",
  initialState: {
    profiles: loadProfilesFromStorage(),
    activeProfile: null,
  },
  reducers: {
    addProfile: (state, action) => {
      state.profiles.push(action.payload);
      saveProfilesToStorage(state.profiles);
    },
    removeProfile: (state, action) => {
      state.profiles = state.profiles.filter((p) => p.id !== action.payload);
      saveProfilesToStorage(state.profiles);
    },
    updateProfile: (state, action) => {
      const idx = state.profiles.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) {
        state.profiles[idx] = { ...state.profiles[idx], ...action.payload };
        saveProfilesToStorage(state.profiles);
      }
    },
    setActiveProfile: (state, action) => {
      state.activeProfile = action.payload;
    },
    clearActiveProfile: (state) => {
      state.activeProfile = null;
    },
  },
});

export const {
  addProfile,
  removeProfile,
  updateProfile,
  setActiveProfile,
  clearActiveProfile,
} = profilesSlice.actions;

export default profilesSlice.reducer;
