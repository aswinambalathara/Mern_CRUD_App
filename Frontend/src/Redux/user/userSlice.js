import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      (state.currentUser = action.payload), (state.loading = false);
    },
    userSignOut:(state,)=>{
      state.currentUser = null;
    }
  },
});

export const {signInSuccess, userSignOut } = userSlice.actions;

export default userSlice.reducer;
