import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from "./Routes";
import {Toaster} from "react-hot-toast";
import AuthenticationProvider from "./providers/AuthenticationProvider";
import HttpProvider from "./providers/HttpProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./theme/theme";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthenticationProvider>
            <HttpProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Toaster/>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
                        <Routes/>
                    </LocalizationProvider>
                </ThemeProvider>
            </HttpProvider>
        </AuthenticationProvider>
    </React.StrictMode>
);
