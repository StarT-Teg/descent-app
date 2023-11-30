import React from 'react';
import './index.css';
import {App} from "./App";
import {QueryClient, QueryClientProvider} from "react-query";
import {HeroesDataContextProvider} from "./context/heroes-data-context";
import {HeroesPlayersPicksContextProvider} from "./context/heroes-picks-context";
import {BrowserRouter,} from "react-router-dom";
import {createRoot} from 'react-dom/client';

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
    <HeroesDataContextProvider>
        <HeroesPlayersPicksContextProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </QueryClientProvider>
        </HeroesPlayersPicksContextProvider>
    </HeroesDataContextProvider>
</React.StrictMode>
);