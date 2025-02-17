"use client";
import { createContext, useReducer, ReactNode } from "react";
import { Asteroid } from "@/lib/types/asteroids";

interface State {
    asteroids: Asteroid[];
    favorites: Asteroid[];
}

type Action =
    | { type: "SET_ASTEROIDS"; payload: Asteroid[] }
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
        case "ADD_FAVORITE":
            if (state.favorites.some(fav => fav.id === action.payload.id)) {
                return state;
            }
            return { ...state, favorites: [...state.favorites, action.payload] };
        case "REMOVE_FAVORITE":
            return {
                ...state,
                favorites: state.favorites.filter((fav) => fav.id !== action.payload),
            };
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
