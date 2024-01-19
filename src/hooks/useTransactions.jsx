import TransactionsContext from "@/context/transactionProvider"

const { useContext } = require("react")


const useTransactions = () => {
    return useContext(TransactionsContext)
}

export default useTransactions