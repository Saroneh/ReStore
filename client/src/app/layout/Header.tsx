import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import { positions } from "@mui/system";


interface Props {
    darkMode: boolean;
    handleChange: () => void;
}

export default function Header({darkMode, handleChange}:Props) {

    return(
        <AppBar position ='static' sx={{mb: 4}}>
            <Toolbar>
                <Typography variant='h6'>Re-Store</Typography>

                <Switch checked={darkMode} onChange={handleChange} color="secondary"/>
                
            </Toolbar>
        </AppBar>
    )
}