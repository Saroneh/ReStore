import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";

import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { useStoreContext } from "../context/StoreContext";
import {getCookie} from "../util/util";
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";
import CheckOut from "../../features/checkout/CheckOut";


export function App() {

  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => { //possible with storecontext - section 70 
    const buyerId = getCookie('buyerId');
      if (buyerId)
        agent.Basket.get()
          .then(basket => setBasket(basket))
          .catch(error => console.log(error))
          .finally(() => setLoading(false));

      else{
        setLoading(false);
      }
    
  }, [setBasket])


  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType == 'light' ? "#eaeaea" : '#121212'
      }
    }
  });


function handleChange(){
  setDarkMode(!darkMode)
}

if (loading) return <LoadingComponents message= 'stuff being loaded'/>


  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar/>
      <CssBaseline/> 
      <Header darkMode ={darkMode} handleChange={handleChange}/>
      <Container>
        <Switch>
        <Route exact path='/' component = {HomePage}/>
        <Route exact path='/catalog/' component = {Catalog}/>
        <Route path='/catalog/:id' component = {ProductDetails}/>
        <Route path='/about' component = {AboutPage}/>
        <Route path='/contact' component = {ContactPage}/>
        <Route path='/basket' component = {BasketPage}/>
        <Route path='/server-error' component = {ServerError}/>
        <Route path='/checkout' component = {CheckOut}/>
        <Route component = {NotFound}/>
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
