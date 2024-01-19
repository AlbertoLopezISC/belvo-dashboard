import { CircularProgress } from "@mui/material";



export default function Loader() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 100
        }}>
            <CircularProgress size={100}/>
        </div>
    )
}