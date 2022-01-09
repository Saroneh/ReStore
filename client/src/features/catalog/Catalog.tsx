import { Fragment, useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { Product } from "../../app/models/poduct";
import ProductList from "./ProductList";


export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
    .then(products => setProducts(products))
    .finally(() => setLoading(false));
  }, [])

    //if (loading) return <LoadingComponents/>
    if (loading) return <LoadingComponents message='loading catalog faaast'/>;

    return(
        <>
        <ProductList products={products}/> 
        </>
    )
}