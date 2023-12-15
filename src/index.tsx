import React from 'react';
import './index.css';
import {App} from "./App";
import {QueryClient, QueryClientProvider} from "react-query";
import {HeroesDataContextProvider} from "./context";
import {BrowserRouter,} from "react-router-dom";
import {createRoot} from 'react-dom/client';
import {OverlordDataContextProvider} from "./context/overlord-data-context";
import {GameSaveContextProvider} from "./context/game-save-context";

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <HeroesDataContextProvider>
            <GameSaveContextProvider>
                <OverlordDataContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <BrowserRouter>
                            <App/>
                        </BrowserRouter>
                    </QueryClientProvider>
                </OverlordDataContextProvider>
            </GameSaveContextProvider>
        </HeroesDataContextProvider>
</React.StrictMode>
);