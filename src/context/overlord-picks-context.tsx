import React, {createContext, Dispatch, ReactNode, useReducer} from "react";
import {CurrentOverlordPicks} from "../types/shared";
import {OverlordCurrentPicksContextReducer, OverlordCurrentPicksReducerActions} from "./overlord-picks-context-reducer";

const Initial_Overlord_Picks: CurrentOverlordPicks = {}

export const OverlordPlayerPicksContext = createContext<CurrentOverlordPicks>(Initial_Overlord_Picks);
export const OverlordPlayerPicksDispatchContext = createContext<Dispatch<OverlordCurrentPicksReducerActions>>(() => {
})

export const useOverlordCurrentPicksContext = () => {
    const context = React.useContext(OverlordPlayerPicksContext);

    if (context === undefined) {
        throw new Error('not inside context provider')
    }

    return context;
}

export const useOverlordPlayerPicksDispatchContext = () => {
    const context = React.useContext(OverlordPlayerPicksDispatchContext);
    if (context === undefined) {
        throw new Error('not inside context provider')
    }
    return context;
}


export const OverlordPlayerPicksContextProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(OverlordCurrentPicksContextReducer, Initial_Overlord_Picks);

    return (
        <OverlordPlayerPicksContext.Provider value={state}>
            <OverlordPlayerPicksDispatchContext.Provider value={dispatch}>
                {children}
            </OverlordPlayerPicksDispatchContext.Provider>
        </OverlordPlayerPicksContext.Provider>
    );
};