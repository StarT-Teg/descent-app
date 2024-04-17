import React, {createContext, Dispatch, ReactNode, useReducer} from "react";
import {OverlordDataInterface} from "../shared";
import {OverlordDataContextReducer, OverlordDataReducerActions} from "./overlord-data-context-reducer";

export const Overlord_Data_Initial_State: OverlordDataInterface = {
    agents: undefined,
    lieutenants: {},
    monsters: {},
    overlordCards: {},
    plotCards: undefined,
    relics: {},
    campaignsData: {},
}

export const OverlordDataContext = createContext<OverlordDataInterface>(Overlord_Data_Initial_State)
export const OverlordDataDispatchContext = createContext<Dispatch<OverlordDataReducerActions>>(() => {
})

export const useOverlordDataContext = () => {
    const context = React.useContext(OverlordDataContext);
    if (context === undefined) {
        throw new Error('not inside context provider')
    }
    return context;
}

export const useOverlordDataDispatchContext = () => {
    const context = React.useContext(OverlordDataDispatchContext);
    if (context === undefined) {
        throw new Error('not inside context provider')
    }
    return context;
}

export const OverlordDataContextProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(OverlordDataContextReducer, Overlord_Data_Initial_State);

    return (
        <OverlordDataContext.Provider value={state}>
            <OverlordDataDispatchContext.Provider value={dispatch}>
                {children}
            </OverlordDataDispatchContext.Provider>
        </OverlordDataContext.Provider>
    );
};