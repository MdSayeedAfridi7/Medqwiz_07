import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import rootReducer from "./rootReducer"


export const store = configureStore({
    reducer: {
        reducer: rootReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})