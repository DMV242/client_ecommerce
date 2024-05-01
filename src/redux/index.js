import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slice/User";
import userConnectedSlice from "./slice/UserConnected";

const store = configureStore({
  reducer: {
    User: UserReducer,
    UserConnected: userConnectedSlice
  },
});

export default store;
