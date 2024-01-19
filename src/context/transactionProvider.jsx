"use client"
const { createContext, useState, useEffect } = require("react");
import { PropTypes } from "prop-types";
import api from '@/config/axios';

const TransactionsContext = createContext()

const TransactionsProvider = ({ children }) => {

    const [transactions, setTransactions] = useState([]);
    const [transactionsDateRange, setTransactionsDateRange] = useState([]);

    useEffect(() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        getAllTransactions(1);
        getTransactionByRangeDate(formattedDate, formattedDate);
    }, [])

    const getAllTransactions = async (page) => {
        try {
            const { data } = await api.get(`api/transactions/?page=${page}&link=933abda9-d9ea-4397-8105-0f98a585ffd3`)
            setTransactions(data);
        } catch (error) {
            console.error(error)
        }
    }

    const getTransactionByRangeDate = async (dateFrom, dateTo) => {
        try {
            const { data } = await api.post(`api/transactions/`, {
                "link": "933abda9-d9ea-4397-8105-0f98a585ffd3",
                "date_from": dateFrom,
                "date_to": dateTo
            })
            setTransactionsDateRange(data);
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <TransactionsContext.Provider
            value={{
                transactions,
                transactionsDateRange,
                getAllTransactions,
                getTransactionByRangeDate
            }}
        >
            {children}
        </TransactionsContext.Provider>
    )

}

export {
    TransactionsProvider
}

TransactionsProvider.prototype = {
    children: PropTypes.node.isRequired
}

export default TransactionsContext