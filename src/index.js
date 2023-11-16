import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from "./App";
import {QueryClient, QueryClientProvider} from "react-query";
import {GlobalContextProvider} from "./context/hero-context";

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <GlobalContextProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </GlobalContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);