import { AppBar, Typography, Button, Toolbar, Avatar } from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/memories.png';
import { Link } from 'react-router-dom';

function Navbar() {
    const styleClasses = useStyles();
    const user = null;

    return (
        <AppBar className={styleClasses.appBar} position="static" color="inherit">
            <div className={styleClasses.brandContainer}>
                {/* gives a nice font to textual elements. Note "/" is path to home, clicking on Memories title brings back home */}
                <Typography component={Link} to="/" className={styleClasses.heading} variant="h2" align="center">Memories</Typography>
                <img className={styleClasses.image} src={memories} alt="memories" height="60"/>
            </div> 
            {/* In the App bar, if logged in, we want to show user avatar, username and logout button */}
            <Toolbar className={styleClasses.toolbar}>
                {user ? (
                    <div className={styleClasses.profile}>
                        <Avatar className={styleClasses.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0) /* show first letter if no pic */}  
                        </Avatar>
                        <Typography className={styleClasses.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={styleClasses.logout} color="secondary" onClick={()=>{}}>Logout</Button>
                    </div>
                ) : ( // if not logged in, simply show button to log in
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
