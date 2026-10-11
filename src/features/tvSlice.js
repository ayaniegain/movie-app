import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunks for Async API calls
export const fetchShowsByPage = createAsyncThunk(
  "tv/fetchShowsByPage",
  async (page = 0, { rejectWithValue }) => {
    try {
      // FIXED: Cleaned up structural multi-line spaces causing broken request routing paths
      const response = await fetch(`https://api.tvmaze.com/show?page=${page}`);
      if (!response.ok) throw new Error("Failed to fetch shows catalogue.");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "An unexpected network error occurred check API.");
    }
  },
);

export const fetchShowById = createAsyncThunk(
  "tv/fetchShowById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
      if (!response.ok) throw new Error("Show profile index not found.");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to locate show profiles.");
    }
  },
);

export const fetchShowEpisodes = createAsyncThunk(
  "tv/fetchShowEpisodes",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
      if (!response.ok) throw new Error("Failed to resolve show episode indexes.");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "Could not retrieve episode logs.");
    }
  },
);

export const fetchEpisodeById = createAsyncThunk(
  "tv/fetchEpisodeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.tvmaze.com/episodes/${id}`);
      if (!response.ok) throw new Error("Episode record not found.");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "Failed to parse detailed episode segment.");
    }
  },
);

export const searchShows = createAsyncThunk(
  "tv/searchShows",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error("Search request processing error.");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "Search catalog connection failed.");
    }
  },
);

const initialState = {
  shows: [],
  currentShow: null,
  episodes: [],
  currentEpisode: null,
  searchResults: [],
  loading: {
    shows: false,
    currentShow: false,
    episodes: false,
    currentEpisode: false,
    search: false,
  },
  errors: {
    shows: null,
    currentShow: null,
    episodes: null,
    currentEpisode: null,
    search: null,
  },
};

const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    clearCurrentShow: (state) => {
      state.currentShow = null;
      state.episodes = [];
      state.errors.currentShow = null;
    },
    clearCurrentEpisode: (state) => {
      state.currentEpisode = null;
      state.errors.currentEpisode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Shows Page
      .addCase(fetchShowsByPage.pending, (state) => {
        state.loading.shows = true;
        state.errors.shows = null;
      })
      .addCase(fetchShowsByPage.fulfilled, (state, action) => {
        state.loading.shows = false;
        state.shows = action.payload;
      })
      .addCase(fetchShowsByPage.rejected, (state, action) => {
        state.loading.shows = false;
        // SAFE ACTION: Captures payload strings from rejectWithValue securely
        state.errors.shows = action.payload || action.error.message || "Failed to download database entry.";
      })

      // Show Details
      .addCase(fetchShowById.pending, (state) => {
        state.loading.currentShow = true;
        state.errors.currentShow = null;
      })
      .addCase(fetchShowById.fulfilled, (state, action) => {
        state.loading.currentShow = false;
        state.currentShow = action.payload;
      })
      .addCase(fetchShowById.rejected, (state, action) => {
        state.loading.currentShow = false;
        state.errors.currentShow = action.payload || action.error.message || "Failed to load show tracking profile.";
      })

      // Episodes List
      .addCase(fetchShowEpisodes.pending, (state) => {
        state.loading.episodes = true;
        state.errors.episodes = null;
      })
      .addCase(fetchShowEpisodes.fulfilled, (state, action) => {
        state.loading.episodes = false;
        state.episodes = action.payload;
      })
      .addCase(fetchShowEpisodes.rejected, (state, action) => {
        state.loading.episodes = false;
        state.errors.episodes = action.payload || action.error.message || "Failed to load mapping layout indexes.";
      })

      // Episode Details
      .addCase(fetchEpisodeById.pending, (state) => {
        state.loading.currentEpisode = true;
        state.errors.currentEpisode = null;
      })
      .addCase(fetchEpisodeById.fulfilled, (state, action) => {
        state.loading.currentEpisode = false;
        state.currentEpisode = action.payload;
      })
      .addCase(fetchEpisodeById.rejected, (state, action) => {
        state.loading.currentEpisode = false;
        state.errors.currentEpisode = action.payload || action.error.message || "Failed to render this individual event target.";
      })

      // Search
      .addCase(searchShows.pending, (state) => {
        state.loading.search = true;
        state.errors.search = null;
      })
      .addCase(searchShows.fulfilled, (state, action) => {
        state.loading.search = false;
        state.searchResults = action.payload;
      })
      .addCase(searchShows.rejected, (state, action) => {
        state.loading.search = false;
        state.errors.search = action.payload || action.error.message || "Search catalog mismatch query error.";
      });
  },
});

export const { clearCurrentShow, clearCurrentEpisode } = tvSlice.actions;
export default tvSlice.reducer;
