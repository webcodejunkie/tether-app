import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {

      return {
        user: action.payload,
        loading: false
      }

    },

    unSetUser: (state) => {
      state.user = null
    }
  }
});

export const { setUser, unSetUser } = userReducer.actions;
export default userReducer.reducer;