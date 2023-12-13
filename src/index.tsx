import React from 'react';
import './index.css';
import {App} from "./App";
import {QueryClient, QueryClientProvider} from "react-query";
import {HeroesDataContextProvider} from "./context";
import {HeroesPlayersPicksContextProvider} from "./context";
import {BrowserRouter,} from "react-router-dom";
import {createRoot} from 'react-dom/client';
import {OverlordPlayerPicksContextProvider} from "./context";
import {OverlordDataContextProvider} from "./context/overlord-data-context";

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
    <HeroesDataContextProvider>
        <HeroesPlayersPicksContextProvider>
            <OverlordPlayerPicksContextProvider>
                <OverlordDataContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <BrowserRouter>
                            <App/>
                        </BrowserRouter>
                    </QueryClientProvider>
                </OverlordDataContextProvider>
            </OverlordPlayerPicksContextProvider>
        </HeroesPlayersPicksContextProvider>
    </HeroesDataContextProvider>
</React.StrictMode>
);