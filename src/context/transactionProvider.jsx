"use client"
const { createContext, useState, useEffect } = require("react");
import useApi from "@/hooks/useApi";
import { PropTypes } from "prop-types";
import api from '@/config/axios';

const TransactionsContext = createContext()

const TransactionsProvider = ({ children }) => {

    const [transactions, setTransactions] = useState([]);
    const [transactionDetail, setTransactionDetail] = useState({});

    useEffect(() => {
        getAllTransactions(1);
    }, [])

    const getAllTransactions = async (page) => {
        try {
            const { data } = await api.get(`api/transactions/?page=${page}&link=933abda9-d9ea-4397-8105-0f98a585ffd3`)
            console.log(data);
            setTransactions(data);
        } catch (error) {
            console.error(error)
        }
    }

    const getTransaction = (transactionId) => {

    }



    return (
        <TransactionsContext.Provider
            value={{
                transactions,
                transactionDetail,
                getAllTransactions,
                getTransaction
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