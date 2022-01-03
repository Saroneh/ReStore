import { Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/poduct";


export default function ProductDetails() {
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        axios.get(`https://localhost:5001/api/Products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.log("error"))
            .finally(() => setLoading(false));

    }, [id]) //specified dependency. useEffect call when component mount or when parameter depency changed. 
    //if dependency is empty it will only be mounted once.


    if (loading) return <h3>Loading...</h3>
 
    if (!product) return <h3>Product not found</h3>

    return(


        <Grid container spacing={6}>
            <Grid item xs= {6}>
                <img src ={product.pictureUrl} alt={product.name} style={{width:'100%'}} />
            </Grid>
            <Grid item xs={6}>
            <Typography variant='h3'>{product.name}</Typography>
            <Divider sx = {{mb:2}}/>
            <Typography variant='h6' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
            </Grid>     

        </Grid>

    );

    
}