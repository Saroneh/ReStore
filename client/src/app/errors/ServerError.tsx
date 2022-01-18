import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link, useHistory, useLocation } from "react-router-dom";



export default function ServerError() {


    const history = useHistory();
    const {state} = useLocation<any>();

    return(
        <Container component={Paper}>

            {state?.error ? ( 
                <div>
        <Typography variant = 'h5' gutterBottom> {state.error.title}</Typography>
        <Divider/> 
        <Typography>
            {state.error.detail || 'Internal server error'}
        </Typography>
        </div>
    ) : (
        <Typography variant = 'h5' gutterBottom> Server error</Typography>
        )}
         <Button component={Link} to={'./catalog'}>Go back to store</Button>
        </Container>
    )
    
}