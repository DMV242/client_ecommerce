import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slice/User";
import userConnectedSlice from "./slice/UserConnected";
import { PlayerSlice } from "./slice/Player";


const store = configureStore({
  reducer: {
    User: UserReducer,
    UserConnected: userConnectedSlice,
    Player: PlayerSlice.reducer
  },
});

export default store;
