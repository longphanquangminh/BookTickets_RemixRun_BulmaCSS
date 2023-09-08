import { combineReducers } from "redux";
import { bookingReducer } from "./bookingReducer";

export let rootReducer = combineReducers({ bookingReducer: bookingReducer });
