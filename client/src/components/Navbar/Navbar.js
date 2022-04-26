import { AppBar, Typography, Button, Toolbar, Avatar } from '@material-ui/core';
import useStyles from './styles';
import nightKidz from '../../images/night_kidz.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { LOGOUT } from '../../actions/types';

function Navbar() {
    const styleClasses = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //const user = JSON.parse(localStorage.getItem('profile'));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // use the current location to perform side effect (whenever it changes, set user e.g. when logging in, obtaining user info from google OAuth)
    const location = useLocation();

    const logout = useCallback(() => {
        dispatch({ type: LOGOUT });
        navigate('/auth');
        setUser(null);
    }, [dispatch, navigate]);

    useEffect(() => {
        // log user out if token has expired
        const token = user?.token;
        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        // so that the login information changes reflect without having to refresh page
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, user?.token, logout]);

    return (
        <AppBar className={styleClasses.appBar} position="static" color="inherit" style={{ background: '#2E3B55' }}>
            <Link to='/' className={styleClasses.brandContainer}>
                {/* gives a nice font to textual elements. Note "/" is path to home, clicking on Memories title brings back home, set up in routes */}
                <Typography className={styleClasses.heading} variant="h2" align="center">Mont-Royal</Typography>
                <img className={styleClasses.image} src={nightKidz} alt="night-kidz" height="60"/>
            </Link> 
            {/* In the App bar, if logged in, we want to show user avatar, username and logout button */}
            <Toolbar className={styleClasses.toolbar}>
                {user?.result ? ( 
                    <div className={styleClasses.profile}>
                        <Avatar className={styleClasses.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {!user.result.imageUrl && user.result.name.charAt(0) /* show first letter if no pic */}  
                        </Avatar>
                        <Typography className={styleClasses.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={styleClasses.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : ( // if not logged in, simply show button to log in
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
