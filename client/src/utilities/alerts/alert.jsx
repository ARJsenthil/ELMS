import { Box, Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export const AlertBox = ( data ) => {

    const { alertType, message, onClose } = data;
    return(
        <Box sx={{ width: '100%' }}>
            <Collapse in={true}>
                <Alert
                severity={ alertType }
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={onClose}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                    { message }
                </Alert>
            </Collapse>
        </Box>
    )
}