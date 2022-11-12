import React, {
    createContext,
    useContext,
} from 'react';
import {useAuthentication} from "./AuthenticationProvider";
import axios from 'axios';

const httpClient = axios.create();
httpClient.defaults.timeout = 1200000;

// const baseUrl = "https://sig-api-cerdas.fly.dev/"
const baseUrl = "http://localhost:4000/"

const HttpContext = createContext(null);
export const useHttp = () => useContext(HttpContext);

const HttpProvider = ({children}) => {
    const {getToken} = useAuthentication();

    const _request = async (url, method, data, config = {}) => {
        const token = await getToken();
        const headers = token || config.token ? {...config.headers, Authorization: `Bearer ${config.token ?? token}`} : config.headers;

        return httpClient({
            url: baseUrl + url,
            method,
            data,
            headers, ...config.options
        }).then((res) => {
            if (res.status === 200 || res.status === 201 || res.status === 204) return res.data;
            else throw (res.data);
        }).catch(errorResponse => {
            // JWT expired: logout
            if (!config.noAuth && errorResponse.response?.status === 403) {
                window.location.href = window.location.origin
            }
            else throw (errorResponse.response || {status: 500})
        })
    }

    const get = (url, config) => _request(url, "GET", null, config);
    const post = (url, body, config = {}) => _request(url, "POST", body, config);
    const put = (url, body, config = {}) => _request(url, "PUT", body, config);
    const patch = (url, body, config = {}) => _request(url, "PATCH", body, config);
    const deleteRequest = (url, body, config = {}) => _request(url, "DELETE", body, config);

    return (
        <HttpContext.Provider
            value={{get, post, put, patch, deleteRequest}}>
            {children}
        </HttpContext.Provider>
    );
};

export default HttpProvider;
