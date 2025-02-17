"use client";
import { createContext, useReducer, ReactNode } from "react";
import { Asteroid } from "@/types/asteroids";
import { UserFavorite } from "@/types/users";

interface State {
    asteroids: Asteroid[];
    favorites: { asteroidId: string }[];
}

type Action =
    | { type: "SET_ASTEROIDS"; payload: Asteroid[] }
    | { type: "SET_FAVORITES"; payload: { asteroidId: string }[] }
    | { type: "ADD_FAVORITE"; payload: Asteroid }
    | { type: "REMOVE_FAVORITE"; payload: string };

const initialState: State = {
    asteroids: [],
    favorites: [],
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_ASTEROIDS":
            return { ...state, asteroids: action.payload };
        case "SET_FAVORITES":
            return { ...state, favorites: action.payload };
        case "ADD_FAVORITE":
            if (state.favorites.some(fav => fav.asteroidId === action.payload.id)) {
                return state;
            }
            return { ...state, favorites: [...state.favorites, { asteroidId: action.payload.id }] };
        case "REMOVE_FAVORITE":
            const updatedFavorites = state.favorites.filter((fav) => fav.asteroidId !== action.payload);
            return { ...state, favorites: updatedFavorites };
        default:
            return state;
    }
}


export const AsteroidsContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const AsteroidsProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AsteroidsContext.Provider value={{ state, dispatch }}>
            {children}
        </AsteroidsContext.Provider>
    );
};
