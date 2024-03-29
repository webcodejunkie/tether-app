import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    loading: true
  },
  reducers: {
    setUser: (state, action) => {

      state.user = action.payload;
      state.loading = false;

    },

    setFavorites: (state, action) => {
      state.user.Favorites.push(action.payload);
    },

    unFavorite: (state, action) => {
      let array = state.user.Favorites;
      const index = state.user.Favorites.indexOf(action.payload);
      if (index > -1) {
        array.splice(index, 1);
      }
    },

    setFriend: (state, action) => {
      state.user.Friends.push(action.payload);
    },

    unSetFriend: (state, action) => {
      let array = state.user.Friends;
      const index = state.user.Friends.indexOf(action.payload);
      if (index > -1) {
        array.splice(index, 1);
      }
    },

    unSetUser: (state) => {
      state.user = null
    }
  }
});

export const { setUser, unSetUser, setFavorites, unFavorite, setFriend, unSetFriend } = userReducer.actions;
export default userReducer.reducer;