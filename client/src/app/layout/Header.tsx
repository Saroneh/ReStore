
import { Badge, AppBar, Box, IconButton, List, ListItem, Switch, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { ShoppingCart} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { display } from '@mui/system';


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

const navStyle =
{
    color: 'inherit',
    typography: 'h6',
    display: 'flex',
    textDecoration: 'none',
    '&:hover': {
    color: 'secondary.main',
    typography: 'h4'},
    '&.active': {
    color: 'text.secondary'},
    }

export default function Header({darkMode, handleChange}:Props) {

    return(
        <AppBar position ='static' sx={{mb: 4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>


                <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant='h6'
                    component={NavLink} 
                    to =  '/'
                    exact
                    sx = {navStyle}>
                    Re-Store</Typography>
                <Switch checked={darkMode} onChange={handleChange} color='secondary'/>
                </Box>
                
                <Box>
                <List sx= {navStyle}>
                    {midLinks.map(({title,path}) => (
                  <ListItem 
                    component={NavLink} 
                    to = {path}
                    key={path}
                    sx = {navStyle}>
                      {title.toUpperCase()}
                 </ListItem>                
                    )) }
                </List>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center'}}>
                <IconButton size='large' sx={{color: 'inherit'}}>
                    <Badge badgeContent={4} color='secondary'>
                    <ShoppingCart/>
                    </Badge>
                </IconButton>
                <List sx= {navStyle}>
                    {rightLinks.map(({title,path}) => (
                  <ListItem 
                    component={NavLink} 
                    to = {path}
                    key={path}
                    sx = {navStyle}>
                      {title.toUpperCase()}
                 </ListItem>                
                    )) }
                </List>
                </Box>
        

            </Toolbar>
        </AppBar>
    )
}