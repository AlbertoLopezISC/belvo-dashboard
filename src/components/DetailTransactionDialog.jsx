import formatAmount from "@/app/helpers/amountHelper";
import formatDate from "@/app/helpers/dateHelpers";
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

export default function DetailTransactionDialog({
    open,
    handleClose,
    transactionDetail
}) {

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby={'detail-transaction'}>
            <DialogTitle id={'detail-transaction'}>
                Detalles
            </DialogTitle>
            <DialogContent>
                <Box display='flex' flexDirection="column">
                    <Typography variant="body1">Detalle de la cuenta</Typography>
                    <Box display="flex" justifyContent="space-between" mx="10px" my="10px" className="grid grid-cols-3 gap-4">
                        <span>
                            <strong>Institución: </strong>{transactionDetail?.account?.institution?.name}
                        </span>
                        <span>
                            <strong>Tipo de institución: </strong>{transactionDetail?.account?.institution?.type}
                        </span>
                        <span>
                            <strong>Nombre de la cuenta: </strong>{transactionDetail?.account?.name}
                        </span>
                        <span>
                            <strong>Tipo de cuenta: </strong>{transactionDetail?.account?.type}
                        </span>
                        <span>
                            <strong>Categoría: </strong>{transactionDetail?.account?.category}
                        </span>

                    </Box>
                    <Typography variant="body1" >Detalle de la transacción</Typography>
                    <Box display="flex" justifyContent="space-between" mx="10px" my="10px" className="grid grid-cols-3 gap-4">
                    <span>
                            <strong>Categoria: </strong>{transactionDetail?.category}
                        </span>
                        <span>
                            <strong>Monto: </strong>{formatAmount(transactionDetail?.amount)}
                        </span>
                        <span>
                            <strong>Fecha: </strong>{formatDate(transactionDetail?.created_at)}
                        </span>
                        <span>
                            <strong>Estatus: </strong>{transactionDetail?.status}
                        </span>
                        <span>
                            <strong>Descripción: </strong>{transactionDetail?.description}
                        </span>
                        <span>
                            <strong>Referencia: </strong>{transactionDetail?.reference}
                        </span>

                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="primary"
                >
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}