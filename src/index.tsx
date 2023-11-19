import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from "./App";
import {QueryClient, QueryClientProvider} from "react-query";
import {HeroesDataContextProvider} from "./context/heroes-data-context";
import {HeroesPlayersPicksContextProvider} from "./context/player-picks-context";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
]);

ReactDOM.render(
    <React.StrictMode>
        <HeroesDataContextProvider>
            <HeroesPlayersPicksContextProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </HeroesPlayersPicksContextProvider>
        </HeroesDataContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);