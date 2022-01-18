import { Typography } from "@mui/material";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

//section 73 . making an interface (storecontext hook) which can be available for all children in app
interface StoreContextValue{ 
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
   

}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined)

export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context == undefined) {
        throw Error('opps we do not seem to be inside the provider');
    }

    return context;
}

export function StoreProvider({children} : PropsWithChildren<any>){  //section 73 7:00
    const [basket, setBasket] = useState<Basket | null>(null)  

    function removeItem(productId : number, quantity : number){

        if (!basket) return <Typography variant='h3'>no basket</Typography>

        const items = [...basket.items]; //creates a new copy of items(array) and store it in the variable. 
        //not  prefered to mutate state. make a copy instead and replace

        const itemIndex = items.findIndex(i => i.productId == productId);

        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity
            if (items[itemIndex].quantity == 0) items.splice(itemIndex, 1)

            setBasket(prevState => {
                return {...prevState!, items};
            })
        }
    }

    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}