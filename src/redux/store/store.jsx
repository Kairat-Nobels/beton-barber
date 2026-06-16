import { combineReducers, configureStore } from "@reduxjs/toolkit";
import servicesReducer from "../slices/servicesSlice";
import recordsReducer from "../slices/recordSlice";
import adminReducer from "../slices/adminSlice";
import reviewsReducer from "../slices/reviewsSlice";
import doctorsReducer from "../slices/doctorsSlice";
import barberReducer from "../slices/barberSlice";

const reducer = combineReducers({
    servicesReducer,
    recordsReducer,
    reviewsReducer,
    adminReducer,
    doctorsReducer,
    barberReducer
})
export const store = configureStore({
    reducer
})