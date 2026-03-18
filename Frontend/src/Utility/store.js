import { configureStore } from "@reduxjs/toolkit";
import FeedSlice from "./FeedSlice.js"
import AuthSlice from "./AuthSlice.js"
import NewUserSlice  from "./NewUserSlice.js";
import AdminSlice  from "./AdminSlice.js";
const store = configureStore({
    reducer:{
       FeedSlice,
       AuthSlice,
       NewUserSlice,
       AdminSlice,
    }
})
export default store