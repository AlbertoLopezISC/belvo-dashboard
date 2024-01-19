"use client"
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { PropTypes } from "prop-types";
import api from '@/config/axios';

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    const showLoader = () => {
        setLoading(true);
    };

    const hideLoader = () => {
        setLoading(false);
    };

    api.interceptors.request.use(
        (config) => {
            showLoader();
            const clientId = 'b77e7581-46f3-482c-ace4-709e48310ec4';
            const clientSecret = 'bkbKhrDj*u#VLYDkU4yFnK7PX8MLDITeuSsdapq42etE_hOuBT_9utxmoX0NC3a8';
            config.headers.Authorization = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
            return config;
        },
        (error) => {
            hideLoader();
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response) => {
            hideLoader();
            return response;
        },
        (error) => {
            hideLoader();
            return Promise.reject(error);
        }
    );

    return (
        <ApiContext.Provider value={{ api, loading }}>
            {children}
        </ApiContext.Provider>
    );
};

export {
    ApiProvider
}

ApiProvider.prototype = {
    children: PropTypes.node.isRequired
}

export default ApiContext;
