// section 57

import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";


interface Props {
    message?: string;
}

export default function LoadingComponents({message = "Loading stuff .."} : Props) {


    return(
        <Backdrop open={true} invisible={true}>
            <Box display='flex' justifyContent='center' alignItems ='center' height='100vh'>
                <CircularProgress size={100} color='secondary'/>
                <Typography>{message}</Typography>
            </Box>
        </Backdrop>
    )
    
}