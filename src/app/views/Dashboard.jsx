"use client"
import Balances from "@/components/Balances";
import Loader from "@/components/Loader";
import useApi from "@/hooks/useApi";
import { Box } from "@mui/material";

export default function Dashboard() {

    const {loading} = useApi();

    return (
        <>
            {loading && <Loader />}
            <Box display="flex" sx={{ padding: '24px' }}>
                <Balances />
            </Box>
        </>
    )
}