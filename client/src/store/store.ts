import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { superheroAPI } from "../services/SuperheroService";

const rootReducer = combineReducers({
    [superheroAPI.reducerPath]: superheroAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(superheroAPI.middleware)
    })
}

export type AppStore = ReturnType<typeof setupStore>;