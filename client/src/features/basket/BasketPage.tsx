import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/poduct";
import { currencyFormat } from "../../app/util/util";
import BasketSummary from "./BasketSummary";

interface Props { //
    product: Product;
}



export default function BasketPage() {  //section 71

    const {basket, removeItem, setBasket} = useStoreContext();
    const [status, setStatus] = useState({ //section 77
        loading: false,
        name: ''
    });

    if (!basket) return <Typography variant='h3'>you basket is empty</Typography>


    function handleAddItem(productId:number, name:string) {

        setStatus({loading: true, name})
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({loading: false, name:''}))
        
    }
    
    function handleRemoveItem(productId:number, quantity =1, name:string) {

        setStatus({loading: true, name})
        agent.Basket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setStatus({loading: false, name:''}))
        
    }

    
    

    return(
        <>
        
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow> 
            <TableCell></TableCell>      
            <TableCell>Products</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {basket.items.map(item => (
            <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >   
                <TableCell>
                    <Box display ='flex' alignItems = 'center'>
                    <img src={item.pictureUrl} style={{height:50, marginRight:20}}/>
                    </Box>
                </TableCell>
                <TableCell component="th" scope="row"> {item.name} </TableCell>
                <TableCell align="right">{item.price /100}</TableCell>
                <TableCell align="center">
                
                    <LoadingButton loading = {status.loading && status.name === 'rem' + item.productId} //section 77
                     color='secondary' 
                     onClick={() => handleRemoveItem(item.productId, 1, 'rem' +item.productId) }>
                        <Remove/>
                    </LoadingButton>

                    {item.quantity}

                    <LoadingButton loading = {status.loading && status.name === 'add' + item.productId}
                    color='secondary' 
                    onClick={() => handleAddItem(item.productId, 'add' +item.productId) }>
                        <Add/>
                    </LoadingButton>

                </TableCell>
                <TableCell align="right">{currencyFormat(item.price*item.quantity)}</TableCell>
                <TableCell align="right">
                    <LoadingButton loading = {status.loading && status.name === 'del' + item.productId} //section 77
                    color='error' 
                    onClick={() => handleRemoveItem(item.productId, item.quantity, 'del' +item.productId) }>
                        <Delete/>
                    </LoadingButton>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
    <Grid container>
        <Grid item xs ={6}/>
        <Grid item xs ={6}>

                <BasketSummary/>
                <Button
                    component={Link}
                    to={"/checkout"}>
                    Checkout
                </Button>

        </Grid>
    </Grid>

    </>
    )

}