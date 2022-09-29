import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import userReducer from "./reducers/userSlice";

const initialState = {

};

const middleware = [thunk];

export const store = configureStore({
	reducer: {
		user: userReducer
	}
},
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);