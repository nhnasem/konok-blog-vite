import { createSlice } from "@reduxjs/toolkit";

const initialNavbarActiveLinkState = {
  active: "Contact",
};

export const navbarActiveLinkSlice = createSlice({
  name: "navbarActiveLinkSlice",
  initialState: initialNavbarActiveLinkState,
  reducers: {
    setNavbarLinkActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const selectNavbarActiveLink = (state) => state.navbarActiveLinkSlice.active

export const { setNavbarLinkActive } = navbarActiveLinkSlice.actions;

export default navbarActiveLinkSlice.reducer;
