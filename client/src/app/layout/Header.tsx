
import { Badge, AppBar, Box, IconButton, List, ListItem, Switch, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { ShoppingCart} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';


interface Props {
    darkMode: boolean;
    handleChange: () => void;
}


const midLinks =
[
{ title: 'Catalog', path:'/catalog/' },
{ title: 'About', path:'/about/' },
{ title: 'Contact', path:'/contact/' },
];

const rightLinks =
[
    { title: 'login', path:'/login/' },
    { title: 'register', path:'/register/' },  
]

export default function Header({darkMode, handleChange}:Props) {

    return(
        <AppBar position ='static' sx={{mb: 4}}>
            <Toolbar>
                <Typography variant='h6'>Re-Store</Typography>

                <Switch checked={darkMode} onChange={handleChange} color='secondary'/>
                
                
                <List sx= {{display: 'flex'}}>
                    {midLinks.map(({title,path}) => (
                  <ListItem 
                    component={NavLink} 
                    to = {path}
                    key={path}
                    sx = {{color: 'inherit',typography: 'h6'}}>
                      {title.toUpperCase()}
                 </ListItem>                
                    )) }
                </List>

                <IconButton size='large' sx={{color: 'inherit'}}>
                    <Badge badgeContent={4} color='secondary'>
                    <ShoppingCart/>
                    </Badge>
                </IconButton>

                <List sx= {{display: 'flex'}}>
                    {rightLinks.map(({title,path}) => (
                  <ListItem 
                    component={NavLink} 
                    to = {path}
                    key={path}
                    sx = {{color: 'inherit',typography: 'h6'}}>
                      {title.toUpperCase()}
                 </ListItem>                
                    )) }
                </List>
               
        

            </Toolbar>
        </AppBar>
    )
}